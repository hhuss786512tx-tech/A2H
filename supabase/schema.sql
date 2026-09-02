-- inbound_leads: CRM table for the mockup-request funnel + nurture pipeline.
-- Run this once in the Supabase project's SQL Editor (Project -> SQL Editor
-- -> New query -> paste -> Run). Written to match lib/inboundLeads.js,
-- api/mockup-request.js, api/cron/process-nurture.js, and
-- api/booking-confirmed.js exactly — don't rename columns without updating
-- those files too.

create extension if not exists pgcrypto;

create table if not exists inbound_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contact info, captured from the mockup popup
  name text not null,
  business text not null,
  email text not null,
  phone text,
  phone_normalized text,

  -- creative brief, captured from the mockup popup
  niche text,
  page_count text,
  color_scheme text,
  reference_sites text,
  notes text,
  source text,

  -- internal fit scoring (computeFitScore in lib/inboundLeads.js)
  fit_score int,
  fit_tier text,
  fit_flags text[],

  -- nurture/booking state machine, driven by api/cron/process-nurture.js
  -- and api/booking-confirmed.js
  status text not null default 'new', -- new | nurturing | booked | reminded | completed
  nurture_step int not null default 0,
  video_sent_at timestamptz,
  last_nurture_sent_at timestamptz,
  event_start_time timestamptz,
  reminded_at timestamptz,
  booked_at timestamptz
);

-- Dedup on repeat submissions with the same phone number. NULLs are not
-- considered equal by Postgres unique indexes, so leads with no phone
-- number never collide with each other.
create unique index if not exists inbound_leads_phone_normalized_idx
  on inbound_leads (phone_normalized)
  where phone_normalized is not null;

create index if not exists inbound_leads_status_idx on inbound_leads (status);

-- Server-side code uses the service_role key, which bypasses RLS entirely —
-- this just keeps the table locked down if anon/authenticated keys are ever
-- used against it by mistake.
alter table inbound_leads enable row level security;
