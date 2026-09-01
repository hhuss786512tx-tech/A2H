#!/usr/bin/env node
// Cold-outreach sender for the "AI receptionist + CRM for Texas dental
// clinics" campaign. Reads a CSV of leads, renders the copy in
// lib/template.js, and sends via Resend (same API this repo already uses
// in api/mockup-request.js — no new service to configure).
//
// SAFE BY DEFAULT: runs as a dry run (no emails sent, no lead touched)
// unless --live is passed. Always dry-run first and check
// scripts/outreach/preview/*.html before adding --live.
//
// Usage:
//   node scripts/outreach/send-dental-outreach.js --leads <csv> [options]
//
// Options:
//   --leads <path>       Path to leads CSV (default: leads/texas-dental-clinics.csv,
//                         relative to this script's directory)
//   --live                Actually send via Resend. Omit for a dry run.
//   --limit <n>           Max emails to send this run (default: all rows)
//   --delay-ms <n>        Delay between sends in ms (default: 1500)
//   --suppress <path>     Opt-out CSV with an `email` column (default: leads/suppressed.csv)
//
// Required env var for --live: RESEND_API_KEY (same key/domain as the
// rest of this site's transactional email — a2h.info must be verified in
// Resend, see api/mockup-request.js).
//
// State: scripts/outreach/.sent-log.json tracks every email address this
// script has ever successfully sent to, so re-running the same leads file
// (e.g. after fixing a typo partway through) never double-sends. It is
// updated after every single send, not just at the end, so an interrupted
// run loses no progress.

const fs = require('fs');
const path = require('path');
const { parseCsv, toCsvLine } = require('./lib/csv');
const { renderEmail } = require('./lib/template');
const {
  isValidEmailSyntax,
  isDisposableEmail,
  domainAcceptsMail,
} = require('../../api/_lib/spam-guard');

const DIR = __dirname;
const SENT_LOG_PATH = path.join(DIR, '.sent-log.json');
const RUNS_DIR = path.join(DIR, '.runs');
const PREVIEW_DIR = path.join(DIR, 'preview');

const FROM_ADDRESS = 'A2H <hello@a2h.info>';
const REPLY_TO = 'hhuss786512tx@gmail.com';
const SENDER_NAME = 'Haider';
const BOOKING_BASE_URL = 'https://a2h.info/book-a-call.html';

// CAN-SPAM requires a valid physical postal address in every commercial
// email. This repo has none published anywhere (checked privacy.html /
// terms.html) — fill this in before running --live. The script refuses to
// send live while this is still the placeholder.
const PHYSICAL_ADDRESS = process.env.OUTREACH_PHYSICAL_ADDRESS || '';

function parseArgs(argv) {
  const args = { leads: path.join(DIR, 'leads/texas-dental-clinics.csv'), live: false, limit: Infinity, delayMs: 1500, suppress: path.join(DIR, 'leads/suppressed.csv') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--leads') args.leads = path.resolve(argv[++i]);
    else if (a === '--live') args.live = true;
    else if (a === '--limit') args.limit = parseInt(argv[++i], 10);
    else if (a === '--delay-ms') args.delayMs = parseInt(argv[++i], 10);
    else if (a === '--suppress') args.suppress = path.resolve(argv[++i]);
    else { console.error(`Unknown argument: ${a}`); process.exit(1); }
  }
  return args;
}

function loadSentLog() {
  if (!fs.existsSync(SENT_LOG_PATH)) return {};
  try { return JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf8')); } catch { return {}; }
}

function saveSentLog(log) {
  fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(log, null, 2));
}

function loadSuppressed(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  const rows = parseCsv(fs.readFileSync(filePath, 'utf8'));
  return new Set(rows.map((r) => (r.email || '').trim().toLowerCase()).filter(Boolean));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendViaResend({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: FROM_ADDRESS, to, reply_to: REPLY_TO, subject, html, text }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return { ok: false, status: res.status, detail: detail.slice(0, 300) };
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, id: data.id };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(args.leads)) {
    console.error(`Leads file not found: ${args.leads}`);
    console.error('See scripts/outreach/leads/texas-dental-clinics.example.csv for the expected format.');
    process.exit(1);
  }

  if (args.live) {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set — required for --live.');
      process.exit(1);
    }
    if (!PHYSICAL_ADDRESS) {
      console.error('OUTREACH_PHYSICAL_ADDRESS is not set. CAN-SPAM requires a real physical');
      console.error('postal address in every commercial email — set this env var before sending live.');
      process.exit(1);
    }
  }

  const rows = parseCsv(fs.readFileSync(args.leads, 'utf8'));
  const suppressed = loadSuppressed(args.suppress);
  const sentLog = loadSentLog();

  fs.mkdirSync(RUNS_DIR, { recursive: true });
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });

  const runId = new Date().toISOString().replace(/[:.]/g, '-');
  const runLogPath = path.join(RUNS_DIR, `${runId}.csv`);
  const runLogLines = [toCsvLine(['business', 'email', 'status', 'reason', 'subject', 'resend_id'])];

  let sent = 0, skippedDuplicate = 0, skippedSuppressed = 0, skippedInvalid = 0, previewsWritten = 0;

  console.log(`${args.live ? 'LIVE SEND' : 'DRY RUN'} — ${rows.length} leads loaded from ${args.leads}`);
  if (!args.live) console.log('(no emails will be sent — pass --live once you have reviewed scripts/outreach/preview/*.html)\n');

  for (let i = 0; i < rows.length && sent < args.limit; i++) {
    const lead = rows[i];
    const email = (lead.email || '').trim().toLowerCase();
    const business = (lead.business || '').trim();

    if (!email || !business) { skippedInvalid++; continue; }

    if (suppressed.has(email)) {
      skippedSuppressed++;
      runLogLines.push(toCsvLine([business, email, 'skipped', 'suppressed', '', '']));
      continue;
    }
    if (sentLog[email]) {
      skippedDuplicate++;
      runLogLines.push(toCsvLine([business, email, 'skipped', 'already_sent', '', '']));
      continue;
    }
    if (!isValidEmailSyntax(email) || isDisposableEmail(email)) {
      skippedInvalid++;
      runLogLines.push(toCsvLine([business, email, 'skipped', 'invalid_email', '', '']));
      continue;
    }
    const mailOk = await domainAcceptsMail(email.split('@')[1]);
    if (mailOk === false) {
      skippedInvalid++;
      runLogLines.push(toCsvLine([business, email, 'skipped', 'domain_unreachable', '', '']));
      continue;
    }

    const rendered = renderEmail(lead, {
      bookingBaseUrl: BOOKING_BASE_URL,
      replyTo: REPLY_TO,
      senderName: SENDER_NAME,
      physicalAddress: PHYSICAL_ADDRESS || '[YOUR BUSINESS MAILING ADDRESS — set OUTREACH_PHYSICAL_ADDRESS]',
      variantIndex: i,
    });

    if (!args.live) {
      if (previewsWritten < 5) {
        const previewPath = path.join(PREVIEW_DIR, `${i}-${business.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`);
        fs.writeFileSync(previewPath, `<h3>Subject: ${rendered.subject}</h3>\n<hr>\n${rendered.html}`);
        previewsWritten++;
      }
      sent++;
      runLogLines.push(toCsvLine([business, email, 'dry_run', '', rendered.subject, '']));
      continue;
    }

    const result = await sendViaResend({ to: email, subject: rendered.subject, html: rendered.html, text: rendered.text });
    if (result.ok) {
      sent++;
      sentLog[email] = { business, sentAt: new Date().toISOString(), resendId: result.id, subject: rendered.subject };
      saveSentLog(sentLog);
      runLogLines.push(toCsvLine([business, email, 'sent', '', rendered.subject, result.id || '']));
      console.log(`  sent -> ${business} <${email}>`);
    } else {
      runLogLines.push(toCsvLine([business, email, 'error', `${result.status}: ${result.detail}`, rendered.subject, '']));
      console.log(`  FAILED -> ${business} <${email}> (${result.status})`);
    }

    await sleep(args.delayMs);
  }

  fs.writeFileSync(runLogPath, runLogLines.join('\n'));

  console.log('\n--- Summary ---');
  console.log(`${args.live ? 'Sent' : 'Would send'}: ${sent}`);
  console.log(`Skipped (already sent): ${skippedDuplicate}`);
  console.log(`Skipped (suppressed/opted out): ${skippedSuppressed}`);
  console.log(`Skipped (invalid/unreachable): ${skippedInvalid}`);
  console.log(`Run log: ${runLogPath}`);
  if (!args.live) console.log(`Previews written: ${PREVIEW_DIR} (open the .html files in a browser)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
