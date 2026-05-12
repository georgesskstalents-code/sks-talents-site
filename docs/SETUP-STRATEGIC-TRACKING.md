# Setup tracking strategique SEO + LLM

Ce document liste les variables Vercel a configurer pour activer le suivi automatique
des 2 objectifs strategiques 2030 (top 1 SEO + top 1 citations LLM) dans le rapport
hebdomadaire lundi.

Sans configuration, le rapport tombe en **mode manuel** : checklists avec deep-links
GSC / ChatGPT / Perplexity / Claude. Avec configuration, les positions GSC + statuts
de mention LLM sont collectes automatiquement et affiches dans le rapport.

## 1. Resend (envoi email diagnostic + rapports)

Verifier que les env vars suivantes sont positionnees sur Vercel (Production + Preview) :

```
RESEND_API_KEY=re_xxx
MAIL_FROM_EMAIL=g.kengue@skstalents.fr
CONTACT_NOTIFICATION_EMAIL=g.kengue@skstalents.fr
CRON_FALLBACK_RECIPIENT=georges.skstalents@gmail.com
```

### Verification du domaine skstalents.fr sur Resend

Sans verification : les emails partent depuis `onboarding@resend.dev`
(fonctionne mais le `from` apparait comme Resend default - perception moins pro).

Avec verification : `from` = `SKS Talents <g.kengue@skstalents.fr>` propre.

**Etapes :**
1. Aller sur https://resend.com/domains
2. Cliquer "Add Domain", saisir `skstalents.fr`
3. Resend genere 3 enregistrements DNS a ajouter :
   - SPF (TXT)
   - DKIM (CNAME)
   - DMARC (TXT, optionnel mais recommande)
4. Ajouter ces 3 enregistrements chez le registrar (OVH / Cloudflare / Gandi selon ta config)
5. Attendre verification (5-30 min) puis cocher "Verify" sur Resend

Une fois verifie, les emails partent automatiquement depuis l'adresse pro, plus de
fallback `onboarding@resend.dev`.

## 2. Google Search Console - Service Account (positions automatiques)

### Etape 1 : creer le Service Account

1. Aller sur https://console.cloud.google.com/iam-admin/serviceaccounts
2. Selectionner ou creer un projet (ex : "sks-talents-tracking")
3. Activer l'API Search Console : Console > APIs & Services > Library > Search Console API > Enable
4. IAM & Admin > Service Accounts > "Create Service Account"
5. Nom : `gsc-tracker`, ID : `gsc-tracker`, role aucun (ou "Browser" pour debug)
6. Une fois cree, cliquer dessus > Keys > "Add Key" > JSON
7. Telecharger le fichier JSON (ex : `gsc-tracker-key.json`). **Garder secret.**

### Etape 2 : autoriser le Service Account dans Search Console

1. Aller sur https://search.google.com/search-console
2. Selectionner la propriete `skstalents.fr` (ou `sc-domain:skstalents.fr`)
3. Parametres > Utilisateurs et autorisations > "Ajouter un utilisateur"
4. Saisir l'email du Service Account (format : `gsc-tracker@xxx.iam.gserviceaccount.com`)
5. Acces : **Restreint** (lecture seule suffit)

### Etape 3 : encoder la cle JSON en base64

```bash
cat ~/Downloads/gsc-tracker-key.json | base64 -w 0 | pbcopy
```

### Etape 4 : ajouter les env vars Vercel

```
GSC_SERVICE_ACCOUNT_JSON_B64=<contenu base64 colle>
GSC_SITE_URL=sc-domain:skstalents.fr
```

Format `GSC_SITE_URL` :
- Si propriete domain : `sc-domain:skstalents.fr`
- Si propriete URL prefix : `https://www.skstalents.fr/`

### Verification

Apres redeploy, le prochain weekly digest lundi affichera les positions reelles
sur 28j moyennes pour les 5 requetes cibles dans la section "Objectifs Strategiques".

## 3. APIs LLM (citations automatiques OpenAI / Anthropic / Perplexity)

### Cles a obtenir

| LLM | URL | Cout estime |
|-----|-----|-------------|
| OpenAI | https://platform.openai.com/api-keys | ~$0.05/semaine (gpt-4o-mini, 5 prompts) |
| Anthropic | https://console.anthropic.com/settings/keys | ~$0.05/semaine (claude-haiku-4-5, 5 prompts) |
| Perplexity | https://www.perplexity.ai/settings/api | ~$0.05/semaine (sonar, 5 prompts) |

Total : ~$0.15/semaine soit $8/an. Avec marge : prevoir $15/an.

### Env vars Vercel

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PERPLEXITY_API_KEY=pplx-...
```

Note : il suffit d'avoir une seule cle pour que le tracking soit partiel. Les autres
providers seront marques "non teste" dans le rapport jusqu'a ce que leur cle soit ajoutee.

### Supabase (persistence des resultats)

Le cron persiste les resultats dans la table `llm_mention_checks` sur Supabase.
Cette infrastructure est deja en place pour les `seo_keyword_proposals`.

**Creer la table** : aller sur Supabase Dashboard > SQL Editor > executer :

```sql
CREATE TABLE IF NOT EXISTS llm_mention_checks (
  id uuid default gen_random_uuid() primary key,
  run_at timestamptz default now() not null,
  provider text not null,
  model text not null,
  prompt text not null,
  mentioned boolean not null,
  matched_pattern text,
  response_excerpt text,
  duration_ms int,
  error_reason text
);

CREATE INDEX IF NOT EXISTS llm_mention_checks_run_at_idx ON llm_mention_checks (run_at DESC);
CREATE INDEX IF NOT EXISTS llm_mention_checks_provider_prompt_idx ON llm_mention_checks (provider, prompt);
```

Env vars deja en place :

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Cron

Le cron `/api/cron/llm-mention-monitor` tourne tous les lundi a **6h UTC** (defini dans
`vercel.json`), juste avant le weekly-digest a 7h UTC. Pour declencher manuellement :

```
https://www.skstalents.fr/api/cron/llm-mention-monitor?token=DASHBOARD_PRIVATE_TOKEN
```

Ajouter `&dry=1` pour voir les resultats sans persister :

```
https://www.skstalents.fr/api/cron/llm-mention-monitor?token=XXX&dry=1
```

## 4. Verification end-to-end

Apres avoir configure GSC + 3 cles LLM + table Supabase :

1. Trigger manuellement le cron LLM : `https://.../api/cron/llm-mention-monitor?token=XXX`
2. Verifier dans Supabase : `SELECT * FROM llm_mention_checks ORDER BY run_at DESC LIMIT 15;`
3. Trigger manuellement le weekly-digest : `https://.../api/cron/weekly-digest?token=XXX`
4. Reception email : la section "Objectifs Strategiques" affiche maintenant :
   - Positions GSC reelles sur 28j (vert top 3, ambre top 10, rouge hors top 10)
   - Statut "cite ✓" / "non cite" pour chaque combo (provider, prompt)

## 5. Recap env vars

```bash
# Resend
RESEND_API_KEY=re_xxx
MAIL_FROM_EMAIL=g.kengue@skstalents.fr
CONTACT_NOTIFICATION_EMAIL=g.kengue@skstalents.fr
CRON_FALLBACK_RECIPIENT=georges.skstalents@gmail.com

# Vercel cron auth
CRON_SECRET=xxx
DASHBOARD_PRIVATE_TOKEN=xxx

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Google Search Console
GSC_SERVICE_ACCOUNT_JSON_B64=<base64>
GSC_SITE_URL=sc-domain:skstalents.fr

# LLM APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PERPLEXITY_API_KEY=pplx-...
```

Une fois tout en place, **le rapport hebdo lundi devient un cockpit autonome** pour
suivre la progression sur les 2 objectifs 2030.
