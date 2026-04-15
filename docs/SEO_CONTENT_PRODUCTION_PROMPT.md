# SKS TALENTS - Production Prompt

## Objective
Generate SEO content for SKS TALENTS without inventing facts, numbers, partnerships, hiring volumes or salary claims.

## Core Rules
- Use primary sources first: official company sites, public fund pages, regulator pages, government pages, official annual reports, university sites.
- Label every claim as one of:
  - `official`
  - `estimated`
  - `inferred`
- Do not state a hiring count unless a company-level or fund-level source explicitly supports it.
- Do not state a partnership with SKS TALENTS unless documented by the user or by a source provided by the user.
- Do not invent portfolio companies, investment rounds, salaries or exit expectations.
- If the source is partial, say so explicitly.

## Required Output Fields
- `id`
- `title`
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
- `seo_title`
- `seo_description`
- `keywords`
- `internal_links`

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

## Safety Clause
When a claim cannot be verified, downgrade it to:
- `editorial note`
- `market signal`
- or omit it.
