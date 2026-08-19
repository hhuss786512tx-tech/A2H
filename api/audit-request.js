// Vercel Node serverless function — handles the "Get My Free Audit" form.
// Sends two emails via Resend: (1) a notification to Haider with the lead's
// details, (2) an immediate "speed to lead" auto-reply to the lead's own
// inbox so nobody waits on a human to confirm the inquiry was received.
//
// Requires RESEND_API_KEY as a Vercel env var, and the a2h.info domain
// verified in Resend (Domains → add a2h.info → add the DNS records it
// gives you). Until the domain is verified, Resend's sandbox sender
// (onboarding@resend.dev) can only deliver to the Resend account's own
// email, so the lead-facing auto-reply won't reach arbitrary addresses.

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
  const url = String(body.url || '').trim().slice(0, 300);
  const email = String(body.email || '').trim().slice(0, 200);
  const phone = String(body.phone || '').trim().slice(0, 60);
  const plan = String(body.plan || '').trim().slice(0, 60);

  // Ad attribution, captured client-side from the landing URL's querystring
  // (see index.html's captureAdAttribution). Absent for organic/direct
  // visitors — that's expected, not an error.
  const gclid = String(body.gclid || '').trim().slice(0, 200);
  const fbclid = String(body.fbclid || '').trim().slice(0, 200);
  const utmSource = String(body.utm_source || '').trim().slice(0, 100);
  const utmCampaign = String(body.utm_campaign || '').trim().slice(0, 100);
  const landingPage = String(body.landing_page || '').trim().slice(0, 200);
  const vertical = String(body.vertical || '').trim().slice(0, 60);

  if (!name || !business || !email) {
    res.status(400).json({ error: 'name, business, and email are required' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(200).json({ success: false, reason: 'not_configured' });
    return;
  }

  const planLine = plan ? `<p><strong>Plan:</strong> ${escapeHtml(plan)}${vertical ? ` (${escapeHtml(vertical)} landing page)` : ''}</p>` : '';
  const urlLine = url
    ? `<p><strong>Website:</strong> ${escapeHtml(url)}</p>`
    : `<p><strong>Website:</strong> none yet</p>`;

  const source = utmSource || (gclid ? 'google_ads' : fbclid ? 'meta_ads' : 'organic/direct');
  const sourceLine = `<p><strong>Source:</strong> ${escapeHtml(source)}${utmCampaign ? ` (${escapeHtml(utmCampaign)})` : ''}${landingPage ? ` — landed on ${escapeHtml(landingPage)}` : ''}</p>`;

  const notifyHtml = `
    <h2>New Free Audit Request</h2>
    ${planLine}
    ${sourceLine}
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Business:</strong> ${escapeHtml(business)}</p>
    ${urlLine}
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
  `;

  const leadHtml = `
    <p>Hi ${escapeHtml(name.split(' ')[0] || name)},</p>
    <p>Thanks for reaching out to A2H! We've got your request for ${escapeHtml(business)} and we're already looking it over.</p>
    <p>${url ? "We'll send back 3 specific things costing you visitors right now" : "Since you don't have a site yet, we'll follow up with what a build for your business would look like"} — no charge, no obligation, within 24 hours.</p>
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
        subject: `Free Audit Request — ${business}`,
        html: notifyHtml,
      }),
      send({
        from: FROM_ADDRESS,
        to: email,
        reply_to: NOTIFY_TO,
        subject: "We've got your request — A2H",
        html: leadHtml,
      }),
    ]);

    if (!notifyRes.ok) {
      const errText = await notifyRes.text().catch(() => '');
      res.status(200).json({ success: false, reason: 'notify_failed', detail: errText.slice(0, 300) });
      return;
    }

    // The lead auto-reply is best-effort — if the domain isn't verified
    // yet Resend may reject sending to an arbitrary lead address, but the
    // notification to Haider (the important part) already went through.
    res.status(200).json({ success: true, leadEmailSent: leadRes.ok });
  } catch (err) {
    res.status(200).json({ success: false, reason: 'exception', detail: String(err).slice(0, 300) });
  }
};
