// Per-article hero overrides. Empty by default - components/EditorialContentLayout.tsx falls back
// to the keyword-based Unsplash catalog when a slug is not listed here.
//
// Reason it was emptied: previous Wikipedia/commons URLs failed to load due to hotlinking
// restrictions. The keyword-based fallback is reliable.
export const editorialHeroImages: Record<
  string,
  { src: string; alt: string; source?: string }
> = {};
