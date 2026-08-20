// Vercel Node serverless function — powers the "Let's get to know you" lead
// popup (see build/partials.js leadPopup/leadPopupScript). Sends two emails
// via Resend: a notification to Haider with the lead's details so the free
// mockup can actually get built, and an immediate auto-reply to the lead
// confirming next steps and pointing them at mockup.html to book a time.
//
// Requires RESEND_API_KEY as a Vercel env var — same key already used by
// api/score-request.js.

const NOTIFY_TO = 'hhuss786512tx@gmail.com';
const FROM_ADDRESS = 'A2H <hello@a2h.info>';

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const name = String(body.name || '').trim().slice(0, 200);
  const business = String(body.business || '').trim().slice(0, 200);
  const email = String(body.email || '').trim().slice(0, 200);
  const phone = String(body.phone || '').trim().slice(0, 60);
  const landingPage = String(body.landing_page || '').trim().slice(0, 200);

  // Ad attribution, mirroring score-request.js — absent for organic/direct
  // visitors, that's expected, not an error.
  const gclid = String(body.gclid || '').trim().slice(0, 200);
  const fbclid = String(body.fbclid || '').trim().slice(0, 200);
  const utmSource = String(body.utm_source || '').trim().slice(0, 100);
  const utmCampaign = String(body.utm_campaign || '').trim().slice(0, 100);

  if (!name || !business || !email) {
    res.status(400).json({ error: 'name, business, and email are required' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(200).json({ success: false, reason: 'not_configured' });
    return;
  }

  const source = utmSource || (gclid ? 'google_ads' : fbclid ? 'meta_ads' : 'organic/direct');
  const sourceLine = `<p><strong>Source:</strong> ${escapeHtml(source)}${utmCampaign ? ` (${escapeHtml(utmCampaign)})` : ''}${landingPage ? ` — popup shown on ${escapeHtml(landingPage)}` : ''}</p>`;

  const notifyHtml = `
    <h2>New Free Mockup Request</h2>
    ${sourceLine}
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Business:</strong> ${escapeHtml(business)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
    <p>Build them a homepage mockup within 2–3 days, then get them on the Calendly call they were routed to on mockup.html.</p>
  `;

  const leadHtml = `
    <p>Hi ${escapeHtml(name.split(' ')[0] || name)},</p>
    <p>Thanks for telling us about ${escapeHtml(business)}! We're getting started on a free homepage mockup made specifically for your business — no charge, no obligation.</p>
    <p>It'll be ready in 2–3 days. If you haven't already, pick a time on our calendar and we'll walk you through it live: <a href="https://a2h.info/mockup.html">a2h.info/mockup.html</a>.</p>
    <p>If anything's urgent in the meantime, just reply to this email.</p>
    <p>— Haider, A2H</p>
  `;

  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

  try {
    const [notifyRes, leadRes] = await Promise.all([
      send({
        from: FROM_ADDRESS,
        to: NOTIFY_TO,
        reply_to: email,
        subject: `Free Mockup Request — ${business}`,
        html: notifyHtml,
      }),
      send({
        from: FROM_ADDRESS,
        to: email,
        reply_to: NOTIFY_TO,
        subject: "You're in — your free A2H mockup is underway",
        html: leadHtml,
      }),
    ]);

    if (!notifyRes.ok) {
      const errText = await notifyRes.text().catch(() => '');
      res.status(200).json({ success: false, reason: 'notify_failed', detail: errText.slice(0, 300) });
      return;
    }

    // The lead auto-reply is best-effort, same caveat as score-request.js —
    // the notification to Haider (the important part) already went through.
    res.status(200).json({ success: true, leadEmailSent: leadRes.ok });
  } catch (err) {
    res.status(200).json({ success: false, reason: 'exception', detail: String(err).slice(0, 300) });
  }
};
