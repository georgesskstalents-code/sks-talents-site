export type MarketHub = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  audience: string;
  primaryKeyword: string;
  summary: string;
  angles: string[];
  internalLinks: { label: string; href: string }[];
};

export const marketHubs: MarketHub[] = [
  {
    slug: "veterinaire",
    kicker: "Hub santé animale",
    title: "Vétérinaire",
    description: "Écoles, exercice, groupes de cliniques, débouchés et recrutement vétérinaire.",
    audience: "Étudiants, vétérinaires, groupes de cliniques, RH",
    primaryKeyword: "devenir vétérinaire",
    summary: "Un hub pour relier profession, formation, exercice et recrutement en santé animale.",
    angles: ["écoles vétérinaires", "conditions d'exercice", "groupes de cliniques", "métiers connexes"],
    internalLinks: [
      { label: "Devenir vétérinaire", href: "/blog/devenir-veterinaire-france" },
      { label: "Écoles", href: "/schools" },
      { label: "Animal Health", href: "/animal-health" }
    ]
  },
  {
    slug: "metiers-animaliers",
    kicker: "Hub orientation",
    title: "Métiers animaliers",
    description: "Formations, débouchés et passerelles vers la santé animale et les services vétérinaires.",
    audience: "Lycéens, étudiants, reconversion",
    primaryKeyword: "écoles métiers animaliers",
    summary: "Un hub SEO pour capter les recherches sur les métiers autour des animaux et leurs écoles.",
    angles: ["auxiliaire vétérinaire", "soigneur animalier", "toilettage", "éthologie"],
    internalLinks: [
      { label: "Article métiers animaliers", href: "/blog/ecoles-metiers-animaliers" },
      { label: "Orientation", href: "/orientation" },
      { label: "Écoles", href: "/schools" }
    ]
  },
  {
    slug: "fonds-sante",
    kicker: "Hub financement",
    title: "Fonds santé",
    description: "Fonds biotech, medtech, digital health et entreprises financées à suivre.",
    audience: "CEO, COO, investisseurs, talents",
    primaryKeyword: "fonds santé france",
    summary: "Un hub de référence sur les fonds d'investissement en santé actifs en France.",
    angles: ["France Biotech", "Top fonds", "levées", "signaux hiring"],
    internalLinks: [
      { label: "Annuaire des fonds", href: "/investment-funds" },
      { label: "Article France Biotech", href: "/blog/france-biotech-cartographie-fonds-sante-2024" },
      { label: "Actualités", href: "/news" }
    ]
  },
  {
    slug: "clusters-medtech",
    kicker: "Hub écosystème",
    title: "Clusters MedTech",
    description: "Les pôles, clusters et incubateurs qui comptent dans la medtech et la santé numérique.",
    audience: "Dirigeants, business developers, RH",
    primaryKeyword: "clusters medtech france",
    summary: "Un hub pour cartographier les bassins d'innovation medtech et santé numérique.",
    angles: ["Medicen", "Medicalps", "Paris Santé Campus", "Eurobiomed"],
    internalLinks: [
      { label: "Écosystème", href: "/ecosystem" },
      { label: "Ressources", href: "/resources" },
      { label: "Life Sciences", href: "/life-sciences" }
    ]
  },
  {
    slug: "ecoles-biotech",
    kicker: "Hub académique",
    title: "Écoles Biotech",
    description: "Les écoles et universités à suivre pour les talents biotech, medtech et diagnostic.",
    audience: "Étudiants, RH, campus managers",
    primaryKeyword: "écoles biotechnologies france",
    summary: "Un hub école pour les recherches liées aux viviers de talents biotech.",
    angles: ["SVTSUP", "Paris-Saclay", "Sup'Biotech", "Genopole"],
    internalLinks: [
      { label: "Écoles", href: "/schools" },
      { label: "Orientation biotechnologies", href: "/orientation/biotechnologies" },
      { label: "Job roles", href: "/job-roles" }
    ]
  },
  {
    slug: "salaires-life-sciences",
    kicker: "Hub rémunération",
    title: "Salaires Life Sciences",
    description: "Benchmarks par rôle, secteur, zone et niveau d'expérience.",
    audience: "CEO, DRH, candidats",
    primaryKeyword: "salaire life sciences france",
    summary: "Un hub salaire pour attirer du trafic utile et relier benchmark, package et recrutement.",
    angles: ["France", "EMEA", "Afrique francophone", "package"],
    internalLinks: [
      { label: "Benchmarks salaires", href: "/salary-benchmarks" },
      { label: "Calcul brut/net", href: "/calcul-salaire-brut-net" },
      { label: "Métiers", href: "/job-roles" }
    ]
  },
  {
    slug: "fiches-metiers-penuriques",
    kicker: "Hub métiers",
    title: "Fiches métiers pénuriques",
    description: "Fonctions stratégiques et opérationnelles de la R&D à la commercialisation.",
    audience: "RH, candidats, dirigeants",
    primaryKeyword: "fiche métier biotech",
    summary: "Un hub métier pour capter les recherches sur les fonctions difficiles à recruter.",
    angles: ["application specialist", "maintenance", "export", "DRH", "cyber", "IA"],
    internalLinks: [
      { label: "Bibliothèque métiers", href: "/job-roles" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact#rappel" }
    ]
  },
  {
    slug: "actualites-levees-fonds",
    kicker: "Hub veille",
    title: "Levées de fonds & hiring",
    description: "Levées, fonds santé, entreprises financées et signaux de recrutement.",
    audience: "CEO, COO, talents, investisseurs",
    primaryKeyword: "levée de fonds biotech france",
    summary: "Un hub d'actualités pour relier marché, croissance et recrutement.",
    angles: ["France Biotech", "Bpifrance", "Biotech Finances", "funding to hiring"],
    internalLinks: [
      { label: "Actualités", href: "/news" },
      { label: "Blog", href: "/blog" },
      { label: "Fonds", href: "/investment-funds" }
    ]
  },
  {
    slug: "entreprises-animal-health",
    kicker: "Hub entreprises",
    title: "Entreprises Animal Health",
    description: "Groupements de cliniques, industriels, petfood et équipementiers à suivre.",
    audience: "Professionnels, RH, candidats",
    primaryKeyword: "entreprises santé animale france",
    summary: "Un hub sur les acteurs majeurs de la santé animale et leurs fonctions clés.",
    angles: ["cliniques", "petfood", "équipement", "opérations"],
    internalLinks: [
      { label: "Animal Health", href: "/animal-health" },
      { label: "Références", href: "/references" },
      { label: "Écosystème", href: "/ecosystem" }
    ]
  },
  {
    slug: "diagnostic-medtech",
    kicker: "Hub diagnostic",
    title: "Diagnostic & MedTech",
    description: "Métiers, salaires, écoles, clusters et entreprises du diagnostic et de la medtech.",
    audience: "RH, dirigeants, candidats",
    primaryKeyword: "recrutement diagnostic medtech",
    summary: "Un hub de référence pour les recherches croisées diagnostic, IVD, medtech et support applicatif.",
    angles: ["ingénieur d'application", "field service", "KAM IVD", "LIMS", "cyber medtech"],
    internalLinks: [
      { label: "Life Sciences", href: "/life-sciences/diagnostic" },
      { label: "Job roles", href: "/job-roles" },
      { label: "Salary benchmarks", href: "/salary-benchmarks" }
    ]
  }
];

