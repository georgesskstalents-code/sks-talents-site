create extension if not exists pgcrypto;

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  page text,
  pathname text,
  rating integer check (rating between 1 and 5),
  message text,
  attempts integer,
  user_agent text,
  referrer text,
  session_id text
);

create index if not exists site_feedback_created_at_idx on public.site_feedback (created_at desc);
create index if not exists site_feedback_page_idx on public.site_feedback (page);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  kind text not null,
  full_name text,
  first_name text,
  last_name text,
  email text,
  phone text,
  company text,
  role text,
  sector text,
  message text,
  page text,
  source text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists lead_events_created_at_idx on public.lead_events (created_at desc);
create index if not exists lead_events_kind_idx on public.lead_events (kind);
create index if not exists lead_events_email_idx on public.lead_events (email);

alter table public.site_feedback enable row level security;
alter table public.lead_events enable row level security;

drop policy if exists "deny_anonymous_site_feedback" on public.site_feedback;
create policy "deny_anonymous_site_feedback"
on public.site_feedback
for all
to anon
using (false)
with check (false);

drop policy if exists "deny_anonymous_lead_events" on public.lead_events;
create policy "deny_anonymous_lead_events"
on public.lead_events
for all
to anon
using (false)
with check (false);
