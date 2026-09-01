# Dental clinic cold-outreach script

Sends the "AI receptionist + CRM" cold email to a list of Texas dental
clinics and drives every reply toward one action: booking a call at
`a2h.info/book-a-call.html`. No pricing is ever mentioned in the email.

## Before you send anything

1. **Get real leads into `leads/texas-dental-clinics.csv`.** Copy the
   format from `leads/texas-dental-clinics.example.csv`
   (`business,contact_name,email,city,website`). This file is
   git-ignored — the repo is public, so real business contact data never
   gets committed.
2. **Set required env vars:**
   - `RESEND_API_KEY` — same key this repo already uses in
     `api/mockup-request.js` (a2h.info must be verified in Resend).
   - `OUTREACH_PHYSICAL_ADDRESS` — a real mailing address. CAN-SPAM
     requires every commercial email to include one; the script refuses
     to run `--live` without it.
3. **Dry run first, always:**
   ```
   node scripts/outreach/send-dental-outreach.js --leads scripts/outreach/leads/texas-dental-clinics.csv
   ```
   This sends nothing. It writes up to 5 fully rendered emails to
   `scripts/outreach/preview/*.html` — open those in a browser and read
   them as if you were the clinic before sending anything for real.
4. **Send for real** once the preview looks right:
   ```
   RESEND_API_KEY=... OUTREACH_PHYSICAL_ADDRESS="..." \
     node scripts/outreach/send-dental-outreach.js \
     --leads scripts/outreach/leads/texas-dental-clinics.csv --live
   ```

## Options

| Flag | Default | Purpose |
|---|---|---|
| `--leads <path>` | `leads/texas-dental-clinics.csv` | CSV of leads to send to |
| `--live` | off (dry run) | Actually send via Resend |
| `--limit <n>` | all rows | Cap sends for this run (e.g. send 50, check replies, send the rest) |
| `--delay-ms <n>` | 1500 | Pause between sends |
| `--suppress <path>` | `leads/suppressed.csv` | Opt-out list (one `email` column) — anyone who replies "unsubscribe" goes here |

## What the script does for you

- **Never double-sends.** Every successful send is recorded in
  `.sent-log.json`; re-running the same file skips anyone already sent to.
- **Skips bad addresses.** Invalid syntax, disposable-email domains, and
  domains with no mail servers are skipped and logged, not sent to.
- **Honors opt-outs.** Anyone in `leads/suppressed.csv` is never sent to.
- **Rotates subject lines** across 5 variants so 300 sends don't all carry
  an identical subject (better inbox placement, and doubles as a rough
  A/B test — check `.runs/<timestamp>.csv` to see open/reply patterns per
  subject once replies come in).
- **Logs every run** to `.runs/<timestamp>.csv` (business, email, status,
  subject used, Resend message id).

## Compiling the lead list

This script is intentionally lead-source-agnostic — it just reads a CSV.
Sourcing 300 real, verified Texas dental clinic emails needs an actual
data source (a paid lookup tool like Apollo/Hunter/Google Places, a
purchased list, or manual collection from clinic websites). Never invent
or pattern-guess emails (e.g. `info@clinicname.com`) — unverified
addresses bounce, and a high bounce rate damages the a2h.info sending
domain's reputation for *all* of this repo's transactional email, not
just this campaign.

## Legal note

This is B2B commercial email, which CAN-SPAM permits without prior
opt-in — but it does require: truthful subject/from lines (this script's
copy is), a real physical postal address (see `OUTREACH_PHYSICAL_ADDRESS`
above), and a working opt-out honored promptly (the "reply unsubscribe"
line — check replies regularly during a send and add opt-outs to
`leads/suppressed.csv`). If clinics are outside the US, check local rules
(e.g. Texas's own consumer-protection statutes, or CASL if any lead is in
Canada) before sending.
