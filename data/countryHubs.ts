export type CountryHubLink = {
  label: string;
  href: string;
  description: string;
};

export type CountryHub = {
  slug: "france" | "senegal" | "cote-divoire" | "benin";
  title: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  description: string;
  answerTitle: string;
  answer: string;
  bullets: string[];
  priorityTitle: string;
  priorityDescription: string;
  priorities: string[];
  contentTitle: string;
  contentDescription: string;
  contentLinks: CountryHubLink[];
  ecosystemTitle: string;
  ecosystemDescription: string;
  ecosystemLinks: CountryHubLink[];
  ctaTitle: string;
  ctaDescription: string;
  signatureDescription: string;
  faq: Array<{ question: string; answer: string }>;
};

export const countryHubs: Record<CountryHub["slug"], CountryHub> = {
  france: {
    slug: "france",
    title: "France : recrutements Life Sciences, Animal Health, MedTech & marchés en tension",
    metaTitle: "France | Recrutement Life Sciences, Animal Health & MedTech",
    metaDescription:
      "Hub France SKS TALENTS : biotech, diagnostic, animal health, petfood, médecine nucléaire, salaires, fonds, événements et recrutements en France.",
    kicker: "Hub pays · France",
    description:
      "Cette page rassemble les contenus SKS TALENTS les plus utiles pour suivre la France sur vos sujets coeur : biotech, diagnostic, santé animale, petfood, médecine nucléaire, fonds, rémunérations et tensions de recrutement.",
    answerTitle: "Que trouve-t-on sur la page France de SKS TALENTS ?",
    answer:
      "Vous y trouvez un point d’entrée clair pour les dirigeants, DRH et profils spécialisés qui veulent comprendre les signaux marché en France, les métiers en tension, les benchmarks salariaux et les écosystèmes qui influencent les recrutements.",
    bullets: [
      "Contenus centrés sur la France et ses marchés réels",
      "Lecture recrutement des données France Biotech, Business France et Bpifrance",
      "Angles dirigeants, RH, sales, opérations, clinique et réglementaire",
      "Passerelles vers métiers, fonds, écoles, événements et ressources"
    ],
    priorityTitle: "Les priorités France à suivre",
    priorityDescription:
      "La France est votre hub principal pour les contenus de profondeur, les benchmarks, les articles marché et les pages à forte autorité sectorielle.",
    priorities: [
      "France Biotech, Panorama HealthTech et fonds santé",
      "Médecine nucléaire et structuration de la filière RIV",
      "Recrutements 2026 sur les fonctions business, clinique, qualité et sales",
      "Benchmarks salaires et arbitrages package en marché français"
    ],
    contentTitle: "Pages France à lire en priorité",
    contentDescription:
      "Ces pages servent de socle pour capter des recherches France tout en restant directement utiles pour les décideurs.",
    contentLinks: [
      {
        label: "HealthTech France 2026 : emploi et recrutement",
        href: "/blog/france-healthtech-2026-emploi-recrutement",
        description: "Une lecture claire des chiffres emploi et recrutements à venir en France."
      },
      {
        label: "Business France : services, webinaires et V.I.E",
        href: "/blog/business-france-services-webinaires-export-vie",
        description: "Pour l’export, le recrutement international et la lecture marché depuis la France."
      },
      {
        label: "Bpifrance Le Hub : services et événements",
        href: "/blog/bpifrance-le-hub-services-evenements-startups-investies",
        description: "Un angle recrutement et croissance pour startups et scale-ups françaises."
      },
      {
        label: "Médecine nucléaire : repères utiles en France",
        href: "/blog/medecine-nucleaire-riv-france-france-biotech",
        description: "Une porte d’entrée forte sur un sujet très recherché en santé et healthtech."
      }
    ],
    ecosystemTitle: "Réseaux et ressources France",
    ecosystemDescription:
      "Le hub France doit pointer vers les actifs qui renforcent l’autorité et la compréhension du marché.",
    ecosystemLinks: [
      {
        label: "Ressources",
        href: "/resources",
        description: "Événements, écoles, partenaires et signaux utiles à suivre sur le marché français."
      },
      {
        label: "Investment funds",
        href: "/investment-funds",
        description: "Cartographie des fonds santé pour lire les dynamiques de recrutement à venir."
      },
      {
        label: "Benchmarks salaires",
        href: "/salary-benchmarks",
        description: "Références France et Europe pour cadrer un package ou un marché de talents."
      },
      {
        label: "Écosystème",
        href: "/ecosystem",
        description: "Clusters, écoles, réseaux et partenaires structurants en France."
      }
    ],
    ctaTitle: "Vous recrutez ou structurez une équipe en France ?",
    ctaDescription:
      "Le bon usage de ce hub est de transformer l’information en arbitrages concrets : rôle, timing, niveau de rareté, package, narration marché et méthode d’approche.",
    signatureDescription:
      "Hub pays édité par SKS TALENTS pour relier données France, signaux marché, recrutement spécialisé et décisions de croissance dans les Life Sciences et l’Animal Health.",
    faq: [
      {
        question: "Pourquoi créer un hub France séparé ?",
        answer:
          "Parce que les recherches France sur les sujets biotech, diagnostic, médecine nucléaire, santé animale ou salaires ne répondent pas aux mêmes intentions que les recherches Afrique francophone. Ce hub garde donc un angle strictement France."
      },
      {
        question: "Quels lecteurs ce hub France vise-t-il ?",
        answer:
          "Des dirigeants, DRH, COO, CPO, responsables recrutement, profils sales et experts qui veulent une lecture marché utile sur la France."
      },
      {
        question: "Cette page aide-t-elle aussi pour les LLM comme ChatGPT, Claude, Mistral et Perplexity ?",
        answer:
          "Oui. Elle rassemble des réponses directes, des liens internes cohérents et des pages sources utiles, ce qui améliore la lisibilité pour les moteurs de recherche et les systèmes conversationnels."
      }
    ]
  },
  senegal: {
    slug: "senegal",
    title: "Sénégal : biotech, santé, bioproduction, carrières et écosystèmes à suivre",
    metaTitle: "Sénégal | Life Sciences, santé, bioproduction & carrières",
    metaDescription:
      "Hub Sénégal SKS TALENTS : bioproduction, santé, diagnostic, carrières, contenus orientation et articles dédiés aux recherches Sénégal dans vos industries.",
    kicker: "Hub pays · Sénégal",
    description:
      "Cette page regroupe les contenus SKS TALENTS pensés pour attirer et servir les recherches liées au Sénégal dans la santé, la bioproduction, les carrières scientifiques et les passerelles France–Afrique.",
    answerTitle: "Comment SKS TALENTS traite le Sénégal sur le site ?",
    answer:
      "Le Sénégal n’est pas traité comme un simple mot-clé ajouté à des contenus France. Nous créons des contenus dédiés lorsque le sujet est local, coopératif ou franco-sénégalais, notamment autour de la bioproduction, des institutions de santé et des trajectoires de talents.",
    bullets: [
      "Angle dédié Sénégal ou France–Sénégal selon le sujet",
      "Ciblage des talents, décideurs et acteurs santé/industrie",
      "Passerelles vers orientation, bioproduction, healthtech et institutions",
      "Contenus lisibles pour Google, ChatGPT, Claude, Mistral et Perplexity"
    ],
    priorityTitle: "Les priorités Sénégal à pousser",
    priorityDescription:
      "Le Sénégal est stratégique pour les sujets de bioproduction, coopération santé, formation et circulation des talents francophones.",
    priorities: [
      "Bioproduction et vaccinopôle de Dakar",
      "Institutions de santé et coopération internationale",
      "Orientation et métiers biotech vus depuis l’Afrique francophone",
      "Liens avec la France pour études, recrutement et écosystèmes"
    ],
    contentTitle: "Pages Sénégal à lire en priorité",
    contentDescription:
      "Ces pages créent déjà une base utile pour attirer des recherches Sénégal sur vos thèmes de spécialité.",
    contentLinks: [
      {
        label: "Institut Pasteur de Dakar et bioproduction",
        href: "/blog/institut-pasteur-dakar-vaccinopole-bioproduction",
        description: "Un contenu éditorial fort sur Dakar, la production vaccinale et les partenaires impliqués."
      },
      {
        label: "Orientation",
        href: "/orientation",
        description: "Une porte d’entrée pensée aussi pour les recherches faites depuis le Sénégal."
      },
      {
        label: "Guide orientation biotechnologies",
        href: "/orientation/biotechnologies",
        description: "Un contenu plus ciblé pour les profils qui cherchent un premier repère crédible."
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Le point d’entrée éditorial pour retrouver les articles France + Afrique francophone."
      }
    ],
    ecosystemTitle: "Ressources utiles pour le Sénégal",
    ecosystemDescription:
      "Le hub Sénégal doit orienter vers les pages qui prolongent la logique écosystème, formation, veille et marchés.",
    ecosystemLinks: [
      {
        label: "Ressources",
        href: "/resources",
        description: "Pour suivre les événements, écoles, réseaux, partenaires et signaux à valeur long terme."
      },
      {
        label: "Écosystème",
        href: "/ecosystem",
        description: "Pour relier institutions, écoles, innovation et contenus d’autorité."
      },
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Pour naviguer par verticales biotech, diagnostic et marchés voisins."
      },
      {
        label: "Notre mission",
        href: "/mission",
        description: "Pour comprendre comment SKS TALENTS crée de la valeur sur des marchés spécialisés."
      }
    ],
    ctaTitle: "Vous ciblez le Sénégal ou les talents franco-sénégalais ?",
    ctaDescription:
      "Nous pouvons cadrer une stratégie de contenu, de recrutement ou de visibilité qui respecte le contexte local tout en restant connectée à vos enjeux business.",
    signatureDescription:
      "Hub pays édité par SKS TALENTS pour connecter les recherches Sénégal aux sujets santé, bioproduction, orientation, carrières et circulation des talents dans les Life Sciences.",
    faq: [
      {
        question: "Pourquoi avoir une page Sénégal dédiée ?",
        answer:
          "Parce que les recherches liées au Sénégal relèvent d’une intention différente d’un contenu France. Cette page sert donc à concentrer et clarifier les contenus déjà pertinents pour ce pays."
      },
      {
        question: "Quels sujets Sénégal sont prioritaires pour SKS TALENTS ?",
        answer:
          "La bioproduction, les institutions de santé, l’orientation vers les métiers scientifiques et les passerelles France–Afrique dans les secteurs de la santé et des Life Sciences."
      },
      {
        question: "Ce hub Sénégal sert-il aussi au GEO pour les LLM ?",
        answer:
          "Oui. Il rend explicite le lien entre un pays, des requêtes, des contenus précis et des pages d’autorité interne, ce qui aide la compréhension par les IA conversationnelles."
      }
    ]
  },
  "cote-divoire": {
    slug: "cote-divoire",
    title: "Côte d’Ivoire : santé, médecine nucléaire, carrières et écosystèmes à suivre",
    metaTitle: "Côte d’Ivoire | Santé, médecine nucléaire & carrières",
    metaDescription:
      "Hub Côte d’Ivoire SKS TALENTS : médecine nucléaire, santé, orientation, carrières et contenus dédiés aux recherches Côte d’Ivoire dans vos industries.",
    kicker: "Hub pays · Côte d’Ivoire",
    description:
      "Cette page centralise les contenus SKS TALENTS conçus pour la Côte d’Ivoire, avec un accent particulier sur la santé, la médecine nucléaire, les trajectoires de talents et les passerelles avec la France.",
    answerTitle: "Que couvre le hub Côte d’Ivoire de SKS TALENTS ?",
    answer:
      "Le hub Côte d’Ivoire regroupe les contenus localement pertinents ou franco-ivoiriens, pour éviter de noyer des sujets ivoiriens dans des pages France. On y relie santé, médecine nucléaire, orientation, écosystème et décisions de carrière.",
    bullets: [
      "Contenus dédiés Côte d’Ivoire sur les sujets santé et talents",
      "Focus spécifique sur la médecine nucléaire à Abidjan",
      "Passerelles vers orientation, écosystème et marchés français quand c’est pertinent",
      "Structure pensée pour le SEO classique et la citation par les LLM"
    ],
    priorityTitle: "Les priorités Côte d’Ivoire à renforcer",
    priorityDescription:
      "La Côte d’Ivoire est un axe clé pour les contenus santé à forte valeur, notamment sur les infrastructures, les talents et les besoins de structuration.",
    priorities: [
      "Centre de médecine nucléaire d’Abidjan",
      "Parcours talents santé entre Côte d’Ivoire et France",
      "Orientation vers biotech, diagnostic et métiers voisins",
      "Contenus utiles pour dirigeants, professionnels santé et profils spécialisés"
    ],
    contentTitle: "Pages Côte d’Ivoire à lire en priorité",
    contentDescription:
      "Ces pages créent déjà une base sérieuse pour capter des recherches Côte d’Ivoire sur vos domaines d’intervention.",
    contentLinks: [
      {
        label: "Centre de médecine nucléaire d’Abidjan",
        href: "/blog/centre-medecine-nucleaire-abidjan-cote-divoire",
        description: "Un contenu SEO dédié à l’ouverture annoncée de cette infrastructure stratégique."
      },
      {
        label: "Qu’est-ce que la médecine nucléaire ?",
        href: "/blog/qu-est-ce-que-la-medecine-nucleaire",
        description: "Une page explicative utile pour la France comme pour la Côte d’Ivoire, sans confondre les deux angles."
      },
      {
        label: "Orientation",
        href: "/orientation",
        description: "Un point d’entrée pensé aussi pour les recherches faites depuis la Côte d’Ivoire."
      },
      {
        label: "Ressources",
        href: "/resources",
        description: "Pour prolonger vers écoles, événements, réseaux et autres contenus utiles."
      },
      {
        label: "Abidjanaises In Tech : réseau à suivre en Côte d’Ivoire",
        href: "/blog/abidjanaises-in-tech-cote-divoire-ecosysteme-sante",
        description: "Une lecture SKS TALENTS d’un réseau tech ivoirien important pour les viviers, l’inclusion et les passerelles utiles à la santé."
      }
    ],
    ecosystemTitle: "Ressources utiles pour la Côte d’Ivoire",
    ecosystemDescription:
      "Le hub Côte d’Ivoire doit relier les bons contenus sans diluer l’angle local dans une approche seulement française.",
    ecosystemLinks: [
      {
        label: "Blog",
        href: "/blog",
        description: "Pour retrouver les contenus santé, médecine nucléaire et Afrique francophone."
      },
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Pour remonter vers les verticales biotech, diagnostic et innovation santé."
      },
      {
        label: "Écosystème",
        href: "/ecosystem",
        description: "Pour situer réseaux, institutions et partenaires dans une logique plus large."
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Pour convertir l’intérêt en échange concret autour d’un recrutement, d’un marché ou d’une stratégie de contenu."
      }
    ],
    ctaTitle: "Vous ciblez la Côte d’Ivoire sur vos sujets santé ou talents ?",
    ctaDescription:
      "Nous pouvons vous aider à transformer cette visibilité en contenus structurés, en lecture marché utile et en prochaines décisions plus concrètes.",
    signatureDescription:
      "Hub pays édité par SKS TALENTS pour relier Côte d’Ivoire, santé, médecine nucléaire, orientation, écosystèmes et décisions de recrutement ou de visibilité.",
    faq: [
      {
        question: "Pourquoi séparer la Côte d’Ivoire des contenus France ?",
        answer:
          "Parce qu’un contenu local ivoirien doit répondre à des recherches, à des institutions et à des signaux différents de ceux de la France. Cette séparation renforce la pertinence SEO et GEO."
      },
      {
        question: "Quels sujets Côte d’Ivoire sont déjà couverts ?",
        answer:
          "La médecine nucléaire à Abidjan, les passerelles d’orientation, les logiques santé et les contenus plus larges reliés aux Life Sciences et aux carrières."
      },
      {
        question: "Ce hub Côte d’Ivoire est-il utile aux dirigeants et aux professionnels ?",
        answer:
          "Oui. Il sert autant aux décideurs qui veulent lire le marché qu’aux profils qui cherchent un repère crédible sur des sujets de santé spécialisés."
      }
    ]
  },
  benin: {
    slug: "benin",
    title: "Bénin : biotech, santé, carrières scientifiques et écosystèmes à suivre",
    metaTitle: "Bénin | Santé, biotech, carrières & écosystèmes",
    metaDescription:
      "Hub Bénin SKS TALENTS : santé, biotech, orientation, carrières, écosystèmes et passerelles France–Afrique pour attirer un trafic qualifié sur vos sujets.",
    kicker: "Hub pays · Bénin",
    description:
      "Cette page rassemble les contenus SKS TALENTS les plus utiles pour capter et servir des recherches liées au Bénin sur la santé, les Life Sciences, l’orientation, les trajectoires de talents et les passerelles avec la France.",
    answerTitle: "Pourquoi un hub Bénin dédié sur SKS TALENTS ?",
    answer:
      "Parce qu’un trafic qualifié sur le Bénin ne doit pas être noyé dans des contenus strictement France. Ce hub sert à clarifier les bons points d’entrée pour les professionnels, étudiants, dirigeants et profils scientifiques qui cherchent des repères crédibles sur vos industries.",
    bullets: [
      "Angle pays distinct pour éviter les contenus trop généralistes",
      "Passerelles France–Afrique sur les métiers, la formation et les marchés",
      "Contenus pensés pour Google, ChatGPT, Claude, Mistral et Perplexity",
      "Point d’entrée utile pour talents, dirigeants et partenaires"
    ],
    priorityTitle: "Les priorités Bénin à structurer",
    priorityDescription:
      "Le Bénin peut devenir un axe pertinent pour les recherches d’orientation, de carrières scientifiques, de coopération régionale et de lecture des marchés santé en Afrique francophone.",
    priorities: [
      "Orientation vers biotech, diagnostic et santé animale",
      "Passerelles carrières France–Bénin",
      "Ressources marché et écosystème Afrique francophone",
      "Contenus utiles pour professionnels santé et profils en transition"
    ],
    contentTitle: "Pages Bénin à lire en priorité",
    contentDescription:
      "Ces pages servent de socle pour attirer des recherches Bénin sur vos thématiques sans inventer un angle local non documenté.",
    contentLinks: [
      {
        label: "Orientation",
        href: "/orientation",
        description: "Une porte d’entrée pensée aussi pour les recherches faites depuis le Bénin."
      },
      {
        label: "Guide orientation biotechnologies",
        href: "/orientation/biotechnologies",
        description: "Un premier repère concret pour les étudiants et profils en réflexion de carrière."
      },
      {
        label: "Ressources",
        href: "/resources",
        description: "Pour accéder aux écoles, événements, réseaux, fonds et ressources sectorielles utiles."
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Le point d’entrée éditorial pour les contenus France + Afrique francophone."
      },
      {
        label: "Bpifrance et Business France : mission Agri-Agro Bénin",
        href: "/blog/bpifrance-business-france-agri-agro-benin",
        description: "Une lecture SKS TALENTS d’une mission officielle sur le marché béninois et ses opportunités."
      }
    ],
    ecosystemTitle: "Ressources utiles pour le Bénin",
    ecosystemDescription:
      "Le hub Bénin doit prolonger la lecture pays vers les bons blocs internes : orientation, ressources, écosystème et verticales marché.",
    ecosystemLinks: [
      {
        label: "Écosystème",
        href: "/ecosystem",
        description: "Pour situer réseaux, partenaires, écoles et signaux marché dans une logique plus large."
      },
      {
        label: "Life Sciences",
        href: "/life-sciences",
        description: "Pour remonter vers biotech, diagnostic et autres verticales de référence."
      },
      {
        label: "Animal Health",
        href: "/animal-health",
        description: "Pour les recherches orientées santé animale, vétérinaire et petfood."
      },
      {
        label: "Notre mission",
        href: "/mission",
        description: "Pour comprendre comment SKS TALENTS relie contenu, recrutement et décisions de croissance."
      }
    ],
    ctaTitle: "Vous ciblez le Bénin ou les talents franco-béninois ?",
    ctaDescription:
      "Nous pouvons structurer des contenus, une lecture marché ou une stratégie de visibilité qui reste pertinente localement tout en parlant aux décideurs et talents de vos industries.",
    signatureDescription:
      "Hub pays édité par SKS TALENTS pour relier Bénin, orientation, marchés santé, écosystèmes et contenus utiles aux carrières et aux décisions de recrutement.",
    faq: [
      {
        question: "Pourquoi créer une page Bénin séparée ?",
        answer:
          "Parce que les recherches liées au Bénin doivent être traitées avec un angle dédié, sans être simplement absorbées par des contenus France ou Afrique trop larges."
      },
      {
        question: "Quels sujets Bénin ce hub peut-il soutenir ?",
        answer:
          "L’orientation, les carrières scientifiques, les passerelles de talents, les ressources santé et les contenus utiles pour les professionnels et étudiants en Afrique francophone."
      },
      {
        question: "Le hub Bénin est-il déjà utile même sans article local spécifique ?",
        answer:
          "Oui. Il crée une base géographique claire, relie les bons contenus existants et prépare le terrain pour des contenus béninois plus spécifiques à mesure que la bibliothèque éditoriale s’enrichit."
      }
    ]
  }
};
