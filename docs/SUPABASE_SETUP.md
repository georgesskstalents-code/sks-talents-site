# Supabase Setup - SKS TALENTS

Ce projet sait deja envoyer durablement les leads et les retours visiteurs vers Supabase si les variables d'environnement sont renseignees.

## Tables utilisees

- `site_feedback`
- `lead_events`

Le schema SQL complet est pret ici:

- `supabase/schema.sql`

## Etapes rapides

1. Creez un projet Supabase.
2. Ouvrez `SQL Editor`.
3. Collez le contenu de `supabase/schema.sql`.
4. Executez le script.
5. Recuperez:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Renseignez aussi:
   - `SUPABASE_FEEDBACK_TABLE=site_feedback`
   - `SUPABASE_LEADS_TABLE=lead_events`

## Variables a renseigner

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_FEEDBACK_TABLE=site_feedback
SUPABASE_LEADS_TABLE=lead_events
```

## Ce que le site envoie

### Feedback visiteur
- note 1 a 5
- commentaire court
- page / pathname
- session
- user agent / referer

### Leads
- type d'evenement (`callback`, `orientation-intake`, `orientation-report`)
- nom, email, telephone
- societe, role, secteur
- page source
- metadata utile

## Important

Le projet utilise la `service_role key` uniquement cote serveur pour ecrire dans Supabase via l'API REST.
Ne jamais exposer cette cle au client.

## Test rapide

Une fois les variables remplies, soumettez simplement:
- un formulaire de rappel
- un formulaire orientation
- le popup d'avis visiteur

Puis verifiez les lignes dans `Table Editor`.
