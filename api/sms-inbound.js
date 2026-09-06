// Vercel Node serverless function — Twilio's inbound-SMS webhook target.
// This is the actual "AI Receptionist": when a lead texts the A2H number
// back, Twilio POSTs the message here, we look the lead up by phone,
// hand the conversation to Gemini, and return the reply as TwiML in the
// SAME response — no second network hop through Twilio's REST API, which
// keeps latency down to one Gemini call plus one webhook round trip.
//
// Twilio console setup (Phone Numbers -> your number -> Messaging):
//   "A message comes in" -> Webhook -> https://a2h.info/api/sms-inbound -> HTTP POST
//
// Requires TWILIO_AUTH_TOKEN (to verify the request actually came from
// Twilio — see verifyTwilioSignature below) and GEMINI_API_KEY. Falls back
// to a safe canned reply if Gemini is unreachable/unconfigured, and always
// saves the inbound message to the lead's conversation so nothing is lost.
//
// The moment a lead replies, their status flips 'nurturing' -> 'engaged',
// which pulls them out of api/cron/process-nurture.js's scheduled cadence
// (that cron only queries status IN ('nurturing','booked','reminded')) —
// a live conversation should never get talked over by a canned nudge. On
// that first reply we also fire a heads-up email to Haider so a human
// stays in the loop even though the reply itself was instant.

const crypto = require('crypto');
const {
  getLeadByPhone,
  updateInboundLead,
  normalizePhone,
  buildCalendlyLink,
} = require('../lib/inboundLeads');

const MODEL = 'gemini-flash-lite-latest';
const MAX_HISTORY_TURNS = 10; // sent to Gemini; full history still persisted
const MAX_INBOUND_LEN = 600;
const WEBHOOK_URL = 'https://a2h.info/api/sms-inbound'; // must match the Twilio console config exactly
const NOTIFY_TO = 'hhuss786512tx@gmail.com';
const FROM_ADDRESS = 'A2H <hello@a2h.info>';

function verifyTwilioSignature(params, signature, authToken) {
  if (!authToken || !signature) return false;
  const data = Object.keys(params).sort().reduce((acc, key) => acc + key + params[key], WEBHOOK_URL);
  const expected = crypto.createHmac('sha1', authToken).update(Buffer.from(data, 'utf-8')).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const escapeXml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));

function twiml(res, message) {
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(
    message
      ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`
      : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`
  );
}

function systemPromptFor(lead, calendlyLink) {
  return `You are the A2H AI Receptionist, texting one-on-one with ${lead.name || 'a lead'} from ${lead.business || 'their business'} over SMS about the free website mockup they requested. A2H is an AI Receptionist + CRM company for Texas businesses (contractors, medical practices, local retail), with hand-coded custom websites available as an upgrade — this lead has expressed interest in that Custom Website tier via the mockup form.

They already told us: niche "${lead.niche || 'not specified'}", notes: "${lead.notes || 'none'}".

Your job: answer their questions using ONLY the facts below, figure out anything still unclear about what they need, and once they seem ready, send them this booking link to grab a time: ${calendlyLink}

RULES: Keep every reply to 1-3 short sentences, plain text, no markdown, no emoji spam — this is a text message, not a chat window. Never invent pricing, features, or timelines not listed here. If they ask something you can't answer confidently, tell them Haider will follow up personally, don't guess.

FACTS:
Turnaround: AI Receptionist + CRM can be live in days. A Custom Website build takes 2-3 days once content is in hand.
Pricing: AI Receptionist + CRM is $1,500 setup + $397/mo (+$99/mo per extra seat). AI Receptionist + CRM + Custom Website is $2,000 setup + $400/mo (+$99/mo per extra seat) — this is the tier their mockup request is about. Exact quote comes after a quick call.
Process: free homepage mockup first (already underway for them), then build, then launch.
Contact: if they want a human now, tell them to reply "call me" or email hhuss786512tx@gmail.com.`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('method not allowed');
    return;
  }

  const params = (typeof req.body === 'object' && req.body) || {};
  const signature = req.headers['x-twilio-signature'];
  if (!verifyTwilioSignature(params, signature, process.env.TWILIO_AUTH_TOKEN)) {
    res.status(403).send('invalid signature');
    return;
  }

  const from = normalizePhone(params.From);
  const inboundText = String(params.Body || '').trim().slice(0, MAX_INBOUND_LEN);
  if (!from || !inboundText) {
    twiml(res, null);
    return;
  }

  const lead = await getLeadByPhone(from);
  if (!lead) {
    // Unknown number texting the receptionist line — no lead context to
    // work with, keep it generic and don't spend a Gemini call on it.
    twiml(res, "Thanks for reaching out to A2H! Head to a2h.info and click \"Get My Free Mockup\" and we'll get right back to you.");
    return;
  }

  const wasFirstReply = lead.status !== 'engaged';
  const history = Array.isArray(lead.conversation) ? lead.conversation : [];
  const turn = { role: 'user', text: inboundText, at: new Date().toISOString() };

  const apiKey = process.env.GEMINI_API_KEY;
  let replyText = "Thanks for the reply — Haider will get back to you personally shortly!";

  if (apiKey) {
    const calendlyLink = buildCalendlyLink({ id: lead.id, name: lead.name, email: lead.email });
    const contents = history.slice(-MAX_HISTORY_TURNS).map((t) => ({
      role: t.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(t.text || '').slice(0, MAX_INBOUND_LEN) }],
    }));
    contents.push({ role: 'user', parts: [{ text: inboundText }] });

    try {
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPromptFor(lead, calendlyLink) }] },
            contents,
            generationConfig: { temperature: 0.6, maxOutputTokens: 150 },
          }),
        }
      );
      if (upstream.ok) {
        const data = await upstream.json();
        const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
        if (text) replyText = text;
      }
    } catch {
      // fall through to the canned reply above — never let a Gemini hiccup drop the text
    }
  }

  const updatedConversation = [...history, turn, { role: 'assistant', text: replyText, at: new Date().toISOString() }].slice(-40);
  await updateInboundLead(lead.id, { conversation: updatedConversation, status: 'engaged' }).catch(() => {});

  // The response is flushed to Twilio here — everything after this line
  // runs after the lead has already received their text, so it adds no
  // perceived latency to the SMS itself.
  twiml(res, replyText);

  if (wasFirstReply && process.env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: NOTIFY_TO,
        subject: `${lead.business} replied — AI receptionist is on it`,
        html: `<p><strong>${escapeXml(lead.name || '')}</strong> (${escapeXml(lead.business || '')}) texted back: "${escapeXml(inboundText)}"</p><p>AI replied: "${escapeXml(replyText)}"</p>`,
      }),
    }).catch(() => {});
  }
};
