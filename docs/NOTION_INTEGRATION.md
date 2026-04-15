# Notion Integration - SKS TALENTS

Le lien public Notion partage une vue utile du workspace, mais il ne suffit pas pour ecrire dans Notion via API.

La strategie retenue maintenant est simple:

- une seule base Notion pour le site
- plusieurs vues dans cette base
- un champ `Content Type` pour distinguer les contenus

## Base cible

- `Website Content SKS Talents`
- URL fournie:
  - `https://www.notion.so/642f98f00e474ebc92bbf93a17131004?v=400ab5e1df2040238f9e219031aa47b6&source=copy_link`
- ID utile:
  - `642f98f00e474ebc92bbf93a17131004`

## Variables a renseigner

```env
NOTION_TOKEN=secret_xxxxx
NOTION_VERSION=2022-06-28
NOTION_SITE_DATABASE_ID=642f98f00e474ebc92bbf93a17131004
NOTION_CONTENT_SYNC_SECRET=feedd839f21cdfc36f0d225a2f29825040ef89a79a39fc04109778636b5a2839
```

## Etapes concretes dans Notion

1. Ouvrez [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
2. Creez ou reutilisez l'integration `SKS – Content Sync`.
3. Copiez le token secret genere.
4. Ouvrez la base `Website Content SKS Talents`.
5. Cliquez sur `...` puis `Connections` et ajoutez `SKS – Content Sync`.
6. Verifiez que la base est bien connectee.

## Structure recommandee pour la base unique

Champs fortement recommandes:

- `Title` (title)
- `Slug` (rich text)
- `Content Type` (select)
- `Status` (select)
- `Publish date` (date)
- `Vertical` (select)
- `Category` (select)
- `Excerpt` (rich text)
- `Main Content` (rich text)
- `SEO Title` (rich text)
- `Meta Description` (rich text)
- `Source Name` (rich text)
- `Source URL` (rich text)
- `Salary Range` (rich text)
- `Studies` (rich text)
- `Schools` (rich text)
- `Industries` (rich text)

Valeurs utiles de `Content Type`:

- `page`
- `article`
- `job_role`
- `school`
- `investment_fund`
- `event`
- `reference`
- `comparison`
- `study`
- `news`
- `market_hub`

## Endpoint de sync

Une fois les variables renseignees, le projet expose:

- `POST /api/notion-sync`

Payload attendu:

```json
{
  "secret": "feedd839f21cdfc36f0d225a2f29825040ef89a79a39fc04109778636b5a2839",
  "articleLimit": 10,
  "roleLimit": 20
}
```

### Test local

```bash
curl -X POST http://127.0.0.1:3056/api/notion-sync \
  -H "Content-Type: application/json" \
  -d '{"secret":"feedd839f21cdfc36f0d225a2f29825040ef89a79a39fc04109778636b5a2839","articleLimit":10,"roleLimit":20}'
```

## Ce que fait la sync maintenant

- upsert des derniers articles dans la base unique
- upsert des fiches metiers dans la meme base
- recherche par `Slug`
- renseigne `Content Type` quand le champ existe
- n'envoie que les proprietes qui existent deja dans la base

## Point important

Le connecteur a ete adapte pour la base unique. Il ne depend plus obligatoirement de deux bases separees.
