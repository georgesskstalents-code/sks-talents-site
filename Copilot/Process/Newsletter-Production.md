# Newsletter SKS — Process de production

> **Statut** : process **INTERNE** uniquement (déplacé hors du site public le 2026-05-11). Les visiteurs ne voient plus l'ancienne page `/newsletter` — un redirect 301 pointe vers `/blog`. Les éditions individuelles `/newsletter/[slug]` restent accessibles publiquement (SEO + lead nurture).

## Utilité de ce doc

Garder en un seul endroit la **stratégie + cadence + workflow Notion** pour produire chaque édition sans avoir à réfléchir à la structure. Quand tu veux écrire une nouvelle édition, tu ouvres ce doc, tu choisis un angle parmi les 4 piliers, tu écris dans Notion, tu passes `Status = Published`, l'édition apparaît automatiquement sous `/newsletter/[slug]`.

## Comment utiliser

1. **Choisir l'angle** depuis l'un des 4 piliers (cf section "Promesse")
2. **Identifier le segment** lecteur principal (cf section "Segments")
3. **Écrire dans Notion** (Content Type = `newsletter`, remplir titre + excerpt + main content + sources + date)
4. **Relire + valider** → passer `Status` à `Published`
5. L'édition est alors live sur `https://www.skstalents.fr/newsletter/[slug]`
6. (Optionnel) Pousser via Resend/email à la base avec la séquence d'accueil ci-dessous

---

## Cadence

- **Fréquence** : 2 éditions par mois
- **Jours de publication** : Premier vendredi + dernier vendredi du mois
- **Temps de lecture cible** : 5 minutes max
- **Format** : court, sourçable, directement exploitable

## Promesse — les 4 piliers (choisir UN angle par édition)

### 1. Signaux marché
Les signaux qui comptent vraiment sur les verticales SKS (biotech, diagnostic, vétérinaire, petfood) : tensions de recrutement, mouvements d'écosystème, financements, arbitrages utiles.

### 2. Métiers & salaires
Les fonctions pénuriques, repères de rémunération, zones de friction qui ralentissent un recrutement ou une équipe.

### 3. Écosystème
Acteurs, événements, écoles, clusters, réseaux, sources officielles qui comptent pour lire un marché sérieusement.

### 4. Décisions dirigeants
Lecture courte pour aider CEO, COO, DRH et CPO à mieux cadrer une décision recrutement, structuration ou mobilité.

## Segments lecteurs (1 angle dominant par édition)

### Segment A — Dirigeant qui recrute
Pour CEO, COO, fondateurs et managers qui doivent cadrer un rôle critique, accélérer une shortlist ou mieux lire leur marché.

### Segment B — DRH / CPO / structuration
Pour DRH, CPO et responsables talent qui ont besoin d'une lecture plus nette sur les salaires, les métiers et la structuration RH.

### Segment C — Dirigeant / cadre en mobilité
Pour dirigeants et cadres en repositionnement qui veulent rester exposés aux signaux utiles, aux benchmarks et aux trajectoires crédibles.

## Templates d'édition (idées récurrentes)

### Template 1 — Le signal marché du mois
Une lecture courte pour relier un signal chaud à ses conséquences concrètes sur le recrutement et la structuration.

### Template 2 — La tension talent à surveiller
Un focus sur un métier pénurique, un angle de rémunération ou une zone de friction qui compte pour décider plus juste.

### Template 3 — Le repère écosystème utile
Une source officielle, un acteur, un event, une école ou un mouvement à connaître pour rester au bon niveau de lecture.

## Séquence d'accueil (4 emails après inscription)

> Implémentée via Resend ou via Mailerlite/Brevo selon le canal d'inscription. À configurer côté ESP.

### Email 1 — Bienvenue + meilleure ressource
Le point d'entrée pour comprendre la promesse SKS, les signaux suivis et la première ressource à ouvrir.

### Email 2 — Contenus piliers
Les pages fortes à lire en priorité : recherche, ressources, pages métiers, articles de fond, hubs de référence.

### Email 3 — Benchmark / étude / page forte
Une pièce premium reliée à un vrai besoin : benchmark salaires, étude de marché ou livre blanc exploitable.

### Email 4 — Proposition d'échange
Une invitation simple à ouvrir la conversation si le lecteur veut cadrer un enjeu recrutement, RH ou trajectoire.

## Workflow Notion

1. Ouvrir la base Notion `SKS Site Content`
2. Créer une page avec `Content Type = newsletter`
3. Renseigner :
   - `Title` — titre de l'édition
   - `Excerpt` — 1-2 phrases pour le hero d'édition + la meta description
   - `Main content` — corps de l'édition (markdown ou rich text)
   - `Publish date` — date affichée
   - `Sources` — sources externes citées (URLs)
   - `Slug` — généré automatiquement depuis le titre
4. Relire intégralement
5. Passer `Status` à `Published`
6. L'édition apparaît sur `/newsletter/[slug]` (rendu via `app/(routes)/newsletter/[slug]/page.tsx` + `lib/notion.ts`)

## Liens utiles côté repo

- Composant subscribe form encore actif sur d'autres pages : `components/NewsletterSignupCard.tsx`
- Données strategy ex-publiques (piliers + segments + cadence + welcome + examples) : `data/newsletter.ts` (à garder pour ne pas casser les imports, mais plus rendu publiquement)
- Page éditions individuelles (publique) : `app/(routes)/newsletter/[slug]/page.tsx`
- Page index ex-publique (supprimée) : `app/(routes)/newsletter/page.tsx` ❌

## Pourquoi ce contenu n'est PAS sur le site public

L'ancienne page `/newsletter` exposait au visiteur :
- Le détail de la cadence éditoriale (interne)
- Les 4 piliers de promesse (positionnement interne)
- Les 3 segments lecteurs (notre segmentation marketing)
- La séquence d'accueil 4-emails (notre stratégie de nurture)
- Le workflow Notion ("creez une page dans Notion avec Content Type...")

Tout ça est **stratégie / process interne**. Le visiteur n'a pas besoin de savoir comment on produit la newsletter — il a besoin de savoir s'il doit s'inscrire et lire les éditions. D'où le déplacement ici.
