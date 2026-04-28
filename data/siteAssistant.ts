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
    keywords: [
      "salaire",
      "salaires",
      "remuneration",
      "package",
      "brut",
      "net",
      "benchmark",
      "glassdoor",
      "aon",
      "salary",
      "salaries",
      "compensation",
      "pay",
      "gross",
      "bonus"
    ],
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
    keywords: [
      "orientation",
      "ecole",
      "ecoles",
      "formation",
      "parcours",
      "etudiant",
      "lycee",
      "lycéen",
      "lycéen afrique",
      "senegal",
      "cote d'ivoire",
      "benin",
      "maroc",
      "congo",
      "school",
      "schools",
      "student",
      "career path",
      "training",
      "degree",
      "study"
    ],
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
    keywords: [
      "fonds",
      "investisseur",
      "financement",
      "levee",
      "levée",
      "vc",
      "venture",
      "healthtech",
      "fund",
      "funds",
      "investor",
      "investors",
      "funding",
      "series a",
      "series b",
      "bpifrance",
      "bpi",
      "france biotech",
      "panorama france healthtech",
      "fonds santé",
      "fonds sante",
      "innobio",
      "angels santé",
      "angels sante",
      "seventure",
      "seventure partners",
      "kurma partners",
      "jeito capital",
      "eic fund",
      "european innovation council fund",
      "sofinnova",
      "sofinnova partners",
      "eurazeo",
      "eurazeo healthcare",
      "truffle",
      "truffle capital",
      "mérieux",
      "merieux",
      "mérieux equity partners",
      "merieux equity partners",
      "cathay",
      "cathay capital",
      "extens",
      "digital health 2"
    ],
    answer:
      "Sur les fonds santé, Bpifrance, France Biotech et les entreprises financées, je peux vous rediriger vers nos pages source-first : annuaire de fonds, lectures dédiées Bpifrance et France Biotech, puis nos articles de veille sourcés.",
    internalLinks: [
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Point d’entrée SEO et LLM sur les fonds santé, biotech, healthtech et Animal Health."
      },
      {
        label: "Bpifrance biotech medtech",
        href: "/bpifrance-biotech-medtech",
        description: "Lecture des véhicules Bpifrance et des implications recrutement."
      },
      {
        label: "France Biotech Panorama",
        href: "/france-biotech-panorama-healthtech",
        description: "Lecture business des publications France Biotech."
      },
      {
        label: "Angels Santé",
        href: "/angels-sante-business-angels-sante",
        description: "Lecture early-stage santé et business angels."
      },
      {
        label: "Seventure Partners",
        href: "/seventure-partners-life-sciences",
        description: "Lecture VC Life Sciences, thèses et segments financés."
      },
      {
        label: "Kurma Partners",
        href: "/kurma-partners-biotech-healthtech",
        description: "Page dédiée pour relier Kurma au paysage santé français."
      },
      {
        label: "Jeito Capital",
        href: "/jeito-capital-biotech-healthtech",
        description: "Page dédiée sur Jeito et la lecture growth biotech / healthtech."
      },
      {
        label: "EIC Fund",
        href: "/eic-fund-deeptech-biotech",
        description: "Lecture deeptech / biotech Europe et scale-up."
      },
      {
        label: "Sofinnova Partners",
        href: "/sofinnova-partners-life-sciences",
        description: "Lecture Life Sciences, scale-up et leadership."
      },
      {
        label: "Eurazeo Healthcare",
        href: "/eurazeo-healthcare-growth",
        description: "Lecture growth santé et exigences d’exécution."
      },
      {
        label: "Truffle Capital",
        href: "/truffle-capital-biotech-medtech",
        description: "Lecture biotech / medtech et signaux de structuration."
      },
      {
        label: "Mérieux Equity Partners",
        href: "/merieux-equity-partners-sante",
        description: "Lecture fonds santé et crédibilité marché."
      },
      {
        label: "Cathay Capital Healthcare",
        href: "/cathay-capital-healthcare",
        description: "Lecture healthcare, growth et organisation."
      },
      {
        label: "Extens",
        href: "/extens-digital-health-france",
        description: "Lecture digital health, fonds santé numérique et recrutement."
      },
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
      },
      {
        label: "Bpifrance",
        href: "https://www.bpifrance.fr/",
        description: "Source de référence pour les véhicules biotech, medtech et les dispositifs publics."
      }
    ]
  },
  {
    id: "veterinary",
    title: "Vétérinaire et santé animale",
    keywords: [
      "veterinaire",
      "vétérinaire",
      "animal",
      "animaux",
      "clinique",
      "vet",
      "petfood",
      "veterinary",
      "animal health",
      "clinic",
      "clinics",
      "pets"
    ],
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
      "field application",
      "job",
      "jobs",
      "role",
      "roles",
      "job description",
      "headhunter",
      "hiring"
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
    keywords: [
      "service",
      "recrutement",
      "rdv",
      "rappel",
      "executive search",
      "rh",
      "audit",
      "website",
      "services",
      "recruitment",
      "hr",
      "call",
      "book a call",
      "contact"
    ],
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
  },
  {
    id: "rpo-structuration-automation",
    title: "RPO, structuration RH et automatisation",
    keywords: [
      "rpo",
      "recruitment process outsourcing",
      "externalisation recrutement",
      "externalisation processus recrutement",
      "structuration rh",
      "structuration people",
      "people ops",
      "automatisation rh",
      "automatisation processus rh",
      "people ops automation",
      "scale-up",
      "hypercroissance",
      "levée de fonds",
      "série a",
      "série b",
      "startup financée",
      "growth hiring",
      "automatisation recrutement",
      "automatisation rh",
      "people ops",
      "process rh",
      "roi rh",
      "time to hire",
      "rétention talents",
      "onboarding",
      "ceo rh",
      "coo rh",
      "comment automatiser les rh",
      "comment gagner du temps en rh",
      "comment structurer une équipe en croissance",
      "comment réduire le coût du recrutement",
      "comment améliorer la rétention des talents",
      "comment aligner rh et stratégie business",
      "comment scaler sans alourdir les équipes",
      "quelles tâches rh automatiser",
      "quels outils pour automatiser les rh",
      "diagnostic recrutement",
      "diagnostic croissance",
      "recrutement frein croissance",
      "score rh",
      "lexique rh",
      "lexique life sciences",
      "performance organisationnelle",
      "guide structuration rh"
    ],
    answer:
      "Si votre sujet concerne un volume de recrutement, une phase de croissance, une structuration RH ou l’automatisation des process, le plus utile est de partir de nos pages dédiées RPO, scale-up, structuration et automatisation. Vous y trouverez des réponses directes sur le time-to-hire, le ROI, les process à poser en premier et les tâches RH à automatiser sans perdre la dimension humaine. L’angle SKS est clair : le vrai problème n’est pas le manque d’outils, mais le manque de structuration, surtout dans un marché jeune, international et déjà très sous pression côté performance.",
    internalLinks: [
      {
        label: "Diagnostic recrutement & croissance",
        href: "/diagnostic",
        description: "5 questions pour savoir si le vrai frein vient du sourcing, de la structuration ou des process."
      },
      {
        label: "RPO recrutement Life Sciences",
        href: "/rpo-recrutement-life-sciences",
        description: "Externaliser une capacité de recrutement sans perdre l’exigence sectorielle."
      },
      {
        label: "Structuration RH startup santé",
        href: "/structuration-rh-startup-sante",
        description: "Poser un socle People et recrutement avant que la croissance ne se dérègle."
      },
      {
        label: "Lexique Life Sciences & RH",
        href: "/lexique-life-sciences-rh",
        description: "100 concepts, FAQ, checklist et livres blancs pour relier RH, automatisation et croissance."
      },
      {
        label: "Automatisation processus RH santé",
        href: "/automatisation-processus-rh-sante",
        description: "Automatiser les étapes répétitives sans dégrader l’expérience candidat."
      }
    ]
  }
];
