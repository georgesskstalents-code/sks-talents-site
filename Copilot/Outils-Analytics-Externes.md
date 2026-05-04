# Outils analytics externes — SKS Talents

Liste des outils tiers connectés (ou à connecter) pour analyser le site.

## Outils déjà configurés

| Outil | URL | Rôle | Statut |
|---|---|---|---|
| **Search Console** | https://search.google.com/search-console?resource_id=sc-domain:skstalents.fr | Requêtes Google, indexation, CTR | ✅ Configurée |
| **Looker Studio** | https://datastudio.google.com/u/0/reporting/419ebe34-5b48-47f1-8500-0879d5b9ddf2/page/yvZvF | Vues GA4 historisées, dashboard custom | ✅ Configurée |
| **Notion Suivi** | https://www.notion.so/Suivi-SKS-Talents-Site-internet-3450c86f96f48133b0b0ff57aa0586ff | Notes manuelles, plan d'action, observations | ✅ Configurée |
| **Trustpilot** | https://fr.trustpilot.com/review/skstalents.fr | Avis clients (4,5/5) | ✅ Configurée |
| **Vercel** | https://vercel.com/georgesskstalents-6501s-projects/skstalents-le-site | Hébergement, deploys, logs serveur | ✅ Configurée |

Tous accessibles en 1 clic depuis le bandeau en haut de `/dashboard?token=...`.

## À brancher pour aller plus loin

| Outil | Pourquoi | Effort |
|---|---|---|
| **GA4 (Google Analytics 4)** | Vraies pageviews + sources persistantes (vs logs Vercel éphémères) | 15 min |
| **Supabase tables** | Persistance des leads à vie (déjà branchable, env vars OK) | 30 min |
| **LinkedIn Insight Tag** | Tracking conversions LinkedIn pour campagnes | 10 min |

## Lien direct privé (à bookmarker)

> Bookmark **"SKS — matinal"** :
> `https://www.skstalents.fr/dashboard/suivi?token=<DASHBOARD_PRIVATE_TOKEN>`

Tu cliques chaque matin → 5 min → tu sais ce qui s'est passé.
