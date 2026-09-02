/**
 * Filet de securite pour les slugs devines.
 *
 * Contexte : les moteurs de reponse (et les humain.e.s) fabriquent des URLs
 * plausibles a partir d'un titre de page. Exemple reel observe en prod :
 * `/job-roles/key-account-manager-animal-health?utm_source=chatgpt.com`
 * alors que le slug reel est `medical-vet-key-account-manager-large-accounts`.
 *
 * Ordre de resolution applique sur une route dynamique :
 *   1. next.config.mjs `redirects()` (edge, s'execute avant tout rendu).
 *   2. match exact sur le jeu de donnees (comportement normal).
 *   3. ce module : alias explicites -> normalisation -> similarite floue.
 *      Si la confiance est forte : redirect 308. Sinon : 404 utile.
 *
 * Ce module est volontairement pur (aucune dependance Node) pour pouvoir etre
 * importe aussi bien cote serveur que dans un composant client.
 */

export type SlugCandidate = {
  slug: string;
  title: string;
};

export type ScoredCandidate = SlugCandidate & {
  score: number;
};

export type SlugResolution =
  | { status: "exact"; slug: string }
  | { status: "redirect"; slug: string; reason: "alias" | "normalized" | "fuzzy"; score: number }
  | { status: "suggest"; suggestions: ScoredCandidate[] };

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

export function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Normalise n'importe quelle chaine (slug demande ou titre de fiche) vers la
 * forme canonique du site : minuscules, sans accent, separateurs en tiret.
 * Tolere les slugs percent-encodes (ex. `r%C3%B4les`).
 */
export function normalizeSlug(value: string): string {
  let raw = value ?? "";
  if (raw.includes("%")) {
    try {
      raw = decodeURIComponent(raw);
    } catch {
      /* slug mal encode : on garde la valeur brute */
    }
  }
  return stripAccents(raw)
    .toLowerCase()
    .replace(/['’&+.]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Slugifie un titre humain ("Key Account Manager Grand Compte Sante Animale"). */
export function slugifyLabel(label: string): string {
  return normalizeSlug(label);
}

/**
 * Phrases equivalentes FR / EN / abreviations. Appliquees des deux cotes de la
 * comparaison, donc symetriques : elles rapprochent un slug devine en francais
 * d'un slug reel en anglais (et inversement).
 * Les phrases les plus longues doivent passer en premier.
 */
const PHRASE_SYNONYMS: [RegExp, string][] = [
  [/\bdirecteur-des-ressources-humaines\b/g, "hr-director"],
  [/\bresponsable-des-ressources-humaines\b/g, "hr-director"],
  [/\bressources-humaines\b/g, "hr"],
  [/\baffaires-reglementaires\b/g, "regulatory-affairs"],
  [/\brecherche-et-developpement\b/g, "rd"],
  [/\bnutrition-animale\b/g, "petfood"],
  [/\bsante-animale\b/g, "animal-health"],
  [/\bmedical-vet\b/g, "animal-health"],
  [/\bpet-food\b/g, "petfood"],
  [/\bgrands-comptes\b/g, "key-account"],
  [/\bgrand-compte\b/g, "key-account"],
  [/\blarge-accounts\b/g, "key-account"],
  [/\bchef-de-produit\b/g, "product-manager"],
  [/\bchef-de-projet\b/g, "project-manager"],
  [/\bdirecteur-des-ventes\b/g, "sales-director"],
  [/\bdirecteur-commercial\b/g, "sales-director"],
  [/\bdirectrice-commerciale\b/g, "sales-director"],
  [/\btechnico-commercial\b/g, "technical-sales"],
  [/\bveterinaires?\b/g, "veterinary"],
  [/\bveterinarian\b/g, "veterinary"],
  [/\bbiotechnologies?\b/g, "biotech"],
  [/\bdiagnostics\b/g, "diagnostic"],
  [/\bcosmetics?\b/g, "cosmetique"],
  [/\bdirect(?:eur|rice|ion)\b/g, "director"],
  [/\bresponsables?\b/g, "manager"],
  [/\bingenieure?\b/g, "engineer"],
  [/\bqualite\b/g, "quality"],
  [/\bventes\b/g, "sales"],
  [/\bachats\b/g, "procurement"],
  [/\breglementaire\b/g, "regulatory"],
  [/\bscientifique\b/g, "scientist"],
  [/\bformation\b/g, "training"],
  [/\bemplois?\b/g, "job"],
  [/\bmetiers?\b/g, "job"],
  [/\bfiche-metier\b/g, "job"],
  [/\br-d\b/g, "rd"]
];

/** Bruit ajoute par les LLM ou les CMS quand ils devinent une URL. */
const NOISE_TOKENS = new Set([
  "fiche",
  "job",
  "role",
  "roles",
  "poste",
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "et",
  "en",
  "a",
  "the",
  "and",
  "of",
  "for",
  "h-f",
  "hf",
  "fh"
]);

/** Forme canonique servant a la comparaison (synonymes resolus). */
export function canonicalize(value: string): string {
  let out = normalizeSlug(value);
  for (const [pattern, replacement] of PHRASE_SYNONYMS) {
    out = out.replace(pattern, replacement);
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export function tokenize(value: string): string[] {
  return canonicalize(value)
    .split("-")
    .filter((token) => token.length > 0 && !NOISE_TOKENS.has(token));
}

/* ------------------------------------------------------------------ */
/* Similarite                                                          */
/* ------------------------------------------------------------------ */

/** Distance de Levenshtein (implementation a deux lignes, O(min(n,m)) memoire). */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let previous = new Array<number>(b.length + 1);
  let current = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) previous[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= b.length; j += 1) {
      const cost = ca === b.charCodeAt(j - 1) ? 0 : 1;
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
    }
    const swap = previous;
    previous = current;
    current = swap;
  }
  return previous[b.length];
}

/** Similarite caractere a caractere, entre 0 et 1. */
export function charSimilarity(a: string, b: string): number {
  const max = Math.max(a.length, b.length);
  if (max === 0) return 1;
  return 1 - levenshtein(a, b) / max;
}

/**
 * Score composite entre un slug demande et une fiche candidate.
 * 55 % de recouvrement lexical, 45 % de proximite orthographique.
 * Le recouvrement lexical melange la couverture (part des mots demandes que la
 * fiche contient) et Jaccard (penalise les fiches beaucoup plus longues).
 */
export function scoreCandidate(requested: string, candidate: SlugCandidate): number {
  const queryTokens = tokenize(requested);
  if (queryTokens.length === 0) return 0;

  const candidateTokens = new Set([...tokenize(candidate.slug), ...tokenize(candidate.title)]);
  const querySet = new Set(queryTokens);

  let shared = 0;
  for (const token of querySet) {
    if (candidateTokens.has(token)) shared += 1;
  }

  const coverage = shared / querySet.size;
  const union = new Set([...querySet, ...candidateTokens]).size;
  const jaccard = union === 0 ? 0 : shared / union;
  const lexical = 0.62 * coverage + 0.38 * jaccard;

  const orthographic = Math.max(
    charSimilarity(canonicalize(requested), canonicalize(candidate.slug)),
    charSimilarity(canonicalize(requested), canonicalize(candidate.title))
  );

  return 0.55 * lexical + 0.45 * orthographic;
}

/** Classe les fiches de la plus proche a la plus lointaine. */
export function rankCandidates(
  requested: string,
  candidates: readonly SlugCandidate[],
  limit = 5
): ScoredCandidate[] {
  return candidates
    .map((candidate) => ({ ...candidate, score: scoreCandidate(requested, candidate) }))
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */

export type ResolveOptions = {
  /** Slug demande par le visiteur (brut, tel qu'il arrive dans params). */
  requested: string;
  /** Univers des fiches reellement rendues par la route. */
  candidates: readonly SlugCandidate[];
  /** Alias explicites ou generes : aliasNormalise -> slug reel. */
  aliases?: ReadonlyMap<string, string>;
  /** Score minimum pour declencher un 308 automatique (voie "score eleve"). */
  redirectThreshold?: number;
  /** Ecart minimum avec le second candidat sur la voie "score eleve". */
  minMargin?: number;
  /** Score minimum sur la voie "vainqueur detache" (score plus bas, ecart net). */
  dominantThreshold?: number;
  /** Ecart minimum sur la voie "vainqueur detache". */
  dominantMargin?: number;
  /** Nombre de suggestions rendues sur la page 404. */
  maxSuggestions?: number;
};

/**
 * Deux voies de redirection, volontairement conservatrices :
 *   - score eleve  : la fiche est quasi identique au slug demande.
 *   - vainqueur detache : le score est plus modeste mais le second candidat est
 *     loin derriere, donc l'intention est sans ambiguite.
 * Tout le reste part en 404 utile avec suggestions.
 */
const DEFAULT_REDIRECT_THRESHOLD = 0.84;
const DEFAULT_MIN_MARGIN = 0.05;
const DEFAULT_DOMINANT_THRESHOLD = 0.7;
const DEFAULT_DOMINANT_MARGIN = 0.1;

export function resolveSlug({
  requested,
  candidates,
  aliases,
  redirectThreshold = DEFAULT_REDIRECT_THRESHOLD,
  minMargin = DEFAULT_MIN_MARGIN,
  dominantThreshold = DEFAULT_DOMINANT_THRESHOLD,
  dominantMargin = DEFAULT_DOMINANT_MARGIN,
  maxSuggestions = 5
}: ResolveOptions): SlugResolution {
  const known = new Set(candidates.map((candidate) => candidate.slug));

  if (known.has(requested)) {
    return { status: "exact", slug: requested };
  }

  const normalized = normalizeSlug(requested);
  if (normalized && known.has(normalized)) {
    return { status: "redirect", slug: normalized, reason: "normalized", score: 1 };
  }

  const aliasTarget = aliases?.get(normalized) ?? aliases?.get(canonicalize(requested));
  if (aliasTarget && known.has(aliasTarget)) {
    return { status: "redirect", slug: aliasTarget, reason: "alias", score: 1 };
  }

  // Un slug canonique identique (accents, doublons de tirets, casse) reste un
  // redirect sur : on compare la forme canonique des deux cotes.
  const requestedCanonical = canonicalize(requested);
  const canonicalHit = candidates.find((candidate) => canonicalize(candidate.slug) === requestedCanonical);
  if (canonicalHit) {
    return { status: "redirect", slug: canonicalHit.slug, reason: "normalized", score: 1 };
  }

  const ranked = rankCandidates(requested, candidates, Math.max(maxSuggestions, 2));
  const best = ranked[0];
  const second = ranked[1];

  if (best) {
    const margin = second ? best.score - second.score : 1;
    const highScore = best.score >= redirectThreshold && margin >= minMargin;
    const dominant = best.score >= dominantThreshold && margin >= dominantMargin;
    if (highScore || dominant) {
      return { status: "redirect", slug: best.slug, reason: "fuzzy", score: best.score };
    }
  }

  return { status: "suggest", suggestions: ranked.slice(0, maxSuggestions) };
}

/* ------------------------------------------------------------------ */
/* Generation d'alias                                                  */
/* ------------------------------------------------------------------ */

/**
 * Prefixes sectoriels presents en tete des slugs reels. Sert a fabriquer les
 * variantes "sans prefixe" et "prefixe deplace en suffixe", qui sont les deux
 * formes que les moteurs de reponse produisent le plus souvent.
 */
export type AliasGenerationConfig = {
  /** Prefixes a detacher du slug reel (ordre : du plus long au plus court). */
  sectorPrefixes: readonly string[];
  /** Synonymes de secteur, indexes par la valeur du champ `sector`. */
  sectorSynonyms: Readonly<Record<string, readonly string[]>>;
  /** Mots sectoriels a retirer d'un titre pour obtenir le coeur de fonction. */
  sectorWords: readonly string[];
};

function addAlias(map: Map<string, Set<string>>, alias: string, slug: string) {
  const key = normalizeSlug(alias);
  if (!key || key === slug) return;
  if (!map.has(key)) map.set(key, new Set());
  map.get(key)!.add(slug);
}

/**
 * Construit la table d'alias derivee des donnees reelles.
 * Un alias ambigu (plusieurs fiches cibles) ou qui percute un slug reel est
 * ecarte : mieux vaut une page 404 utile qu'une redirection fausse.
 */
export function buildGeneratedAliases(
  entries: readonly { slug: string; title: string; sector?: string }[],
  config: AliasGenerationConfig
): Map<string, string> {
  const collected = new Map<string, Set<string>>();
  const realSlugs = new Set(entries.map((entry) => entry.slug));

  for (const entry of entries) {
    const { slug, title } = entry;
    const titleSlug = slugifyLabel(title);
    addAlias(collected, titleSlug, slug);

    const prefix = config.sectorPrefixes.find((candidate) => slug.startsWith(`${candidate}-`));
    const base = prefix ? slug.slice(prefix.length + 1) : slug;
    addAlias(collected, base, slug);

    const synonyms = entry.sector ? config.sectorSynonyms[entry.sector] ?? [] : [];

    // Coeur de fonction : titre debarrasse de ses mots sectoriels.
    const core = titleSlug
      .split("-")
      .filter((token) => !config.sectorWords.includes(token))
      .join("-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (core && core !== titleSlug) addAlias(collected, core, slug);

    for (const synonym of synonyms) {
      addAlias(collected, `${base}-${synonym}`, slug);
      addAlias(collected, `${synonym}-${base}`, slug);
      if (core) {
        addAlias(collected, `${core}-${synonym}`, slug);
        addAlias(collected, `${synonym}-${core}`, slug);
      }
      if (titleSlug !== core) {
        addAlias(collected, `${titleSlug}-${synonym}`, slug);
      }
    }
  }

  const resolved = new Map<string, string>();
  for (const [alias, targets] of collected) {
    if (targets.size !== 1) continue;
    if (realSlugs.has(alias)) continue;
    resolved.set(alias, [...targets][0]);
  }
  return resolved;
}

/**
 * Fusionne alias generes et alias explicites (les explicites gagnent).
 * Les alias explicites dont la cible n'existe plus sont ignores en silence :
 * la fiche a pu etre renommee, le moteur flou prendra le relais.
 */
export function mergeAliases(
  generated: ReadonlyMap<string, string>,
  manual: Readonly<Record<string, string>>,
  knownSlugs: ReadonlySet<string>
): Map<string, string> {
  const merged = new Map(generated);
  for (const [alias, target] of Object.entries(manual)) {
    if (!knownSlugs.has(target)) continue;
    merged.set(normalizeSlug(alias), target);
  }
  return merged;
}
