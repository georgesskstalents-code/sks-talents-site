# Workflow — publier une fiche métier sans dev

## Tu peux faire ça depuis Notion uniquement

Le code lit déjà ta DB Notion `NOTION_JOB_ROLES_DATABASE_ID = 271c5f9dc8de43b49f6d521e4b4f6627` à chaque requête sur `/job-roles` et `/job-roles/[slug]`. Tu n'as **jamais** besoin de pousser du code pour ajouter, modifier ou retirer une fiche métier.

## 2 modes possibles

### Mode A — Enrichir une fiche existante (le plus courant)

Toutes les fiches dans [data/jobRoles.ts](../data/jobRoles.ts) (≈ 50 fiches) ont un `slug`. Si tu crées une entrée Notion **avec le même slug**, les champs de Notion **écrasent** ceux du fichier statique pour les valeurs ci-dessous :

| Champ statique (TS) | Surchargé par Notion ? | Propriété Notion |
|---|---|---|
| `title` | ✅ | `Title` |
| `salary` | ✅ | `Salary Range` |
| `summary` | ✅ | `Excerpt` |
| `sector` | ✅ | `Vertical` |
| `category` | ✅ | `Category` |
| `studies` | ✅ | `Studies` (séparateur `·`) |
| `schools` | ✅ | `Schools` (séparateur `·`) |
| `relatedIndustries` | ✅ | `Industries` (séparateur `·`) |
| `skills` | ❌ statique | — |
| `successFactors` | ❌ statique | — |
| `missions` | ❌ statique | — |
| `path` | ❌ statique | — |
| `shortageLevel` | ❌ statique | — |

Utile pour : corriger un titre, ajuster un salaire, mettre à jour une école citée — sans rebuild.

### Mode B — Créer une fiche entièrement nouvelle (Notion-only)

Tu crées une entrée Notion avec un `Slug` qui **n'existe pas** dans le fichier statique. La fiche apparaît dans le listing `/job-roles` ET sa page détail s'ouvre normalement.

**Comportement** : les sections qui dépendent de champs uniquement statiques (Compétences, Missions, Parcours, Ce qu'il faut pour exceller, Industries connexes) ne s'affichent **pas** si tu ne les remplis pas dans Notion. Pas de placeholder, pas de fake content — la page reste cohérente SEO.

**Ce qui s'affiche toujours** (depuis Notion) :
- Hero (titre + résumé + secteur + catégorie + salaire)
- Bloc "À propos du rôle"
- Bloc "Repères de rémunération"
- Bloc "Études recommandées" + écoles (si renseignés)
- Industries connexes (si renseignées)
- CTA contact + fiches proches

## Propriétés Notion attendues (toutes obligatoires sauf indication)

| Propriété | Type | Valeur attendue |
|---|---|---|
| `Title` | Title | Le nom du rôle (ex: "Medical Director Biotech") |
| `Slug` | Rich text | URL-safe, kebab-case, unique (ex: "biotech-medical-director") |
| `Content Type` | Select | **Doit être** `job_role` |
| `Status` | Status | **Doit être** `Published` (sinon la fiche est ignorée) |
| `Vertical` | Select | `Biotech`, `Cosmetique`, `Diagnostic`, `Medical Vet`, `Petfood`, `Veterinary` |
| `Category` | Select | Libre (ex: "Direction médicale", "Qualité", "R&D") |
| `Salary Range` | Rich text | Ex: "100k€ - 170k€ + variable" |
| `Excerpt` | Rich text | Résumé 1-3 phrases |
| `Main Content` | Rich text | Optionnel — corps long pour le SEO |
| `Studies` | Rich text | Cursus séparés par ` · ` (ex: "Médecine · Pharmacie · PhD") |
| `Schools` | Rich text | Écoles séparées par ` · ` |
| `Industries` | Rich text | Industries connexes séparées par ` · ` |
| `SEO Title` | Rich text | Optionnel — surcharge le `<title>` de la page |
| `Meta Description` | Rich text | Optionnel — surcharge la meta description |
| `Publish date` | Date | Optionnelle |

## Cycle de validation rapide

1. Tu crées/modifies une entrée dans Notion → `Status = Published`.
2. Tu attends 30s (cache Notion `NOTION_READ_TIMEOUT_MS` + revalidation Next).
3. Tu rafraîchis `https://www.skstalents.fr/job-roles` → ta fiche apparaît dans la grille.
4. Tu cliques → la page détail s'ouvre sur `https://www.skstalents.fr/job-roles/<slug>`.

Si rien n'apparaît :
- Vérifie que `Content Type = job_role` exactement (case-sensitive).
- Vérifie que `Status = Published` exactement.
- Vérifie que le `Slug` est rempli et URL-safe.
- Vérifie qu'aucune autre entrée Notion n'a déjà ce slug.

## Si tu veux à terme passer en 100% Notion (et virer `data/jobRoles.ts`)

C'est faisable mais ça demande d'**étendre le mapping Notion** pour supporter `skills`, `successFactors`, `missions`, `path`, `shortageLevel` (probablement via 5 propriétés Rich text additionnelles). À chiffrer séparément si tu veux migrer. Aujourd'hui le système hybride (statique riche + Notion override) est plus pragmatique.
