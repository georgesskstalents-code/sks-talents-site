# Data sources - skstalents.fr/admin

> Pour chaque KPI / section du dashboard, ou les donnees viennent vraiment.

## 1. KPIs Modules SKS (6 cards)

| Card | Source primaire | Source fallback | Fraicheur |
|------|----------------|----------------|-----------|
| CRM (leads actifs) | Supabase `lead_events` table | - | Temps reel |
| Missions (18 = 7 AH + 11 LS) | Notion DB Missions (a creer si pas existante) ou hardcode | Manuel CEO | Hebdo |
| Production (3/5 posts) | Notion DB `LinkedIn Queue Validation` filtre Statut=Publie | - | Temps reel |
| Staffing (142 placements) | Notion DB Placements ou hardcode | Manuel | Trimestre |
| Qualite (75% retention 5 ans) | Hardcode + override admin | - | Trimestre |
| Finances (38k€ MTD) | Manatal API si branche, sinon Notion DB Facturation manuelle | Manuel | Hebdo |

**A clarifier avec CEO** :
- DB Notion "Missions" existe-t-elle ?
- DB Notion "Placements" / "Staffing" existe-t-elle ?
- Manatal API : branchee ? cle dispo dans env.local ?

## 2. Queue LinkedIn

Source : Notion DB `LinkedIn Queue Validation` (ID `0fd5d67a-99ef-40ae-9c7a-5f93bbfb381f`)

Filtres :
- Statut = "À valider"
- Trie par "Date limite" asc

Champs a afficher :
- Item à valider (title)
- Contenu (rich_text)
- Type (select : "texte"/"carousel"/"video"/"repost")
- Agent producteur (select : "claude-profile"/"claude-page")
- Date limite (date)

Actions disponibles depuis le dashboard :
- **Valider** : PATCH page Notion -> Statut = "Validé"
- **Modifier** : ouvre la page Notion dans nouvel onglet
- **Rejeter** : PATCH page Notion -> Statut = "Rejeté"

## 3. Hot Leads

Source : Supabase `lead_events` table

Criteres "hot" (a definir) :
- Submission diagnostic complete (5 questions remplies)
- Email pro (pas gmail/yahoo)
- Pas de relance depuis 48h
- Score ICP > 0.6 (a definir un algo)

Affichage :
- Email
- Entreprise (depuis form data)
- Page d'origine
- Date submission
- Reponses au diagnostic (5 questions)

## 4. 6 Departements + pourcentages

Source : Notion DB `Departements` (a creer) ou hardcode dans le code initialement.

Schema Notion suggere :
- Departement (title)
- Pourcentage (number)
- Owner (select : George)
- Derniere action (date)
- Prochaine action (rich_text)

## 5. Performance LinkedIn 7 jours

Source : Supabase `linkedin_kpis_weekly` (table existante)

Calcul du delta : ligne `synced_at` la plus recente vs `synced_at` precedente.

Pour les chiffres reels 2026-05-13 :
- Followers perso : 9283 (a confirmer)
- Followers page : 595 (a confirmer)
- Newsletter : 1407 abonnes (source : a confirmer)

## 6. Site SEO + Veille

**Top 3 requetes Google** : `lib/gscClient.ts -> fetchGscQueryStats()` avec OAuth refresh token deja en place.

Tri par impressions desc, top 3.

**Ratio LLM citations** : Supabase `llm_mention_checks` filtre `run_at >= 7 jours`.

Calcul : `count(mentioned=true) / count(*)` pour la derniere week.

**Veille du jour** : Supabase `linkedin_veille` filtre `detected_at >= aujourd'hui - 1 jour`, limit 3, status="nouveau".

## 7. Stack badges

Health checks :
- Notion : `GET /v1/users/me` avec NOTION_TOKEN (1 call)
- Supabase : `GET /rest/v1/` avec SUPABASE_SERVICE_ROLE_KEY (HEAD)
- Vercel : assumed OK si la page se charge
- Cowork : pas de check (gris fixe pour l'instant)
- Hetzner + n8n : pas de check (gris fixe)

## 8. Calendly bookings (pour KPI "RDV Calendly bookés")

Source : Calendly API v2

Endpoint : `GET /scheduled_events?organization=...&min_start_time=...`

Authorization : Bearer `CALENDLY_API_TOKEN` (a obtenir https://calendly.com/integrations/api_webhooks)

A ajouter dans `.env.local` et Vercel : `CALENDLY_API_TOKEN`

## 9. Donnees a hardcoder en V1 (parce que pas encore d'API)

| Champ | Valeur fixe au 2026-05-13 |
|-------|---------------------------|
| Missions count | 18 (7 AH + 11 LS) |
| Retention 5 ans | 75% |
| Newsletter subscribers | 1407 |
| LinkedIn perso followers | 9283 |
| LinkedIn page followers | 595 |
| Adresse | 128 rue la Boetie, 75008 Paris |
| 4 piliers editoriaux | LE FIL · LA DONNEE · LE CONSEIL · LE SIGNAL |

En V2 : remplacer par des appels DB / API.

## 10. Cache strategy

- KPIs critiques (queue LinkedIn, hot leads) : pas de cache (fresh chaque load)
- Performance LinkedIn 7j : cache 15 min
- SEO GSC : cache 1h (API rate-limited)
- LLM checks : cache 1h (donnees hebdo de toute facon)
- Modules SKS : cache 5 min

Use Next.js `revalidate` ou `unstable_cache`.

## 11. Env vars necessaires (deja en place)

Tous deja sur Vercel :
- `NOTION_TOKEN` + IDs DBs
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- `DASHBOARD_PRIVATE_TOKEN` (auth admin)
- `GSC_OAUTH_*` (3 vars OAuth refresh)
- `OPENAI_API_KEY` + `ANTHROPIC_API_KEY` + `PERPLEXITY_API_KEY`

A ajouter :
- `CALENDLY_API_TOKEN` (pour bookings count)
- `MANATAL_API_KEY` (pour CA MTD - peut etre branche plus tard)
