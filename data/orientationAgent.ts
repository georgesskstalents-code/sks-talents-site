export type OrientationQuestion = {
  id: number;
  text: string;
  help: string;
  options: {
    value: string;
    label: string;
    tags: string[];
  }[];
};

export type OrientationRecommendation = {
  slug: string;
  title: string;
  sector: string;
  salary: string;
  description: string;
  strengths: string[];
  formations: string[];
  schools: string[];
  articleSlugs: string[];
  jobRoleSlug: string;
  scoreTags: string[];
  trending?: boolean;
};

export const orientationQuestions: OrientationQuestion[] = [
  {
    id: 1,
    text: "Quel domaine vous attire le plus ?",
    help: "Choisissez le secteur qui vous donne envie de creuser une trajectoire professionnelle.",
    options: [
      { value: "biotech", label: "Biotech, ARN, thérapies avancées", tags: ["biotech", "research"] },
      { value: "diagnostic", label: "Diagnostic, data, génomique", tags: ["diagnostic", "data"] },
      { value: "animal-health", label: "Santé animale et médical vétérinaire", tags: ["animal-health", "care"] },
      { value: "petfood", label: "Nutrition, petfood et innovation produit", tags: ["petfood", "product"] }
    ]
  },
  {
    id: 2,
    text: "Dans quel environnement vous projetez-vous le mieux ?",
    help: "Cela nous aide à distinguer les rôles plus laboratoire, data, terrain ou business.",
    options: [
      { value: "lab", label: "Laboratoire, R&D, expérimentation", tags: ["research", "lab"] },
      { value: "data", label: "Analyse, data, outils numériques", tags: ["data", "analysis"] },
      { value: "field", label: "Terrain, opérations, relation client ou clinique", tags: ["care", "field"] },
      { value: "product", label: "Innovation produit, coordination, stratégie", tags: ["product", "business"] }
    ]
  },
  {
    id: 3,
    text: "Quelle compétence avez-vous le plus envie de valoriser ?",
    help: "Pas besoin d’être déjà expert, choisissez ce qui vous semble le plus naturel.",
    options: [
      { value: "science", label: "Culture scientifique et rigueur technique", tags: ["research", "science"] },
      { value: "problem-solving", label: "Résolution de problèmes et logique", tags: ["analysis", "data"] },
      { value: "communication", label: "Pédagogie, communication, coordination", tags: ["business", "care"] },
      { value: "execution", label: "Organisation, qualité, exécution", tags: ["product", "field"] }
    ]
  },
  {
    id: 4,
    text: "Quel horizon vous correspond aujourd’hui ?",
    help: "On ne recommande pas la même trajectoire selon que vous cherchez un premier rôle ou une montée en puissance.",
    options: [
      { value: "entry", label: "Premier poste / stage / alternance", tags: ["entry"] },
      { value: "junior", label: "1 à 3 ans d’expérience à construire", tags: ["junior"] },
      { value: "specialist", label: "Je vise une spécialisation forte", tags: ["specialist"] },
      { value: "hybrid", label: "Je veux rester hybride science + business", tags: ["hybrid", "business"] }
    ]
  }
];

export const orientationRecommendations: OrientationRecommendation[] = [
  {
    slug: "senior-scientist-arn-therapeutics",
    title: "Scientist ARN Therapeutics",
    sector: "Biotech",
    salary: "38k - 55k en premier cycle, puis progression rapide",
    description:
      "Une trajectoire idéale si vous aimez la recherche appliquée, les protocoles exigeants et les environnements biotech à forte intensité scientifique.",
    strengths: ["Biologie moléculaire", "Protocoles expérimentaux", "Culture data scientifique"],
    formations: ["Master biologie moléculaire", "PhD biotech", "Spécialisation ARN / génomique"],
    schools: ["universite-paris-saclay-biology", "universite-montpellier-pharma", "universite-lille-biotech"],
    articleSlugs: ["arn-hiring-2025", "precision-medicine-biotech", "synthetic-biology-startups"],
    jobRoleSlug: "vp-clinical-operations",
    scoreTags: ["biotech", "research", "lab", "science", "entry", "junior", "specialist"],
    trending: true
  },
  {
    slug: "ngs-bioinformatics-analyst",
    title: "Analyste Bioinformatique NGS",
    sector: "Diagnostic",
    salary: "40k - 60k selon stack et exposition clinique",
    description:
      "Un excellent choix si vous aimez les données, la logique, la génomique et les environnements où l’impact clinique est rapide.",
    strengths: ["Bioinformatique", "Pipelines NGS", "Analyse de données"],
    formations: ["Master bioinformatique", "Data science santé", "Génomique / NGS"],
    schools: ["esigen-bioinformatique", "utc-biomed", "centrale-supelec-health"],
    articleSlugs: ["ngs-bioinformatician-demand", "molecular-diagnostics-pcr-ngs", "rwe-clinical-data-management"],
    jobRoleSlug: "head-of-qa-diagnostic",
    scoreTags: ["diagnostic", "data", "analysis", "science", "entry", "junior", "specialist"],
    trending: true
  },
  {
    slug: "veterinary-clinic-development",
    title: "Coordinateur Développement Vétérinaire",
    sector: "Animal Health",
    salary: "35k - 50k avec progression vers management de réseau",
    description:
      "Une voie intéressante pour les profils qui aiment le terrain, les équipes, les parcours de soin et la dynamique des groupes vétérinaires.",
    strengths: ["Coordination", "Relation terrain", "Organisation d’activité"],
    formations: ["Santé animale", "Business / management", "Parcours vétérinaire ou biotech animale"],
    schools: ["oniris", "vetagro-sup", "enva"],
    articleSlugs: ["veterinarian-shortage-solutions", "pet-clinic-group-expansion", "vet-clinic-digital-transformation"],
    jobRoleSlug: "medical-director-veterinary",
    scoreTags: ["animal-health", "care", "field", "communication", "entry", "junior", "hybrid", "business"]
  },
  {
    slug: "petfood-innovation-associate",
    title: "Chef de projet Innovation Petfood",
    sector: "Petfood",
    salary: "36k - 52k selon exposition R&D / marketing / industrie",
    description:
      "Un rôle hybride pour les profils attirés par la nutrition, le produit, le premium et la coordination entre science et marché.",
    strengths: ["Innovation produit", "Gestion de projet", "Coordination transverse"],
    formations: ["Nutrition", "Agro / formulation", "Marketing ou innovation food / petcare"],
    schools: ["isa-lille-nutrition", "agrocampus-ouest", "agroparistech"],
    articleSlugs: ["pet-nutrition-science-trends", "petfood-product-development-innovation", "sustainable-proteins-petfood"],
    jobRoleSlug: "vp-clinical-operations",
    scoreTags: ["petfood", "product", "business", "execution", "entry", "junior", "hybrid"]
  },
  {
    slug: "regulatory-clinical-coordinator",
    title: "Coordinateur Réglementaire & Clinique",
    sector: "Life Sciences",
    salary: "38k - 58k selon périmètre qualité / réglementaire / clinique",
    description:
      "Une trajectoire solide si vous aimez structurer, documenter, sécuriser et faire avancer des projets régulés.",
    strengths: ["Rigueur documentaire", "Coordination multi-parties", "Qualité et conformité"],
    formations: ["Pharmacie", "Affaires réglementaires", "Qualité / clinique"],
    schools: ["universite-montpellier-pharma", "universite-paris-saclay-biology", "em-lyon-healthcare"],
    articleSlugs: ["genomics-precision-medicine", "regulatory-affairs-vet-pharma", "ivd-testing-laboratory-roles"],
    jobRoleSlug: "head-of-qa-diagnostic",
    scoreTags: ["biotech", "diagnostic", "product", "execution", "science", "junior", "specialist", "hybrid"]
  }
];

export const purpleCareerUrl =
  process.env.NEXT_PUBLIC_PURPLE_URL ?? "https://www.purplesquirrel.fr/miniformation-dirigeant";
