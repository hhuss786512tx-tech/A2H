// Vercel function — Calendly's post-booking redirect target.
//
// Calendly free plan has no webhooks/API access, so booking confirmation is
// done via a redirect instead: the event type's "After the event is
// scheduled -> Redirect to an external site" setting (configured by hand in
// the Calendly UI, no code) points here. Calendly forwards the query params
// that were on the original scheduling link — including our own
// `a2h_lead` id (see lib/inboundLeads.js's buildCalendlyLink()) — plus its
// own `event_start_time`/`invitee_email` style params depending on how the
// redirect is configured.
//
// KNOWN GAP (v1, accepted in the plan): cancellations aren't caught here —
// there's no webhook for invitee.canceled on the free plan — so a canceled
// booking still gets the reminder/closer touch from process-nurture.js.
// The closer message ("hope our chat went well... if we missed each other")
// reads naturally either way, so this is a low-cost gap, not a broken flow.

const { updateInboundLead } = require('../lib/inboundLeads');

module.exports = async function handler(req, res) {
  const leadId = String(req.query.a2h_lead || '').trim();
  // Calendly's redirect can pass the event start time under a few different
  // param names depending on how the redirect URL is templated in the
  // Calendly UI — check the common ones defensively.
  const eventStartRaw = req.query.event_start_time || req.query.start_time || req.query.event_start || '';

  if (leadId) {
    const patch = { status: 'booked', booked_at: new Date().toISOString() };
    const parsedDate = eventStartRaw ? new Date(String(eventStartRaw)) : null;
    if (parsedDate && !Number.isNaN(parsedDate.getTime())) {
      patch.event_start_time = parsedDate.toISOString();
    }
    try {
      await updateInboundLead(leadId, patch);
    } catch (err) {
      console.error('booking-confirmed: failed to update lead', leadId, err);
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="refresh" content="4;url=https://a2h.info/">
<title>You're booked! — A2H</title>
</head>
<body style="font-family: system-ui, sans-serif; background:#141110; color:#e9dfd2; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; text-align:center; padding:0 24px;">
<div>
<h1 style="font-size:1.75rem; margin-bottom:0.5rem;">You're booked!</h1>
<p style="color:#a89f92;">Talk soon. Redirecting you back to <a href="https://a2h.info/" style="color:#c9702f;">a2h.info</a>...</p>
</div>
</body>
</html>`);
};
