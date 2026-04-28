# SKS TALENTS Deployment Screen-by-Screen

## 1. Before you start

- Rotate any secret that has already been shared in chat or copied into non-secure places.
- Use `.env.production.example` as the exact list of variables to paste into Vercel.
- Keep `g.kengue@skstalents.com` as the destination for leads, feedback, and weekly reports.

## 2. Vercel

### Project import

1. Open Vercel.
2. Click `Add New...` then `Project`.
3. Import the SKS TALENTS repository.
4. Keep the framework as `Next.js`.
5. Before clicking deploy, open `Environment Variables`.

### Variables to paste

Paste all values from `.env.production.example`, replacing placeholders with your real secrets:

- OpenAI
- Notion
- notification emails
- Turnstile
- Upstash
- Resend
- GA4
- Google verification
- Trustpilot
- Senja
- Calendly / Purple

### Production domains

1. Open the project.
2. Go to `Settings`.
3. Open `Domains`.
4. Add `skstalents.fr`.
5. Add `www.skstalents.fr`.

## 3. Cloudflare

### DNS

1. Add the domain to Cloudflare if not already present.
2. In `DNS`, point the domain to Vercel using the values shown by Vercel.
3. Keep proxy enabled where compatible.

### Security

In Cloudflare, enable:

- SSL/TLS full mode
- WAF managed rules
- Bot protection
- rate limiting on `/api/*`

Recommended rule idea:

- path contains `/api/`
- block or challenge on abusive bursts

## 4. Google Search Console

### Verification

1. Open the domain property for `skstalents.fr`.
2. If needed, verify the domain via DNS.

### Sitemap

1. Open `Sitemaps`.
2. Submit `https://www.skstalents.fr/sitemap.xml`.

### Request indexing

Inspect and request indexing for:

- `/`
- `/blog`
- `/job-roles`
- `/resources`
- `/life-sciences`
- `/animal-health`
- `/investment-funds`

## 5. GA4

1. Create or open the GA4 property.
2. Create a web data stream for `https://www.skstalents.fr`.
3. Copy the measurement ID.
4. Paste it into `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
5. Redeploy.
6. Check `Realtime` after opening the site.

## 6. Trustpilot and Senja

### Trustpilot

1. Open your Trustpilot business account.
2. Find the TrustBox/widget settings.
3. Copy the `Business Unit ID`.
4. Copy the widget `Template ID`.
5. Paste them into:
   - `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID`
   - `NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID`

### Senja

1. Open your Senja dashboard.
2. Open the widget you want to show.
3. Copy the widget ID.
4. Paste it into `NEXT_PUBLIC_SENJA_WIDGET_ID`.

## 7. Notion CMS

1. Keep the base `Website Content SKS Talents` connected to `SKS – Content Sync`.
2. Publish content by setting:
   - `Status = Published`
   - `Slug` filled
   - `Content Type` filled
   - `Source Name` filled
   - `Source URL` filled
3. If a source is not approved, the sync should reject it.

## 8. Security checks

Before launch, confirm:

- OpenAI key set
- Turnstile keys set
- Upstash keys set
- Resend key set
- Notion token set
- a new `NOTION_CONTENT_SYNC_SECRET` generated for production

## 9. Final QA desktop and mobile

### Desktop

- homepage loads
- chat opens
- header links work
- footer links work
- contact form works
- callback flow works
- orientation flow works
- blog listing shows published Notion content
- job roles listing shows published Notion content

### Mobile

- sticky CTA visible
- header menu opens
- chat opens and closes correctly
- forms are tappable
- dropdowns/selects work
- layout does not overflow horizontally

## 10. After launch

Check during the first 48 hours:

- Search Console indexing
- GA4 realtime
- weekly report received on `g.kengue@skstalents.com`
- lead emails received on `g.kengue@skstalents.com`
- feedback emails received on `g.kengue@skstalents.com`
- Trustpilot / Senja widgets render correctly
