// Cold-email copy for the Texas dental clinic outreach campaign.
//
// Structure follows the highest-open/reply-rate pattern used across B2B
// outbound playbooks (Lemlist/Woodpecker/Close-style "cold email that
// works"): pattern-interrupt subject -> one-line relatable problem ->
// one-line solution -> single low-friction CTA -> soft P.S. Deliberately
// short (under 120 words), plain-text-shaped HTML (no marketing template,
// no images, one link) — heavy branded HTML reads as a blast and hurts
// both spam score and reply rate. No price anywhere; the only job of this
// email is to get a booked call.
//
// Subject lines rotate per recipient (round-robin by list index) so 300
// sends don't all carry an identical subject line, which is itself a spam
// signal and caps open-rate testing to one variant.

const SUBJECT_VARIANTS = [
  (biz) => `quick question about ${biz}'s after-hours calls`,
  (biz) => `${biz} — missing calls after 5pm?`,
  (biz) => `who answers when ${biz}'s front desk is slammed?`,
  (biz) => `one idea for ${biz}'s missed-call problem`,
  (biz) => `${biz}: never miss a new patient call again?`,
];

function pickSubject(index, business) {
  const fn = SUBJECT_VARIANTS[index % SUBJECT_VARIANTS.length];
  return fn(business);
}

function buildBookingLink({ baseUrl, variant }) {
  const params = new URLSearchParams({
    utm_source: 'cold_email',
    utm_medium: 'email',
    utm_campaign: 'dental_tx_outreach',
    utm_content: String(variant),
  });
  return `${baseUrl}?${params.toString()}`;
}

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Renders the outreach email for one lead.
 * `lead` = { business, contact_name, city }
 * `opts` = { bookingBaseUrl, replyTo, senderName, physicalAddress, variantIndex }
 */
function renderEmail(lead, opts) {
  const business = lead.business.trim();
  const greetingName = lead.contact_name?.trim() || 'there';
  const cityLine = lead.city?.trim() ? ` in ${escapeHtml(lead.city.trim())}` : '';
  const subject = pickSubject(opts.variantIndex, business);
  const bookingLink = buildBookingLink({ baseUrl: opts.bookingBaseUrl, variant: opts.variantIndex });

  const html = `
<p>Hi ${escapeHtml(greetingName)},</p>

<p>Quick question — when ${escapeHtml(business)} closes for the day, or the front desk is slammed with patients, who picks up when someone calls to book an appointment?</p>

<p>Most dental practices${cityLine} lose new-patient calls to voicemail every week, and most of those callers just call the next practice on the list instead of leaving a message.</p>

<p>We built an AI receptionist made for dental offices — it answers every call in seconds, 24/7, and books the patient straight into your calendar. It's paired with a simple CRM so nothing falls through the cracks afterward.</p>

<p>Worth a quick 15-minute look? Grab a time here: <a href="${bookingLink}">${bookingLink}</a></p>

<p>— ${escapeHtml(opts.senderName)}<br>A2H</p>

<p style="color:#666;font-size:13px;">P.S. If now's not a good time, no worries at all — just reply and let me know.</p>

<hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
<p style="color:#888;font-size:12px;">
  ${escapeHtml(opts.physicalAddress)}<br>
  Don't want these emails? Reply "unsubscribe" and you'll be removed immediately.
</p>
`.trim();

  const text = `Hi ${greetingName},

Quick question — when ${business} closes for the day, or the front desk is slammed with patients, who picks up when someone calls to book an appointment?

Most dental practices${lead.city?.trim() ? ` in ${lead.city.trim()}` : ''} lose new-patient calls to voicemail every week, and most of those callers just call the next practice on the list instead of leaving a message.

We built an AI receptionist made for dental offices — it answers every call in seconds, 24/7, and books the patient straight into your calendar. It's paired with a simple CRM so nothing falls through the cracks afterward.

Worth a quick 15-minute look? Grab a time here: ${bookingLink}

— ${opts.senderName}
A2H

P.S. If now's not a good time, no worries at all — just reply and let me know.

---
${opts.physicalAddress}
Don't want these emails? Reply "unsubscribe" and you'll be removed immediately.`;

  return { subject, html, text, bookingLink, variantIndex: opts.variantIndex % SUBJECT_VARIANTS.length };
}

module.exports = { renderEmail, pickSubject, SUBJECT_VARIANTS, buildBookingLink };
