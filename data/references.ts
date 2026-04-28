export type Reference = {
  slug: string;
  company: string;
  category: string;
  descriptor?: string;
  summary: string;
  impact: string;
  logoPath?: string;
  website?: string;
};

export const references: Reference[] = [
  {
    slug: "faircraft-bio",
    company: "Faircraft.bio",
    category: "Deeptech",
    descriptor: "Real leather, grown in a lab",
    summary:
      "Accompagnement sur des profils clés head of engineering et laboratory manager pour soutenir la montée en puissance d’une biotech deeptech.",
    impact:
      "Structuration des recrutements critiques et meilleure lisibilité de la proposition employeur sur une phase d’accélération.",
    logoPath: "/images/partners/faircraft-bio.svg",
    website: "https://www.faircraft.bio/"
  },
  {
    slug: "roche-diagnostics",
    company: "Roche Diagnostics",
    category: "Diagnostic",
    descriptor: "Diagnostic et solutions de laboratoire",
    summary:
      "Appui sur des postes experts et management: ingénieur d’application, ingénieur de maintenance, commerciaux, export sales et business unit manager dans un environnement réglementaire exigeant.",
    impact:
      "Réduction des délais de recrutement sur des profils rares et meilleure couverture d’une organisation terrain très technique.",
    logoPath: "/images/partners/roche-diagnostics.png",
    website: "https://diagnostics.roche.com/"
  },
  {
    slug: "wolf-learning",
    company: "Wolf Learning",
    category: "Structuration RH",
    descriptor: "Conseil en stratégie d’apprentissage en santé animale",
    summary:
      "Clarification des rôles de direction des opérations et marketing dans un contexte international nécessitant l’anglais impératif.",
    impact: "Cadre plus lisible pour l’organisation, la coordination des équipes et les recrutements.",
    logoPath: "/images/partners/wolf-learning.svg",
    website: "https://www.wolf-learning.com/fr/"
  },
  {
    slug: "affinity-petcare",
    company: "Affinity Petcare",
    category: "Petfood premium",
    descriptor: "Petfood et nutrition animale",
    summary:
      "Soutien aux recrutements direction commerciale et autres fonctions business dans un contexte international.",
    impact: "Renforcement des équipes sur des sujets de premiumisation, business development et go-to-market.",
    logoPath: "/images/partners/affinity-petcare.png",
    website: "https://www.affinity-petcare.com/"
  },
  {
    slug: "saga-nutrition",
    company: "Saga Nutrition",
    category: "Nutrition animale",
    descriptor: "Petfood / nutrition animale",
    summary: "Recherche de profils de direction commerciale et leadership dans un marché concurrentiel.",
    impact: "Consolidation de la croissance commerciale et meilleure lisibilité du leadership attendu.",
    logoPath: "/images/partners/saga-nutrition-logo.svg",
    website: "https://www.saga-nutrition.com/"
  },
  {
    slug: "beckman-coulter",
    company: "Beckman Coulter",
    category: "Diagnostic",
    descriptor: "Fabricant d’équipements et solutions de laboratoire",
    summary: "Recrutement sur des positions expertes et commerciales à forte technicité.",
    impact: "Meilleure couverture terrain, support clients et lisibilité technique du mandat.",
    logoPath: "/images/partners/beckman-coulter.png",
    website: "https://www.beckmancoulter.com/"
  },
  {
    slug: "miltenyi-biotec",
    company: "Miltenyi Biotec",
    category: "Biotech",
    descriptor: "Life sciences et cytométrie en flux",
    summary:
      "Accompagnement sur des profils techniques et commerciaux spécialisés en cytométrie en flux et autres techniques.",
    impact: "Pipeline de talents plus ciblé sur des niches complexes à forte technicité.",
    logoPath: "/images/partners/miltenyi-biotec.svg",
    website: "https://www.miltenyibiotec.com/"
  },
  {
    slug: "qovetia",
    company: "Qovetia",
    category: "Groupement de cliniques vétérinaires",
    descriptor: "Plateforme emploi et solutions pour le marché vétérinaire",
    summary:
      "Renforcement des équipes qui soutiennent les cliniques du groupe: commerciaux, opération, direction de clinique, finance, RH, avec aide à la structuration de process RH pour gagner en productivité.",
    impact: "Accélération du développement commercial, meilleur pilotage des opérations et structuration RH plus robuste.",
    logoPath: "/images/partners/qovetia.svg",
    website: "https://qovetia.com/"
  },
  {
    slug: "solabia",
    company: "Solabia",
    category: "Diagnostic microbiologique",
    descriptor: "Biotechnologies, ingrédients et diagnostic microbiologique",
    summary:
      "+10 recrutements réalisés sur des fonctions business, export, R&D et marketing, sur des périmètres internationaux et nationaux.",
    impact: "Structuration de la croissance et sécurisation des recrutements techniques et business.",
    logoPath: "/images/partners/solabia.svg",
    website: "https://www.solabia.com/"
  },
  {
    slug: "biokar-diagnostics",
    company: "Biokar Diagnostics",
    category: "Diagnostic microbiologique",
    descriptor: "Expert en diagnostic microbiologique",
    summary: "Collaboration autour de besoins spécialisés en diagnostic microbiologique et environnements laboratoires exigeants.",
    impact: "Renforcement de l’approche talents sur des fonctions techniques, qualité et support marché.",
    logoPath: "/images/partners/biokar-diagnostics.svg",
    website: "https://www.solabia.com/biokar-diagnostics/"
  },
  {
    slug: "mindray",
    company: "Mindray",
    category: "Dispositifs médicaux",
    descriptor: "Dispositifs médicaux et diagnostic",
    summary: "Appui sur le staffing terrain et les rôles orientés service, support et maintenance.",
    impact: "Meilleure présence client et coordination opérationnelle sur les équipes terrain.",
    logoPath: "/images/partners/mindray.svg",
    website: "https://www.mindray.com/en/products-solutions/solutions/laboratory-diagnostics"
  },
  {
    slug: "visionix",
    company: "Visionix",
    category: "Medtech",
    descriptor: "Solutions ophtalmiques et dispositifs médicaux",
    summary: "Interventions sur des postes à interface business, médical et technique.",
    impact: "Recrutements mieux calibrés sur des cycles complexes.",
    logoPath: "/images/partners/visionix.svg",
    website: "https://www.visionix.com/"
  },
  {
    slug: "conexsante",
    company: "Connex Sante",
    category: "Télémedecine",
    descriptor: "Télémedecine et santé connectée",
    summary: "Aide à la structuration d’une équipe dans un contexte tech et santé.",
    impact: "Clarification des besoins et montée en compétence organisationnelle.",
    logoPath: "/images/partners/connex-sante-wordmark.svg",
    website: "https://conexsante.com/"
  },
  {
    slug: "elitechgroup",
    company: "ELITechGroup",
    category: "Diagnostic (IVD)",
    descriptor: "Diagnostic in vitro et instrumentation",
    summary:
      "+10 recrutements réalisés, ce qui a favorisé la montée en puissance des équipes commerciales, service, maintenance, direction des ventes et ingénierie d’application.",
    impact: "Chaîne de valeur mieux sécurisée sur le terrain et renforcement des départements commerciaux et techniques.",
    logoPath: "/images/partners/elitechgroup.svg",
    website: "https://www.elitechgroup.com/"
  },
  {
    slug: "eurofins",
    company: "Eurofins",
    category: "Testing & life sciences",
    descriptor: "Laboratoires, qualité et support clients",
    summary: "Interventions possibles sur des environnements laboratoire, diagnostic, qualité et support clients à forte exigence.",
    impact: "Renforcement de la capacité à approcher des profils techniques opérant sur des marchés rigoureux.",
    logoPath: "/images/partners/eurofins.svg",
    website: "https://www.eurofins.com/"
  },
  {
    slug: "microline-surgical",
    company: "Microline Surgical",
    category: "Medtech chirurgicale",
    descriptor: "Dispositifs et instrumentation chirurgicale",
    summary:
      "SKS TALENTS a recruté 2 commerciaux pour accompagner le développement terrain de Microline Surgical sur des cycles de vente exigeants.",
    impact:
      "Renforcement ciblé de la force commerciale et meilleure couverture des comptes à fort enjeu dans l'environnement chirurgical.",
    logoPath: "/images/partners/microline-surgical-logo.jpeg",
    website: "https://www.microlinesurgical.com/"
  }
];
