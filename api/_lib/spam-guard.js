// Shared spam-defense helpers for the lead-capture endpoints
// (api/score-request.js, api/mockup-request.js). Self-hosted — no
// third-party CAPTCHA signup required. Paired with the challenge issuer
// at api/captcha-challenge.js. Requires CAPTCHA_SECRET as a Vercel env
// var (32+ random bytes, already set in Production/Preview/Development).

const crypto = require('crypto');
const dns = require('dns');

const CAPTCHA_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MIN_FILL_TIME_MS = 1500; // faster than any human can read + type an answer

function captchaKey() {
  const secret = process.env.CAPTCHA_SECRET;
  if (!secret) return null;
  return crypto.createHash('sha256').update(secret).digest(); // 32 bytes -> AES-256 key
}

const b64url = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64');
};

// Encrypts {answer, exp} into an opaque token the browser round-trips
// back to us. AES-256-GCM (not just a signed/base64 token) so the
// correct answer never leaks into anything a bot could just read back
// out of the token itself.
function issueCaptcha(question, answer) {
  const key = captchaKey();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = JSON.stringify({ a: answer, exp: Date.now() + CAPTCHA_TTL_MS });
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { question, token: [b64url(iv), b64url(encrypted), b64url(tag)].join('.') };
}

function verifyCaptcha(token, submittedAnswer) {
  const key = captchaKey();
  if (!key || !token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  try {
    const [iv, encrypted, tag] = parts.map(fromB64url);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
    const { a, exp } = JSON.parse(decrypted);
    if (Date.now() > exp) return false;
    return String(a) === String(submittedAnswer || '').trim();
  } catch {
    return false; // tampered, wrong key, or malformed token
  }
}

// Bots that indiscriminately fill every input on a page trip this. Real
// visitors never see or fill it (off-screen + aria-hidden + tabindex -1
// in the markup, not display:none — some bots skip display:none fields).
function honeypotTripped(body) {
  return !!String(body.company_site || '').trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const isValidEmailSyntax = (email) => EMAIL_RE.test(String(email || ''));

// Small, well-known disposable/temp-mail domains. Not exhaustive — a
// cheap first filter, not the primary defense (captcha + MX check do
// the heavy lifting).
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', '10minutemail.com',
  '10minutemail.net', 'tempmail.com', 'temp-mail.org', 'yopmail.com', 'yopmail.fr',
  'trashmail.com', 'throwawaymail.com', 'getnada.com', 'sharklasers.com',
  'maildrop.cc', 'mintemail.com', 'dispostable.com', 'fakeinbox.com',
  'mailnesia.com', 'moakt.com', 'tempinbox.com', 'emailondeck.com',
  'discard.email', 'spamgourmet.com', 'mytemp.email', 'inboxbear.com',
  'tempmailo.com', 'burnermail.io', 'mohmal.com', 'crazymailing.com',
  'tempr.email', '33mail.com', 'anonaddy.com', 'mailcatch.com',
]);
function isDisposableEmail(email) {
  const domain = String(email).split('@')[1] || '';
  return DISPOSABLE_DOMAINS.has(domain.toLowerCase());
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

// true = confirmed records exist, false = confirmed none (NXDOMAIN/ENODATA),
// null = couldn't tell (timeout/resolver hiccup) — callers must never
// hard-block on null, only on a confirmed false.
function resolveOk(promise, ms) {
  return withTimeout(promise, ms).then(
    (records) => !!(records && records.length),
    (err) => (err && (err.code === 'ENOTFOUND' || err.code === 'ENODATA') ? false : null)
  );
}

// "Can this domain plausibly receive mail?" — MX first, falling back to
// a bare A record per RFC 5321 (small domains often route mail straight
// to the host with no dedicated MX record).
async function domainAcceptsMail(domain) {
  const mx = await resolveOk(dns.promises.resolveMx(domain), 3000);
  if (mx !== false) return mx; // true or null — done either way
  return resolveOk(dns.promises.resolve4(domain), 2500);
}

// "Does this hostname exist at all?" — for the optional website URL on
// the score-request form. A/AAAA only; this is not a reachability or
// quality check (that's handled separately and more leniently).
async function domainResolves(hostname) {
  const a = await resolveOk(dns.promises.resolve4(hostname), 2500);
  if (a !== false) return a;
  return resolveOk(dns.promises.resolve6(hostname), 2000);
}

// Soft signal only — callers must never hard-block on this, just flag
// the internal notification for a human glance. Real business names
// occasionally score "suspicious" too (short names, acronyms), so this
// stays deliberately conservative.
function looksAutoGenerated(rawName) {
  const name = String(rawName || '')
    .replace(/\b(llc|inc|co|corp|ltd|company|group|the)\b/gi, '')
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase();
  if (name.length < 4) return false;
  const vowels = (name.match(/[aeiou]/g) || []).length;
  const vowelRatio = vowels / name.length;
  const longestConsonantRun = (name.match(/[^aeiou]+/g) || ['']).reduce((max, run) => Math.max(max, run.length), 0);
  return vowelRatio < 0.2 || longestConsonantRun >= 5;
}

module.exports = {
  issueCaptcha,
  verifyCaptcha,
  honeypotTripped,
  isValidEmailSyntax,
  isDisposableEmail,
  domainAcceptsMail,
  domainResolves,
  looksAutoGenerated,
  MIN_FILL_TIME_MS,
};
