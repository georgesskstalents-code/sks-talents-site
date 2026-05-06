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

-- SEO keyword proposals (weekly TF-IDF generation, operator approval flow).
-- Populated by /api/cron/seo-keywords every Monday 5h UTC. Approved entries
-- are merged into root metadata via getApprovedKeywords() in app/layout.tsx.
create table if not exists public.seo_keyword_proposals (
  id bigserial primary key,
  proposed_at timestamptz not null default timezone('utc', now()),
  decided_at timestamptz,
  keyword text not null,
  source_category text not null check (source_category in ('fund', 'ecosystem', 'competitor', 'media')),
  source_url text not null,
  score numeric(5,3) not null check (score >= 0 and score <= 1),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists seo_keyword_proposals_status_score_idx
  on public.seo_keyword_proposals (status, score desc);
create index if not exists seo_keyword_proposals_proposed_at_idx
  on public.seo_keyword_proposals (proposed_at desc);
create unique index if not exists seo_keyword_proposals_keyword_week_uniq
  on public.seo_keyword_proposals (keyword, date_trunc('week', proposed_at));

alter table public.seo_keyword_proposals enable row level security;

drop policy if exists "deny_anonymous_seo_keyword_proposals" on public.seo_keyword_proposals;
create policy "deny_anonymous_seo_keyword_proposals"
on public.seo_keyword_proposals
for all
to anon
using (false)
with check (false);
