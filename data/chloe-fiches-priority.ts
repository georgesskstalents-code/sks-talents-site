/**
 * Chloe Live · liste des 30 fiches metier prioritaires (Batch 1)
 *
 * Chaque entree associe un titre cible (brief Georges 2026-08-26) a :
 * - slug existant dans data/jobRoles.ts si trouve
 * - "missing" quand la fiche n'existe pas encore (a creer plus tard)
 * - bloc: "petfood" | "animal-health" | "life-sciences"
 *
 * Le widget ChloeLive est active uniquement sur les fiches dont slug != null.
 * Les fiches "missing" sont listees pour la roadmap editoriale.
 */

export type ChloePriorityFiche = {
  /** Titre affiche dans le brief (aspiration editoriale). */
  targetTitle: string;
  /** Slug existant dans data/jobRoles.ts, ou null si a creer. */
  slug: string | null;
  /** Bloc thematique pour ajuster le contexte Chloe. */
  bloc: "petfood" | "animal-health" | "life-sciences";
  /** Note de mapping (approximation, exact match, ou fiche a creer). */
  matchNote: "exact" | "approximation" | "missing";
};

export const chloePriorityFiches: ChloePriorityFiche[] = [
  // Bloc A · Petfood (10)
  { targetTitle: "VP Sales Petfood International", slug: "petfood-commercial-chiens-chats", bloc: "petfood", matchNote: "approximation" },
  { targetTitle: "Head of Marketing Petfood Premium", slug: "head-of-marketing-petfood-premium", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "Petfood R&D Director", slug: "petfood-rd-director", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "Head of Innovation Petfood", slug: "head-of-innovation-petfood", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "CFO Groupe Petfood", slug: "cfo-petfood-group", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "Category Manager Petfood", slug: "category-manager-petfood", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "Head of Product Development Petfood", slug: "petfood-palatability-scientist", bloc: "petfood", matchNote: "approximation" },
  { targetTitle: "Brand Manager Petfood Premium", slug: "brand-manager-petfood-premium", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "Head of Sustainability Petfood", slug: "head-of-sustainability-petfood", bloc: "petfood", matchNote: "exact" },
  { targetTitle: "National Sales Manager Petfood France", slug: "petfood-technical-services-manager", bloc: "petfood", matchNote: "approximation" },

  // Bloc B · Sante Animale (10)
  { targetTitle: "Directeur.rice Regional Cliniques Veterinaires", slug: "veterinary-regional-clinic-director", bloc: "animal-health", matchNote: "exact" },
  { targetTitle: "Head of Regulatory Europe Sante Animale", slug: "medical-vet-head-of-regulatory-europe", bloc: "animal-health", matchNote: "exact" },
  { targetTitle: "Country Manager France Sante Animale", slug: "medical-vet-country-manager-france", bloc: "animal-health", matchNote: "exact" },
  { targetTitle: "CEO Groupe Veterinaire", slug: "ceo-veterinary-group", bloc: "animal-health", matchNote: "exact" },
  { targetTitle: "Head of R&D Sante Animale", slug: "head-of-rd-animal-health", bloc: "animal-health", matchNote: "exact" },
  { targetTitle: "Head of Marketing Sante Animale", slug: "medical-vet-channel-marketing-manager", bloc: "animal-health", matchNote: "approximation" },
  { targetTitle: "VP Commercial Sante Animale", slug: "medical-vet-commercial-director-france-animal-nutrition", bloc: "animal-health", matchNote: "approximation" },
  { targetTitle: "Head of Digital Health Vet Tech", slug: "medical-vet-head-of-commercial-development-ai-startup", bloc: "animal-health", matchNote: "approximation" },
  { targetTitle: "Head of Biosecurity Poultry Swine", slug: "medical-vet-technical-manager-poultry", bloc: "animal-health", matchNote: "approximation" },
  { targetTitle: "Chief Scientific Officer Sante Animale", slug: "medical-vet-scientific-affairs-manager", bloc: "animal-health", matchNote: "approximation" },

  // Bloc C · Head of Life Sciences (10)
  { targetTitle: "Head of AI ML Biotech", slug: "biotech-ai-scientist", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Data Science LS", slug: "diagnostic-data-science-manager", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Bioprocess Engineering", slug: "biotech-process-development-scientist", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Clinical Development Biotech", slug: "biotech-medical-director", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Regulatory Affairs Europe Biotech Medtech", slug: "diagnostic-ivdr-regulatory-affairs-specialist", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Quality GMP Biotech", slug: "biotech-head-of-quality", bloc: "life-sciences", matchNote: "exact" },
  { targetTitle: "Head of R&D Medtech Robotique", slug: "medtech-cto-startup-scale-up", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Software Medical Devices SaMD", slug: "diagnostic-ivd-software-engineer", bloc: "life-sciences", matchNote: "approximation" },
  { targetTitle: "Head of Manufacturing MSAT", slug: "biotech-msat-lead", bloc: "life-sciences", matchNote: "exact" },
  { targetTitle: "Head of Business Development Biotech Deeptech", slug: "medical-vet-business-development-manager", bloc: "life-sciences", matchNote: "approximation" }
];

/** Set des slugs sur lesquels le widget Chloe Live est active. */
export const chloeActiveSlugs = new Set(
  chloePriorityFiches
    .map((f) => f.slug)
    .filter((s): s is string => Boolean(s))
);

export function findChloeFicheBySlug(slug: string): ChloePriorityFiche | null {
  return chloePriorityFiches.find((f) => f.slug === slug) ?? null;
}

export function isChloeActiveFor(slug: string): boolean {
  return chloeActiveSlugs.has(slug);
}

/** Slugs de fiches a creer (roadmap editoriale). */
export const chloeMissingFiches = chloePriorityFiches
  .filter((f) => f.matchNote === "missing")
  .map((f) => f.targetTitle);
