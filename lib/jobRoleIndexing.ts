/**
 * Politique d'indexation des fiches metiers generees en matrice.
 *
 * `data/jobRoles.ts` genere ses fiches par produit cartesien : 6 secteurs x 18
 * modeles = 108 URLs dont le contenu ne varie que par le nom du secteur
 * interpole dans deux phrases. Competences, salaire, parcours et etudes sont
 * strictement identiques d'un secteur a l'autre.
 *
 * Consequence : Google voit 6 pages quasi identiques par metier, n'en classe
 * aucune correctement, et la proportion de contenu genere pese sur la confiance
 * accordee a tout le domaine, articles rediges compris.
 *
 * Deux traitements, aucune URL supprimee, aucune redirection ajoutee :
 *
 *  1. `noindex` pour les metiers hors du marche du cabinet. SKS Talents fait de
 *     l'executive search : ces fiches attirent un trafic qui ne converti pas et
 *     n'ont pas vocation a etre classees.
 *  2. `canonical` vers une fiche de reference pour les metiers dupliques qui
 *     restent pertinents. Google concentre alors ses signaux sur une seule URL
 *     au lieu de les repartir sur six.
 *
 * Pour sortir un metier de ce regime, il suffit de l'ajouter a
 * `DIFFERENTIATED_ROLE_KEYS` une fois ses six fiches reellement reecrites.
 */

/** Prefixes de slug des 6 secteurs, dans l'ordre de priorite du cabinet. */
const SECTOR_PREFIXES = [
  "biotech",
  "diagnostic",
  "veterinary",
  "petfood",
  "medical-vet",
  "cosmetique"
] as const;

/**
 * Metiers hors du perimetre executive search de SKS Talents.
 * Leurs fiches restent accessibles par lien direct mais sortent de l'index.
 */
const OFF_MARKET_ROLE_KEYS = new Set([
  "application-engineer",
  "maintenance-engineer",
  "middleware-engineer",
  "cybersecurity-specialist",
  "customer-service-manager"
]);

/** Metiers generes en matrice et encore dupliques a l'identique. */
const MATRIX_ROLE_KEYS = new Set([
  "sales-director",
  "business-unit-director",
  "emea-director",
  "export-manager-emea",
  "export-manager-afrique",
  "coo",
  "ceo",
  "cfo",
  "drh",
  "regulatory-affairs-manager",
  "production-manager",
  "supply-chain-manager",
  "ai-product-manager"
]);

/**
 * Metiers dont les fiches ont ete reellement differenciees par secteur.
 * Elles redeviennent indexables independamment. Vide pour l'instant.
 */
const DIFFERENTIATED_ROLE_KEYS = new Set<string>([]);

export type JobRoleIndexing =
  | { mode: "index" }
  | { mode: "noindex" }
  | { mode: "canonical"; canonicalSlug: string };

/** Decoupe un slug de fiche generee en (secteur, metier). */
function splitGeneratedSlug(slug: string): { sector: string; roleKey: string } | null {
  for (const sector of SECTOR_PREFIXES) {
    if (slug.startsWith(`${sector}-`)) {
      return { sector, roleKey: slug.slice(sector.length + 1) };
    }
  }
  return null;
}

/**
 * Fiche de reference d'un metier : le premier secteur de la liste de priorite.
 * Un metier absent d'un secteur ne pose pas de probleme, la fonction appelante
 * verifie l'existence du slug.
 */
export function canonicalSlugForRole(roleKey: string): string {
  return `${SECTOR_PREFIXES[0]}-${roleKey}`;
}

/**
 * Politique a appliquer a une fiche metier.
 *
 * @param slug   slug de la fiche
 * @param exists predicat d'existence d'un slug, pour ne jamais pointer une
 *               canonical vers une URL absente
 */
export function jobRoleIndexing(slug: string, exists: (s: string) => boolean): JobRoleIndexing {
  const parts = splitGeneratedSlug(slug);
  if (!parts) {
    // Fiche redigee a la main : rien a faire.
    return { mode: "index" };
  }

  const { roleKey } = parts;

  if (OFF_MARKET_ROLE_KEYS.has(roleKey)) {
    return { mode: "noindex" };
  }

  if (!MATRIX_ROLE_KEYS.has(roleKey) || DIFFERENTIATED_ROLE_KEYS.has(roleKey)) {
    return { mode: "index" };
  }

  const target = canonicalSlugForRole(roleKey);
  if (target === slug || !exists(target)) {
    // La fiche est elle-meme la reference, ou la reference n'existe pas.
    return { mode: "index" };
  }

  return { mode: "canonical", canonicalSlug: target };
}
