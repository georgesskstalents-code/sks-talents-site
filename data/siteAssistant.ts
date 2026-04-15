export type AssistantLink = {
  label: string;
  href: string;
  description: string;
};

export type AssistantTopic = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  internalLinks: AssistantLink[];
  externalLinks?: AssistantLink[];
};

export const trustedExternalLinks: AssistantLink[] = [
  {
    label: "France Biotech",
    href: "https://france-biotech.fr/",
    description: "Pour les fonds santé, la healthtech et la veille marché."
  },
  {
    label: "Bpifrance",
    href: "https://www.bpifrance.fr/",
    description: "Pour l'investissement, la croissance et les dispositifs publics."
  },
  {
    label: "Ordre national des vétérinaires",
    href: "https://www.veterinaire.fr/",
    description: "Pour les règles d'exercice, les écoles et les ressources officielles vétérinaires."
  },
  {
    label: "Université Paris-Saclay",
    href: "https://www.universite-paris-saclay.fr/",
    description: "Pour les parcours académiques sciences du vivant et innovation santé."
  }
];

export const assistantTopics: AssistantTopic[] = [
  {
    id: "salary",
    title: "Benchmarks salaires",
    keywords: ["salaire", "salaires", "remuneration", "package", "brut", "net", "benchmark", "glassdoor", "aon"],
    answer:
      "Pour les salaires, je peux surtout vous orienter vers nos benchmarks, notre simulateur brut/net et nos fiches métiers liées.",
    internalLinks: [
      {
        label: "Benchmarks salaires",
        href: "/salary-benchmarks",
        description: "Pages salaires par rôle, secteur et géographie."
      },
      {
        label: "Calcul salaire brut/net",
        href: "/calcul-salaire-brut-net",
        description: "Simulateur salaire, package et coût employeur."
      },
      {
        label: "Bibliothèque métiers",
        href: "/job-roles",
        description: "Fiches de poste liées aux niveaux de rémunération."
      }
    ]
  },
  {
    id: "orientation",
    title: "Orientation et écoles",
    keywords: ["orientation", "ecole", "ecoles", "formation", "parcours", "etudiant", "lycee", "lycéen", "lycéen afrique", "senegal", "cote d'ivoire", "benin", "maroc", "congo"],
    answer:
      "Si vous cherchez à vous orienter, le meilleur point d'entrée est notre parcours orientation, puis nos pages écoles pour relier formations, métiers et débouchés.",
    internalLinks: [
      {
        label: "Parcours orientation",
        href: "/orientation",
        description: "Pré-test d'orientation pour étudiants et jeunes diplômés."
      },
      {
        label: "Écoles spécialisées",
        href: "/schools",
        description: "Écoles biotech, medtech, cosmétique et santé animale."
      },
      {
        label: "Orientation biotechnologies",
        href: "/orientation/biotechnologies",
        description: "Focus lycéens, étudiants et débouchés biotech."
      }
    ]
  },
  {
    id: "funds",
    title: "Fonds santé",
    keywords: ["fonds", "investisseur", "financement", "levee", "levée", "vc", "venture", "healthtech"],
    answer:
      "Sur les fonds santé et les entreprises financées, je peux vous rediriger vers notre annuaire de fonds et nos articles de veille sourcés.",
    internalLinks: [
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Fonds santé, liens officiels et profils vérifiés."
      },
      {
        label: "Actualités marché",
        href: "/news",
        description: "Veille levées, nominations et signaux marché."
      },
      {
        label: "Article France Biotech 2024",
        href: "/blog/france-biotech-cartographie-fonds-sante-2024",
        description: "Synthèse éditoriale à partir de la cartographie France Biotech."
      }
    ],
    externalLinks: [
      {
        label: "France Biotech",
        href: "https://france-biotech.fr/",
        description: "Source de confiance pour la healthtech et les fonds santé."
      }
    ]
  },
  {
    id: "veterinary",
    title: "Vétérinaire et santé animale",
    keywords: ["veterinaire", "vétérinaire", "animal", "animaux", "clinique", "vet", "petfood"],
    answer:
      "Pour la santé animale, vous trouverez chez nous des pages métiers, écoles, orientation et ressources officielles liées à la profession vétérinaire.",
    internalLinks: [
      {
        label: "Hub Animal Health",
        href: "/animal-health",
        description: "Entrée marché santé animale, veterinary et petfood."
      },
      {
        label: "Écoles vétérinaires",
        href: "/schools",
        description: "Les 5 établissements formant des vétérinaires en France."
      },
      {
        label: "Devenir vétérinaire",
        href: "/blog/devenir-veterinaire-france",
        description: "Article repère sur le parcours et les écoles."
      }
    ],
    externalLinks: [
      {
        label: "Ordre national des vétérinaires",
        href: "https://www.veterinaire.fr/",
        description: "Source officielle profession, exercice et écoles."
      }
    ]
  },
  {
    id: "jobs",
    title: "Fiches métiers et rôles pénuriques",
    keywords: [
      "fiche de poste",
      "metier",
      "job description",
      "kam",
      "key account manager",
      "sales operations",
      "medical director",
      "qa manager",
      "msat",
      "tech transfer",
      "lims",
      "area sales",
      "clinic operations",
      "finance manager",
      "cybersecurity",
      "field application"
    ],
    answer:
      "Pour les rôles pénuriques et les fonctions business, médicales, qualité, industrialisation ou digital santé, le plus utile est de partir de notre bibliothèque métiers puis de relier cela aux salaires et au contexte marché.",
    internalLinks: [
      {
        label: "Bibliothèque métiers",
        href: "/job-roles",
        description: "Fiches métiers, missions, études, écoles, salaires et industries connexes."
      },
      {
        label: "Benchmarks salaires",
        href: "/salary-benchmarks",
        description: "Repères salariaux France, EMEA et fonctions à forte tension."
      },
      {
        label: "Références",
        href: "/references",
        description: "Entreprises, environnements et exemples de recrutements menés."
      }
    ]
  },
  {
    id: "services",
    title: "Services SKS TALENTS",
    keywords: ["service", "recrutement", "rdv", "rappel", "executive search", "rh", "audit", "website"],
    answer:
      "Si votre besoin concerne le recrutement, la structuration RH ou une prise de rendez-vous, le plus utile est de partir de nos pages services et contact.",
    internalLinks: [
      {
        label: "Nos services",
        href: "/services",
        description: "Executive search, structuration RH et accompagnement."
      },
      {
        label: "Service Website",
        href: "/services/website",
        description: "Landing orientée conversion et preuve sociale."
      },
      {
        label: "Contact",
        href: "/contact#rappel",
        description: "Être rappelé ou prendre rendez-vous."
      }
    ]
  }
];
