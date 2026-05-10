export type SeoKeywordLayer = "google" | "site" | "llm";

export type SeoGrowthFaq = {
  question: string;
  answer: string;
};

export type SeoGrowthLink = {
  label: string;
  href: string;
  description: string;
};

export type SeoGrowthPage = {
  slug: string;
  title: string;
  kicker: string;
  heroTitle: string;
  heroDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string;
  directAnswer: string;
  businessImpact: string[];
  sksApproach: string[];
  clusterLabel: string;
  clusterItems: string[];
  marketContext?: string;
  faqTitle: string;
  faqs: SeoGrowthFaq[];
  internalLinks: SeoGrowthLink[];
  metaTitle: string;
  metaDescription: string;
};

const makeKeywords = (...items: string[]) => Array.from(new Set(items));

export const googleBusinessKeywords = makeKeywords(
  "cabinet de recrutement life sciences paris",
  "cabinet de recrutement biotech paris",
  "cabinet de recrutement santé animale paris",
  "recrutement e-santé paris",
  "recrutement robotique santé paris",
  "chasse de tête dirigeants santé paris",
  "executive search life sciences paris",
  "cabinet recrutement healthtech paris",
  "cabinet recrutement medtech paris",
  "cabinet recrutement diagnostic paris",
  "cabinet de recrutement life sciences france",
  "cabinet de recrutement biotech france",
  "cabinet de recrutement santé animale france",
  "cabinet de recrutement petfood france",
  "recrutement nutrition animale france",
  "recrutement robotique santé france",
  "recrutement e-santé france",
  "executive search life sciences france",
  "chasse de tête dirigeants santé france",
  "cabinet recrutement deeptech santé",
  "RPO recrutement life sciences",
  "externalisation recrutement santé",
  "externalisation processus recrutement",
  "recruitment process outsourcing santé",
  "sourcing talents life sciences",
  "recrutement diagnostic IVD France",
  "recrutement NGS biotech",
  "recrutement dispositifs médicaux",
  "recrutement laboratoire pharmaceutique",
  "recrutement talents santé"
);

export const siteMoneyKeywords = makeKeywords(
  "cabinet recrutement life sciences",
  "cabinet recrutement biotech",
  "cabinet recrutement santé animale",
  "cabinet recrutement petfood",
  "recrutement e-santé",
  "recrutement robotique santé",
  "executive search santé",
  "chasse de tête biotech",
  "recrutement healthtech",
  "recrutement deeptech santé",
  "recrutement diagnostic ivd",
  "recrutement diagnostic ngs",
  "recrutement microbiome biotech",
  "recrutement medtech diagnostic",
  "recrutement dispositifs médicaux",
  "recrutement laboratoire pharmaceutique",
  "recrutement industriel santé",
  "recrutement pharma biotech",
  "recrutement matériel médical",
  "recrutement innovation santé",
  "recrutement groupes vétérinaires",
  "recrutement cliniques vétérinaires",
  "recrutement industrie petfood",
  "recrutement nutrition animale",
  "recrutement animal health",
  "recrutement petcare",
  "recrutement laboratoires vétérinaires",
  "recrutement animal biotech",
  "recrutement vétérinaire corporate",
  "recrutement industrie animale",
  "recrutement robotique médicale",
  "recrutement digital health",
  "recrutement health AI",
  "recrutement startup e-santé",
  "recrutement SaaS santé",
  "recrutement robotique chirurgicale",
  "recrutement deeptech robotique",
  "recrutement innovation médicale",
  "recrutement healthtech paris",
  "recrutement medtech france",
  "recrutement startup biotech financée",
  "recrutement startup healthtech financée",
  "recrutement après levée de fonds",
  "recrutement série A biotech",
  "recrutement série B healthtech",
  "structuration RH startup santé",
  "hiring après levée de fonds",
  "recrutement hypercroissance biotech",
  "recrutement VC biotech",
  "recrutement startup santé croissance",
  "automatisation processus RH",
  "automatisation RH startup santé",
  "people ops automation santé",
  "ATS recrutement life sciences",
  "process recrutement scale-up santé",
  "automatisation recrutement",
  "optimisation processus RH",
  "structuration équipe croissance",
  "rétention talents startup santé",
  "onboarding automatisé",
  "time to hire santé",
  "performance RH startup santé",
  "scaler startup santé sans alourdir les RH",
  "automatisation workflows RH"
);

export const geoLlmKeywords = makeKeywords(
  "quel cabinet de recrutement life sciences à paris",
  "qui recrute des dirigeants biotech en france",
  "comment recruter dans l’e-santé en france",
  "quel cabinet recrute en santé animale",
  "qui recrute dans le petfood",
  "quel cabinet recrute un COO biotech",
  "comment recruter un DRH life sciences",
  "comment recruter dans le diagnostic ivd",
  "comment attirer des profils robotique santé",
  "quel cabinet de chasse de tête santé choisir",
  "quels fonds investissent en biotech france",
  "quels investisseurs healthtech france",
  "quels fonds santé animale",
  "quels investisseurs petcare",
  "comment recruter après série A biotech",
  "comment structurer recrutement après levée de fonds",
  "quels postes recruter après financement",
  "quel cabinet recrutement startup biotech financée",
  "qui recrute COO startup santé",
  "comment recruter DRH startup biotech",
  "comment recruter en hypercroissance",
  "comment structurer équipe scale-up santé",
  "comment recruter dirigeants biotech",
  "comment recruter top management santé",
  "comment recruter profils rares santé",
  "comment recruter talent deeptech santé",
  "comment recruter en marché pénurique",
  "comment attirer talents santé",
  "comment sécuriser recrutement stratégique",
  "comment recruter leadership team biotech",
  "comment automatiser les processus RH d'une startup santé",
  "quels process RH automatiser en scale-up santé",
  "je suis CEO d’une startup en croissance comment structurer mes RH sans alourdir mon organisation",
  "à quel moment dois-je structurer mes RH dans ma croissance",
  "comment savoir si mes RH me font perdre du temps ou de l’argent",
  "pourquoi mon recrutement est lent malgré beaucoup de CV",
  "comment recruter un profil rare sans passer 6 mois",
  "comment automatiser mes RH sans perdre la dimension humaine",
  "est-ce que l’automatisation RH est rentable pour une PME ou startup",
  "combien de temps un dirigeant peut-il récupérer grâce à l’automatisation RH",
  "quel est le coût d’un mauvais recrutement",
  "comment améliorer la rétention des talents dans un contexte de pénurie",
  "pourquoi les équipes se désengagent dans les entreprises en croissance",
  "comment développer mes équipes sans recruter massivement",
  "comment scaler mon entreprise sans créer une usine à gaz RH",
  "comment structurer un recrutement quand on passe de 10 à 50 employés",
  "quels sont les premiers process RH à mettre en place",
  "comment gagner du temps en tant que CEO sur les sujets RH sans déléguer totalement",
  "quelles tâches RH puis-je automatiser immédiatement dans mon entreprise",
  "quelle est la meilleure stratégie pour recruter vite et bien en 2025",
  "comment aligner recrutement performance et stratégie d’entreprise",
  "comment éviter que les RH deviennent un frein à la croissance",
  "pourquoi automatiser les processus RH aujourd’hui",
  "comment gagner du temps en tant que dirigeant grâce aux RH",
  "quel ROI attendre d’une structuration RH automatisée",
  "pourquoi la chasse est-elle plus efficace que le recrutement classique",
  "comment réduire le time to hire",
  "comment sécuriser un recrutement stratégique",
  "quelles tâches RH peuvent être automatisées",
  "quels outils utiliser pour automatiser les RH",
  "l’automatisation remplace-t-elle les RH",
  "comment automatiser sans déshumaniser",
  "comment améliorer la rétention des talents",
  "comment structurer une équipe en croissance rapide",
  "pourquoi les RH sont un levier stratégique et pas juste administratif",
  "comment développer le potentiel des équipes",
  "comment réduire les coûts RH sans sacrifier la qualité",
  "quel est l’impact RH sur la croissance d’une entreprise",
  "comment mesurer la performance RH",
  "pourquoi investir dans une structuration RH dès maintenant",
  "comment passer de startup à organisation structurée",
  "comment scaler sans alourdir les équipes",
  "quand faut-il structurer ses RH",
  "comment aligner RH et stratégie business",
  "comment automatiser le recrutement",
  "comment gagner du temps en RH",
  "comment recruter rapidement un profil rare",
  "comment structurer une équipe en croissance",
  "comment améliorer la rétention des employés",
  "quels outils pour automatiser les RH",
  "comment réduire le coût du recrutement",
  "comment scaler une startup sans recruter trop",
  "comment améliorer la performance des équipes"
);

const coreLinks: SeoGrowthLink[] = [
  {
    label: "Nos services",
    href: "/services",
    description: "Executive search, RPO et structuration RH."
  },
  {
    label: "Contact",
    href: "/contact#rappel",
    description: "Être rappelé ou prendre un premier échange de cadrage."
  },
  {
    label: "Références",
    href: "/references",
    description: "Entreprises, environnements et exemples de mandats déjà menés."
  }
];

export const seoGrowthPages: SeoGrowthPage[] = [
  {
    slug: "cabinet-recrutement-life-sciences-paris",
    title: "Cabinet de recrutement Life Sciences Paris",
    kicker: "SEO local · Life Sciences",
    heroTitle: "Cabinet de recrutement Life Sciences à Paris",
    heroDescription:
      "SKS TALENTS accompagne les entreprises Life Sciences à Paris sur des recrutements critiques en biotech, diagnostic, healthtech, e-santé et deeptech, avec une logique executive search, RPO et structuration RH.",
    primaryKeyword: "cabinet de recrutement life sciences paris",
    secondaryKeywords: [
      "cabinet recrutement biotech paris",
      "executive search life sciences paris",
      "cabinet recrutement healthtech paris",
      "cabinet recrutement diagnostic paris"
    ],
    audience: "CEO, COO, CPO, DRH et fondateurs basés à Paris ou recrutant depuis Paris.",
    directAnswer:
      "Si vous cherchez un cabinet de recrutement Life Sciences à Paris, la vraie question n’est pas seulement de trouver des candidats. Il faut sécuriser une shortlist crédible, lisible et décidable sur des métiers où le marché est déjà saturé.",
    businessImpact: [
      "Mieux cadrer les recrutements dirigeants, business et opérations.",
      "Réduire le temps perdu entre brief, sourcing et arbitrage managérial.",
      "Éviter les cycles de recrutement trop génériques pour des profils spécialisés."
    ],
    sksApproach: [
      "Executive search sectoriel sur biotech, diagnostic, e-santé, healthtech et deeptech.",
      "Lecture marché Paris + France pour calibrer concurrence, attractivité et narration du rôle.",
      "Possibilité de prolonger en RPO ou en structuration RH si plusieurs recrutements s’enchaînent."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "cabinet recrutement life sciences paris",
      "cabinet recrutement biotech paris",
      "executive search santé paris",
      "cabinet recrutement medtech paris"
    ],
    marketContext:
      "Le bassin parisien concentre France Biotech, Angels Santé, Bpifrance, Paris-Saclay, Medicen et une forte densité d’entreprises financées. C’est un avantage pour l’écosystème, mais une difficulté supplémentaire pour recruter vite.",
    faqTitle: "FAQ - Cabinet de recrutement Life Sciences à Paris",
    faqs: [
      {
        question: "Pourquoi passer par un cabinet spécialisé Life Sciences à Paris ?",
        answer:
          "Parce que Paris concentre à la fois les entreprises les plus visibles, les talents les plus sollicités et les investisseurs santé. Un cabinet généraliste perd souvent du temps sur le cadrage sectoriel."
      },
      {
        question: "Quels rôles sont les plus difficiles à recruter à Paris ?",
        answer:
          "Les fonctions COO, business development, application specialist, qualité, R&D et direction commerciale restent parmi les plus exposées, surtout en contexte biotech, diagnostic et healthtech."
      },
      {
        question: "Quand faut-il passer d’un recrutement ponctuel à du RPO ?",
        answer:
          "Dès qu’une entreprise enchaîne plusieurs embauches ou doit absorber une phase Seed, Série A, Série B ou scale-up sans désorganiser les équipes internes."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Page sectorielle principale biotech, diagnostic, deeptech et e-santé."
      },
      {
        label: "Fonds santé",
        href: "/investment-funds",
        description: "Lecture des investisseurs et des signaux Seed, Série A et Série B."
      }
    ],
    metaTitle: "Cabinet de recrutement Life Sciences Paris | SKS TALENTS",
    metaDescription:
      "Cabinet de recrutement Life Sciences à Paris pour biotech, diagnostic, healthtech et e-santé. Executive search, RPO et structuration RH pour dirigeants et scale-ups."
  },
  {
    slug: "cabinet-recrutement-sante-animale-paris",
    title: "Cabinet de recrutement Santé animale Paris",
    kicker: "SEO local · Animal Health",
    heroTitle: "Cabinet de recrutement Santé animale à Paris",
    heroDescription:
      "SKS TALENTS accompagne les groupes vétérinaires, industriels, acteurs petfood et entreprises Animal Health qui recrutent depuis Paris ou rayonnent en France.",
    primaryKeyword: "cabinet de recrutement santé animale paris",
    secondaryKeywords: [
      "cabinet recrutement santé animale france",
      "cabinet recrutement vétérinaire corporate",
      "cabinet recrutement petfood france",
      "chasse de tête santé animale"
    ],
    audience: "Dirigeants, DRH et responsables opérations des acteurs santé animale, vet tech, cliniques et petfood.",
    directAnswer:
      "Sur la santé animale, les meilleurs profils ne sont généralement pas visibles sur le marché. Un cabinet spécialisé est surtout utile pour cadrer la proposition, approcher directement et protéger la qualité de décision.",
    businessImpact: [
      "Sécuriser le recrutement d’un manager de clinique, d’un leader petfood ou d’un profil opérations.",
      "Mieux articuler croissance, qualité de soin et efficacité commerciale.",
      "Réduire les erreurs de casting sur des marchés locaux déjà tendus."
    ],
    sksApproach: [
      "Approche directe sur groupes vétérinaires, diagnostic animal health, petfood et nutrition animale.",
      "Calibration du rôle, du niveau d’autonomie et du contexte terrain avant toute chasse.",
      "Possibilité de relier le recrutement à une logique plus large de structuration RH."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "cabinet recrutement santé animale paris",
      "recrutement groupes vétérinaires",
      "recrutement petcare",
      "recrutement nutrition animale france"
    ],
    marketContext:
      "Le marché Animal Health combine cliniques, réseaux, laboratoires vétérinaires, pet care et nutrition animale. Les viviers sont plus étroits que sur d’autres secteurs, donc chaque erreur coûte vite en opérations.",
    faqTitle: "FAQ - Recrutement Santé animale à Paris",
    faqs: [
      {
        question: "Quels postes recrutez-vous le plus souvent en santé animale ?",
        answer:
          "Des postes de direction des opérations, management de clinique, business development, RH, fonctions support et leadership petfood / nutrition animale."
      },
      {
        question: "Pourquoi est-ce plus difficile de recruter en santé animale ?",
        answer:
          "Parce que les profils seniors sont rares, très exposés et évaluent autant le projet que le poste. Sans approche ciblée, ils ne s’engagent pas."
      },
      {
        question: "Le petfood et la santé animale relèvent-ils de la même logique de recrutement ?",
        answer:
          "Ils partagent des enjeux de marché, mais pas les mêmes réseaux ni les mêmes critères. La narration du rôle, les signaux marché et les viviers sont différents."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Animal Health",
        href: "/animal-health",
        description: "Page sectorielle santé animale, cliniques vétérinaires et petfood."
      },
      {
        label: "Petfood",
        href: "/animal-health/petfood",
        description: "Verticale petfood et nutrition animale."
      }
    ],
    metaTitle: "Cabinet de recrutement Santé animale Paris | SKS TALENTS",
    metaDescription:
      "Cabinet de recrutement santé animale à Paris pour groupes vétérinaires, petfood, nutrition animale et fonctions corporate. Executive search, RPO et structuration RH."
  },
  {
    slug: "cabinet-recrutement-e-sante-france",
    title: "Cabinet de recrutement E-santé France",
    kicker: "SEO national · E-santé",
    heroTitle: "Cabinet de recrutement E-santé en France",
    heroDescription:
      "SKS TALENTS aide les entreprises e-santé, digital health, SaaS santé et robotique santé à structurer leurs recrutements business, opérations, people et direction.",
    primaryKeyword: "cabinet recrutement e-santé france",
    secondaryKeywords: [
      "recrutement e-santé france",
      "cabinet recrutement healthtech france",
      "recrutement robotique santé france",
      "recrutement digital health"
    ],
    audience: "Fondateurs, COO, DRH et équipes dirigeantes des entreprises e-santé et healthtech françaises.",
    directAnswer:
      "Le recrutement e-santé ne se résume pas à trouver des profils tech. Il faut aussi sécuriser des rôles capables de naviguer entre produit, santé, réglementation, exécution business et adoption terrain.",
    businessImpact: [
      "Mieux recruter les rôles qui transforment une innovation en traction commerciale.",
      "Éviter les recrutements trop généralistes sur des environnements réglementés.",
      "Relier recrutement, structuration RH et maturité d’exécution."
    ],
    sksApproach: [
      "Focus healthtech, e-santé, robotique santé, SaaS santé et innovation médicale.",
      "Lecture marché nourrie par les signaux France Biotech, Bpifrance, Angels Santé et les fonds santé.",
      "Possibilité d’articuler le mandat autour d’un besoin dirigeant, RPO ou structuration RH."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "cabinet recrutement e-santé france",
      "recrutement robotique santé france",
      "recrutement digital health",
      "recrutement health AI"
    ],
    marketContext:
      "L’e-santé française se situe à l’intersection des signaux fonds, des contraintes réglementaires et d’un marché des talents déjà disputé. Ce contexte renforce la valeur d’un cadrage précis dès le départ.",
    faqTitle: "FAQ - Recrutement E-santé en France",
    faqs: [
      {
        question: "Quels postes sont prioritaires dans une entreprise e-santé ?",
        answer:
          "Les fonctions COO, DRH / Head of People, direction commerciale, product leadership et coordination opérations / terrain sont souvent les plus structurantes."
      },
      {
        question: "Pourquoi la robotique santé mérite-t-elle un angle dédié ?",
        answer:
          "Parce qu’elle combine innovation médicale, contraintes industrielles, cycles de vente complexes et attentes fortes sur la crédibilité des équipes."
      },
      {
        question: "Quel lien entre e-santé et levée de fonds ?",
        answer:
          "Après un financement, les embauches deviennent plus visibles, plus urgentes et plus risquées. Le recrutement doit alors suivre une logique d’exécution, pas seulement de sourcing."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Page sectorielle pour biotech, diagnostic, deeptech et e-santé."
      },
      {
        label: "Fonds santé",
        href: "/investment-funds",
        description: "Annuaire des investisseurs et signaux de financement santé."
      }
    ],
    metaTitle: "Cabinet de recrutement E-santé France | SKS TALENTS",
    metaDescription:
      "Cabinet de recrutement e-santé en France pour healthtech, digital health, robotique santé et SaaS santé. Recrutement, RPO et structuration RH."
  },
  {
    slug: "cabinet-recrutement-petfood-france",
    title: "Cabinet de recrutement Petfood France",
    kicker: "SEO national · Petfood",
    heroTitle: "Cabinet de recrutement Petfood en France",
    heroDescription:
      "SKS TALENTS accompagne les marques et industriels petfood sur des recrutements en nutrition animale, innovation produit, opérations, qualité, sales et leadership.",
    primaryKeyword: "cabinet de recrutement petfood france",
    secondaryKeywords: [
      "recrutement industrie petfood",
      "recrutement nutrition animale france",
      "recrutement petcare",
      "recrutement industrie animale"
    ],
    audience: "Dirigeants, DRH, directions commerciales et opérations des acteurs petfood et nutrition animale.",
    directAnswer:
      "Le petfood combine contraintes industrielles, premiumisation, qualité et logique de marque. Un cabinet spécialisé est utile quand le poste exige à la fois une lecture business, technique et marché.",
    businessImpact: [
      "Recruter des profils capables de tenir la chaîne qualité, produit et croissance.",
      "Clarifier les rôles petfood entre innovation, nutrition, supply et go-to-market.",
      "Mieux articuler fonctions business et fonctions industrielles."
    ],
    sksApproach: [
      "Approche ciblée sur petfood, nutrition animale, innovation produit et premium brands.",
      "Mandats sur directions commerciales, opérations, qualité, achats et leadership.",
      "Possibilité d’adosser le recrutement à une logique RPO ou structuration RH."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "cabinet recrutement petfood france",
      "recrutement nutrition animale france",
      "recrutement petcare",
      "recrutement industrie animale"
    ],
    faqTitle: "FAQ - Recrutement Petfood en France",
    faqs: [
      {
        question: "Quels profils sont les plus tendus dans le petfood ?",
        answer:
          "Les profils croisant nutrition, qualité, innovation produit, opérations et développement commercial sont souvent les plus complexes à sécuriser."
      },
      {
        question: "Le petfood relève-t-il vraiment du même marché que la nutrition animale ?",
        answer:
          "Ils partagent des briques communes, mais les attentes client, la marque, la premiumisation et les chaînes de distribution peuvent créer des besoins très différents."
      },
      {
        question: "Pourquoi un cabinet spécialisé est-il utile dans ce secteur ?",
        answer:
          "Parce que le marché reste étroit, les compétences sont hybrides, et les erreurs de ciblage coûtent vite en temps, en qualité et en dynamique commerciale."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Petfood",
        href: "/animal-health/petfood",
        description: "Page verticale petfood et nutrition animale."
      },
      {
        label: "Animal Health",
        href: "/animal-health",
        description: "Hub santé animale, cliniques vétérinaires et petfood."
      }
    ],
    metaTitle: "Cabinet de recrutement Petfood France | SKS TALENTS",
    metaDescription:
      "Cabinet de recrutement petfood en France pour nutrition animale, innovation produit, opérations, qualité et leadership. Executive search, RPO et structuration RH."
  },
  {
    slug: "recrutement-nutrition-animale-france",
    title: "Recrutement nutrition animale France",
    kicker: "SEO national · Nutrition animale",
    heroTitle: "Recrutement nutrition animale en France",
    heroDescription:
      "SKS TALENTS aide les entreprises nutrition animale, petfood et animal biotech à recruter des profils business, innovation, qualité, achats, formulation et direction.",
    primaryKeyword: "recrutement nutrition animale france",
    secondaryKeywords: [
      "recrutement nutrition animale",
      "recrutement industrie animale",
      "recrutement petfood france",
      "recrutement laboratoires vétérinaires"
    ],
    audience: "Entreprises de nutrition animale, industriels, marques petfood et environnements vétérinaires connexes.",
    directAnswer:
      "Le recrutement en nutrition animale devient difficile dès qu’il faut articuler connaissance scientifique, performance industrielle, réglementation et logique commerciale.",
    businessImpact: [
      "Éviter de séparer artificiellement produit, qualité et business.",
      "Mieux recruter sur les rôles qui structurent la croissance plutôt que de recruter dans l’urgence.",
      "Sécuriser les profils rares avant qu’ils ne soient captés par des groupes plus visibles."
    ],
    sksApproach: [
      "Approche ciblée sur nutrition animale, petfood, qualité, formulation, innovation et growth.",
      "Lecture marché basée sur des environnements déjà présents dans vos références.",
      "Connexion possible avec vos enjeux de structuration RH et d’automatisation People Ops."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "recrutement nutrition animale france",
      "recrutement industrie animale",
      "recrutement petfood",
      "recrutement animal biotech"
    ],
    faqTitle: "FAQ - Recrutement nutrition animale en France",
    faqs: [
      {
        question: "Quels rôles sont prioritaires en nutrition animale ?",
        answer:
          "Les rôles liant formulation, qualité, opérations, achats, business development et leadership sont les plus structurants."
      },
      {
        question: "Pourquoi ce marché est-il plus étroit qu’il n’y paraît ?",
        answer:
          "Parce que les profils combinant compréhension technique, industrie et marché restent peu nombreux et sont souvent déjà engagés."
      },
      {
        question: "Le recrutement nutrition animale sert-il seulement les industriels ?",
        answer:
          "Non. Il sert aussi les marques, les réseaux de distribution, les acteurs petfood et les entreprises à forte composante innovation."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Références petfood",
        href: "/references",
        description: "Références SKS dans le petfood et la nutrition animale."
      },
      {
        label: "Petfood",
        href: "/animal-health/petfood",
        description: "Page verticale petfood."
      }
    ],
    metaTitle: "Recrutement nutrition animale France | SKS TALENTS",
    metaDescription:
      "Recrutement nutrition animale en France pour petfood, innovation produit, qualité, business et leadership. SKS TALENTS accompagne les marchés animaux à forte technicité."
  },
  {
    slug: "recrutement-apres-levee-de-fonds",
    title: "Recrutement après levée de fonds",
    kicker: "Funding · Growth hiring",
    heroTitle: "Recrutement après levée de fonds",
    heroDescription:
      "Après une levée de fonds, le problème n’est pas seulement de recruter vite. Il faut recruter dans le bon ordre, au bon niveau et avec un process capable de tenir la croissance.",
    primaryKeyword: "recrutement après levée de fonds",
    secondaryKeywords: [
      "hiring après levée de fonds",
      "structuration RH startup santé",
      "recrutement startup santé croissance",
      "recrutement hypercroissance biotech"
    ],
    audience: "Fondateurs, COO, CPO et DRH de startups financées ou en phase de scale-up.",
    directAnswer:
      "Une levée de fonds crée une pression de vitesse, mais le vrai sujet est l’ordre des embauches. Quand l’argent se raréfie, chaque recrutement devient plus critique et le coût d’un mauvais séquencement augmente immédiatement.",
    businessImpact: [
      "Prioriser les embauches qui débloquent vraiment l’exécution.",
      "Éviter d’ouvrir trop de postes en même temps avec un process immature.",
      "Relier recrutement, structuration RH et automatisation People Ops.",
      "Réduire le risque de brûler du cash sur des postes ouverts trop tôt ou trop tard."
    ],
    sksApproach: [
      "Lecture des enjeux Seed, Série A, Série B et scale-up à partir des signaux marché et fonds.",
      "Possibilité d’intervenir en executive search sur les premiers rôles critiques ou en RPO sur un volume plus large.",
      "Appui sur la structuration RH et les automatisations quand les équipes internes se saturent."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement après levée de fonds",
      "recrutement série A biotech",
      "recrutement série B healthtech",
      "structuration RH startup santé"
    ],
    marketContext:
      "Le marché a levé 2,3 Md€ en France avec une baisse de 10% sur le total, tandis que le capital-risque a progressé à 1 Md€. L’argent est plus rare, mais l’exigence de performance n’a jamais été aussi élevée. Les fonds que vous référencez déjà - France Biotech, Bpifrance, Angels Santé, Seventure, Sofina, EIC Fund, Digitalis - créent une dynamique de croissance, mais pas une séquence de recrutement. C’est précisément là qu’un cabinet spécialisé devient utile.",
    faqTitle: "FAQ - Recrutement après levée de fonds",
    faqs: [
      {
        question: "Quels postes recruter en premier après une levée de fonds ?",
        answer:
          "En général : opérations, people, business et leadership métier, avant d’empiler des postes sans gouvernance ni séquence claire."
      },
      {
        question: "Quand passer en RPO après financement ?",
        answer:
          "Dès que plusieurs recrutements doivent être menés en parallèle sans dégrader l’expérience candidat, le pilotage managérial ou le time-to-hire."
      },
      {
        question: "Quel lien avec l’automatisation RH ?",
        answer:
          "Après financement, les gains rapides viennent souvent autant des process RH et du pilotage que de la seule capacité de sourcing."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Fonds santé",
        href: "/investment-funds",
        description: "Annuaire des investisseurs et plateformes de financement santé."
      },
      {
        label: "RPO Life Sciences",
        href: "/rpo-recrutement-life-sciences",
        description: "Approche RPO dédiée aux phases Seed, Série A, Série B et scale-up."
      }
    ],
    metaTitle: "Recrutement après levée de fonds | SKS TALENTS",
    metaDescription:
      "Comment structurer ses recrutements après une levée de fonds en biotech, healthtech ou santé. Priorités, RPO, structuration RH et exécution."
  },
  {
    slug: "recrutement-serie-a-biotech",
    title: "Recrutement Série A biotech",
    kicker: "Funding · Série A",
    heroTitle: "Recrutement Série A biotech",
    heroDescription:
      "SKS TALENTS aide les biotech en Série A à séquencer leurs recrutements, clarifier leurs rôles critiques et protéger leur exécution dès les premières phases d’accélération.",
    primaryKeyword: "recrutement série A biotech",
    secondaryKeywords: [
      "recrutement startup biotech financée",
      "recrutement après levée de fonds biotech",
      "recrutement hypercroissance biotech",
      "recruter COO biotech"
    ],
    audience: "Fondateurs, COO, DRH et boards de biotech en phase Série A.",
    directAnswer:
      "En Série A biotech, la difficulté n’est pas seulement de recruter. C’est de choisir quels rôles doivent venir en premier pour soutenir le produit, l’industrialisation, la qualité et la trajectoire business.",
    businessImpact: [
      "Éviter de recruter trop tôt des rôles périphériques.",
      "Prioriser les postes qui relient science, opérations et croissance.",
      "Rendre la shortlist décidable par des dirigeants déjà sous tension."
    ],
    sksApproach: [
      "Lecture conjointe des signaux fonds, du stade biotech et des besoins d’exécution.",
      "Executive search pour les rôles critiques, RPO si la courbe d’embauche devient plus dense.",
      "Structuration RH si l’équipe People ne suit pas le rythme imposé par la Série A."
    ],
    clusterLabel: "Sujets couverts",
    clusterItems: [
      "recrutement série A biotech",
      "recrutement startup biotech financée",
      "recrutement VC biotech",
      "recrutement profils rares santé"
    ],
    faqTitle: "FAQ - Recrutement Série A biotech",
    faqs: [
      {
        question: "Quels rôles sont les plus urgents après une Série A biotech ?",
        answer:
          "COO, qualité, industrialisation, business development, people leadership et certains rôles R&D / application selon la phase produit."
      },
      {
        question: "Pourquoi la Série A change-t-elle la nature du recrutement ?",
        answer:
          "Parce que les dirigeants doivent passer d’une logique d’équipe fondatrice à une logique de système, de process et de gouvernance."
      },
      {
        question: "Faut-il internaliser ou externaliser le recrutement à ce stade ?",
        answer:
          "Cela dépend du volume, mais beaucoup de biotech gagnent à hybrider : executive search sur les rôles critiques, RPO sur les flux plus denses."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Page sectorielle biotech, diagnostic, deeptech et e-santé."
      },
      {
        label: "Recruter un COO biotech",
        href: "/recruter-coo-biotech",
        description: "Page dédiée au recrutement de COO biotech."
      }
    ],
    metaTitle: "Recrutement Série A biotech | SKS TALENTS",
    metaDescription:
      "Recrutement Série A biotech : quels rôles prioriser, comment structurer le process, quand activer executive search, RPO et structuration RH."
  },
  {
    slug: "recrutement-serie-b-healthtech",
    title: "Recrutement Série B healthtech",
    kicker: "Funding · Série B",
    heroTitle: "Recrutement Série B healthtech",
    heroDescription:
      "En Série B healthtech, la croissance change d’échelle. SKS TALENTS aide à structurer les recrutements dirigeants, business, people et opérations sans perdre en lisibilité.",
    primaryKeyword: "recrutement série B healthtech",
    secondaryKeywords: [
      "recrutement startup healthtech financée",
      "structuration RH startup santé",
      "recrutement scale-up santé",
      "recrutement healthtech france"
    ],
    audience: "Dirigeants, COO, DRH et équipes People des scale-ups healthtech.",
    directAnswer:
      "À ce stade, le sujet devient moins la recherche d’un profil isolé que la cohérence du système de recrutement : rôles, process, séquence, automatisations et niveau d’exigence.",
    businessImpact: [
      "Mieux absorber une densification du hiring plan.",
      "Éviter les goulets d’étranglement people et décision.",
      "Garder un niveau de qualité compatible avec une croissance plus visible."
    ],
    sksApproach: [
      "Lecture du pipeline de recrutement et du niveau de maturité de l’équipe RH.",
      "RPO si besoin de volume, executive search si besoin de structuration dirigeante.",
      "Ajout d’une logique process, automatisation et People Ops quand nécessaire."
    ],
    clusterLabel: "Sujets couverts",
    clusterItems: [
      "recrutement série B healthtech",
      "recrutement startup healthtech financée",
      "structuration RH startup santé",
      "automatisation processus RH santé"
    ],
    faqTitle: "FAQ - Recrutement Série B healthtech",
    faqs: [
      {
        question: "Pourquoi la Série B change-t-elle le niveau d’exigence RH ?",
        answer:
          "Parce que les embauches ne sont plus seulement critiques : elles deviennent répétées, visibles, interdépendantes et plus coûteuses à mal piloter."
      },
      {
        question: "Quel rôle pour le RPO en Série B ?",
        answer:
          "Le RPO sert à absorber le volume sans perdre la qualité du process, du reporting, de l’expérience candidat et de la coordination managériale."
      },
      {
        question: "Quand faut-il automatiser les process RH ?",
        answer:
          "Dès que l’équipe commence à perdre du temps sur la coordination, le suivi pipeline, les feedback loops et les étapes répétitives."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Structuration RH startup santé",
        href: "/structuration-rh-startup-sante",
        description: "Structurer la fonction People quand le hiring plan s’accélère."
      },
      {
        label: "Automatisation processus RH",
        href: "/automatisation-processus-rh-sante",
        description: "Automatiser ce qui ralentit les équipes RH et managers."
      }
    ],
    metaTitle: "Recrutement Série B healthtech | SKS TALENTS",
    metaDescription:
      "Recrutement Série B healthtech : volume, RPO, structuration RH et automatisation des process pour tenir la croissance sans dégrader la qualité."
  },
  {
    slug: "recrutement-startup-biotech-financee",
    title: "Recrutement startup biotech financée",
    kicker: "Funding · Startup biotech",
    heroTitle: "Recrutement startup biotech financée",
    heroDescription:
      "Quand une startup biotech est financée, le recrutement devient un levier direct de crédibilité, de vitesse d’exécution et de transformation du financement en croissance réelle.",
    primaryKeyword: "recrutement startup biotech financée",
    secondaryKeywords: [
      "recrutement biotech seed",
      "recrutement série A biotech",
      "recrutement VC biotech",
      "hiring après levée de fonds"
    ],
    audience: "Fondateurs biotech, COO, boards et investisseurs.",
    directAnswer:
      "Le financement crée une fenêtre d’opportunité courte. Si les bons recrutements n’arrivent pas vite et dans le bon ordre, le capital ne se transforme pas en exécution durable.",
    businessImpact: [
      "Faire le lien entre road-map scientifique et organisation.",
      "Traduire le financement en décisions de staffing cohérentes.",
      "Éviter les erreurs de recrutements sous pression."
    ],
    sksApproach: [
      "Lecture des signaux fonds déjà présents sur le site : France Biotech, Bpifrance, Seventure, Sofina, EIC Fund.",
      "Executive search sur les rôles les plus sensibles.",
      "RPO ou structuration RH quand plusieurs embauches doivent être orchestrées."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "startup biotech financée",
      "hiring après levée de fonds",
      "recrutement série A biotech",
      "recrutement scale-up santé"
    ],
    faqTitle: "FAQ - Recrutement startup biotech financée",
    faqs: [
      {
        question: "Quels signaux montrent qu’une startup biotech doit professionnaliser son recrutement ?",
        answer:
          "Quand le volume d’embauche augmente, que les rôles deviennent plus senior, ou que les fondateurs passent trop de temps à compenser un process inexistant."
      },
      {
        question: "Quel lien entre investisseurs et recrutement ?",
        answer:
          "Les investisseurs donnent un cadre de croissance et de visibilité, mais pas une organisation. Le recrutement sert précisément à transformer cette visibilité en exécution."
      },
      {
        question: "Pourquoi parler de structuration RH si l’entreprise est encore petite ?",
        answer:
          "Parce que les premières briques process et People Ops évitent que les prochains recrutements reposent uniquement sur les fondateurs."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Fonds santé, biotech et deeptech déjà suivis sur le site."
      },
      {
        label: "Recrutement après levée de fonds",
        href: "/recrutement-apres-levee-de-fonds",
        description: "Page transversale growth hiring."
      }
    ],
    metaTitle: "Recrutement startup biotech financée | SKS TALENTS",
    metaDescription:
      "Comment structurer le recrutement d’une startup biotech financée. Priorités, executive search, RPO, structuration RH et logique de scale-up."
  },
  {
    slug: "recrutement-scale-up-sante",
    title: "Recrutement scale-up santé",
    kicker: "Growth · Scale-up",
    heroTitle: "Recrutement scale-up santé",
    heroDescription:
      "SKS TALENTS accompagne les scale-ups santé, biotech, healthtech et animal health quand le vrai sujet devient la cohérence du système de recrutement, pas seulement la capacité à sourcer.",
    primaryKeyword: "recrutement scale-up santé",
    secondaryKeywords: [
      "scale-up santé recrutement",
      "recrutement startup santé croissance",
      "structuration RH startup santé",
      "recrutement profils rares santé"
    ],
    audience: "Scale-ups santé, directions People, COO et fondateurs.",
    directAnswer:
      "Une scale-up santé ne gagne pas seulement en recrutant plus. Elle gagne en recrutant dans le bon ordre, avec les bons process et le bon niveau de narration marché. Ce qui fonctionne à 10 personnes casse souvent à 30.",
    businessImpact: [
      "Réduire les frictions entre hiring managers, RH et direction.",
      "Améliorer la lisibilité des mandats et la vitesse de décision.",
      "Passer d’un recrutement opportuniste à une machine plus robuste."
    ],
    sksApproach: [
      "Lecture conjointe du stade, du marché, de la rareté et du besoin organisationnel.",
      "RPO sur les flux d’embauche récurrents.",
      "Executive search sur les rôles décisifs, puis structuration RH / automatisation si le système ne tient pas."
    ],
    clusterLabel: "Sujets couverts",
    clusterItems: [
      "recrutement scale-up santé",
      "structuration RH startup santé",
      "automatisation RH startup santé",
      "recrutement hypercroissance biotech"
    ],
    marketContext:
      "Le marché HealthTech français compte environ 2 800 entreprises, dont un tiers a moins de 5 ans. Il reste donc jeune, avec beaucoup d’improvisation organisationnelle. Dans le même temps, 75% des entreprises visent directement l’international : vous ne recrutez pas seulement contre vos concurrents locaux, mais contre le monde entier.",
    faqTitle: "FAQ - Recrutement scale-up santé",
    faqs: [
      {
        question: "Quand une startup santé devient-elle une vraie scale-up côté recrutement ?",
        answer:
          "Quand les embauches deviennent interdépendantes, que le management doit arbitrer plus vite, et que les process people conditionnent directement la croissance."
      },
      {
        question: "Quel lien entre scale-up et profils rares ?",
        answer:
          "Plus la société accélère, plus elle entre en concurrence avec des entreprises plus visibles sur les mêmes talents rares."
      },
      {
        question: "Faut-il structurer les process avant ou après les recrutements ?",
        answer:
          "Au minimum en parallèle. Sans socle process, les recrutements suivants deviennent plus lents, plus coûteux et moins lisibles."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Structuration RH startup santé",
        href: "/structuration-rh-startup-sante",
        description: "Mettre une base RH claire pour soutenir le scale."
      },
      {
        label: "RPO Life Sciences",
        href: "/rpo-recrutement-life-sciences",
        description: "Absorber un volume d’embauche critique."
      }
    ],
    metaTitle: "Recrutement scale-up santé | SKS TALENTS",
    metaDescription:
      "Recrutement scale-up santé : executive search, RPO, structuration RH et automatisation des process pour biotech, healthtech et animal health."
  },
  {
    slug: "recrutement-biotech-paris",
    title: "Recrutement biotech Paris",
    kicker: "SEO local · Biotech Paris",
    heroTitle: "Recrutement biotech à Paris",
    heroDescription:
      "À Paris, le recrutement biotech demande une lecture précise du marché, des fonds, des écosystèmes et des rôles rares. SKS TALENTS aide à transformer cette complexité en shortlist décidable.",
    primaryKeyword: "recrutement biotech paris",
    secondaryKeywords: [
      "cabinet recrutement biotech paris",
      "chasse de tête biotech paris",
      "executive search biotech paris",
      "recrutement biotech france"
    ],
    audience: "Biotech parisiennes et équipes dirigeantes cherchant des talents rares.",
    directAnswer:
      "Le recrutement biotech à Paris est tendu parce que l’écosystème concentre fonds, laboratoires, scale-ups et environnements très visibles. Il faut donc mieux cadrer, mieux raconter et mieux prioriser.",
    businessImpact: [
      "Recruter sans se perdre dans un marché déjà très courtisé.",
      "Relier le poste aux vraies attentes des meilleurs candidats.",
      "Mieux articuler science, business et exécution."
    ],
    sksApproach: [
      "Approche directe sur profils biotech business, opérations, qualité, application et direction.",
      "Lecture des signaux Paris-Saclay, France Biotech, Angels Santé, Bpifrance, Medicen.",
      "Connexion possible avec une logique Seed, Série A, Série B ou scale-up."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement biotech paris",
      "executive search biotech",
      "recrutement série A biotech",
      "recrutement startup biotech financée"
    ],
    faqTitle: "FAQ - Recrutement biotech à Paris",
    faqs: [
      {
        question: "Pourquoi Paris est-elle si concurrentielle en biotech ?",
        answer:
          "Parce que les fonds, les hubs d’innovation, les entreprises visibles et les talents les plus exposés s’y croisent dans un même bassin."
      },
      {
        question: "Quels profils biotech sont les plus disputés ?",
        answer:
          "Les profils COO, qualité, industrialisation, sales spécialisés, application specialists et certains rôles de direction scientifique / business."
      },
      {
        question: "Quel intérêt de parler des fonds sur une page recrutement ?",
        answer:
          "Parce que les levées, les investisseurs et la visibilité marché influencent directement les tensions de recrutement et la concurrence sur les talents."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Biotech", href: "/life-sciences/biotech", description: "Verticale biotech du site." },
      {
        label: "Fonds santé",
        href: "/investment-funds",
        description: "Pages fonds et signaux market / hiring."
      }
    ],
    metaTitle: "Recrutement biotech Paris | SKS TALENTS",
    metaDescription:
      "Recrutement biotech à Paris pour COO, business, qualité, opérations et rôles rares. SKS TALENTS relie marché, fonds et exécution."
  },
  {
    slug: "recrutement-healthtech-lyon",
    title: "Recrutement healthtech Lyon",
    kicker: "SEO local · Healthtech Lyon",
    heroTitle: "Recrutement healthtech à Lyon",
    heroDescription:
      "Lyon concentre un vrai écosystème santé et biotech. SKS TALENTS aide les entreprises healthtech et medtech lyonnaises à cadrer leurs recrutements critiques.",
    primaryKeyword: "recrutement healthtech lyon",
    secondaryKeywords: [
      "cabinet recrutement healthtech lyon",
      "recrutement medtech lyon",
      "recrutement biotech lyon",
      "lyonbiopôle recrutement"
    ],
    audience: "Entreprises healthtech, medtech et biotech autour de Lyon et d’Auvergne-Rhône-Alpes.",
    directAnswer:
      "À Lyon, le recrutement healthtech est tiré à la fois par l’innovation, les industriels et les scale-ups. Cela rend les arbitrages plus sensibles sur les profils business, terrain, qualité et direction.",
    businessImpact: [
      "Mieux lire la concurrence locale.",
      "Accélérer les décisions sans dégrader la qualité.",
      "Éviter les mandats trop flous sur des marchés déjà très sollicités."
    ],
    sksApproach: [
      "Approche sectorielle sur healthtech, medtech, biotech et diagnostic.",
      "Lecture écosystème autour de Lyonbiopôle, clusters et entreprises à forte intensité santé.",
      "Déploiement possible en executive search ou RPO."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement healthtech lyon",
      "recrutement medtech france",
      "recrutement diagnostic ivd",
      "recrutement deeptech santé"
    ],
    faqTitle: "FAQ - Recrutement healthtech à Lyon",
    faqs: [
      {
        question: "Pourquoi Lyon mérite-t-elle une page dédiée ?",
        answer:
          "Parce que le bassin lyonnais cumule cluster santé, industriels, biotech, diagnostic et environnements techniques qui créent une demande spécifique."
      },
      {
        question: "Quels postes sont les plus stratégiques à Lyon ?",
        answer:
          "Business development, opérations, qualité, direction commerciale, application, terrain et certains rôles de direction produit ou people."
      },
      {
        question: "Faut-il privilégier une chasse locale ou nationale ?",
        answer:
          "Cela dépend du rôle, mais beaucoup de postes gagnent à être pensés comme des recrutements nationaux avec un vrai ancrage local."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Diagnostic & MedTech",
        href: "/market-hubs/diagnostic-medtech",
        description: "Hub diagnostic, medtech et support applicatif."
      },
      { label: "Life Sciences", href: "/life-sciences", description: "Page sectorielle Life Sciences." }
    ],
    metaTitle: "Recrutement healthtech Lyon | SKS TALENTS",
    metaDescription:
      "Recrutement healthtech à Lyon pour medtech, diagnostic et biotech. Executive search, RPO et structuration RH adaptés aux environnements santé."
  },
  {
    slug: "recrutement-biotech-toulouse",
    title: "Recrutement biotech Toulouse",
    kicker: "SEO local · Biotech Toulouse",
    heroTitle: "Recrutement biotech à Toulouse",
    heroDescription:
      "SKS TALENTS accompagne les entreprises biotech et santé autour de Toulouse quand le recrutement devient un sujet d’exécution, de croissance et d’accès aux profils rares.",
    primaryKeyword: "recrutement biotech toulouse",
    secondaryKeywords: [
      "cabinet recrutement biotech toulouse",
      "recrutement life sciences toulouse",
      "recrutement diagnostic toulouse",
      "recrutement deeptech santé toulouse"
    ],
    audience: "Entreprises biotech, diagnostics et innovation santé de Toulouse et du Sud-Ouest.",
    directAnswer:
      "Le recrutement biotech à Toulouse exige une lecture fine du bassin local, mais aussi de la capacité à ouvrir le mandat au-delà du vivier immédiat quand le marché se tend.",
    businessImpact: [
      "Éviter les cycles de recherche trop limités à un bassin local étroit.",
      "Mieux articuler attractivité locale et recherche nationale.",
      "Sécuriser les profils critiques sur des environnements en croissance."
    ],
    sksApproach: [
      "Executive search sur rôles business, qualité, opérations et direction.",
      "Lecture marché Toulouse + national pour élargir le sourcing utile.",
      "Connexion possible avec fonds, structuration RH et scale-up."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement biotech toulouse",
      "recrutement deeptech santé toulouse",
      "recrutement diagnostic ivd",
      "recrutement startup biotech financée"
    ],
    faqTitle: "FAQ - Recrutement biotech à Toulouse",
    faqs: [
      {
        question: "Pourquoi un bassin régional peut-il ralentir le recrutement biotech ?",
        answer:
          "Parce que les viviers seniors peuvent être vite épuisés si l’on ne pense pas le mandat à une échelle plus large."
      },
      {
        question: "Quels rôles biotech sont les plus critiques à Toulouse ?",
        answer:
          "Qualité, production, business development, opérations, direction et certains rôles applicatifs ou scientifiques selon le stade."
      },
      {
        question: "Quel intérêt de relier recrutement et structuration RH ?",
        answer:
          "Quand plusieurs embauches s’enchaînent, les process et le pilotage RH deviennent vite aussi critiques que le sourcing lui-même."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Biotech", href: "/life-sciences/biotech", description: "Verticale biotech du site." },
      { label: "Blog", href: "/blog", description: "Articles marché, funding, salaires et recrutement." }
    ],
    metaTitle: "Recrutement biotech Toulouse | SKS TALENTS",
    metaDescription:
      "Recrutement biotech à Toulouse pour rôles business, qualité, opérations et direction. Approche executive search, RPO et structuration RH."
  },
  {
    slug: "recrutement-biotech-bordeaux",
    title: "Recrutement biotech Bordeaux",
    kicker: "SEO local · Biotech Bordeaux",
    heroTitle: "Recrutement biotech à Bordeaux",
    heroDescription:
      "SKS TALENTS accompagne les environnements biotech et santé à Bordeaux quand le recrutement demande plus qu’un sourcing : cadrage, narration et arbitrage de profils rares.",
    primaryKeyword: "recrutement biotech bordeaux",
    secondaryKeywords: [
      "cabinet recrutement biotech bordeaux",
      "recrutement life sciences bordeaux",
      "recrutement santé bordeaux",
      "recrutement biotech france"
    ],
    audience: "Dirigeants, RH et équipes business / opérations des sociétés biotech bordelaises.",
    directAnswer:
      "À Bordeaux, le bon recrutement biotech dépend autant du marché local que de la capacité à raconter le projet et ouvrir la recherche au bon niveau géographique.",
    businessImpact: [
      "Mieux recruter sur un bassin moins dense que Paris.",
      "Augmenter la lisibilité du projet pour des talents déjà en poste.",
      "Sécuriser les fonctions critiques plutôt que d’empiler des CV."
    ],
    sksApproach: [
      "Executive search ciblé sur biotech, diagnostic et innovation santé.",
      "Ouverture du sourcing au-delà du local si nécessaire.",
      "Intégration possible avec RPO ou structuration RH."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement biotech bordeaux",
      "recrutement life sciences bordeaux",
      "executive search biotech",
      "recrutement profils rares santé"
    ],
    faqTitle: "FAQ - Recrutement biotech à Bordeaux",
    faqs: [
      {
        question: "Pourquoi une biotech bordelaise doit-elle penser le recrutement au-delà du local ?",
        answer:
          "Parce que certains rôles rares exigent une approche nationale, voire internationale, surtout quand le bassin local est limité."
      },
      {
        question: "Quels postes biotech sont les plus sensibles ?",
        answer:
          "Les rôles liant science, opérations, business et exécution : COO, qualité, industrialisation, sales spécialisés, direction produit ou application."
      },
      {
        question: "Quand faut-il passer d’un mandat simple à une logique RPO ?",
        answer:
          "Quand plusieurs recrutements critiques se succèdent et qu’une équipe interne ne peut pas porter seule le rythme."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Life Sciences", href: "/life-sciences", description: "Page sectorielle Life Sciences." },
      { label: "Benchmarks salaires", href: "/salary-benchmarks", description: "Repères salariaux et fourchettes utiles." }
    ],
    metaTitle: "Recrutement biotech Bordeaux | SKS TALENTS",
    metaDescription:
      "Recrutement biotech à Bordeaux pour rôles business, opérations, qualité et direction. SKS TALENTS relie executive search, RPO et structuration RH."
  },
  {
    slug: "recrutement-e-sante-montpellier",
    title: "Recrutement e-santé Montpellier",
    kicker: "SEO local · E-santé Montpellier",
    heroTitle: "Recrutement e-santé à Montpellier",
    heroDescription:
      "Montpellier reste un bassin intéressant pour la santé, la biotech et le digital. SKS TALENTS y traite le recrutement e-santé comme un sujet d’exécution, pas seulement de visibilité.",
    primaryKeyword: "recrutement e-santé montpellier",
    secondaryKeywords: [
      "cabinet recrutement e-santé montpellier",
      "recrutement healthtech montpellier",
      "recrutement robotique santé montpellier",
      "recrutement medtech montpellier"
    ],
    audience: "Healthtech, e-santé, medtech et entreprises innovation santé de Montpellier.",
    directAnswer:
      "Le recrutement e-santé à Montpellier demande de relier innovation, attractivité locale, dynamique d’écosystème et maturité RH pour transformer l’intérêt candidat en décision signée.",
    businessImpact: [
      "Mieux recruter des profils hybrides entre santé, produit et business.",
      "Éviter les recherches trop génériques sur des rôles en forte tension.",
      "Garder une logique de conversion candidat cohérente avec la croissance."
    ],
    sksApproach: [
      "Approche ciblée sur e-santé, healthtech, robotique santé et innovation médicale.",
      "Lecture marché connectée aux signaux écosystème déjà présents dans vos ressources.",
      "Possible articulation avec structuration RH et automatisation People Ops."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement e-santé montpellier",
      "recrutement healthtech montpellier",
      "recrutement robotique santé france",
      "cabinet recrutement e-santé france"
    ],
    faqTitle: "FAQ - Recrutement e-santé à Montpellier",
    faqs: [
      {
        question: "Quels rôles sont les plus difficiles à recruter en e-santé ?",
        answer:
          "Les rôles croisant santé, produit, business et exécution - COO, people leadership, direction commerciale, product operations, terrain."
      },
      {
        question: "Pourquoi relier e-santé et robotique santé ?",
        answer:
          "Parce que beaucoup d’entreprises sont aujourd’hui à l’intersection du software, du device, du terrain médical et de la donnée."
      },
      {
        question: "Quel intérêt d’une page locale comme Montpellier ?",
        answer:
          "Elle capte une intention de recherche plus chaude et plus qualifiée que des requêtes trop larges à l’échelle nationale."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Life Sciences", href: "/life-sciences", description: "Page sectorielle Life Sciences." },
      { label: "Écosystème", href: "/ecosystem", description: "Écoles, clusters, fonds et événements." }
    ],
    metaTitle: "Recrutement e-santé Montpellier | SKS TALENTS",
    metaDescription:
      "Recrutement e-santé à Montpellier pour healthtech, robotique santé, produit, business et direction. Executive search, RPO et structuration RH."
  },
  {
    slug: "recrutement-sante-animale-marseille",
    title: "Recrutement santé animale Marseille",
    kicker: "SEO local · Animal Health Marseille",
    heroTitle: "Recrutement santé animale à Marseille",
    heroDescription:
      "SKS TALENTS accompagne les acteurs santé animale, petcare et nutrition animale à Marseille quand le vrai sujet devient la rareté du vivier, la qualité du process et la solidité de l’onboarding.",
    primaryKeyword: "recrutement santé animale marseille",
    secondaryKeywords: [
      "cabinet recrutement santé animale marseille",
      "recrutement petcare marseille",
      "recrutement nutrition animale marseille",
      "recrutement cliniques vétérinaires marseille"
    ],
    audience: "Acteurs santé animale, groupes vétérinaires et entreprises petfood autour de Marseille.",
    directAnswer:
      "À Marseille, le recrutement santé animale demande une approche plus sélective encore, parce que les bassins sont plus étroits et que les profils seniors se déplacent rarement sans projet très lisible.",
    businessImpact: [
      "Réduire les recherches trop longues sur marchés locaux tendus.",
      "Mieux calibrer les rôles care, opérations, commerce et direction.",
      "Sécuriser l’attractivité d’un projet au-delà de la simple localisation."
    ],
    sksApproach: [
      "Approche ciblée sur santé animale, cliniques vétérinaires, petcare et nutrition animale.",
      "Possibilité d’élargir la chasse au-delà du bassin local quand le poste l’exige.",
      "Lien possible avec structuration RH ou RPO si plusieurs postes s’ouvrent."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement santé animale marseille",
      "recrutement cliniques vétérinaires",
      "recrutement petcare",
      "recrutement nutrition animale france"
    ],
    faqTitle: "FAQ - Recrutement santé animale à Marseille",
    faqs: [
      {
        question: "Pourquoi Marseille peut-elle être plus difficile que Paris pour certains recrutements ?",
        answer:
          "Parce que le vivier est plus étroit sur certains rôles seniors et que les talents mobiles demandent un projet particulièrement clair."
      },
      {
        question: "Quels rôles sont les plus sensibles en santé animale ?",
        answer:
          "Direction de clinique, opérations, leadership commercial, RH, vétérinaire corporate et certains rôles petfood / nutrition animale."
      },
      {
        question: "Quand ouvrir la recherche au niveau national ?",
        answer:
          "Dès que le marché local ne permet plus de produire une shortlist crédible dans un délai compatible avec l’activité."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Animal Health", href: "/animal-health", description: "Page sectorielle santé animale." },
      { label: "Petfood", href: "/animal-health/petfood", description: "Verticale petfood et nutrition animale." }
    ],
    metaTitle: "Recrutement santé animale Marseille | SKS TALENTS",
    metaDescription:
      "Recrutement santé animale à Marseille pour cliniques vétérinaires, petcare, nutrition animale et fonctions corporate. Executive search, RPO et structuration RH."
  },
  {
    slug: "recruter-coo-biotech",
    title: "Recruter un COO biotech",
    kicker: "Expertise · COO biotech",
    heroTitle: "Recruter un COO biotech",
    heroDescription:
      "Le recrutement d’un COO biotech ne sert pas seulement à ajouter un dirigeant. Il sert à transformer une vision scientifique en système d’exécution, de process et de traction.",
    primaryKeyword: "recruter COO biotech",
    secondaryKeywords: [
      "chasse de tête COO biotech",
      "recrutement COO biotech",
      "executive search biotech",
      "recrutement dirigeants biotech"
    ],
    audience: "Fondateurs, boards, CEO et investisseurs biotech.",
    directAnswer:
      "Le bon COO biotech doit relier opérations, industrialisation, gouvernance, priorisation et rythme de croissance. Ce n’est pas un rôle générique de management.",
    businessImpact: [
      "Passer d’une organisation très fondatrice à une organisation plus robuste.",
      "Créer une vraie colonne vertébrale d’exécution entre science et business.",
      "Sécuriser les arbitrages quand la croissance s’accélère."
    ],
    sksApproach: [
      "Executive search ciblé sur les COO et rôles de leadership biotech.",
      "Calibration du contexte, du niveau d’autonomie et du mandat réel.",
      "Possible articulation avec Série A, Série B, scale-up et hiring plan."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recruter COO biotech",
      "chasse de tête biotech",
      "executive search santé",
      "leadership team biotech"
    ],
    faqTitle: "FAQ - Recruter un COO biotech",
    faqs: [
      {
        question: "Qu’est-ce qui distingue un COO biotech d’un COO plus généraliste ?",
        answer:
          "Sa capacité à comprendre les enjeux scientifiques, opérationnels, réglementaires et humains d’un environnement biotech en forte pression."
      },
      {
        question: "Quand une biotech doit-elle recruter ce rôle ?",
        answer:
          "Souvent à partir du moment où la complexité d’exécution dépasse ce que le CEO ou l’équipe fondatrice peut absorber directement."
      },
      {
        question: "Quel intérêt de lier ce recrutement à une lecture de marché ?",
        answer:
          "Parce que le bon COO biotech est rare et souvent déjà engagé dans une autre trajectoire de croissance."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Recrutement Série A biotech", href: "/recrutement-serie-a-biotech", description: "Contexte Série A biotech." },
      { label: "Life Sciences", href: "/life-sciences", description: "Page sectorielle Life Sciences." }
    ],
    metaTitle: "Recruter un COO biotech | SKS TALENTS",
    metaDescription:
      "Comment recruter un COO biotech. Executive search, calibration du rôle, signaux marché et décisions de croissance pour startups et scale-ups biotech."
  },
  {
    slug: "recruter-drh-sante",
    title: "Recruter un DRH santé",
    kicker: "Expertise · DRH santé",
    heroTitle: "Recruter un DRH santé",
    heroDescription:
      "Dans la santé, un DRH ne sert pas seulement à opérer l’administratif. Il structure la croissance, l’organisation, le pilotage managérial et la robustesse du système RH.",
    primaryKeyword: "recruter DRH santé",
    secondaryKeywords: [
      "recrutement DRH life sciences",
      "head of people santé",
      "recruter DRH startup santé",
      "structuration RH startup santé"
    ],
    audience: "CEO, COO, fondateurs et boards d’entreprises santé, biotech, healthtech et animal health.",
    directAnswer:
      "Le bon DRH santé apparaît quand le recrutement, l’onboarding, les managers et les process People commencent à conditionner directement la performance de l’entreprise.",
    businessImpact: [
      "Rendre les recrutements plus cohérents et plus lisibles.",
      "Structurer les process sans ralentir la croissance.",
      "Créer une base solide pour le scale-up et l’automatisation RH."
    ],
    sksApproach: [
      "Executive search sur DRH, Head of People et rôles RH structurants.",
      "Lien direct avec vos enjeux de RPO, structuration RH et automatisation.",
      "Lecture du bon niveau de séniorité selon le stade de l’entreprise."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recruter DRH santé",
      "head of people santé",
      "structuration RH startup santé",
      "automatisation processus RH santé"
    ],
    faqTitle: "FAQ - Recruter un DRH santé",
    faqs: [
      {
        question: "À partir de quand une entreprise santé a-t-elle besoin d’un vrai DRH ?",
        answer:
          "Quand la qualité du recrutement, la coordination managériale et les process People deviennent trop structurants pour rester portés de façon diffuse."
      },
      {
        question: "Quel lien entre DRH et automatisation RH ?",
        answer:
          "Un bon DRH ne remplace pas les process. Il choisit ce qui doit être cadré, automatisé, suivi et maintenu pour faire gagner du temps sans perdre le pilotage."
      },
      {
        question: "Faut-il recruter un DRH ou externaliser d’abord ?",
        answer:
          "Tout dépend du stade. Beaucoup d’équipes gagnent d’abord à structurer le recrutement et les process, puis à recruter le bon niveau de leadership RH."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Structuration RH startup santé",
        href: "/structuration-rh-startup-sante",
        description: "Page dédiée à la structuration RH."
      },
      {
        label: "Automatisation processus RH",
        href: "/automatisation-processus-rh-sante",
        description: "Page dédiée à l’automatisation RH."
      }
    ],
    metaTitle: "Recruter un DRH santé | SKS TALENTS",
    metaDescription:
      "Comment recruter un DRH santé ou Head of People. Structuration RH, scale-up, automatisation des process et executive search pour biotech, healthtech et animal health."
  },
  {
    slug: "chasse-de-tete-dirigeants-sante",
    title: "Chasse de tête dirigeants santé",
    kicker: "Expertise · Dirigeants santé",
    heroTitle: "Chasse de tête dirigeants santé",
    heroDescription:
      "SKS TALENTS intervient sur les recrutements dirigeants en santé quand le vrai enjeu devient la qualité de décision, la confidentialité du mandat et la lisibilité de la shortlist.",
    primaryKeyword: "chasse de tête dirigeants santé",
    secondaryKeywords: [
      "chasse de tête dirigeants santé paris",
      "executive search santé",
      "recrutement top management santé",
      "recrutement leadership team biotech"
    ],
    audience: "CEO, boards, actionnaires et comités de direction.",
    directAnswer:
      "La chasse de tête dirigeants santé sert à sécuriser des décisions qui modifient réellement la trajectoire d’une entreprise. Elle ne se limite pas à trouver des profils disponibles.",
    businessImpact: [
      "Mieux recruter sur des rôles à fort impact politique et business.",
      "Protéger la confidentialité et la qualité d’évaluation.",
      "Garder une shortlist décidable et non décorative."
    ],
    sksApproach: [
      "Approche executive search sur COO, CPO, DRH, directions commerciales et leadership de croissance.",
      "Lecture croisée marché, fonds, stade d’entreprise et attractivité du projet.",
      "Accompagnement de la décision jusqu’à la signature et à l’onboarding."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "chasse de tête dirigeants santé",
      "executive search santé",
      "recrutement top management santé",
      "qui recrute des dirigeants biotech"
    ],
    faqTitle: "FAQ - Chasse de tête dirigeants santé",
    faqs: [
      {
        question: "Quels dirigeants santé recrutez-vous ?",
        answer:
          "COO, CPO, DRH, directions commerciales, leaders d’exécution et certains rôles de direction métier à fort impact."
      },
      {
        question: "Pourquoi ne pas simplement publier une annonce ?",
        answer:
          "Parce que les meilleurs profils dirigeants sont rarement en recherche active et arbitrent surtout sur la qualité du projet, du board et de la trajectoire."
      },
      {
        question: "Quel lien entre chasse de tête et levée de fonds ?",
        answer:
          "Après financement, les décisions dirigeantes deviennent encore plus visibles et structurantes. L’erreur de casting coûte plus cher."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Executive search Life Sciences", href: "/executive-search-life-sciences", description: "Page dédiée executive search Life Sciences." },
      { label: "Recruter un COO biotech", href: "/recruter-coo-biotech", description: "Recrutement COO biotech." }
    ],
    metaTitle: "Chasse de tête dirigeants santé | SKS TALENTS",
    metaDescription:
      "Chasse de tête dirigeants santé pour COO, CPO, DRH et leadership biotech, healthtech, diagnostic et animal health. Executive search et shortlist décidable."
  },
  {
    slug: "executive-search-life-sciences",
    title: "Executive search Life Sciences",
    kicker: "Expertise · Executive search",
    heroTitle: "Executive search Life Sciences",
    heroDescription:
      "SKS TALENTS mène des mandats executive search Life Sciences sur des rôles dirigeants, opérations, people et business, là où les erreurs coûtent le plus cher.",
    primaryKeyword: "executive search life sciences",
    secondaryKeywords: [
      "executive search life sciences france",
      "chasse de tête biotech",
      "cabinet recrutement life sciences",
      "chasse de tête dirigeants santé"
    ],
    audience: "CEO, COO, DRH, comités de direction et boards Life Sciences.",
    directAnswer:
      "L’executive search Life Sciences n’est pas une simple version premium du recrutement. C’est une méthode pour lire un marché rare, produire une shortlist décidable et sécuriser une décision de croissance.",
    businessImpact: [
      "Réduire les erreurs de calibrage sur les rôles les plus coûteux.",
      "Mieux positionner le mandat sur le marché.",
      "Protéger le temps des dirigeants et des hiring managers."
    ],
    sksApproach: [
      "Focus biotech, diagnostic, healthtech, e-santé, robotique santé et environnements techniques adjacents.",
      "Shortlist référencée, cadrage du rôle, narration de l’opportunité et closing piloté.",
      "Possibilité d’enchaîner vers RPO ou structuration RH si le sujet dépasse un poste."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "executive search life sciences",
      "executive search santé",
      "chasse de tête biotech",
      "dirigeants santé"
    ],
    faqTitle: "FAQ - Executive search Life Sciences",
    faqs: [
      {
        question: "Quels postes relèvent vraiment de l’executive search ?",
        answer:
          "Les postes dirigeants, COO, CPO, DRH, leadership commercial, rôles de transformation ou mandats très exposés sur des marchés déjà pénuriques."
      },
      {
        question: "Pourquoi une shortlist décidable compte-t-elle autant ?",
        answer:
          "Parce que trop de profils différents allongent les arbitrages et dégradent la qualité de décision au lieu de l’améliorer."
      },
      {
        question: "Quand faut-il basculer de l’executive search vers du RPO ?",
        answer:
          "Quand le besoin ne porte plus sur un mandat isolé mais sur une série de recrutements à piloter comme un système."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Life Sciences", href: "/life-sciences", description: "Page sectorielle principale." },
      { label: "RPO Life Sciences", href: "/rpo-recrutement-life-sciences", description: "Quand le besoin dépasse un poste." }
    ],
    metaTitle: "Executive search Life Sciences | SKS TALENTS",
    metaDescription:
      "Executive search Life Sciences pour dirigeants, COO, CPO, DRH et rôles critiques. Shortlist décidable, lecture marché et exécution sectorielle."
  },
  {
    slug: "rpo-recrutement-life-sciences",
    title: "RPO recrutement Life Sciences",
    kicker: "Service · RPO",
    heroTitle: "RPO recrutement Life Sciences",
    heroDescription:
      "SKS TALENTS intervient en RPO quand une entreprise Life Sciences doit absorber plusieurs recrutements critiques sans construire seule toute la machine de recrutement.",
    primaryKeyword: "RPO recrutement life sciences",
    secondaryKeywords: [
      "recruitment process outsourcing santé",
      "externalisation recrutement santé",
      "externalisation processus recrutement",
      "sourcing talents life sciences"
    ],
    audience: "CEO, COO, DRH et équipes People en Seed, Série A, Série B ou scale-up.",
    directAnswer:
      "Le RPO recrutement Life Sciences sert à embarquer une capacité de recrutement dans l’entreprise sans renoncer à la lecture marché, au niveau d’exigence et au reporting.",
    businessImpact: [
      "Absorber un volume d’embauche sans diluer la qualité.",
      "Mieux coordonner managers, direction et équipe People.",
      "Construire un pipeline plus durable qu’un mandat isolé."
    ],
    sksApproach: [
      "Pilotage opérationnel du recrutement sur plusieurs rôles ou plusieurs équipes.",
      "Méthode, reporting, expérience candidat et coordination hiring managers / direction.",
      "Possibilité d’ajouter structuration RH et automatisation pour fiabiliser l’ensemble."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "RPO recrutement life sciences",
      "recruitment process outsourcing santé",
      "externalisation recrutement santé",
      "sourcing talents life sciences"
    ],
    faqTitle: "FAQ - RPO recrutement Life Sciences",
    faqs: [
      {
        question: "Quand faut-il activer du RPO ?",
        answer:
          "Quand plusieurs postes doivent être ouverts en parallèle, que le time-to-hire devient un sujet, ou que l’équipe interne n’a pas encore la capacité de pilotage suffisante."
      },
      {
        question: "Quelle différence entre RPO et cabinet de recrutement classique ?",
        answer:
          "Le cabinet traite souvent des mandats. Le RPO traite un système de recrutement : méthode, reporting, volume, expérience candidat et coordination interne."
      },
      {
        question: "Le RPO remplace-t-il la structuration RH ?",
        answer:
          "Non. Il peut la compléter, mais si la base process est fragile, il faut souvent traiter les deux ensemble."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Structuration RH", href: "/structuration-rh-startup-sante", description: "Structurer la fonction RH en parallèle du RPO." },
      { label: "Après levée de fonds", href: "/recrutement-apres-levee-de-fonds", description: "Page growth hiring." }
    ],
    metaTitle: "RPO recrutement Life Sciences | SKS TALENTS",
    metaDescription:
      "RPO recrutement Life Sciences : externaliser une capacité de recrutement pour biotech, diagnostic, healthtech et animal health sans perdre l’exigence sectorielle."
  },
  {
    slug: "externalisation-recrutement-sante",
    title: "Externalisation recrutement santé",
    kicker: "Service · Outsourcing",
    heroTitle: "Externalisation du recrutement santé",
    heroDescription:
      "Externaliser le recrutement santé ne veut pas dire perdre le contrôle. Cela veut dire fiabiliser méthode, rythme, pilotage et visibilité sur des postes critiques.",
    primaryKeyword: "externalisation recrutement santé",
    secondaryKeywords: [
      "externalisation processus recrutement",
      "recruitment process outsourcing santé",
      "RPO santé",
      "externalisation recrutement life sciences"
    ],
    audience: "Entreprises santé, biotech, diagnostic, e-santé et animal health souhaitant renforcer leur capacité de recrutement.",
    directAnswer:
      "L’externalisation du recrutement est pertinente quand la direction a besoin de garder une exigence élevée sans immobiliser toute l’organisation sur le pilotage du hiring.",
    businessImpact: [
      "Gagner en vitesse sans perdre en lisibilité.",
      "Réduire les frictions entre direction, RH et managers.",
      "Mieux absorber des pics d’embauche ou des mandats complexes."
    ],
    sksApproach: [
      "Approche RPO + executive search selon la nature du besoin.",
      "Pilotage, reporting, coordination et niveau d’exigence maintenus.",
      "Connexion possible avec automatisation RH et structuration de process."
    ],
    clusterLabel: "Requêtes couvertes",
    clusterItems: [
      "externalisation recrutement santé",
      "externalisation processus recrutement",
      "RPO recrutement life sciences",
      "recruitment process outsourcing santé"
    ],
    faqTitle: "FAQ - Externalisation du recrutement santé",
    faqs: [
      {
        question: "Pourquoi externaliser plutôt qu’internaliser ?",
        answer:
          "Parce qu’une entreprise n’a pas toujours intérêt à construire seule la capacité, les outils et le pilotage nécessaires pour absorber une phase intense de recrutements."
      },
      {
        question: "Quelle différence avec un simple cabinet de recrutement ?",
        answer:
          "L’externalisation traite la continuité du process, la méthode et le système, pas seulement la livraison d’un profil."
      },
      {
        question: "Quel lien avec l’automatisation RH ?",
        answer:
          "L’externalisation fonctionne mieux quand les workflows, feedback loops et étapes répétitives sont clarifiés puis automatisés au bon niveau."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "RPO Life Sciences", href: "/rpo-recrutement-life-sciences", description: "Page dédiée au RPO." },
      { label: "Automatisation RH", href: "/automatisation-processus-rh-sante", description: "Automatiser les process qui ralentissent." }
    ],
    metaTitle: "Externalisation recrutement santé | SKS TALENTS",
    metaDescription:
      "Externalisation du recrutement santé pour biotech, diagnostic, healthtech et animal health. RPO, executive search et structuration des process RH."
  },
  {
    slug: "vivier-talents-life-sciences",
    title: "Vivier talents Life Sciences",
    kicker: "Positionnement · Talents",
    heroTitle: "Construire un vivier de talents Life Sciences",
    heroDescription:
      "Un vivier de talents Life Sciences ne se résume pas à une base de CV. Il se construit sur des signaux marché, des rôles bien calibrés, du contenu utile et une approche directe crédible.",
    primaryKeyword: "vivier talents life sciences",
    secondaryKeywords: [
      "sourcing talents life sciences",
      "pipeline talents biotech",
      "vivier candidats healthtech",
      "recrutement profils rares santé"
    ],
    audience: "CEO, DRH, CPO et équipes recrutement souhaitant améliorer leur pipeline talent.",
    directAnswer:
      "Si votre vivier de talents n’est pas structuré, chaque nouveau recrutement repart de zéro. L’enjeu est de créer un système plus durable, pas seulement une base de données.",
    businessImpact: [
      "Réduire la dépendance aux recherches de dernière minute.",
      "Mieux capitaliser sur la réputation sectorielle du cabinet et du site.",
      "Augmenter la vitesse de mise en mouvement sur les profils rares."
    ],
    sksApproach: [
      "Relier marché, contenus, signaux funding, écoles, événements et approche directe.",
      "Capitaliser sur les pages métiers, salaires, fonds et hubs déjà présents sur le site.",
      "Transformer la recherche organique en pipeline relationnel utile."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "vivier talents life sciences",
      "sourcing talents life sciences",
      "pipeline candidats biotech",
      "recrutement profils rares santé"
    ],
    faqTitle: "FAQ - Vivier de talents Life Sciences",
    faqs: [
      {
        question: "Un vivier de talents suffit-il à recruter plus vite ?",
        answer:
          "Non. Il faut aussi un rôle clair, un process propre et une proposition de valeur lisible pour transformer le vivier en shortlist."
      },
      {
        question: "Quel lien entre SEO et vivier de talents ?",
        answer:
          "Vos contenus métiers, salaires, fonds, écosystème et pages sectorielles servent aussi à nourrir la crédibilité du site et à attirer les bons signaux."
      },
      {
        question: "Quel rôle pour l’approche directe ?",
        answer:
          "Elle reste indispensable, car les meilleurs profils ne viennent pas toujours d’eux-mêmes, même quand le contenu du site est solide."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Job roles", href: "/job-roles", description: "Bibliothèque métiers du site." },
      { label: "Écosystème", href: "/ecosystem", description: "Écoles, fonds, clusters, médias et événements." }
    ],
    metaTitle: "Vivier talents Life Sciences | SKS TALENTS",
    metaDescription:
      "Comment construire un vivier de talents Life Sciences utile : sourcing, SEO, contenus, approche directe et structuration du pipeline candidat."
  },
  {
    slug: "recrutement-profils-rares-sante",
    title: "Recrutement profils rares santé",
    kicker: "Positionnement · Profils rares",
    heroTitle: "Recrutement de profils rares en santé",
    heroDescription:
      "SKS TALENTS intervient sur des recrutements santé où le coût de l’erreur, la rareté du marché et la pression d’exécution rendent une approche générique inefficace.",
    primaryKeyword: "recrutement profils rares santé",
    secondaryKeywords: [
      "recrutement talents santé",
      "profils rares life sciences",
      "chasse de tête santé",
      "recrutement deeptech santé"
    ],
    audience: "Dirigeants et RH confrontés à des métiers rares ou des mandats stratégiques.",
    directAnswer:
      "Recruter un profil rare en santé suppose de mieux cadrer le rôle, de mieux lire le marché et de produire une shortlist plus resserrée, plus crédible et plus décidable.",
    businessImpact: [
      "Réduire le temps perdu sur des candidats insuffisamment calibrés.",
      "Améliorer la qualité d’évaluation sur des profils très sollicités.",
      "Mieux articuler attractivité, exigence et prise de décision."
    ],
    sksApproach: [
      "Approche executive search sur les profils et mandats les plus exposés.",
      "Lecture croisée secteur, stade, concurrence et signaux financement.",
      "Possibilité d’étendre ensuite en RPO ou structuration RH."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "recrutement profils rares santé",
      "recrutement talents santé",
      "recrutement deeptech santé",
      "recrutement diagnostic ivd"
    ],
    faqTitle: "FAQ - Recrutement de profils rares en santé",
    faqs: [
      {
        question: "Pourquoi les profils rares ne postulent-ils pas ?",
        answer:
          "Parce qu’ils sont déjà en poste, très sollicités et arbitrent davantage sur la crédibilité du projet que sur l’existence d’une offre."
      },
      {
        question: "Comment rendre une shortlist décidable sur un marché rare ?",
        answer:
          "En resserrant le mandat, en réduisant les profils trop éloignés et en rendant visibles les vrais critères d’arbitrage."
      },
      {
        question: "Quel lien avec l’executive search ?",
        answer:
          "L’executive search est souvent le bon format dès que la rareté, la sensibilité politique ou la confidentialité du mandat augmentent."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Executive search Life Sciences", href: "/executive-search-life-sciences", description: "Mandats dirigeants et rôles critiques." },
      { label: "Chasse de tête dirigeants santé", href: "/chasse-de-tete-dirigeants-sante", description: "Page dédiée dirigeants santé." }
    ],
    metaTitle: "Recrutement profils rares santé | SKS TALENTS",
    metaDescription:
      "Recrutement de profils rares en santé : executive search, lecture marché, shortlist décidable et approche directe pour biotech, diagnostic, healthtech et animal health."
  },
  {
    slug: "structuration-rh-startup-sante",
    title: "Structuration RH startup santé",
    kicker: "People Ops · Structuration RH",
    heroTitle: "Structuration RH pour startup santé",
    heroDescription:
      "Quand les recrutements s’accélèrent, la structuration RH devient un sujet de performance. SKS TALENTS aide les startups santé à poser un socle clair pour embaucher, onboarder et décider mieux.",
    primaryKeyword: "structuration RH startup santé",
    secondaryKeywords: [
      "structuration rh healthtech",
      "structuration rh biotech",
      "people ops startup santé",
      "recrutement startup santé croissance",
      "comment structurer une équipe en croissance",
      "quand faut-il structurer ses RH"
    ],
    audience: "Fondateurs, COO, CPO, DRH et dirigeants de startups santé en croissance.",
    directAnswer:
      "La structuration RH ne vient pas après le recrutement. Elle permet au recrutement de tenir. Le problème des RH aujourd’hui n’est pas le manque d’outils, c’est le manque de structuration. Sans socle process, les embauches suivantes deviennent plus lentes, plus fragiles et plus coûteuses.",
    businessImpact: [
      "Clarifier les rôles, process et responsabilités.",
      "Rendre le recrutement plus cohérent d’un poste à l’autre.",
      "Préparer l’automatisation des tâches répétitives sans dégrader l’expérience humaine.",
      "Éviter qu’un CEO ou COO perde plusieurs heures par semaine sur des sujets RH mal structurés."
    ],
    sksApproach: [
      "Audit People et priorisation 30-90 jours selon la taille de l’entreprise.",
      "Mise en place d’outils, automatisations, rituels et process pour gagner du temps RH.",
      "Connexion directe avec executive search et RPO sur les phases de croissance.",
      "Lecture concrète du coût de l’inaction : lenteur recrutement, surcharge admin, faible rétention."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "structuration RH startup santé",
      "structuration rh biotech",
      "people ops startup santé",
      "automatisation processus RH"
    ],
    marketContext:
      "Dans un marché composé d’environ 2 800 entreprises HealthTech en France, dont un tiers a moins de 5 ans, la croissance se construit souvent avec une organisation encore jeune. Quand 64% des dépenses et 39% des effectifs restent concentrés sur la R&D, le risque est clair : vous investissez dans votre produit, mais pas assez dans votre organisation.",
    faqTitle: "FAQ - Structuration RH startup santé",
    faqs: [
      {
        question: "Quand faut-il structurer la fonction RH dans une startup santé ?",
        answer:
          "Dès que le recrutement, l’onboarding et la coordination managériale commencent à consommer trop de temps ou à dégrader la qualité de décision."
      },
      {
        question: "Quel lien entre structuration RH et recrutement ?",
        answer:
          "Un meilleur socle RH augmente la qualité du brief, réduit les frictions internes et rend les prochains recrutements plus rapides et plus tenables."
      },
      {
        question: "La structuration RH remplace-t-elle le RPO ?",
        answer:
          "Non. Le RPO augmente la capacité d’exécution. La structuration RH rend cette capacité durable."
      },
      {
        question: "À quel moment faut-il structurer les RH dans une startup santé ?",
        answer:
          "Dès que l’entreprise passe ses premiers recrutements stratégiques ou entre dans une phase de 10 à 50 employés. C’est souvent à ce moment que les frictions RH commencent à freiner la croissance."
      },
      {
        question: "Comment savoir si les RH font perdre du temps ou de l’argent ?",
        answer:
          "Les signaux sont concrets : recrutement lent malgré beaucoup de CV, surcharge administrative côté dirigeants, onboarding inégal, faible rétention et décisions RH qui reposent sur l’urgence plutôt que sur un process clair."
      },
      {
        question: "Quels sont les premiers process RH à mettre en place ?",
        answer:
          "Le trio prioritaire est simple : process de recrutement, onboarding et suivi de performance. Sans ces trois briques, la croissance devient vite plus coûteuse et plus fragile."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "RPO Life Sciences", href: "/rpo-recrutement-life-sciences", description: "Page RPO dédiée." },
      { label: "Automatisation RH", href: "/automatisation-processus-rh-sante", description: "Page automatisation RH." }
    ],
    metaTitle: "Structuration RH startup santé | SKS TALENTS",
    metaDescription:
      "Structuration RH pour startup santé, biotech ou healthtech : audit, process, automatisation, onboarding et lien direct avec le recrutement et le scale-up."
  },
  {
    slug: "automatisation-processus-rh-sante",
    title: "Automatisation processus RH santé",
    kicker: "People Ops · Automatisation",
    heroTitle: "Automatisation des processus RH en santé",
    heroDescription:
      "Les entreprises santé qui grandissent n’ont pas seulement besoin de recruter. Elles doivent aussi automatiser ce qui ralentit le recrutement, les validations, l’onboarding et la coordination People.",
    primaryKeyword: "automatisation processus RH santé",
    secondaryKeywords: [
      "automatisation RH startup santé",
      "people ops automation santé",
      "automatisation recrutement life sciences",
      "process recrutement scale-up santé",
      "comment automatiser le recrutement",
      "quels outils pour automatiser les RH"
    ],
    audience: "CEO, COO, DRH, CPO et équipes People des entreprises santé en croissance.",
    directAnswer:
      "Automatiser les processus RH ne veut pas dire déshumaniser le recrutement. Cela veut dire retirer les frictions répétitives pour que l’équipe se concentre sur la décision, l’évaluation et l’expérience candidat. Automatiser sans structurer ne résout rien.",
    businessImpact: [
      "Réduire le temps perdu sur les étapes répétitives.",
      "Améliorer le suivi pipeline, les relances et la coordination interne.",
      "Faire tenir plus longtemps la qualité du recrutement pendant le scale-up.",
      "Rendre l’automatisation utile pour un CEO, un COO ou un DRH sans créer une usine à gaz."
    ],
    sksApproach: [
      "Identifier ce qui doit être automatisé et ce qui doit rester humain.",
      "Relier outils, process RH, recrutement et gouvernance managériale.",
      "Intégrer cette couche à une logique RPO ou structuration RH quand nécessaire.",
      "Faire apparaître rapidement les gains concrets : temps récupéré, qualité de suivi, réduction des erreurs."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "automatisation processus RH santé",
      "automatisation RH startup santé",
      "people ops automation santé",
      "process recrutement scale-up santé"
    ],
    marketContext:
      "81% des entreprises externalisent déjà certaines activités, et 92% en biotech. Ce réflexe montre souvent moins un excès d’outils qu’un manque de process interne. L’automatisation devient utile quand elle remet de la fluidité dans le système, pas quand elle ajoute une couche technique de plus.",
    faqTitle: "FAQ - Automatisation des processus RH en santé",
    faqs: [
      {
        question: "Quels process RH automatiser en priorité ?",
        answer:
          "Le suivi pipeline, les relances, certaines validations, le reporting recrutement, les tâches d’onboarding répétitives et la circulation des feedbacks."
      },
      {
        question: "Quel lien entre automatisation RH et recrutement ?",
        answer:
          "Un process plus fluide raccourcit les délais, réduit la fatigue interne et protège l’expérience candidat sur des marchés déjà pénuriques."
      },
      {
        question: "Pourquoi ce sujet intéresse-t-il aussi les dirigeants ?",
        answer:
          "Parce que lorsque la croissance accélère, les gains de vitesse viennent souvent autant des process que du sourcing lui-même."
      },
      {
        question: "Quelles tâches RH peut-on automatiser immédiatement ?",
        answer:
          "Le sourcing initial, le tri, les relances, le suivi candidat, certaines étapes d’onboarding, le reporting RH et les workflows administratifs répétitifs sont généralement les premiers gisements de temps."
      },
      {
        question: "L’automatisation RH est-elle rentable pour une PME ou une startup ?",
        answer:
          "Oui, si elle vise les tâches à faible valeur ajoutée. Le ROI vient surtout du temps récupéré, de la baisse des erreurs, d’un meilleur time-to-hire et d’une équipe dirigeante moins absorbée par l’administratif."
      },
      {
        question: "Comment automatiser sans déshumaniser ?",
        answer:
          "En automatisant les tâches répétitives tout en gardant l’humain sur les moments clés : entretien, évaluation, décision, onboarding et management. L’objectif est de retirer de la friction, pas la relation."
      },
      {
        question: "Combien de temps un dirigeant peut-il récupérer grâce à l’automatisation RH ?",
        answer:
          "Cela dépend du volume de recrutement et du niveau de structuration existant, mais le gain devient vite visible quand les relances, validations et reportings cessent de monopoliser les fondateurs et managers."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Structuration RH startup santé", href: "/structuration-rh-startup-sante", description: "Page structuration RH." },
      { label: "Recrutement après levée de fonds", href: "/recrutement-apres-levee-de-fonds", description: "Croissance, recrutement et process." }
    ],
    metaTitle: "Automatisation des processus RH santé | SKS TALENTS",
    metaDescription:
      "Automatisation des processus RH en santé, biotech et healthtech : recrutement, onboarding, suivi pipeline et People Ops pour gagner du temps sans perdre la qualité."
  },
  {
    slug: "bpifrance-biotech-medtech",
    title: "Bpifrance biotech medtech",
    kicker: "SEO source · Bpifrance",
    heroTitle: "Bpifrance biotech medtech : comment lire les bons signaux",
    heroDescription:
      "Une page SKS TALENTS pour transformer les contenus Bpifrance en lecture utile pour dirigeants, RH et candidats : véhicules biotech et medtech, tours Seed / Série A / Série B, et impacts recrutement.",
    primaryKeyword: "bpifrance biotech medtech",
    secondaryKeywords: [
      "bpifrance biotech",
      "bpifrance medtech",
      "innobio 2",
      "fonds biotech france",
      "fonds medtech france"
    ],
    audience:
      "CEO, COO, DRH, fondateurs, candidats et analystes qui veulent utiliser Bpifrance comme source marché sans sur-interpréter les données.",
    directAnswer:
      "Si vous cherchez Bpifrance sur la biotech et la medtech, le vrai sujet n’est pas seulement de connaître le nom des véhicules. Il faut comprendre quels signaux sont utiles pour lire un marché, qualifier une phase de financement et anticiper où se créent les prochains besoins de structuration, de recrutement et d’exécution.",
    businessImpact: [
      "Lire plus clairement les environnements Seed, Série A et Série B.",
      "Relier financement public, croissance et besoins d’équipes critiques.",
      "Éviter les raccourcis entre présence d’un fonds et réalité du hiring.",
      "Transformer une source institutionnelle en lecture dirigeant réellement exploitable."
    ],
    sksApproach: [
      "Traiter Bpifrance comme une plateforme à plusieurs véhicules, pas comme un bloc homogène.",
      "Séparer les faits officiels, les signaux marché et ce qui reste à vérifier société par société.",
      "Relier chaque signal funding aux vraies questions de structuration, de time-to-hire et de leadership.",
      "Utiliser Bpifrance comme porte d’entrée vers les pages fonds, les pages croissance et les contenus hiring."
    ],
    clusterLabel: "Requêtes et angles couverts",
    clusterItems: [
      "Bpifrance biotech",
      "Bpifrance medtech",
      "InnoBio 2",
      "fonds biotech France",
      "fonds medtech France",
      "Seed Série A Série B"
    ],
    marketContext:
      "Bpifrance est une source utile pour documenter les véhicules, leur mandat et le cadre de financement. Ce n’est pas une preuve directe de volume de recrutement. La bonne lecture consiste à relier financement, exécution et maturité organisationnelle.",
    faqTitle: "FAQ - Bpifrance biotech medtech",
    faqs: [
      {
        question: "Pourquoi Bpifrance intéresse-t-il aussi les RH et les dirigeants ?",
        answer:
          "Parce que ses véhicules et ses contenus donnent un signal sur les segments financés, la maturité des entreprises et les contextes où les rôles critiques deviennent décisifs."
      },
      {
        question: "Que faut-il regarder en priorité sur Bpifrance ?",
        answer:
          "Le mandat du véhicule, le stade ciblé, les secteurs couverts et la logique d’intervention. Ce sont ces éléments qui aident ensuite à relier financement, structuration et besoins d’équipe."
      },
      {
        question: "Peut-on déduire les recrutements d’une page Bpifrance ?",
        answer:
          "Non, pas directement. Bpifrance sert d’abord à cadrer un environnement d’investissement. Les besoins de recrutement doivent ensuite être validés entreprise par entreprise."
      },
      {
        question: "Pourquoi SKS TALENTS traite-t-il cette source ?",
        answer:
          "Parce que les dirigeants et RH cherchent souvent à comprendre où se créent les prochains besoins après un tour de table. Une lecture source-first améliore à la fois le SEO, les réponses LLM et la qualité des décisions."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Profil Bpifrance Biotech & Medtech",
        href: "/investment-funds/bpifrance-biotech",
        description: "Fiche source-first du véhicule et de la plateforme."
      },
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Hub vérifié pour les fonds santé, biotech, medtech et animal health."
      },
      {
        label: "Recrutement après levée de fonds",
        href: "/recrutement-apres-levee-de-fonds",
        description: "Relier tour de table, structuration et hiring critique."
      }
    ],
    metaTitle: "Bpifrance biotech medtech | lecture fonds & hiring | SKS TALENTS",
    metaDescription:
      "Bpifrance biotech medtech : une lecture claire des véhicules, du cadre Seed / Série A / Série B et de leurs implications recrutement, RH et croissance."
  },
  {
    slug: "france-biotech-panorama-healthtech",
    title: "France Biotech panorama France HealthTech",
    kicker: "SEO source · France Biotech",
    heroTitle: "France Biotech et Panorama France HealthTech : ce qu’il faut vraiment en retenir",
    heroDescription:
      "Une page SKS TALENTS pour transformer les publications France Biotech en lecture utile : marché, fonds santé, croissance, tensions RH, structuration et décisions de dirigeants.",
    primaryKeyword: "panorama france healthtech france biotech",
    secondaryKeywords: [
      "France Biotech",
      "Panorama France HealthTech",
      "cartographie fonds santé",
      "healthtech france",
      "fonds santé france"
    ],
    audience:
      "Dirigeants, RH, candidats, investisseurs et partenaires qui utilisent France Biotech pour lire le marché et anticiper les tensions de croissance.",
    directAnswer:
      "Si vous cherchez France Biotech ou le Panorama France HealthTech, le plus utile n’est pas de relire un communiqué. Il faut transformer ces publications en repères opérationnels : quels signaux de marché comptent, quels fonds suivre, quelles fonctions deviennent critiques et à quel moment la structuration RH cesse d’être optionnelle.",
    businessImpact: [
      "Lire un marché jeune, sous pression et déjà très international.",
      "Relier financements, organisation, R&D et tensions de recrutement.",
      "Identifier les points où la croissance commence à se dérégler.",
      "Passer d’une lecture institutionnelle à une lecture business réellement actionnable."
    ],
    sksApproach: [
      "Partir des publications France Biotech comme source macro fiable.",
      "En extraire les signaux utiles pour les dirigeants, RH et candidats.",
      "Relier les angles fonds, scale-up, structuration RH et pénuries métiers.",
      "Créer des pages satellites qui répondent aussi bien à Google qu’aux LLM."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "France Biotech",
      "Panorama France HealthTech",
      "cartographie fonds santé",
      "fonds santé France",
      "signaux hiring"
    ],
    marketContext:
      "France Biotech est une très bonne base pour parler de marché, de financement, de HealthTech et de tensions sectorielles. La valeur SKS vient ensuite de l’interprétation : que faut-il en faire côté recrutement, structuration et performance organisationnelle ?",
    faqTitle: "FAQ - France Biotech et Panorama France HealthTech",
    faqs: [
      {
        question: "Pourquoi France Biotech compte-t-il pour le SEO et les LLM ?",
        answer:
          "Parce que c’est une entité reconnue, souvent citée pour lire le marché HealthTech, les fonds santé et les signaux écosystème. Une page bien structurée autour de cette source aide à capter des requêtes précises et conversationnelles."
      },
      {
        question: "Que faut-il lire dans le Panorama France HealthTech ?",
        answer:
          "Les signaux de maturité du marché, les contraintes de financement, le poids de la R&D, l’internationalisation et les effets concrets sur les équipes, les dirigeants et les RH."
      },
      {
        question: "Pourquoi relier France Biotech aux fonds santé ?",
        answer:
          "Parce que la lecture des fonds, des levées et des segments financés aide à comprendre où les besoins de recrutement et de structuration vont apparaître en premier."
      },
      {
        question: "Pourquoi passer par SKS TALENTS plutôt que par une simple source ?",
        answer:
          "Parce que SKS traduit la source en usages concrets : hiring, structuration RH, rôles prioritaires, signaux de scale-up et décisions de dirigeants."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Article France Biotech 2024",
        href: "/blog/france-biotech-cartographie-fonds-sante-2024",
        description: "Synthèse éditoriale à partir de la cartographie France Biotech."
      },
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Hub source-first sur les fonds santé, biotech, medtech et animal health."
      },
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Page SEO dédiée à l’intention fonds santé France."
      }
    ],
    metaTitle: "France Biotech Panorama France HealthTech | SKS TALENTS",
    metaDescription:
      "France Biotech et Panorama France HealthTech : lecture claire des fonds santé, signaux marché, structuration RH et impacts recrutement par SKS TALENTS."
  },
  {
    slug: "fonds-sante-france",
    title: "Fonds santé France",
    kicker: "SEO source · Fonds santé",
    heroTitle: "Fonds santé France : qui suivre et pourquoi cela compte pour vos recrutements",
    heroDescription:
      "Une page SKS TALENTS pour relier fonds santé, biotech, medtech, digital health et Animal Health aux vrais sujets de croissance : structuration, rôles critiques, timing et exécution.",
    primaryKeyword: "fonds santé france",
    secondaryKeywords: [
      "fonds biotech france",
      "investisseurs healthtech france",
      "france biotech fonds santé",
      "angels santé",
      "seventure partners",
      "kurma partners"
    ],
    audience:
      "CEO, COO, DRH, candidats, investisseurs et observateurs qui cherchent à comprendre quels fonds suivre et ce que cela change pour les équipes.",
    directAnswer:
      "Si vous cherchez des fonds santé en France, le plus utile n’est pas une liste brute. Il faut comprendre quels acteurs suivre, comment les relier aux segments biotech, medtech, digital health et Animal Health, et surtout comment ces signaux de financement se traduisent ensuite en besoins de recrutement, de leadership et de structuration.",
    businessImpact: [
      "Identifier les environnements où les besoins d’équipe se déclenchent après financement.",
      "Relier fonds, tours de table et priorités de recrutement.",
      "Mieux lire les signaux Seed, Série A et Série B pour décider plus vite.",
      "Utiliser les fonds comme lecture marché, pas seulement comme annuaire financier."
    ],
    sksApproach: [
      "Qualifier les fonds à partir de sources officielles et d’acteurs reconnus.",
      "Faire le lien entre fonds, marché, scale-up et tension métier.",
      "Orienter ensuite vers les bonnes pages : annuaire, article, ressources, recrutement après levée.",
      "Garder une méthode anti-hallucination pour ne pas confondre funding et hiring réel."
    ],
    clusterLabel: "Fonds et acteurs à suivre",
    clusterItems: [
      "fonds santé France",
      "fonds biotech France",
      "investisseurs healthtech France",
      "Angels Santé",
      "Seventure Partners",
      "Kurma Partners",
      "Jeito Capital"
    ],
    marketContext:
      "Les fonds sont un signal de marché fort, mais ils n’expliquent pas tout. Ce qui intéresse SKS TALENTS, c’est ce qui vient après : structuration, priorisation des rôles, pression sur les dirigeants et qualité d’exécution du recrutement.",
    faqTitle: "FAQ - Fonds santé France",
    faqs: [
      {
        question: "Pourquoi suivre les fonds santé quand on recrute ?",
        answer:
          "Parce qu’ils signalent souvent les phases où une entreprise doit renforcer son leadership, ses opérations, sa commercialisation ou ses fonctions de support."
      },
      {
        question: "Quelle différence entre liste de fonds et ressource utile ?",
        answer:
          "Une simple liste informe. Une ressource utile relie chaque fonds à un segment, un stade, une logique de croissance et des implications recrutement ou organisation."
      },
      {
        question: "Quels acteurs faut-il surveiller en priorité ?",
        answer:
          "France Biotech, Bpifrance, Angels Santé, Seventure Partners, Kurma Partners, Jeito Capital et les autres gestionnaires déjà présents dans notre annuaire sont de bons points d’entrée."
      },
      {
        question: "Pourquoi cette page est-elle utile aux LLM ?",
        answer:
          "Parce qu’elle répond en langage clair à une requête fréquente, structure les entités, relie les sources et donne un angle business réutilisable dans les réponses IA."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Hub vérifié avec fiches fonds et méthode anti-hallucination."
      },
      {
        label: "Hub fonds santé",
        href: "/market-hubs/fonds-sante",
        description: "Hub thématique pour maillage, fonds, levées et signaux hiring."
      },
      {
        label: "France Biotech et Panorama",
        href: "/france-biotech-panorama-healthtech",
        description: "Lecture business des publications France Biotech."
      }
    ],
    metaTitle: "Fonds santé France | biotech, healthtech, hiring | SKS TALENTS",
    metaDescription:
      "Fonds santé France : biotech, medtech, digital health, France Biotech, Bpifrance et signaux de recrutement post-financement vus par SKS TALENTS."
  },
  {
    slug: "angels-sante-business-angels-sante",
    title: "Angels Santé business angels santé",
    kicker: "SEO source · Angels Santé",
    heroTitle: "Angels Santé : comment lire un réseau de business angels santé",
    heroDescription:
      "Une page SKS TALENTS pour transformer les signaux Angels Santé en lecture utile sur l’amorçage biotech, medtech et e-santé, puis en réflexion concrète sur la croissance des équipes.",
    primaryKeyword: "angels santé business angels santé",
    secondaryKeywords: [
      "Angels Santé",
      "business angels santé",
      "investisseurs santé France",
      "amorçage healthtech",
      "fonds santé early stage"
    ],
    audience:
      "Fondateurs, dirigeants, RH, candidats et observateurs qui cherchent à lire l’amorçage santé avec plus de précision.",
    directAnswer:
      "Si vous cherchez Angels Santé, le sujet n’est pas seulement de savoir qui investit. Il faut comprendre ce que signifie un signal d’amorçage santé pour une startup : priorisation des rôles, pression de structuration, qualité du leadership et rythme des premières décisions recrutement.",
    businessImpact: [
      "Lire plus tôt les environnements où les équipes vont devoir se structurer.",
      "Relier amorçage, premières embauches et exigences de crédibilité marché.",
      "Mieux distinguer signal écosystème et hiring réellement confirmé.",
      "Transformer une recherche investisseur en lecture business exploitable."
    ],
    sksApproach: [
      "Utiliser Angels Santé comme signal early-stage santé fiable.",
      "Séparer le niveau réseau de business angels et le niveau startup.",
      "Relier le financement d’amorçage à la réalité des premiers recrutements critiques.",
      "Orienter ensuite vers l’annuaire fonds, les pages growth et les contenus recrutement."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Angels Santé",
      "business angels santé",
      "investisseurs santé France",
      "amorçage healthtech",
      "startup santé financée"
    ],
    marketContext:
      "Angels Santé est particulièrement utile pour lire l’amorçage. À ce stade, le bon enjeu n’est pas seulement de lever, mais de savoir quand structurer, qui recruter en premier et comment éviter que le dirigeant absorbe tout.",
    faqTitle: "FAQ - Angels Santé",
    faqs: [
      {
        question: "Pourquoi Angels Santé est-il utile au SEO et aux LLM ?",
        answer:
          "Parce qu’il s’agit d’une entité claire, identifiable, souvent recherchée sur les sujets santé et amorçage. Une page dédiée aide à capter ces requêtes en les reliant à des enjeux business concrets."
      },
      {
        question: "Peut-on déduire les recrutements d’une startup depuis Angels Santé ?",
        answer:
          "Non, pas directement. Le réseau donne un signal d’écosystème et d’investissement. Les besoins de recrutement doivent toujours être validés startup par startup."
      },
      {
        question: "Pourquoi cette page intéresse aussi les RH ?",
        answer:
          "Parce que l’amorçage est souvent le moment où les erreurs de séquencement coûtent le plus cher. Savoir quand poser un premier socle de recrutement ou de structuration devient déterminant."
      },
      {
        question: "Pourquoi SKS TALENTS traite ce sujet ?",
        answer:
          "Parce que les recherches source-first sur Angels Santé peuvent devenir des points d’entrée qualifiés vers des besoins de structuration, de recrutement ou de lecture marché."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Profil Angels Santé",
        href: "/investment-funds/angels-sante",
        description: "Fiche source-first sur le réseau et son positionnement early-stage."
      },
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Relier Angels Santé aux autres acteurs du financement santé."
      },
      {
        label: "Recrutement après levée de fonds",
        href: "/recrutement-apres-levee-de-fonds",
        description: "Lire ce que le financement change vraiment côté équipes."
      }
    ],
    metaTitle: "Angels Santé | business angels santé et hiring | SKS TALENTS",
    metaDescription:
      "Angels Santé : lecture claire du réseau de business angels santé, de l’amorçage biotech / medtech / e-santé et des implications recrutement vues par SKS TALENTS."
  },
  {
    slug: "seventure-partners-life-sciences",
    title: "Seventure Partners life sciences",
    kicker: "SEO source · Seventure",
    heroTitle: "Seventure Partners : comment relier fonds Life Sciences et besoins d’équipe",
    heroDescription:
      "Une page SKS TALENTS pour utiliser Seventure Partners comme signal de marché sur les Life Sciences, la nutrition, le microbiome et les environnements en croissance où les recrutements deviennent structurants.",
    primaryKeyword: "seventure partners life sciences",
    secondaryKeywords: [
      "Seventure Partners",
      "Seventure life sciences",
      "VC santé Paris",
      "microbiome biotech",
      "fonds biotech france"
    ],
    audience:
      "CEO, COO, RH, candidats et analystes qui veulent lire Seventure comme un signal de marché, pas seulement comme un nom de VC.",
    directAnswer:
      "Si vous cherchez Seventure Partners, la vraie question est moins ‘qui investit ?’ que ‘que dit ce type d’acteur sur les segments en tension, les entreprises qui se structurent et les environnements où un recrutement raté coûte vite cher ?’",
    businessImpact: [
      "Mieux lire les segments Life Sciences activement financés.",
      "Relier VC, trajectoire produit et montée en complexité des équipes.",
      "Repérer les contextes où leadership, opérations et people deviennent critiques.",
      "Transformer une requête investisseur en lecture recrutement et structuration."
    ],
    sksApproach: [
      "Utiliser Seventure comme signal de thèse et de segment.",
      "Éviter de confondre portfolio et hiring confirmé.",
      "Relier les signaux VC à des logiques concrètes de scale-up et de recrutement.",
      "Créer un pont entre l’univers fonds et les décisions RH / dirigeant."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Seventure Partners",
      "Seventure life sciences",
      "VC santé Paris",
      "microbiome biotech",
      "fonds biotech France"
    ],
    marketContext:
      "Seventure est particulièrement utile pour relier investissement, segments biotech et signaux de marché. La valeur SKS consiste ensuite à faire le pont vers les sujets d’organisation, de leadership et de recrutement.",
    faqTitle: "FAQ - Seventure Partners",
    faqs: [
      {
        question: "Pourquoi Seventure Partners intéresse-t-il aussi les RH ?",
        answer:
          "Parce qu’un fonds ou un VC donne un signal sur les segments qui montent en intensité, donc sur les environnements où les besoins d’équipe vont devenir plus visibles."
      },
      {
        question: "Que faut-il lire dans un acteur comme Seventure ?",
        answer:
          "Sa thèse, ses segments, ses exemples de portefeuille et le type de stade visé. Ce sont ces éléments qui aident à comprendre où les tensions de recrutement vont apparaître."
      },
      {
        question: "Peut-on utiliser Seventure pour parler hiring ?",
        answer:
          "Oui comme point d’entrée marché, non comme preuve suffisante. Le hiring doit toujours être validé entreprise par entreprise."
      },
      {
        question: "Pourquoi une page dédiée aide-t-elle le référencement ?",
        answer:
          "Parce qu’elle associe l’entité recherchée à une intention claire, un angle business et un maillage fort vers les autres contenus fonds, growth et recrutement du site."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Profil Seventure Partners",
        href: "/investment-funds/seventure-partners",
        description: "Fiche source-first sur Seventure et ses signaux marché."
      },
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Relier Seventure aux autres acteurs du financement santé."
      },
      {
        label: "Structuration RH startup santé",
        href: "/structuration-rh-startup-sante",
        description: "Faire le pont entre croissance financée et organisation."
      }
    ],
    metaTitle: "Seventure Partners | life sciences, VC santé, hiring | SKS TALENTS",
    metaDescription:
      "Seventure Partners : lecture claire des signaux Life Sciences, VC santé, segments en croissance et implications recrutement / structuration par SKS TALENTS."
  },
  {
    slug: "kurma-partners-biotech-healthtech",
    title: "Kurma Partners biotech healthtech",
    kicker: "SEO source · Kurma",
    heroTitle: "Kurma Partners : comment lire ce signal biotech et healthtech",
    heroDescription:
      "Une page SKS TALENTS pour transformer une recherche Kurma Partners en lecture utile du marché, des fonds santé et des contextes où la structuration et les rôles critiques deviennent prioritaires.",
    primaryKeyword: "kurma partners biotech healthtech",
    secondaryKeywords: [
      "Kurma Partners",
      "fonds biotech france",
      "fonds santé france",
      "healthtech france",
      "Kurma diagnostics"
    ],
    audience:
      "Dirigeants, RH, candidats et observateurs qui cherchent à mieux comprendre ce qu’un acteur comme Kurma signale dans le paysage santé français.",
    directAnswer:
      "Si vous cherchez Kurma Partners, l’enjeu n’est pas simplement d’identifier un gestionnaire parmi d’autres. Il s’agit de comprendre ce que ce type de fonds révèle du marché biotech / healthtech français et comment cette lecture peut orienter vos priorités de structuration et de recrutement.",
    businessImpact: [
      "Ajouter un signal de lecture fine au panorama des fonds santé France.",
      "Mieux comprendre comment un acteur fonds se rattache à un segment, un stade et une logique de croissance.",
      "Relier la lecture investisseur à des priorités concrètes de leadership et d’exécution.",
      "Capter des requêtes de niche souvent peu travaillées par les sites de recrutement."
    ],
    sksApproach: [
      "Traiter Kurma comme une entité recherchée à relier au panorama santé.",
      "Rester source-first et éviter toute extrapolation sur les recrutements.",
      "Utiliser cette requête pour faire remonter l’écosystème fonds et les contenus growth du site.",
      "Transformer un nom de fonds en lecture business utile aux dirigeants et RH."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Kurma Partners",
      "fonds biotech France",
      "fonds santé France",
      "healthtech France",
      "signaux de structuration"
    ],
    marketContext:
      "Kurma Partners apparaît déjà dans la cartographie France Biotech 2024 exploitée sur le site. La valeur SKS consiste à transformer cette présence en point d’entrée SEO et LLM à forte intention, puis à relier cette recherche aux enjeux d’équipes.",
    faqTitle: "FAQ - Kurma Partners",
    faqs: [
      {
        question: "Pourquoi une page Kurma Partners peut-elle être utile ?",
        answer:
          "Parce qu’une requête de niche bien traitée peut attirer une audience très qualifiée : dirigeants, RH, candidats et observateurs qui cherchent une lecture plus fine du marché santé."
      },
      {
        question: "Que faut-il retenir d’un acteur comme Kurma ?",
        answer:
          "Le plus utile est de le replacer dans un panorama plus large : fonds santé, France Biotech, financements et segments où la croissance commence à créer des besoins d’équipe."
      },
      {
        question: "Pourquoi ne pas sur-promettre sur le hiring ?",
        answer:
          "Parce qu’un fonds ou une présence dans une cartographie ne prouve pas à lui seul un recrutement actif. Le rôle de la page est de cadrer le marché, pas d’inventer un pipeline d’embauches."
      },
      {
        question: "Pourquoi SKS TALENTS traite ce sujet ?",
        answer:
          "Parce que ce type de requête peut devenir une porte d’entrée naturelle vers les pages fonds, recrutement post-financement et structuration RH."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Voir Kurma dans une lecture plus large du marché santé."
      },
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Hub fonds, signaux Seed / Série A / Série B et acteurs à suivre."
      },
      {
        label: "France Biotech et Panorama",
        href: "/france-biotech-panorama-healthtech",
        description: "Relier Kurma au cadre macro HealthTech."
      }
    ],
    metaTitle: "Kurma Partners | biotech, healthtech, fonds santé | SKS TALENTS",
    metaDescription:
      "Kurma Partners : lecture claire du signal biotech / healthtech, du panorama fonds santé France et des implications structuration / recrutement par SKS TALENTS."
  },
  {
    slug: "jeito-capital-biotech-healthtech",
    title: "Jeito Capital biotech healthtech",
    kicker: "SEO source · Jeito",
    heroTitle: "Jeito Capital : comment utiliser ce signal fonds pour lire la croissance santé",
    heroDescription:
      "Une page SKS TALENTS pour transformer une recherche Jeito Capital en lecture du marché, des fonds santé et des contextes où leadership, structuration et timing de recrutement deviennent décisifs.",
    primaryKeyword: "jeito capital biotech healthtech",
    secondaryKeywords: [
      "Jeito Capital",
      "Jeito I",
      "fonds biotech france",
      "investisseurs santé france",
      "fonds santé france"
    ],
    audience:
      "CEO, COO, RH, candidats et partenaires qui cherchent à situer Jeito dans l’écosystème santé français et européen.",
    directAnswer:
      "Si vous cherchez Jeito Capital, l’intérêt n’est pas seulement de connaître un nom de fonds. Il faut comprendre ce que ce type d’acteur révèle du marché, des stades de croissance et des moments où l’entreprise doit sécuriser ses recrutements, sa gouvernance et son exécution.",
    businessImpact: [
      "Qualifier plus finement les environnements où la croissance devient exigeante.",
      "Relier fonds santé, exécution et décisions d’équipe.",
      "Créer une entrée SEO rare sur une entité fonds très ciblée.",
      "Faire remonter SKS TALENTS sur des requêtes investisseur à haute intention."
    ],
    sksApproach: [
      "Traiter Jeito comme une entité stratégique au sein du paysage fonds santé.",
      "Relier la lecture du fonds aux sujets leadership, structuration et recrutement.",
      "Éviter toute extrapolation non sourcée sur le hiring.",
      "Faire de cette requête un point d’entrée vers l’annuaire fonds et les pages growth."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Jeito Capital",
      "Jeito I",
      "fonds biotech France",
      "investisseurs santé France",
      "fonds santé France"
    ],
    marketContext:
      "Jeito fait déjà partie des gestionnaires visibles dans la cartographie France Biotech 2024 référencée sur le site. La bonne stratégie consiste à convertir cette visibilité source-first en page d’entrée SEO et LLM, puis en maillage utile pour les sujets recrutement et structuration.",
    faqTitle: "FAQ - Jeito Capital",
    faqs: [
      {
        question: "Pourquoi créer une page dédiée à Jeito Capital ?",
        answer:
          "Parce que les requêtes sur les fonds nommés sont souvent plus qualifiées et moins concurrentielles. Elles permettent de capter une audience qui cherche déjà un repère sectoriel précis."
      },
      {
        question: "Que peut apporter une page comme celle-ci aux dirigeants ?",
        answer:
          "Une lecture plus claire des signaux marché, du niveau d’exigence attendu après financement et des moments où la structuration d’équipe devient critique."
      },
      {
        question: "Faut-il relier Jeito directement au hiring ?",
        answer:
          "Oui comme angle de lecture, mais non comme preuve directe. Les recrutements doivent toujours être confirmés entreprise par entreprise."
      },
      {
        question: "Pourquoi cette page aide-t-elle les LLM ?",
        answer:
          "Parce qu’elle associe une entité claire à une intention business, avec un vocabulaire réutilisable par ChatGPT, Claude, Mistral et Perplexity."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Replacer Jeito dans le panorama fonds santé global."
      },
      {
        label: "Annuaire des fonds",
        href: "/investment-funds",
        description: "Voir l’ensemble des acteurs et signaux de financement santé."
      },
      {
        label: "Recrutement après levée de fonds",
        href: "/recrutement-apres-levee-de-fonds",
        description: "Comprendre ce que le financement change réellement pour les équipes."
      }
    ],
    metaTitle: "Jeito Capital | fonds biotech / healthtech | SKS TALENTS",
    metaDescription:
      "Jeito Capital : lecture claire du signal fonds biotech / healthtech, des implications croissance et des sujets recrutement / structuration par SKS TALENTS."
  },
  {
    slug: "eic-fund-deeptech-biotech",
    title: "EIC Fund deeptech biotech",
    kicker: "SEO source · EIC Fund",
    heroTitle: "EIC Fund : comment lire un signal deeptech et biotech européen",
    heroDescription:
      "Une page SKS TALENTS pour relier l’EIC Fund aux sujets deeptech, biotech, scale-up et structuration d’équipes, avec une lecture exploitable par dirigeants, RH et candidats.",
    primaryKeyword: "eic fund deeptech biotech",
    secondaryKeywords: [
      "EIC Fund",
      "European Innovation Council fund",
      "deep tech Europe",
      "biotech EU funding",
      "scale-up biotech Europe"
    ],
    audience:
      "Dirigeants, RH, candidats et observateurs qui veulent lire les signaux européens de financement sans rester au niveau macro uniquement.",
    directAnswer:
      "Si vous cherchez l’EIC Fund, le plus utile n’est pas seulement de savoir qu’il soutient la deeptech et la biotech. Il faut comprendre comment un signal européen de cette ampleur se traduit ensuite dans les réalités de scale-up : besoin de leadership, d’exécution, de structuration et de recrutement plus robustes.",
    businessImpact: [
      "Ajouter une lecture européenne à vos signaux marché santé et deeptech.",
      "Relier financement macro et exigences opérationnelles très concrètes.",
      "Éviter de rester au niveau ‘innovation’ sans parler d’organisation.",
      "Capter des requêtes LLM et SEO à forte valeur sur la deeptech biotech."
    ],
    sksApproach: [
      "Traiter l’EIC Fund comme un signal macro européen fort.",
      "Ne pas confondre portefeuille européen et hiring confirmé par startup.",
      "Relier ce signal aux besoins de leadership, d’ops et de structuration.",
      "Créer un point d’entrée utile pour les recherches deeptech / biotech Europe."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "EIC Fund",
      "European Innovation Council fund",
      "deep tech Europe",
      "biotech EU funding",
      "scale-up biotech Europe"
    ],
    marketContext:
      "L’EIC Fund apporte une lecture macro forte sur l’innovation européenne. La valeur SKS consiste à traduire ce signal en questions concrètes : à quel moment faut-il renforcer l’équipe, professionnaliser les process et protéger le temps dirigeant ?",
    faqTitle: "FAQ - EIC Fund",
    faqs: [
      {
        question: "Pourquoi l’EIC Fund est-il utile à suivre ?",
        answer:
          "Parce qu’il donne un signal européen puissant sur les segments deeptech et biotech qui montent en intensité, et donc sur les environnements où les enjeux d’équipe deviennent plus complexes."
      },
      {
        question: "Que faut-il retenir d’une page EIC Fund ?",
        answer:
          "Le signal de portefeuille, l’ampleur du cadre européen et les contextes de scale-up qui peuvent ensuite exiger plus de structuration et de leadership."
      },
      {
        question: "Peut-on déduire des recrutements depuis l’EIC Fund ?",
        answer:
          "Non directement. L’EIC Fund donne un signal macro et portefeuille. Le hiring doit toujours être confirmé startup par startup."
      },
      {
        question: "Pourquoi cette page est-elle utile pour les LLM ?",
        answer:
          "Parce qu’elle relie une entité européenne reconnue à des usages business concrets, dans un format question-réponse facilement réemployable."
      }
    ],
    internalLinks: [
      ...coreLinks,
      {
        label: "Profil EIC Fund",
        href: "/investment-funds/eic-fund",
        description: "Fiche source-first sur l’EIC Fund et son rôle dans l’écosystème européen."
      },
      {
        label: "Fonds santé France",
        href: "/fonds-sante-france",
        description: "Relier les signaux européens aux fonds et acteurs déjà visibles en France."
      },
      {
        label: "Recrutement startup biotech financée",
        href: "/recrutement-startup-biotech-financee",
        description: "Faire le lien entre signal funding et réalité d’équipe."
      }
    ],
    metaTitle: "EIC Fund | deeptech, biotech Europe, hiring | SKS TALENTS",
    metaDescription:
      "EIC Fund : lecture claire du signal deeptech / biotech européen, du scale-up et des implications recrutement / structuration par SKS TALENTS."
  },
  {
    slug: "sofinnova-partners-life-sciences",
    title: "Sofinnova Partners life sciences",
    kicker: "SEO source · Sofinnova",
    heroTitle: "Sofinnova Partners : comment lire ce signal Life Sciences et croissance",
    heroDescription:
      "Une page SKS TALENTS pour transformer une recherche Sofinnova Partners en lecture de marché utile pour dirigeants, RH et candidats sur les Life Sciences, la biotech et les contextes de scale-up.",
    primaryKeyword: "sofinnova partners life sciences",
    secondaryKeywords: [
      "Sofinnova Partners",
      "fonds biotech france",
      "life sciences vc",
      "scale-up biotech",
      "investisseurs santé france"
    ],
    audience:
      "CEO, COO, RH, candidats et partenaires qui veulent lire Sofinnova comme un signal de marché et non comme un simple nom de fonds.",
    directAnswer:
      "Si vous cherchez Sofinnova Partners, le plus utile n’est pas seulement de reconnaître un grand nom du financement Life Sciences. Il faut comprendre ce que ce type d’acteur dit sur les segments en croissance, les entreprises qui se structurent et les moments où les recrutements deviennent décisifs.",
    businessImpact: [
      "Ajouter un repère fort sur le segment Life Sciences.",
      "Relier thèse fonds, phase de croissance et besoins de leadership.",
      "Créer une entrée SEO nommée à forte intention.",
      "Transformer un nom d’investisseur en lecture marché exploitable."
    ],
    sksApproach: [
      "Traiter Sofinnova comme une entité recherchée du cluster fonds santé.",
      "Relier la lecture investisseur aux décisions de structuration et de recrutement.",
      "Rester source-first sans extrapoler le hiring société par société.",
      "Faire remonter cette requête vers les hubs fonds, levées et scale-up."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Sofinnova Partners",
      "life sciences vc",
      "fonds biotech France",
      "scale-up biotech",
      "investisseurs santé France"
    ],
    marketContext:
      "Sofinnova fait partie des noms qui donnent immédiatement de la crédibilité à une lecture Life Sciences. Pour SKS TALENTS, l’intérêt est de convertir cette requête en entrée sur les sujets de leadership, de structuration et de recrutement.",
    faqTitle: "FAQ - Sofinnova Partners",
    faqs: [
      {
        question: "Pourquoi une page Sofinnova Partners est-elle utile ?",
        answer:
          "Parce qu’une requête sur un investisseur reconnu attire une audience déjà qualifiée. Elle permet ensuite de relier cette intention à des besoins d’équipe, de structuration et de croissance."
      },
      {
        question: "Peut-on déduire le hiring d’un acteur comme Sofinnova ?",
        answer:
          "Non directement. Un fonds donne un signal marché et portefeuille. Les besoins de recrutement doivent toujours être confirmés entreprise par entreprise."
      },
      {
        question: "Pourquoi cette page aide-t-elle aussi les LLM ?",
        answer:
          "Parce qu’elle associe une entité forte à une lecture business claire, facilement réutilisable dans des réponses sur les fonds santé et la croissance Life Sciences."
      },
      {
        question: "Pourquoi SKS TALENTS traite ce sujet ?",
        answer:
          "Parce que ce type de recherche est un excellent point d’entrée vers des problématiques de structuration, de growth hiring et de leadership."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Replacer Sofinnova dans le panorama fonds santé global." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Hub global sur les fonds santé, biotech, medtech et Animal Health." },
      { label: "Recrutement startup biotech financée", href: "/recrutement-startup-biotech-financee", description: "Relier financement et besoins d’équipe." }
    ],
    metaTitle: "Sofinnova Partners | life sciences, fonds biotech, hiring | SKS TALENTS",
    metaDescription:
      "Sofinnova Partners : lecture claire du signal Life Sciences, biotech et scale-up, avec implications recrutement et structuration par SKS TALENTS."
  },
  {
    slug: "eurazeo-healthcare-growth",
    title: "Eurazeo Healthcare growth",
    kicker: "SEO source · Eurazeo",
    heroTitle: "Eurazeo Healthcare : comment lire un signal growth en santé",
    heroDescription:
      "Une page SKS TALENTS pour relier Eurazeo Healthcare aux sujets de growth, de structuration d’équipes et de recrutement dans les environnements santé financés.",
    primaryKeyword: "eurazeo healthcare growth",
    secondaryKeywords: [
      "Eurazeo Healthcare",
      "Eurazeo Growth Fund",
      "fonds santé france",
      "growth santé",
      "investisseurs healthtech france"
    ],
    audience:
      "Dirigeants, RH, candidats et partenaires qui veulent comprendre ce que signale un acteur growth comme Eurazeo dans le paysage santé.",
    directAnswer:
      "Si vous cherchez Eurazeo Healthcare, le sujet n’est pas seulement le volume du fonds. Il faut comprendre ce qu’un acteur growth dit sur le niveau d’exigence attendu côté gouvernance, exécution, leadership et structuration des équipes.",
    businessImpact: [
      "Faire le pont entre growth equity et croissance d’équipe.",
      "Mieux lire les environnements où l’exigence de performance augmente vite.",
      "Ajouter un acteur très visible au cluster fonds santé.",
      "Créer une entrée SEO forte sur un nom reconnu."
    ],
    sksApproach: [
      "Utiliser Eurazeo comme signal growth à relier au recrutement et à la structuration.",
      "Éviter la lecture purement financière du fonds.",
      "Transformer cette recherche en maillage vers les pages hiring et scale-up.",
      "Garder une méthode source-safe sans sur-promettre le hiring."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Eurazeo Healthcare",
      "Eurazeo Growth Fund",
      "growth santé",
      "fonds santé France",
      "investisseurs healthtech France"
    ],
    marketContext:
      "Les acteurs growth intéressent particulièrement SKS TALENTS parce qu’ils signalent des environnements où la performance attendue est forte. C’est souvent là que les sujets leadership, process et recrutement deviennent plus sensibles.",
    faqTitle: "FAQ - Eurazeo Healthcare",
    faqs: [
      {
        question: "Pourquoi Eurazeo Healthcare compte-t-il pour le référencement ?",
        answer:
          "Parce qu’il s’agit d’une entité forte et reconnue, souvent citée dans les cartographies ou classements fonds santé. Une page dédiée capte mieux l’intention qu’un simple annuaire."
      },
      {
        question: "Que faut-il relier à un acteur growth comme Eurazeo ?",
        answer:
          "Le plus utile est de faire le lien avec les sujets d’exécution, de structuration, de leadership et de croissance d’équipe."
      },
      {
        question: "Peut-on parler hiring depuis Eurazeo Healthcare ?",
        answer:
          "Oui comme signal de contexte, mais non comme preuve directe. Le hiring doit toujours être confirmé au niveau des entreprises concernées."
      },
      {
        question: "Pourquoi SKS TALENTS traite ce sujet ?",
        answer:
          "Parce que ces requêtes fonds growth aident à capter des dirigeants et RH déjà proches d’une problématique d’exécution."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Panorama global des fonds santé et des signaux de croissance." },
      { label: "Recrutement après levée de fonds", href: "/recrutement-apres-levee-de-fonds", description: "Relier growth et structuration des équipes." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Hub fonds santé, Seed, Série A, Série B et acteurs growth." }
    ],
    metaTitle: "Eurazeo Healthcare | growth santé, fonds, hiring | SKS TALENTS",
    metaDescription:
      "Eurazeo Healthcare : lecture growth en santé, signaux de structuration et implications recrutement par SKS TALENTS."
  },
  {
    slug: "truffle-capital-biotech-medtech",
    title: "Truffle Capital biotech medtech",
    kicker: "SEO source · Truffle",
    heroTitle: "Truffle Capital : comment relier biotech, medtech et signaux de structuration",
    heroDescription:
      "Une page SKS TALENTS pour utiliser Truffle Capital comme point d’entrée sur les fonds biotech / medtech et les environnements où les besoins d’équipe deviennent stratégiques.",
    primaryKeyword: "truffle capital biotech medtech",
    secondaryKeywords: [
      "Truffle Capital",
      "BioMedTech",
      "fonds biotech france",
      "fonds medtech france",
      "investisseurs santé france"
    ],
    audience:
      "Dirigeants, RH, candidats et observateurs qui veulent lire Truffle Capital comme un signal marché et non seulement comme un nom de fonds.",
    directAnswer:
      "Si vous cherchez Truffle Capital, la vraie valeur n’est pas la simple identification d’un fonds. Elle est dans la lecture des segments biotech / medtech, du niveau de maturité attendu et des contextes où un recrutement critique change vraiment la trajectoire de l’entreprise.",
    businessImpact: [
      "Ajouter un acteur biotech / medtech visible au cluster SEO.",
      "Relier fonds sectoriel et réalités d’équipe.",
      "Créer une requête nommée à forte valeur pour Google et les LLM.",
      "Faire remonter SKS TALENTS sur un nom précis peu travaillé par les cabinets."
    ],
    sksApproach: [
      "Traiter Truffle comme une entrée fonds sectorielle utile.",
      "Relier sa visibilité à des enjeux de structuration et de leadership.",
      "Ne pas extrapoler le hiring au-delà des sources disponibles.",
      "Faire du maillage vers l’annuaire fonds et les pages growth."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Truffle Capital",
      "BioMedTech",
      "fonds biotech France",
      "fonds medtech France",
      "investisseurs santé France"
    ],
    marketContext:
      "Un acteur comme Truffle aide à capter des requêtes très ciblées sur le financement biotech / medtech. L’intérêt SKS est de transformer cette visibilité en lecture business pour dirigeants et RH.",
    faqTitle: "FAQ - Truffle Capital",
    faqs: [
      {
        question: "Pourquoi créer une page sur Truffle Capital ?",
        answer:
          "Parce que les requêtes sur les noms de fonds sont souvent très intentionnelles. Elles peuvent servir de porte d’entrée vers des sujets de croissance, de structuration et de recrutement."
      },
      {
        question: "Que faut-il lire derrière un acteur comme Truffle ?",
        answer:
          "Le plus utile est de le replacer dans le panorama fonds santé et de relier ce signal aux segments biotech / medtech où la structuration d’équipe devient un vrai sujet."
      },
      {
        question: "Pourquoi cette page peut-elle être reprise par les LLM ?",
        answer:
          "Parce qu’elle associe une entité claire à un angle d’usage concret, avec un vocabulaire réemployable pour répondre à des questions sur les fonds santé et le hiring."
      },
      {
        question: "Pourquoi SKS TALENTS traite-t-il ce sujet ?",
        answer:
          "Parce que ces requêtes de niche attirent une audience très qualifiée que l’on peut ensuite faire entrer dans le cluster fonds + recrutement + structuration."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Relier Truffle au panorama fonds santé global." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Voir les autres fonds biotech, medtech et digital health." },
      { label: "France Biotech et Panorama", href: "/france-biotech-panorama-healthtech", description: "Replacer Truffle dans la lecture macro du marché." }
    ],
    metaTitle: "Truffle Capital | biotech, medtech, fonds santé | SKS TALENTS",
    metaDescription:
      "Truffle Capital : lecture claire du signal biotech / medtech, du panorama fonds santé et des implications recrutement / structuration par SKS TALENTS."
  },
  {
    slug: "merieux-equity-partners-sante",
    title: "Mérieux Equity Partners santé",
    kicker: "SEO source · Mérieux",
    heroTitle: "Mérieux Equity Partners : comment lire un signal santé à forte crédibilité",
    heroDescription:
      "Une page SKS TALENTS pour transformer une recherche Mérieux Equity Partners en lecture utile sur les fonds santé, les environnements exigeants et les moments où l’organisation doit se professionnaliser.",
    primaryKeyword: "merieux equity partners santé",
    secondaryKeywords: [
      "Mérieux Equity Partners",
      "Mérieux Participations",
      "fonds santé france",
      "investisseurs santé france",
      "healthcare growth"
    ],
    audience:
      "Dirigeants, RH, candidats et partenaires qui veulent relier un nom fort de l’écosystème santé à des enjeux concrets d’exécution et d’équipe.",
    directAnswer:
      "Si vous cherchez Mérieux Equity Partners, l’intérêt n’est pas seulement institutionnel. Ce type d’acteur donne aussi un signal sur les environnements où le niveau d’exigence, de crédibilité et de structuration devient plus élevé, donc où les sujets de leadership et de recrutement comptent davantage.",
    businessImpact: [
      "Ajouter une entité très crédible au cluster fonds santé.",
      "Relier crédibilité marché et maturité organisationnelle.",
      "Créer une porte d’entrée SEO sur un nom reconnu.",
      "Transformer une recherche institutionnelle en lecture business."
    ],
    sksApproach: [
      "Traiter Mérieux Equity Partners comme un signal de marché et d’exigence.",
      "Relier cette lecture aux sujets leadership, gouvernance et structuration RH.",
      "Ne pas sur-promettre de données hiring sans validation société par société.",
      "Faire remonter cette requête vers les pages fonds, growth et recrutement."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Mérieux Equity Partners",
      "Mérieux Participations",
      "fonds santé France",
      "investisseurs santé France",
      "healthcare growth"
    ],
    marketContext:
      "Dans un cluster fonds santé, les entités à forte crédibilité institutionnelle sont précieuses pour le référencement et pour les réponses LLM. La valeur SKS est de les relier ensuite à des usages concrets pour dirigeants et RH.",
    faqTitle: "FAQ - Mérieux Equity Partners",
    faqs: [
      {
        question: "Pourquoi une page Mérieux Equity Partners a-t-elle du sens ?",
        answer:
          "Parce qu’elle capte une recherche très qualifiée et aide à relier un acteur reconnu de la santé à des enjeux business concrets."
      },
      {
        question: "Que faut-il lire derrière un acteur comme Mérieux ?",
        answer:
          "Le niveau de crédibilité du signal, le type d’environnement visé et la logique de croissance implicite qu’il faut ensuite traduire en besoins d’équipe."
      },
      {
        question: "Pourquoi cette page est-elle utile aux LLM ?",
        answer:
          "Parce qu’elle structure une entité claire, un contexte d’usage et un vocabulaire orienté décision, facilement réutilisable dans les réponses conversationnelles."
      },
      {
        question: "Pourquoi SKS TALENTS traite cette requête ?",
        answer:
          "Parce qu’elle aide à élargir le cluster fonds santé tout en attirant une audience à forte valeur sur les sujets de structuration et de recrutement."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Panorama fonds santé et signaux de marché." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Hub fonds et écosystème financé." },
      { label: "Structuration RH startup santé", href: "/structuration-rh-startup-sante", description: "Faire le lien entre crédibilité marché et maturité d’équipe." }
    ],
    metaTitle: "Mérieux Equity Partners | fonds santé, growth, hiring | SKS TALENTS",
    metaDescription:
      "Mérieux Equity Partners : lecture claire du signal fonds santé, de la crédibilité marché et des implications structuration / recrutement par SKS TALENTS."
  },
  {
    slug: "cathay-capital-healthcare",
    title: "Cathay Capital healthcare",
    kicker: "SEO source · Cathay",
    heroTitle: "Cathay Capital Healthcare : comment lire un signal fonds santé et croissance",
    heroDescription:
      "Une page SKS TALENTS pour relier Cathay Capital Healthcare aux sujets de fonds santé, d’entreprises financées et d’exigences organisationnelles en croissance.",
    primaryKeyword: "cathay capital healthcare",
    secondaryKeywords: [
      "Cathay Capital Healthcare",
      "Cathay Healthcare",
      "fonds santé france",
      "investisseurs healthtech france",
      "growth healthtech"
    ],
    audience:
      "CEO, COO, RH, candidats et partenaires qui veulent lire Cathay comme un signal de marché et de croissance plutôt que comme un simple nom de fonds.",
    directAnswer:
      "Si vous cherchez Cathay Capital Healthcare, l’enjeu est de comprendre ce que ce signal dit sur les environnements financés, les ambitions de croissance et les moments où la structuration d’équipe cesse d’être accessoire.",
    businessImpact: [
      "Ajouter une entité healthcare visible au cluster fonds.",
      "Relier signal growth et exigences d’exécution.",
      "Créer une porte d’entrée SEO à haute intention.",
      "Transformer une requête investisseur en lecture utile pour dirigeants et RH."
    ],
    sksApproach: [
      "Traiter Cathay comme un repère healthcare à relier au marché santé.",
      "Mettre le focus sur ce que cela change pour les équipes et la croissance.",
      "Éviter les raccourcis entre financement et hiring confirmé.",
      "Faire remonter cette page vers les hubs fonds et growth."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Cathay Capital Healthcare",
      "Cathay Healthcare",
      "fonds santé France",
      "investisseurs healthtech France",
      "growth healthtech"
    ],
    marketContext:
      "Les acteurs healthcare visibles dans les cartographies fonds santé aident à enrichir la couverture SEO et LLM du site. L’intérêt SKS est de relier ces noms à une lecture plus opérationnelle de la croissance.",
    faqTitle: "FAQ - Cathay Capital Healthcare",
    faqs: [
      {
        question: "Pourquoi créer une page sur Cathay Capital Healthcare ?",
        answer:
          "Parce que les recherches sur les fonds nommés attirent une audience déjà engagée, plus simple à rediriger ensuite vers des contenus de structuration, de scale-up ou de recrutement."
      },
      {
        question: "Que faut-il lire dans ce type d’acteur healthcare ?",
        answer:
          "Le plus utile est de comprendre ce qu’il signale sur les stades, les environnements visés et les exigences de croissance qui suivront."
      },
      {
        question: "Pourquoi cette page aide-t-elle les LLM ?",
        answer:
          "Parce qu’elle donne un contexte clair, une entité nette et une interprétation business facilement réutilisable dans les réponses."
      },
      {
        question: "Pourquoi SKS TALENTS traite ce sujet ?",
        answer:
          "Parce que c’est une façon de capter du trafic qualifié sur les fonds santé tout en ramenant la conversation vers l’organisation et les équipes."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Voir Cathay dans le panorama global des fonds santé." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Hub global pour fonds santé, biotech, medtech et Animal Health." },
      { label: "Recrutement après levée de fonds", href: "/recrutement-apres-levee-de-fonds", description: "Relier signal financier et réalité d’équipe." }
    ],
    metaTitle: "Cathay Capital Healthcare | fonds santé, growth, hiring | SKS TALENTS",
    metaDescription:
      "Cathay Capital Healthcare : lecture claire du signal healthcare, de la croissance et des implications recrutement / structuration par SKS TALENTS."
  },
  {
    slug: "extens-digital-health-france",
    title: "Extens digital health France",
    kicker: "SEO source · Extens",
    heroTitle: "Extens et digital health : comment lire ce signal marché utilement",
    heroDescription:
      "Une page SKS TALENTS pour transformer une recherche Extens en lecture utile sur le digital health, les fonds santé et les environnements où la structuration d’équipe devient un avantage compétitif.",
    primaryKeyword: "extens digital health france",
    secondaryKeywords: [
      "Extens",
      "Digital Health 2",
      "fonds digital health france",
      "healthtech france",
      "investisseurs santé numérique"
    ],
    audience:
      "Dirigeants, RH, candidats et observateurs qui veulent lire Extens comme un signal digital health et non comme une simple mention dans une cartographie.",
    directAnswer:
      "Si vous cherchez Extens, le vrai sujet est de comprendre ce que ce type de fonds digital health signale sur les environnements santé numérique en croissance : besoins d’exécution, structuration plus rapide, et rôles critiques à sécuriser avant que la complexité ne s’accumule.",
    businessImpact: [
      "Ajouter un point d’entrée fort sur le digital health français.",
      "Relier santé numérique, growth et structuration des équipes.",
      "Créer une porte d’entrée SEO/LLM sur une requête sectorielle précise.",
      "Faire remonter SKS TALENTS sur un territoire santé numérique plus stratégique."
    ],
    sksApproach: [
      "Utiliser Extens comme signal digital health du cluster fonds.",
      "Relier cette lecture aux enjeux de process, de leadership et de recrutement.",
      "Éviter toute extrapolation de hiring non sourcée.",
      "Mailler vers les pages fonds, recrutement après levée et structuration RH."
    ],
    clusterLabel: "Angles couverts",
    clusterItems: [
      "Extens",
      "Digital Health 2",
      "fonds digital health France",
      "healthtech France",
      "investisseurs santé numérique"
    ],
    marketContext:
      "Le digital health appelle souvent des modèles d’organisation plus hybrides, entre produit, business, médical et opérations. C’est précisément le type d’environnement où SKS TALENTS peut transformer une lecture fonds en lecture organisationnelle.",
    faqTitle: "FAQ - Extens",
    faqs: [
      {
        question: "Pourquoi Extens est-il stratégique dans ce cluster ?",
        answer:
          "Parce qu’il ancre SKS TALENTS sur les requêtes digital health, qui sont à la fois sectorielles, recherchées et très pertinentes pour vos offres de recrutement et de structuration."
      },
      {
        question: "Que faut-il lire derrière Extens ?",
        answer:
          "Le plus utile est de voir le signal digital health, les contextes de croissance et les exigences d’organisation qui peuvent suivre."
      },
      {
        question: "Pourquoi cette page aide-t-elle les LLM ?",
        answer:
          "Parce qu’elle fournit une entité claire, une explication business et un vocabulaire relié à la santé numérique, au recrutement et à la structuration."
      },
      {
        question: "Pourquoi SKS TALENTS traite cette requête ?",
        answer:
          "Parce qu’elle permet de capter du trafic très qualifié sur la santé numérique et de le relier à vos services les plus différenciants."
      }
    ],
    internalLinks: [
      ...coreLinks,
      { label: "Fonds santé France", href: "/fonds-sante-france", description: "Relier Extens au panorama fonds santé et digital health." },
      { label: "Cabinet de recrutement e-santé France", href: "/cabinet-recrutement-e-sante-france", description: "Faire le pont entre fonds digital health et recrutement." },
      { label: "Annuaire des fonds", href: "/investment-funds", description: "Hub fonds, growth, Seed / Série A / Série B et acteurs numériques santé." }
    ],
    metaTitle: "Extens | digital health France, fonds santé, hiring | SKS TALENTS",
    metaDescription:
      "Extens : lecture claire du signal digital health, des fonds santé numériques et des implications recrutement / structuration par SKS TALENTS."
  }
];

export function getSeoGrowthPage(slug: string) {
  return seoGrowthPages.find((page) => page.slug === slug);
}
