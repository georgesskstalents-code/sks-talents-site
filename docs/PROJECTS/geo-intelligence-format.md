# GEO Intelligence · PR #8 · specification

> Extension du systeme Lundi Matin SKS (PR #7) · remplace le compteur `X/75` par un pipeline decisionnel structure.
> Cree le 2026-08-27 · valide par CEO le meme jour.

## Vue d'ensemble

```
[LAYER 1 observed  GSC]    ┐
[LAYER 2 extrapolated jobs]├─► univers 60-90 queries ─► SCAN 5 LLMs ─► recos 3-5 actions ─► rapport lundi
[LAYER 3 hypothesis Claude]┘                          ▲
                                                       │
                                     learning loop ───┘
```

## Pipeline hebdomadaire (chaque lundi 05h30 UTC)

1. **`geo-query-universe.mjs`** · construit ou met a jour l'univers de requetes en 3 layers.
2. **`llm-domination-scan.mjs`** v2 · scan 5 LLMs sur les 15 stable_core_queries + 5-10 rotating.
3. **`geo-recommendation-engine.mjs`** · Claude synthese 3-5 actions priorisees.
4. **`geo-learn-from-scans.mjs`** · extrait competiteurs recurrents + terminologie + intents · ajoute hypotheses Layer 3.
5. **`generate-lundi-matin-sks.mjs`** · assemble le mail avec le Core Visibility Score + les actions GEO + alertes contextuelles.

## Vocabulaire strict (partout dans les sorties)

- **observed** · reellement observe dans une source accessible (API LLM directe, GSC, Google Suggest).
- **extrapolated** · deduit par transformation reglee d'une donnee observed (variations jobRoles.ts, articles.ts).
- **hypothesis** · genere par Claude sur la base du positionnement business. JAMAIS presente comme utilise par des utilisateurs.
- **inferred** · infere mais non confirme (ex : compétiteur extrait via NER dans la reponse alors que le LLM n'a pas fourni de citation native).

Aucune inference ne doit etre transformee en observation via le learning loop.

## Pondération (validee CEO 2026-08-27)

- 25 % business_intent
- 20 % adequation_offres_verticaux_sks
- 20 % intensite_concurrentielle_pertinente (concurrents pertinents tier 1 comptent plus que citations generalistes)
- 15 % gap_sks_llm_presence
- 10 % gsc_signals_when_available
- 10 % effort_inverse

GSC n'est plus dominant · une requete avec 0 impression mais forte intent business peut atteindre priorite 1.

## 4 niveaux de presence

- **absent** · SKS n'apparait pas.
- **cited** · SKS mentionne sans recommandation particuliere.
- **recommended** · SKS presente comme un choix pertinent pour l'intention utilisateur.
- **dominant** · SKS classe en 1er OU presente comme reference du secteur.

## Core Visibility Score /75

15 stable_core_queries x 5 LLMs = 75 points. Une "mention" = niveau != absent.

Ces 15 queries restent stables 12+ semaines pour permettre la mesure d'evolution reelle.

Les rotating queries scannees en supplement N'ENTRENT PAS dans le /75.

## Adaptive variance

- V1 = 1 run par (query, LLM) · minimal cost.
- Escalade 3 runs UNIQUEMENT sur queries detectees comme instables (presence flippe 2+ fois sur 4 semaines).
- Rapport hebdo affiche · variance moyenne mesuree + queries en 3 runs.

## Alertes contextuelles (affichees UNIQUEMENT si affectant les donnees)

- Scan partiel (availability < 80 %).
- Variance elevee mesuree (> 25 % sur queries core).
- Recommandations GEO indisponibles.
- Sources inferred > 60 % vs natives.
- Queries sans donnees > 15 %.

Si aucune alerte pertinente cette semaine, aucune section alerte affichee.

## Fichiers

### Nouveaux
- `scripts/geo-query-universe.mjs`
- `scripts/geo-recommendation-engine.mjs`
- `scripts/geo-learn-from-scans.mjs`
- `scripts/lib/geo-known-competitors.json`
- `docs/PROJECTS/geo-intelligence-format.md` (ce fichier)

### Modifies (PR #7 conserve · extensions)
- `scripts/llm-domination-scan.mjs` (rewrite v2 structure)
- `scripts/lib/lundi-matin-config.json` (nouveau schema geo)
- `scripts/lib/lundi-matin-email-template.mjs` (nouvelles sections)
- `scripts/generate-lundi-matin-sks.mjs` (integration geo + previous score comparison)
- `.github/workflows/lundi-matin-sks.yml` (4 steps ajoutes)

## Runtime data (JSONL + JSON versionnes auto par cron)

- `data/geo-query-universe.json` · univers courant
- `data/llm-domination-latest.json` · scan de la semaine
- `data/llm-domination-history.jsonl` · historique semaines
- `data/geo-recommendations-latest.json` · 3-5 actions
- `data/geo-learning-latest.json` · dernier passage learning loop
- `data/lundi-matin-snapshots/YYYY-Wxx.html` · snapshot rendu email

## Secrets GitHub Actions requis

- `ANTHROPIC_API_KEY` (deja en prod)
- `OPENAI_API_KEY` (a creer · gpt-4o-mini · ~3-5 €/mo)
- `PERPLEXITY_API_KEY` (a creer · sonar model · ~5-8 €/mo)
- `MISTRAL_API_KEY` (a creer · small-latest · ~1-2 €/mo)
- `GEMINI_API_KEY` (a creer · gratuit free tier · 0 €)
- `RESEND_API_KEY` (deja en prod)
- `NOTION_TOKEN` (deja en prod)
- `PLAUSIBLE_API_KEY` (a creer post-subscription · 0 € starter)
- `BUFFER_ACCESS_TOKEN` (deja en prod)
- `GSC_OAUTH_*` (deja en prod)

## Cout mensuel V1

- Claude API (scan + synthese + learning + hypothesis gen) · 8-12 €/mo
- OpenAI · 3-5 €/mo
- Perplexity · 5-8 €/mo
- Mistral · 1-2 €/mo
- Gemini · 0 €
- **Plafond total · 25 €/mo** (respecte budget CEO)

Escalation 3 runs sur queries instables ajoute jusqu'a +3-5 €/mo · reste sous plafond.

## Reportes en V2 (post-rodage 3-4 semaines)

- Historisation Notion versionnee des actions GEO (aujourd'hui uniquement en JSONL local).
- Suivi impact des actions recommandees semaine sur semaine (action prise / non prise / impact mesure).
- Section "compétiteurs radar" dedie · evolution tier 1/2/3 sur 12 semaines.
- Multi-langue (EN queries) si expansion internationale.

## Governance

- Le rapport EST le pilote CEO. Georges valide chaque action ou l'archive.
- Le systeme ne prend AUCUNE action seule sur le site · toutes les actions passent par PR relue.
- Learning loop ne promeut jamais hypothesis en observed automatiquement · requiert nouvelle source reelle.
- Aucune "estimation" LLM presentee comme "mesure" · flag explicite partout.

## Limites techniques declarees

Documentees en detail dans ce fichier · NON reaffichees chaque lundi dans le rapport (seulement alertes contextuelles quand une limite affecte les donnees de la semaine).

Voir specifiquement : non-determinisme LLM, variation regionale, dependance API (Perplexity seule pour citations natives), fuzziness "recommande vs cite", pas de position SERP-like, rate limits, session context, absence de mesure impressions/clicks LLM.
