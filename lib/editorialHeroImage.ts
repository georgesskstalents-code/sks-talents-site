import { editorialHeroImages } from "@/data/editorialHeroImages.generated";

export type EditorialHeroImage = {
  src: string;
  alt: string;
};

export type EditorialHeroImageInput = {
  slug?: string;
  title?: string;
  topicLabel?: string;
  verticalLabel?: string;
};

export const heroImageCatalog: Record<string, EditorialHeroImage> = {
  strategy: {
    src: "/images/editorial/strategy.jpg",
    alt: "Réunion stratégique autour d'un sujet RH, marché ou organisationnel"
  },
  workshop: {
    src: "/images/editorial/workshop.jpg",
    alt: "Atelier collaboratif autour des compétences, du management et de l'exécution"
  },
  diagnostic: {
    src: "/images/editorial/diagnostic.jpg",
    alt: "Réunion de travail autour d'indicateurs, de diagnostic et de pilotage"
  },
  animal: {
    src: "/images/editorial/animal.jpg",
    alt: "Sujet lié à la santé animale, aux services vétérinaires ou au petcare"
  },
  lab: {
    src: "/images/editorial/lab.jpg",
    alt: "Environnement de recherche, biotech et laboratoire"
  },
  hiring: {
    src: "/images/editorial/hiring.jpg",
    alt: "Équipe en échange autour d'un sujet de recrutement et de structuration"
  },
  salary: {
    src: "/images/editorial/salary.jpg",
    alt: "Analyse de données RH, rémunération et arbitrages employeur"
  },
  student: {
    src: "/images/editorial/student.jpg",
    alt: "Parcours étudiants, orientation et montée en compétences"
  }
};

export const DEFAULT_HERO_IMAGE = heroImageCatalog.strategy.src;

const keywordMatchers: Array<{
  keywords: string[];
  image: keyof typeof heroImageCatalog;
}> = [
  { keywords: ["salaire", "salaires", "remuneration", "remunerations", "egalite", "absenteisme", "depression", "enceinte", "licenciement", "qvct"], image: "salary" },
  { keywords: ["orientation", "lycee", "lycees", "ecole", "ecoles", "devenir", "etudiant", "etudiants"], image: "student" },
  { keywords: ["recrutement", "hiring", "talent", "staffing", "shortage", "shortlist", "rpo"], image: "hiring" },
  { keywords: ["crispr", "arn", "cell", "immunotherapy", "synthetic", "therapy", "genomics", "precision-medicine", "biotech"], image: "lab" },
  { keywords: ["ngs", "pcr", "molecular", "diagnostics", "diagnostic", "ivd", "imaging", "poct"], image: "diagnostic" },
  { keywords: ["skills", "soft", "careers", "roles", "leadership", "ia", "ai", "cybersecurity", "digital", "telemedicine"], image: "workshop" },
  { keywords: ["veterinary", "veterinaire", "vet", "animal", "antiparasitic", "vaccine", "pharma-vet", "clinic"], image: "animal" },
  { keywords: ["petfood", "pet", "nutrition", "diet", "protein", "premium-brands", "quality-assurance"], image: "animal" }
];

export function getEditorialHeroImage({
  slug,
  title,
  topicLabel,
  verticalLabel
}: EditorialHeroImageInput = {}): EditorialHeroImage {
  if (slug && slug in editorialHeroImages) {
    return editorialHeroImages[slug as keyof typeof editorialHeroImages];
  }

  const haystack = [slug, title, topicLabel, verticalLabel]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const matcher of keywordMatchers) {
    if (matcher.keywords.some((keyword) => haystack.includes(keyword))) {
      return heroImageCatalog[matcher.image];
    }
  }

  if ((topicLabel || "").toLowerCase().includes("skills")) {
    return heroImageCatalog.workshop;
  }

  if ((verticalLabel || "").toLowerCase().includes("diagnostic")) {
    return heroImageCatalog.diagnostic;
  }

  if ((verticalLabel || "").toLowerCase().match(/animal|petfood|veter/)) {
    return heroImageCatalog.animal;
  }

  return heroImageCatalog.strategy;
}
