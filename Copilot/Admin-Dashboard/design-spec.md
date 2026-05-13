# Design spec - skstalents.fr/admin

> Layout section par section, du haut vers le bas. Charte SKS Talents (vert #5A8A6F principal, Cormorant Garamond + Inter, flat minimal).

## 0. Authentification

URL : `https://www.skstalents.fr/admin`
Protection : `?token=DASHBOARD_PRIVATE_TOKEN` ou cookie de session
Fallback : redirect vers `/` si non authentifie

## 1. Nav bar (top, sticky)

Composition :
- Logo SKS (left)
- Liens : `Home` · `Missions` · `Leads` · `LinkedIn` · `Site & SEO` · `Agents IA` · `Settings`
- Badge "42% operationnel" (calcule depuis pourcentages departements)
- Date du jour + initiales `GK` (right)

## 2. Header personnalise

```
Bonjour Georges · 3 actions urgentes
```

Le compteur "3 actions urgentes" calcule :
- Posts LinkedIn en queue de validation
- Hot leads sans relance > 48h
- Missions stale (pas de progres > 7 j)

## 3. Quick Actions (4 boutons primary)

| Bouton | Lien interne | Donnee surfacee |
|--------|--------------|-----------------|
| Lundi Matin CEO | `/admin/monday` | Recap auto du rapport hebdo |
| 5 posts a valider | `/admin/linkedin/queue` | Notion DB Queue Validation |
| Hot leads | `/admin/leads/hot` | Supabase `lead_events` filtre |
| Missions | `/admin/missions` | Notion DB (a creer ou existant ?) |

## 4. Modules SKS (6 KPIs temps reel) - style Furious cards

Layout : 6 cards en grid 3x2 (desktop) ou 1 colonne (mobile).

| Card | Valeur | Source |
|------|--------|--------|
| CRM | 8 actifs | Supabase lead_events |
| Missions | 18 (7 AH + 11 LS) | Notion DB Missions |
| Production | 3 / 5 | Notion Queue Validation (posts publies / total semaine) |
| Staffing | 142 placements | Notion DB Placements (historique) |
| Qualite | 75% retention 5 ans | Calcul manuel + override |
| Finances | 38 k€ MTD | Manatal API ou manuel |

## 5. Queue LinkedIn a valider + Hot leads (2 colonnes)

Coeur de la routine lundi matin.

**Colonne gauche - Queue LinkedIn (5 posts)** :
- Pour chaque post Notion (statut "A valider") :
  - Card avec preview du texte
  - Type (perso/page), Pilier (4 piliers editoriaux), Date prevue
  - Boutons `Valider` (PATCH Notion `Statut=Valide`) / `Modifier` (deep-link Notion) / `Rejeter`

**Colonne droite - Hot leads** :
- 5 derniers leads Supabase `lead_events` avec criteres ICP
- Pour chaque : email + entreprise + page d'origine + scoring
- Bouton `Relancer` (deep-link Calendly + mailto pre-rempli)

## 6. 6 departements - barres d'avancement

Layout : 6 lignes avec progress bar SKS green.

| Departement | Pourcentage | Methodo % |
|-------------|-------------|-----------|
| Communication | 90% | Site + LinkedIn brand = en place |
| Marketing | 95% | Tracking + crons + rapport hebdo = en place |
| Commercial | 50% | CRM en place, outbound manque |
| Produit IA | 0% | A construire sur Cowork |
| Analytics | 60% | GSC live + LLM monitor, manque dashboard |
| Ops | 30% | Resend + Notion, manque facturation |

Chaque % cliquable -> redirige vers la page detail du departement.

## 7. Performance LinkedIn 7 jours

4 cards horizontales :
- Impressions (perso + page combinees ou separees)
- Engagement rate moyen
- Followers delta
- Newsletter delta

Source : Notion KPIs LinkedIn Weekly + Supabase linkedin_kpis_weekly.

## 8. Site SEO + Veille

2 cards :

**Top 3 requetes Google** :
- 3 requetes en meilleure position depuis GSC API live
- Pour chaque : query + position + impressions

**Ratio LLM citations** :
- "SKS Talents cite dans X / 15 tests" (5 prompts x 3 LLMs)
- Source : Supabase llm_mention_checks (derniere week)

**Veille du jour** :
- 3 dernieres actus de `linkedin_veille` (status nouveau)

## 9. Cockpits sources Notion (3 cards link)

3 boutons vers les boards Notion existants :
- 🧭 Agence Board · `https://www.notion.so/Agence-SKS-TALENTS-Board-LI-Site-41bb9c354a9d4c7aa968e1ed2f4af1af`
- 📊 Site · `https://www.notion.so/...` (DB Website Content)
- 🏦 SALES · `https://www.notion.so/...` (DB SALES)

## 10. Infrastructure technique (badges status)

Ligne de badges colores :
- Notion (vert si API repond)
- Vercel + Supabase (vert si SUPABASE_URL reachable)
- Cowork (gris, "a construire")
- Hetzner + n8n (gris, "Run 2 plus tard")

Chaque badge cliquable affiche dernier statut + lien dashboard externe.

## 11. Output commercial (footer noir vert SKS)

Recap offre 3 tiers + objectifs 2030 (deja documente dans Notion roadmap).

## 12. Mobile responsive

- Nav bar : burger menu
- 6 KPIs : 2 colonnes (vs 3)
- Queue LinkedIn + Leads : 1 colonne (stack)
- Cockpits Notion : 1 colonne

## Stack technique pour build

- Next.js page `app/(routes)/admin/page.tsx` (server component)
- Auth : middleware Next.js avec DASHBOARD_PRIVATE_TOKEN
- Data fetching : appels parallel a Notion + Supabase + GSC API + Calendly
- Style : Tailwind avec design tokens SKS deja existants

## Estimation effort

| Phase | Duree |
|-------|-------|
| Auth + layout shell + nav | 0.5 j |
| Sections 4-7 (KPIs + Queue + departements) | 1.5 j |
| Sections 8-9 (SEO + Notion cards) | 0.5 j |
| Section 10-11 (badges + footer) | 0.5 j |
| Mobile responsive + polish | 0.5 j |
| Tests + deploy | 0.5 j |
| **TOTAL** | **3-4 jours Claude Code** |
