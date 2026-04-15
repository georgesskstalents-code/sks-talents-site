type LandingCard = {
  title: string;
  description: string;
  features?: string[];
  accent?: string;
};

type LandingCaseStudy = {
  company: string;
  role: string;
  challenge: string;
  result: string;
  metrics: string[];
};

type LandingLink = {
  href: string;
  label: string;
  description: string;
};

export type VerticalLandingConfig = {
  slug: string;
  kicker: string;
  title: string;
  focus: string;
  description: string;
  stats: { value: string; label: string }[];
  services: LandingCard[];
  packages: LandingCard[];
  challenges: string[];
  caseStudies: LandingCaseStudy[];
  relatedLinks: LandingLink[];
  ctaTitle: string;
  ctaDescription: string;
};

export const verticalLandings: Record<string, VerticalLandingConfig> = {
  "life-sciences": {
    slug: "life-sciences",
    kicker: "Life Sciences",
    title: "Recruter vos experts",
    focus: "Biotech, Diagnostic, Data",
    description:
      "Cabinet specialise en recrutement Life Sciences pour les environnements biotech, diagnostic, genomique, cosmetique scientifique et IA medicale. Une execution precise sur des roles de direction, production, operations, sales et ingenierie, notamment dans des contextes Seed, Serie A et Serie B.",
    stats: [
      { value: "100+", label: "placements reussis" },
      { value: "2.3 mois", label: "delai moyen" },
      { value: "92%", label: "satisfaction" }
    ],
    services: [
      {
        title: "Executive Search sectoriel",
        description:
          "Recherche ciblee de dirigeants, VP, directeurs scientifiques, COO, directions industrielles et leaders transverses sur des marches Life Sciences en tension.",
        features: ["Mapping ecosysteme", "Approche directe", "Shortlist qualifiee"]
      },
      {
        title: "Recrutement experts rares",
        description:
          "Ciblage de profils biotech, bioinfo, qualite, RA, engineering, operations, production et data science avec lecture fine des parcours.",
        features: ["Profils niche", "Evaluation technique", "Cultural fit"]
      },
      {
        title: "Structuration Talent",
        description:
          "Cadrage des postes critiques, sequence de recrutement et accompagnement managers sur les premieres hires de direction, production, operations et sales.",
        features: ["Audit besoin", "Priorisation hires", "Onboarding"]
      }
    ],
    packages: [
      {
        title: "Search complet",
        description: "Pour les roles structurants et les recrutements critiques en biotech, diagnostic ou data.",
        features: ["Cadrage", "Chasse", "Evaluation", "Suivi 6 mois"],
        accent: "Populaire"
      },
      {
        title: "Sprint profils rares",
        description: "Pour accelerer sur une fonction penalisee par la penurie ou une levee de fonds.",
        features: ["Fast-track", "Pipeline resserre", "Pilotage hebdo"]
      },
      {
        title: "Talent advisory",
        description: "Pour clarifier l'organisation, la proposition employeur et le sequencing des recrutements.",
        features: ["Roadmap", "Benchmark", "Calibration"]
      }
    ],
    challenges: [
      "Penurie de talents sur ARN, cell therapy, genomique, RA et qualite.",
      "Cycles de recrutement trop lents face aux enjeux cliniques ou d'industrialisation.",
      "Difficulte a arbitrer entre expertise scientifique et capacite a scaler.",
      "Mauvaise lisibilite des parcours entre academia, startup et grand groupe.",
      "Besoin de hires tres hybrides entre science, produit, operations, production, sales et business.",
      "Turnover couteux lorsqu'un onboarding n'est pas assez cadre."
    ],
    caseStudies: [
      {
        company: "Faircraft.bio",
        role: "Biotech startup",
        challenge: "Constituer un premier socle d'expertise biotech, engineering et data sur une phase Seed / Serie A.",
        result: "Pipeline plus lisible, recrutement de profils critiques et meilleur calibrage des attentes.",
        metrics: ["ARN", "Seed", "Serie A"]
      },
      {
        company: "Roche Diagnostics",
        role: "Diagnostic leader",
        challenge: "Renforcer des fonctions cles sur des environnements diagnostic et NGS.",
        result: "Delais reduits et shortlist plus precise sur des profils fortement concurrencés.",
        metrics: ["NGS", "Diagnostic", "Time-to-hire"]
      },
      {
        company: "Beckman Coulter",
        role: "IVD & instrumentation",
        challenge: "Identifier des leaders avec double lecture technique et terrain.",
        result: "Meilleur alignement entre expertise produit, site et exigences marche.",
        metrics: ["IVD", "Leadership", "Field"]
      },
      {
        company: "Visionix",
        role: "Medtech / diagnostics",
        challenge: "Structurer plusieurs recrutements sur des fonctions de croissance, operations et engineering.",
        result: "Execution plus robuste sur le cadrage, l'evaluation et la retenue des talents.",
        metrics: ["Medtech", "Serie B", "Structuration"]
      }
    ],
    relatedLinks: [
      {
        href: "/life-sciences/biotech",
        label: "Biotech & Therapies",
        description: "ARN, CRISPR, deeptech et manufacturing de therapies avancees."
      },
      {
        href: "/life-sciences/diagnostic",
        label: "Diagnostic & Data",
        description: "IVD, NGS, genomique, IA medicale et data clinique."
      },
      {
        href: "/life-sciences/cosmetique",
        label: "Cosmétique scientifique",
        description: "Formulation, regulatory, marketing international, ingredients actifs et scale-up beauty tech."
      }
    ],
    ctaTitle: "Besoin d'accelerer vos recrutements Life Sciences ?",
    ctaDescription:
      "Parlons de vos roles critiques, de votre marché et du bon dispositif pour sourcer plus juste et plus vite."
  },
  biotech: {
    slug: "biotech",
    kicker: "Biotech & Therapies",
    title: "Recruter vos experts",
    focus: "ARN, CRISPR, Cell Therapy",
    description:
      "Recrutement biotech pour therapies innovantes, biologie synthetique, immunotherapie et scale-up industrielles. Une approche orientee execution sur des profils scientifiques, d'ingenierie, de production, d'operations, de sales et de direction, sur des contextes Seed, Serie A et Serie B.",
    stats: [
      { value: "3 verticales", label: "ARN, CRISPR, deeptech" },
      { value: "2-3 mois", label: "pour les premieres shortlists" },
      { value: "5000+", label: "contacts sectoriels" }
    ],
    services: [
      {
        title: "R&D & translation",
        description: "Scientifiques, translational leads, CMC, process development et quality leaders.",
        features: ["R&D", "CMC", "QA / QC"]
      },
      {
        title: "Regulatory & clinical",
        description: "Affaires reglementaires, operations cliniques, pharmacovigilance et medical affairs.",
        features: ["RA", "Clinical ops", "Medical"]
      },
      {
        title: "Manufacturing & scale-up",
        description: "Industrialisation de therapies complexes, tech transfer et leadership site.",
        features: ["Manufacturing", "Tech transfer", "Site leadership"]
      }
    ],
    packages: [
      {
        title: "Scale-up biotech",
        description: "Pour les startups et growth stories en phase Seed, Serie A ou Serie B, avec structuration equipe.",
        features: ["Sequencing hires", "Employer pitch", "Hiring cadence"],
        accent: "Populaire"
      },
      {
        title: "Search scientific leader",
        description: "Pour CTO, CSO, VP R&D, head of translational ou leaders CMC.",
        features: ["Executive reach", "Confidentialite", "Deep assessment"]
      },
      {
        title: "Build function",
        description: "Pour constituer une equipe complete sur une brique biotech critique.",
        features: ["Mapping talent", "Batch hiring", "Onboarding"]
      }
    ],
    challenges: [
      "Peu de candidats combinent excellence scientifique et execution dans un environnement contraint.",
      "Concurrence forte entre startups financees, Seed, Serie A, Serie B et grands groupes sur les memes profils.",
      "Difficulte a recruter hors des viviers academiques traditionnels.",
      "Besoin de hires capables de tenir le pace entre recherche, clinique et industrialisation.",
      "Sensibilite forte du marche aux reputations d'equipe et aux signaux de gouvernance.",
      "Risque de mismatch entre vision fondatrice et niveau reel du role."
    ],
    caseStudies: [
      {
        company: "Faircraft.bio",
        role: "ARN therapies",
        challenge: "Cadrer plusieurs recrutements tech et science dans une meme phase de croissance.",
        result: "Meilleure lisibilite des priorites de hire et execution plus selective.",
        metrics: ["ARN", "Bioinfo", "Scale-up"]
      },
      {
        company: "Miltenyi Biotec",
        role: "Biotech established player",
        challenge: "Renforcer des fonctions expertes avec une attente elevee sur la qualite du fit.",
        result: "Pipeline plus propre et echanges mieux qualifies avec les candidats.",
        metrics: ["Biotech", "Expertise", "Fit"]
      },
      {
        company: "Solabia",
        role: "Biotech / specialty ingredients",
        challenge: "Recruter sur des roles a l'interface science, qualite et operations.",
        result: "Calibration plus fine du scope de poste et execution plus robuste.",
        metrics: ["Science", "Quality", "Operations"]
      },
      {
        company: "Deeptech ventures",
        role: "Early-stage biotech",
        challenge: "Attirer des profils seniors en direction, operations et engineering sans surpromettre la maturite de structure.",
        result: "Positionnement plus juste des opportunites et meilleure conversion.",
        metrics: ["Seed", "Serie A", "Credibility"]
      }
    ],
    relatedLinks: [
      {
        href: "/life-sciences/biotech/arn-therapies",
        label: "ARN Therapies",
        description: "Recrutement sur therapies ARN, delivery, CMC et leadership scientifique."
      },
      {
        href: "/life-sciences/biotech/deeptech-startups",
        label: "Deeptech Startups",
        description: "Sequencer les hires critiques en early stage biotech."
      }
    ],
    ctaTitle: "Vous recrutez en biotech sur des profils difficiles a approcher ?",
    ctaDescription:
      "Nous pouvons vous aider a clarifier le scope, prioriser les hires et activer un sourcing credible sur les bons viviers."
  },
  diagnostic: {
    slug: "diagnostic",
    kicker: "Diagnostic & Data",
    title: "Recruter vos experts",
    focus: "IVD, NGS, AI Diagnostics",
    description:
      "Recrutement specialise pour le diagnostic in vitro, la genomique, la bioinformatique, l'IA clinique et les fonctions produit, qualite, operations, sales, ingenierie ou field sur des marches techniques et regules, y compris pour des entreprises Seed, Serie A et Serie B.",
    stats: [
      { value: "IVD + Data", label: "double lecture marche" },
      { value: "4 sous-verticales", label: "IVD, NGS, AI, genomique" },
      { value: "2 mois", label: "sur certains profils ciblees" }
    ],
    services: [
      {
        title: "Laboratoire & qualite",
        description: "Profils qualite, validation, applications, operations laboratoire, production, service et engineering.",
        features: ["QA / RA", "Applications", "Lab ops"]
      },
      {
        title: "Data & bioinformatique",
        description: "Bioinformaticiens, data scientists, product managers et experts en diagnostic numerique, avec enjeux de direction produit et execution.",
        features: ["NGS", "Bioinfo", "AI healthcare"]
      },
      {
        title: "Commercial & field",
        description: "KAM, sales specialists, support clinique, service operations et experts terrain sur instrumentation.",
        features: ["Field", "KAM", "Clinical support"]
      }
    ],
    packages: [
      {
        title: "Diagnostics growth",
        description: "Pour les structures qui doivent recruter simultanement produit, data et terrain.",
        features: ["Batch hiring", "Sequencing", "Employer pitch"],
        accent: "Populaire"
      },
      {
        title: "Search NGS & bioinfo",
        description: "Pour les profils analytiques et scientifiques sous tres forte tension.",
        features: ["Sourcing niche", "Assessment", "Calibration"]
      },
      {
        title: "Scale field teams",
        description: "Pour les reseaux terrain, support clinique et roles orientés execution.",
        features: ["Field hiring", "Ramp-up", "Retention"]
      }
    ],
    challenges: [
      "Marches hyper-techniques avec de fortes exigences reglementaires et cliniques.",
      "Convergence de profils tres hybrides entre produit, data, science, operations, production et terrain.",
      "Rareté des bioinformaticiens NGS ou experts AI healthcare vraiment operationnels.",
      "Difficulte a convaincre des profils rares de rejoindre des environnements moins visibles.",
      "Enjeux forts de qualite et de credibilite dans l'evaluation des candidats.",
      "Besoin d'aligner croissance commerciale et excellence scientifique."
    ],
    caseStudies: [
      {
        company: "Roche Diagnostics",
        role: "IVD / NGS",
        challenge: "Renforcer des fonctions cles en qualite, applications, sales et leadership dans des environnements fortement specialises.",
        result: "Meilleur ciblage des profils et reduction du bruit dans les pipelines.",
        metrics: ["IVD", "NGS", "Quality"]
      },
      {
        company: "Beckman Coulter",
        role: "Instrumentation",
        challenge: "Trouver des profils techniques capables de porter une exigence terrain forte.",
        result: "Pipeline plus coherent entre technique, support et execution business.",
        metrics: ["Field", "Instrumentation", "Support"]
      },
      {
        company: "Mindray",
        role: "Diagnostics equipment",
        challenge: "Structurer plusieurs recrutements sur des fonctions interface produit / marche, operations et service.",
        result: "Lecture plus fine du role et meilleure conversion candidats.",
        metrics: ["Equipment", "Serie B", "Execution"]
      },
      {
        company: "ElitechGroup",
        role: "Reactifs & diagnostics",
        challenge: "Approcher des profils rares sur un marche déjà tres sollicite.",
        result: "Shortlists mieux ciblees et meilleure vitesse de decision.",
        metrics: ["Reactifs", "Diagnostics", "Hiring"]
      }
    ],
    relatedLinks: [
      {
        href: "/life-sciences/diagnostic/ivd-testing",
        label: "IVD Testing",
        description: "Qualite, reglementaire, applications et leadership de laboratoires."
      },
      {
        href: "/life-sciences/diagnostic/genomics-ngs",
        label: "Genomics & NGS",
        description: "Bioinfo, genomique clinique et solutions de sequentage."
      },
      {
        href: "/life-sciences/diagnostic/ai-diagnostics",
        label: "AI Diagnostics",
        description: "Talents produit, data et IA pour le diagnostic clinique."
      }
    ],
    ctaTitle: "Vous cherchez des profils diagnostics, NGS ou AI healthcare ?",
    ctaDescription:
      "Nous vous aidons a sourcer des talents credibles a l'interface science, data, produit et business."
  },
  cosmetique: {
    slug: "cosmetique",
    kicker: "Cosmétique scientifique",
    title: "Recruter vos experts",
    focus: "Formulation, Regulatory, Export",
    description:
      "Recrutement specialise pour la cosmetique scientifique, la dermocosmetique, les ingredients actifs et la beauty tech. Une execution adaptee aux entreprises en croissance, y compris en Seed, Serie A et Serie B, sur des roles R&D, regulatory, production, operations, sales, ingenierie et go-to-market.",
    stats: [
      { value: "100+", label: "placements multisectoriels" },
      { value: "10 jours", label: "1re shortlist qualifiee" },
      { value: "Seed / A / B", label: "contextes de croissance" }
    ],
    services: [
      {
        title: "R&D formulation",
        description:
          "Profils formulation, innovation, ingredients actifs, essais, validation, engineering et industrialisation cosmetique.",
        features: ["Formulation", "Ingredients", "Scale-up"]
      },
      {
        title: "Regulatory & quality",
        description:
          "Affaires reglementaires, claims, PIF, INCI, qualite fournisseurs et compliance internationale.",
        features: ["Regulatory", "Claims", "Quality"]
      },
      {
        title: "Marketing & export",
        description:
          "Marketing international, export, business development, sales et leadership commercial sur des environnements premium.",
        features: ["Export", "Marketing", "Business development"]
      }
    ],
    packages: [
      {
        title: "Search roles rares",
        description: "Pour les roles sensibles en formulation, regulatory ou scale-up cosmétique.",
        features: ["Approche directe", "Shortlist ciblee", "Evaluation approfondie"],
        accent: "Populaire"
      },
      {
        title: "Scale-up beauté",
        description: "Pour les marques et industriels qui structurent leur croissance sur plusieurs fonctions clés.",
        features: ["Sequencing hires", "Employer pitch", "Hiring cadence"]
      },
      {
        title: "Talent advisory",
        description: "Pour clarifier le scope, la seniority et la proposition employeur sur un marché concurrentiel.",
        features: ["Benchmark", "Calibration", "Roadmap"]
      }
    ],
    challenges: [
      "Tension forte sur les profils qui combinent lecture technique, marketing, sales et execution internationale.",
      "Besoin de recruter vite sans fragiliser la qualite ou la credibilite de la marque.",
      "Difficulte a sourcer des profils capables de passer de la formulation a l'industrialisation.",
      "Concurrence elevee entre ingredients, dermocosmetique, beauty tech et FMCG premium.",
      "Enjeux de claims, de compliance et de vitesse de lancement sur des marches differencies.",
      "Risque de mismatch entre storytelling marque et realite du role a pourvoir."
    ],
    caseStudies: [
      {
        company: "Solabia",
        role: "Ingredients & diagnostic microbiologique",
        challenge: "Renforcer des fonctions business, export, R&D, production et marketing sur des perimetres internationaux.",
        result: "Plus de 10 recrutements realises et une meilleure securisation des fonctions critiques de croissance.",
        metrics: ["Export", "R&D", "Scale-up"]
      },
      {
        company: "ICAP / cosmetique scientifique",
        role: "Formulation & innovation",
        challenge: "Trouver des profils capables d'aligner innovation, industrialisation et lecture marche.",
        result: "Calibration plus fine des roles et meilleure conversion des profils cibles.",
        metrics: ["Formulation", "Innovation", "Fit"]
      },
      {
        company: "ISIPCA ecosysteme",
        role: "Beauty & fragrance",
        challenge: "Capter des profils rares sur des fonctions a fort contenu expertise et marque.",
        result: "Approche plus credibilisee aupres des candidats et pipeline plus qualifie.",
        metrics: ["Brand", "Expertise", "Go-to-market"]
      },
      {
        company: "Beauty tech ventures",
        role: "Serie A / Serie B",
        challenge: "Structurer rapidement les premieres hires critiques de direction, operations et engineering sur une phase Seed, Serie A ou Serie B.",
        result: "Priorisation plus claire des roles et execution plus robuste du plan de recrutement.",
        metrics: ["Seed", "Serie A", "Serie B"]
      }
    ],
    relatedLinks: [
      {
        href: "/schools",
        label: "Écoles & formations",
        description: "Repérer les viviers de talents en formulation, chimie, cosmetique et business international."
      },
      {
        href: "/resources",
        label: "Ressources marché",
        description: "Accéder aux fonds, comparatifs, études et ressources qui structurent la verticale."
      },
      {
        href: "/references/solabia",
        label: "Référence Solabia",
        description: "Voir un exemple concret de recrutement sur une entreprise du secteur."
      }
    ],
    ctaTitle: "Vous recrutez en cosmétique scientifique ou beauty tech ?",
    ctaDescription:
      "Nous vous aidons a clarifier les roles, approcher les bons profils et accelerer les recrutements critiques sur des marches exigeants."
  },
  "animal-health": {
    slug: "animal-health",
    kicker: "Animal Health",
    title: "Recruter vos experts",
    focus: "Pharma, Cliniques, Petfood",
    description:
      "SKS TALENTS accompagne les laboratoires veterinaries, reseaux de cliniques, biotech sante animale et marques petfood premium sur leurs hires critiques et leur structuration RH.",
    stats: [
      { value: "3 segments", label: "medical vet, care, petfood" },
      { value: "100+", label: "placements multisectoriels" },
      { value: "92%", label: "missions satisfaites" }
    ],
    services: [
      {
        title: "Veterinary pharma & biotech",
        description: "R&D, manufacturing, affaires reglementaires, medical et leadership sante animale.",
        features: ["R&D", "Regulatory", "Manufacturing"]
      },
      {
        title: "Veterinary care",
        description: "Cliniques, managers de site, veterinaries, profils support et plateformes digitales.",
        features: ["Clinics", "Operations", "Care teams"]
      },
      {
        title: "Petfood & nutrition",
        description: "R&D, innovation produit, marketing premium et industrialisation nutrition animale.",
        features: ["Nutrition", "Brand", "Innovation"]
      }
    ],
    packages: [
      {
        title: "Search sectoriel complet",
        description: "Pour des recrutements structurants sur toute la chaine de valeur animal health.",
        features: ["Cadrage", "Approche directe", "Evaluation", "Follow-up"],
        accent: "Populaire"
      },
      {
        title: "Scale operations",
        description: "Pour accelerer des embauches multiples sur reseaux de soins ou business units.",
        features: ["Batch hiring", "Execution cadence", "Reporting"]
      },
      {
        title: "Structuration RH",
        description: "Pour remettre a plat l'organisation, les priorites de hire et la proposition employeur.",
        features: ["Audit", "Roadmap", "Manager enablement"]
      }
    ],
    challenges: [
      "Penurie de veterinaries et difficultes de staffing dans les reseaux de cliniques.",
      "Besoin de profils tres specialises en pharma, vaccins et innovation animale.",
      "Concurrence forte entre groupes, plateformes et acteurs premium du petcare.",
      "Risque de turnover si le projet, les horaires ou la gouvernance sont mal cadres.",
      "Tension entre vitesse d'embauche et qualite de l'evaluation dans les roles terrain.",
      "Structuration RH encore inegale dans des organisations en forte croissance."
    ],
    caseStudies: [
      {
        company: "Affinity Petcare",
        role: "Premium petfood",
        challenge: "Attirer des profils R&D et leadership sur un marche concurrentiel.",
        result: "Meilleure articulation entre role, marque employeur et attentes business.",
        metrics: ["Petfood", "R&D", "Leadership"]
      },
      {
        company: "Saga Nutrition",
        role: "Animal nutrition",
        challenge: "Structurer des recrutements et professionnaliser les process RH.",
        result: "Cadre plus solide pour accelerer sans perdre la qualite d'execution.",
        metrics: ["Nutrition", "HR", "Growth"]
      },
      {
        company: "Qovetia",
        role: "Veterinary platform",
        challenge: "Soutenir une plateforme au contact direct du marche veterinaire.",
        result: "Positionnement plus lisible et recrutement mieux aligne sur le besoin reel.",
        metrics: ["Vet jobs", "Platform", "Market"]
      },
      {
        company: "Veterinary groups",
        role: "Clinic networks",
        challenge: "Recruter sur des marches locaux en tension avec peu de marge d'erreur.",
        result: "Pilotage plus clair entre urgence, qualite et retentivité.",
        metrics: ["Clinics", "Urgency", "Retention"]
      }
    ],
    relatedLinks: [
      {
        href: "/animal-health/medical-vet",
        label: "Medical Vet",
        description: "Pharma veterinaire, vaccins et biotech sante animale."
      },
      {
        href: "/animal-health/veterinary",
        label: "Veterinary",
        description: "Cliniques, diagnostic vet et telemedecine."
      },
      {
        href: "/animal-health/petfood",
        label: "Petfood",
        description: "Nutrition premium, innovation et croissance de marque."
      }
    ],
    ctaTitle: "Vous recrutez dans la sante animale ou le petcare ?",
    ctaDescription:
      "Nous pouvons vous aider a sourcer plus juste, clarifier le role et sécuriser la retention sur un marche animal health sous tension."
  },
  "medical-vet": {
    slug: "medical-vet",
    kicker: "Veterinary Pharma & Biotech",
    title: "Recruter vos experts",
    focus: "R&D, Vaccines, Regulatory",
    description:
      "Page dédiée aux laboratoires et biotech santé animale qui doivent recruter sur la R&D, les vaccins, les affaires reglementaires, le manufacturing ou le medical.",
    stats: [
      { value: "Pharma vet", label: "specialisation sectorielle" },
      { value: "2-3 mois", label: "sur les premiers profils" },
      { value: "High fit", label: "roles fortement techniques" }
    ],
    services: [
      {
        title: "R&D veterinaire",
        description: "Profils scientifiques, translational, tox, formulation et developpement produit.",
        features: ["R&D", "Formulation", "Scientific leadership"]
      },
      {
        title: "Regulatory & quality",
        description: "RA, QA, pharmacovigilance, compliance et documentation produit.",
        features: ["RA", "QA", "PV"]
      },
      {
        title: "Vaccines & manufacturing",
        description: "Production, industrialisation, tech transfer et pilotage de sites.",
        features: ["Vaccines", "Manufacturing", "Scale-up"]
      }
    ],
    packages: [
      {
        title: "Search profils experts",
        description: "Pour des fonctions sensibles ou penuriques en santé animale.",
        features: ["Shortlist ciblee", "Approche directe", "Evaluation"],
        accent: "Populaire"
      },
      {
        title: "Build leadership team",
        description: "Pour renforcer une equipe dirigeante ou une brique fonctionnelle critique.",
        features: ["Leadership mapping", "Calibration", "Offer support"]
      },
      {
        title: "Advisory market",
        description: "Pour clarifier le reel niveau de penurie et la proposition employeur.",
        features: ["Benchmark", "Pitch", "Targeting"]
      }
    ],
    challenges: [
      "Marche etroit avec peu de profils vraiment operationnels en pharma vet.",
      "Convergence rare entre science, reglementaire et execution industrielle.",
      "Besoin de credibilite forte face a des candidats experts et tres sollicités.",
      "Differences marquées entre profils labo, corporate et site industriel.",
      "Difficulte a arbitrer entre seniority, rarete et budget de recrutement.",
      "Risque de cycle trop long sur des roles a forte criticite business."
    ],
    caseStudies: [
      {
        company: "Animal health innovators",
        role: "R&D platforms",
        challenge: "Trouver des profils a forte profondeur scientifique avec lecture business.",
        result: "Selection plus fine et meilleure conversion des candidats approchés.",
        metrics: ["R&D", "Vet pharma", "Scientific fit"]
      },
      {
        company: "Vaccine manufacturers",
        role: "Industrial sites",
        challenge: "Renforcer les fonctions qualite, manufacturing et RA.",
        result: "Pipeline plus propre et decisions plus rapides sur les profils cibles.",
        metrics: ["Vaccines", "QA", "Manufacturing"]
      },
      {
        company: "Biotech animal",
        role: "Innovation",
        challenge: "Attirer des leaders sur des sujets encore emergents.",
        result: "Positionnement de role plus credibile et message employeur mieux calibre.",
        metrics: ["Biotech", "Innovation", "Leadership"]
      },
      {
        company: "Vet pharma groups",
        role: "Growth hires",
        challenge: "Orchestrer plusieurs recrutements sans diluer l'exigence technique.",
        result: "Meilleure priorisation entre urgence, rarete et niveau de role.",
        metrics: ["Growth", "Pipeline", "Hiring"]
      }
    ],
    relatedLinks: [
      {
        href: "/animal-health/medical-vet/pharma-vaccins",
        label: "Pharma & Vaccins",
        description: "R&D, manufacturing et affaires reglementaires."
      },
      {
        href: "/animal-health/medical-vet/biotech-animal",
        label: "Biotech Animal",
        description: "Structures innovantes en sante animale."
      }
    ],
    ctaTitle: "Vous recrutez en pharma veterinaire ou sur des vaccins ?",
    ctaDescription:
      "Nous pouvons vous aider a calibrer le role, approcher les bons candidats et accelerer le time-to-hire."
  },
  veterinary: {
    slug: "veterinary",
    kicker: "Veterinary Clinics & Services",
    title: "Recruter vos experts",
    focus: "Clinics, Care, Telemedicine",
    description:
      "Accompagnement des reseaux de cliniques, groupes veterinaires et plateformes care sur les sujets de staffing medical, management de site et fonctions support.",
    stats: [
      { value: "Market tension", label: "sur les profils veterinaires" },
      { value: "Operations", label: "lecture terrain forte" },
      { value: "Retention", label: "enjeu majeur" }
    ],
    services: [
      {
        title: "Staffing medical",
        description: "Veterinaires, ASV, profils specialistes et staffing de cliniques en ouverture.",
        features: ["Veterinaires", "ASV", "Openings"]
      },
      {
        title: "Managers & network ops",
        description: "Managers de clinique, coordinateurs regionaux et leaders operations.",
        features: ["Managers", "Operations", "Network scaling"]
      },
      {
        title: "Digital care",
        description: "Telemedecine, support patient, relation client et roles hybrides care-tech.",
        features: ["Telemedecine", "Support", "Care-tech"]
      }
    ],
    packages: [
      {
        title: "Clinic hiring sprint",
        description: "Pour des besoins urgents en staffing veterinaire et ouverture de sites.",
        features: ["Urgent hiring", "Screening", "Fast follow-up"],
        accent: "Populaire"
      },
      {
        title: "Network leadership",
        description: "Pour renforcer les couches management et coordination de reseau.",
        features: ["Managers", "Ops", "Leadership"]
      },
      {
        title: "Retention support",
        description: "Pour reduire le turnover et mieux securiser les premiers mois.",
        features: ["Onboarding", "Manager support", "Retention"]
      }
    ],
    challenges: [
      "Penurie structurelle de veterinaries sur de nombreux bassins.",
      "Difficulte a conjuguer vitesse d'embauche, qualite de fit et stabilité.",
      "Horaires, charge emotionnelle et organisation impactent fortement la retention.",
      "Rareté des managers capables de piloter plusieurs sites ou structures.",
      "Croissance des groupes plus rapide que la structuration RH sous-jacente.",
      "Nouveaux besoins liés aux plateformes digitales et au care hybride."
    ],
    caseStudies: [
      {
        company: "Clinic networks",
        role: "Operations & care",
        challenge: "Tenir la cadence d'embauche sans degrader la qualite du recrutement.",
        result: "Meilleure priorisation, lecture plus realiste du marche et execution plus stable.",
        metrics: ["Clinics", "Urgency", "Retention"]
      },
      {
        company: "Qovetia",
        role: "Veterinary jobs platform",
        challenge: "Etre au plus pres du marche et de ses signaux de tension.",
        result: "Meilleur alignement entre cible, proposition et conversion.",
        metrics: ["Platform", "Vet talent", "Market"]
      },
      {
        company: "Telemedicine services",
        role: "Digital veterinary care",
        challenge: "Identifier des profils hybrides entre service, clinique et digital.",
        result: "Cadrage plus fin des roles et execution plus selective.",
        metrics: ["Digital", "Care", "Hybrid roles"]
      },
      {
        company: "Regional groups",
        role: "Multi-site clinics",
        challenge: "Soutenir plusieurs sites avec peu de marge de manoeuvre locale.",
        result: "Pilotage plus clair entre urgence, vivier et qualite de recrutement.",
        metrics: ["Regional", "Multi-site", "Operations"]
      }
    ],
    relatedLinks: [
      {
        href: "/animal-health/veterinary/cliniques",
        label: "Cliniques",
        description: "Ouvertures, staffing medical et management de site."
      },
      {
        href: "/animal-health/veterinary/diagnostic-vet",
        label: "Diagnostic Vet",
        description: "Profils techniques et support pour les reseaux veterinaries."
      },
      {
        href: "/animal-health/veterinary/telemedicine",
        label: "Telemedicine",
        description: "Talents hybrides pour le soin digital et la relation client."
      }
    ],
    ctaTitle: "Vous cherchez a recruter dans les cliniques veterinaires ?",
    ctaDescription:
      "Nous pouvons vous aider a travailler le bon mix entre vivier local, attractivite de poste et retention."
  },
  petfood: {
    slug: "petfood",
    kicker: "Petfood & Nutrition",
    title: "Recruter vos experts",
    focus: "R&D, Product, Premium Brands",
    description:
      "Recrutement premium pour les acteurs de la nutrition animale, du petfood et des marques qui croisent R&D, innovation, marketing, industrialisation et croissance omnicanale.",
    stats: [
      { value: "Premium focus", label: "nutrition & innovation" },
      { value: "Brand + R&D", label: "lecture hybride" },
      { value: "Growth", label: "market execution" }
    ],
    services: [
      {
        title: "Nutrition & formulation",
        description: "Nutritionnistes, formulation, affaires qualite et fonctions scientifiques.",
        features: ["Nutrition", "Formulation", "Quality"]
      },
      {
        title: "Product & innovation",
        description: "Developpement produit, industrialisation et innovation premium.",
        features: ["Product dev", "Innovation", "Industrialisation"]
      },
      {
        title: "Brand & go-to-market",
        description: "Marketing, category, sales et croissance sur des marques a forte valeur.",
        features: ["Brand", "Category", "Commercial growth"]
      }
    ],
    packages: [
      {
        title: "Premium brand hires",
        description: "Pour renforcer des marques qui veulent mieux articuler science, desirabilite et execution.",
        features: ["Brand", "Innovation", "Leadership"],
        accent: "Populaire"
      },
      {
        title: "R&D nutrition sprint",
        description: "Pour accelerer sur des roles formule, qualité, nutrition ou industrialisation.",
        features: ["R&D", "Quality", "Speed"]
      },
      {
        title: "Growth team build",
        description: "Pour structurer marketing, category et go-to-market sur une phase de croissance.",
        features: ["Growth", "Team build", "Execution"]
      }
    ],
    challenges: [
      "Peu de profils savent articuler nutrition, science produit et vision marque.",
      "Concurrence forte entre acteurs premium sur les memes talents.",
      "Besoin d'une lecture fine entre innovation, industrialisation et execution commerciale.",
      "Difficulte a securiser le fit entre culture de marque et exigence operationnelle.",
      "Rareté de leaders capables de parler a la fois R&D et business.",
      "Arbitrages delicats entre desirabilite employeur, localisation et profondeur de role."
    ],
    caseStudies: [
      {
        company: "Affinity Petcare",
        role: "Premium petfood",
        challenge: "Attirer des profils senior en R&D et innovation dans un marche concurrentiel.",
        result: "Meilleure articulation entre valeur du role, exigence business et desirabilite candidat.",
        metrics: ["Premium", "R&D", "Innovation"]
      },
      {
        company: "Saga Nutrition",
        role: "Animal nutrition",
        challenge: "Structurer plusieurs recrutements dans un contexte de croissance.",
        result: "Roadmap de hires plus lisible et execution plus robuste.",
        metrics: ["Nutrition", "Growth", "Structuration"]
      },
      {
        company: "Premium brands",
        role: "Go-to-market",
        challenge: "Trouver des profils hybrides entre category, sales et leadership marque.",
        result: "Meilleure lecture du niveau de role et ciblage plus fin des parcours.",
        metrics: ["Brand", "Category", "Sales"]
      },
      {
        company: "Innovation teams",
        role: "Product development",
        challenge: "Faire converger exigences science, operations et experience consommateur.",
        result: "Cadrage plus propre des postes et meilleure priorisation du hiring.",
        metrics: ["Product", "Experience", "Execution"]
      }
    ],
    relatedLinks: [
      {
        href: "/animal-health/petfood/premium",
        label: "Premium",
        description: "Leadership de marque, desirabilite et strategie de valeur."
      },
      {
        href: "/animal-health/petfood/innovation",
        label: "Innovation",
        description: "R&D, formulation et industrialisation nutrition animale."
      }
    ],
    ctaTitle: "Vous recrutez en petfood, nutrition ou innovation produit ?",
    ctaDescription:
      "Nous pouvons vous aider a aligner lecture du role, valeur de package et ciblage des talents sur un marche premium."
  }
};

export function getVerticalLanding(slug: string) {
  return verticalLandings[slug];
}
