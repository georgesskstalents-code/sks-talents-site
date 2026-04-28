# Notion CMS

## What it does

The SKS TALENTS website uses Notion as a content management system for dynamic pages, newsletters, and site search content.

## Required env vars

- `NOTION_TOKEN`
- `NOTION_VERSION`
- `NOTION_SITE_DATABASE_ID`
- `NOTION_ARTICLES_DATABASE_ID`
- `NOTION_JOB_ROLES_DATABASE_ID`
- `NOTION_DB_NOTES_ID`
- `NOTION_DB_ACTIONS_ID`
- `NOTION_CONTENT_SYNC_SECRET`
- `NOTION_READ_TIMEOUT_MS`

## How it is used

- `lib/notion.ts` reads content from Notion and supports sitemap fallback.
- `lib/dashboardStore.ts` validates dashboard tokens and sync secrets.
- `app/sitemap.ts` uses Notion content to generate dynamic sitemap entries.

## Key rotation

- `NOTION_TOKEN` should be rotated from the Notion integration settings.
- `NOTION_CONTENT_SYNC_SECRET` can be regenerated in the dashboard or code side and updated in Vercel.

## Common errors

- `Invalid auth` or 401 from Notion: wrong token or expired integration.
- `Database not found`: invalid database ID.
- `Request timeout`: increase `NOTION_READ_TIMEOUT_MS` or check Notion availability.

## Docs

- Notion API docs: https://developers.notion.com/docs
