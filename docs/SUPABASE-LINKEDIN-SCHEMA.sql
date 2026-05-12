-- =====================================================================
-- SCHEMA Supabase pour tracking LinkedIn SKS Talents
-- A executer dans Supabase Dashboard > SQL Editor > New query > Run
-- Aligne avec les 3 DB Notion du board "LinkedIn Agency" (decouvertes le 2026-05-12)
-- =====================================================================

-- 1. KPIs hebdomadaires (perso + page entreprise)
-- Source : DB Notion "KPIs LinkedIn Weekly" remplie par CEO lundi 8h
-- Cron : linkedin-kpis-weekly lundi 6h30 UTC lit Notion -> ecrit ici
CREATE TABLE IF NOT EXISTS linkedin_kpis_weekly (
  id uuid default gen_random_uuid() primary key,
  -- Identification de la semaine
  week_label text not null,                    -- "Semaine 19 - 2026" (Notion: Semaine)
  week_start date not null,                    -- date debut semaine (Notion: Date debut)
  -- Followers
  profile_followers int,                       -- Notion: Followers perso
  profile_followers_delta int,                 -- Notion: Δ followers perso
  page_followers int,                          -- Notion: Followers page
  page_followers_delta int,                    -- Notion: Δ followers page
  -- Activite perso
  profile_impressions int,                     -- Notion: Impressions perso
  profile_engagement_rate numeric(5,2),        -- Notion: Engagement rate perso % (en %)
  profile_posts_published int,                 -- Notion: Posts perso publies
  -- Activite page
  page_posts_published int,                    -- Notion: Posts page publies
  -- Lead generation
  dms_qualified int,                           -- Notion: DMs entrants qualifies
  calendly_bookings int,                       -- Notion: RDV Calendly bookes
  -- Insights
  insight_key text,                            -- Notion: Insight cle
  recommendation_next_week text,               -- Notion: Reco S+1
  top_post_url text,                           -- URL du top post de la semaine (resolu via relation)
  -- Metadata
  notion_page_id text,                         -- ID page Notion d'origine (idempotence)
  synced_at timestamptz default now() not null,
  -- Contraintes
  unique(week_start)
);

CREATE INDEX IF NOT EXISTS linkedin_kpis_weekly_week_idx ON linkedin_kpis_weekly (week_start DESC);

-- 2. Posts LinkedIn (analytics individuels)
-- Source : remplissage manuel ou via cron analytics (a definir plus tard)
-- Optionnel pour la phase 1, pourra etre alimente plus tard
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id uuid default gen_random_uuid() primary key,
  network text not null,                       -- 'profile' ou 'page'
  format text,                                 -- 'text', 'carousel', 'video', 'repost'
  pillar text,                                 -- 'marche', 'metier', 'conseil', 'cas-concret', 'prise-position'
  published_at timestamptz not null,
  url text,
  title text,
  impressions int,
  engagement_rate numeric(5,2),
  comments_total int,
  comments_qualified int,                      -- commentaires de cibles ICP
  reactions_total int,
  reposts int,
  notion_page_id text,                         -- lien vers DB Calendar Notion
  synced_at timestamptz default now() not null,
  unique(network, published_at, title)
);

CREATE INDEX IF NOT EXISTS linkedin_posts_published_idx ON linkedin_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS linkedin_posts_network_idx ON linkedin_posts (network);

-- 3. Veille sectorielle (carburant pour content-gen)
-- Source : DB Notion "Veille Sectorielle" alimentee par cron linkedin-veille quotidien 7h UTC
CREATE TABLE IF NOT EXISTS linkedin_veille (
  id uuid default gen_random_uuid() primary key,
  title text not null,                         -- Notion: Titre actu
  url text not null,
  summary text,                                -- Notion: Resume 3 lignes
  source text not null,                        -- afvac / lepointveterinaire / france-biotech / etc.
  category text,                               -- M&A / Levee / Reglementaire / Nomination / Etude / Innovation
  relevance text,                              -- 'haute' / 'moyenne' / 'basse'
  status text default 'nouveau',               -- 'nouveau' / 'utilise' / 'rejete'
  published_at date,                           -- Notion: Date publication
  detected_at timestamptz default now() not null, -- Notion: Date scrap
  notion_page_id text,
  unique(url)
);

CREATE INDEX IF NOT EXISTS linkedin_veille_detected_idx ON linkedin_veille (detected_at DESC);
CREATE INDEX IF NOT EXISTS linkedin_veille_category_idx ON linkedin_veille (category);
CREATE INDEX IF NOT EXISTS linkedin_veille_status_idx ON linkedin_veille (status);

-- =====================================================================
-- Verification : doit retourner 3 lignes
-- =====================================================================
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
  AND tablename LIKE 'linkedin_%'
ORDER BY tablename;

-- Test insertion optionnel (a executer apres les CREATE)
-- INSERT INTO linkedin_veille (title, url, source, category, relevance)
-- VALUES ('Test M&A Sevetys', 'https://example.com/test', 'afvac', 'M&A', 'haute');
-- SELECT * FROM linkedin_veille WHERE url = 'https://example.com/test';
-- DELETE FROM linkedin_veille WHERE url = 'https://example.com/test';
