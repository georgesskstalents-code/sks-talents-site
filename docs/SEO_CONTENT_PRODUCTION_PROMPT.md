# SKS TALENTS - Production Prompt

## Objective
Generate SEO content for SKS TALENTS without inventing facts, numbers, partnerships, hiring volumes or salary claims.
Every new content output must be prepared for both `French` and `English`.

## Core Rules
- Use primary sources first: official company sites, public fund pages, regulator pages, government pages, official annual reports, university sites.
- Apply direct-response copywriting discipline on every important page:
  - lead with the reader benefit before the method
  - make the cost of inaction visible before presenting the solution
  - write to one primary reader, not to everyone at once
  - prefer you-focused phrasing over generic corporate phrasing
  - make proof visible near the promise and near the CTA
  - keep one primary conversion goal per page
  - use first-person CTA copy whenever relevant
- Treat bilingual output as mandatory:
  - `FR` is the editorial source version unless instructed otherwise
  - `EN` must remain faithful to the French source version
  - do not improvise extra facts in English that are absent in French
- Label every claim as one of:
  - `official`
  - `estimated`
  - `inferred`
- Do not state a hiring count unless a company-level or fund-level source explicitly supports it.
- Do not state a partnership with SKS TALENTS unless documented by the user or by a source provided by the user.
- Do not invent portfolio companies, investment rounds, salaries or exit expectations.
- If the source is partial, say so explicitly.
- Start every content job by defining:
  - one primary keyword
  - 3 to 6 keyword variations
  - the exact search intent
  - the target reader
- Make the primary keyword appear naturally in:
  - title
  - first paragraph
  - one H2
  - seo_title
  - seo_description
- Cover the relevant entities around the topic:
  - company
  - role
  - sector
  - geography
  - regulation
  - salary
  - school
  - fund
- Prefer content that is both:
  - immediately useful now
  - still valuable as evergreen content in 3 to 6 months
- Add descriptive alt text when an image or visual is proposed.
- Keep formatting mobile-friendly:
  - short paragraphs
  - obvious subheadings
  - bullets where useful
  - no long walls of text
- Use internal links intentionally to connect the content to the rest of the SKS TALENTS graph.
- Use external links only to support a factual or regulatory claim.
- Write meta descriptions to win the click, not only to repeat keywords.
- For landing pages and sector pages:
  - use FAQ blocks with direct recruiter questions
  - answer with plain language first, then clarify the strategic implication
  - make rarity, direct approach and business impact explicit
  - keep FAQ copy short enough to scan, but strong enough to convert
- For articles specifically:
  - answer the main query in the opening paragraph
  - keep one clear idea per paragraph
  - prefer short extractable sentences that can be quoted by search engines or LLMs
  - use H2 headings that match real user questions or decisions
  - end with a mini-FAQ when the topic deserves it
  - include concrete examples, sourced data points or named institutions whenever possible
  - provide an English companion version or, at minimum, an English-ready summary and metadata pack

## Required Output Fields
- `id`
- `title`
- `title_en`
- `slug`
- `content_type`
- `vertical`
- `source_name`
- `source_url`
- `source_date`
- `claim_type`
- `confidence_level`
- `verified`
- `body_markdown`
- `body_markdown_en`
- `seo_title`
- `seo_title_en`
- `seo_description`
- `seo_description_en`
- `keywords`
- `keywords_en`
- `internal_links`
- `search_intent`
- `keyword_variations`
- `keyword_variations_en`
- `suggested_alt_text`
- `suggested_alt_text_en`
- `update_trigger`
- `article_outline`
- `article_faq`
- `article_faq_en`
- `cta_type`

## Fund Profile Rules
- Separate:
  - official fund identity
  - official investment thesis
  - official portfolio examples
  - non-verified hiring opportunities
- If hiring demand is not directly sourced, use:
  - `Hiring signal exists but requires company-level validation`

## Salary Rules
- Salary data may come from secondary sources such as Indeed, Glassdoor, LinkedIn Salary or Robert Half.
- Every salary range must be tagged `estimated` unless backed by a public salary report.

## Batch Execution
Generate content in batches only:
1. 5 verified fund profiles
2. 10 verified job-role pages
3. 10 blog articles
4. 10 company spotlight pages

Do not generate 1000+ pages in one pass.

## Preferred First Batch
1. Biotech ARN roles
2. Sofina
3. Seventure Partners
4. Bpifrance biotech vehicles
5. EIC Fund
6. Diagnostic NGS roles

## Output Formats
- JSON for database import
- Markdown for direct editing
- CSV only after field validation

## Bilingual Delivery Rule

For every new content piece, always deliver:
1. a `French source version`
2. an `English companion version` or at minimum:
   - English title
   - English excerpt / summary
   - English SEO title
   - English meta description
   - English keyword set
   - English CTA copy

If the full English body is not produced yet, say so clearly and provide the missing items explicitly.

## Article Blueprint

Use this blueprint for every `article`:
1. `H1` with the main promise or main query
2. `intro` that answers fast and frames the stakes in the first paragraph
3. `H2` sections built around:
   - what it is
   - why it matters
   - what changes for companies
   - what changes for candidates / RH / ops
4. `proof block` with:
   - official source
   - date or period
   - explicit limit if the source is partial
5. `internal linking` with at least 2 to 4 relevant SKS links in the body
6. `mini-FAQ` with 2 to 4 short questions if the topic has search demand
7. `CTA` aligned with the reader intent

## Article Writing Rules

- Keep paragraphs short and scannable on mobile.
- Avoid long introductions that delay the answer.
- Prefer a direct sentence structure over decorative phrasing.
- Build the article flow around a simple persuasion sequence:
  - problem
  - consequence
  - clarification
  - proof
  - next step
- Write H2 titles that reflect real questions, problems, methods, comparisons or mistakes to avoid.
- Use numbered steps, bullets or short tables when they make the answer easier to extract.
- Make sure the article can be understood even if only:
  - the title
  - the intro
  - the H2 headings
  - the FAQ
  are read.
- When useful, include a brief “what to do now” passage before the CTA.

## Linking Rules
- Add at least 3 internal links when the page type allows it.
- Prefer links toward:
  - `/services`
  - `/references`
  - `/job-roles`
  - `/salary-benchmarks`
  - `/studies`
  - `/schools`
  - `/investment-funds`
- Add 1 to 3 external links only when they improve trust or clarity.

## Refresh Rules
- Mark each content piece as one of:
  - `evergreen`
  - `news-sensitive`
  - `regulation-sensitive`
  - `market-sensitive`
- For `news-sensitive`, `regulation-sensitive` and `market-sensitive`, always define an `update_trigger`.

## Safety Clause
When a claim cannot be verified, downgrade it to:
- `editorial note`
- `market signal`
- or omit it.

The same caution level applies in both languages.

## Notion Validation Rule

- Every new content piece or major content update should be reviewed in Notion before publication.
- Draft first, validate second, publish third.
- If a page depends on sector wording, CTA wording or FAQ wording, those elements must be visible and editable in the Notion review step before going live.

## Copywriting Guardrails

- Promise one clear outcome per page or campaign.
- Do not stack multiple offers in the same hero.
- Prefer concrete gains over abstract adjectives.
- Replace vague wording such as `premium`, `innovant` or `sur-mesure` with a visible business effect.
- Anticipate the main objection before the CTA:
  - delay
  - confidentiality
  - budget
  - rarity of talent
  - internal alignment
- When possible, use proof in this order:
  - sourced metric
  - named reference
  - testimonial
  - process clarity
