# SKS TALENTS Production Readiness

## Security stack

- Turnstile:
  - Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - Set `TURNSTILE_SECRET_KEY`
  - The lead forms and orientation flows will require a valid token automatically.
- Distributed rate limit:
  - Set `UPSTASH_REDIS_REST_URL`
  - Set `UPSTASH_REDIS_REST_TOKEN`
  - The API routes will use Upstash REST first and fall back to local memory only when the env is missing or unavailable.
- Security headers:
  - CSP, HSTS, COOP, CORP, nosniff and permissions policy are already enabled in `next.config.mjs`.

## Mail deliverability

- Publishing the site is not enough. Configure the domain email layer too:
  - SPF
  - DKIM
  - DMARC
- Recommended DMARC starting policy:
  - `v=DMARC1; p=quarantine; rua=mailto:infos@skstalents.com`
- If the mailbox provider is OVH, validate the exact DNS records from OVH Mail.

## Secrets rotation

- Rotate at least:
  - Turnstile secret
  - Upstash token
  - Any webhook secret
  - GA / third-party admin access
- Recommended cadence:
  - every 90 days for API secrets
  - immediately after contractor changes or suspicion of exposure

## Backups

- Keep the code in GitHub.
- Keep a zipped export of `public/`, `data/` and `docs/`.
- Keep monthly exports of content datasets.
- If you add a database later, enable daily backups and a restore test every quarter.

## Monitoring

- Add GA4 for acquisition and conversion tracking.
- Add Google Search Console for indexing and queries.
- Recommended next add:
  - Sentry for runtime errors
  - Cloudflare dashboard alerts
  - uptime monitoring on homepage and lead endpoints

## Search Console

- Add the domain property: `skstalents.fr`
- Submit sitemap:
  - `https://www.skstalents.fr/sitemap.xml`
- Request indexing first for:
  - `/`
  - `/job-roles`
  - `/salary-benchmarks`
  - `/investment-funds`
  - `/schools`
  - `/comparatifs`
  - `/studies`

## GA4

- Create a Web Data Stream in GA4.
- Put the measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Verify page views on:
  - homepage
  - `/contact`
  - `/job-roles`
  - `/orientation`

## Cloudflare

- Recommended setup:
  - orange-cloud proxy on the main domain
  - bot fight mode
  - WAF managed rules
  - basic rate limiting rule on `/api/*`
  - caching only for public pages, not APIs

## Editorial engine

- The recurring automation should publish only when:
  - a monthly batch is due
  - a verified source changed materially
  - a route is missing coverage for a priority shortage role

- Standard monthly target:
  - 20 job-role pages
  - 10 supporting articles
  - no duplicates
  - verified-source-only claims

## Monetization readiness

- Keep these public pages indexed:
  - `/media-kit`
  - `/partenaires-media`
  - `/studies`
  - `/salary-benchmarks`
- These will become the base for:
  - sponsored studies
  - ecosystem partner visibility
  - context-aligned advertising
