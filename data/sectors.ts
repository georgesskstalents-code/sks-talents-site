export type SectorPage = {
  slug: string;
  title: string;
  summary: string;
};

export type SectorCategory = {
  slug: string;
  title: string;
  description: string;
  pages: SectorPage[];
};

export const lifeSciencesHub = {
  slug: "life-sciences",
  path: "/life-sciences",
  title: "Life Sciences Hub",
  description:
    "Une architecture éditoriale qui relie biotech, thérapies ARN, deeptech, diagnostic, IA médicale et génomique."
};

export const animalHealthHub = {
  slug: "animal-health",
  path: "/animal-health",
  title: "Animal Health Hub",
  description:
    "Un ensemble de pages sectorielles pour les laboratoires vétérinaires, les réseaux de cliniques et les acteurs du petfood premium."
};

export const lifeSciencesCategories: SectorCategory[] = [
  {
    slug: "biotech",
    title: "Biotech & Therapies",
    description: "Recrutement et leadership pour la biotech, l’ARN et les environnements deeptech.",
    pages: [
      { slug: "arn-therapies", title: "ARN Therapies", summary: "Focus sur les thérapies innovantes et la montée en équipe." },
      { slug: "deeptech-startups", title: "Deeptech Startups", summary: "Structurer les talents dans des cycles longs et exigeants." }
    ]
  },
  {
    slug: "diagnostic",
    title: "Diagnostic & Data",
    description: "Marchés IVD, testing, IA diagnostique, génomique et NGS.",
    pages: [
      { slug: "ivd-testing", title: "IVD Testing", summary: "Profils qualité, affaires réglementaires et leadership site." },
      { slug: "ai-diagnostics", title: "AI Diagnostics", summary: "Talents à l’interface clinique, produit et data science." },
      { slug: "genomics-ngs", title: "Genomics & NGS", summary: "Experts bioinfo, science applicative et solutions cliniques." }
    ]
  }
];

export const animalHealthCategories: SectorCategory[] = [
  {
    slug: "medical-vet",
    title: "Médical Vétérinaire",
    description: "Laboratoires pharma, vaccins et biotech santé animale.",
    pages: [
      { slug: "pharma-vaccins", title: "Pharma & Vaccins", summary: "Recrutement pour les organisations santé animale établies." },
      { slug: "biotech-animal", title: "Biotech Animal", summary: "Accompagnement de structures innovantes en santé animale." }
    ]
  },
  {
    slug: "veterinary",
    title: "Soins Vétérinaires",
    description: "Cliniques, diagnostic vétérinaire, télémédecine et plateformes care.",
    pages: [
      { slug: "cliniques", title: "Cliniques", summary: "Ouvertures de sites, staffing médical et management." },
      { slug: "diagnostic-vet", title: "Diagnostic Vet", summary: "Profils techniques et support pour les réseaux vétérinaires." },
      { slug: "telemedicine", title: "Telemedicine", summary: "Talents hybrides pour le soin digital et l’expérience client." }
    ]
  },
  {
    slug: "petfood",
    title: "Nutrition & Petfood",
    description: "Marques premium, innovation, formulation et croissance omnicanale.",
    pages: [
      { slug: "premium", title: "Premium", summary: "Leadership de marque et stratégie de valeur." },
      { slug: "innovation", title: "Innovation", summary: "R&D, industrialisation et nutrition fonctionnelle." }
    ]
  }
];

export function getSectorCategory(
  hub: "life-sciences" | "animal-health",
  categorySlug: string
) {
  const source = hub === "life-sciences" ? lifeSciencesCategories : animalHealthCategories;
  return source.find((category) => category.slug === categorySlug);
}

export function getSectorPage(
  hub: "life-sciences" | "animal-health",
  categorySlug: string,
  pageSlug: string
) {
  return getSectorCategory(hub, categorySlug)?.pages.find((page) => page.slug === pageSlug);
}
