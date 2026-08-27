# Posts additionnels Q4 2026

Dossier source des drafts LinkedIn envoyés dans Buffer via
`scripts/buffer-drafts-only.mjs`.

## Structure d'un post .md

```
---
title: "Titre court du post"
statut: draft            # ou "published" une fois validé et envoyé
canal: page              # "page" ou "perso"
published_at: 2026-08-30 # rempli le jour de la publication réelle
---

Corps du post LinkedIn (texte brut, emoji autorisés).
Une ligne blanche = un saut de paragraphe LinkedIn.
```

## Usage

```
node scripts/buffer-drafts-only.mjs --dir docs/posts-additionnels-q4-2026 --channel page --dry-run
node scripts/buffer-drafts-only.mjs --dir docs/posts-additionnels-q4-2026 --channel page
```

Les drafts arrivent dans Buffer > onglet Drafts. Aucune publication auto.
Georges valide et publie manuellement.
