// Vercel Node serverless function — issues a self-hosted arithmetic
// CAPTCHA challenge. No third-party service/signup involved: the
// correct answer is AES-256-GCM encrypted into the returned token (see
// _lib/spam-guard.js issueCaptcha), so it never round-trips to the
// browser in a form a bot could just read back out. Paired with
// verifyCaptcha(), called from mockup-request.js.
//
// Requires CAPTCHA_SECRET as a Vercel env var (32+ random bytes).

const { issueCaptcha } = require('./_lib/spam-guard');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const a = 2 + Math.floor(Math.random() * 8); // 2-9
  const b = 2 + Math.floor(Math.random() * 8); // 2-9
  const useSum = Math.random() < 0.5;
  const question = useSum ? `${a} + ${b}` : `${Math.max(a, b)} - ${Math.min(a, b)}`;
  const answer = useSum ? a + b : Math.max(a, b) - Math.min(a, b);

  const challenge = issueCaptcha(question, answer);
  res.setHeader('Cache-Control', 'no-store');
  // CAPTCHA_SECRET missing (shouldn't happen in Production/Preview/Dev,
  // all three are set) -> token is empty; the two request handlers treat
  // a missing secret as "captcha not configured" and skip enforcement
  // rather than blocking every real lead over an infra misconfiguration.
  res.status(200).json(challenge || { question: null, token: '' });
};
