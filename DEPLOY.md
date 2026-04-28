# Dashboard SKS Talents

## Ce qui est prêt

- Route locale et future route prod du dashboard : `/dashboard`
- Version print / export : `/dashboard/print`
- API locale :
  - `/api/dashboard`
  - `/api/notion-notes`
  - `/api/notion-actions`
  - `/api/export-csv`
  - `/api/export-pdf`
- Mode démo automatique si les sources marketing ne sont pas encore branchées
- Notes et plan d'action persistants :
  - en local via fichiers JSON
  - en prod via Notion dès que `NOTION_DB_NOTES_ID` et `NOTION_DB_ACTIONS_ID` sont renseignés

## URL à embarquer dans Notion

Une fois le site déployé, utiliser :

- `https://dashboard.skstalents.com/dashboard`

Si vous gardez le dashboard dans le même projet web :

- `https://www.skstalents.fr/dashboard`

Le bloc Looker Studio reste au-dessus.
Le dashboard SKS doit être ajouté en dessous via `/embed`.

## Variables d'environnement à prévoir

### Sécurité dashboard

- `DASHBOARD_PRIVATE_TOKEN`

Si défini :
- la route `/dashboard`
- la version print
- les API dashboard

attendront le token en query string ou header.

## Sources marketing

- `GA4_PROPERTY_ID`
- `GSC_SITE_URL`
- `GOOGLE_ADS_CUSTOMER_ID`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `META_AD_ACCOUNT_ID`
- `META_ACCESS_TOKEN`
- `LINKEDIN_AD_ACCOUNT_ID`

## Notion dashboard

- `NOTION_TOKEN`
- `NOTION_DB_NOTES_ID`
- `NOTION_DB_ACTIONS_ID`

## Cache / quotas

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Ce qui se passe avant le déploiement

Tant que les sources marketing ne sont pas branchées :

- `/api/dashboard` sert un jeu de données de démo adapté au site SKS
- les Notes et Actions restent modifiables
- si les bases Notion dashboard ne sont pas encore créées, le fallback local persiste dans :
  - `data/dashboard-notes-store.json`
  - `data/dashboard-actions-store.json`

## Ce qui change après le déploiement

Pour une vraie version live :

1. créer / partager les 2 databases Notion :
   - `Notes`
   - `Actions`
2. renseigner les variables dashboard
3. définir le domaine final :
   - idéal : `dashboard.skstalents.com`
4. embarquer l'URL dans la page Notion déjà utilisée pour le pilotage

## Point important Vercel

Les fichiers écrits localement ne sont pas une solution durable en production.

En prod :
- utilisez Notion pour `Notes` et `Actions`
- utilisez Redis/KV uniquement pour le cache
- ne comptez pas sur les fichiers JSON comme stockage final

## Validation recommandée avant mise en prod

1. ouvrir `/dashboard`
2. vérifier le mode démo
3. créer une note
4. changer le statut d'une action
5. vérifier la version print
6. télécharger un CSV
7. intégrer l'URL dans la page Notion sous le Looker Studio
