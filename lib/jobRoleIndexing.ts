/**
 * Politique d'indexation des fiches metiers generees en matrice.
 *
 * `data/jobRoles.ts` genere ses fiches par produit cartesien : 6 secteurs x 18
 * modeles. Competences, salaire, parcours et etudes sont identiques d'un
 * secteur a l'autre, seul le nom du secteur est interpole dans deux phrases.
 * Google voit donc jusqu'a 6 pages quasi identiques par metier, n'en classe
 * aucune correctement, et la proportion de contenu genere pese sur la
 * confiance accordee a tout le domaine.
 *
 * Deux traitements, aucune URL supprimee, aucune redirection ajoutee :
 *
 *  1. `noindex` pour les metiers sans aucune traction et hors du perimetre du
 *     cabinet.
 *  2. `canonical` vers une fiche de reference pour les metiers dupliques qui
 *     ont de la traction, afin que Google concentre ses signaux sur une URL.
 *
 * Le choix de la fiche de reference n'est pas arbitraire : il vient des
 * donnees Search Console du 12 juin au 11 septembre 2026. Pour chaque metier
 * on retient le secteur qui performe deja le mieux, en clics puis en
 * impressions et position. Canonicaliser vers un secteur qui ne recoit rien
 * reviendrait a jeter la traction existante.
 *
 * Pour sortir un metier de ce regime, ajouter ses slugs a
 * `DIFFERENTIATED_SLUGS` une fois leur contenu reellement reecrit.
 */

/** Secteurs generes, utilises pour decouper un slug. */
const SECTOR_PREFIXES = [
  "biotech",
  "diagnostic",
  "cosmetique",
  "medical-vet",
  "veterinary",
  "petfood"
] as const;

/**
 * Metiers sans traction mesurable et hors perimetre executive search.
 * Releve Search Console 12/06 au 11/09/2026 : cumul de 0 clic et moins de
 * 20 impressions sur l'ensemble des secteurs.
 */
const OFF_MARKET_ROLE_KEYS = new Set([
  "middleware-engineer", // 6 impressions cumulees, 0 clic
  "cybersecurity-specialist", // 12 impressions cumulees, 0 clic
  "customer-service-manager" // 10 impressions cumulees, 0 clic
]);

/**
 * Metiers dupliques a canonicaliser, avec leur secteur de reference issu des
 * donnees Search Console. Le commentaire indique la traction observee sur le
 * secteur retenu.
 */
const CANONICAL_MASTER_BY_ROLE: Record<string, string> = {
  // Roles techniques terrain : reels chez SKS via les fiches IVD et field service.
  "application-engineer": "medical-vet", // 4 clics, CTR 40 %, position 4,8
  "maintenance-engineer": "diagnostic", // 27 impressions, position 5,6

  // Commercial et direction.
  "export-manager-emea": "petfood", // 3 clics, CTR 37,5 %, position 5,0
  "export-manager-afrique": "diagnostic", // 8 impressions, position 10,0
  "emea-director": "petfood", // 1 clic, 8 impressions, position 4,3
  "sales-director": "medical-vet", // 1 clic, position 6,1
  "business-unit-director": "medical-vet", // 1 clic, 16 impressions
  "ceo": "cosmetique", // 2 clics, CTR 22,2 %, position 9,2
  "cfo": "biotech", // 1 clic, 17 impressions
  "coo": "biotech", // 11 impressions, meilleure position du groupe
  "drh": "veterinary", // 2 clics, CTR 13,3 %, position 7,3

  // Support et operations.
  "regulatory-affairs-manager": "veterinary", // position 5,5, la meilleure du groupe
  "production-manager": "cosmetique", // 8 impressions
  "supply-chain-manager": "diagnostic", // 5 impressions
  "ai-product-manager": "diagnostic" // 14 impressions
};

/**
 * Fiches dont le contenu a ete reellement differencie par secteur.
 * Elles redeviennent indexables independamment. Vide pour l'instant.
 */
const DIFFERENTIATED_SLUGS = new Set<string>([]);

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
 * Politique a appliquer a une fiche metier.
 *
 * @param slug   slug de la fiche
 * @param exists predicat d'existence, pour ne jamais pointer une canonical
 *               vers une URL absente
 */
export function jobRoleIndexing(slug: string, exists: (s: string) => boolean): JobRoleIndexing {
  if (DIFFERENTIATED_SLUGS.has(slug)) {
    return { mode: "index" };
  }

  const parts = splitGeneratedSlug(slug);
  if (!parts) {
    // Fiche redigee a la main : rien a faire.
    return { mode: "index" };
  }

  const { roleKey } = parts;

  if (OFF_MARKET_ROLE_KEYS.has(roleKey)) {
    return { mode: "noindex" };
  }

  const master = CANONICAL_MASTER_BY_ROLE[roleKey];
  if (!master) {
    return { mode: "index" };
  }

  const target = `${master}-${roleKey}`;
  if (target === slug || !exists(target)) {
    // La fiche est la reference, ou la reference n'existe pas dans ce secteur.
    return { mode: "index" };
  }

  return { mode: "canonical", canonicalSlug: target };
}
