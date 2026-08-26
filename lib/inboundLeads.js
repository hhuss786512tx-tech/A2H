// Shared server-side helpers for the inbound lead enrich/nurture/booking
// pipeline. Deliberately NOT under api/ — Vercel treats every file under
// api/ as a routable function, and this file exports plain helpers, not a
// request handler.
//
// NOT CURRENTLY WIRED TO ANY LEAD-CAPTURE ENDPOINT: this was built against
// api/score-request.js (enrichment + nurture kickoff on every score
// submission), but that endpoint was retired the same day the free
// website score offer was killed in favor of the mockup-only funnel. The
// insertInboundLead()/computeFitScore()/sendSms() calls that used to live
// in score-request.js were not ported to api/mockup-request.js — that's
// a deliberate scope decision (see commit history), not an oversight, but
// it means no new rows land in `inbound_leads` until/unless someone wires
// this into mockup-request.js (or another capture point). Still used by
// api/cron/process-nurture.js (follow-up cadence on existing rows) and
// api/booking-confirmed.js (Calendly redirect handler).
//
// Requires these Vercel env vars (same Supabase project as the lead-gen
// repo's outbound pipeline — same values, added here separately since
// Vercel env vars are per-project):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// and for SMS:
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_FROM_NUMBER

const { createClient } = require('@supabase/supabase-js');

const CALENDLY_BASE_URL = 'https://calendly.com/hhuss786512tx/new-meeting';
// Filled in once Haider records the video and uploads it — see
// lead-gen/docs/precall_video_script.md.
const PRECALL_VIDEO_URL = process.env.PRECALL_VIDEO_URL || 'https://a2h.info/book-a-call.html';

let supabaseClient = null;

/** Singleton Supabase client, service-role key, no session persistence (server-side only). */
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  supabaseClient = createClient(url, key, { auth: { persistSession: false } });
  return supabaseClient;
}

// Naive E.164-ish normalizer: US-centric (matches this project's current
// market). Strips everything but digits, assumes a bare 10-digit number is
// US/+1. Not a substitute for a real phone-validation library, but good
// enough to dedup and to address an SMS to.
function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return null;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (digits.length > 7) return `+${digits}`; // best-effort for non-US input
  return null;
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'getnada.com',
]);

function isDisposableEmail(email) {
  const domain = String(email || '').split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}

function isPlaceholderBusinessName(business) {
  const b = String(business || '').trim();
  return b.length < 2 || /^(test|asdf|n\/?a|none|xxx+)$/i.test(b);
}

/**
 * Internal fit score — separate from the lead-facing 0-100 marketing score
 * computed in score-request.js. This decides whether the pipeline spends
 * nurture effort (SMS + video) on this submission at all.
 *
 * `signals` is score-request.js's fetchSiteSignals() result (or null if the
 * site couldn't be checked / no URL was given).
 */
function computeFitScore({ business, email, phoneNormalized, url, signals }) {
  const flags = [];
  let tier;

  const disposable = isDisposableEmail(email);
  const placeholderName = isPlaceholderBusinessName(business);
  if (disposable) flags.push('disposable_email');
  if (placeholderName) flags.push('placeholder_business_name');
  if (!phoneNormalized) flags.push('no_phone');

  if (disposable || placeholderName || !phoneNormalized) {
    tier = 'cold';
  } else {
    const siteLooksBad = !url || !signals || signals.hasViewport === false;
    if (siteLooksBad) {
      flags.push('bad_or_missing_site');
      tier = 'hot'; // real contact info + an actual opportunity to fix
    } else {
      flags.push('decent_existing_site');
      tier = 'warm'; // real contact info, but lower urgency
    }
  }

  const score = tier === 'hot' ? 80 : tier === 'warm' ? 50 : 15;
  return { fit_score: score, fit_tier: tier, fit_flags: flags };
}

/**
 * Insert one inbound lead. A dedup unique-index hit (same phone_normalized)
 * is reported, not thrown — mirrors lead-gen/src/db/leads.ts's insertLead().
 */
async function insertInboundLead(row) {
  const supabase = getSupabaseClient();
  if (!supabase) return { outcome: 'not_configured' };

  const { data, error } = await supabase.from('inbound_leads').insert(row).select('id').single();
  if (error) {
    if (error.code === '23505') return { outcome: 'duplicate', reason: error.details ?? error.message };
    return { outcome: 'error', message: error.message };
  }
  return { outcome: 'inserted', id: data.id };
}

async function updateInboundLead(id, patch) {
  const supabase = getSupabaseClient();
  if (!supabase) return { error: 'not_configured' };
  const { error } = await supabase.from('inbound_leads').update(patch).eq('id', id);
  return error ? { error: error.message } : {};
}

/** Builds a Calendly link prefilled with the lead's name/email + our own tracking param. */
function buildCalendlyLink({ id, name, email }) {
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (email) params.set('email', email);
  if (id) params.set('a2h_lead', id);
  return `${CALENDLY_BASE_URL}?${params.toString()}`;
}

/**
 * Sends one SMS via Twilio's REST API directly (no SDK — consistent with
 * this repo's zero-runtime-dependency style for its other integrations).
 * Returns { ok, status, detail? } — never throws, so a failed send doesn't
 * take down the caller's request.
 */
async function sendSms({ to, body }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return { ok: false, status: 0, detail: 'twilio_not_configured' };

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const params = new URLSearchParams({ To: to, From: from, Body: body });

  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, status: res.status, detail: detail.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, detail: String(err).slice(0, 300) };
  }
}

module.exports = {
  getSupabaseClient,
  normalizePhone,
  computeFitScore,
  insertInboundLead,
  updateInboundLead,
  buildCalendlyLink,
  sendSms,
  PRECALL_VIDEO_URL,
  CALENDLY_BASE_URL,
};
