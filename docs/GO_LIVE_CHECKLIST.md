# SKS TALENTS Go-Live Checklist

## 1. Vercel environment variables

Required

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_SITE_URL=https://www.skstalents.fr`
- `SITE_URL=https://www.skstalents.fr`
- `NOTION_TOKEN`
- `NOTION_SITE_DATABASE_ID`
- `NOTION_CONTENT_SYNC_SECRET`
- `CONTACT_NOTIFICATION_EMAIL=g.kengue@skstalents.com`
- `FEEDBACK_NOTIFICATION_EMAIL=g.kengue@skstalents.com`
- `SITE_INTELLIGENCE_EMAIL=g.kengue@skstalents.com`

Recommended security

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`

Recommended analytics / SEO

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID`
- `NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID`
- `NEXT_PUBLIC_SENJA_WIDGET_ID`

## 2. Notion production checks

- Base unique connected: `Website Content SKS Talents`
- `Status` values include `Published`
- `Content Type` values match the site (`article`, `job_role`, etc.)
- `Slug` unique per entry
- `Source Name` and `Source URL` filled before publication

## 3. Cloudflare / DNS

- Domain `skstalents.fr` added to Vercel
- `www.skstalents.fr` added to Vercel
- DNS points to Vercel
- old Bubble DNS entries removed after cutover
- SSL active
- WAF enabled
- Bot protection enabled
- Rate limiting rule added on `/api/*`
- Cloudflare cache purged after the DNS switch

## 4. Search Console

- Domain property verified
- `https://www.skstalents.fr/sitemap.xml` submitted
- Request indexing for:
  - `/`
  - `/blog`
  - `/job-roles`
  - `/resources`
  - `/life-sciences`
  - `/animal-health`
  - `/investment-funds`

## 5. QA before launch

- Header links checked on desktop and mobile
- Footer links checked
- Contact form tested
- Callback form tested
- Orientation flow tested
- Chat opens and responds
- Notion published article visible on `/blog`
- Notion published job role visible on `/job-roles`
- Notion published event visible on `/events`
- Trustpilot / Senja widgets load if configured
- Chatwoot authorized for `https://www.skstalents.fr`

## 6. After launch

- Check Search Console indexing
- Check GA4 real-time events
- Check weekly editorial watch suggestions
- Check feedback emails arrive on `g.kengue@skstalents.com`
- Check lead notifications arrive on `g.kengue@skstalents.com`
- Rotate any temporary local secrets used during setup
