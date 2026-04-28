export type OfficialSchoolProgram = {
  title: string;
  url: string;
  tags: string[];
};

export type SchoolProgramCatalogEntry = {
  schoolTitle: string;
  schoolSlug?: string;
  matchNames: string[];
  programs: OfficialSchoolProgram[];
};

export const schoolProgramCatalog: SchoolProgramCatalogEntry[] = [
  {
    schoolTitle: "Université Paris-Saclay",
    schoolSlug: "universite-paris-saclay",
    matchNames: ["Universite Paris-Saclay", "Université Paris-Saclay"],
    programs: [
      {
        title: "Master Bio-informatique",
        url: "https://www.universite-paris-saclay.fr/formation/master/bio-informatique",
        tags: ["bioinfo", "informatique", "data", "ia", "genomique", "ngs"]
      },
      {
        title: "Master Biologie moléculaire et cellulaire",
        url: "https://www.universite-paris-saclay.fr/formation/master/biologie-moleculaire-et-cellulaire",
        tags: ["biologie", "biotech", "sciences du vivant", "doctorat", "r&d", "medical affairs"]
      },
      {
        title: "Master Microbiologie",
        url: "https://www.universite-paris-saclay.fr/formation/master/microbiologie",
        tags: ["microbiologie", "biotech", "production", "qualite", "pharmacie"]
      },
      {
        title: "Master Biologie-AgroSciences",
        url: "https://www.universite-paris-saclay.fr/formation/master/biologie-agrosciences",
        tags: ["agro", "nutrition", "animal", "petfood", "sciences du vivant"]
      }
    ]
  },
  {
    schoolTitle: "Faculté de pharmacie, Université de Strasbourg",
    schoolSlug: "faculte-pharmacie-universite-strasbourg",
    matchNames: ["Faculte de pharmacie Strasbourg", "Faculté de pharmacie Strasbourg", "Faculté de pharmacie, Université de Strasbourg"],
    programs: [
      {
        title: "Diplôme d'État de Docteur en pharmacie",
        url: "https://formations.unistra.fr/fr/formations25-26/diplome-d-etat-de-docteur-en-pharmacie-DE_PHA/diplome-d-etat-de-docteur-en-pharmacie-FH28.html",
        tags: ["pharmacie", "medical affairs", "market access", "affaires reglementaires", "qualite", "heor"]
      },
      {
        title: "Diplôme de formation approfondie en sciences pharmaceutiques (DFASP)",
        url: "https://formations.unistra.fr/fr/formations/dfas-diplome-de-formation-approfondie-en-sante-DFAS/diplome-de-formation-approfondie-en-sciences-pharmaceutiques-FH15.html",
        tags: ["pharmacie", "sciences pharmaceutiques", "reglementaire", "qualite", "production"]
      }
    ]
  },
  {
    schoolTitle: "Oniris",
    schoolSlug: "oniris",
    matchNames: ["Oniris"],
    programs: [
      {
        title: "Formation initiale vétérinaire - diplôme d'État de docteur vétérinaire",
        url: "https://www.oniris-nantes.fr/formations/les-formations-veterinaires/formation-initiale-veterinaire",
        tags: ["veterinaire", "animal health", "clinique", "imagerie", "medical vet"]
      },
      {
        title: "Voies d'accès à la formation vétérinaire",
        url: "https://www.oniris-nantes.fr/formations/les-formations-veterinaires/formation-initiale-veterinaire/voies-dacces-a-la-formation-veterinaire",
        tags: ["veterinaire", "etudes", "orientation", "animal health"]
      }
    ]
  },
  {
    schoolTitle: "VetAgro Sup",
    schoolSlug: "vetagro-sup",
    matchNames: ["VetAgro Sup"],
    programs: [
      {
        title: "Docteur vétérinaire",
        url: "https://www.vetagro-sup.fr/formations/",
        tags: ["veterinaire", "animal health", "clinique", "imagerie", "medical vet"]
      },
      {
        title: "Titre d'Auxiliaire Spécialisé Vétérinaire (ASV)",
        url: "https://www.vetagro-sup.fr/asv-auxiliaire-specialise-veterinaire/",
        tags: ["asv", "operations clinique", "parcours client", "veterinaire"]
      }
    ]
  },
  {
    schoolTitle: "ENVT",
    schoolSlug: "envt",
    matchNames: ["ENVT"],
    programs: [
      {
        title: "Formation initiale vétérinaire",
        url: "https://envt.fr/decouvrir-toutes-les-formations/formation-initiale/",
        tags: ["veterinaire", "animal health", "clinique", "medical vet", "imagerie"]
      },
      {
        title: "Internat vétérinaire",
        url: "https://envt.fr/decouvrir-toutes-les-formations/",
        tags: ["internat", "specialisation", "imagerie", "medecine interne", "veterinaire imageur"]
      }
    ]
  },
  {
    schoolTitle: "ENVA",
    schoolSlug: "enva",
    matchNames: ["ENVA"],
    programs: [
      {
        title: "Déroulement des études vétérinaires",
        url: "https://www.vet-alfort.fr/devenir-veterinaire/le-deroulement-des-etudes",
        tags: ["veterinaire", "animal health", "clinique", "medical vet"]
      },
      {
        title: "Tronc commun vétérinaire (A2 à A5)",
        url: "https://www.vet-alfort.fr/formation/formation-initiale-et-specialisee/tronc-commun-a1-a-a4",
        tags: ["veterinaire", "clinique", "imagerie", "medical vet"]
      },
      {
        title: "DE Pratique clinique en médecine interne des animaux de compagnie",
        url: "https://formation-continue.vet-alfort.fr/formation/130/de-medecine-interne",
        tags: ["medecine interne", "veterinaire imageur", "specialisation", "clinique"]
      }
    ]
  },
  {
    schoolTitle: "AgroParisTech",
    schoolSlug: "agroparistech",
    matchNames: ["AgroParisTech"],
    programs: [
      {
        title: "Cursus Ingénieur",
        url: "https://www.agroparistech.fr/formation/cursus-ingenieur-0",
        tags: ["agro", "nutrition", "petfood", "ingenieur", "production"]
      },
      {
        title: "Devenir ingénieur AgroParisTech par apprentissage",
        url: "https://www.agroparistech.fr/formation/apprentissage/candidat-formation-par-apprentissage/devenir-ingenieur-agroparistech-par-apprentissage",
        tags: ["apprentissage", "agro", "production", "petfood", "qualite"]
      }
    ]
  },
  {
    schoolTitle: "Télécom Paris",
    schoolSlug: "telecom-paris-tech",
    matchNames: ["Telecom Paris", "Télécom Paris"],
    programs: [
      {
        title: "Votre formation d’ingénieur",
        url: "https://www.telecom-paris.fr/fr/ingenieur/formation",
        tags: ["informatique", "data", "ia", "cyber", "biomedical", "instrumentation"]
      }
    ]
  },
  {
    schoolTitle: "EPITA",
    schoolSlug: "epita",
    matchNames: ["EPITA"],
    programs: [
      {
        title: "Cycle ingénieur",
        url: "https://www.epita.fr/diplome-ingenieur/cycle-ingenieur/",
        tags: ["informatique", "data", "ia", "cyber", "logiciel", "bioinfo"]
      }
    ]
  },
  {
    schoolTitle: "EBI Cergy",
    schoolSlug: "ecole-biologie-industrielle-cergy",
    matchNames: ["EBI Cergy"],
    programs: [
      {
        title: "Cycle ingénieur de l'EBI",
        url: "https://www.ebi-edu.com/formations-biologie/ingenieur-grande-ecole/cycle-ingenieur/",
        tags: ["biotech", "biologie", "production", "qualite", "formulation"]
      }
    ]
  },
  {
    schoolTitle: "ESBS Strasbourg",
    schoolSlug: "esbs-strasbourg",
    matchNames: ["ESBS Strasbourg"],
    programs: [
      {
        title: "Diplôme d'ingénieur en biotechnologie",
        url: "https://esbs.unistra.fr/formations/diplomes-dingenieur/diplome-dingenieur-en-biotechnologie/",
        tags: ["biotech", "biologie", "production", "qualite", "bioprocedes"]
      },
      {
        title: "Diplôme d'ingénieur spécialité chimie-biotechnologies (ChemBiotech)",
        url: "https://esbs.unistra.fr/de/ausbildung/diplom-in-biotechnologie/chembiotech/parcours-diplome-dingenieur-specialite-chimie-biotechnologies-chembiotech-PR412-19692?tab=cours",
        tags: ["biotech", "chimie", "production", "formulation", "qualite"]
      }
    ]
  },
  {
    schoolTitle: "Grenoble INP - Ensimag",
    schoolSlug: "grenoble-inp-ensimag",
    matchNames: ["Grenoble INP - Ensimag", "Grenoble INP"],
    programs: [
      {
        title: "Formation ingénieur Ensimag",
        url: "https://ensimag.grenoble-inp.fr/fr/formation/formation-ingenieur",
        tags: ["data", "informatique", "ia", "bioinfo", "mathematiques"]
      }
    ]
  },
  {
    schoolTitle: "Audencia",
    schoolSlug: "audencia-animal-health",
    matchNames: ["Audencia Animal Health", "Audencia"],
    programs: [
      {
        title: "Programme Grande École",
        url: "https://www.audencia.com/les-formations/programme-grande-ecole/",
        tags: ["business", "marketing", "commerce", "management", "rh", "finance"]
      }
    ]
  },
  {
    schoolTitle: "ESSEC",
    schoolSlug: "essec-healthcare",
    matchNames: ["ESSEC", "ESSEC Healthcare", "ESSEC, Cergy"],
    programs: [
      {
        title: "Grande École - Master in Management",
        url: "https://essec.edu/fr/pages/mim-master-in-management/",
        tags: ["business", "marketing", "commerce", "management", "finance", "strategie"]
      }
    ]
  },
  {
    schoolTitle: "emlyon business school",
    schoolSlug: "em-lyon-healthcare",
    matchNames: ["EM Lyon", "EM Lyon Healthcare"],
    programs: [
      {
        title: "Programme Grande École",
        url: "https://em-lyon.com/fr/programme-grande-ecole-pge",
        tags: ["business", "marketing", "commerce", "management", "finance", "strategie"]
      },
      {
        title: "Cycle Master du Programme Grande École",
        url: "https://masters.em-lyon.com/fr/programme-grande-ecole-esc/programme-classes-preparatoires/cycle-master",
        tags: ["business", "management", "strategie", "operations", "leadership"]
      }
    ]
  },
  {
    schoolTitle: "Institut Agro Rennes-Angers",
    schoolSlug: "institut-agro-rennes-angers",
    matchNames: ["Institut Agro Rennes Angers", "Institut Agro Rennes-Angers"],
    programs: [
      {
        title: "Ingénieur agronome",
        url: "https://www.institut-agro-rennes-angers.fr/formation/ingenieurs/ingenieur-agronome",
        tags: ["agro", "nutrition", "animal", "petfood", "production"]
      }
    ]
  },
  {
    schoolTitle: "ENSAIA",
    matchNames: ["ENSAIA"],
    programs: [
      {
        title: "Ingénieur Production Agroalimentaire",
        url: "https://ensaia.univ-lorraine.fr/fr/content/ingenieur-production-agroalimentaire",
        tags: ["agroalimentaire", "production", "petfood", "qualite", "nutrition"]
      }
    ]
  },
  {
    schoolTitle: "Institut Agro Montpellier",
    matchNames: ["Institut Agro Montpellier"],
    programs: [
      {
        title: "Ingénieur agronome",
        url: "https://www.institut-agro-montpellier.fr/",
        tags: ["agro", "nutrition", "animal", "petfood", "production"]
      }
    ]
  },
  {
    schoolTitle: "UCO - Master Biotechnologies cosmétique",
    matchNames: ["UCO Biotechnologies cosmetiques"],
    programs: [
      {
        title: "Master Biotechnologies - parcours Ingénierie des produits et process cosmétiques",
        url: "https://www.uco.fr/fr/formations/sciences/master-biotechnologies-cosm%C3%A9tique",
        tags: ["cosmetique", "formulation", "reglementaire", "qualite", "innovation produit"]
      }
    ]
  },
  {
    schoolTitle: "ISIPCA",
    schoolSlug: "isipca",
    matchNames: ["ISIPCA"],
    programs: [
      {
        title: "Formations ISIPCA - cosmétique, parfum, arômes",
        url: "https://www.isipca.fr/fr/formations",
        tags: ["cosmetique", "marketing", "formulation", "innovation produit"]
      }
    ]
  },
  {
    schoolTitle: "ESCOM Compiègne",
    matchNames: ["ESCOM Compiegne"],
    programs: [
      {
        title: "Cycle ingénieur chimiste",
        url: "https://www.escom.fr/formation/cycle-ingenieur-chimiste/",
        tags: ["chimie", "formulation", "cosmetique", "qualite", "production"]
      }
    ]
  },
  {
    schoolTitle: "HEC Paris",
    matchNames: ["HEC Paris"],
    programs: [
      {
        title: "Grande École - Master in Management",
        url: "https://www.hec.edu/fr/grande-ecole-masters/grande-ecole-master-management/programme",
        tags: ["business", "marketing", "management", "finance", "strategie"]
      }
    ]
  },
  {
    schoolTitle: "Institut Pasteur",
    matchNames: ["Institut Pasteur"],
    programs: [
      {
        title: "Centre d'enseignement et de formation",
        url: "https://www.pasteur.fr/fr/enseignement/centre-enseignement?language=fr",
        tags: ["biologie", "microbiologie", "sciences du vivant", "sante publique", "recherche"]
      }
    ]
  },
  {
    schoolTitle: "Université d'Angers",
    matchNames: ["Universite d'Angers", "Université d'Angers"],
    programs: [
      {
        title: "Master Biologie-Santé",
        url: "https://formations.univ-angers.fr/fr/offre-de-formation/master-lmd-MLMD/sciences-technologies-sante-STS/master-biologie-sante-KYLEPWSP.html",
        tags: ["biologie", "sante", "medical affairs", "recherche clinique", "animal"]
      }
    ]
  }
];
