import { jobRoles } from "@/data/jobRoles";
import {
  buildGeneratedAliases,
  mergeAliases,
  normalizeSlug,
  type AliasGenerationConfig,
  type SlugCandidate
} from "@/lib/slugRescue";

/**
 * Alias de slugs pour /job-roles/[slug].
 *
 * Deux sources :
 *   1. Generation automatique a partir des titres reels des fiches
 *      (`buildGeneratedAliases`). Couvre les slugs derives mecaniquement d'un
 *      titre, par exemple "Key Account Manager Grand Compte Sante Animale" ->
 *      `key-account-manager-grand-compte-sante-animale`.
 *   2. Table manuelle ci-dessous, pour les formulations que la generation ne
 *      peut pas deviner ou qu'elle juge ambigues (plusieurs fiches cibles).
 *
 * Regle : un alias ambigu est ecarte automatiquement. Une redirection fausse
 * coute plus cher qu'une page 404 utile.
 */

const ALIAS_CONFIG: AliasGenerationConfig = {
  sectorPrefixes: [
    "cross-sector",
    "life-sciences",
    "medical-vet",
    "veterinary",
    "cosmetique",
    "diagnostic",
    "petfood",
    "biotech",
    "medtech"
  ],
  sectorSynonyms: {
    Biotech: ["biotech", "biotechnologie", "life-sciences"],
    Diagnostic: ["diagnostic", "ivd", "medtech"],
    "Medical Vet": ["animal-health", "sante-animale", "medical-vet", "veterinaire"],
    Veterinary: ["veterinary", "veterinaire", "clinique-veterinaire"],
    Petfood: ["petfood", "pet-food", "nutrition-animale"],
    Cosmetique: ["cosmetique", "cosmetics", "cosmetic"],
    "Cross-sector": ["life-sciences", "cross-sector", "sante"]
  },
  sectorWords: [
    "biotech",
    "biotechnologie",
    "biotechnologies",
    "cosmetique",
    "cosmetics",
    "cosmetic",
    "diagnostic",
    "diagnostics",
    "medtech",
    "medical",
    "vet",
    "veterinaire",
    "veterinaires",
    "veterinary",
    "petfood",
    "animale",
    "animal",
    "health",
    "sante",
    "sciences",
    "cross",
    "sector"
  ]
};

/**
 * Slugs "plausibles" observes ou anticipes : formulations qu'un moteur de
 * reponse fabrique naturellement a partir d'un titre ou d'un intitule metier
 * courant du marche. Cle = slug devine, valeur = slug reel.
 *
 * `key-account-manager-animal-health` est le cas reel a l'origine de ce filet
 * (404 en prod avec `utm_source=chatgpt.com`, 2026-08-31).
 */
export const MANUAL_JOB_ROLE_ALIASES: Record<string, string> = {
  // Sante animale · commerce
  "key-account-manager-animal-health": "medical-vet-key-account-manager-large-accounts",
  "key-account-manager-sante-animale": "medical-vet-key-account-manager-large-accounts",
  "responsable-grands-comptes-sante-animale": "medical-vet-key-account-manager-large-accounts",
  "key-account-manager-distributeurs-sante-animale":
    "medical-vet-key-account-manager-emea-distributors",
  "directeur-commercial-sante-animale": "medical-vet-sales-director",
  "directeur-des-ventes-sante-animale": "medical-vet-sales-director",
  "business-development-manager-animal-health": "medical-vet-business-development-manager",
  "responsable-developpement-commercial-sante-animale":
    "medical-vet-business-development-manager",
  "country-manager-sante-animale-france": "medical-vet-country-manager-france",
  "area-sales-manager-sante-animale": "medical-vet-area-sales-manager",

  // Sante animale · marketing, medical, reglementaire
  "chef-de-produit-sante-animale": "medical-vet-product-manager",
  "product-manager-animal-health": "medical-vet-product-manager",
  "responsable-medical-sante-animale": "medical-vet-medical-affairs-manager",
  "medical-affairs-manager-animal-health": "medical-vet-medical-affairs-manager",
  "pharmacovigilance-manager-animal-health": "medical-vet-pharmacovigilance-manager",
  "responsable-pharmacovigilance-sante-animale": "medical-vet-pharmacovigilance-manager",
  "regulatory-affairs-manager-animal-health": "medical-vet-regulatory-affairs-manager",
  "responsable-affaires-reglementaires-sante-animale": "medical-vet-regulatory-affairs-manager",
  "head-of-rd-sante-animale": "head-of-rd-animal-health",
  "directeur-recherche-developpement-sante-animale": "head-of-rd-animal-health",
  "medical-science-liaison-sante-animale": "medical-vet-medical-science-liaison",

  // Veterinaire terrain et cliniques
  "veterinaire-technique-volaille": "medical-vet-technical-manager-poultry",
  "veterinaire-technique-ruminants": "medical-vet-technical-manager-ruminant",
  "veterinaire-technique-porcs": "medical-vet-technical-manager-swine",
  "veterinaire-urgentiste": "veterinary-emergency-critical-care-veterinarian",
  "veterinaire-anesthesiste": "veterinary-anesthesia-veterinarian",
  "veterinaire-imagerie-medicale": "veterinary-imageur",
  "directeur-clinique-veterinaire": "veterinary-clinic-operations-director",
  "directeur-regional-cliniques-veterinaires": "veterinary-regional-clinic-director",
  "directeur-hopital-veterinaire": "veterinary-hospital-director",

  // Biotech, diagnostic, petfood, cosmetique
  "responsable-qualite-biotech": "biotech-head-of-quality",
  "directeur-industriel-biotech": "biotech-plant-director-gmp-bpf",
  "responsable-affaires-reglementaires-biotech": "biotech-regulatory-affairs-manager",
  "directeur-des-ressources-humaines-biotech": "biotech-drh",
  "ingenieur-application-diagnostic": "diagnostic-application-engineer",
  "responsable-supply-chain-diagnostic": "diagnostic-supply-chain-manager",
  "directeur-recherche-developpement-petfood": "petfood-rd-director",
  "responsable-qualite-petfood": "petfood-quality-food-safety-manager",
  "responsable-supply-chain-petfood": "petfood-supply-chain-manager",
  "responsable-affaires-reglementaires-cosmetique": "cosmetique-regulatory-affairs-manager",
  "formulateur-cosmetique": "cosmetique-formulation-scientist"
};

export const jobRoleCandidates: SlugCandidate[] = jobRoles.map((role) => ({
  slug: role.slug,
  title: role.title
}));

const knownJobRoleSlugs = new Set(jobRoles.map((role) => role.slug));

let cachedAliases: Map<string, string> | null = null;

/** Table d'alias complete (generee + manuelle), construite une seule fois. */
export function getJobRoleAliases(): Map<string, string> {
  if (!cachedAliases) {
    const generated = buildGeneratedAliases(
      jobRoles.map((role) => ({ slug: role.slug, title: role.title, sector: role.sector })),
      ALIAS_CONFIG
    );
    cachedAliases = mergeAliases(generated, MANUAL_JOB_ROLE_ALIASES, knownJobRoleSlugs);
  }
  return cachedAliases;
}

/** Cibles manuelles qui ne correspondent a aucune fiche (verifie par les tests). */
export function getDanglingManualAliases(): string[] {
  return Object.entries(MANUAL_JOB_ROLE_ALIASES)
    .filter(([, target]) => !knownJobRoleSlugs.has(target))
    .map(([alias, target]) => `${normalizeSlug(alias)} -> ${target}`);
}
