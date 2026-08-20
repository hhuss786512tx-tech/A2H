// Vercel Node serverless function — powers the "Free Website Score" tool.
// Computes an instant 0-100 online-presence score from what we can check
// automatically (site reachability, mobile viewport tag, lead-capture
// signals) plus a self-reported Google Business Profile status, then
// sends two emails via Resend: a notification to Haider with the lead's
// details and score, and an immediate auto-reply to the lead's own inbox
// so nobody waits on a human to confirm the score was received.
//
// Requires RESEND_API_KEY as a Vercel env var, and the a2h.info domain
// verified in Resend (Domains → add a2h.info → add the DNS records it
// gives you). Until the domain is verified, Resend's sandbox sender
// (onboarding@resend.dev) can only deliver to the Resend account's own
// email, so the lead-facing auto-reply won't reach arbitrary addresses.

const NOTIFY_TO = 'hhuss786512tx@gmail.com';
const FROM_ADDRESS = 'A2H <hello@a2h.info>';
const FETCH_TIMEOUT_MS = 6000;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Refuses to fetch anything pointed at a private/loopback network — the
// URL is whatever a stranger typed into a public form.
function looksLikePublicUrl(raw) {
  let u;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host = u.hostname.toLowerCase();
  const isPrivate =
    host === 'localhost' ||
    host === '0.0.0.0' ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
    host.endsWith('.local');
  return isPrivate ? null : u.toString();
}

async function fetchSiteSignals(rawUrl) {
  const url = looksLikePublicUrl(rawUrl);
  if (!url) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; A2HScoreBot/1.0; +https://a2h.info)' },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const html = await res.text();
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    const hasLeadCapture =
      /<form[\s>]/i.test(html) ||
      /href=["']tel:/i.test(html) ||
      /calendly\.com|acuityscheduling\.com|squareup\.com\/appointments/i.test(html);
    return { hasViewport, hasLeadCapture };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

// Every factor is worth 25 points. `status` drives the ❌/⚠️/✅ badge
// on the frontend.
function scoreGbp(gbp) {
  if (gbp === 'yes') return { key: 'gbp', label: 'Google Business Profile claimed', status: 'pass', points: 25 };
  if (gbp === 'unsure') return { key: 'gbp', label: 'Google Business Profile unconfirmed', status: 'warn', points: 13 };
  return { key: 'gbp', label: 'Google Business Profile not claimed', status: 'fail', points: 0 };
}

async function computeScore({ url, gbp }) {
  if (!url) {
    return {
      total: scoreGbp(gbp).points,
      items: [
        { key: 'website', label: 'No professional website', status: 'fail', points: 0 },
        { key: 'mobile', label: 'No site to check for mobile-friendliness', status: 'fail', points: 0 },
        { key: 'leadcapture', label: 'No site to capture leads on', status: 'fail', points: 0 },
        scoreGbp(gbp),
      ],
    };
  }

  const signals = await fetchSiteSignals(url);
  const mobile = !signals
    ? { key: 'mobile', label: "Mobile presence unverified — we'll confirm by hand", status: 'warn', points: 13 }
    : signals.hasViewport
      ? { key: 'mobile', label: 'Mobile-friendly site', status: 'pass', points: 25 }
      : { key: 'mobile', label: 'Poor mobile presence', status: 'fail', points: 0 };
  const leadCapture = !signals
    ? { key: 'leadcapture', label: "Lead capture unverified — we'll confirm by hand", status: 'warn', points: 13 }
    : signals.hasLeadCapture
      ? { key: 'leadcapture', label: 'Lead capture in place', status: 'pass', points: 25 }
      : { key: 'leadcapture', label: 'Missing lead capture', status: 'fail', points: 0 };

  const items = [
    { key: 'website', label: 'Professional website', status: 'pass', points: 25 },
    mobile,
    leadCapture,
    scoreGbp(gbp),
  ];
  return { total: items.reduce((sum, i) => sum + i.points, 0), items };
}

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
  const gbpRaw = String(body.gbp || '').trim().toLowerCase();
  const gbp = ['yes', 'no', 'unsure'].includes(gbpRaw) ? gbpRaw : 'unsure';

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

  const { total, items } = await computeScore({ url, gbp });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(200).json({ success: false, reason: 'not_configured', score: total, breakdown: items });
    return;
  }

  const planLine = plan ? `<p><strong>Plan:</strong> ${escapeHtml(plan)}${vertical ? ` (${escapeHtml(vertical)} landing page)` : ''}</p>` : '';
  const urlLine = url
    ? `<p><strong>Website:</strong> ${escapeHtml(url)}</p>`
    : `<p><strong>Website:</strong> none yet</p>`;

  const source = utmSource || (gclid ? 'google_ads' : fbclid ? 'meta_ads' : 'organic/direct');
  const sourceLine = `<p><strong>Source:</strong> ${escapeHtml(source)}${utmCampaign ? ` (${escapeHtml(utmCampaign)})` : ''}${landingPage ? ` — landed on ${escapeHtml(landingPage)}` : ''}</p>`;

  const badge = (status) => (status === 'pass' ? '✅' : status === 'warn' ? '⚠️' : '❌');
  const scoreLines = items.map((i) => `<li>${badge(i.status)} ${escapeHtml(i.label)}</li>`).join('');

  const notifyHtml = `
    <h2>New Free Score Request — ${total}/100</h2>
    ${planLine}
    ${sourceLine}
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Business:</strong> ${escapeHtml(business)}</p>
    ${urlLine}
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
    <p><strong>Google Business Profile (self-reported):</strong> ${escapeHtml(gbp)}</p>
    <ul>${scoreLines}</ul>
  `;

  const leadHtml = `
    <p>Hi ${escapeHtml(name.split(' ')[0] || name)},</p>
    <p>Thanks for checking your Online Presence Score with A2H! ${escapeHtml(business)} scored <strong>${total}/100</strong>.</p>
    <p>We're already looking at what's pulling that number down and putting together a plan to get you to 90+ — no charge, no obligation, within 24 hours.</p>
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
        subject: `Free Score Request — ${business} (${total}/100)`,
        html: notifyHtml,
      }),
      send({
        from: FROM_ADDRESS,
        to: email,
        reply_to: NOTIFY_TO,
        subject: `Your Online Presence Score: ${total}/100 — A2H`,
        html: leadHtml,
      }),
    ]);

    if (!notifyRes.ok) {
      const errText = await notifyRes.text().catch(() => '');
      res.status(200).json({ success: false, reason: 'notify_failed', detail: errText.slice(0, 300), score: total, breakdown: items });
      return;
    }

    // The lead auto-reply is best-effort — if the domain isn't verified
    // yet Resend may reject sending to an arbitrary lead address, but the
    // notification to Haider (the important part) already went through.
    res.status(200).json({ success: true, leadEmailSent: leadRes.ok, score: total, breakdown: items });
  } catch (err) {
    res.status(200).json({ success: false, reason: 'exception', detail: String(err).slice(0, 300), score: total, breakdown: items });
  }
};
