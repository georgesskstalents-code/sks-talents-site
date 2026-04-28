# API Status — Live Tracking

This document tracks the live status of every API key required by the SKS TALENTS site.
**No real values are stored here** — only ✅ / ⏳ status flags.

Real values live in:
- `.env.local` (local development) — gitignored
- Vercel environment variables (production) — set via `vercel env add`

---

## PRIORITY 1 — Required for production launch

| Service | Variable(s) | Status |
|---|---|---|
| Site URL | `NEXT_PUBLIC_SITE_URL`, `SITE_URL` | ⏳ |
| Resend (emails) | `RESEND_API_KEY` | ⏳ |
| Turnstile (anti-bot) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | ⏳ |
| Dashboard auth | `DASHBOARD_PRIVATE_TOKEN` | ⏳ |
| Email routing | `CONTACT_NOTIFICATION_EMAIL`, `MAIL_FROM_EMAIL`, `FEEDBACK_NOTIFICATION_EMAIL`, `SITE_INTELLIGENCE_EMAIL` | ✅ |
| Calendly | `CALENDLY_URL`, `NEXT_PUBLIC_CALENDLY_URL` | ✅ |
| Notion (CMS site) | `NOTION_TOKEN`, `NOTION_VERSION`, `NOTION_SITE_DATABASE_ID`, `NOTION_ARTICLES_DATABASE_ID`, `NOTION_JOB_ROLES_DATABASE_ID`, `NOTION_CONTENT_SYNC_SECRET` | ✅ |

## PRIORITY 2 — Required for full feature set

| Service | Variable(s) | Status |
|---|---|---|
| Anthropic (assistant) | `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | ⏳ key / ✅ model |
| OpenAI (assistant) | `OPENAI_API_KEY`, `OPENAI_MODEL` | ⏳ key / ✅ model |
| Supabase (leads/feedback) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_LEADS_TABLE`, `SUPABASE_FEEDBACK_TABLE` | ⏳ url+key / ✅ tables |
| Notion (dashboard) | `NOTION_DB_NOTES_ID`, `NOTION_DB_ACTIONS_ID` | ⏳ |

## PRIORITY 3 — Optional / later

| Service | Variable(s) | Status |
|---|---|---|
| KV / Upstash | `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | ⏳ |
| External webhooks | `CALLBACK_WEBHOOK_URL`, `LEADS_WEBHOOK_URL`, `FEEDBACK_WEBHOOK_URL` | ⏳ |
| Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | ⏳ |
| Trustpilot / Senja | `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID`, `NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID`, `TRUSTPILOT_WIDGET_ID`, `NEXT_PUBLIC_SENJA_WIDGET_ID` | ✅ widget id / ⏳ rest |
| Chatwoot | `NEXT_PUBLIC_CHATWOOT_BASE_URL`, `NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN` | ✅ |
| Vimeo (hero) | `NEXT_PUBLIC_VIMEO_VIDEO_ID`, `VIMEO_VIDEO_ID` | ✅ |
| Purple | `NEXT_PUBLIC_PURPLE_URL` | ✅ |

---

## Live service status

- Notion CMS: pending verification
- Email routing: pending verification
- Turnstile: pending verification
- Calendly: pending verification
- Vercel hosting: pending verification
- OVH DNS: pending confirmation

## Notes

- Do not store real secrets in this repository.
- Use `.env.local` for development and Vercel env vars (Production scope) for live site.
- Once a key is in both `.env.local` and Vercel, the CEO will not be asked for it again in any future session.
