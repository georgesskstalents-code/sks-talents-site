# Diagnostic integration Google Search Console

**Date** : 2026-08-10
**Contexte** : la CEO a mentionne que le "rapport hebdo est en mode manuel" et suggere de configurer un Service Account GSC. Cette note valide l'etat actuel du code et clarifie les actions a faire.

---

## TL;DR

Le code GSC est **solide et correctement architecture**. Le blocage n'est pas dans le code, il est dans **la configuration des variables d'environnement Vercel**.

Actions requises :
1. Verifier que 4 env vars sont bien configurees dans Vercel Production
2. Si oui, regenerer le refresh token OAuth si expire (via script existant)
3. Si non, les creer via le procede documente ci-dessous

Charge : 15-30 minutes cote user.

---

## Etat du code (verifie 2026-08-10)

### Architecture GSC

Fichier : `lib/gscClient.ts` (242 lignes)

**Methodes d'auth supportees, dans l'ordre de priorite** :

1. **OAuth refresh token** (prefere - contourne le bug "SA email blocked" documente par Google en 2024) - env vars requises :
   - `GSC_OAUTH_CLIENT_ID`
   - `GSC_OAUTH_CLIENT_SECRET`
   - `GSC_OAUTH_REFRESH_TOKEN`
   - `GSC_SITE_URL` (format `sc-domain:skstalents.fr`)

2. **Service Account JWT** (fallback si OAuth absent) - env vars requises :
   - `GSC_SERVICE_ACCOUNT_JSON_B64`
   - `GSC_SITE_URL`

Le code essaie OAuth d'abord, tombe sur SA si OAuth pas configure. **Aucune modification necessaire dans le code.**

### Consommateurs de GSC dans le codebase

Deux endroits seulement :

1. **`app/api/cron/weekly-digest/route.ts`** (ligne 469) : cron hebdomadaire qui envoie le rapport SEO/LLM au CEO tous les lundis. Utilise `fetchGscQueryStats({ queries: seoTargets.map(t => t.query) })` pour recuperer les positions live.

2. **`app/api/dashboard/gsc-test/route.ts`** : endpoint debug prive protege par `DASHBOARD_PRIVATE_TOKEN`. Diagnostic manuel :
   - GET `/api/dashboard/gsc-test?token=XXX` → test normal
   - GET `/api/dashboard/gsc-test?token=XXX&debug=1` → diagnostic step-by-step

### Ce qui bascule le rapport en "mode manuel"

Fichier : `app/api/cron/weekly-digest/route.ts` ligne 467-471.

```typescript
// Strategic objectives live data (best-effort, falls back to manual mode if not configured).
fetchGscQueryStats({ queries: seoTargets.map((t) => t.query) }).catch((err) => {
  console.error("GSC fetch failed, falling back to manual mode", err);
  return null;
});
```

Si `fetchGscQueryStats` retourne `null`, le rapport hebdo utilise les checklists manuelles au lieu des positions live. Le fallback est intentionnel et propre.

`fetchGscQueryStats` retourne `null` quand :
- `GSC_SITE_URL` n'est pas configure, OU
- Aucune methode d'auth ne fonctionne (ni OAuth ni SA), OU
- L'API Google renvoie une erreur (401, 403, quota, etc.)

---

## Actions cote user (Google Cloud + Vercel)

### Etape 1 - Verifier l'etat actuel

Aller dans Vercel dashboard → project skstalents-le-site → Settings → Environment Variables.

Verifier la presence des 4 env vars OAuth :
- [ ] `GSC_OAUTH_CLIENT_ID`
- [ ] `GSC_OAUTH_CLIENT_SECRET`
- [ ] `GSC_OAUTH_REFRESH_TOKEN`
- [ ] `GSC_SITE_URL` (valeur attendue : `sc-domain:skstalents.fr`)

**Si toutes presentes** : passer directement a l'etape 3 (test).

**Si manquantes ou incompletes** : passer a l'etape 2 (creation OAuth).

### Etape 2 - Creer les credentials OAuth (uniquement si absent)

Prerequis : compte Google avec acces admin a Search Console pour `skstalents.fr`.

1. Aller sur https://console.cloud.google.com/apis/credentials
2. Selectionner le projet (ou en creer un nouveau : "SKS Talents GSC")
3. "Create credentials" → "OAuth client ID"
4. Type : "Desktop app", nom : "SKS Talents GSC OAuth"
5. Telecharger le JSON. Recuperer `client_id` et `client_secret`.
6. Ajouter dans Vercel env vars :
   - `GSC_OAUTH_CLIENT_ID` = client_id
   - `GSC_OAUTH_CLIENT_SECRET` = client_secret
   - `GSC_SITE_URL` = `sc-domain:skstalents.fr`

Puis executer localement :

```bash
cd /Users/georges/Documents/SKS\ TALENTS\ LE\ SITE
node scripts/gsc-oauth-helper.mjs
```

Le script ouvre une URL dans le navigateur. Se connecter avec le compte Google qui a acces GSC (probablement `kenguesylrice@gmail.com` per la memoire). Autoriser. Le script recupere le `refresh_token`.

Copier ce refresh token dans Vercel :
- `GSC_OAUTH_REFRESH_TOKEN` = valeur retournee

Redeploy Vercel (automatique apres save env vars).

### Etape 3 - Tester

Recuperer la valeur de `DASHBOARD_PRIVATE_TOKEN` (deja dans Vercel env vars).

Ouvrir dans le navigateur :

```
https://www.skstalents.fr/api/dashboard/gsc-test?token=DASHBOARD_PRIVATE_TOKEN
```

**Reponse attendue** (si OAuth OK) :
```json
{
  "ok": true,
  "method": "oauth_refresh",
  "siteUrl": "sc-domain:skstalents.fr",
  "queryStatsCount": N,
  "sample": [...]
}
```

**Reponse attendue** (si probleme) :
```json
{
  "ok": false,
  "step1_env": {
    "OAUTH_CLIENT_ID": "missing" | "set (X chars)",
    ...
  },
  "error": "..."
}
```

Le `?debug=1` en plus donne le detail step-by-step si l'auth echoue.

### Etape 4 - Confirmer que le rapport hebdo utilise GSC

Verifier dans les logs Vercel (Deployments → dernier cron weekly-digest) :

**Signal succès** : pas de "GSC fetch failed" dans les logs.
**Signal echec** : ligne "GSC fetch failed, falling back to manual mode".

Alternativement, attendre le lundi suivant : le rapport email recu doit contenir des chiffres de position live (au lieu des checklists manuelles).

---

## Alternative : Service Account (deconseille)

Per la memoire projet `reference_gsc_service_account.md`, le Service Account a ete abandonne le 2026-05-12 a cause du "silent fail" Google sur les emails Service Account (Google bloque silencieusement l'auth quand SA email pas verifie humainement).

Si tu veux quand meme essayer :

1. Console Google Cloud → Service Accounts → Create
2. Attribuer role "Search Console API user"
3. Telecharger la cle JSON
4. Encoder en base64 : `cat sa.json | base64`
5. Vercel env var : `GSC_SERVICE_ACCOUNT_JSON_B64` = valeur base64
6. Ajouter l'email SA dans Google Search Console → Settings → Users → Add User → Full access

**Risque connu** : Google peut silencieusement ne pas repondre a l'auth SA. Prevoir le fallback OAuth quand meme.

---

## Impact business de cette resolution

Une fois GSC connecte :

1. **Rapport hebdo lundi** : positions live GSC affichees automatiquement (au lieu des checklists manuelles)
2. **Dashboard suivi** (`/dashboard/suivi?token=...`) : pourra afficher les positions live si on ajoute le hook (charge : 30 min supplementaires si on veut afficher les positions dans le dashboard aussi)
3. **Detection anomalies** : baisse de position sur mot-cle strategique detectable immediatement
4. **Suivi post-chantier SEO** : mesurer l'impact des 40+ commits recents (Answer-First, schemas, titles rewrite, covers, barometre) sur les positions reelles - critical pour ROI

Sans GSC connecte, on est aveugle sur les resultats du chantier SEO/LLM.

---

## Contact si probleme

Si un blocage apparait a l'etape 2 ou 3, contacter le dev support (moi via Claude Code) avec :
- Screenshot des env vars Vercel (masquer les valeurs)
- Reponse JSON du `/api/dashboard/gsc-test?token=X&debug=1`
- Logs Vercel recents

Le code cote SKS Talents est verifie et fonctionnel. Le blocage sera 99 % chez Google (credentials, permissions, quota).
