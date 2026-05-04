# Workflow — publier une fiche métier sans dev

## La vérité du système (vérifié contre l'API Notion)

Le code lit la DB Notion **`Website Content SKS Talents`** (`NOTION_SITE_DATABASE_ID = 642f98f00e474ebc92bbf93a17131004`) à chaque requête sur `/job-roles` et `/job-roles/[slug]`. C'est la seule DB partagée avec l'intégration "SKS – Content Sync".

⚠️ Les variables `NOTION_ARTICLES_DATABASE_ID` et `NOTION_JOB_ROLES_DATABASE_ID` (`.env.local`) pointent vers des DBs **non partagées** avec l'intégration → elles ne sont pas lues. Garde-les si tu veux les brancher plus tard, sinon ignore-les.

## Ce qui marche aujourd'hui

Pour qu'une fiche s'affiche, l'entrée Notion dans `Website Content SKS Talents` doit avoir :

| Propriété | Type Notion | Valeur attendue |
|---|---|---|
| `Title` | Title | Le nom du rôle |
| `Slug` | Rich text | Kebab-case unique (ex: `biotech-medical-director`) |
| `Content Type` | Select | **Doit être** `job_role` |
| `Status` | Status | **Doit être** `Published` |
| `Vertical` | Select | `Life Sciences`, `Animal Health`, `Cross-sector`, `Agro`, `Green Engineering` |
| `Salary Range` | Rich text | Ex: "100k€ - 170k€ + variable" |
| `Excerpt` | Rich text | Résumé 1-3 phrases (devient le `summary`) |
| `Main Content` | Rich text | Optionnel — corps long pour le SEO |
| `SEO Title` | Rich text | Optionnel — surcharge le `<title>` |
| `Meta Description` | Rich text | Optionnel — surcharge la meta description |
| `Publish date` | Date | Optionnelle |

## Ce qui ne marche PAS encore (gap schéma vérifié 2026-05-05)

Le code lit aussi 4 champs qui **n'existent pas** dans la DB actuelle :

| Champ lu par le code | État dans la DB Notion |
|---|---|
| `Category` | ❌ propriété absente |
| `Studies` | ❌ propriété absente |
| `Industries` | ❌ propriété absente |
| `Schools` | ⚠️ existe mais en `relation` (le code attend `rich_text`) |

**Conséquence** : Mode B (Notion-only) marche mais la fiche est dégradée — pas de catégorie, pas d'études, pas d'écoles en texte libre, pas d'industries connexes. Les sections correspondantes sont simplement masquées (commit `26182a3` — affichage conditionnel).

**Pour combler le gap (ajout côté Notion uniquement, 2 minutes)** :

1. Ouvre la DB `Website Content SKS Talents` dans Notion
2. Ajoute 3 propriétés type **Rich text** :
   - `Category`
   - `Studies`
   - `Industries`
3. Pour `Schools` : soit tu changes le type en `Rich text` (perte des relations existantes), soit tu acceptes que ça ne marche pas pour les fiches métiers et tu utilises uniquement `Studies`/`Industries`.
4. Tu peux ensuite remplir ces champs en utilisant le séparateur ` · ` (ex: `Médecine · Pharmacie · PhD`).

## 2 modes d'utilisation

### Mode A — Enrichir une fiche métier existante (≈ 50 fiches dans [data/jobRoles.ts](../data/jobRoles.ts))

Crée une entrée Notion avec le **même `Slug`** qu'une fiche statique. Les valeurs Notion écrasent le statique pour :

| Champ rendu | Surchargé par Notion ? |
|---|---|
| Title | ✅ via `Title` |
| Salary | ✅ via `Salary Range` |
| Summary | ✅ via `Excerpt` |
| Sector | ✅ via `Vertical` |
| Category | ✅ via `Category` *(une fois la propriété ajoutée)* |
| Studies | ✅ via `Studies` *(une fois la propriété ajoutée)* |
| Schools | ✅ via `Schools` *(rich_text uniquement)* |
| Related industries | ✅ via `Industries` *(une fois la propriété ajoutée)* |
| Skills, Missions, Success factors, Path, Shortage level | ❌ statiques uniquement |

### Mode B — Créer une fiche entièrement nouvelle (Notion-only)

Tu crées une entrée Notion avec un `Slug` inédit. La fiche apparaît dans `/job-roles` et la page détail s'ouvre. Sections affichées :

- ✅ Hero, "À propos", "Repères de rémunération", CTA contact, fiches proches → toujours rendues depuis Notion
- ⚠️ Compétences, Missions, Parcours, Ce qu'il faut pour exceller, Industries connexes → masquées tant qu'aucune valeur n'est fournie (Industries via la prop si tu l'ajoutes ; le reste reste statique-only).

## Cycle de validation rapide

1. Tu crées/modifies une entrée dans Notion → `Status = Published`.
2. Tu attends 30s (cache Notion `NOTION_READ_TIMEOUT_MS` + revalidation Next).
3. Tu rafraîchis `https://www.skstalents.fr/job-roles` → ta fiche apparaît dans la grille.
4. Tu cliques → la page détail s'ouvre sur `https://www.skstalents.fr/job-roles/<slug>`.

Si rien n'apparaît :
- Vérifie que `Content Type = job_role` exactement (case-sensitive).
- Vérifie que `Status = Published` exactement.
- Vérifie que le `Slug` est rempli et URL-safe.
- Vérifie que la page Notion est partagée avec l'intégration "SKS – Content Sync" (en général héritée de la DB).

## À terme : passer en 100% Notion (virer `data/jobRoles.ts`)

Faisable mais demande d'**étendre le mapping Notion** pour supporter `skills`, `successFactors`, `missions`, `path`, `shortageLevel` (5 propriétés rich_text additionnelles). À chiffrer séparément. Aujourd'hui le système hybride (statique riche + Notion override) est plus pragmatique.
