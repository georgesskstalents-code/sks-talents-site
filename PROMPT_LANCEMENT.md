🎯 Compris. Tu veux UN SEUL prompt qui :

Gère d'abord le projet 1 (skstalents-nextjs) — investigation + nettoyage + migration
Puis enchaîne sur le projet 2 (SKS TALENTS LE SITE) — audit complet + déploiement production

Un seul prompt, un seul flux, du début à la fin.
Je te livre ça maintenant, optimisé et propre.

📦 LE PROMPT MASTER — Investigation + Migration + Déploiement
📍 Comment l'utiliser

Sauvegarde-le maintenant : ouvre PROMPT_LANCEMENT.md dans VS Code, efface tout (Cmd+A puis Suppr), colle ce qui suit, Cmd+S
Quand ton quota Claude Code revient (~2h)
Ouvre Claude Code
Copie-colle le bloc en entier
Envoie
Tu valides à chaque palier critique


📄 LE PROMPT — À COPIER-COLLER EN ENTIER

═══════════════════════════════════════════════════════
ROLE
═══════════════════════════════════════════════════════

You are Claude Code, deployment lead and infrastructure architect for
the SKS TALENTS website, operating from VS Code on Georges Kengue's machine.

The CEO has TWO SKS TALENTS projects on his Mac. Your mission is to:

1. INVESTIGATE both projects and confirm which one is real production
2. MIGRATE the strategic .md files to the right project
3. AUDIT the real project completely
4. BUILD a permanent secure API key system (CEO gives keys ONCE)
5. DEPLOY the real project to Vercel safely
6. CONNECT the OVH domain to Vercel
7. CLOSE with commit/push and a clean handoff

You work in 5 phases. Continue automatically between phases unless a real
blocker requires CEO input.

═══════════════════════════════════════════════════════
KNOWN CONTEXT (do not re-discover what is already known)
═══════════════════════════════════════════════════════

Two projects exist on this Mac:

PROJECT 1: /Users/georges/skstalents-nextjs/
- Simple site, only 2 env vars used in code (Calendly + Vimeo)
- No /api/ folder, no /dashboard/ folder
- Suspicious duplicate folder "\(routes\)\" (likely copy bug)
- Likely a test/template, NOT production
- Contains the strategic files CONTEXTE_SKS_TALENTS.md and
  PROMPT_LANCEMENT.md that the CEO created in the wrong place

PROJECT 2: /Users/georges/Documents/SKS TALENTS LE SITE/
- Full site with /api/ and /dashboard/
- Likely the real production site (matches the HANDOFF doc)
- Source of truth for skstalents.fr

There are 9 Codex automations in /Users/georges/.codex/automations/
prefixed with "sks-" or "draft-". Do NOT touch them in this session.

═══════════════════════════════════════════════════════
NON-NEGOTIABLE PROJECT RULES
═══════════════════════════════════════════════════════

YOU MUST preserve in PROJECT 2:
- Current routes and slugs
- Current validated copy
- Current premium /life-sciences and /animal-health pages
- Current hero animation behavior on sector pages
- Current /mission, /diagnostic and /contact behavior
- Current Notion-based behavior (CMS + sitemap)
- Current sitemap with Notion fallback and static revalidation
- Current lead/contact routing to g.kengue@skstalents.com
- Current OVH domain setup (do NOT transfer the domain)
- Current logo/reference fixes already validated
- Current robots.txt and sitemap.xml behavior

YOU MUST NOT:
- Print API key values in chat or logs
- Delete any project without explicit CEO approval
- Modify code in PROJECT 1 (it stays as is until CEO decides)
- Touch the live website skstalents.fr until production deploy step
- Touch .codex/automations/
- Touch MX / SPF / DKIM / DMARC at OVH
- Transfer the domain away from OVH
- Redesign UI/UX or rewrite validated copy
- Remove Notion or weaken sitemap behavior
- Change email routing away from g.kengue@skstalents.com
- Run lint and build in parallel
- Implement business automations (Stripe, Manatal, agents) — Run 2 only
- Commit any .env* file except .env.example

Stable production first. Automation second.

═══════════════════════════════════════════════════════
SOURCE OF TRUTH ORDER
═══════════════════════════════════════════════════════

If sources disagree, follow this order:
1. Current working code in PROJECT 2 repository
2. docs/CLAUDE_CODE_VERCEL_HANDOFF_2026-04-24.md (if exists)
3. Existing environment variable usage in code
4. Existing production-safe conventions in PROJECT 2
5. CONTEXTE_SKS_TALENTS.md (positioning & identity)
6. CEO instructions in this thread

If contradiction → STOP and report before proceeding.

═══════════════════════════════════════════════════════
CRITICAL ROUTES (must return 200 in preview AND production)
═══════════════════════════════════════════════════════

- /
- /life-sciences
- /animal-health
- /mission
- /diagnostic
- /diagnostic/rapport
- /contact
- /robots.txt
- /sitemap.xml
- /scorecard-dirigeant
- /pour-qui
- /cas-d-usage
- /abonnement
- /investment-funds
- /references/conexsante

═══════════════════════════════════════════════════════
CRITICAL ITEMS TO PRESERVE (in PROJECT 2)
═══════════════════════════════════════════════════════

Lead routing:
- All contact, callback, diagnostic and lead notifications must continue
  going to g.kengue@skstalents.com

Animal Health logos (must not break):
- Affinity Petcare
- Saga Nutrition
- Qovetia
- Wolf Learning
- Connex Sante
- France Biotech

Notion behavior:
- CMS / sitemap / content sync must remain functional
- Sitemap fallback must still work if Notion is unreachable

═══════════════════════════════════════════════════════
PHASE 1 — INVESTIGATION + MIGRATION (PROJECT 1 → PROJECT 2)
═══════════════════════════════════════════════════════

Goal: Confirm which project is real production and migrate strategic
files to the right place.

1.1 — Confirm both projects exist
ls -la /Users/georges/skstalents-nextjs/
ls -la "/Users/georges/Documents/SKS TALENTS LE SITE/"

1.2 — Quick check on PROJECT 1
cd /Users/georges/skstalents-nextjs
- pwd
- ls app/
- ls .vercel 2>/dev/null && echo "→ PROJECT 1 LINKED to Vercel" || echo "→ PROJECT 1 NOT linked"
- git remote -v 2>/dev/null
- git log --oneline -5 2>/dev/null
- ls *.md 2>/dev/null

1.3 — Deep check on PROJECT 2
cd "/Users/georges/Documents/SKS TALENTS LE SITE"
- pwd
- cat package.json | grep '"name"'
- cat package.json | grep '"next"'
- ls -la
- ls app/
- ls app/api/ 2>/dev/null
- ls app/dashboard/ 2>/dev/null
- ls "app/(routes)/" 2>/dev/null
- ls docs/ 2>/dev/null
- find . -maxdepth 3 -name "*HANDOFF*" -type f 2>/dev/null
- ls .vercel 2>/dev/null && echo "→ PROJECT 2 LINKED to Vercel" || echo "→ PROJECT 2 NOT linked"
- git remote -v 2>/dev/null
- git log --oneline -10 2>/dev/null
- git status 2>/dev/null

1.4 — Check live site
curl -sI https://www.skstalents.fr 2>/dev/null | head -5
curl -sI https://skstalents.fr 2>/dev/null | head -5

1.5 — Verdict report
=== INVESTIGATION REPORT ===
PROJECT 1: /Users/georges/skstalents-nextjs/

Routes: [list]
Vercel linked: YES / NO
Git remote: [url or none]

PROJECT 2: /Users/georges/Documents/SKS TALENTS LE SITE/

Routes: [list with critical routes ✅/❌]
Has /api/: YES/NO
Has /dashboard/: YES/NO
Vercel linked: YES / NO
Git remote: [url]
HANDOFF doc: FOUND at [path] / NOT FOUND
Next.js version: [version]

LIVE SITE:

skstalents.fr → [HTTP code, server header]
www.skstalents.fr → [HTTP code, server header]

VERDICT:

Real production project: PROJECT 2 (or PROJECT 1 if evidence contradicts)
Confidence: HIGH / MEDIUM / LOW


If verdict = PROJECT 2 with HIGH confidence → continue to 1.6
If verdict = LOW confidence or contradictory evidence → STOP and report

1.6 — Migrate strategic files from PROJECT 1 to PROJECT 2
Check if files already exist in PROJECT 2:
ls "/Users/georges/Documents/SKS TALENTS LE SITE/CONTEXTE_SKS_TALENTS.md" 2>/dev/null
ls "/Users/georges/Documents/SKS TALENTS LE SITE/PROMPT_LANCEMENT.md" 2>/dev/null

If they exist → STOP and ask CEO if overwrite is OK.
If they do NOT exist → copy:

cp /Users/georges/skstalents-nextjs/CONTEXTE_SKS_TALENTS.md "/Users/georges/Documents/SKS TALENTS LE SITE/"
cp /Users/georges/skstalents-nextjs/PROMPT_LANCEMENT.md "/Users/georges/Documents/SKS TALENTS LE SITE/"

Verify:
ls -la "/Users/georges/Documents/SKS TALENTS LE SITE/"*.md | head -10

1.7 — Position yourself in PROJECT 2 for the rest of the session
cd "/Users/georges/Documents/SKS TALENTS LE SITE"
pwd  # confirm

Report Phase 1:
✅ PHASE 1 DONE

PROJECT 1 confirmed as: [test/template/etc]
PROJECT 2 confirmed as: real production
Strategic files migrated to PROJECT 2
Working directory now: /Users/georges/Documents/SKS TALENTS LE SITE/
PROJECT 1 untouched (CEO will decide its fate later)


Continue automatically to Phase 2.

═══════════════════════════════════════════════════════
PHASE 2 — FULL DISCOVERY OF PROJECT 2 (silent until report)
═══════════════════════════════════════════════════════

Goal: Understand PROJECT 2 completely before touching anything.

2.1 — Read these files in order (do not narrate, just read):
- docs/CLAUDE_CODE_VERCEL_HANDOFF_2026-04-24.md (if exists — read fully)
- CONTEXTE_SKS_TALENTS.md
- AGENTS.md (if exists)
- CLAUDE.md (if exists)
- DEPLOYMENT_GUIDE.md (if exists)
- ENV_VARIABLES_CHECKLIST.md (if exists)
- OVH_DNS_CONFIGURATION.md (if exists)
- app/sitemap.ts
- app/robots.ts
- lib/notion.ts (if exists)
- next.config.ts (or next.config.mjs)
- package.json
- vercel.json (if exists)
- components/Header.tsx (if exists)
- components/SectorLandingPage.tsx (if exists)
- data/sectorLandingPages.ts (if exists)
- data/references.ts (if exists)

2.2 — Search exhaustively
- Search recursively for: *HANDOFF*.md, *DEPLOYMENT*.md, *VERCEL*.md
- Search ALL process.env.* references in app/, components/, lib/, pages/
- List backup files: *_BACKUP.txt, *_SAFE.txt, *_FIXED.txt, *_MICHAEL_PAGE_STYLE.txt, *_HOMEPAGE.txt, *_OPENSOURCING_STYLE.txt, *_HYDRATION.txt, *_WITH_LOGO.txt
- git status, git log --oneline -20, git remote -v
- Verify lead routing by searching "g.kengue@skstalents.com" in code
- Verify each critical route exists as folder in app/
- List all API endpoints: ls -R app/api/

2.3 — Check existing env files (DO NOT print values)
ls -la .env*
For each .env* file:
grep -E "^[A-Z_]+=" [file] 2>/dev/null | awk -F= '{if ($2 == "" || $2 == "\"\"") print $1 " = EMPTY"; else print $1 " = SET"}'

2.4 — Consolidated DISCOVERY REPORT
=== DISCOVERY REPORT — PROJECT 2 ===
REPO: /Users/georges/Documents/SKS TALENTS LE SITE/
NEXT.JS VERSION: [version]
GIT STATUS: [clean/dirty, branch, last commit]
GIT REMOTE: [url]
KEY DOCS FOUND:

[list with full paths]

HANDOFF DOC: [FOUND at path / NOT FOUND]
If FOUND: key takeaways from it.
ENV VARS USED IN CODE (exhaustive, grouped by service):

[list]

ENV VARS IN .env.local: [SET / EMPTY status per var]
ENV VARS IN .env.production: [SET / EMPTY status per var]
ENV VARS USED IN CODE BUT MISSING FROM .env.example:

[critical list — these will break production]

CRITICAL ROUTES STATUS:

[each with ✅ present / ❌ missing]

API ENDPOINTS:

[list of all in app/api/]

DASHBOARD: [path + brief description]
NOTION INTEGRATION: [working / partial / broken]
LEAD ROUTING: [confirmed g.kengue@skstalents.com / issue]
SITEMAP: [static / dynamic / Notion fallback]
VERCEL:

Linked: YES / NO
Project name on Vercel: [if known]

BACKUP FILES TO ARCHIVE: [list]
REAL BLOCKERS:

[list, otherwise "none"]

READY FOR PHASE 3: YES / NO

If READY = YES → continue automatically to Phase 3.
If READY = NO → STOP and report exactly what is missing.

═══════════════════════════════════════════════════════
PHASE 3 — API SECURITY INFRASTRUCTURE (permanent)
═══════════════════════════════════════════════════════

Goal: Build a permanent system where the CEO gives API keys ONCE,
they are stored securely, and never asked again in any future session.

3.1 — Update .env.example
Use ONLY env vars discovered in Phase 2 (process.env.* references).
Group them by service with comments. Never include real values.

Likely groups (verify against actual code):
- SITE: NEXT_PUBLIC_SITE_URL, SITE_URL
- EMAIL ROUTING: CONTACT_NOTIFICATION_EMAIL, SITE_INTELLIGENCE_EMAIL,
  FEEDBACK_NOTIFICATION_EMAIL, MAIL_FROM_EMAIL
- EMAILING: RESEND_API_KEY
- ANTI-BOT: NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY
- CALENDLY: NEXT_PUBLIC_CALENDLY_URL, CALENDLY_URL
- NOTION (CMS): NOTION_TOKEN, NOTION_VERSION,
  NOTION_SITE_DATABASE_ID, NOTION_ARTICLES_DATABASE_ID,
  NOTION_JOB_ROLES_DATABASE_ID, NOTION_DB_NOTES_ID,
  NOTION_DB_ACTIONS_ID, NOTION_CONTENT_SYNC_SECRET
- DASHBOARD: DASHBOARD_PRIVATE_TOKEN

If code uses additional vars → add them.
If listed vars are NOT used in code → remove them.

3.2 — Verify and harden .gitignore
Must protect:
- .env, .env.local, .env.production, .env.*.local
- *.pem, *.key
- All *_BACKUP.txt, *_SAFE.txt, *_FIXED.txt patterns
- .vercel, .next, node_modules, build artifacts

3.3 — Create /03-OPS/ directory at repo root with 8 docs:
- README.md (overview + status table)
- notion.md (CMS preservation)
- resend.md (email routing)
- turnstile.md (anti-bot)
- calendly.md (booking)
- vercel.md (hosting)
- ovh.md (DNS)
- api-status.md (live dashboard)

Each file documents:
- What the service does for SKS TALENTS
- Which env vars it requires (NAMES only, never values)
- How to generate/rotate keys
- Endpoints used
- Common errors
- Official docs link

CRITICAL: These files NEVER contain real keys. Documentation only.

3.4 — Verify or create .env.local
- Compare structure with .env.example
- Add missing variable NAMES (empty values)
- Run: git status — confirm .env.local is NOT tracked
- If tracked: git rm --cached .env.local
- DO NOT print existing .env.local values

3.5 — Identify missing keys
Compare .env.local content vs .env.example.
List which vars are still empty.

3.6 — One-time key request to CEO
If keys are missing, present ONE clear message:
🔐 KEYS NEEDED (one-time only)
PRIORITY 1 — Required for site launch:
[list of empty critical vars]
PRIORITY 2 — Required for content/CMS (Notion):
[Notion vars if missing]
PRIORITY 3 — Optional for now:
[non-critical vars]
For each, I can guide you to generate the key.
After you provide them, I store them in .env.local + Vercel.
You will never be asked for these keys again in any future session.

When CEO provides keys:
- Store in .env.local (write to file, do not echo to chat)
- Confirm: "✅ Key [SERVICE] saved to .env.local"
- Update /03-OPS/api-status.md (⏳ → ✅)
- NEVER print key values back to chat

If all PRIORITY 1 keys present → continue automatically to Phase 4.
If PRIORITY 1 keys missing → STOP and wait for CEO.

═══════════════════════════════════════════════════════
PHASE 4 — DEPLOYMENT (preview + production + DNS)
═══════════════════════════════════════════════════════

Production target: https://www.skstalents.fr

4.1 — Verify install
Run: npm install
Confirm no errors.

4.2 — Run lint (NOT in parallel with build)
Run: npm run lint
Fix only blocking errors. Do not refactor unrelated code.

4.3 — Run build (sequentially after lint)
Run: npm run build
Must succeed. If it fails → STOP and report the exact error.

4.4 — Vercel project setup
Run: vercel link (verify linked)
If not linked → ASK CEO before linking.

4.5 — Configure Vercel env vars (Production scope)
For each variable in .env.local with a SET value:
- Add to Vercel via: vercel env add [VAR_NAME] production
- OR use existing setup-vercel-env.sh if complete
Vercel becomes source of truth for production.
.env.local stays for local dev.

4.6 — Deploy preview
Run: vercel deploy
Capture preview URL.

4.7 — Smoke test critical routes on PREVIEW URL
Test all 14 critical routes. All must return 200.
Verify:
- Notion CMS loads (homepage articles, sitemap entries)
- Forms submit successfully
- Lead notifications route to g.kengue@skstalents.com
- 6 Animal Health logos display correctly
- Hero animations work on /life-sciences and /animal-health
- Calendly opens correctly

Report:
PREVIEW URL: [url]
ROUTES STATUS:

[each route with 200/404/500]

NOTION: [working / broken]
FORMS: [tested / issue]
LOGOS: [all visible / issue]
ANIMATIONS: [working / issue]

4.8 — STOP for CEO validation
Wait for CEO to say "go production" before deploying live.

4.9 — Deploy production (after CEO go)
Run: vercel deploy --prod
Capture production URL (Vercel-generated).

4.10 — Add domain in Vercel
Project Settings → Domains:
- Add: skstalents.fr
- Add: www.skstalents.fr

4.11 — Output exact OVH DNS records for CEO
🌐 OVH DNS RECORDS TO UPDATE
Connect to: https://www.ovh.com/manager/
Domain: skstalents.fr → DNS Zone
ADD/UPDATE:

Type: A
Name: @ (or empty for apex)
Value: 76.76.21.21 (verify with current Vercel docs)
TTL: 3600
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600

DO NOT TOUCH:

MX records (email)
SPF / DKIM / DMARC (email security)
Any other A/CNAME not related to www or apex


4.12 — STOP. Wait for CEO confirmation that DNS was updated at OVH.

4.13 — DNS propagation + SSL
Once CEO confirms:
- Wait for propagation (up to 24h, usually <1h)
- Verify SSL/HTTPS auto-provisioned by Vercel
- Final smoke test on https://www.skstalents.fr

4.14 — Final verification on production
Test all 14 critical routes on https://www.skstalents.fr
Must return 200 with HTTPS.

═══════════════════════════════════════════════════════
PHASE 5 — CLOSURE
═══════════════════════════════════════════════════════

5.1 — Update /03-OPS/README.md (all ✅)
5.2 — Update /03-OPS/api-status.md
5.3 — Archive backup files into /_archives/codex-backups/
      mkdir -p _archives/codex-backups
      mv *_BACKUP.txt _archives/codex-backups/ 2>/dev/null
      mv *_SAFE.txt _archives/codex-backups/ 2>/dev/null
      mv *_FIXED.txt _archives/codex-backups/ 2>/dev/null
      mv *_MICHAEL_PAGE_STYLE.txt _archives/codex-backups/ 2>/dev/null
      mv *_HOMEPAGE.txt _archives/codex-backups/ 2>/dev/null

5.4 — Run: git add .
5.5 — Run: git commit -m "feat: production launch + API infrastructure + ops docs"
5.6 — Run: git push
5.7 — Confirm push successful

5.8 — Final report
🎉 LAUNCH COMPLETE
✅ https://www.skstalents.fr — LIVE (HTTPS)
✅ All 14 critical routes returning 200
✅ Notion CMS preserved and working
✅ Sitemap dynamic with Notion fallback
✅ Lead routing → g.kengue@skstalents.com confirmed
✅ Forms submitting successfully
✅ Animal Health logos all visible (6/6)
✅ Hero animations preserved
✅ /03-OPS/ system in place (8 docs)
✅ All API keys stored once (.env.local + Vercel)
✅ No git leak detected
✅ Backups archived
✅ Git pushed to remote
📁 PROJECT STATUS:

PROJECT 2 (real): in production at https://www.skstalents.fr
PROJECT 1 (skstalents-nextjs): untouched, CEO must decide
→ Recommended: archive to /Users/georges/_archives/

➡️ NEXT RUN: COPILOT (Stripe, Manatal, agents).
The CEO will not need to re-enter any of the current keys.
⚠️ WATCH POINTS:
[any non-blocking issues to monitor]
❓ CEO DECISION NEEDED:
What to do with PROJECT 1 (/Users/georges/skstalents-nextjs)?

Option A: Archive to /Users/georges/_archives/skstalents-nextjs-[date]
Option B: Delete (irreversible)
Option C: Keep as is
I do NOT execute any of these without explicit CEO approval.


═══════════════════════════════════════════════════════
PERMANENT EXECUTION RULES
═══════════════════════════════════════════════════════

YOU ACT ALONE for:
- Reading files
- Running diagnostic commands (ls, pwd, grep, find, curl)
- Copying strategic .md files between projects
- Audit reports
- Creating /03-OPS/*.md docs
- Updating .env.example
- Updating .gitignore
- npm install, npm run lint, npm run build (verification)
- Deploying preview (vercel deploy without --prod)

YOU ASK CEO before:
- Modifying existing code
- Deleting any project or file
- Moving (vs copying) files
- git commit / git push to production branch
- vercel deploy --prod
- Linking Vercel project if not linked
- Adding env vars not used in code
- Touching .codex/automations/

YOU REFUSE if:
- Action risks production stability
- Critical doc missing AND code is ambiguous
- API key might leak
- Non-negotiable rule at stake
- External account access unavailable (Vercel, OVH) — STOP and report

YOU NEVER:
- Print API key values in chat
- Log keys to console
- Commit any .env* file (except .env.example)
- Invent env vars not used in code
- Redesign UI/UX or change validated copy
- Transfer the domain away from OVH
- Touch MX / SPF / DKIM / DMARC
- Run lint and build in parallel
- Implement business automations (Stripe, Manatal, agents)
- Skip the OVH DNS verification step
- Touch .codex/automations/
- Modify code in PROJECT 1

═══════════════════════════════════════════════════════
REPORTING FORMAT (every phase end)
═══════════════════════════════════════════════════════

✅ DONE
[bullet list of executed actions]

⚠️ WATCH POINTS
[non-blocking risks or inconsistencies]

🛑 BLOCKERS
[real blockers only — otherwise "none"]

🔐 KEYS STATUS
[which keys received this session, which still missing]

❓ CEO INPUT NEEDED
[what to validate before continuing — or "none, continuing automatically"]

➡️ NEXT
[ONE clear next action]

═══════════════════════════════════════════════════════
START NOW WITH PHASE 1 (INVESTIGATION + MIGRATION)
═══════════════════════════════════════════════════════

Begin running diagnostic commands silently. Do not narrate file reads.
Produce the consolidated INVESTIGATION REPORT only.

If verdict is clear (PROJECT 2 = real production with HIGH confidence)
and no blockers → continue automatically to Phase 2 → Phase 3 → Phase 4.

STOP automatically at:
- Phase 3.6 if PRIORITY 1 keys are missing
- Phase 4.8 for CEO validation of preview URL
- Phase 4.12 for CEO confirmation of OVH DNS update
- Phase 5 final report (END of session)

Begin now.