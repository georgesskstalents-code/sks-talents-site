export type SectorLandingPageKey = "life" | "animal";

export type SectorLandingMetric = {
  value: string;
  label: string;
  placeholder?: boolean;
};

export type SectorLandingLogo = {
  name: string;
  logoPath: string;
  href?: string;
};

export type SectorLandingPainPoint = {
  number: string;
  title: string;
  description: string;
};

export type SectorLandingVertical = {
  number: string;
  name: string;
  tag: string;
  roles: string[];
  scopes: string;
  href?: string;
};

export type SectorLandingPersona = {
  title: string;
  copy: string;
};

export type SectorLandingCoverage = {
  title: string;
  intro: string;
  angleTitle: string;
  actions: string[];
  marketIntro: string;
  specificityTitle: string;
  specificityBullets: string[];
  specificityClosing: string;
  specificityList?: string[];
};

export type SectorLandingStrategicLink = {
  label: string;
  href: string;
};

export type SectorLandingService = {
  title: string;
  intro: string;
  roles?: string[];
  valueTitle: string;
  values: string[];
  closing?: string;
};

export type SectorLandingServices = {
  title: string;
  intro: string;
  items: SectorLandingService[];
  summaryTitle: string;
  summary: string;
  businessTitle: string;
  businessReadings: string[];
};

export type SectorLandingProcessStep = {
  timing: string;
  title: string;
  description: string;
};

export type SectorLandingFaq = {
  question: string;
  answer: string;
};

export type SectorLandingPage = {
  key: SectorLandingPageKey;
  slug: "/life-sciences" | "/animal-health";
  switchLabel: string;
  heroChip: string;
  targetLine: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  proofMetrics: SectorLandingMetric[];
  microTrust: string[];
  logos: SectorLandingLogo[];
  lossTitle: string;
  lossLead: string;
  painPoints: SectorLandingPainPoint[];
  whatWeDoLede: string;
  verticals: SectorLandingVertical[];
  personas: SectorLandingPersona[];
  coverage: SectorLandingCoverage;
  strategicLinks: SectorLandingStrategicLink[];
  services: SectorLandingServices;
  processSteps: SectorLandingProcessStep[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  differentiationTitle: string;
  differentiationAccent: string;
  differentiationCards: {
    value: string;
    label: string;
    description: string;
    placeholder?: boolean;
  }[];
  faqTitle: string;
  faqs: SectorLandingFaq[];
  finalTitle: {
    top: string;
    accent: string;
    bottom: string;
  };
  finalNote: string;
  metadata: {
    title: string;
    description: string;
    canonical: string;
  };
};

const sharedMetrics: SectorLandingMetric[] = [
  { value: "10 j", label: "1re shortlist qualifiée" },
  { value: "60 j", label: "De l’intake à la signature" },
  { value: "92%", label: "Missions satisfaites" },
  { value: "100+", label: "Placements / mandats" }
];

const sharedProcess: SectorLandingProcessStep[] = [
  {
    timing: "Jour 0",
    title: "Intake — 45 minutes",
    description:
      "Cadrage du rôle, contexte, profil-cible et critères éliminatoires. Pas de brief écrit exigé."
  },
  {
    timing: "1-10",
    title: "Mapping & shortlist",
    description:
      "Cartographie du marché, approche directe, qualification. Vous recevez 4 à 6 profils référencés."
  },
  {
    timing: "10-45",
    title: "Entretiens & closing",
    description:
      "Coordination d’agenda, débriefs structurés, négociation, références approfondies."
  },
  {
    timing: "45-60",
    title: "Onboarding & garantie",
    description:
      "Accompagnement à la prise de poste, suivi des signaux faibles et garantie si besoin."
  }
];

const sharedPersonas: SectorLandingPersona[] = [
  {
    title: "Dirigeants",
    copy:
      "CEO, COO, fondateurs, associés qui veulent mieux prioriser les recrutements et éviter que les sujets RH freinent la croissance."
  },
  {
    title: "RH / CPO / DRH",
    copy:
      "Équipes RH qui veulent structurer le recrutement, fluidifier les process et mieux dialoguer avec le business."
  },
  {
    title: "Candidats",
    copy:
      "Profils qui veulent comprendre les marchés Life Sciences, Animal Health, healthtech et diagnostic, mieux lire les rôles à fort impact et se positionner intelligemment."
  },
  {
    title: "Étudiants / jeunes talents",
    copy:
      "Talents en formation ou en début de carrière qui cherchent des repères concrets sur les métiers, les écoles, les passerelles et les trajectoires crédibles."
  }
];

const sharedServices: SectorLandingServices = {
  title: "3 services cœur",
  intro:
    "SKS TALENTS accompagne les dirigeants et équipes RH sur trois leviers : cabinet exécutif, transformation / structuration et RPO.",
  items: [
    {
      title: "Cabinet exécutif",
      intro: "Pour recruter les rôles critiques qui structurent réellement l’entreprise :",
      roles: ["CEO", "COO", "CPO / DRH", "fonctions de direction", "postes clés à fort impact"],
      valueTitle: "Ce que nous apportons :",
      values: [
        "cadrer le vrai besoin",
        "sécuriser la shortlist",
        "accélérer la décision",
        "protéger la qualité du recrutement"
      ]
    },
    {
      title: "Transformation / structuration",
      intro: "Pour aider les dirigeants et équipes RH à faire grandir l’organisation sans désordre.",
      valueTitle: "Ce que nous apportons :",
      values: [
        "clarifier les rôles",
        "prioriser les recrutements",
        "structurer le process",
        "digitaliser les points de friction",
        "rendre l’organisation plus lisible et plus exécutable"
      ],
      closing: "C’est là que nous ne sommes plus seulement recruteurs. Nous devenons partenaires de structuration."
    },
    {
      title: "RPO",
      intro:
        "Pour les entreprises qui ont un besoin continu de recrutement sans vouloir tout internaliser immédiatement.",
      valueTitle: "Ce que nous apportons :",
      values: [
        "prendre en charge une partie du moteur recrutement",
        "fluidifier l’exécution",
        "professionnaliser le suivi",
        "rendre le pipeline plus lisible",
        "faire gagner du temps aux équipes internes"
      ]
    }
  ],
  summaryTitle: "La formulation simple que je retiendrais",
  summary:
    "SKS TALENTS accompagne les dirigeants et équipes RH sur trois leviers : cabinet exécutif, transformation / structuration et RPO.",
  businessTitle: "Lecture business",
  businessReadings: [
    "Cabinet exécutif = recrutement des rôles critiques",
    "Transformation / structuration = organisation, process, cadrage, digitalisation",
    "RPO = exécution recrutement dans la durée"
  ]
};

export const sectorLandingPages: Record<SectorLandingPageKey, SectorLandingPage> = {
  life: {
    key: "life",
    slug: "/life-sciences",
    switchLabel: "Life Sciences",
    heroChip: "Life Sciences",
    targetLine:
      "Pour les CEO, COO, CPO et DRH — biotech, diagnostic, deeptech, e-santé et robotique",
    titleLineOne: "Recruter, cadrer, structurer.",
    titleLineTwo: "LifeSciences.",
    description:
      "Nous intervenons au cœur des organisations des Life Sciences : rôles critiques clarifiés, décisions sécurisées, digitalisation des processus par l’automatisation, exécution fiabilisée. Chaque mois de retard coûte. Nous éliminons ce qui ralentit. Moins de délais. Moins d’erreurs. Plus d’impact.",
    proofMetrics: sharedMetrics,
    microTrust: ["Confidentiel par défaut", "Réponse sous 24h", "Sans brief écrit"],
    logos: [
      { name: "Faircraft.bio", logoPath: "/images/partners/faircraft-bio.svg", href: "/references/faircraft-bio" },
      {
        name: "Roche Diagnostics",
        logoPath: "/images/partners/roche-diagnostics.svg",
        href: "/references/roche-diagnostics"
      },
      {
        name: "Beckman Coulter",
        logoPath: "/images/partners/beckman-coulter.svg",
        href: "/references/beckman-coulter"
      },
      {
        name: "Miltenyi Biotec",
        logoPath: "/images/partners/miltenyi-biotec.svg",
        href: "/references/miltenyi-biotec"
      },
      { name: "Solabia", logoPath: "/images/partners/solabia.svg", href: "/references/solabia" },
      {
        name: "ELITechGroup",
        logoPath: "/images/partners/elitechgroup.svg",
        href: "/references/elitechgroup"
      }
    ],
    lossTitle: "Coût de l’inaction",
    lossLead:
      "Quand un rôle reste ouvert trop longtemps, ce ne sont pas seulement vos recrutements qui ralentissent. Ce sont vos arbitrages sur des profils comme <strong>CEO</strong>, <strong>COO</strong> ou <strong>R&D Manager</strong> qui deviennent plus fragiles, plus politiques et plus coûteux.",
    painPoints: [
      {
        number: "01",
        title: "Brief trop large",
        description: "Le besoin reste formulé comme un intitulé de poste, alors que le marché lit un niveau d’exposition, de maturité et de rareté."
      },
      {
        number: "02",
        title: "Message marché faible",
        description: "Une opportunité mal racontée réduit l’adhésion des meilleurs candidats bien avant le premier entretien."
      },
      {
        number: "03",
        title: "Shortlist peu décidable",
        description: "Trop de profils différents allongent les boucles de validation et fatiguent les dirigeants comme les managers."
      },
      {
        number: "04",
        title: "Intégration sous-estimée",
        description: "Une signature sans onboarding solide coûte du temps, de la crédibilité et parfois un mandat entier."
      }
    ],
    whatWeDoLede:
      "Nous menons une executive search ciblée sur les quatre verticaux qui définissent les Life Sciences européennes. Un associé dédié par secteur. Une shortlist référencée. Une seule promesse : nous vous présentons des candidats qualifiés, pas des CV.",
    verticals: [
      {
        number: "01",
        name: "Biotech",
        tag: "Thérapeutique · R&D intensive",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "Production / Manufacturing",
          "Commercial / Business / Marketing",
          "Back office / Business support"
        ],
        scopes: "4 scopes",
        href: "/life-sciences/biotech"
      },
      {
        number: "02",
        name: "Diagnostic",
        tag: "IVD · NGS",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "Production / Manufacturing",
          "Commercial / Business / Marketing",
          "Back office / Business support"
        ],
        scopes: "4 scopes",
        href: "/life-sciences/diagnostic"
      },
      {
        number: "03",
        name: "Deeptech",
        tag: "Appliqué Life Sciences",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "Production / Manufacturing",
          "Commercial / Business / Marketing",
          "Back office / Business support"
        ],
        scopes: "4 scopes",
        href: "/life-sciences/biotech/deeptech-startups"
      },
      {
        number: "04",
        name: "E-santé & Robotique",
        tag: "E-santé · Robotique",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "R&D Manager",
          "Production",
          "Sales",
          "Marketing",
          "Support functions"
        ],
        scopes: "4 scopes",
        href: "/cabinet-recrutement-e-sante-france"
      }
    ],
    personas: sharedPersonas,
    coverage: {
      title: "Ce que nous faisons en Life Sciences",
      intro: "Notre angle n’est pas seulement de recruter.",
      angleTitle: "Pas seulement un cabinet de recrutement — un partenaire de structuration.",
      actions: [
        "mieux cadrer les rôles",
        "prioriser les hires critiques",
        "structurer les recrutements",
        "sécuriser l’exécution",
        "faire grandir l’organisation sans désordre"
      ],
      marketIntro: "Notre couverture Life Sciences s’organise autour de 4 marchés focus.",
      specificityTitle: "La spécificité de notre approche en Life Sciences",
      specificityBullets: [
        "la science",
        "l’industrialisation",
        "les cycles de croissance",
        "les rôles hybrides",
        "les environnements exigeants post-levée ou en structuration"
      ],
      specificityClosing:
        "Autrement dit, nous ne faisons pas du recrutement générique. Nous faisons du recrutement + cadrage + structuration sur des environnements complexes."
    },
    strategicLinks: [
      { label: "Biotech", href: "/life-sciences/biotech" },
      { label: "Diagnostic IVD / NGS", href: "/life-sciences/diagnostic" },
      { label: "Cabinet exécutif", href: "/executive-search-life-sciences" },
      { label: "RPO Life Sciences", href: "/rpo-recrutement-life-sciences" },
      { label: "Lexique Life Sciences & RH", href: "/lexique-life-sciences-rh" },
      {
        label: "Guide dirigeants",
        href: "/guides/guide-dirigeants-recruter-structurer-scaler-life-sciences"
      }
    ],
    services: sharedServices,
    processSteps: sharedProcess,
    testimonial: {
      quote:
        "Georges m'a accompagné pendant plusieurs années sur des recrutements sensibles en EMEA. Rigueur dans le cadrage, finesse dans la lecture des profils, tenue du calendrier : un partenaire rare sur un marché où la confidentialité compte autant que la vitesse.",
      name: "Baldo",
      role: "Genomics — EMEA Commercial Director"
    },
    differentiationTitle: "Une lecture",
    differentiationAccent: "sectorielle",
    differentiationCards: [
      {
        value: "1",
        label: "Un seul secteur",
        description: "Nous ne mélangeons pas biotech, diagnostic, deeptech et e-santé / robotique avec un sourcing généraliste."
      },
      {
        value: "60j",
        label: "Processus executive-grade",
        description: "Le process reste resserré, piloté et lisible pour protéger la décision jusqu’au closing."
      },
      {
        value: "92%",
        label: "Missions satisfaites",
        description: "Le niveau d’exigence reste maintenu jusqu’au closing et à la prise de poste."
      }
    ],
    faqTitle: "FAQ — Recrutement Life Sciences & E-santé / Robotique",
    faqs: [
      {
        question: "Comment recruter efficacement dans les Life Sciences aujourd’hui ?",
        answer:
          "Le recrutement dans les Life Sciences est particulièrement compétitif en raison de la rareté des profils expérimentés et de la forte croissance du secteur.\n\nLes entreprises performantes adoptent une approche proactive basée sur la chasse de talents, car les meilleurs profils ne sont pas en recherche active.\n\n👉 Le recrutement devient un levier stratégique de croissance."
      },
      {
        question: "Quels sont les postes clés à structurer en priorité ?",
        answer:
          "Nous intervenons exclusivement sur les fonctions à fort impact :\n\n- Direction des opérations (COO)\n- Direction des ressources humaines (DRH / Head of People)\n- Direction commerciale / Business Development\n\n👉 Ces rôles permettent d’aligner stratégie et exécution."
      },
      {
        question: "Pourquoi les meilleurs candidats ne postulent-ils pas ?",
        answer:
          "Les profils les plus performants sont déjà en poste et recherchent avant tout des projets à fort impact.\n\n👉 Une approche par chasse directe est indispensable."
      },
      {
        question: "Comment recruter efficacement dans l’e-santé et la robotique ?",
        answer:
          "Les secteurs de l’e-santé et de la robotique combinent innovation technologique, enjeux réglementaires et forte croissance.\n\nLes profils recherchés sont rares car ils doivent évoluer à l’intersection de la santé, du business et de l’innovation.\n\nLes entreprises les plus performantes adoptent une approche proactive basée sur la chasse de talents et une proposition de valeur claire.\n\n👉 Le recrutement devient un levier stratégique pour transformer l’innovation en croissance."
      },
      {
        question: "Pourquoi ces profils sont-ils plus difficiles à attirer ?",
        answer:
          "Parce qu’ils doivent réunir en même temps une lecture produit, une compréhension du cadre santé, une capacité d’exécution business et un niveau de maturité suffisant pour suivre une croissance rapide.\n\n👉 Sans proposition de valeur claire, ils n’entrent même pas dans le process."
      },
      {
        question: "Comment transformer l’innovation en croissance grâce au recrutement ?",
        answer:
        "En structurant d’abord les rôles qui relient la vision à l’exécution : opérations, people et développement commercial.\n\n👉 Vous recrutez en Life Sciences ? Parlons-en."
      }
    ],
    finalTitle: {
      top: "Je veux une shortlist",
      accent: "lisible, crédible",
      bottom: "et utile pour décider"
    },
    finalNote: "Réponse sous 24h · Échange de cadrage 15 min · Même URL de booking sur toute la page",
    metadata: {
      title:
        "Recrutement Life Sciences | Cabinet exécutif Biotech, Diagnostic, Deeptech, E-santé",
      description:
        "Cabinet exécutif Life Sciences : biotech, diagnostic IVD/NGS, deeptech, e-santé et robotique. Recrutement, structuration, RPO et rôles CODIR.",
      canonical: "https://www.skstalents.fr/life-sciences"
    }
  },
  animal: {
    key: "animal",
    slug: "/animal-health",
    switchLabel: "Animal Health",
    heroChip: "Animal Health",
    targetLine:
      "Pour les CEO, COO, CPO et DRH — diagnostic animal health, cliniques vétérinaires et petfood premium",
    titleLineOne: "Recruter, cadrer, structurer.",
    titleLineTwo: "AnimalHealth.",
    description:
      "Nous intervenons au cœur des organisations de la Santé Animale : rôles critiques clarifiés, décisions sécurisées, digitalisation des processus par l’automatisation, exécution fiabilisée. Chaque mois de retard coûte. Nous éliminons ce qui ralentit. Moins de délais. Moins d’erreurs. Plus d’impact.",
    proofMetrics: sharedMetrics,
    microTrust: ["Confidentiel par défaut", "Réponse sous 24h", "Sans brief écrit"],
    logos: [
      {
        name: "Affinity Petcare",
        logoPath: "/images/partners/affinity-petcare.png",
        href: "/references/affinity-petcare"
      },
      {
        name: "Saga Nutrition",
        logoPath: "/images/partners/saga-nutrition-logo.svg",
        href: "/references/saga-nutrition"
      },
      { name: "Qovetia", logoPath: "/images/partners/qovetia.svg", href: "/references/qovetia" },
      {
        name: "Wolf Learning",
        logoPath: "/images/partners/wolf-learning.svg",
        href: "/references/wolf-learning"
      },
      {
        name: "Connex Sante",
        logoPath: "/images/partners/connex-sante-wordmark.svg",
        href: "/references/conexsante"
      },
      {
        name: "France Biotech",
        logoPath: "/images/partners/france-biotech.svg",
        href: "/ecosystem"
      }
    ],
    lossTitle: "Coût de l’inaction",
    lossLead:
      "Quand un rôle reste ouvert trop longtemps, ce ne sont pas seulement vos recrutements qui ralentissent. Ce sont vos arbitrages sur des profils comme <strong>CEO</strong>, <strong>COO</strong> ou <strong>R&D Manager</strong> qui deviennent plus fragiles, plus politiques et plus coûteux.",
    painPoints: [
      {
        number: "01",
        title: "Brief trop large",
        description:
          "Le besoin reste formulé comme un intitulé de poste, alors que le marché lit un niveau d’exposition, de maturité et de rareté."
      },
      {
        number: "02",
        title: "Message marché faible",
        description:
          "Une opportunité mal racontée réduit l’adhésion des meilleurs candidats bien avant le premier entretien."
      },
      {
        number: "03",
        title: "Shortlist peu décidable",
        description:
          "Trop de profils différents allongent les boucles de validation et fatiguent les dirigeants comme les managers."
      },
      {
        number: "04",
        title: "Intégration sous-estimée",
        description:
          "Une signature sans onboarding solide coûte du temps, de la crédibilité et parfois un mandat entier."
      }
    ],
    whatWeDoLede:
      "Nous accompagnons la santé animale sur trois verticales déjà présentes sur le site : Diagnostic Animal Health, Groupes de cliniques vétérinaires et Petfood. Un cadrage lisible. Une exécution serrée. Une seule promesse : nous faisons gagner du temps aux équipes sur des recrutements qui ne pardonnent pas l’approximation.",
    verticals: [
      {
        number: "01",
        name: "Diagnostic Animal Health",
        tag: "IVD vétérinaire · Biologie",
        roles: ["HR / CODIR roles (CEO, COO, CPO)", "Manufacturing", "Scale-up"],
        scopes: "3 scopes",
        href: "/animal-health/veterinary/diagnostic-vet"
      },
      {
        number: "02",
        name: "Groupes de cliniques vétérinaires",
        tag: "Multi-sites · Consolidation",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "Operations",
          "Telemedecine",
          "Coordinateurs régionaux",
          "Marketing"
        ],
        scopes: "5 scopes",
        href: "/animal-health/veterinary/cliniques"
      },
      {
        number: "03",
        name: "Petfood",
        tag: "Nutrition · Industrialisation",
        roles: [
          "HR / CODIR roles (CEO, COO, CPO)",
          "Innovation",
          "Industrialisation",
          "Commercial growth"
        ],
        scopes: "4 scopes",
        href: "/animal-health/petfood"
      }
    ],
    personas: sharedPersonas,
    coverage: {
      title: "Ce que nous faisons en Animal Health",
      intro: "Là aussi, notre rôle n’est pas seulement de trouver des profils.",
      angleTitle: "Pas seulement trouver des profils — soutenir la croissance sans casser le terrain.",
      actions: [
        "recruter sur des marchés pénuriques",
        "structurer leurs équipes",
        "professionnaliser les process",
        "soutenir la croissance sans casser l’exécution terrain",
        "fidéliser les talents critiques sur des marchés tendus"
      ],
      marketIntro: "Notre couverture Animal Health s’organise autour de 3 marchés focus.",
      specificityTitle: "La spécificité de notre approche en Animal Health",
      specificityBullets: [
        "qualité d’exécution",
        "tension sur les talents",
        "croissance multi-sites",
        "structuration RH",
        "business terrain",
        "fidélisation"
      ],
      specificityClosing:
        "Notre différence en Animal Health, c’est que nous ne parlons pas seulement de vétérinaires.",
      specificityList: [
        "la structuration des groupes",
        "les fonctions de croissance",
        "les rôles support critiques",
        "les marchés petcare / petfood / diagnostic animal"
      ]
    },
    strategicLinks: [
      { label: "Diagnostic vétérinaire", href: "/animal-health/veterinary/diagnostic-vet" },
      { label: "Cliniques vétérinaires", href: "/animal-health/veterinary/cliniques" },
      { label: "Petfood", href: "/animal-health/petfood" },
      { label: "Cabinet santé animale", href: "/cabinet-recrutement-sante-animale-paris" },
      { label: "Références", href: "/references" },
      {
        label: "Guide structuration RH",
        href: "/guides/100-concepts-cles-structuration-rh-life-sciences-animal-health"
      }
    ],
    services: sharedServices,
    processSteps: sharedProcess,
    testimonial: {
      quote:
        "Georges m'a accompagné pendant plusieurs années sur des recrutements sensibles en EMEA. Rigueur dans le cadrage, finesse dans la lecture des profils, tenue du calendrier : un partenaire rare sur un marché où la confidentialité compte autant que la vitesse.",
      name: "Baldo",
      role: "Genomics — EMEA Commercial Director"
    },
    differentiationTitle: "Une lecture",
    differentiationAccent: "terrain",
    differentiationCards: [
      {
        value: "1",
        label: "Un seul secteur",
        description: "Santé animale, care et petfood ne sont pas des sous-catégories génériques du recrutement santé."
      },
      {
        value: "60j",
        label: "Processus executive-grade",
        description: "Le process reste piloté pour ne pas laisser les urgences terrain absorber toute la qualité de décision."
      },
      {
        value: "92%",
        label: "Missions satisfaites",
        description: "Le pilotage reste propre même quand le marché est localement très tendu."
      }
    ],
    faqTitle: "FAQ — Recrutement Santé Animale",
    faqs: [
      {
        question: "Comment recruter efficacement dans le secteur de la santé animale ?",
        answer:
          "Le secteur de la santé animale est en forte croissance, notamment avec l’augmentation des enjeux liés au bien-être animal, à la sécurité alimentaire et à l’innovation vétérinaire.\n\nCependant, les profils expérimentés sont rares et très sollicités. Les entreprises doivent adopter une approche proactive basée sur la chasse de talents plutôt que sur la simple diffusion d’offres.\n\n👉 Les entreprises les plus performantes combinent une stratégie de sourcing ciblée avec une proposition de valeur claire et différenciante."
      },
      {
        question: "Quels sont les postes clés à structurer en priorité ?",
        answer:
          "Dans la santé animale, les fonctions prioritaires sont celles qui permettent de structurer la croissance et d’optimiser les opérations.\n\nChez SKS Talents, nous intervenons exclusivement sur :\n\n- Direction des opérations (COO)\n- Direction des ressources humaines (DRH / Head of People)\n- Direction commerciale / Business Development\n\n👉 Ces rôles sont essentiels pour transformer une innovation en performance durable."
      },
      {
        question: "Pourquoi les meilleurs candidats en santé animale ne postulent-ils pas ?",
        answer:
          "Les talents les plus performants sont déjà en poste et ne répondent généralement pas aux annonces classiques.\n\nIls privilégient :\n- des projets à fort impact\n- des entreprises en croissance\n- une vision stratégique claire\n\n👉 Une approche directe et personnalisée est indispensable pour les engager."
      },
      {
        question: "Pourquoi est-il difficile d’attirer des profils seniors en santé animale ?",
        answer:
          "Les profils expérimentés dans ce secteur recherchent aujourd’hui plus qu’un poste : ils veulent un projet.\n\nIls sont sensibles à :\n- l’impact de leur travail\n- la vision de l’entreprise\n- la qualité du management\n\n👉 Les entreprises doivent donc construire un discours de recrutement orienté valeur et ambition."
      },
      {
        question: "Comment recruter rapidement sans compromettre la qualité ?",
        answer:
          "Recruter rapidement dans la santé animale nécessite une approche structurée :\n\n- définition précise du besoin\n- ciblage des profils pertinents\n- processus de sélection efficace\n\n👉 Les entreprises les plus performantes privilégient la qualité du recrutement plutôt que la vitesse à court terme."
      },
      {
        question: "Pourquoi faire appel à un cabinet spécialisé en santé animale ?",
        answer:
          "Un cabinet spécialisé permet d’accéder à un réseau de talents qualifiés et souvent invisibles sur le marché.\n\nIl apporte également :\n- une compréhension du secteur\n- un gain de temps\n- une sécurisation des recrutements\n\n👉 Dans un marché compétitif, c’est un levier stratégique pour attirer les meilleurs profils."
      },
      {
        question: "Comment structurer ses recrutements en phase de croissance ?",
        answer:
          "En phase de développement, les entreprises doivent structurer leurs recrutements pour accompagner leur croissance.\n\nCela implique :\n- prioriser les fonctions clés\n- aligner recrutement et stratégie\n- automatiser les processus RH\n\n👉 Le recrutement devient un levier direct de performance et de structuration."
      }
    ],
    finalTitle: {
      top: "Je veux une shortlist",
      accent: "lisible, crédible",
      bottom: "et utile pour décider"
    },
    finalNote: "Réponse sous 24h · Échange de cadrage 15 min · Même URL de booking sur toute la page",
    metadata: {
      title:
        "Recrutement Animal Health | Diagnostic vétérinaire, Cliniques, Petfood",
      description:
        "Cabinet exécutif Animal Health : diagnostic vétérinaire, groupes de cliniques et petfood. Recrutement, structuration, CODIR, opérations et croissance.",
      canonical: "https://www.skstalents.fr/animal-health"
    }
  }
};

export function getSectorLandingPage(key: SectorLandingPageKey) {
  return sectorLandingPages[key];
}
