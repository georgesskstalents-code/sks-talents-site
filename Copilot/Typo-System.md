# SKS Talents — Système typographique

**Single source of truth** pour la typographie du site. Tout dévie de ce qui est ici = bug à corriger.

## Les 3 piliers

### 1. Polices

| Famille | Police | Source | Usage |
|---|---|---|---|
| `font-sans` | **Inter** (400/500/600/700) | next/font/google | Corps, UI, navigation, boutons, captions |
| `font-display` | **Instrument Serif** (regular + italic) | next/font/google | Titres premium, hero, accents éditoriaux |

Chargées via `next/font/google` dans [app/layout.tsx](../app/layout.tsx) → preload, no FOIT, rendu **identique sur tous les OS** (résout le précédent problème Apple-only).

### 2. Échelle (type scale)

Tous les tokens sont définis dans [tailwind.config.ts](../tailwind.config.ts) sous `theme.extend.fontSize` et verrouillés par snapshot dans [lib/tailwindTokens.test.ts](../lib/tailwindTokens.test.ts).

| Token Tailwind | Classe utilitaire | Mobile | Desktop | Usage |
|---|---|---|---|---|
| `text-display-xl` | `t-display-xl` | 40px italic | 64px italic | Hero principal seul (max 1/page) |
| `text-display-l` | `t-display-l` | 32px italic | 48px italic | Hero secondaires, page heroes premium |
| `text-h1` | `t-h1` ou `section-title` | 28px | 44px | H1 sections |
| `text-h2` | `t-h2` | 22px | 28px | Sous-sections, card heads |
| `text-h3` | `t-h3` | 18px | 20px | Card titles |
| `text-body-l` | `t-body-l` ou `section-copy` | 16px | 18px | Lead paragraphs, intros |
| `text-body` | `t-body` | 15px | 16px | Corps standard |
| `text-caption` | `t-caption` | 13px | 13px | Meta, dates, légendes |
| `text-eyebrow` | (combiné avec `.eyebrow`) | 11px | 11px | Eyebrows uppercase |

### 3. Poids, line-height, letter-spacing

**Poids Inter** (4 niveaux, pas plus) :

| Class | Valeur | Usage |
|---|---|---|
| `font-normal` | 400 | Corps, lead, body — par défaut |
| `font-medium` | 500 | Boutons, navigation, eyebrows light |
| `font-semibold` | 600 | Sous-titres, eyebrows accentués, h3, accents UI |
| `font-bold` | 700 | Strong emphasis ponctuelle. **Jamais sur display.** |

**Line-height tokens** :

| Class | Valeur | Usage |
|---|---|---|
| `leading-tight` | 1.1 | Display headlines |
| `leading-snug` | 1.25 | h1, h2 |
| `leading-normal` | 1.5 | UI dense |
| `leading-relaxed` | 1.7 | Body long-form (par défaut sur `t-body*`) |
| `leading-loose` | 1.85 | Texte pédagogique très aéré |

**Letter-spacing tokens** :

| Class | Valeur | Usage |
|---|---|---|
| `tracking-tight` | -0.02em | Display headlines (rendu plus crisp) |
| `tracking-snug` | -0.01em | h1, h2 |
| `tracking-normal` | 0 | Corps |
| `tracking-wide` | 0.18em | Eyebrows uppercase standard |
| `tracking-eyebrow` | 0.22em | Eyebrows uppercase premium |

## Do / Don't

### ✅ DO

```tsx
<h1 className="t-h1 section-title">Vous vous reconnaissez si :</h1>
<p className="t-body-l">Cabinet d'executive search...</p>
<p className="eyebrow">Diagnostic</p>
<p className="t-display-l">
  Recruter le bon dirigeant. <span className="italic text-brand-teal">Sans perdre 6 mois.</span>
</p>
```

### ❌ DON'T

```tsx
<!-- Inline arbitrary sizes — le scanner les flag -->
<h1 className="text-[28px] leading-[1.15] font-display">…</h1>

<!-- Custom tracking au feeling -->
<p className="tracking-[0.18em]">Eyebrow</p>

<!-- Bold sur display (perd le caractère Instrument Serif italic) -->
<h1 className="t-display-l font-bold">…</h1>

<!-- Contraste sous WCAG AA sur petits textes -->
<p className="text-[11px] text-brand-stone/70">…</p>
```

## Outils anti-drift

### Visual reference (toujours à jour)

```
https://www.skstalents.fr/dashboard/typo?token=<DASHBOARD_PRIVATE_TOKEN>
```

Affiche **chaque token** avec son rendu réel. Si un composant ne correspond pas → bug.

### Snapshot test (verrou CI)

`lib/tailwindTokens.test.ts` lock toutes les valeurs de `fontSize`, `lineHeight`, `letterSpacing`. Toute modif involontaire → CI rouge.

```bash
npm test
```

### Migration scanner

```bash
bash scripts/find-typography-drift.sh
```

Compte les inline `text-[Npx]`, `leading-[N]`, `tracking-[N]` à migrer. Objectif long terme : zero hit. Aujourd'hui (mai 2026) : ~88 inline sizes, 26 leading, 294 tracking, 252 font-display+custom-size. Les composants migrés au commit foundation : `Hero`, `RibbonCTA`, `MobileFichesMetiersSection`, `MobileOrientationSection`, `globals.css` utilities.

### Bypass volontaire

Si une déviation est **délibérée** (ex: page expérimentale, A/B test), ajouter un commentaire `// drift-ok` sur la même ligne. Le scanner l'ignore.

## Stratégie de migration progressive

**Pas de big-bang.** À chaque PR qui touche un composant, migrer ses sizes inline vers les tokens. Le scanner devient le compteur de progrès.

**Ordre de priorité** (ROI décroissant) :

1. **Above-the-fold de la home** : `Hero` (✅ fait), `Header` (à faire), `FounderCard`, `RibbonCTA` (✅ fait)
2. **Layout shells** : `PageHero`, `SectionShell`, `SectionTitle`
3. **Pages générant du SEO** : `[slug]` pages job-roles, blog, references
4. **Composants d'affichage de listings** : `ListingCard`, `ReferenceGrid`, `TestimonialMarquee`
5. **Le reste** : au fil de l'eau

## Pourquoi Inter + Instrument Serif

**Inter** (sans-serif) :
- Designée pour les écrans (Rasmus Andersson, ex-Spotify, 2017)
- 9 weights + italic
- Optical sizing automatique
- Hyper-lisible à 11-13px
- Peer group : Stripe, Linear, Notion, Vercel, GitHub

**Instrument Serif** (display) :
- Italic-friendly editorial serif (Instrument Studio, 2022)
- Donne le côté "premium / éditorial" sans tomber dans Times New Roman
- Single weight regular + italic (= contrainte qui force la cohérence)
- Peer group : Cal.com, Stripe Press, plusieurs marques de luxe

Le pairing **Inter + Instrument Serif** est devenu un standard B2B premium 2024-2026 — choix safe et durable, sans être daté.

## Évolutions futures envisagées

- **Optical sizing** : Inter Tight pour les très grandes tailles (display-xl) si on veut affiner le rendu hero (le `next/font/google` peut charger plusieurs sous-familles).
- **Fluid type** (clamp() entre mobile/desktop) : aujourd'hui on utilise des breakpoints sm:; à terme on pourrait passer en `clamp(16px, 2vw, 18px)` pour body. Trade-off : plus fluide mais moins prédictible.
- **Variable fonts** : Inter Variable est dispo via Google Fonts; on pourrait passer en variable pour économiser ~30 KB. À évaluer quand on optimisera le bundle global.

## Quand modifier ce système

Ce document est **stable**. Toute modification :
- Doit être discutée avant
- Doit mettre à jour le snapshot test (`lib/tailwindTokens.test.ts`)
- Doit mettre à jour la page visuelle (`app/dashboard/typo/page.tsx`)
- Doit ajouter une note dans la section "Évolutions" ci-dessus

Le but : que dans 5 ans, ce système soit toujours reconnaissable et utile. Pas une dérive de plus.
