# SKS TALENTS - Freeze and Claude Code / Vercel Handoff

Date: 2026-04-24

## 1. Freeze status

This repository is at a good freeze point for deployment.

What was verified locally on 2026-04-24:

- `npm run lint` passed
- `npm run build` passed
- critical local routes answered in `200 OK`
- security headers are still active on the tested pages

Critical routes checked locally:

- `/`
- `/diagnostic`
- `/lexique-life-sciences-rh`
- `/investment-funds`

Important build note:

- the build passes, but `/sitemap.xml` triggers a Notion dynamic fetch fallback during build
- this is not blocking deployment
- if a fully static sitemap is required later, the Notion read path should be cached or refactored

## 2. What the final site contains

The site is no longer a simple brochure site. It is a niche authority and conversion platform for:

- Life Sciences
- Animal Health
- healthtech / e-sante
- structuration RH
- recrutement post-financement
- SEO / GEO / LLM acquisition

Main live blocks already implemented:

- sector pages
- blog and SEO / GEO / LLM pages
- market hubs
- ecosystem pages
- funds hub and source-first fund pages
- internal search
- site assistant
- diagnostic
- printable diagnostic report
- dirigeant scorecard
- lexicon hub
- downloadable guides with lead capture
- subscription page
- audience page
- use-cases page
- dashboard and print view

## 3. Business-critical flows already in place

### Diagnostic

- visitor completes the diagnostic
- result appears instantly on-site
- visitor can request a personalized reading
- request goes to `g.kengue@skstalents.com` by default unless `CONTACT_NOTIFICATION_EMAIL` is set

### Guides / whitepapers

- visitor fills the lead form
- anti-spam / Turnstile can run if configured
- internal notification email is sent
- guide access email is sent automatically
- the lead is persisted / logged

### Commercial pages

Already in place:

- `/abonnement`
- `/pour-qui`
- `/cas-d-usage`
- `/scorecard-dirigeant`
- `/diagnostic/rapport`

### Funds + SEO / LLM cluster

The funds cluster is already built and linked into the site:

- `/bpifrance-biotech-medtech`
- `/france-biotech-panorama-healthtech`
- `/fonds-sante-france`
- `/angels-sante-business-angels-sante`
- `/seventure-partners-life-sciences`
- `/kurma-partners-biotech-healthtech`
- `/jeito-capital-biotech-healthtech`
- `/eic-fund-deeptech-biotech`
- `/sofinnova-partners-life-sciences`
- `/eurazeo-healthcare-growth`
- `/truffle-capital-biotech-medtech`
- `/merieux-equity-partners-sante`
- `/cathay-capital-healthcare`
- `/extens-digital-health-france`

Do not rename these slugs after freeze.

## 4. Files Claude Code must preserve

Claude Code should preserve and reuse these data / authority layers:

- `data/seoGrowthPages.ts`
- `data/investmentFunds.ts`
- `data/siteAssistant.ts`
- `data/marketHubs.ts`
- `data/resources.ts`
- `data/editorialSources.ts`
- `data/newsSignals.ts`
- `data/jobRoles.ts`
- `data/articles.ts`
- `data/lexiconHub.ts`

These files hold:

- SEO and LLM landing pages
- source-first fund content
- editorial reference links
- ecosystem references
- institutional and market sources
- role / salary / source mappings
- lexicon and guide structures

## 5. Source and reference inventory to keep

Claude Code must not strip the source logic from the project.

The main official / reference sources already used or embedded in the project include:

### Institutional / ecosystem

- France Biotech: <https://france-biotech.fr/>
- Panorama France HealthTech: <https://france-biotech.fr/publications/le-panorama-france-healthtech/>
- France Biotech cartographie des fonds sante 2024 PDF: <https://france-biotech.fr/wp-content/uploads/2025/01/Cartographie-des-fonds-dinvestissement-francais-en-sante-en-2024-Synthese-1.pdf>
- Bpifrance: <https://www.bpifrance.fr/>
- Bpifrance biotech expertise: <https://www.bpifrance.fr/nos-solutions/investissement/investissement-expertise/biotech>
- Bpifrance biotech and medtech VC funds: <https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/>
- Le Hub Bpifrance: <https://lehub.bpifrance.fr/>
- Business France: <https://www.businessfrance.fr/>
- Medicen Paris Region: <https://medicen.org/>
- Lyonbiopole: <https://www.lyonbiopole.com/>
- Eurobiomed: <https://www.eurobiomed.org/>
- Enosis Sante: <https://enosis-sante.fr/>

### Funds / investors

- Angels Sante: <https://www.angelssante.fr/>
- Seventure Partners: <https://www.seventure.fr/en/>
- Kurma Partners: <https://www.kurmapartners.com/>
- Jeito: <https://www.jeito.life/>
- EIC Fund: <https://eic.ec.europa.eu/eic-fund_en>
- Sofinnova Partners: <https://www.sofinnovapartners.com/>
- Eurazeo: <https://www.eurazeo.com/en/>
- Truffle Capital: <https://truffle.com/>
- Merieux Equity Partners: <https://merieux-partners.com/en/>
- Cathay Capital: <https://www.cathaycapital.com/>
- Extens: <https://extens.eu/>

### Sector and professional references already embedded elsewhere

- LEEM: <https://www.leem.org/>
- SNITEM: <https://www.snitem.fr/>
- SIDIV: <https://sidiv.fr/>
- Ordre national des veterinaires: <https://www.veterinaire.fr/>
- Universite Paris-Saclay: <https://www.universite-paris-saclay.fr/>
- ENVT: <https://envt.fr/>

Important:

- the detailed reference inventory is already encoded inside the repo
- Claude Code should reuse existing URLs from the data files instead of rebuilding them manually

## 6. Deployment environment variables

### Required for a serious deployment

- `NEXT_PUBLIC_SITE_URL`
- `SITE_URL`
- `CONTACT_NOTIFICATION_EMAIL`
- `MAIL_FROM_EMAIL`
- `NEXT_PUBLIC_CALENDLY_URL`
- `CALENDLY_URL`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `DASHBOARD_PRIVATE_TOKEN`

### Required if Notion CMS / dashboard sync is used

- `NOTION_TOKEN`
- `NOTION_VERSION`
- `NOTION_SITE_DATABASE_ID`
- `NOTION_ARTICLES_DATABASE_ID`
- `NOTION_JOB_ROLES_DATABASE_ID`
- `NOTION_DB_NOTES_ID`
- `NOTION_DB_ACTIONS_ID`
- `NOTION_CONTENT_SYNC_SECRET`

### Required if rate limiting / KV protection is used

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

or the equivalent Vercel KV variables:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

### Required if durable storage / logging is used

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_FEEDBACK_TABLE`
- `SUPABASE_LEADS_TABLE`

### Optional but useful

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`
- `SITE_ASSISTANT_USE_AI`
- `SITE_INTELLIGENCE_EMAIL`
- `FEEDBACK_NOTIFICATION_EMAIL`
- `CALLBACK_WEBHOOK_URL`
- `LEADS_WEBHOOK_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN`
- `NEXT_PUBLIC_CHATWOOT_BASE_URL`
- `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID`
- `NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID`
- `TRUSTPILOT_WIDGET_ID`
- `NEXT_PUBLIC_SENJA_WIDGET_ID`
- `VIMEO_VIDEO_ID`
- `NEXT_PUBLIC_VIMEO_VIDEO_ID`
- `NEXT_PUBLIC_PURPLE_URL`

## 7. Freeze decision

Recommended decision:

- freeze the current scope now
- do not change slugs
- do not restructure the funds cluster
- do not rework the diagnostic flow before deployment
- do not move source URLs out of the data layer

## 8. Next steps after freeze

### Step 1 - Prepare deployment

- check all environment variables
- decide final domain and canonical URL
- connect the project to Vercel
- set production env vars in Vercel

### Step 2 - Pre-production QA

- test forms end-to-end
- test diagnostic submission
- test guide capture and guide access emails
- test callback emails
- test internal search
- test the main funds pages
- test `robots.txt` and `sitemap.xml`

### Step 3 - Deploy

- deploy to Vercel preview
- review preview routes
- deploy to production

### Step 4 - Post-launch

- submit sitemap in Google Search Console
- verify GA4 / GTM / Search Console
- monitor forms and emails
- check branded search and key landing pages

## 9. What to give Claude Code in VS Code

Give Claude Code:

1. the full repository
2. this handoff document
3. the production environment variable list
4. Vercel access
5. the instruction to preserve all current routes, slugs, data files and source links

## 10. Prompt to paste into Claude Code

Use this prompt in Claude Code:

```text
Open this repository and deploy the current SKS TALENTS site to Vercel without changing the content architecture.

Read first:
- docs/CLAUDE_CODE_VERCEL_HANDOFF_2026-04-24.md

Rules:
- keep all current routes and slugs unchanged
- preserve the funds cluster, diagnostic flow, guides, scorecard, abonnement, pour-qui and cas-d-usage pages
- preserve the source URLs and editorial references already encoded in the data files
- do not rewrite or simplify the SEO / LLM structure
- do not remove Notion, guide capture, callback, dashboard or assistant logic

Tasks:
- verify install, lint and build
- configure the Vercel project
- set the required environment variables
- deploy a preview
- smoke test the critical routes
- then deploy production

Critical routes to test:
- /
- /diagnostic
- /diagnostic/rapport
- /scorecard-dirigeant
- /lexique-life-sciences-rh
- /guides/100-concepts-cles-structuration-rh-life-sciences-animal-health
- /guides/guide-dirigeants-recruter-structurer-scaler-life-sciences
- /guides/pourquoi-votre-recrutement-vous-ralentit-concepts-a-corriger
- /abonnement
- /pour-qui
- /cas-d-usage
- /investment-funds
- /bpifrance-biotech-medtech
- /france-biotech-panorama-healthtech
- /fonds-sante-france
- /angels-sante-business-angels-sante
- /seventure-partners-life-sciences
- /kurma-partners-biotech-healthtech
- /jeito-capital-biotech-healthtech
- /eic-fund-deeptech-biotech
- /sofinnova-partners-life-sciences
- /eurazeo-healthcare-growth
- /truffle-capital-biotech-medtech
- /merieux-equity-partners-sante
- /cathay-capital-healthcare
- /extens-digital-health-france

Deliver back:
- preview URL
- production URL
- any missing env vars
- any deployment blockers
- any route that does not return 200
```

## 11. Minimal deployment checklist

- Vercel project created
- production domain connected
- env vars set
- build passes on Vercel
- forms tested
- email provider tested
- Turnstile tested
- Search Console connected
- sitemap submitted
- smoke test done on the critical routes

## 12. Final CEO note

At this stage, the right move is not to keep adding scope.

The right move is:

- freeze
- deploy
- monitor
- exploit
- publish on cadence
- convert leads

The next value now comes from operation and distribution, not from adding more pages before launch.
