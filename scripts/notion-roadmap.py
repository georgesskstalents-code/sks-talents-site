#!/usr/bin/env python3
"""Cree le document Roadmap Infrastructure dans Notion sous le board parent."""
import json
import os
import sys
import urllib.request
import urllib.error

# Charge env
env = {}
with open("/Users/georges/Documents/SKS TALENTS LE SITE/.env.local") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        env[k] = v

NOTION_TOKEN = env.get("NOTION_TOKEN", "")
NOTION_VERSION = env.get("NOTION_VERSION", "2022-06-28")
PARENT_PAGE_ID = "41bb9c354a9d4c7aa968e1ed2f4af1af"  # Agence SKS TALENTS Board LI Site

if not NOTION_TOKEN:
    print("NOTION_TOKEN missing in .env.local")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
}

def notion_post(path, body):
    req = urllib.request.Request(
        f"https://api.notion.com/v1{path}",
        data=json.dumps(body).encode("utf-8"),
        headers=HEADERS,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        print(f"HTTP {e.code}: {body[:600]}")
        sys.exit(1)

def notion_patch(path, body):
    req = urllib.request.Request(
        f"https://api.notion.com/v1{path}",
        data=json.dumps(body).encode("utf-8"),
        headers=HEADERS,
        method="PATCH",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))

# Helpers blocks
def h1(text):
    return {"object":"block","type":"heading_1","heading_1":{"rich_text":[{"type":"text","text":{"content":text}}]}}

def h2(text):
    return {"object":"block","type":"heading_2","heading_2":{"rich_text":[{"type":"text","text":{"content":text}}]}}

def h3(text):
    return {"object":"block","type":"heading_3","heading_3":{"rich_text":[{"type":"text","text":{"content":text}}]}}

def p(text, bold=False, code=False):
    rt = {"type":"text","text":{"content":text},"annotations":{"bold":bold,"code":code}}
    return {"object":"block","type":"paragraph","paragraph":{"rich_text":[rt]}}

def p_rich(parts):
    """parts = list of (text, bold, code) tuples"""
    rt = []
    for item in parts:
        if isinstance(item, str):
            rt.append({"type":"text","text":{"content":item}})
        else:
            t, bold, code = item
            rt.append({"type":"text","text":{"content":t},"annotations":{"bold":bold,"code":code}})
    return {"object":"block","type":"paragraph","paragraph":{"rich_text":rt}}

def bullet(text, bold=False):
    return {"object":"block","type":"bulleted_list_item","bulleted_list_item":{"rich_text":[{"type":"text","text":{"content":text},"annotations":{"bold":bold}}]}}

def numbered(text):
    return {"object":"block","type":"numbered_list_item","numbered_list_item":{"rich_text":[{"type":"text","text":{"content":text}}]}}

def callout(text, emoji="ℹ️", color="default_background"):
    return {"object":"block","type":"callout","callout":{"icon":{"type":"emoji","emoji":emoji},"color":color,"rich_text":[{"type":"text","text":{"content":text}}]}}

def divider():
    return {"object":"block","type":"divider","divider":{}}

def code_block(code, lang="bash"):
    return {"object":"block","type":"code","code":{"language":lang,"rich_text":[{"type":"text","text":{"content":code}}]}}

def toggle(text, children):
    return {"object":"block","type":"toggle","toggle":{"rich_text":[{"type":"text","text":{"content":text}}],"children":children}}

# ============== CONTENT ==============

# Bloc 1 : intro
intro_blocks = [
    callout("Document maintenu automatiquement par Claude Code. Derniere mise a jour : 12 mai 2026. Toute nouvelle integration / outil est ajoutee ici.", "🤖", "blue_background"),
    p(""),
    h1("Vue d'ensemble"),
    p("SKS Talents = cabinet executive search Life Sciences (biotech, diagnostic, deeptech) + Sante animale (petfood, vetos). Fondateur unique : Georges Kengue. Domaine : skstalents.fr. Email pro : g.kengue@skstalents.fr."),
    p(""),
    p("Ce document recapitule TOUT ce qu'on a construit : le site web, les automatisations, les outils, les tableaux Notion, les cles API, et la roadmap business. C'est ta feuille de route pour piloter l'agence marketing en autonomie."),
    p(""),
    divider(),
]

# Section 2 : Architecture
arch_blocks = [
    h1("Stack technique complet"),
    p(""),
    h2("Frontend - Site public"),
    bullet("Next.js 15.5 (App Router) + React 19 + TypeScript 5.8"),
    bullet("Tailwind 3.4 + design system SKS (palette mint/teal/ink/stone/sand/paper)"),
    bullet("Typo : Instrument Serif (display) + Inter (body). H1 token .t-h1 (28->44px) uniforme sur 50+ pages"),
    bullet("Deploiement automatique sur Vercel (branche main)"),
    p(""),
    h2("Backend - API routes"),
    bullet("Routes API serverless Node.js sur Vercel"),
    bullet("Auth : DASHBOARD_PRIVATE_TOKEN pour endpoints prives + CRON_SECRET pour crons"),
    bullet("Email : Resend (envoie depuis contact@skstalents.com, recoit sur g.kengue@skstalents.fr)"),
    p(""),
    h2("Bases de donnees"),
    bullet("Supabase (Postgres) : seo_keyword_proposals, llm_mention_checks, linkedin_kpis_weekly, linkedin_posts, linkedin_veille, site_feedback, lead_events"),
    bullet("Notion : Content master (Website Content SKS Talents) + Articles + Job Roles + 4 DBs LinkedIn Agency"),
    p(""),
    h2("Tracking + Automation"),
    bullet("Google Search Console : Service Account pour positions SEO automatiques"),
    bullet("LLM monitor : OpenAI gpt-4o-mini + Anthropic claude-haiku-4-5 + Perplexity sonar (test mentions hebdo)"),
    bullet("Chatwoot : assistant chat bottom-right"),
    bullet("Senja : widget temoignages (avec fallback realistic Trustpilot)"),
    bullet("Calendly : reservation appels 15 min"),
    bullet("IndexNow daily : ping Bing/Yandex quand nouveau contenu"),
    p(""),
    divider(),
]

# Section 3 : Tous les outils
outils_blocks = [
    h1("Tous les outils utilises"),
    p(""),
    callout("Total cout mensuel infrastructure : ~$15-20/mois (Vercel Hobby gratuit + LLM APIs $0.50 + Resend $0 sous 3k emails/mois + Notion + Supabase Free tier + Trustpilot/Senja existants)", "💰"),
    p(""),

    h3("1. Hebergement & Deploiement"),
    bullet("Vercel - Hobby plan - skstalents.fr - Deploy auto sur push main - https://vercel.com"),
    p(""),

    h3("2. Base de donnees"),
    bullet("Supabase - Free tier - Postgres + 7 tables - https://supabase.com/dashboard"),
    p(""),

    h3("3. Email"),
    bullet("Resend - Free tier (3k emails/mois) - Domain .com verifie - https://resend.com"),
    p(""),

    h3("4. APIs LLM"),
    bullet("OpenAI - Pay as you go $10 credit auto-recharge $30/mois max - gpt-4o-mini - https://platform.openai.com"),
    bullet("Anthropic - Pay as you go - claude-haiku-4-5 - https://console.anthropic.com"),
    bullet("Perplexity - Pay as you go - sonar (avec web search inclus) - https://www.perplexity.ai/settings/api"),
    p(""),

    h3("5. Google ecosystem"),
    bullet("Google Search Console - Gratuit - propriete sc-domain:skstalents.fr - https://search.google.com/search-console"),
    bullet("Google Cloud Service Account skstalents-gsc@confident-craft-384008.iam.gserviceaccount.com - JWT auth pour GSC API"),
    p(""),

    h3("6. Tableaux Notion"),
    bullet("Workspace : georgesskstalents - Board parent : Agence SKS TALENTS Board LI Site"),
    bullet("4 DBs LinkedIn : KPIs Weekly, Queue Validation, Veille Sectorielle, Calendar"),
    bullet("3 DBs site (heritage) : Website Content, Articles, Job Roles"),
    bullet("Integration interne : SKS Content Sync (token ntn_xxx)"),
    p(""),

    h3("7. Anti-bot + Securite"),
    bullet("Cloudflare Turnstile : protection formulaires - https://www.cloudflare.com"),
    p(""),

    h3("8. Widgets visuels"),
    bullet("Chatwoot : chat bottom-right - https://app.chatwoot.com"),
    bullet("Senja : temoignages widget - https://senja.io"),
    bullet("Trustpilot : reviews publiques - https://fr.trustpilot.com/review/skstalents.fr"),
    bullet("Calendly : booking 15 min - https://calendly.com/g-kengue/talentconsulting"),
    p(""),
    divider(),
]

# Section 4 : Crons Vercel
crons_blocks = [
    h1("7 crons Vercel actifs"),
    p(""),
    callout("Tous les crons sont definis dans /vercel.json et s'executent automatiquement. Auth : Bearer CRON_SECRET (Vercel) ou ?token=DASHBOARD_PRIVATE_TOKEN (manuel test).", "⏰"),
    p(""),

    h3("Lundi 5h UTC - seo-keywords"),
    bullet("Genere 120 keywords / 37 sources curees -> Supabase seo_keyword_proposals"),
    bullet("Path : /api/cron/seo-keywords"),
    p(""),

    h3("Lundi 6h UTC - llm-mention-monitor"),
    bullet("Teste 5 prompts x 3 LLMs = 15 calls -> Supabase llm_mention_checks"),
    bullet("Path : /api/cron/llm-mention-monitor"),
    p(""),

    h3("Daily 6h UTC - seo/refresh"),
    bullet("Refresh SEO data + IndexNow daily ping"),
    p(""),

    h3("Lundi 6h30 UTC - linkedin-kpis-weekly (NOUVEAU)"),
    bullet("Lit Notion KPIs Weekly DB (rempli par CEO lundi 8h) -> Supabase linkedin_kpis_weekly"),
    bullet("Path : /api/cron/linkedin-kpis-weekly"),
    p(""),

    h3("Lundi 7h UTC - weekly-digest"),
    bullet("Email rapport hebdo CEO avec section Objectifs Strategiques + Pilotage LinkedIn"),
    bullet("Path : /api/cron/weekly-digest"),
    bullet("Lit : Supabase (seo + llm + linkedin) + Notion + GSC API"),
    p(""),

    h3("Daily 7h UTC - linkedin-veille (NOUVEAU)"),
    bullet("Scan 6 sources RSS (france-biotech, afvac, lepointveterinaire, veterinaire.fr, lehub-bpifrance, biotech-finances) -> Notion Veille + Supabase linkedin_veille"),
    bullet("Path : /api/cron/linkedin-veille"),
    p(""),

    h3("Lundi 7h30 UTC - content-digest"),
    bullet("Inventaire editorial Notion -> email"),
    p(""),

    h3("Dimanche 18h UTC - linkedin-content-gen (NOUVEAU)"),
    bullet("Genere 5 posts via Claude (3 perso + 2 page) en piochant dans veille recente -> Notion Queue Validation"),
    bullet("Path : /api/cron/linkedin-content-gen"),
    p(""),
    divider(),
]

# Section 5 : Process hebdo CEO
process_blocks = [
    h1("Comment gerer au quotidien"),
    p(""),
    callout("Tu n'as que 5 min de travail manuel chaque lundi matin. Le reste tourne tout seul.", "✨"),
    p(""),

    h2("Process hebdomadaire"),
    p(""),
    h3("Dimanche soir (cron auto)"),
    bullet("18h UTC : linkedin-content-gen produit 5 posts dans Notion Queue Validation"),
    p(""),

    h3("Lundi matin"),
    numbered("5h UTC - cron seo-keywords lance 120 propositions de keywords"),
    numbered("6h UTC - cron llm-mention-monitor teste si SKS apparait sur 3 LLMs"),
    numbered("6h30 UTC - cron linkedin-kpis-weekly attend que tu remplisses Notion"),
    numbered("7h UTC - cron weekly-digest envoie le rapport email"),
    numbered("8h Paris - TU remplis 12 champs KPIs LinkedIn dans Notion (5 min)"),
    numbered("8h05 - TU valides les 5 posts dans Notion Queue Validation (5 min)"),
    numbered("8h10 - TU lis le rapport CEO + agis sur les alertes"),
    p(""),

    h3("Quotidien (cron auto)"),
    bullet("7h UTC : linkedin-veille scanne 6 sources sectorielles -> Notion Veille + Supabase"),
    bullet("6h UTC : seo-refresh + IndexNow ping"),
    p(""),
    divider(),
]

# Section 6 : Environment variables
env_blocks = [
    h1("Environment variables Vercel"),
    p(""),
    callout("Les valeurs reelles sont sur Vercel - jamais dans Notion. Cette liste est juste les NOMS pour reference.", "🔒"),
    p(""),

    h3("Site (canonical)"),
    bullet("NEXT_PUBLIC_SITE_URL = https://www.skstalents.fr"),
    bullet("SITE_URL = https://www.skstalents.fr"),
    p(""),

    h3("Email (Resend)"),
    bullet("RESEND_API_KEY"),
    bullet("MAIL_FROM_EMAIL = contact@skstalents.com (domain verifie sur Resend)"),
    bullet("CONTACT_NOTIFICATION_EMAIL = g.kengue@skstalents.fr (CEO recoit ici)"),
    p(""),

    h3("Auth cron"),
    bullet("CRON_SECRET (Vercel cron bearer)"),
    bullet("DASHBOARD_PRIVATE_TOKEN (manuel test endpoints)"),
    p(""),

    h3("Supabase"),
    bullet("SUPABASE_URL"),
    bullet("SUPABASE_SERVICE_ROLE_KEY"),
    p(""),

    h3("Google Search Console"),
    bullet("GSC_SERVICE_ACCOUNT_JSON_B64 (base64 du JSON service account)"),
    bullet("GSC_SITE_URL = sc-domain:skstalents.fr"),
    p(""),

    h3("LLM APIs"),
    bullet("OPENAI_API_KEY + OPENAI_MODEL=gpt-4o-mini (pour LLM monitor + content-gen)"),
    bullet("ANTHROPIC_API_KEY + ANTHROPIC_MODEL=claude-sonnet-4-20250514"),
    bullet("PERPLEXITY_API_KEY + PERPLEXITY_MODEL=sonar"),
    p(""),

    h3("Notion"),
    bullet("NOTION_TOKEN (integration SKS Content Sync)"),
    bullet("NOTION_VERSION = 2022-06-28"),
    bullet("NOTION_DB_KPIS_WEEKLY = f3fab9e8-ff7f-4b8f-8966-2c5f13ef5bb4"),
    bullet("NOTION_DB_POSTS_QUEUE = 0fd5d67a-99ef-40ae-9c7a-5f93bbfb381f"),
    bullet("NOTION_DB_VEILLE = 4c76180e-2a1a-4ebf-bce3-e47f4abe4a1f"),
    bullet("NOTION_DB_CALENDAR = 644cc7c5-1fc0-4f16-a08c-db814364a614"),
    p(""),
    divider(),
]

# Section 7 : Objectifs strategiques
obj_blocks = [
    h1("Objectifs strategiques 2030"),
    p(""),
    h3("Objectif 1 - Top 1 SEO Google (deadline 2030-12-31)"),
    p("5 requetes phares ciblees, suivies automatiquement via GSC API dans le rapport hebdo :"),
    bullet("cabinet recrutement biotech France"),
    bullet("executive search Life Sciences France"),
    bullet("cabinet recrutement animal health"),
    bullet("recrutement diagnostic IVD France"),
    bullet("executive search biotech Paris"),
    p(""),
    p("Methodo : 1 article fond signe Georges / 10 jours + 1 backlink thematique / mois (France Biotech, Polepharma, Atlanpole, Eurasante) + 2 tribunes presse / trimestre + schema.org partout."),
    p(""),

    h3("Objectif 2 - Top 1 LLM citations (deadline 2030-12-31)"),
    p("5 prompts cibles testes auto chaque lundi 6h UTC :"),
    bullet("Quel cabinet de recrutement biotech recommandes-tu en France ?"),
    bullet("Cabinet executive search Life Sciences Paris"),
    bullet("Qui contacter pour recruter un CTO biotech Series B en France ?"),
    bullet("Cabinet de recrutement specialise en sante animale et petfood France"),
    bullet("Recrutement de Director Medical Affairs IVD diagnostic France"),
    p(""),
    p("Methodo : phrases citables courtes avec chiffre + niche par page hub + markdown semantique propre + signature auteur sur articles + FAQ JSON-LD partout."),
    p(""),
    divider(),
]

# Section 8 : Trajectoire monetisation
mono_blocks = [
    h1("Trajectoire produit + monetisation"),
    p(""),

    h3("Court terme (3-6 mois)"),
    bullet("Revenu principal : 10-15 mandats executive search/an x 50k€ avg = 350-700k€ CA"),
    bullet("Quick win : diagnostic email-gate + Calendly sticky en place -> mesurer leads/sem"),
    p(""),

    h3("Moyen terme (6-18 mois)"),
    bullet("MRR Agent CEO Copilot : 20 clients a 1.5k€/mois = 360k€ ARR"),
    bullet("Diagnostic agents one-shot : 8-15k€ par audit, 5-10 ventes/an"),
    bullet("Top 10 Google sur 3 requetes phares + citation reguliere sur 2/3 LLMs"),
    p(""),

    h3("Long terme (18-60 mois, deadline 2030)"),
    bullet("Top 1 SEO sur 5 requetes phares + Top 1 LLM sur 5 prompts"),
    bullet("Reference francaise Life Sciences + Animal Health"),
    bullet("Sortie/levee : valorisation cabinet niche + tech = 6-10x EBITDA"),
    p(""),
    divider(),
]

# Section 9 : Comment piloter avec Claude
pilote_blocks = [
    h1("Comment piloter avec Claude Code"),
    p(""),
    callout("Claude Code lit automatiquement les memoires du projet a chaque session - donc le contexte est conserve.", "🧠"),
    p(""),

    h2("Memoires actives (Claude lit ca a chaque session)"),
    bullet("project_master_briefing : business + tech + KPIs"),
    bullet("project_linkedin_tracking : 4 DBs Notion + crons LinkedIn"),
    bullet("project_seo_pipeline_live : sitemap + IndexNow + GSC"),
    bullet("project_domain : site .fr / email .com"),
    bullet("feedback_no_em_dashes : zero em-dashes/en-dashes"),
    bullet("feedback_no_fabricated_testimonials : Trustpilot/Senja only"),
    bullet("feedback_no_seo_meta_on_public_pages : pages publiques adressees au LECTEUR"),
    bullet("feedback_design_handoff_sks_colors : palette SKS complete"),
    bullet("feedback_verify_before_proposing : read avant delete"),
    bullet("feedback_freeze_baseline : commit 659b215"),
    bullet("reference_panorama_folder : Copilot/Panorama/ docs verifies"),
    bullet("reference_gsc_service_account : SA email + JSON local path"),
    p(""),

    h2("Comment formuler une demande"),
    bullet("Court : 'mets en place X' - Claude execute + push"),
    bullet("Strategique : 'reflechis a Y, propose 3 options' - Claude propose, tu valides"),
    bullet("Audit : 'audite ce qui est cassé sur Z' - Claude scan + rapport"),
    p(""),

    h2("Workflow recommande"),
    numbered("Tu decris l'objectif business (pas l'implementation)"),
    numbered("Claude propose les options + impacts"),
    numbered("Tu valides l'option choisie"),
    numbered("Claude code + commit + push + update memoire + update ce document Notion"),
    numbered("Tu testes en prod si besoin"),
    p(""),
    divider(),
]

# Section 10 : Etat des setups
etat_blocks = [
    h1("Etat des setups (au 12 mai 2026)"),
    p(""),

    h2("Fait ✅"),
    bullet("Site Next.js complet sur Vercel - skstalents.fr"),
    bullet("Sitemap 393 URLs + IndexNow daily"),
    bullet("10 vrais temoignages Trustpilot sur home + life-sciences + animal-health"),
    bullet("Calendly sticky FAB bottom-left global"),
    bullet("Email-gate /diagnostic avec benchmark salaires + plan 12 mois personnalise"),
    bullet("Section Objectifs Strategiques 2030 dans rapport hebdo (avec countdowns)"),
    bullet("Section Pilotage LinkedIn placeholder dans rapport hebdo"),
    bullet("GSC Service Account cree + permission Search Console accordee"),
    bullet("3 cles LLM (OpenAI + Anthropic + Perplexity) sur Vercel Production"),
    bullet("OpenAI credit auto-recharge $10/$30 max"),
    bullet("Resend domain .com verifie - MAIL_FROM_EMAIL=contact@skstalents.com"),
    bullet("4 DBs Notion LinkedIn Agency creees + integration partagee"),
    bullet("3 crons LinkedIn dans vercel.json"),
    p(""),

    h2("A faire ⏳"),
    bullet("Vercel : ajouter SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY"),
    bullet("Vercel : ajouter 4 NOTION_DB_* IDs"),
    bullet("Vercel : verifier/refaire GSC_SERVICE_ACCOUNT_JSON_B64 (probablement tronque)"),
    bullet("Supabase : executer SQL docs/SUPABASE-LINKEDIN-SCHEMA.sql (3 tables linkedin_*)"),
    bullet("Redeploy Vercel apres ajouts env vars"),
    bullet("Test end-to-end : trigger weekly-digest manuellement et verifier email"),
    p(""),
    divider(),
]

# Section 11 : Maintenance + evolution
maint_blocks = [
    h1("Maintenance + evolution"),
    p(""),

    h2("Quand ajouter une nouvelle integration"),
    numbered("Dis a Claude : 'ajoute X tool pour Y objectif'"),
    numbered("Claude propose le plan + impact env vars + cout"),
    numbered("Tu valides"),
    numbered("Claude code + commit + push"),
    numbered("Claude met a jour ce document Notion (cette page) automatiquement"),
    numbered("Tu remplis les env vars / config externe necessaires"),
    p(""),

    h2("Quand changer un comportement"),
    bullet("Voir les memoires Claude pour les regles strictes (em-dashes, testimonials, etc.)"),
    bullet("Si tu changes une regle, dis-le explicitement : 'a partir de maintenant, on fait X'. Claude update la memoire."),
    p(""),

    h2("Documentation de reference"),
    bullet("docs/SETUP-STRATEGIC-TRACKING.md = guide setup complet (Resend, GSC, LLM, LinkedIn)"),
    bullet("docs/SUPABASE-LINKEDIN-SCHEMA.sql = SQL pour creer les 3 tables LinkedIn"),
    bullet("CLAUDE.md (si existe) = instructions de coding"),
    bullet("README.md = vue d'ensemble du repo"),
    p(""),
]

all_blocks = (
    intro_blocks
    + arch_blocks
    + outils_blocks
    + crons_blocks
    + process_blocks
    + env_blocks
    + obj_blocks
    + mono_blocks
    + pilote_blocks
    + etat_blocks
    + maint_blocks
)

print(f"Total blocks: {len(all_blocks)}")

# Notion API limite a 100 blocks par create. On cree d'abord la page avec les 100 premiers blocks, puis on append le reste.
first_batch = all_blocks[:100]
remaining = all_blocks[100:]

# Create page
print("Creating page...")
page = notion_post("/pages", {
    "parent": {"type": "page_id", "page_id": PARENT_PAGE_ID},
    "icon": {"type": "emoji", "emoji": "🎯"},
    "properties": {
        "title": {"title": [{"type": "text", "text": {"content": "SKS Talents - Roadmap Infrastructure (maintenu par Claude)"}}]}
    },
    "children": first_batch,
})
page_id = page["id"]
page_url = page.get("url", "")
print(f"Page created: {page_url}")
print(f"Page ID: {page_id}")

# Append remaining blocks in batches of 100
while remaining:
    batch = remaining[:100]
    remaining = remaining[100:]
    print(f"Appending {len(batch)} more blocks...")
    notion_patch(f"/blocks/{page_id}/children", {"children": batch})

print(f"\nDONE. Page URL: {page_url}")
print(f"Page ID for future updates: {page_id}")
