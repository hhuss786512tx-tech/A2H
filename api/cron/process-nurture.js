// Vercel Cron target — runs the inbound-lead follow-up cadence: nudges
// non-responders, sends a call reminder ~1h before a booked event, and
// sends a no-show-safe closer after the event time passes. See
// lib/inboundLeads.js for the shared Supabase/Resend helpers.
//
// SECURITY: this endpoint sends real email and mutates lead state, so it
// requires a shared secret — set CRON_SECRET as a Vercel env var and
// register the cron in vercel.json pointing here. Vercel's own Cron feature
// sends `Authorization: Bearer $CRON_SECRET` automatically when CRON_SECRET
// is set; for manual/local testing, pass the same header yourself:
//   curl -X POST https://a2h.info/api/cron/process-nurture \
//     -H "Authorization: Bearer $CRON_SECRET"
// Requests without a matching secret are rejected — this deliberately
// fails CLOSED (not open like the Resend-key checks elsewhere in this repo),
// because a stray/public trigger here would spam real leads, not just skip
// a feature.

const {
  getSupabaseClient,
  updateInboundLead,
  buildCalendlyLink,
  sendNurtureEmail,
} = require('../../lib/inboundLeads');

const HOUR_MS = 60 * 60 * 1000;
const NUDGE_1_DELAY_MS = 24 * HOUR_MS;
const NUDGE_2_DELAY_MS = 72 * HOUR_MS;
const REMINDER_WINDOW_MS = 70 * 60 * 1000; // send when event starts within the next 70 min
const CLOSER_DELAY_MS = 2 * HOUR_MS; // send once the event is >2h in the past

const emailBody = (text, link) => `<p>${text}</p><p><a href="${link}">${link}</a></p><p>— A2H</p>`;

async function processLead(row) {
  const now = Date.now();
  const link = buildCalendlyLink({ id: row.id, name: row.name, email: row.email });
  const firstName = (row.name || '').split(' ')[0] || row.name;

  if (row.status === 'nurturing' && row.nurture_step === 1 && row.video_sent_at) {
    if (now - new Date(row.video_sent_at).getTime() >= NUDGE_1_DELAY_MS) {
      const result = await sendNurtureEmail({
        to: row.email,
        subject: `Still want that 15-min walkthrough, ${firstName}?`,
        html: emailBody(`Hey ${firstName}, following up on the free mockup for ${row.business} — still want to grab 15 min to go over it?`, link),
      });
      if (result.ok) {
        await updateInboundLead(row.id, { nurture_step: 2, last_nurture_sent_at: new Date().toISOString() });
      }
      return { id: row.id, action: 'nudge_1', sent: result.ok };
    }
    return { id: row.id, action: 'none' };
  }

  if (row.status === 'nurturing' && row.nurture_step === 2 && row.last_nurture_sent_at) {
    if (now - new Date(row.last_nurture_sent_at).getTime() >= NUDGE_2_DELAY_MS) {
      const result = await sendNurtureEmail({
        to: row.email,
        subject: `Don't let ${row.business}'s mockup go to waste`,
        html: emailBody(`${firstName} — no pressure, just didn't want ${row.business}'s free mockup walkthrough to go to waste. Here's the link whenever you're ready:`, link),
      });
      if (result.ok) {
        await updateInboundLead(row.id, { nurture_step: 3, last_nurture_sent_at: new Date().toISOString() });
      }
      return { id: row.id, action: 'nudge_2', sent: result.ok };
    }
    return { id: row.id, action: 'none' };
  }

  if (row.status === 'booked' && row.event_start_time && !row.reminded_at) {
    const msUntilEvent = new Date(row.event_start_time).getTime() - now;
    if (msUntilEvent > 0 && msUntilEvent <= REMINDER_WINDOW_MS) {
      const result = await sendNurtureEmail({
        to: row.email,
        subject: `See you in about an hour, ${firstName}!`,
        html: emailBody(`See you in about an hour, ${firstName}! If anything comes up, reschedule here:`, link),
      });
      if (result.ok) {
        await updateInboundLead(row.id, { status: 'reminded', reminded_at: new Date().toISOString() });
      }
      return { id: row.id, action: 'reminder', sent: result.ok };
    }
    return { id: row.id, action: 'none' };
  }

  if (row.status === 'reminded' && row.event_start_time) {
    if (now - new Date(row.event_start_time).getTime() >= CLOSER_DELAY_MS) {
      const result = await sendNurtureEmail({
        to: row.email,
        subject: `Hope our chat went well, ${firstName}!`,
        html: emailBody(`Hope our chat went well, ${firstName}! If we missed each other, grab a new time here:`, link),
      });
      await updateInboundLead(row.id, { status: 'completed' }); // mark completed either way, sent or not
      return { id: row.id, action: 'closer', sent: result.ok };
    }
    return { id: row.id, action: 'none' };
  }

  return { id: row.id, action: 'none' };
}

module.exports = async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization || '';
  if (!secret || authHeader !== `Bearer ${secret}`) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    res.status(200).json({ success: false, reason: 'not_configured' });
    return;
  }

  const { data, error } = await supabase
    .from('inbound_leads')
    .select('id, name, email, business, status, nurture_step, video_sent_at, last_nurture_sent_at, event_start_time, reminded_at')
    .in('status', ['nurturing', 'booked', 'reminded'])
    .not('email', 'is', null);

  if (error) {
    res.status(200).json({ success: false, reason: 'query_failed', detail: error.message });
    return;
  }

  const results = [];
  for (const row of data ?? []) {
    try {
      results.push(await processLead(row));
    } catch (err) {
      results.push({ id: row.id, action: 'error', detail: String(err).slice(0, 300) });
    }
  }

  res.status(200).json({ success: true, processed: results.length, results });
};
