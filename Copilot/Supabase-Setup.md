# Supabase — durable persistence pour leads + analytics

## Contexte

Avant ce branchement, tous les événements (pageviews, soumissions de formulaires, leads) étaient écrits dans `data/*.jsonl` sur le filesystem Vercel. Or ce filesystem est **wipé à chaque deploy** : la donnée disparaissait.

Le code de [lib/siteIntelligence.ts](../lib/siteIntelligence.ts) fait maintenant un **dual-write** :
- Filesystem (dev local + prod : utile pour debug court terme).
- Supabase (durable, agrégeable, requêtable).

Le code se comporte en **no-op** sur Supabase tant que les variables d'environnement ne sont pas remplies. Aucune régression possible.

## 1. Crée le projet Supabase

1. Va sur https://supabase.com → New project (plan gratuit suffit).
2. Récupère :
   - `Project URL` → c'est `SUPABASE_URL`
   - `service_role` key (Settings → API → service_role / secret) → c'est `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Ne jamais utiliser la `anon` key côté serveur.** La service_role key bypasse RLS — elle ne doit JAMAIS partir au browser.

## 2. Crée les 2 tables

Dans Supabase → SQL Editor → colle le SQL ci-dessous et exécute :

```sql
-- Table 1 : analytics du site (pageviews, agent queries, CTA clicks…)
create table if not exists public.site_analytics (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  path text not null,
  title text,
  query text,
  target text,
  message text,
  "sessionId" text,
  "createdAt" timestamptz not null default now()
);

create index if not exists site_analytics_created_at_idx
  on public.site_analytics ("createdAt" desc);
create index if not exists site_analytics_type_idx
  on public.site_analytics (type);

-- Table 2 : événements lead (rappel demandé, formulaire soumis, etc.)
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  "pagePath" text not null,
  email text,
  "createdAt" timestamptz not null default now()
);

create index if not exists lead_events_created_at_idx
  on public.lead_events ("createdAt" desc);
create index if not exists lead_events_email_idx
  on public.lead_events (email);

-- Table 3 : soumissions des diagnostics IA sectoriels (Animal Health / Life Sciences)
create table if not exists public.diagnostic_submissions (
  id uuid primary key default gen_random_uuid(),
  sector text not null check (sector in ('animal-health', 'life-sciences')),
  email text not null,
  first_name text not null,
  last_name text,
  company text not null,
  role text,
  q1 text not null,
  q2 text,
  q3 text not null,
  q4 text,
  q5 text,
  q1_other text,
  q3_other text,
  primary_agent_id text,
  primary_agent_label text,
  roi_summary text,
  submitted_at timestamptz not null default now()
);

create index if not exists diagnostic_submissions_submitted_at_idx
  on public.diagnostic_submissions (submitted_at desc);
create index if not exists diagnostic_submissions_sector_idx
  on public.diagnostic_submissions (sector);
create index if not exists diagnostic_submissions_email_idx
  on public.diagnostic_submissions (email);

-- RLS : on ne sert ces tables qu'en service_role (clé serveur),
-- donc on bloque tout accès anonymous/authenticated.
alter table public.site_analytics enable row level security;
alter table public.lead_events enable row level security;
alter table public.diagnostic_submissions enable row level security;
```

## 3. Remplis les env vars

### En local — `.env.local`

```bash
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
SUPABASE_ANALYTICS_TABLE=site_analytics
SUPABASE_LEADS_TABLE=lead_events
```

### Sur Vercel — Settings → Environment Variables

Mêmes 4 variables, scope **Production** (et Preview si tu veux tracker les preview deploys).

## 4. Vérifie que ça marche

1. Push (déjà fait pour la plomberie code).
2. Sur Vercel, après le deploy : ouvre la home → un événement `pageview` doit apparaître dans la table `site_analytics` quasi instantanément (vérifie via le Table Editor Supabase).
3. Soumets le formulaire de [contact](https://www.skstalents.fr/contact#rappel) avec un email de test → un row dans `lead_events`.

## 5. Que se passe-t-il avec l'historique des fichiers `.jsonl` ?

Sur Vercel : il était déjà éphémère, rien à migrer.
En local (`data/site-analytics-log.jsonl`, `data/site-lead-log.jsonl`) : le fichier reste là, le code le lit toujours en fallback si Supabase n'est pas atteint.

## 6. Checklist post-activation

- [ ] Les 4 env vars sont posées dans `.env.local` ET Vercel
- [ ] Les 2 tables existent dans Supabase
- [ ] Un `pageview` apparaît après visite de la home prod
- [ ] Un row apparaît dans `lead_events` après soumission du formulaire de rappel
- [ ] L'email hebdomadaire du lundi 8h continue à fonctionner (la fonction `readSiteAnalyticsLog` lit Supabase si dispo)
