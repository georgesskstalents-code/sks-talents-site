export type EditorialTrack = {
  title: string;
  description: string;
  items: Array<{
    title: string;
    href: string;
    summary: string;
  }>;
};

export const editorialTracks: EditorialTrack[] = [
  {
    title: "France → Afrique",
    description:
      "Le fil rouge de SKS TALENTS : relier les marchés français aux dynamiques d’implantation, de coopération, de talents et de croissance en Afrique francophone.",
    items: [
      {
        title: "Hub France",
        href: "/france",
        summary: "Base France pour fonds, santé, biotech, médecine nucléaire, salaires et recrutements."
      },
      {
        title: "Hub Sénégal",
        href: "/senegal",
        summary: "Bioproduction, santé, orientation et circulation des talents entre la France et Dakar."
      },
      {
        title: "Hub Côte d’Ivoire",
        href: "/cote-divoire",
        summary: "Santé, médecine nucléaire, écosystèmes et talents à Abidjan."
      },
      {
        title: "Hub Bénin",
        href: "/benin",
        summary: "Marché béninois, orientation et contenus France–Bénin à forte valeur."
      }
    ]
  },
  {
    title: "Marchés santé",
    description:
      "Des pages qui expliquent ce qui bouge dans la healthtech, la biotech, la médecine nucléaire, le diagnostic et la santé animale.",
    items: [
      {
        title: "Blog",
        href: "/blog",
        summary: "Le coeur éditorial pour les analyses, signaux marché et contenus de fond."
      },
      {
        title: "Life Sciences",
        href: "/life-sciences",
        summary: "Entrée sectorielle biotech, diagnostic et marchés connexes."
      },
      {
        title: "Animal Health",
        href: "/animal-health",
        summary: "Santé animale, vétérinaire, petfood et fonctions associées."
      },
      {
        title: "Ressources",
        href: "/resources",
        summary: "Le hub transversal pour aller plus loin sur chaque thème."
      }
    ]
  },
  {
    title: "Implantations",
    description:
      "Pages utiles pour lire les marchés, l’export, les partenaires publics et les signaux d’entrée ou d’accélération dans une géographie donnée.",
    items: [
      {
        title: "Business France : services et V.I.E",
        href: "/blog/business-france-services-webinaires-export-vie",
        summary: "Lecture export, V.I.E et internationalisation pour les dirigeants."
      },
      {
        title: "Bpifrance Le Hub",
        href: "/blog/bpifrance-le-hub-services-evenements-startups-investies",
        summary: "Croissance, événements, communautés et accompagnement des startups."
      },
      {
        title: "Bpifrance / Business France au Bénin",
        href: "/blog/bpifrance-business-france-agri-agro-benin",
        summary: "Un exemple concret d’action conjointe sur un marché ouest-africain."
      },
      {
        title: "Écosystème",
        href: "/ecosystem",
        summary: "Les réseaux, clusters et partenaires à suivre pour se repérer."
      }
    ]
  },
  {
    title: "Talents",
    description:
      "Tout ce qui aide à comprendre les viviers, les passerelles de carrière, les enjeux RH et la lecture talent d’un marché.",
    items: [
      {
        title: "Fiches métiers",
        href: "/job-roles",
        summary: "Rôles, responsabilités, compétences, salaires et tensions marché."
      },
      {
        title: "Benchmarks salaires",
        href: "/salary-benchmarks",
        summary: "Repères de rémunération pour cadrer le marché et la discussion package."
      },
      {
        title: "Orientation",
        href: "/orientation",
        summary: "Une passerelle carrière pour étudiants, jeunes diplômés et professionnels."
      },
      {
        title: "Écoles spécialisées",
        href: "/schools",
        summary: "Les viviers académiques utiles à vos industries."
      }
    ]
  },
  {
    title: "Fonctions critiques",
    description:
      "Les pages qui doivent attirer les recherches sur les fonctions qui pèsent le plus sur l’exécution : sales, clinique, réglementation, opérations, qualité, direction.",
    items: [
      {
        title: "Sales Developer & Product Trainer EMEA",
        href: "/job-roles/medical-vet-sales-developer-product-trainer-emea",
        summary: "Un rôle hybride utile aux marchés internationaux et aux réseaux indirects."
      },
      {
        title: "Directeur des Opérations Learning Santé Animale",
        href: "/job-roles/medical-vet-directeur-operations-learning",
        summary: "Une fonction de structuration opérationnelle à fort impact."
      },
      {
        title: "Vétérinaire Imageur",
        href: "/job-roles/veterinary-imageur",
        summary: "Une fonction spécialisée à forte valeur clinique et diagnostique."
      },
      {
        title: "Vétérinaire Développement & Performance Clinique",
        href: "/job-roles/veterinary-developpement-performance-clinique",
        summary: "Un rôle terrain pour structurer la performance des cliniques."
      },
      {
        title: "Ingénieur Validation CSV & Data Integrity",
        href: "/job-roles/biotech-csv-validation-engineer",
        summary: "Un goulot d’exécution GxP avec impact direct sur les délais."
      },
      {
        title: "Regulatory Affairs Specialist IVDR (IVD)",
        href: "/job-roles/diagnostic-ivdr-regulatory-affairs-specialist",
        summary: "La conformité IVDR devient un sujet talent critique."
      },
      {
        title: "Quality Systems Manager Biotech (GMP)",
        href: "/job-roles/biotech-quality-systems-manager",
        summary: "Un role cle pour stabiliser SOP, change control, deviations et CAPA."
      },
      {
        title: "Product Manager IVD (Diagnostic & Medtech)",
        href: "/job-roles/diagnostic-product-manager-ivd",
        summary: "Aligne roadmap, evidence, support et IVDR pour accélérer l'adoption."
      },
      {
        title: "Vétérinaire Urgences & Soins Intensifs (ECC)",
        href: "/job-roles/veterinary-emergency-critical-care-veterinarian",
        summary: "Un goulot d'exécution 24/7 en forte tension dans les réseaux."
      },
      {
        title: "Chief Information Security Officer (CISO) Life Sciences",
        href: "/job-roles/cross-sector-chief-information-security-officer",
        summary: "La cyber devient un sujet d'exécution (data, OT, conformité) au comité de direction."
      }
    ]
  },
  {
    title: "Events",
    description:
      "Pour suivre les signaux d’écosystème, les conférences, séminaires, journées métiers et rendez-vous utiles à la veille et au business development.",
    items: [
      {
        title: "Événements & séminaires",
        href: "/events",
        summary: "Le point d’entrée pour les rendez-vous à suivre et les sources officielles."
      },
      {
        title: "Ressources",
        href: "/resources",
        summary: "La page qui relie événements, réseaux et autres blocs de veille."
      },
      {
        title: "Business France / V.I.E Connect",
        href: "/events/business-france-vie-connect-2026",
        summary: "Un exemple de page événement à valeur marché."
      },
      {
        title: "Annonce du centre de médecine nucléaire d’Abidjan",
        href: "/events/centre-europeen-medecine-nucleaire-abidjan-annonce",
        summary: "Un signal fort entre santé, infrastructure et écosystème ivoirien."
      }
    ]
  },
  {
    title: "Écoles",
    description:
      "Des contenus qui permettent de capter le trafic orientation, viviers et formation, y compris depuis l’Afrique francophone.",
    items: [
      {
        title: "Écoles spécialisées",
        href: "/schools",
        summary: "Le hub des viviers académiques par secteur."
      },
      {
        title: "Guide orientation biotechnologies",
        href: "/orientation/biotechnologies",
        summary: "Un contenu conçu aussi pour les recherches hors de France."
      },
      {
        title: "Université Paris-Saclay",
        href: "/schools/universite-paris-saclay",
        summary: "Une page école déjà utile pour le maillage et l’autorité."
      },
      {
        title: "Oniris",
        href: "/schools/oniris",
        summary: "Un vivier important pour la santé animale."
      }
    ]
  },
  {
    title: "Partenaires",
    description:
      "Les acteurs publics, institutionnels, réseaux, médias et écosystèmes qui donnent de la profondeur au site et renforcent sa crédibilité.",
    items: [
      {
        title: "France Biotech",
        href: "/ecosystem",
        summary: "Partenaire central dans la lecture de la healthtech française."
      },
      {
        title: "Business France",
        href: "/blog/business-france-services-webinaires-export-vie",
        summary: "Source et point d’appui pour l’internationalisation."
      },
      {
        title: "Bpifrance / Le Hub",
        href: "/blog/bpifrance-le-hub-services-evenements-startups-investies",
        summary: "Signal utile pour croissance, recrutement et accompagnement."
      },
      {
        title: "Abidjanaises In Tech",
        href: "/blog/abidjanaises-in-tech-cote-divoire-ecosysteme-sante",
        summary: "Réseau ivoirien important pour les talents, l’inclusion et l’écosystème."
      }
    ]
  }
];
