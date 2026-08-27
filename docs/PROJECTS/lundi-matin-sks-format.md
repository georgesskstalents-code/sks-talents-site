# Lundi Matin SKS Talents · rapport hebdo consolide

> **PR #7** · SKS Autonomous Cabinet v3 · 27 aout 2026

## Objectif

Un seul rapport hebdomadaire consolide (5 min de lecture max) qui remplace :
- Le "Suivi SKS Talents" existant
- Le "Rapport hebdomadaire SKS Talents" (Site Intelligence Digest) existant

Envoye chaque **lundi 7h30 Paris** a `g.kengue@skstalents.fr`.

## Structure du rapport (11 sections)

1. **Headline** · une phrase avec le chiffre de la semaine + momentum arrow
2. **Signaux rouges + verts** · 3 a traiter + 3 a repliquer
3. **Funnel complet** · Site + LinkedIn + Chloe (implicite dans les sections leads + LinkedIn)
4. **Leads par source** · Chloe Live, Simulator, Diagnostic form, Contact direct
5. **SEO** · 5 requetes gagnees + 5 perdues + 5 a surveiller
6. **LLM domination** · score /75 mentions "SKS Talents" (5 LLM × 15 requetes)
7. **LinkedIn** · perso + page + newsletter subs
8. **Contenu produit vs publie** · Content Master v2 status
9. **Sales Pipeline (Notion)** · HOT / WARM / COLD counts + CA potentiel
10. **Ops · Sprint SKS Autonomous Cabinet v3** · progress Batch 1 + Batch 2
11. **Decision de la semaine** · une seule chose a trancher

## KPIs · les 5 primary suivis (North Star)

| KPI | Cible 2026 | Cible juin 2027 |
|---|---|---|
| Leads qualifies/semaine (score > 70) | 8 | 25 |
| RDV bookes/mois | 8 | 12 |
| Trafic organique Google (clics/semaine) | 400 | 1 500 |
| Impressions LinkedIn combines (Perso+Page) | 90k/sem | 250k/sem |
| Score LLM domination (/75 mentions) | 30 | 45 |

Configurable dans `scripts/lib/lundi-matin-config.json`.

## Sources data · fallback graceful si API absente

| Source | Fichier / API | Fallback si absent |
|---|---|---|
| Chloe Live | `data/chloe-chat-log.jsonl` | 0 conv · 0 emails |
| Lead Qualifier | `data/lead-qualifier-log.jsonl` | 0 leads |
| Simulator | `data/simulator-lead-log.jsonl` | 0 leads |
| Plausible | API `/api/v1/stats/aggregate` | Section "n/a" |
| GSC | `data/gsc-latest-snapshot.json` (via cron gsc-oauth-helper.mjs) | Section "n/a" |
| LLM scan | `data/llm-domination-latest.json` (via scan hebdo) | Run scan on-the-fly |
| Buffer posts | `data/buffer-drafts-log.jsonl` | 0 posts |
| Notion Sales | Notion API + data_source_id | Message "connectez token" |
| Manatal | API (optionnel) | Skip |

## Fichiers livres

- `scripts/generate-lundi-matin-sks.mjs` · orchestrator principal
- `scripts/llm-domination-scan.mjs` · scan LLM 5 providers × 15 requetes
- `scripts/lib/lundi-matin-email-template.mjs` · rendu HTML SKS-branded
- `scripts/lib/lundi-matin-config.json` · KPI targets + LLM queries + config
- `.github/workflows/lundi-matin-sks.yml` · cron lundi 6h30 UTC (7h30 Paris ete)
- `data/llm-domination-history.jsonl` · historique score LLM (auto-commit)
- `data/lundi-matin-snapshots/YYYY-Wxx.html` · snapshot email (auto-commit)

## Secrets GitHub Actions requis

- `RESEND_API_KEY` (deja en prod)
- `NOTION_TOKEN` (deja en prod pour LinkedIn Calendar)
- `ANTHROPIC_API_KEY` (deja en prod pour Chloe Live)
- `OPENAI_API_KEY` (nouveau · a creer)
- `PERPLEXITY_API_KEY` (nouveau · a creer)
- `MISTRAL_API_KEY` (nouveau · a creer)
- `GEMINI_API_KEY` (nouveau · a creer)
- `PLAUSIBLE_API_KEY` (nouveau · post subscription Plausible)
- `BUFFER_ACCESS_TOKEN` (deja en prod)
- `GSC_OAUTH_*` (deja en prod pour SEO)

Chaque source manquante = section "n/a" gracieuse · pas de crash.

## Test manuel

```bash
node scripts/generate-lundi-matin-sks.mjs
```

Genere le HTML localement dans `data/lundi-matin-snapshots/YYYY-Wxx.html` meme sans secrets.
Le mail Resend et la page Notion sont skippes si les tokens sont absents.

## Prochaines evolutions (Batch 2 · mai 2027)

- Section "CA reconnu / attendu" avec Manatal API complete
- Section "Cercle Chloe · engagement community" (post-lancement)
- Section "Newsletter Premium · MRR + churn" (post-lancement Stripe)
- Section "YouTube · vues + retention" (post-lancement chaine)
- Section "Cohortes leads" · analyse retention 4-12 semaines
- Alertes push email en cas de dropoff SEO majeur (au-dela du hebdo)

## Governance

- Le rapport EST le pilote CEO · Georges le lit lundi matin, decide, delegue
- Chaque section = 1 lien vers dashboard detaille pour aller plus profond
- La "Decision de la semaine" est generee par heuristique · a affiner au fil de l'eau
- Historique 12 mois versionne dans Notion sous projet "SKS Autonomous Cabinet v3"
