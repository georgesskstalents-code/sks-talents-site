# Dashboard Gestion Site — SKS Talents

## URLs principales

| Ce que tu veux | URL |
|---|---|
| **Dashboard complet** (Notion-style, KPI synthèse) | `https://www.skstalents.fr/dashboard?token=<DASHBOARD_PRIVATE_TOKEN>` |
| **Suivi quotidien** (5 min routine matinale) | `https://www.skstalents.fr/dashboard/suivi?token=<DASHBOARD_PRIVATE_TOKEN>` |
| **API JSON** (pour intégrations futures) | `https://www.skstalents.fr/api/dashboard?token=<DASHBOARD_PRIVATE_TOKEN>` |

> Le token est dans `.env.local` sous `DASHBOARD_PRIVATE_TOKEN`.

## Ce que tu vois sur le dashboard

### Onglet Synthèse
6 KPI cards comparées à la période précédente :

| KPI | À surveiller |
|---|---|
| **Sessions** | Trafic global. Pic = à analyser. Baisse > 15% = alerte |
| **Utilisateurs uniques** | Audience nette (déduplication des sessions) |
| **Conversions** | Form_success — la métrique business clé |
| **Leads (sales)** | Demandes qualifiées — relier à ta pipeline CRM |
| **Clics CTA** | Calendly + "Réserver 15 min" — engagement actif |
| **Taux de conversion form** | (succès / envois). < 40% = formulaire à corriger |

### Onglet Plan d'action
Les actions générées automatiquement chaque semaine selon les data : trafic en baisse → vérifier GSC, content gaps → créer articles, erreurs → debug, etc.

### Onglet Trafic
Top pages, sources, durée moyenne (à brancher GA4 pour les vraies valeurs).

### Onglet SEO
Top requêtes Google, position moyenne, CTR (à brancher Search Console).

### Onglet Conversions
Funnel : visite → CTA → form_submit → form_success → lead.

### Onglet Pages populaires
Classement des pages par vues (7j / 30j).

## Routine matinale recommandée (5 min)

1. Ouvre `/dashboard/suivi?token=...`
2. Lis les 4 KPIs du haut (vues / leads / recherches chat / formulaires)
3. Parcours la checklist d'actions du jour
4. Réponds aux nouveaux leads (section ✉️)
5. Note les content gaps qui reviennent (section 🚨)
6. Vérifie qu'il n'y a pas d'erreur (section ⚠)

## Limitations actuelles

- Les logs sont dans `data/site-analytics-log.jsonl` et `data/site-lead-log.jsonl` (gitignorés)
- Sur Vercel, ces logs sont **éphémères** : réinitialisés à chaque deploy
- Pour persistance permanente : brancher GA4 (vues) + Supabase (leads)

## Où trouver les vraies données historisées

| Source | Pour quoi |
|---|---|
| Google Search Console | Requêtes Google, indexation, CTR, position |
| Looker Studio | Vues GA4 historisées, sources, géographie |
| Notion "Suivi SKS Talents" | Tes notes manuelles, observations, hypothèses |
| Trustpilot | Avis clients (impact SEO + réassurance) |

## Comment regénérer le token dashboard

```bash
openssl rand -hex 32
# → copier dans .env.local et dans Vercel env vars
# → redéployer
```
