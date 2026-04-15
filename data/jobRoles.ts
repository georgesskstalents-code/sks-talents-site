export type JobRole = {
  slug: string;
  title: string;
  salary: string;
  salarySource?: string;
  sector: string;
  category: string;
  shortageLevel: "Moderee" | "Elevee" | "Tres elevee";
  summary: string;
  skills: string[];
  successFactors: string[];
  path: string[];
  missions: string[];
  studies: string[];
  schools: string[];
  relatedIndustries: string[];
  sources?: {
    name: string;
    url: string;
  }[];
};

type SectorConfig = {
  label: string;
  slugPrefix: string;
  schoolPool: string[];
  relatedIndustries: string[];
};

const sectorConfigs: SectorConfig[] = [
  {
    label: "Biotech",
    slugPrefix: "biotech",
    schoolPool: [
      "Universite Paris-Saclay",
      "ESBS Strasbourg",
      "EBI Cergy",
      "AgroParisTech",
      "Institut Pasteur"
    ],
    relatedIndustries: [
      "Biopharma",
      "Cell therapy",
      "Medtech de rupture",
      "CDMO specialisees",
      "Digital health"
    ]
  },
  {
    label: "Diagnostic",
    slugPrefix: "diagnostic",
    schoolPool: [
      "Universite Paris-Saclay",
      "Grenoble INP - Ensimag",
      "Telecom Paris",
      "Faculte de pharmacie Strasbourg",
      "EPITA"
    ],
    relatedIndustries: [
      "IVD",
      "Molecular diagnostics",
      "Medical imaging",
      "Health data",
      "Laboratoires d'analyses"
    ]
  },
  {
    label: "Cosmetique",
    slugPrefix: "cosmetique",
    schoolPool: [
      "ISIPCA",
      "ICAP Montpellier",
      "UCO Biotechnologies cosmetiques",
      "Chimie ParisTech",
      "ESCOM Compiegne"
    ],
    relatedIndustries: [
      "Beauty tech",
      "Dermocosmetique",
      "Green chemistry",
      "Ingredients actifs",
      "Packaging premium"
    ]
  },
  {
    label: "Medical Vet",
    slugPrefix: "medical-vet",
    schoolPool: [
      "Oniris",
      "VetAgro Sup",
      "ENVT",
      "Faculte de pharmacie Strasbourg",
      "Universite d'Angers"
    ],
    relatedIndustries: [
      "Vet pharma",
      "Vaccins veterinaires",
      "Animal biotech",
      "Nutrition therapeutique animale",
      "Diagnostic veterinaire"
    ]
  },
  {
    label: "Veterinary",
    slugPrefix: "veterinary",
    schoolPool: [
      "Oniris",
      "VetAgro Sup",
      "ENVT",
      "Universite de Liege Vet",
      "Institut Agro Rennes Angers"
    ],
    relatedIndustries: [
      "Groupes de cliniques",
      "Diagnostic vet",
      "Telemedecine vet",
      "Pet insurance",
      "Services veterinaires de specialite"
    ]
  },
  {
    label: "Petfood",
    slugPrefix: "petfood",
    schoolPool: [
      "Institut Agro Montpellier",
      "AgroParisTech",
      "Sciences Agro Bordeaux",
      "ENSAIA",
      "Institut Agro Dijon"
    ],
    relatedIndustries: [
      "Nutrition animale",
      "Feed additives",
      "Agro-industrie",
      "Premium FMCG",
      "Food safety"
    ]
  }
];

type RoleTemplate = {
  key: string;
  title: (sector: string) => string;
  salary: string;
  category: string;
  shortageLevel: JobRole["shortageLevel"];
  summary: (sector: string) => string;
  skills: string[];
  successFactors: (sector: string) => string[];
  path: string[];
  missions: (sector: string) => string[];
  studies: string[];
};

const AON_REWARDS_URL = "https://www.aon.com/france/produits-et-services/rh/benchmark_remuneration.jsp";
const FRANCE_BIOTECH_PANORAMA_URL = "https://france-biotech.fr/publications/le-panorama-france-healthtech/";
const FRANCE_BIOTECH_PANORAMA_2026_URL =
  "https://france-biotech.fr/communiques-de-presse/communiques-france-biotech/panorama-france-healthtech-2026-une-filiere-mature-innovante-et-resiliente-confrontee-a-un-environnement-plus-exigeant/";
const GLASSDOOR_APPLICATION_SPECIALIST_URL =
  "https://www.glassdoor.fr/Salaires/application-specialist-salaire-SRCH_KO0%2C22.htm";
const GLASSDOOR_FIELD_SERVICE_ENGINEER_URL =
  "https://www.glassdoor.fr/Salaires/field-service-engineer-salaire-SRCH_KO0%2C22.htm";
const GLASSDOOR_DIRECTEUR_COMMERCIAL_URL =
  "https://www.glassdoor.fr/Salaires/directeur-commercial-salaire-SRCH_KO0%2C20.htm";
const GLASSDOOR_MANAGER_EXPORT_URL =
  "https://www.glassdoor.fr/Salaires/manager-export-salaire-SRCH_KO0%2C14.htm";
const GLASSDOOR_DRH_URL =
  "https://www.glassdoor.fr/Salaires/directeur-ressources-humaines-salaire-SRCH_KO0%2C29.htm";
const GLASSDOOR_CFO_URL =
  "https://www.glassdoor.fr/Salaires/chief-financial-officer-salaire-SRCH_KO0%2C23.htm";
const GLASSDOOR_MEDICAL_AFFAIRS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/medical-affairs-manager-salaire-SRCH_KO0%2C23.htm";
const GLASSDOOR_MARKET_ACCESS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/market-access-manager-salaire-SRCH_KO0%2C21.htm";
const GLASSDOOR_MEDICAL_SCIENCE_LIAISON_URL =
  "https://www.glassdoor.fr/Salaires/ile-de-france-medical-science-liaison-salaire-SRCH_IL.0%2C13_IS4493_KO14%2C37.htm";
const GLASSDOOR_DATA_SCIENCE_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/data-science-manager-salaire-SRCH_KO0%2C20.htm";
const GLASSDOOR_BUSINESS_UNIT_DIRECTOR_URL =
  "https://www.glassdoor.fr/Salaires/business-unit-manager-salaire-SRCH_KO0%2C21.htm";
const GLASSDOOR_REGIONAL_DIRECTOR_URL =
  "https://www.glassdoor.fr/Salaires/regional-director-salaire-SRCH_KO0%2C17.htm";
const GLASSDOOR_COO_URL =
  "https://www.glassdoor.fr/Salaires/chief-operating-officer-salaire-SRCH_KO0%2C23.htm";
const GLASSDOOR_CEO_URL = "https://www.glassdoor.fr/Salaires/chief-executive-officer-salaire-SRCH_KO0%2C23.htm";
const GLASSDOOR_REGULATORY_AFFAIRS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/manager-regulatory-affairs-regulatory-affairs-salaire-SRCH_KO0%2C45.htm";
const GLASSDOOR_SUPPLY_CHAIN_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/supply-chain-manager-salaire-SRCH_KO0%2C20_P181.htm";
const GLASSDOOR_CUSTOMER_SERVICE_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/paris-customer-service-manager-salaire-SRCH_IL.0%2C5_IM1080_KO6%2C30.htm";
const GLASSDOOR_CLINICAL_AFFAIRS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/clinical-affairs-manager-salaire-SRCH_KO0%2C24.htm";
const GLASSDOOR_FIELD_APPLICATION_SPECIALIST_URL =
  "https://www.glassdoor.fr/Salaires/field-application-specialist-salaire-SRCH_KO0%2C28.htm";
const GLASSDOOR_SECURITY_ENGINEER_URL =
  "https://www.glassdoor.fr/Salaires/security-engineer-salaire-SRCH_KO0%2C17.htm";
const GLASSDOOR_KEY_ACCOUNT_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/key-account-manager-salaire-SRCH_KO0%2C19.htm";
const GLASSDOOR_SALES_OPERATIONS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/sales-operations-manager-salaire-SRCH_KO0%2C24.htm";
const GLASSDOOR_MEDICAL_DIRECTOR_URL =
  "https://www.glassdoor.fr/Salaires/medical-director-salaire-SRCH_KO0%2C16.htm";
const GLASSDOOR_QA_MANAGER_URL = "https://www.glassdoor.fr/Salaires/qa-manager-salaire-SRCH_KO0%2C10.htm";
const GLASSDOOR_MSAT_PROCESS_ENGINEER_URL =
  "https://www.glassdoor.fr/Salaires/msat-process-engineer-salaire-SRCH_KO0%2C21.htm";
const GLASSDOOR_TECH_TRANSFER_SPECIALIST_URL =
  "https://www.glassdoor.fr/Salaires/technology-transfer-specialist-salaire-SRCH_KO0%2C30.htm";
const GLASSDOOR_PRODUCT_OWNER_URL = "https://www.glassdoor.fr/Salaires/product-owner-salaire-SRCH_KO0%2C13.htm";
const GLASSDOOR_AREA_SALES_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/ile-de-france-area-sales-manager-salaire-SRCH_IL.0%2C13_IS4493_KO14%2C32.htm";
const GLASSDOOR_OPERATIONS_DIRECTOR_URL =
  "https://www.glassdoor.fr/Salaires/operations-director-salaire-SRCH_KO0%2C19.htm";
const GLASSDOOR_FINANCE_MANAGER_URL = "https://www.glassdoor.fr/Salaires/finance-manager-salaire-SRCH_KO0%2C15.htm";
const GLASSDOOR_ACCOUNT_MANAGER_URL = "https://www.glassdoor.fr/Salaires/account-manager-salaire-SRCH_KO0%2C15.htm";
const GLASSDOOR_TENDER_MANAGER_URL = "https://www.glassdoor.fr/Salaires/tender-manager-salaire-SRCH_KO0%2C14.htm";
const GLASSDOOR_CHANNEL_MANAGER_URL = "https://www.glassdoor.fr/Salaires/channel-managers-salaire-SRCH_KO0%2C16.htm";
const GLASSDOOR_CUSTOMER_SUCCESS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/customer-success-manager-salaire-SRCH_KO0%2C24.htm";
const GLASSDOOR_COMMERCIAL_EXCELLENCE_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/commercial-excellence-manager-salaire-SRCH_KO0%2C29.htm";
const GLASSDOOR_PRICING_MANAGER_URL = "https://www.glassdoor.fr/Salaires/pricing-manager-salaire-SRCH_KO0%2C15.htm";
const GLASSDOOR_VP_SALES_URL = "https://www.glassdoor.fr/Salaires/vp-sales-salaire-SRCH_KO0%2C8.htm";
const GLASSDOOR_VP_OPERATIONS_URL = "https://www.glassdoor.fr/Salaires/vp-operations-salaire-SRCH_KO0%2C13.htm";
const GLASSDOOR_HEAD_OF_QUALITY_URL = "https://www.glassdoor.fr/Salaires/head-of-quality-salaire-SRCH_KO0%2C15.htm";
const GLASSDOOR_HEAD_OF_REGULATORY_URL =
  "https://www.glassdoor.fr/Salaires/head-of-regulatory-salaire-SRCH_KO0%2C18.htm";
const GLASSDOOR_CHANNEL_MARKETING_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/channel-marketing-manager-salaire-SRCH_KO0%2C25.htm";
const GLASSDOOR_CUSTOMER_EXPERIENCE_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/customer-experience-manager-salaire-SRCH_KO0%2C27.htm";
const GLASSDOOR_SERVICE_OPERATIONS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/service-operations-manager-salaire-SRCH_KO0%2C26.htm";
const GLASSDOOR_REVENUE_OPERATIONS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/revenue-operations-manager-salaire-SRCH_KO0%2C26.htm";
const GLASSDOOR_STRATEGIC_PARTNERSHIPS_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/strategic-partnerships-manager-salaire-SRCH_KO0%2C30.htm";
const GLASSDOOR_BID_MANAGER_URL = "https://www.glassdoor.fr/Salaires/bid-manager-salaire-SRCH_KO0%2C11.htm";
const GLASSDOOR_AFTER_SALES_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/after-sales-manager-salaire-SRCH_KO0%2C19.htm";
const GLASSDOOR_SALES_TRAINING_MANAGER_URL =
  "https://www.glassdoor.fr/Salaires/sales-training-manager-salaire-SRCH_KO0%2C22.htm";

const defaultRoleSources = [
  {
    name: "Aon - Benchmarks de remuneration",
    url: AON_REWARDS_URL
  },
  {
    name: "France Biotech - Panorama France HealthTech",
    url: FRANCE_BIOTECH_PANORAMA_URL
  }
] as const;

type GlassdoorBenchmark = {
  salary: string;
  salarySource: string;
  sourceName: string;
  sourceUrl: string;
};

const glassdoorBenchmarks: Record<string, GlassdoorBenchmark> = {
  "application-engineer": {
    salary: "Base 43kEUR - 56kEUR + 1kEUR - 11kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Ingenieur d'application via le titre comparable Application Specialist. Derniere mise a jour constatee le 25 aout 2025, 14 salaires publies, indice de confiance tres eleve. A ajuster selon instrumentation, zone et exposition terrain.",
    sourceName: "Glassdoor - Application Specialist France",
    sourceUrl: GLASSDOOR_APPLICATION_SPECIALIST_URL
  },
  "maintenance-engineer": {
    salary: "Base 40kEUR - 52kEUR + 3kEUR - 7kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Ingenieur de maintenance via le titre comparable Field Service Engineer. Derniere mise a jour constatee le 28 decembre 2025, 224 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Field Service Engineer France",
    sourceUrl: GLASSDOOR_FIELD_SERVICE_ENGINEER_URL
  },
  "sales-director": {
    salary: "Base 60kEUR - 100kEUR + 10kEUR - 30kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Directeur commercial, utilise ici pour calibrer le package d'un Directeur des ventes. Derniere mise a jour constatee le 11 mars 2026, environ 2,5 k salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Directeur Commercial France",
    sourceUrl: GLASSDOOR_DIRECTEUR_COMMERCIAL_URL
  },
  "export-manager-emea": {
    salary: "Base 40kEUR - 65kEUR + 5kEUR - 12kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Manager export, utilise ici pour l'Export Manager EMEA. Derniere mise a jour constatee le 21 juillet 2025, 106 salaires publies, indice de confiance tres eleve. A majorer quand la zone couvre plusieurs pays ou distributeurs complexes.",
    sourceName: "Glassdoor - Manager Export France",
    sourceUrl: GLASSDOOR_MANAGER_EXPORT_URL
  },
  "export-manager-afrique": {
    salary: "Base 40kEUR - 65kEUR + 5kEUR - 12kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Manager export, utilise ici pour l'Export Manager Afrique. Derniere mise a jour constatee le 21 juillet 2025, 106 salaires publies, indice de confiance tres eleve. A recalibrer selon travel mix, distribution locale et profondeur de zone.",
    sourceName: "Glassdoor - Manager Export France",
    sourceUrl: GLASSDOOR_MANAGER_EXPORT_URL
  },
  drh: {
    salary: "Base 60kEUR - 99kEUR + 6kEUR - 25kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Directeur Ressources Humaines. Derniere mise a jour constatee le 13 octobre 2025, 113 salaires publies, indice de confiance tres eleve. A ajuster selon taille d'effectif, exposition internationale et transformation RH.",
    sourceName: "Glassdoor - Directeur Ressources Humaines France",
    sourceUrl: GLASSDOOR_DRH_URL
  },
  cfo: {
    salary: "Base 70kEUR - 120kEUR + 17kEUR - 46kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Chief Financial Officer. Derniere mise a jour constatee le 1 juillet 2025, 57 salaires publies, indice de confiance tres eleve. A raffiner selon taille de bilan, levee, dette, M&A et gouvernance investisseurs.",
    sourceName: "Glassdoor - Chief Financial Officer France",
    sourceUrl: GLASSDOOR_CFO_URL
  },
  "biotech-medical-affairs-manager": {
    salary: "Base 55kEUR - 90kEUR + 200EUR - 16kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Medical Affairs Manager. Derniere mise a jour constatee le 16 juillet 2025, 10 salaires publies, indice de confiance eleve. A recouper avec Aon pour tenir compte du niveau therapeutique, du scope medical et du mix headquarters / terrain.",
    sourceName: "Glassdoor - Medical Affairs Manager France",
    sourceUrl: GLASSDOOR_MEDICAL_AFFAIRS_MANAGER_URL
  },
  "biotech-market-access-manager": {
    salary: "Base 62kEUR - 85kEUR + 10kEUR - 24kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Market Access Manager. Derniere mise a jour constatee le 4 decembre 2025, 19 salaires publies, indice de confiance tres eleve. A ajuster selon exposition pricing, HTA, geographie et phase clinique.",
    sourceName: "Glassdoor - Market Access Manager France",
    sourceUrl: GLASSDOOR_MARKET_ACCESS_MANAGER_URL
  },
  "medical-vet-medical-science-liaison": {
    salary: "Base 62kEUR - 89kEUR + 7kEUR - 13kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor Ile-de-France utilise pour un Medical Science Liaison, car le marche France sur ce titre reste tres concentre en region parisienne. Derniere mise a jour constatee le 16 juillet 2025, 14 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Medical Science Liaison Ile-de-France",
    sourceUrl: GLASSDOOR_MEDICAL_SCIENCE_LIAISON_URL
  },
  "diagnostic-data-science-manager": {
    salary: "Base 61kEUR - 84kEUR + 3kEUR - 20kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Data Science Manager. Derniere mise a jour constatee le 28 novembre 2025, 16 salaires publies, indice de confiance tres eleve. A majorer si le scope couvre IA produit, management d'equipe et environnement medtech regule.",
    sourceName: "Glassdoor - Data Science Manager France",
    sourceUrl: GLASSDOOR_DATA_SCIENCE_MANAGER_URL
  },
  "business-unit-director": {
    salary: "Base 60kEUR - 125kEUR + 23kEUR - 43kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Business Unit Director via le titre comparable Business Unit Manager. Derniere mise a jour constatee le 16 juillet 2025, 249 salaires publies, indice de confiance tres eleve. A recalibrer selon P&L, scope multi-pays et taille d'equipe.",
    sourceName: "Glassdoor - Business Unit Manager France",
    sourceUrl: GLASSDOOR_BUSINESS_UNIT_DIRECTOR_URL
  },
  "emea-director": {
    salary: "Base 71kEUR - 143kEUR + 15kEUR - 84kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Directeur EMEA via le titre comparable Regional Director. Derniere mise a jour constatee le 11 septembre 2025, 45 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Regional Director France",
    sourceUrl: GLASSDOOR_REGIONAL_DIRECTOR_URL
  },
  coo: {
    salary: "Base 54kEUR - 111kEUR + 10kEUR - 45kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Chief Operating Officer. Derniere mise a jour constatee le 8 juillet 2025, 195 salaires publies, indice de confiance tres eleve. A ajuster selon maturite de la structure, sites et intensite operations.",
    sourceName: "Glassdoor - Chief Operating Officer France",
    sourceUrl: GLASSDOOR_COO_URL
  },
  ceo: {
    salary: "Base 45kEUR - 108kEUR + 15kEUR - 40kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Chief Executive Officer. Derniere mise a jour constatee le 14 decembre 2022, 25 salaires publies, indice de confiance tres eleve mais base plus ancienne. A utiliser comme ancrage bas France, puis a recouper avec la taille de l'entreprise, l'equity et le stade de financement.",
    sourceName: "Glassdoor - Chief Executive Officer France",
    sourceUrl: GLASSDOOR_CEO_URL
  },
  "regulatory-affairs-manager": {
    salary: "Base 48kEUR - 81kEUR + 4kEUR - 12kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Regulatory Affairs Manager. Derniere mise a jour constatee le 21 novembre 2025, 57 salaires publies, indice de confiance tres eleve. A recouper avec la complexite produits, l'exposition internationale et le niveau d'autonomie.",
    sourceName: "Glassdoor - Regulatory Affairs Manager France",
    sourceUrl: GLASSDOOR_REGULATORY_AFFAIRS_MANAGER_URL
  },
  "supply-chain-manager": {
    salary: "Base 51kEUR - 69kEUR + 17kEUR - 22kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Supply Chain Manager. Derniere mise a jour constatee le 23 mars 2025, 12 salaires publies, indice de confiance tres eleve. A majorer sur les perimetres multisites ou fortement regulés.",
    sourceName: "Glassdoor - Supply Chain Manager France",
    sourceUrl: GLASSDOOR_SUPPLY_CHAIN_MANAGER_URL
  },
  "customer-service-manager": {
    salary: "Base 45kEUR - 65kEUR + 3kEUR - 11kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor Paris pour un Customer Service Manager. Derniere mise a jour constatee le 25 aout 2025, 57 salaires publies, indice de confiance tres eleve. A utiliser comme repere de marche tertiaire / support sur des fonctions service B2B.",
    sourceName: "Glassdoor - Customer Service Manager Paris",
    sourceUrl: GLASSDOOR_CUSTOMER_SERVICE_MANAGER_URL
  },
  "diagnostic-clinical-affairs-manager": {
    salary: "Base 44kEUR - 96kEUR + 3kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Clinical Affairs Manager. Derniere mise a jour constatee le 28 aout 2025, 4 salaires publies, indice de confiance faible. A croiser fortement avec Aon, le type de dispositif et la profondeur des etudes cliniques.",
    sourceName: "Glassdoor - Clinical Affairs Manager France",
    sourceUrl: GLASSDOOR_CLINICAL_AFFAIRS_MANAGER_URL
  },
  "diagnostic-field-application-manager": {
    salary: "Base 53kEUR - 89kEUR + 15kEUR - 16kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Field Application Manager via le titre Field Application Specialist. Derniere mise a jour constatee en mars 2026, 5 salaires publies, indice de confiance eleve. A majorer quand il y a management d'equipe ou couverture multi-pays.",
    sourceName: "Glassdoor - Field Application Specialist France",
    sourceUrl: GLASSDOOR_FIELD_APPLICATION_SPECIALIST_URL
  },
  "diagnostic-cybersecurity-engineer": {
    salary: "Base 43kEUR - 70kEUR + 2kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Cybersecurity Engineer via le titre Security Engineer. Derniere mise a jour constatee le 20 juin 2025, 96 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Security Engineer France",
    sourceUrl: GLASSDOOR_SECURITY_ENGINEER_URL
  },
  "diagnostic-key-account-manager-ivd": {
    salary: "Base 45kEUR - 65kEUR + 7kEUR - 20kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Key Account Manager. Derniere mise a jour constatee le 11 aout 2025, 2,3 k salaires publies, indice de confiance tres eleve. Utilise ici pour calibrer un KAM IVD sur les comptes hospitaliers et laboratoires.",
    sourceName: "Glassdoor - Key Account Manager France",
    sourceUrl: GLASSDOOR_KEY_ACCOUNT_MANAGER_URL
  },
  "biotech-sales-operations-director": {
    salary: "Base 45kEUR - 68kEUR + 3kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Sales Operations Director via le titre comparable Sales Operations Manager. Derniere mise a jour constatee le 26 aout 2025, 102 salaires publies, indice de confiance tres eleve. A majorer pour un scope direction, RevOps ou perimetre multi-pays.",
    sourceName: "Glassdoor - Sales Operations Manager France",
    sourceUrl: GLASSDOOR_SALES_OPERATIONS_MANAGER_URL
  },
  "biotech-medical-director": {
    salary: "Base 100kEUR - 160kEUR + 18kEUR - 60kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Medical Director. Derniere mise a jour constatee le 22 octobre 2025, 16 salaires publies, indice de confiance tres eleve. A ajuster selon aire therapeutique, taille d'equipe medicale et exposition HQ / Europe.",
    sourceName: "Glassdoor - Medical Director France",
    sourceUrl: GLASSDOOR_MEDICAL_DIRECTOR_URL
  },
  "biotech-qa-manager": {
    salary: "Base 50kEUR - 65kEUR + 4kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un QA Manager. Derniere mise a jour constatee le 24 juillet 2025, 67 salaires publies, indice de confiance tres eleve. A croiser avec les exigences GMP, release, audits et niveau de responsabilite equipe / site.",
    sourceName: "Glassdoor - QA Manager France",
    sourceUrl: GLASSDOOR_QA_MANAGER_URL
  },
  "biotech-msat-lead": {
    salary: "Base 59kEUR - 64kEUR + 5kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un MSAT Lead via le titre comparable MSAT Process Engineer. Derniere mise a jour constatee le 15 janvier 2025, 1 salaire publie, indice de confiance faible. A majorer nettement si management, pilotage multisites ou ownership industriel complet.",
    sourceName: "Glassdoor - MSAT Process Engineer France",
    sourceUrl: GLASSDOOR_MSAT_PROCESS_ENGINEER_URL
  },
  "biotech-tech-transfer-manager": {
    salary: "Base 48kEUR - 52kEUR",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Tech Transfer Manager via le titre comparable Technology Transfer Specialist. Derniere mise a jour constatee le 12 fevrier 2023, 1 salaire publie, indice de confiance faible. A croiser avec Aon et la maturite industrielle du poste.",
    sourceName: "Glassdoor - Technology Transfer Specialist France",
    sourceUrl: GLASSDOOR_TECH_TRANSFER_SPECIALIST_URL
  },
  "diagnostic-lims-product-owner": {
    salary: "Base 44kEUR - 55kEUR + 2kEUR - 6kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Product Owner. Derniere mise a jour constatee le 4 avril 2026, 3,7 k salaires publies, indice de confiance tres eleve. Utilise ici pour un Product Owner LIMS & Middleware avec ajustement possible selon contexte diagnostic, interopérabilité et contraintes réglementaires.",
    sourceName: "Glassdoor - Product Owner France",
    sourceUrl: GLASSDOOR_PRODUCT_OWNER_URL
  },
  "medical-vet-area-sales-manager": {
    salary: "Base 55kEUR - 68kEUR + 9kEUR - 15kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor Ile-de-France pour un Area Sales Manager. Derniere mise a jour constatee le 24 mars 2025, 3 salaires publies, indice de confiance eleve. A utiliser comme ancrage pour les postes Medical Vet avec zone terrain, distributeurs et variable commerciale.",
    sourceName: "Glassdoor - Area Sales Manager Ile-de-France",
    sourceUrl: GLASSDOOR_AREA_SALES_MANAGER_URL
  },
  "veterinary-clinic-operations-director": {
    salary: "Base 72kEUR - 115kEUR + 7kEUR - 17kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Clinic Operations Director via le titre comparable Operations Director. Derniere mise a jour constatee le 21 novembre 2025, 24 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Operations Director France",
    sourceUrl: GLASSDOOR_OPERATIONS_DIRECTOR_URL
  },
  "veterinary-finance-manager-clinic-group": {
    salary: "Base 50kEUR - 75kEUR + 5kEUR - 13kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Finance Manager. Derniere mise a jour constatee le 1 juillet 2025, 526 salaires publies, indice de confiance tres eleve. A ajuster selon dimension multi-sites, reporting investisseur et pression cash.",
    sourceName: "Glassdoor - Finance Manager France",
    sourceUrl: GLASSDOOR_FINANCE_MANAGER_URL
  },
  "diagnostic-account-manager": {
    salary: "Base 35kEUR - 51kEUR + 4kEUR - 18kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Account Manager. Derniere mise a jour constatee le 17 juin 2025, 5,4 k salaires publies, indice de confiance tres eleve. Utilise ici pour un Account Manager en diagnostic, avec ajustement possible selon complexite technique et taille de portefeuille.",
    sourceName: "Glassdoor - Account Manager France",
    sourceUrl: GLASSDOOR_ACCOUNT_MANAGER_URL
  },
  "diagnostic-tender-manager": {
    salary: "Base 45kEUR - 60kEUR + 2kEUR - 6kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Tender Manager. Derniere mise a jour constatee en mars 2026, 18 salaires publies, indice de confiance tres eleve. A recouper avec la complexite appels d'offres publics, hôpitaux et centrales d'achat.",
    sourceName: "Glassdoor - Tender Manager France",
    sourceUrl: GLASSDOOR_TENDER_MANAGER_URL
  },
  "medical-vet-distributor-manager": {
    salary: "Base 50kEUR - 100kEUR + 10kEUR - 49kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Distributor Manager via le titre comparable Channel Manager. Derniere mise a jour constatee le 3 juillet 2025, 97 salaires publies, indice de confiance tres eleve. Pertinent pour les roles pilotant un reseau de distributeurs et partenaires.",
    sourceName: "Glassdoor - Channel Manager France",
    sourceUrl: GLASSDOOR_CHANNEL_MANAGER_URL
  },
  "diagnostic-customer-success-manager": {
    salary: "Base 37kEUR - 51kEUR + 3kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Customer Success Manager. Derniere mise a jour constatee le 30 juin 2025, 2,2 k salaires publies, indice de confiance tres eleve. A majorer si le poste couvre onboarding, adoption, renouvellement et upsell sur comptes complexes.",
    sourceName: "Glassdoor - Customer Success Manager France",
    sourceUrl: GLASSDOOR_CUSTOMER_SUCCESS_MANAGER_URL
  },
  "biotech-commercial-excellence-manager": {
    salary: "Base 44kEUR - 88kEUR + 4kEUR - 25kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Commercial Excellence Manager. Derniere mise a jour constatee le 29 aout 2025, 6 salaires publies, indice de confiance eleve. A ajuster selon perimetre CRM, forecast, incentive design et pilotage multi-pays.",
    sourceName: "Glassdoor - Commercial Excellence Manager France",
    sourceUrl: GLASSDOOR_COMMERCIAL_EXCELLENCE_MANAGER_URL
  },
  "biotech-pricing-market-access-manager": {
    salary: "Base 47kEUR - 68kEUR + 4kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Pricing Manager, utilise ici en ancrage pour une fonction Pricing & Market Access. Derniere mise a jour constatee le 26 juin 2025, 108 salaires publies, indice de confiance tres eleve. A recouper avec nos benchmarks Aon et le scope HTA / remboursement.",
    sourceName: "Glassdoor - Pricing Manager France",
    sourceUrl: GLASSDOOR_PRICING_MANAGER_URL
  },
  "diagnostic-vp-sales": {
    salary: "Base 100kEUR - 172kEUR + 30kEUR - 100kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un VP Sales. Derniere mise a jour constatee le 17 juin 2025, 102 salaires publies, indice de confiance tres eleve. A ajuster selon zone, structure directe / indirecte et poids du variable.",
    sourceName: "Glassdoor - VP Sales France",
    sourceUrl: GLASSDOOR_VP_SALES_URL
  },
  "biotech-vp-operations": {
    salary: "Base 70kEUR - 130kEUR + 5kEUR - 30kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un VP Operations. Donnees crawlees en mars 2026, 7 salaires publies, indice de confiance eleve. A recouper avec le nombre de sites, la maturite industrielle et la profondeur de transformation attendue.",
    sourceName: "Glassdoor - VP Operations France",
    sourceUrl: GLASSDOOR_VP_OPERATIONS_URL
  },
  "biotech-head-of-quality": {
    salary: "Base 64kEUR - 128kEUR",
    salarySource:
      "Repere Glassdoor France pour un Head of Quality. Donnees crawlées en avril 2026, 4 salaires publies, indice de confiance faible. A utiliser comme ancrage avec prudence et a renforcer par benchmark Aon / maturite GMP du site.",
    sourceName: "Glassdoor - Head of Quality France",
    sourceUrl: GLASSDOOR_HEAD_OF_QUALITY_URL
  },
  "medical-vet-head-of-regulatory": {
    salary: "Base 61kEUR - 65kEUR + 17kEUR - 18kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Head of Regulatory. Donnees crawlées en fevrier 2026, 1 salaire publie, indice de confiance faible. A recouper fortement avec le scope international, produits et equipe reglementaire.",
    sourceName: "Glassdoor - Head of Regulatory France",
    sourceUrl: GLASSDOOR_HEAD_OF_REGULATORY_URL
  },
  "diagnostic-tender-excellence-director": {
    salary: "Base 45kEUR - 60kEUR + 2kEUR - 6kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Tender Excellence Director via le titre Tender Manager. Derniere mise a jour constatee en mars 2026, 18 salaires publies, indice de confiance tres eleve. A majorer pour un scope direction, process excellence et coverage multi-pays.",
    sourceName: "Glassdoor - Tender Manager France",
    sourceUrl: GLASSDOOR_TENDER_MANAGER_URL
  },
  "medical-vet-channel-marketing-manager": {
    salary: "Base 48kEUR - 71kEUR + 1kEUR - 11kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Channel Marketing Manager. Derniere mise a jour constatee en fevrier 2026, 32 salaires publies, indice de confiance tres eleve. Utilise ici pour les environnements channel et distribution en sante animale.",
    sourceName: "Glassdoor - Channel Marketing Manager France",
    sourceUrl: GLASSDOOR_CHANNEL_MARKETING_MANAGER_URL
  },
  "medical-vet-distributor-excellence-manager": {
    salary: "Base 50kEUR - 100kEUR + 10kEUR - 49kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Distributor Excellence Manager via le titre comparable Channel Manager. Derniere mise a jour constatee le 3 juillet 2025, 97 salaires publies, indice de confiance tres eleve.",
    sourceName: "Glassdoor - Channel Manager France",
    sourceUrl: GLASSDOOR_CHANNEL_MANAGER_URL
  },
  "diagnostic-customer-experience-director": {
    salary: "Base 38kEUR - 72kEUR + 2kEUR - 8kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Customer Experience Director via le titre Customer Experience Manager. Derniere mise a jour constatee en mars 2026, 56 salaires publies, indice de confiance tres eleve. A majorer pour un scope direction, service design et multi-equipes.",
    sourceName: "Glassdoor - Customer Experience Manager France",
    sourceUrl: GLASSDOOR_CUSTOMER_EXPERIENCE_MANAGER_URL
  },
  "diagnostic-service-operations-director": {
    salary: "Base 37kEUR - 81kEUR + 4kEUR - 8kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Service Operations Director via le titre Service Operations Manager. Derniere mise a jour constatee en avril 2026, 7 salaires publies, indice de confiance eleve. A rehausser selon taille d'equipe terrain et niveau de direction.",
    sourceName: "Glassdoor - Service Operations Manager France",
    sourceUrl: GLASSDOOR_SERVICE_OPERATIONS_MANAGER_URL
  },
  "biotech-revenue-operations-manager": {
    salary: "Base 54kEUR - 70kEUR + 4kEUR - 10kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Revenue Operations Manager. Derniere mise a jour constatee en avril 2026, 36 salaires publies, indice de confiance tres eleve. Tres utile pour les organisations biotech qui structurent pipeline, CRM et forecast.",
    sourceName: "Glassdoor - Revenue Operations Manager France",
    sourceUrl: GLASSDOOR_REVENUE_OPERATIONS_MANAGER_URL
  },
  "diagnostic-bid-manager-international": {
    salary: "Base 50kEUR - 74kEUR + 4kEUR - 9kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Bid Manager. Derniere mise a jour constatee en mars 2026, 210 salaires publies, indice de confiance tres eleve. A ajuster pour un scope international, appels d'offres complexes et gestion multi-pays.",
    sourceName: "Glassdoor - Bid Manager France",
    sourceUrl: GLASSDOOR_BID_MANAGER_URL
  },
  "biotech-strategic-partnerships-manager": {
    salary: "Base 52kEUR - 95kEUR + 4kEUR - 18kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France pour un Strategic Partnerships Manager. Derniere mise a jour constatee en mars 2026, 13 salaires publies, indice de confiance tres eleve. A majorer si la fonction porte des alliances structurantes, licensing ou co-developpement.",
    sourceName: "Glassdoor - Strategic Partnerships Manager France",
    sourceUrl: GLASSDOOR_STRATEGIC_PARTNERSHIPS_MANAGER_URL
  },
  "diagnostic-after-sales-director": {
    salary: "Base 40kEUR - 83kEUR + 2kEUR - 3kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un After-Sales Director via le titre After Sales Manager. Derniere mise a jour constatee en mars 2026, 9 salaires publies, indice de confiance tres eleve. A rehausser si le poste couvre une direction multi-sites ou EMEA.",
    sourceName: "Glassdoor - After Sales Manager France",
    sourceUrl: GLASSDOOR_AFTER_SALES_MANAGER_URL
  },
  "medical-vet-commercial-training-manager": {
    salary: "Base 41kEUR - 103kEUR + 6kEUR - 13kEUR de variable / complement",
    salarySource:
      "Repere Glassdoor France utilise comme proxy pour un Commercial Training Manager via le titre Sales Training Manager. Donnees crawlées en fevrier 2026, 4 salaires publies, indice de confiance faible. A croiser avec l'anciennete, la taille de force de vente et la complexite technique.",
    sourceName: "Glassdoor - Sales Training Manager France",
    sourceUrl: GLASSDOOR_SALES_TRAINING_MANAGER_URL
  }
};

const roleTemplates: RoleTemplate[] = [
  {
    key: "application-engineer",
    title: (sector) => `Ingenieur d'application ${sector}`,
    salary: "45kEUR - 70kEUR + variable",
    category: "Customer success / support technique",
    shortageLevel: "Tres elevee",
    summary: (sector) =>
      `Accompagne la mise en service, la formation client et l'adoption des solutions ${sector.toLowerCase()} sur des environnements techniques exigeants.`,
    skills: ["Formation client", "Support terrain", "Diagnostic technique", "Ecoute besoin", "Anglais"],
    successFactors: (sector) => [
      `Comprendre les usages clients du ${sector.toLowerCase()} au-dela du produit.`,
      "Faire le lien entre expertise technique, pedagogie et reactivite terrain.",
      "Savoir rassurer, former et remonter les signaux utiles aux ventes et au produit."
    ],
    path: ["Ingenieur support", "Field application specialist", "Responsable applications"],
    missions: (sector) => [
      `Former les utilisateurs et equipes clientes sur les solutions ${sector.toLowerCase()}.`,
      "Assurer l'interface entre clients, ventes, qualite et support produit.",
      "Faire remonter les besoins terrain vers les equipes produit et operations."
    ],
    studies: [
      "Master biotechnologies, biologie, diagnostic ou ingenierie",
      "Diplome d'ingenieur en sciences de la vie ou instrumentation"
    ]
  },
  {
    key: "maintenance-engineer",
    title: (sector) => `Ingenieur de maintenance ${sector}`,
    salary: "42kEUR - 68kEUR + primes",
    category: "Operations / service",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Garantit la disponibilite des equipements critiques en contexte ${sector.toLowerCase()}, de l'installation au troubleshooting avance.`,
    skills: ["Maintenance preventive", "GMAO", "Instrumentation", "Validation", "Relation client"],
    successFactors: () => [
      "Travailler avec methode, rigueur documentaire et sens de l'urgence.",
      "Savoir prioriser les incidents sans perdre la qualite d'execution.",
      "Etre credible autant face aux operations qu'au client final."
    ],
    path: ["Technicien expert", "Ingenieur service", "Service manager"],
    missions: (sector) => [
      "Planifier la maintenance preventive et corrective des equipements.",
      "Intervenir sur incidents critiques en lien avec qualite et production.",
      `Securiser la continuite d'exploitation dans des environnements ${sector.toLowerCase()} sensibles.`
    ],
    studies: ["Diplome d'ingenieur maintenance / instrumentation", "Master genie industriel ou biomedical"]
  },
  {
    key: "middleware-engineer",
    title: (sector) => `Ingenieur Middleware ${sector}`,
    salary: "50kEUR - 78kEUR",
    category: "Digital / interoperability",
    shortageLevel: "Tres elevee",
    summary: (sector) =>
      `Concoit les briques d'interoperabilite entre instruments, LIMS, ERP et flux de donnees pour des environnements ${sector.toLowerCase()} fortement regules.`,
    skills: ["APIs", "Interoperabilite", "HL7 / ASTM / middleware", "Securite", "Documentation technique"],
    successFactors: () => [
      "Avoir une double lecture architecture SI et contraintes metier.",
      "Documenter proprement pour garantir maintenance et conformite.",
      "Anticiper performance, securite et evolutivite des integrations."
    ],
    path: ["Developpeur integration", "Systems engineer", "Architecte solutions"],
    missions: (sector) => [
      "Connecter les instruments et logiciels metiers aux SI clients.",
      "Fiabiliser les flux de donnees et la tracabilite applicative.",
      `Contribuer a la cybersecurite et a la disponibilite des plateformes ${sector.toLowerCase()}.`
    ],
    studies: ["Diplome d'ingenieur informatique", "Master informatique sante, data ou systemes industriels"]
  },
  {
    key: "sales-director",
    title: (sector) => `Directeur des ventes ${sector}`,
    salary: "85kEUR - 140kEUR + variable",
    category: "Commercial",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Pilote la strategie commerciale, les equipes terrain et les cycles complexes dans le ${sector.toLowerCase()}.`,
    skills: ["Leadership commercial", "Forecast", "KAM", "Negociation complexe", "Management"],
    successFactors: (sector) => [
      `Maitriser des cycles de vente longs et techniques dans le ${sector.toLowerCase()}.`,
      "Savoir transformer une equipe en machine d'execution sans perdre la finesse terrain.",
      "Tenir ensemble croissance, marge et qualite de relation client."
    ],
    path: ["KAM senior", "Regional sales manager", "Directeur commercial"],
    missions: (sector) => [
      `Construire et executer la strategie commerciale sur le marche ${sector.toLowerCase()}.`,
      "Manager les equipes vente, distribution et support avant-vente.",
      "Suivre pipeline, marge, previsions et priorites grands comptes."
    ],
    studies: ["Ecole de commerce", "Ingenieur avec experience business", "Master marketing / vente B2B"]
  },
  {
    key: "business-unit-director",
    title: (sector) => `Directeur Business Unit ${sector}`,
    salary: "100kEUR - 170kEUR + bonus",
    category: "Direction generale",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Porte un P&L, une feuille de route de croissance et une execution transverse sur toute la chaine de valeur ${sector.toLowerCase()}.`,
    skills: ["P&L", "Go-to-market", "Operations", "Leadership transverse", "Strategie"],
    successFactors: () => [
      "Arbitrer vite entre croissance, priorites operations et ressources.",
      "Donner une direction claire a des fonctions tres differentes.",
      "Mesurer la performance avec une vraie discipline de pilotage."
    ],
    path: ["Directeur commercial", "Operations director", "GM / BU head"],
    missions: (sector) => [
      "Piloter chiffre d'affaires, rentabilite et feuille de route business.",
      "Aligner ventes, marketing, supply, service et qualite.",
      `Arbitrer les priorites de croissance sur la business unit ${sector.toLowerCase()}.`
    ],
    studies: ["Grande ecole de commerce", "Diplome d'ingenieur", "MBA ou executive education"]
  },
  {
    key: "emea-director",
    title: (sector) => `Directeur EMEA ${sector}`,
    salary: "120kEUR - 220kEUR + variable",
    category: "Direction internationale",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Coordonne la croissance regionale, les pays, les distributeurs et la gouvernance pour les activites ${sector.toLowerCase()} en zone EMEA.`,
    skills: ["Multi-country leadership", "Distribution", "Change management", "Finance", "Compliance"],
    successFactors: () => [
      "Comprendre les differences pays sans casser la coherence regionale.",
      "Piloter via les bons relais locaux et les bons indicateurs.",
      "Etre solide sur la gouvernance, la distribution et l'execution."
    ],
    path: ["Country manager", "Regional director", "VP EMEA"],
    missions: (sector) => [
      "Definir la priorisation pays et les modeles go-to-market.",
      "Piloter les directeurs locaux et partenaires distribution.",
      `Securiser execution, croissance et conformite sur le perimetre ${sector.toLowerCase()}.`
    ],
    studies: ["Grande ecole", "Diplome d'ingenieur", "MBA international"]
  },
  {
    key: "export-manager-emea",
    title: (sector) => `Export Manager EMEA ${sector}`,
    salary: "65kEUR - 110kEUR + variable",
    category: "Developpement international",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Developpe les ventes export, les distributeurs et la penetration de marche sur les activites ${sector.toLowerCase()} en zone EMEA.`,
    skills: ["Distribution internationale", "Vente B2B", "Appels d'offres", "Negociation", "Anglais"],
    successFactors: (sector) => [
      `Comprendre les differences reglementaires et commerciales du ${sector.toLowerCase()} selon les pays EMEA.`,
      "Savoir piloter des distributeurs tout en gardant la maitrise de la performance.",
      "Combiner rigueur de forecast, presence terrain et lecture politique des comptes."
    ],
    path: ["Area manager", "Regional sales manager", "Head of export"],
    missions: (sector) => [
      "Structurer le reseau de distribution et les priorites pays sur la zone EMEA.",
      "Animer les comptes clefs, partenaires et plans d'action commerciaux.",
      `Accelerer la croissance export des solutions ${sector.toLowerCase()} sur des cycles de vente complexes.`
    ],
    studies: ["Ecole de commerce", "Ingenieur avec fibre business", "Master commerce international"]
  },
  {
    key: "export-manager-afrique",
    title: (sector) => `Export Manager Afrique ${sector}`,
    salary: "60kEUR - 105kEUR + variable",
    category: "Developpement international",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Porte le developpement business, les partenariats locaux et les modeles de distribution pour les activites ${sector.toLowerCase()} en Afrique.`,
    skills: ["Business development Afrique", "Distribution", "KAM", "Negociation", "Francais / anglais"],
    successFactors: (sector) => [
      `Adapter l'approche commerciale aux realites de terrain du ${sector.toLowerCase()} en Afrique.`,
      "Identifier les bons relais locaux, les bons partenaires et les bons rythmes de decision.",
      "Allier vision long terme, execution terrain et forte qualite relationnelle."
    ],
    path: ["Area manager Afrique", "Regional export manager", "Head of Africa"],
    missions: (sector) => [
      "Prioriser les pays, les distributeurs et les relais institutionnels de la zone.",
      "Construire des plans de croissance adaptables selon maturite marche et infrastructure.",
      `Porter les activites ${sector.toLowerCase()} en Afrique avec une approche commerciale et operationnelle robuste.`
    ],
    studies: ["Ecole de commerce", "Ingenieur avec experience terrain", "Master commerce international"]
  },
  {
    key: "coo",
    title: (sector) => `COO ${sector}`,
    salary: "130kEUR - 230kEUR + variable",
    category: "Direction operations",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Structure l'execution globale entre R&D, production, supply, qualite, service et performance dans des environnements ${sector.toLowerCase()} en acceleration.`,
    skills: ["Scale-up operations", "Execution", "KPI", "Industrialisation", "Leadership"],
    successFactors: () => [
      "Passer d'une logique heroique a une logique systeme.",
      "Savoir prioriser les goulots, rythmer l'execution et tenir les equipes.",
      "Transformer la complexite en routines operationnelles robustes."
    ],
    path: ["Operations director", "Site leader", "VP operations"],
    missions: (sector) => [
      "Aligner les fonctions critiques autour d'une execution robuste.",
      "Mettre sous controle capacite, delais, qualite et service.",
      `Accompagner la croissance et la transformation des operations ${sector.toLowerCase()}.`
    ],
    studies: ["Diplome d'ingenieur", "Formation operations / supply", "Executive education"]
  },
  {
    key: "ceo",
    title: (sector) => `CEO ${sector}`,
    salary: "160kEUR - 300kEUR + variable / equity",
    category: "Direction generale",
    shortageLevel: "Moderee",
    summary: (sector) =>
      `Porte la vision, la croissance, le financement et la structuration globale d'une organisation ${sector.toLowerCase()} a fort enjeu de marche.`,
    skills: ["Vision strategique", "Leadership", "Investors", "Commercial", "Execution"],
    successFactors: () => [
      "Donner une vision lisible et mobilisatrice.",
      "Savoir lever, vendre, recruter et arbitrer avec le meme niveau d'exigence.",
      "Construire une equipe de direction capable d'executer sans vous ralentir."
    ],
    path: ["BU director", "GM", "COO", "Founder / CEO"],
    missions: (sector) => [
      "Definir la strategie et les priorites de croissance.",
      "Porter la relation investisseurs, partenaires et instances clefs.",
      `Arbitrer les grandes decisions de transformation pour l'activite ${sector.toLowerCase()}.`
    ],
    studies: ["Ingenieur ou ecole de commerce", "Parcours entrepreneurial", "MBA optionnel"]
  },
  {
    key: "cfo",
    title: (sector) => `CFO ${sector}`,
    salary: "110kEUR - 210kEUR + variable",
    category: "Finance",
    shortageLevel: "Moderee",
    summary: (sector) =>
      `Cadre la trajectoire financiere, la performance et la gouvernance d'une entreprise ${sector.toLowerCase()} en croissance ou sous contrainte de cash.`,
    skills: ["FP&A", "Cash management", "Controle de gestion", "M&A / fundraising", "Gouvernance"],
    successFactors: () => [
      "Rendre la finance lisible pour les decideurs non financiers.",
      "Combiner rigueur de controle, capacite d'anticipation et sens business.",
      "Accompagner les phases de croissance sans perdre la maitrise du cash."
    ],
    path: ["Finance manager", "Head of finance", "Finance director"],
    missions: (sector) => [
      "Piloter budget, cash, scenario planning et rentabilite.",
      "Fiabiliser le reporting pour board, investisseurs et direction.",
      `Accompagner les enjeux de scale-up ou de consolidation ${sector.toLowerCase()}.`
    ],
    studies: ["Ecole de commerce", "DSCG / expertise comptable", "Master finance"]
  },
  {
    key: "drh",
    title: (sector) => `DRH ${sector}`,
    salary: "80kEUR - 140kEUR + variable",
    category: "Ressources humaines",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Structure la politique RH, le recrutement, la performance et l'organisation d'une entreprise ${sector.toLowerCase()} dans un marche de talents penurique.`,
    skills: ["Talent acquisition", "Organisation", "Performance", "Dialogue social", "Leadership RH"],
    successFactors: (sector) => [
      `Comprendre les contraintes metier et la realite terrain du ${sector.toLowerCase()}.`,
      "Savoir recruter sur des profils rares tout en structurant les managers.",
      "Faire des RH un levier de croissance, pas seulement une fonction support."
    ],
    path: ["HR business partner", "Talent manager", "Head of HR / DRH"],
    missions: (sector) => [
      "Construire la feuille de route RH: recrutement, onboarding, performance, retention.",
      "Accompagner les managers sur les recrutements et l'organisation.",
      `Mettre sous controle les enjeux de talents, engagement et execution dans le ${sector.toLowerCase()}.`
    ],
    studies: ["Master RH", "Ecole de commerce", "Psychologie du travail", "Droit social / management"]
  },
  {
    key: "regulatory-affairs-manager",
    title: (sector) => `Regulatory Affairs Manager ${sector}`,
    salary: "58kEUR - 92kEUR",
    category: "Reglementaire",
    shortageLevel: "Tres elevee",
    summary: (sector) =>
      `Structure la strategie reglementaire et les submissions dans des environnements ${sector.toLowerCase()} fortement encadres.`,
    skills: ["Regulatory strategy", "Submissions", "Dossiers techniques", "Normes", "Coordination"],
    successFactors: () => [
      "Avoir une lecture business des contraintes réglementaires.",
      "Savoir coordonner sans autorite hierarchique forte.",
      "Traduire la complexite normative en decisions pratiques."
    ],
    path: ["RA specialist", "RA manager", "Head of RA"],
    missions: (sector) => [
      "Construire la strategie d'enregistrement et de maintien sur le marche.",
      "Coordonner R&D, qualite, clinique et operations sur les exigences reglementaires.",
      `Anticiper les impacts des evolutions normatives sur les activites ${sector.toLowerCase()}.`
    ],
    studies: ["Master affaires reglementaires", "Pharmacie", "Ingenieur ou master sciences"]
  },
  {
    key: "production-manager",
    title: (sector) => `Production Manager ${sector}`,
    salary: "60kEUR - 95kEUR",
    category: "Production",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Pilote la performance industrielle, la qualite et la capacite sur des lignes ${sector.toLowerCase()} sensibles.`,
    skills: ["Lean", "Pilotage equipe", "GMP / qualite", "KPI", "Planification"],
    successFactors: () => [
      "Tenir la cadence sans sacrifier qualite ni securite.",
      "Piloter avec des indicateurs simples et visibles.",
      "Faire monter les equipes en autonomie et en discipline."
    ],
    path: ["Ingénieur production", "Superviseur", "Responsable production"],
    missions: (sector) => [
      "Organiser la production et les ressources selon la charge.",
      "Tenir les objectifs de delai, qualite et productivite.",
      `Coordonner avec supply, qualite et maintenance sur les operations ${sector.toLowerCase()}.`
    ],
    studies: ["Diplome d'ingenieur industriel", "Master production / qualite"]
  },
  {
    key: "supply-chain-manager",
    title: (sector) => `Supply Chain Manager ${sector}`,
    salary: "60kEUR - 100kEUR",
    category: "Supply chain",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Securise approvisionnements, planification et execution logistique dans des organisations ${sector.toLowerCase()} sous tension.`,
    skills: ["S&OP", "Planning", "Procurement", "Logistique", "Risk management"],
    successFactors: () => [
      "Savoir gerer l'incertitude et les dependances critiques.",
      "Rendre la supply lisible pour les ventes, la production et la direction.",
      "Anticiper plutot que subir les ruptures."
    ],
    path: ["Planner", "Supply lead", "Head of supply chain"],
    missions: (sector) => [
      "Piloter les flux de matieres, produits et informations.",
      "Reduire les risques de rupture et les surstocks.",
      `Aligner les capacites supply avec la croissance des activites ${sector.toLowerCase()}.`
    ],
    studies: ["Master supply chain", "Diplome d'ingenieur", "Master operations"]
  },
  {
    key: "customer-service-manager",
    title: (sector) => `Customer Service Manager ${sector}`,
    salary: "48kEUR - 78kEUR",
    category: "Customer service",
    shortageLevel: "Elevee",
    summary: (sector) =>
      `Coordonne l'experience client, le support et les escalades dans des environnements ${sector.toLowerCase()} ou la qualite de service est critique.`,
    skills: ["Service client B2B", "Escalation management", "KPI service", "Coordination transverse"],
    successFactors: () => [
      "Garder une posture de service meme sous tension.",
      "Transformer les irritants clients en actions structurelles.",
      "Piloter les SLA sans perdre la qualite relationnelle."
    ],
    path: ["Customer support lead", "Service operations", "Customer success director"],
    missions: (sector) => [
      "Piloter les demandes clients, SLA et incidents majeurs.",
      "Coordonner support, logistique, qualité et équipes commerciales.",
      `Ameliorer l'experience client sur des parcours ${sector.toLowerCase()} complexes.`
    ],
    studies: ["Master management", "Licence scientifique + experience support", "Ecole de commerce"]
  },
  {
    key: "ai-product-manager",
    title: (sector) => `AI Product Manager ${sector}`,
    salary: "65kEUR - 105kEUR",
    category: "AI / produit",
    shortageLevel: "Tres elevee",
    summary: (sector) =>
      `Traduit des besoins metier ${sector.toLowerCase()} en roadmap IA utile, explicable et deployable.`,
    skills: ["Product discovery", "AI literacy", "Priorisation", "Regulation", "UX data"],
    successFactors: () => [
      "Relier la valeur metier a la faisabilite technique.",
      "Arbitrer entre innovation, adoption et risque.",
      "Rendre l'IA utile, lisible et deployable pour le terrain."
    ],
    path: ["Product owner", "Data product manager", "AI lead"],
    missions: (sector) => [
      "Identifier les cas d'usage IA a plus forte valeur metier.",
      "Prioriser les evolutions produit avec equipes tech, data et metier.",
      `Cadre l'adoption responsable de l'IA dans le contexte ${sector.toLowerCase()}.`
    ],
    studies: ["Ingenieur ou master data", "Ecole de commerce + produit", "Master IA / sante numerique"]
  },
  {
    key: "cybersecurity-specialist",
    title: (sector) => `Cybersecurity Specialist ${sector}`,
    salary: "58kEUR - 95kEUR",
    category: "Cybersecurite",
    shortageLevel: "Tres elevee",
    summary: (sector) =>
      `Protege donnees, equipements et environnements critiques dans des organisations ${sector.toLowerCase()} ou la conformite et la continuite sont sensibles.`,
    skills: ["Risk assessment", "IAM", "Network security", "GxP / validation", "Incident response"],
    successFactors: () => [
      "Comprendre les enjeux cyber sans perdre la realite operations.",
      "Faire accepter les controles de securite par les metiers.",
      "Prioriser les vrais risques plutot que multiplier les alertes."
    ],
    path: ["Security analyst", "Security engineer", "Cyber lead"],
    missions: (sector) => [
      "Evaluer les risques cyber des SI, equipements et flux de donnees.",
      "Mettre en oeuvre les controles de securite adaptes au secteur.",
      `Contribuer a la resilience cyber des environnements ${sector.toLowerCase()} regulés ou sensibles.`
    ],
    studies: ["Master cybersecurite", "Ingenieur informatique", "Master systemes d'information"]
  }
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const unique = (items: string[]) => Array.from(new Set(items));

const createRole = (sector: SectorConfig, template: RoleTemplate): JobRole => ({
  slug: `${sector.slugPrefix}-${template.key}`,
  title: template.title(sector.label),
  salary: template.salary,
  salarySource:
    "Repere indicatif a calibrer selon le grade, la taille de l'entreprise, la localisation et le niveau d'exposition. A recouper avec Aon RMCD / benchmarks de remuneration et, quand disponible, avec Glassdoor.",
  sector: sector.label,
  category: template.category,
  shortageLevel: template.shortageLevel,
  summary: template.summary(sector.label),
  skills: template.skills,
  successFactors: template.successFactors(sector.label),
  path: template.path,
  missions: template.missions(sector.label),
  studies: template.studies,
  schools: sector.schoolPool,
  relatedIndustries: unique([sector.label, ...sector.relatedIndustries]),
  sources: [...defaultRoleSources]
});

const coreRoles = sectorConfigs.flatMap((sector) =>
  roleTemplates.map((template) => createRole(sector, template))
);

const strategicExtras: JobRole[] = [
  {
    slug: "biotech-medical-affairs-manager",
    title: "Medical Affairs Manager Biotech",
    salary: "70kEUR - 110kEUR + bonus",
    salarySource:
      "Role cite parmi les fonctions sous tension par Aon en 2025. Le niveau exact depend du grade, du scope therapeutique et du mix medical / scientifique. A recouper avec Aon RMCD et Glassdoor quand disponible.",
    sector: "Biotech",
    category: "Medical Affairs",
    shortageLevel: "Tres elevee",
    summary:
      "Structure la strategie medicale terrain, la relation KOL et la circulation de l'information scientifique dans des environnements biotech en forte acceleration.",
    skills: ["Medical affairs", "KOL engagement", "Communication scientifique", "Cross-functional leadership", "Anglais"],
    successFactors: [
      "Savoir rester credibles face aux experts tout en gardant une lecture business.",
      "Transformer des donnees scientifiques en messages utiles pour les equipes terrain et la direction.",
      "Tenir ensemble medical, clinique, reglementaire et commercial sans confusion de roles."
    ],
    path: ["Medical advisor", "Medical affairs manager", "Head of medical affairs"],
    missions: [
      "Construire la feuille de route medical affairs sur le perimetre produit ou portefeuille.",
      "Animer les interactions avec les experts, centres investigateurs et parties prenantes medicales.",
      "Outiller les equipes internes avec une information scientifique robuste et exploitable."
    ],
    studies: ["Pharmacie", "Doctorat sciences de la vie", "Medecine ou PhD avec exposition medical affairs"],
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "Faculte de pharmacie Strasbourg", "ESBS Strasbourg"],
    relatedIndustries: ["Biotech", "Biopharma", "Cell therapy", "Gene therapy", "Medical communications"],
    sources: [
      ...defaultRoleSources,
      {
        name: "France Biotech - Panorama 2026",
        url: FRANCE_BIOTECH_PANORAMA_2026_URL
      }
    ]
  },
  {
    slug: "biotech-market-access-manager",
    title: "Market Access Manager Biotech",
    salary: "68kEUR - 105kEUR + bonus",
    salarySource:
      "Aon cite le market access & pricing parmi les fonctions les plus difficiles a recruter et a retenir en 2025. Le package doit etre ajuste selon maturite clinique, geographie et exposition HTA / remboursement.",
    sector: "Biotech",
    category: "Market access",
    shortageLevel: "Tres elevee",
    summary:
      "Prepare la preuve de valeur, la strategie d'acces et les arbitrages prix/remboursement sur des innovations biotech a cycle long.",
    skills: ["Market access", "HEOR", "Pricing", "Stakeholder mapping", "Evidence generation"],
    successFactors: [
      "Traduire la science en valeur medico-economique defendable.",
      "Savoir faire dialoguer medical, clinique, affaires publiques et direction.",
      "Anticiper tres tot les points de friction a l'acces au marche."
    ],
    path: ["HEOR specialist", "Market access manager", "Head of market access"],
    missions: [
      "Construire la strategie d'acces au marche et de valorisation du produit.",
      "Piloter les arguments prix, remboursement et preuve de valeur.",
      "Coordonner medical, clinique, affaires publiques et leadership sur les jalons clefs."
    ],
    studies: ["Pharmacie", "Master sante publique", "Master economie de la sante", "Doctorat sciences de la vie"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "AgroParisTech"],
    relatedIndustries: ["Biotech", "Biopharma", "Health economics", "Rare diseases", "Medical strategy"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "medical-vet-medical-science-liaison",
    title: "Medical Science Liaison Medical Vet",
    salary: "65kEUR - 98kEUR + bonus",
    salarySource:
      "Les fonctions Medical Affairs sont identifiees comme penuriques par Aon. Pour la sante animale, le calibrage depend du territoire, du niveau scientifique attendu et de l'exposition terrain.",
    sector: "Medical Vet",
    category: "Medical Affairs",
    shortageLevel: "Elevee",
    summary:
      "Porte la relation scientifique terrain avec les veterinaires experts, les comptes clefs et les equipes internes sur des portefeuilles sante animale.",
    skills: ["MSL", "Scientific exchange", "Veterinary market", "Training", "KOL management"],
    successFactors: [
      "Rester credible scientifiquement tout en etant tres utile au terrain.",
      "Donner de la valeur aux experts sans glisser vers une posture purement commerciale.",
      "Faire remonter les bons signaux medicals et scientifiques a l'organisation."
    ],
    path: ["Scientific advisor", "MSL", "Medical affairs lead"],
    missions: [
      "Animer les echanges scientifiques avec les KOL et reseaux veterinaries.",
      "Former les equipes internes sur les messages et donnees produits.",
      "Faire circuler les insights terrain vers medical, marketing et direction."
    ],
    studies: ["Veterinaire", "Pharmacie", "Doctorat sciences de la vie"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins veterinaires", "Diagnostic vet", "Scientific affairs"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "diagnostic-data-science-manager",
    title: "Data Science Manager Diagnostic & Medtech",
    salary: "72kEUR - 115kEUR",
    salarySource:
      "Aon et France Biotech identifient la data science et l'informatique parmi les fonctions les plus difficiles a recruter. Le package depend du niveau de management, de la complexite produit et du poids de l'IA dans l'offre.",
    sector: "Diagnostic",
    category: "Data / IA",
    shortageLevel: "Tres elevee",
    summary:
      "Structure les equipes data, les cas d'usage analytiques et les standards de delivery pour des solutions diagnostic et medtech de plus en plus alimentees par l'IA.",
    skills: ["Data science", "Management", "AI", "Clinical data", "MLOps literacy"],
    successFactors: [
      "Garder l'equipe tres proche du produit et des usages cliniques.",
      "Prioriser les cas d'usage qui creent une vraie valeur metier.",
      "Rendre la data science lisible pour des decideurs non techniques."
    ],
    path: ["Senior data scientist", "Data lead", "Data science manager"],
    missions: [
      "Piloter la roadmap data science et les priorites analytiques.",
      "Manager les profils data et coordonner avec produit, clinique et qualite.",
      "Faire de la data et de l'IA un levier concret de performance et de differenciation."
    ],
    studies: ["Master data science", "Ingenieur IA", "Bioinformatique", "PhD data / sante"],
    schools: ["Grenoble INP - Ensimag", "EPITA", "Telecom Paris", "Universite Paris-Saclay"],
    relatedIndustries: ["Diagnostic", "Medtech", "Health data", "Digital health", "AI healthcare"],
    sources: [
      ...defaultRoleSources,
      {
        name: "France Biotech - Panorama 2026",
        url: FRANCE_BIOTECH_PANORAMA_2026_URL
      }
    ]
  },
  {
    slug: "biotech-senior-scientist-arn-therapeutics",
    title: "Senior Scientist ARN Therapeutics",
    salary: "55kEUR - 80kEUR",
    salarySource:
      "Repere indicatif de marche SKS TALENTS, a recouper avec Aon RMCD, les benchmarks sectoriels et Glassdoor selon le grade et la maturite programme.",
    sector: "Biotech",
    category: "R&D",
    shortageLevel: "Tres elevee",
    summary:
      "Conduit les programmes ARN depuis la conception experimentale jusqu'aux preuves de faisabilite precliniques.",
    skills: ["ARN therapeutics", "Biologie moleculaire", "Design experimental", "Data analysis", "Cross-functional work"],
    successFactors: [
      "Relier excellence scientifique et priorites programme.",
      "Savoir prioriser les hypotheses les plus critiques.",
      "Collaborer avec CMC, analytique et leadership sans perdre le rythme experimental."
    ],
    path: ["Scientist", "Senior scientist", "Principal scientist"],
    missions: [
      "Concevoir et executer les plans d'experiences sur des plateformes ARN.",
      "Interpreter les resultats et recommander les orientations de programme.",
      "Collaborer avec CMC, analytique, qualite et leadership scientifique."
    ],
    studies: ["PhD biologie moleculaire", "PhD biotechnologies", "Master sciences du vivant avec experience"],
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "Gene therapy", "CDMO", "Research platforms"]
  },
  {
    slug: "diagnostic-bioinformaticien-ngs",
    title: "Bioinformaticien NGS",
    salary: "45kEUR - 72kEUR",
    sector: "Diagnostic",
    category: "Data / genomique",
    shortageLevel: "Tres elevee",
    summary:
      "Transforme les donnees NGS en pipelines, analyses et livrables interpretable pour des usages diagnostic et precision medicine.",
    skills: ["NGS", "Python / R", "Pipelines bioinfo", "Omics", "Validation"],
    successFactors: [
      "Rendre les analyses fiables, robustes et compréhensibles par les équipes non data.",
      "Maintenir des pipelines industrialisables et validables.",
      "Garder une lecture clinique et opérationnelle des données."
    ],
    path: ["Bioinformaticien", "Senior bioinformaticien", "Lead genomics data"],
    missions: [
      "Developper et maintenir les pipelines NGS et les workflows d'analyse.",
      "Collaborer avec laboratoires, qualité et affaires réglementaires.",
      "Ameliorer robustesse, automatisation et interpretation des resultats."
    ],
    studies: ["Master bioinformatique", "PhD genomique", "Ingenieur data + biologie"],
    schools: ["Universite Paris-Saclay", "Grenoble INP - Ensimag", "EPITA", "Telecom Paris"],
    relatedIndustries: ["Diagnostic", "Genomique", "Health data", "Biotech", "Research hospitals"]
  },
  {
    slug: "cosmetique-formulation-scientist",
    title: "Formulation Scientist Cosmetique",
    salary: "42kEUR - 65kEUR",
    sector: "Cosmetique",
    category: "R&D",
    shortageLevel: "Elevee",
    summary:
      "Developpe des formules performantes, stables et industrialisables pour des activites dermocosmetiques ou beauty tech.",
    skills: ["Formulation", "Tests stabilite", "Ingredients", "Claims", "Industrialisation"],
    successFactors: [
      "Equilibrer innovation, faisabilité industrielle et attentes marketing.",
      "Avoir une discipline d'essais et de validation très rigoureuse.",
      "Travailler vite sans compromettre stabilité ni conformité."
    ],
    path: ["Formulateur", "Senior formulation scientist", "R&D manager"],
    missions: [
      "Concevoir et optimiser de nouvelles formules.",
      "Valider la faisabilite industrielle avec production et qualité.",
      "Documenter les performances, claims et exigences réglementaires."
    ],
    studies: ["Master formulation cosmetique", "Chimie", "Ingenierie cosmetique"],
    schools: ["ISIPCA", "ICAP Montpellier", "Chimie ParisTech", "ESCOM Compiegne"],
    relatedIndustries: ["Cosmetique", "Dermocosmetique", "Ingredients actifs", "Green chemistry", "Beauty tech"]
  },
  {
    slug: "medical-vet-regulatory-affairs-vaccines",
    title: "Regulatory Affairs Manager Vaccins Veterinaires",
    salary: "60kEUR - 90kEUR",
    sector: "Medical Vet",
    category: "Reglementaire",
    shortageLevel: "Tres elevee",
    summary:
      "Cadre les enregistrements, variations et interactions autorités pour des portefeuilles vaccins en santé animale.",
    skills: ["Vaccins", "Reglementation vet", "Dossiers", "Compliance", "Cross-functional leadership"],
    successFactors: [
      "Maîtriser les spécificités réglementaires vétérinaires.",
      "Savoir coordonner des interlocuteurs scientifiques, qualité et business.",
      "Anticiper les zones de blocage avant la soumission."
    ],
    path: ["RA specialist", "RA manager", "Head of RA veterinary"],
    missions: [
      "Construire la feuille de route réglementaire sur les portefeuilles vaccins.",
      "Coordonner les soumissions et réponses aux autorités.",
      "Aligner qualité, clinique, CMC et business sur les enjeux de conformité."
    ],
    studies: ["Pharmacie", "Vétérinaire", "Master affaires réglementaires"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Vaccins vétérinaires", "Biotech animale", "Diagnostic vet"]
  },
  {
    slug: "veterinary-clinic-operations-director",
    title: "Clinic Operations Director Veterinary",
    salary: "70kEUR - 115kEUR",
    sector: "Veterinary",
    category: "Operations",
    shortageLevel: "Elevee",
    summary:
      "Pilote la performance multi-sites d'un reseau veterinaire en equilibrant soins, operations, planning et experience client.",
    skills: ["Multi-site operations", "P&L", "Planning", "Excellence de service", "Leadership"],
    successFactors: [
      "Garder un niveau d'exigence homogène sur plusieurs sites.",
      "Savoir parler performance sans dégrader la qualité de soin.",
      "Accompagner les managers de clinique dans l'exécution."
    ],
    path: ["Practice manager", "Regional ops manager", "Operations director"],
    missions: [
      "Coordonner les cliniques, directeurs de site et indicateurs de performance.",
      "Ameliorer capacité, parcours client, recrutement et rétention.",
      "Aligner qualité de soin et performance opérationnelle."
    ],
    studies: ["Management", "Vétérinaire avec expérience management", "Master operations"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Institut Agro Rennes Angers"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Assurance animale"]
  },
  {
    slug: "petfood-rd-director",
    title: "R&D Director Petfood",
    salary: "85kEUR - 135kEUR",
    sector: "Petfood",
    category: "Direction R&D",
    shortageLevel: "Elevee",
    summary:
      "Porte la feuille de route innovation, formulation, qualite et différenciation scientifique dans le petfood premium.",
    skills: ["Nutrition animale", "R&D leadership", "Claims", "Innovation", "Cross-functional management"],
    successFactors: [
      "Concilier ambition scientifique, time-to-market et contraintes industrielles.",
      "Créer une vraie passerelle entre R&D, qualité, marketing et supply.",
      "Faire de l'innovation un moteur business concret."
    ],
    path: ["Nutrition scientist", "R&D manager", "R&D director"],
    missions: [
      "Definir les priorités d'innovation produit et nutrition.",
      "Coordonner formulation, qualité, affaires réglementaires et marketing.",
      "Accélérer la mise sur le marché de gammes premium et thérapeutiques."
    ],
    studies: ["Ingenieur agro / nutrition", "Master nutrition animale", "Doctorat nutrition"],
    schools: ["AgroParisTech", "Institut Agro Montpellier", "ENSAIA", "Sciences Agro Bordeaux"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Feed additives", "Agro-industrie", "FMCG premium"]
  },
  {
    slug: "biotech-msat-engineer",
    title: "MSAT Engineer Biotech",
    salary: "52kEUR - 82kEUR",
    sector: "Biotech",
    category: "Industrialisation",
    shortageLevel: "Tres elevee",
    summary:
      "Fait le lien entre développement, transfert industriel et performance de fabrication sur des procédés biotech complexes.",
    skills: ["Tech transfer", "Process engineering", "GMP", "Data process", "Scale-up"],
    successFactors: [
      "Savoir relier science, production et qualité sans créer de friction inutile.",
      "Être solide sur l'analyse de données process et les écarts terrain.",
      "Aider les équipes à passer d'une logique labo à une logique industrielle."
    ],
    path: ["Process engineer", "MSAT engineer", "MSAT lead"],
    missions: [
      "Soutenir les transferts de procédé du développement vers la production.",
      "Analyser la performance process et les écarts de fabrication.",
      "Sécuriser montée en échelle, robustesse et amélioration continue."
    ],
    studies: ["Diplôme d'ingénieur bioprocédés", "Master biotech", "PhD avec exposition industrielle"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Cell therapy", "Industrial biotech"]
  },
  {
    slug: "biotech-cmc-project-manager",
    title: "CMC Project Manager Biotech",
    salary: "65kEUR - 98kEUR",
    sector: "Biotech",
    category: "CMC / programme",
    shortageLevel: "Tres elevee",
    summary:
      "Coordonne les activités CMC et aligne développement, qualité, supply et réglementaire pour sécuriser le programme.",
    skills: ["CMC", "Project management", "Cross-functional leadership", "GMP", "Risk management"],
    successFactors: [
      "Savoir tenir le rythme d'un programme sans perdre la rigueur documentaire.",
      "Arbitrer vite entre contraintes techniques, planning et qualité.",
      "Faire converger des équipes très différentes autour des vraies priorités."
    ],
    path: ["CMC specialist", "Project manager", "CMC lead"],
    missions: [
      "Piloter le planning CMC et les jalons clés du programme.",
      "Coordonner qualité, analytique, supply et industrialisation.",
      "Sécuriser la préparation des lots, données et livrables CMC."
    ],
    studies: ["Ingénieur biotech", "Pharmacie", "Master gestion de projet scientifique"],
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Gene therapy", "Cell therapy"]
  },
  {
    slug: "biotech-qa-batch-release-manager",
    title: "QA Batch Release Manager Biotech",
    salary: "58kEUR - 92kEUR",
    sector: "Biotech",
    category: "Qualite",
    shortageLevel: "Elevee",
    summary:
      "Valide la libération des lots et sécurise les exigences qualité dans des environnements de production très réglementés.",
    skills: ["QA release", "Deviation management", "GMP", "Batch record review", "CAPA"],
    successFactors: [
      "Être rigoureux sans devenir un goulot d'étranglement pour les opérations.",
      "Hiérarchiser les écarts avec une vraie lecture du risque.",
      "Faire tenir ensemble qualité, vitesse et robustesse documentaire."
    ],
    path: ["QA specialist", "QA manager", "Qualified Person track"],
    missions: [
      "Revoir les dossiers de lots et autoriser la libération qualité.",
      "Contribuer aux investigations, CAPA et déviations.",
      "Améliorer la robustesse du système qualité avec la production."
    ],
    studies: ["Pharmacie", "Master qualité", "Ingénieur bioprocédés"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Vaccins", "Production GMP"]
  },
  {
    slug: "biotech-tech-transfer-manager",
    title: "Tech Transfer Manager Biotech",
    salary: "72kEUR - 110kEUR",
    sector: "Biotech",
    category: "Industrialisation",
    shortageLevel: "Elevee",
    summary:
      "Pilote les transferts technologiques entre développement, sites internes et partenaires industriels.",
    skills: ["Tech transfer", "Stakeholder management", "Documentation", "Scale-up", "Risk mitigation"],
    successFactors: [
      "Savoir sécuriser l'exécution sans perdre la compréhension scientifique.",
      "Traduire un procédé en instructions transférables et robustes.",
      "Anticiper les points de rupture entre site source et site receveur."
    ],
    path: ["MSAT engineer", "Tech transfer lead", "Industrialization manager"],
    missions: [
      "Préparer et piloter les plans de transfert industriel.",
      "Coordonner les sites, partenaires et équipes qualité.",
      "Sécuriser données, documentation et readiness opérationnelle."
    ],
    studies: ["Ingénieur biotech", "Master génie des procédés", "PhD avec exposition industrielle"],
    schools: ["Universite Paris-Saclay", "AgroParisTech", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Industrial biotech", "Therapy manufacturing"]
  },
  {
    slug: "biotech-medical-director",
    title: "Medical Director Biotech",
    salary: "100kEUR - 170kEUR + variable",
    sector: "Biotech",
    category: "Direction medicale",
    shortageLevel: "Elevee",
    summary:
      "Porte la stratégie médicale, la crédibilité scientifique et l'alignement entre clinique, market access et leadership dans des biotechs à fort enjeu de développement.",
    skills: ["Medical leadership", "Clinical strategy", "KOL management", "Cross-functional influence", "Scientific communication"],
    successFactors: [
      "Savoir tenir une ligne scientifique forte sans se couper des enjeux business.",
      "Créer un pont solide entre médical, clinique, market access et direction.",
      "Aider l'entreprise à gagner en crédibilité auprès des experts, partenaires et investisseurs."
    ],
    path: ["Medical affairs lead", "Senior medical advisor", "Medical director"],
    missions: [
      "Définir la stratégie médicale en lien avec les programmes cliniques et l'accès au marché.",
      "Piloter la relation avec les KOL, experts et partenaires scientifiques.",
      "Aligner les messages médicaux avec les enjeux de développement, de preuve et de commercialisation."
    ],
    studies: ["Médecine", "Pharmacie", "Doctorat sciences de la vie avec forte exposition clinique"],
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "Faculte de pharmacie Strasbourg", "Universite d'Angers"],
    relatedIndustries: ["Biotech", "Biopharma", "Medtech", "Clinical development", "Rare diseases"]
  },
  {
    slug: "biotech-qa-manager",
    title: "QA Manager Biotech",
    salary: "52kEUR - 78kEUR",
    sector: "Biotech",
    category: "Qualite",
    shortageLevel: "Elevee",
    summary:
      "Cadre les standards qualité, les écarts et les audits dans des environnements biotech où la robustesse documentaire conditionne la vitesse d'exécution.",
    skills: ["GMP", "Quality systems", "Audits", "CAPA", "Batch review"],
    successFactors: [
      "Être rigoureux sans ralentir inutilement l'activité.",
      "Savoir hiérarchiser les risques qualité dans un contexte de croissance.",
      "Faire travailler ensemble qualité, production, CMC et supply."
    ],
    path: ["QA specialist", "Senior QA", "QA manager"],
    missions: [
      "Piloter le système qualité et la préparation des audits.",
      "Gérer déviations, CAPA et investigations qualité.",
      "Accompagner les équipes opérationnelles sur les exigences GMP et la documentation."
    ],
    studies: ["Pharmacie", "Master qualité", "Ingénieur biotech / bioprocédés"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Vaccins", "Therapy manufacturing"]
  },
  {
    slug: "biotech-msat-lead",
    title: "MSAT Lead Biotech",
    salary: "70kEUR - 105kEUR",
    sector: "Biotech",
    category: "Industrialisation",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote l'interface entre développement, transfert, production et amélioration continue pour sécuriser les procédés biotech à l'échelle industrielle.",
    skills: ["MSAT", "Scale-up", "Process robustness", "Team coordination", "Data-driven manufacturing"],
    successFactors: [
      "Relier science, usine et qualité avec une vraie discipline d'exécution.",
      "Savoir encadrer les priorités process sans perdre la lecture terrain.",
      "Rendre les transferts plus fluides et les procédés plus robustes."
    ],
    path: ["MSAT engineer", "Senior process engineer", "MSAT lead"],
    missions: [
      "Coordonner les sujets MSAT, industrialisation et performance de procédé.",
      "Piloter les analyses de performance et les plans d'amélioration continue.",
      "Faire le lien entre développement, production, qualité et supply pour sécuriser la montée en échelle."
    ],
    studies: ["Diplôme d'ingénieur bioprocédés", "Master biotech", "PhD avec forte exposition industrielle"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Cell therapy", "Industrial biotech"]
  },
  {
    slug: "diagnostic-field-service-manager",
    title: "Field Service Manager Diagnostic",
    salary: "65kEUR - 95kEUR + variable",
    sector: "Diagnostic",
    category: "Service terrain",
    shortageLevel: "Elevee",
    summary:
      "Pilote les équipes de maintenance et de support terrain sur des bases installées IVD et instrumentation.",
    skills: ["Field service", "Team leadership", "SLA", "Instrumentation", "Customer escalation"],
    successFactors: [
      "Rendre le service terrain prévisible et pilotable.",
      "Maintenir un haut niveau de qualité client sous contrainte d'urgence.",
      "Faire monter les techniciens en autonomie et en rigueur."
    ],
    path: ["Service engineer", "Team leader", "Field service manager"],
    missions: [
      "Manager les ingénieurs de maintenance et la couverture terrain.",
      "Suivre les SLA, incidents majeurs et escalades clients.",
      "Améliorer l'efficacité du service et la satisfaction des comptes."
    ],
    studies: ["Ingénieur biomédical", "Ingénieur instrumentation", "Master management technique"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Instrumentation", "Laboratoires"]
  },
  {
    slug: "diagnostic-field-application-manager",
    title: "Field Application Manager Diagnostic",
    salary: "68kEUR - 98kEUR + variable",
    sector: "Diagnostic",
    category: "Applications / support terrain",
    shortageLevel: "Elevee",
    summary:
      "Pilote la strategie applications, l'accompagnement terrain et la montée en compétence des équipes sur des solutions IVD et instrumentation.",
    skills: ["Field applications", "Team leadership", "Customer enablement", "Instrumentation", "Escalation management"],
    successFactors: [
      "Maintenir une forte crédibilité technique tout en structurant les priorités du terrain.",
      "Transformer les signaux client en actions concrètes pour ventes, produit et service.",
      "Encadrer une équipe applications sans casser la réactivité opérationnelle."
    ],
    path: ["Field application specialist", "Application lead", "Field application manager"],
    missions: [
      "Piloter les ingénieurs d'application et la couverture des comptes stratégiques.",
      "Structurer les priorités de formation, d'adoption et d'escalade technique.",
      "Faire le lien entre clients, ventes, marketing, qualité et support produit."
    ],
    studies: ["Master biologie / diagnostic", "Ingénieur biomédical", "Sciences de la vie + expérience terrain"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Instrumentation", "Customer enablement"]
  },
  {
    slug: "diagnostic-clinical-affairs-manager",
    title: "Clinical Affairs Manager Diagnostic",
    salary: "62kEUR - 98kEUR",
    sector: "Diagnostic",
    category: "Clinique",
    shortageLevel: "Elevee",
    summary:
      "Cadre les études cliniques et les preuves nécessaires à la mise sur le marché des solutions diagnostic.",
    skills: ["Clinical affairs", "Study management", "IVD evidence", "Cross-functional work", "Documentation"],
    successFactors: [
      "Comprendre la preuve clinique comme un levier business et réglementaire.",
      "Tenir ensemble investigateurs, qualité, réglementaire et marketing.",
      "Fiabiliser les livrables sans ralentir inutilement le programme."
    ],
    path: ["Clinical specialist", "Clinical affairs manager", "Head of clinical"],
    missions: [
      "Construire et piloter les études cliniques ou de performance.",
      "Travailler avec affaires réglementaires et qualité sur les dossiers.",
      "Sécuriser les preuves requises pour la mise sur le marché."
    ],
    studies: ["Pharmacie", "Master clinique", "Biologie médicale", "Ingénieur biomédical"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Clinical research", "Precision medicine"]
  },
  {
    slug: "diagnostic-lims-product-owner",
    title: "Product Owner LIMS & Middleware Diagnostic",
    salary: "58kEUR - 90kEUR",
    sector: "Diagnostic",
    category: "Produit / digital",
    shortageLevel: "Tres elevee",
    summary:
      "Traduit les besoins laboratoires et diagnostic en priorités produit pour LIMS, middleware et interopérabilité.",
    skills: ["LIMS", "Product ownership", "Interoperability", "Lab workflows", "Backlog prioritization"],
    successFactors: [
      "Parler à la fois aux biologistes, aux équipes tech et au support.",
      "Prioriser ce qui améliore vraiment l'expérience laboratoire.",
      "Tenir la cohérence entre conformité, performance et adoption produit."
    ],
    path: ["Business analyst", "Product owner", "Product manager diagnostics"],
    missions: [
      "Qualifier les besoins clients et les traduire en backlog produit.",
      "Piloter les sujets middleware, interfaces et parcours utilisateur.",
      "Aligner tech, support, commercial et qualité autour des priorités."
    ],
    studies: ["Ingénieur informatique", "Master bioinfo", "Ingénieur biomédical"],
    schools: ["Telecom Paris", "EPITA", "Grenoble INP - Ensimag", "Universite Paris-Saclay"],
    relatedIndustries: ["Diagnostic", "Health data", "LIMS", "Medtech", "Middleware healthcare"]
  },
  {
    slug: "diagnostic-key-account-manager-ivd",
    title: "Key Account Manager IVD",
    salary: "68kEUR - 120kEUR + variable",
    sector: "Diagnostic",
    category: "Commercial",
    shortageLevel: "Elevee",
    summary:
      "Développe les comptes stratégiques du diagnostic in vitro sur des cycles de vente complexes et techniques.",
    skills: ["KAM", "IVD sales", "Tender management", "Negotiation", "Account strategy"],
    successFactors: [
      "Savoir vendre de la valeur clinique et opérationnelle, pas seulement un produit.",
      "Coordonner avant-vente, service, application et finance sur des comptes exigeants.",
      "Tenir des cycles longs sans perdre l'intensité commerciale."
    ],
    path: ["Sales specialist", "Regional sales", "KAM strategic accounts"],
    missions: [
      "Piloter les grands comptes et les plans de croissance associés.",
      "Coordonner les réponses aux appels d'offres et la stratégie de pénétration.",
      "Faire progresser marge, fidélisation et profondeur de relation client."
    ],
    studies: ["École de commerce", "Ingénieur avec expérience commerciale", "Master vente B2B"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Hospital accounts", "Laboratory equipment"]
  },
  {
    slug: "cosmetique-regulatory-affairs-manager",
    title: "Regulatory Affairs Manager Cosmétique",
    salary: "55kEUR - 88kEUR",
    sector: "Cosmetique",
    category: "Reglementaire",
    shortageLevel: "Elevee",
    summary:
      "Sécurise la conformité produit, dossiers et claims dans des environnements cosmétiques à forte pression time-to-market.",
    skills: ["Cosmetic regulation", "Claims", "PIF", "INCI", "Cross-functional coordination"],
    successFactors: [
      "Aller vite sans fragiliser la conformité du portefeuille.",
      "Traduire la réglementation en décisions exploitables pour les équipes produit et marketing.",
      "Savoir arbitrer entre ambition marketing et faisabilité réglementaire."
    ],
    path: ["RA specialist", "RA manager", "Head of RA cosmetics"],
    missions: [
      "Piloter les dossiers conformité et la veille réglementaire.",
      "Travailler avec R&D, qualité et marketing sur les lancements.",
      "Sécuriser les claims et la documentation produit."
    ],
    studies: ["Master affaires réglementaires", "Chimie", "Ingénierie cosmétique"],
    schools: ["ISIPCA", "ICAP Montpellier", "Chimie ParisTech", "ESCOM Compiegne"],
    relatedIndustries: ["Cosmetique", "Dermocosmetique", "Beauty tech", "Ingredients", "Packaging premium"]
  },
  {
    slug: "cosmetique-international-marketing-manager",
    title: "International Marketing Manager Cosmétique",
    salary: "58kEUR - 92kEUR + variable",
    sector: "Cosmetique",
    category: "Marketing",
    shortageLevel: "Moderee",
    summary:
      "Pilote la narration de l'offre, les lancements et l'adaptation internationale des gammes cosmétiques.",
    skills: ["Brand strategy", "International launches", "Claims", "Category management", "Consumer insight"],
    successFactors: [
      "Relier langage marketing et crédibilité scientifique.",
      "Savoir travailler avec R&D, réglementaire et ventes sans casser le rythme des lancements.",
      "Adapter les messages sans diluer la force de la marque."
    ],
    path: ["Product manager", "Group marketing manager", "International marketing lead"],
    missions: [
      "Préparer les lancements et la stratégie de gamme à l'international.",
      "Aligner études marché, claims, vente et contenus.",
      "Renforcer cohérence marque et performance business."
    ],
    studies: ["École de commerce", "Master marketing", "Formation cosmétique + business"],
    schools: ["ISIPCA", "ICAP Montpellier", "ESCOM Compiegne", "Chimie ParisTech"],
    relatedIndustries: ["Cosmetique", "Beauty tech", "Dermocosmetique", "FMCG premium", "Ingredients"]
  },
  {
    slug: "medical-vet-scientific-affairs-manager",
    title: "Scientific Affairs Manager Medical Vet",
    salary: "62kEUR - 96kEUR",
    sector: "Medical Vet",
    category: "Affaires scientifiques",
    shortageLevel: "Elevee",
    summary:
      "Porte la voix scientifique auprès du marché, des KOL et des équipes internes sur des portefeuilles santé animale.",
    skills: ["Medical affairs", "Scientific communication", "KOL management", "Training", "Cross-functional work"],
    successFactors: [
      "Être crédible scientifiquement tout en restant très orienté terrain.",
      "Savoir transformer des données en messages utiles pour le marché.",
      "Faire le lien entre médical, marketing, ventes et réglementaire."
    ],
    path: ["Medical advisor", "Scientific affairs manager", "Medical affairs lead"],
    missions: [
      "Déployer les contenus scientifiques et la formation du terrain.",
      "Animer la relation avec experts, KOL et partenaires scientifiques.",
      "Aligner les messages avec affaires réglementaires et marketing."
    ],
    studies: ["Vétérinaire", "Pharmacie", "Doctorat sciences de la vie"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Vaccins vétérinaires", "Diagnostic vet", "Animal biotech", "Nutrition thérapeutique"]
  },
  {
    slug: "medical-vet-supply-planning-lead",
    title: "Supply Planning Lead Medical Vet",
    salary: "60kEUR - 92kEUR",
    sector: "Medical Vet",
    category: "Supply chain",
    shortageLevel: "Elevee",
    summary:
      "Fiabilise la planification et les flux sur des portefeuilles santé animale souvent sensibles en disponibilité produit.",
    skills: ["Planning", "S&OP", "Inventory", "Risk management", "Cross-functional coordination"],
    successFactors: [
      "Anticiper les ruptures avant qu'elles deviennent commerciales ou cliniques.",
      "Piloter avec clarté des arbitrages entre supply, ventes et qualité.",
      "Comprendre les contraintes réglementaires derrière les flux."
    ],
    path: ["Planner", "Supply manager", "Head of planning"],
    missions: [
      "Piloter prévisions, stocks et allocation produit.",
      "Coordonner supply, ventes, qualité et opérations.",
      "Réduire les risques de rupture sur des références critiques."
    ],
    studies: ["Master supply chain", "Ingénieur", "Master opérations"],
    schools: ["Oniris", "VetAgro Sup", "Institut Agro Rennes Angers", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal biotech", "Vaccins", "Diagnostic vet", "Nutrition animale"]
  },
  {
    slug: "veterinary-regional-clinic-director",
    title: "Directeur Régional de Cliniques Vétérinaires",
    salary: "78kEUR - 125kEUR + variable",
    sector: "Veterinary",
    category: "Operations",
    shortageLevel: "Elevee",
    summary:
      "Coordonne plusieurs cliniques et accompagne les directeurs de site sur la performance, les équipes et la qualité de service.",
    skills: ["Multi-site leadership", "P&L", "Clinic operations", "People management", "Customer experience"],
    successFactors: [
      "Savoir piloter plusieurs réalités locales sans perdre la cohérence régionale.",
      "Accompagner les managers de clinique dans une logique de croissance durable.",
      "Tenir ensemble performance, soin, équipes et expérience client."
    ],
    path: ["Clinic manager", "Area manager", "Regional director"],
    missions: [
      "Piloter la performance d'un portefeuille de cliniques.",
      "Accompagner les directeurs de site sur organisation, staffing et qualité.",
      "Déployer les priorités groupe sur le terrain."
    ],
    studies: ["Management", "Vétérinaire avec expérience management", "Master opérations"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Institut Agro Rennes Angers"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Assurance animale", "Diagnostics vet"]
  },
  {
    slug: "veterinary-finance-manager-clinic-group",
    title: "Finance Manager Groupement de Cliniques Vétérinaires",
    salary: "60kEUR - 95kEUR",
    sector: "Veterinary",
    category: "Finance",
    shortageLevel: "Moderee",
    summary:
      "Structure le pilotage financier d'un réseau de cliniques en croissance ou en consolidation.",
    skills: ["Controlling", "Cash", "Multi-site finance", "KPI", "Business partnering"],
    successFactors: [
      "Rendre les chiffres lisibles pour des opérationnels non financiers.",
      "Fiabiliser les comparaisons multi-sites sans rigidifier le terrain.",
      "Soutenir les décisions de croissance, staffing et investissement."
    ],
    path: ["Controller", "Finance manager", "Regional finance lead"],
    missions: [
      "Mettre en place le pilotage financier et les indicateurs clés.",
      "Accompagner les directeurs de clinique et la direction groupe.",
      "Aider à prioriser les investissements et les plans de performance."
    ],
    studies: ["École de commerce", "DSCG", "Master finance"],
    schools: ["Oniris", "VetAgro Sup", "ENVT"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Healthcare services"]
  },
  {
    slug: "petfood-technical-services-manager",
    title: "Technical Services Manager Petfood",
    salary: "58kEUR - 90kEUR",
    sector: "Petfood",
    category: "Support technique",
    shortageLevel: "Elevee",
    summary:
      "Accompagne clients, ventes et opérations sur des questions techniques, nutritionnelles et qualité dans le petfood.",
    skills: ["Technical service", "Nutrition animale", "Customer support", "Claims", "Troubleshooting"],
    successFactors: [
      "Rester crédible face aux équipes techniques et commerciales.",
      "Transformer les irritants clients en amélioration concrète du produit ou du service.",
      "Faire le pont entre laboratoire, usine, marketing et marché."
    ],
    path: ["Technical advisor", "Technical services manager", "Customer technical lead"],
    missions: [
      "Apporter le support technique aux clients et aux équipes commerciales.",
      "Traiter les réclamations complexes et les questions produit.",
      "Faire remonter au business et à la R&D les signaux terrain."
    ],
    studies: ["Nutrition animale", "Ingénieur agro", "Master qualité / sciences du vivant"],
    schools: ["AgroParisTech", "Institut Agro Montpellier", "ENSAIA", "Sciences Agro Bordeaux"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Feed additives", "Agro-industrie", "Customer support B2B"]
  },
  {
    slug: "petfood-palatability-scientist",
    title: "Palatability Scientist Petfood",
    salary: "48kEUR - 75kEUR",
    sector: "Petfood",
    category: "R&D",
    shortageLevel: "Elevee",
    summary:
      "Travaille sur l'appétence, la préférence animale et l'optimisation sensorielle des produits petfood.",
    skills: ["Palatability", "Experimental design", "Animal nutrition", "Data analysis", "Product development"],
    successFactors: [
      "Maîtriser les protocoles d'essais tout en gardant une lecture produit.",
      "Relier résultats expérimentaux et impact business réel.",
      "Travailler finement entre R&D, marketing et industrialisation."
    ],
    path: ["Nutrition scientist", "R&D scientist", "Palatability lead"],
    missions: [
      "Concevoir et piloter les études d'appétence et de préférence.",
      "Interpréter les résultats pour orienter la formulation.",
      "Contribuer à la différenciation premium des gammes."
    ],
    studies: ["Master nutrition animale", "Ingénieur agro", "Doctorat nutrition"],
    schools: ["AgroParisTech", "Institut Agro Montpellier", "ENSAIA", "Sciences Agro Bordeaux"],
    relatedIndustries: ["Petfood", "Nutrition animale", "R&D produit", "Feed additives", "Premium FMCG"]
  },
  {
    slug: "petfood-manufacturing-excellence-lead",
    title: "Manufacturing Excellence Lead Petfood",
    salary: "62kEUR - 96kEUR",
    sector: "Petfood",
    category: "Production",
    shortageLevel: "Elevee",
    summary:
      "Pilote la performance industrielle, l'amélioration continue et les standards d'exécution sur des sites petfood.",
    skills: ["Lean manufacturing", "KPI", "Continuous improvement", "Food safety", "Leadership"],
    successFactors: [
      "Tenir ensemble qualité, sécurité alimentaire et productivité.",
      "Faire progresser les standards sans casser l'engagement des équipes.",
      "Piloter les usines avec des indicateurs simples et actionnables."
    ],
    path: ["Production engineer", "Continuous improvement lead", "Manufacturing excellence manager"],
    missions: [
      "Déployer les standards d'excellence opérationnelle sur site.",
      "Identifier les goulots et piloter les plans de progrès.",
      "Faire converger production, qualité et maintenance."
    ],
    studies: ["Ingénieur industriel", "Ingénieur agroalimentaire", "Master opérations"],
    schools: ["Institut Agro Dijon", "Sciences Agro Bordeaux", "ENSAIA", "AgroParisTech"],
    relatedIndustries: ["Petfood", "Agro-industrie", "Nutrition animale", "Food safety", "Manufacturing"]
  },
  {
    slug: "biotech-ai-scientist",
    title: "AI Scientist Biotech",
    salary: "68kEUR - 115kEUR",
    sector: "Biotech",
    category: "AI / data",
    shortageLevel: "Tres elevee",
    summary:
      "Applique l'IA aux problématiques biotech de découverte, d'analyse ou d'optimisation de programme.",
    skills: ["Machine learning", "Scientific computing", "Python", "Biology interface", "Model evaluation"],
    successFactors: [
      "Comprendre la science pour éviter de produire de la data hors-sol.",
      "Savoir prouver rapidement la valeur des modèles développés.",
      "Travailler avec des chercheurs sans perdre la rigueur technique."
    ],
    path: ["Data scientist", "AI scientist", "Principal AI scientist"],
    missions: [
      "Identifier les cas d'usage IA à plus forte valeur scientifique.",
      "Développer et valider des modèles adaptés aux données biotech.",
      "Accompagner l'adoption par les équipes programme."
    ],
    studies: ["PhD bioinformatique", "Master IA", "PhD biologie computationnelle"],
    schools: ["Universite Paris-Saclay", "EPITA", "Telecom Paris", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Biotech", "Health data", "Drug discovery", "Digital biology", "Computational R&D"]
  },
  {
    slug: "diagnostic-data-engineer-clinical",
    title: "Clinical Data Engineer Diagnostic",
    salary: "55kEUR - 88kEUR",
    sector: "Diagnostic",
    category: "Data / digital",
    shortageLevel: "Elevee",
    summary:
      "Structure les flux de données cliniques et diagnostic pour des usages analytiques, réglementaires et opérationnels.",
    skills: ["Data pipelines", "Clinical data", "SQL", "Interoperability", "Data quality"],
    successFactors: [
      "Fiabiliser les données avant de vouloir les exploiter.",
      "Comprendre les enjeux cliniques et réglementaires derrière les flux.",
      "Collaborer avec IT, qualité, clinique et produit."
    ],
    path: ["Data analyst", "Data engineer", "Clinical data lead"],
    missions: [
      "Construire les pipelines et modèles de données utiles au diagnostic.",
      "Améliorer qualité, disponibilité et exploitabilité des données.",
      "Soutenir les équipes clinique, produit et réglementaire."
    ],
    studies: ["Master data", "Ingénieur informatique", "Bioinformatique"],
    schools: ["Grenoble INP - Ensimag", "EPITA", "Telecom Paris", "Universite Paris-Saclay"],
    relatedIndustries: ["Diagnostic", "Health data", "Clinical research", "Medtech", "Interoperability"]
  },
  {
    slug: "diagnostic-cybersecurity-engineer",
    title: "Cybersecurity Engineer Diagnostic & Medtech",
    salary: "62kEUR - 98kEUR",
    sector: "Diagnostic",
    category: "Cybersecurite",
    shortageLevel: "Tres elevee",
    summary:
      "Protège les environnements IVD, middleware et dispositifs connectés contre les risques cyber tout en préservant l'exploitation.",
    skills: ["Cybersecurity", "Medical devices", "Network security", "IAM", "Risk management"],
    successFactors: [
      "Parler le langage des opérations et pas seulement celui du risque.",
      "Prioriser les vrais points d'exposition des environnements santé.",
      "Faire accepter les contrôles sans freiner l'activité."
    ],
    path: ["Security analyst", "Security engineer", "Cyber lead healthcare"],
    missions: [
      "Évaluer les risques cyber liés aux équipements et flux de données.",
      "Déployer les contrôles de sécurité adaptés aux environnements santé.",
      "Renforcer la résilience des plateformes connectées."
    ],
    studies: ["Master cybersécurité", "Ingénieur informatique", "Master systèmes d'information"],
    schools: ["Telecom Paris", "EPITA", "Grenoble INP - Ensimag", "Universite Paris-Saclay"],
    relatedIndustries: ["Diagnostic", "Medtech", "Health data", "Medical devices", "Middleware healthcare"]
  },
  {
    slug: "biotech-sales-operations-director",
    title: "Sales Operations Director Biotech",
    salary: "85kEUR - 130kEUR + variable",
    sector: "Biotech",
    category: "Operations commerciales",
    shortageLevel: "Moderee",
    summary:
      "Structure les process, outils et indicateurs commerciaux pour des équipes biotech qui se professionnalisent.",
    skills: ["Sales operations", "CRM", "Forecasting", "Process design", "Commercial analytics"],
    successFactors: [
      "Créer une mécanique d'exécution sans bureaucratiser la vente.",
      "Rendre les chiffres utiles pour les décideurs et le terrain.",
      "Aligner opérations commerciales, marketing et leadership."
    ],
    path: ["Sales analyst", "Sales operations manager", "Revenue operations director"],
    missions: [
      "Mettre sous contrôle pipeline, prévisions et hygiene CRM.",
      "Structurer les process de vente et de pilotage commercial.",
      "Aider le leadership à mieux prioriser les efforts go-to-market."
    ],
    studies: ["École de commerce", "Ingénieur + business", "Master data / commercial"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Biotech", "Healthtech", "Medtech", "Diagnostics", "Commercial operations"]
  },
  {
    slug: "medical-vet-area-sales-manager",
    title: "Area Sales Manager Medical Vet",
    salary: "62kEUR - 105kEUR + variable",
    sector: "Medical Vet",
    category: "Commercial",
    shortageLevel: "Elevee",
    summary:
      "Développe un territoire ou un portefeuille en santé animale sur des cycles de vente techniques et relationnels.",
    skills: ["Area sales", "KAM", "Veterinary market", "Negotiation", "Distributor management"],
    successFactors: [
      "Construire une crédibilité forte auprès d'interlocuteurs vétérinaires et business.",
      "Savoir animer un territoire sans perdre la qualité du suivi.",
      "Traduire les enjeux scientifiques en bénéfices marché concrets."
    ],
    path: ["Sales specialist", "Regional sales", "Area manager"],
    missions: [
      "Développer les ventes sur un territoire ou un portefeuille ciblé.",
      "Animer les distributeurs, comptes clés et relais terrain.",
      "Faire remonter les signaux concurrence, usage et besoins clients."
    ],
    studies: ["Vétérinaire", "École de commerce", "Master business international"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins", "Diagnostic vet", "Nutrition animale"]
  },
  {
    slug: "veterinary-hr-business-partner",
    title: "HR Business Partner Veterinary",
    salary: "55kEUR - 85kEUR",
    sector: "Veterinary",
    category: "Ressources humaines",
    shortageLevel: "Elevee",
    summary:
      "Accompagne les managers et les réseaux de cliniques sur les enjeux de staffing, d'organisation et de performance RH.",
    skills: ["HRBP", "Talent acquisition", "Performance", "Manager support", "Organization"],
    successFactors: [
      "Comprendre la réalité des cliniques et des tensions métiers.",
      "Soutenir les managers sans alourdir les opérations.",
      "Faire des RH un levier de stabilisation et de croissance."
    ],
    path: ["HR generalist", "HRBP", "Head of people veterinary"],
    missions: [
      "Accompagner les managers de clinique sur leurs besoins RH.",
      "Soutenir recrutement, onboarding et structuration locale.",
      "Fiabiliser les pratiques people sur plusieurs sites."
    ],
    studies: ["Master RH", "Psychologie du travail", "École de commerce"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Institut Agro Rennes Angers"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Animal health"]
  },
  {
    slug: "cosmetique-export-manager-mena-afrique",
    title: "Export Manager Afrique & MENA Cosmétique",
    salary: "65kEUR - 108kEUR + variable",
    sector: "Cosmetique",
    category: "Developpement international",
    shortageLevel: "Elevee",
    summary:
      "Porte le développement export sur l'Afrique et le Moyen-Orient pour des marques et solutions cosmétiques.",
    skills: ["Export", "Distribution", "International sales", "Beauty markets", "Negotiation"],
    successFactors: [
      "Adapter l'offre et le discours aux réalités marché locales.",
      "Choisir les bons distributeurs et piloter la relation dans la durée.",
      "Combiner sens business, présence terrain et intelligence culturelle."
    ],
    path: ["Area manager", "Export manager", "Head of international sales"],
    missions: [
      "Structurer les priorités marchés et distributeurs sur la zone.",
      "Piloter les plans d'action commerciaux et les comptes clés.",
      "Accélérer la croissance internationale de la business unit."
    ],
    studies: ["École de commerce", "Master commerce international", "Formation cosmétique + business"],
    schools: ["ISIPCA", "ICAP Montpellier", "ESCOM Compiegne"],
    relatedIndustries: ["Cosmetique", "Beauty tech", "FMCG premium", "Dermocosmetique", "Export international"]
  },
  {
    slug: "diagnostic-account-manager",
    title: "Account Manager Diagnostic",
    salary: "42kEUR - 68kEUR + variable",
    sector: "Diagnostic",
    category: "Commercial",
    shortageLevel: "Elevee",
    summary:
      "Développe, fidélise et fait grandir un portefeuille de comptes diagnostics, laboratoires et structures de santé sur des offres techniques.",
    skills: ["Account management", "Upsell", "Relationship building", "Technical sales", "Renewal discipline"],
    successFactors: [
      "Savoir faire grandir un compte sans perdre la qualité de service.",
      "Comprendre le besoin client au-delà de la commande immédiate.",
      "Travailler étroitement avec application, service et ADV pour garder le compte durablement."
    ],
    path: ["Sales specialist", "Account manager", "Senior account manager"],
    missions: [
      "Gérer le portefeuille client et sécuriser le renouvellement des comptes.",
      "Identifier les opportunités de croissance, extension ou équipement complémentaire.",
      "Coordonner ventes, support, application et service pour fluidifier l'expérience client."
    ],
    studies: ["École de commerce", "Ingénieur avec fibre business", "Master vente B2B / sciences"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Hospital accounts", "Laboratory equipment"]
  },
  {
    slug: "diagnostic-tender-manager",
    title: "Tender Manager Diagnostic",
    salary: "52kEUR - 75kEUR",
    sector: "Diagnostic",
    category: "Appels d'offres",
    shortageLevel: "Elevee",
    summary:
      "Pilote les appels d'offres publics et privés dans des environnements IVD et medtech où la rigueur documentaire et le timing commercial sont déterminants.",
    skills: ["Tender management", "Public procurement", "Coordination", "Compliance", "Commercial writing"],
    successFactors: [
      "Tenir des délais serrés sans perdre la qualité des réponses.",
      "Comprendre les attentes hôpitaux, groupements et laboratoires.",
      "Faire travailler ensemble ventes, juridique, finance et affaires réglementaires."
    ],
    path: ["Bid specialist", "Tender manager", "Head of tenders"],
    missions: [
      "Préparer, coordonner et déposer les réponses aux appels d'offres.",
      "Structurer les contributions ventes, médical, qualité et finance.",
      "Sécuriser la conformité documentaire et le pilotage des échéances."
    ],
    studies: ["École de commerce", "Master santé / affaires publiques", "Ingénieur avec expérience marché public"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Telecom Paris"],
    relatedIndustries: ["Diagnostic", "Medtech", "IVD", "Hospital accounts", "Public procurement"]
  },
  {
    slug: "medical-vet-distributor-manager",
    title: "Distributor Manager Medical Vet",
    salary: "65kEUR - 110kEUR + variable",
    sector: "Medical Vet",
    category: "Distribution / international",
    shortageLevel: "Elevee",
    summary:
      "Anime et développe un réseau de distributeurs en santé animale sur des portefeuilles techniques, commerciaux et réglementaires exigeants.",
    skills: ["Distributor management", "Channel strategy", "Negotiation", "Forecasting", "Market development"],
    successFactors: [
      "Choisir les bons partenaires et tenir leur performance dans le temps.",
      "Combiner proximité terrain, exigence contractuelle et vision marché.",
      "Traduire les enjeux scientifiques en exécution commerciale claire."
    ],
    path: ["Area manager", "Channel manager", "Distributor manager"],
    missions: [
      "Piloter les distributeurs, leur plan d'action et leur performance commerciale.",
      "Structurer la couverture marché, les priorités pays et les lancements.",
      "Faire le lien entre distributeurs, équipes internes et besoins terrain."
    ],
    studies: ["École de commerce", "Vétérinaire avec exposition business", "Master commerce international"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Diagnostic vet", "Nutrition animale"]
  },
  {
    slug: "diagnostic-customer-success-manager",
    title: "Customer Success Manager Diagnostic",
    salary: "42kEUR - 62kEUR",
    sector: "Diagnostic",
    category: "Customer success",
    shortageLevel: "Elevee",
    summary:
      "Soutient l'adoption, la valeur d'usage et la fidélisation des comptes diagnostics en coordonnant onboarding, support et expansion.",
    skills: ["Customer success", "Onboarding", "Adoption", "Renewal", "Cross-functional coordination"],
    successFactors: [
      "Mesurer la valeur client de façon concrète et régulière.",
      "Réagir vite aux signaux de churn ou de sous-adoption.",
      "Travailler avec ventes, support et produit sans confusion de rôle."
    ],
    path: ["Customer support", "Customer success manager", "Head of customer success"],
    missions: [
      "Accompagner l'onboarding et l'adoption des solutions chez les comptes clients.",
      "Suivre les signaux d'usage, de satisfaction et de renouvellement.",
      "Faire remonter les besoins vers produit, service et commercial."
    ],
    studies: ["Master management", "Sciences de la vie + expérience service", "École de commerce"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Software healthcare", "Customer enablement"]
  },
  {
    slug: "biotech-commercial-excellence-manager",
    title: "Commercial Excellence Manager Biotech",
    salary: "60kEUR - 105kEUR + variable",
    sector: "Biotech",
    category: "Operations commerciales",
    shortageLevel: "Moderee",
    summary:
      "Structure la performance commerciale, les incentives, le pilotage CRM et les routines de forecast pour des équipes biotech en professionnalisation.",
    skills: ["Commercial excellence", "CRM", "Forecasting", "Incentives", "Pipeline governance"],
    successFactors: [
      "Mettre en place de la discipline commerciale sans alourdir les équipes.",
      "Rendre les données utiles pour les managers et la direction.",
      "Aider le terrain à mieux exécuter plutôt qu'à juste mieux reporter."
    ],
    path: ["Sales analyst", "Sales operations", "Commercial excellence manager"],
    missions: [
      "Structurer les process commerciaux, le CRM et les rituels de pilotage.",
      "Améliorer la qualité du forecast et la lisibilité du pipeline.",
      "Travailler sur incentives, couverture des comptes et priorisation commerciale."
    ],
    studies: ["École de commerce", "Ingénieur + business", "Master data / commercial"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Biotech", "Healthtech", "Medtech", "Diagnostics", "Commercial operations"]
  },
  {
    slug: "biotech-pricing-market-access-manager",
    title: "Pricing & Market Access Manager Biotech",
    salary: "62kEUR - 95kEUR",
    sector: "Biotech",
    category: "Market access",
    shortageLevel: "Tres elevee",
    summary:
      "Articule stratégie prix, accès au marché, logique HTA et lecture médico-économique pour accélérer la trajectoire commerciale des innovations biotech.",
    skills: ["Pricing", "Market access", "HTA", "Value communication", "Cross-functional influence"],
    successFactors: [
      "Relier stratégie prix, preuve clinique et adoption marché.",
      "Avoir une vraie lecture business des contraintes de remboursement.",
      "Savoir travailler avec médical, réglementaire, HEOR et direction."
    ],
    path: ["Pricing analyst", "Market access manager", "Pricing & access lead"],
    missions: [
      "Construire les scénarios prix et les hypothèses d'accès au marché.",
      "Coordonner la préparation des argumentaires de valeur et dossiers d'accès.",
      "Aligner médical, market access, réglementaire et direction sur la trajectoire marché."
    ],
    studies: ["Pharmacie", "HEOR / économie de la santé", "Sciences + business"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Institut Pasteur", "Universite d'Angers"],
    relatedIndustries: ["Biotech", "Biopharma", "Rare diseases", "Medtech", "Market access"]
  },
  {
    slug: "diagnostic-vp-sales",
    title: "VP Sales Diagnostic",
    salary: "140kEUR - 260kEUR + variable",
    sector: "Diagnostic",
    category: "Direction commerciale",
    shortageLevel: "Moderee",
    summary:
      "Pilote la stratégie commerciale, la couverture grands comptes et l'exécution multi-pays sur des cycles de vente diagnostiques complexes.",
    skills: ["Executive sales leadership", "Forecasting", "Key accounts", "Channel strategy", "Team management"],
    successFactors: [
      "Donner une direction commerciale claire et tenable.",
      "Combiner vision grands comptes, discipline de forecast et qualité d'exécution.",
      "Faire travailler ensemble ventes directes, distributeurs, applications et service."
    ],
    path: ["Sales director", "Regional VP", "VP Sales"],
    missions: [
      "Définir la stratégie commerciale et la priorisation des comptes / zones.",
      "Piloter les leaders commerciaux, les grands comptes et la performance pipeline.",
      "Sécuriser croissance, marge et lisibilité business pour la direction."
    ],
    studies: ["École de commerce", "Ingénieur + forte exposition commerciale", "MBA optionnel"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Hospital accounts", "Laboratory equipment"]
  },
  {
    slug: "biotech-vp-operations",
    title: "VP Operations Biotech",
    salary: "120kEUR - 210kEUR + variable",
    sector: "Biotech",
    category: "Direction operations",
    shortageLevel: "Elevee",
    summary:
      "Cadre l'industrialisation, la supply, la qualité et la montée en échelle sur des organisations biotech en forte accélération.",
    skills: ["Operations leadership", "Industrial scale-up", "Supply", "Quality", "Execution discipline"],
    successFactors: [
      "Passer du mode projet au mode système sans casser la vitesse.",
      "Prioriser les goulots industriels qui bloquent vraiment la croissance.",
      "Créer une gouvernance claire entre supply, qualité, production et MSAT."
    ],
    path: ["Operations director", "Site leader", "VP operations"],
    missions: [
      "Piloter la performance globale des opérations et de la supply.",
      "Sécuriser la montée en capacité, la robustesse qualité et l'exécution industrielle.",
      "Aligner les fonctions critiques autour d'une trajectoire de croissance tenable."
    ],
    studies: ["Diplôme d'ingénieur", "Formation opérations / supply", "Executive education"],
    schools: ["Universite Paris-Saclay", "AgroParisTech", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Cell therapy", "Industrial biotech"]
  },
  {
    slug: "biotech-head-of-quality",
    title: "Head of Quality Biotech",
    salary: "85kEUR - 135kEUR",
    sector: "Biotech",
    category: "Qualite",
    shortageLevel: "Elevee",
    summary:
      "Porte la stratégie qualité, la conformité GMP et la robustesse du système qualité dans des environnements biotech où la moindre faille coûte cher.",
    skills: ["Quality leadership", "GMP", "Audits", "QMS", "Inspection readiness"],
    successFactors: [
      "Installer une exigence qualité forte sans devenir le frein de l'organisation.",
      "Arbitrer vite entre conformité, risque et continuité des opérations.",
      "Rendre l'entreprise crédible face aux audits, partenaires et investisseurs."
    ],
    path: ["QA manager", "Senior QA lead", "Head of quality"],
    missions: [
      "Piloter le système qualité global et la préparation inspection / audit.",
      "Superviser CAPA, déviations, change control et culture qualité.",
      "Aligner qualité, production, MSAT, supply et direction sur les vrais risques."
    ],
    studies: ["Pharmacie", "Master qualité", "Ingénieur bioprocédés / biotech"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "ESBS Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO", "Vaccins", "Therapy manufacturing"]
  },
  {
    slug: "medical-vet-head-of-regulatory",
    title: "Head of Regulatory Medical Vet",
    salary: "78kEUR - 110kEUR + variable",
    sector: "Medical Vet",
    category: "Reglementaire",
    shortageLevel: "Elevee",
    summary:
      "Pilote la stratégie réglementaire d'un portefeuille santé animale sur plusieurs marchés, avec une lecture business forte des enregistrements et variations.",
    skills: ["Regulatory leadership", "International registrations", "Stakeholder management", "Documentation", "Market readiness"],
    successFactors: [
      "Anticiper les blocages réglementaires avant qu'ils ne deviennent business.",
      "Porter une vision claire sur les priorités pays et produits.",
      "Faire travailler ensemble réglementaire, médical, supply et commercial."
    ],
    path: ["Regulatory manager", "Senior RA lead", "Head of regulatory"],
    missions: [
      "Définir la stratégie réglementaire et les priorités d'enregistrement.",
      "Coordonner les équipes internes et partenaires sur les dossiers clés.",
      "Soutenir les lancements et la disponibilité marché avec une lecture réglementaire robuste."
    ],
    studies: ["Vétérinaire", "Pharmacie", "Master affaires réglementaires"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Diagnostic vet", "Nutrition animale"]
  },
  {
    slug: "diagnostic-tender-excellence-director",
    title: "Tender Excellence Director Diagnostic",
    salary: "72kEUR - 115kEUR",
    sector: "Diagnostic",
    category: "Appels d'offres",
    shortageLevel: "Elevee",
    summary:
      "Structure la performance appels d'offres, les standards de réponse et l'exécution bid sur des marchés diagnostics où la précision documentaire fait la différence.",
    skills: ["Tender excellence", "Bid governance", "Public procurement", "Process improvement", "Leadership"],
    successFactors: [
      "Créer une mécanique d'exécution bid sans bureaucratiser les équipes.",
      "Élever le niveau de qualité des réponses sur les comptes stratégiques.",
      "Faire converger ventes, juridique, finance et médical autour des bons standards."
    ],
    path: ["Tender manager", "Bid lead", "Tender excellence director"],
    missions: [
      "Définir les standards de réponse, les rituels et la gouvernance appels d'offres.",
      "Piloter les réponses les plus critiques et la qualité documentaire globale.",
      "Améliorer le taux de succès et la discipline d'exécution bid."
    ],
    studies: ["École de commerce", "Master santé / affaires publiques", "Sciences + gestion de projet"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Telecom Paris"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Hospital accounts", "Public procurement"]
  },
  {
    slug: "medical-vet-channel-marketing-manager",
    title: "Channel Marketing Manager Medical Vet",
    salary: "55kEUR - 82kEUR",
    sector: "Medical Vet",
    category: "Marketing channel",
    shortageLevel: "Moderee",
    summary:
      "Anime le marketing de distribution et l'activation partenaires sur des portefeuilles santé animale vendus en réseau indirect.",
    skills: ["Channel marketing", "Partner enablement", "Go-to-market", "Content localization", "Distributor support"],
    successFactors: [
      "Comprendre ce qui aide vraiment un distributeur à mieux vendre.",
      "Aligner messages scientifiques, activation marketing et réalité terrain.",
      "Mesurer l'impact channel avec des indicateurs simples et utiles."
    ],
    path: ["Product marketing", "Channel marketing manager", "Partner marketing lead"],
    missions: [
      "Préparer les plans d'activation marketing avec les distributeurs et relais locaux.",
      "Déployer les contenus, campagnes et outils d'aide à la vente adaptés aux pays.",
      "Faire remonter les besoins terrain vers marketing, ventes et médical."
    ],
    studies: ["École de commerce", "Vétérinaire avec fibre business", "Master marketing"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Nutrition animale", "Diagnostic vet"]
  },
  {
    slug: "medical-vet-distributor-excellence-manager",
    title: "Distributor Excellence Manager Medical Vet",
    salary: "65kEUR - 105kEUR + variable",
    sector: "Medical Vet",
    category: "Distribution / performance",
    shortageLevel: "Elevee",
    summary:
      "Améliore la performance, les standards et la discipline commerciale d'un réseau de distributeurs en santé animale.",
    skills: ["Distributor performance", "Channel excellence", "KPI", "Partner management", "Commercial execution"],
    successFactors: [
      "Installer des standards concrets sans casser la relation partenaire.",
      "Rendre la performance distributeur lisible et pilotable.",
      "Créer des routines de marché qui aident vraiment la croissance."
    ],
    path: ["Channel manager", "Distributor manager", "Distributor excellence manager"],
    missions: [
      "Définir les standards de pilotage, d'activation et de suivi des distributeurs.",
      "Accompagner les partenaires sur les plans d'action et la qualité d'exécution.",
      "Améliorer visibilité pipeline, animation commerciale et croissance réseau."
    ],
    studies: ["École de commerce", "Master commerce international", "Vétérinaire avec exposition business"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Nutrition animale", "Distribution spécialisée"]
  },
  {
    slug: "diagnostic-customer-experience-director",
    title: "Customer Experience Director Diagnostic",
    salary: "70kEUR - 110kEUR",
    sector: "Diagnostic",
    category: "Customer experience",
    shortageLevel: "Moderee",
    summary:
      "Porte la qualité de l'expérience client de bout en bout sur des parcours diagnostics mêlant ventes, application, support et service.",
    skills: ["Customer experience", "Service design", "Cross-functional leadership", "Voice of customer", "Process orchestration"],
    successFactors: [
      "Voir l'expérience client comme un levier de fidélisation et de croissance.",
      "Rendre fluides les interfaces entre équipes qui se renvoient souvent la balle.",
      "Mesurer les irritants et les transformer en actions visibles."
    ],
    path: ["Customer success manager", "CX manager", "Customer experience director"],
    missions: [
      "Piloter la stratégie expérience client sur les comptes et parcours clés.",
      "Aligner support, application, service, ADV et ventes autour des bons standards.",
      "Prioriser les chantiers d'amélioration qui réduisent friction et churn."
    ],
    studies: ["École de commerce", "Master management", "Sciences + forte exposition service"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Laboratory equipment", "Customer enablement"]
  },
  {
    slug: "diagnostic-service-operations-director",
    title: "Service Operations Director Diagnostic",
    salary: "78kEUR - 125kEUR",
    sector: "Diagnostic",
    category: "Operations service",
    shortageLevel: "Elevee",
    summary:
      "Pilote les opérations de service, la maintenance et la couverture terrain sur des bases installées critiques en diagnostic et instrumentation.",
    skills: ["Service operations", "Field service", "SLA", "Team leadership", "Operational governance"],
    successFactors: [
      "Donner une structure claire à des équipes terrain souvent sous pression.",
      "Faire progresser la qualité de service sans perdre la vitesse d'intervention.",
      "Rendre les indicateurs service lisibles pour les opérations comme pour la direction."
    ],
    path: ["Field service manager", "Service operations manager", "Service operations director"],
    missions: [
      "Piloter les équipes service, les SLA et les escalades critiques.",
      "Améliorer l'exécution terrain, la planification et l'expérience client associée.",
      "Aligner service, supply pièces, commercial et application autour de la performance."
    ],
    studies: ["Ingénieur biomédical", "Ingénieur instrumentation", "Master management technique"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Instrumentation", "Laboratories"]
  },
  {
    slug: "biotech-revenue-operations-manager",
    title: "Revenue Operations Manager Biotech",
    salary: "58kEUR - 85kEUR",
    sector: "Biotech",
    category: "Operations commerciales",
    shortageLevel: "Moderee",
    summary:
      "Cadre les process, les données et les rituels qui relient marketing, ventes et customer teams dans des organisations biotech qui se structurent.",
    skills: ["RevOps", "CRM", "Pipeline analytics", "Forecasting", "Cross-functional execution"],
    successFactors: [
      "Relier les équipes revenue sans créer une couche administrative de plus.",
      "Faire des données un outil de décision, pas un simple reporting.",
      "Rendre plus prévisible ce qui fait la croissance."
    ],
    path: ["Sales operations", "Revenue operations manager", "Head of RevOps"],
    missions: [
      "Mettre sous contrôle pipeline, données CRM, conversions et forecast.",
      "Aligner marketing, ventes et customer teams sur des définitions communes.",
      "Identifier les points de friction qui ralentissent la croissance commerciale."
    ],
    studies: ["École de commerce", "Ingénieur + business", "Master data / management"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Biotech", "Healthtech", "Medtech", "Diagnostics", "Commercial operations"]
  },
  {
    slug: "diagnostic-bid-manager-international",
    title: "Bid Manager International Diagnostic",
    salary: "56kEUR - 90kEUR",
    sector: "Diagnostic",
    category: "Bid / international",
    shortageLevel: "Elevee",
    summary:
      "Coordonne les réponses à appels d'offres et bids internationaux sur des environnements diagnostic fortement techniques et documentés.",
    skills: ["Bid management", "International tenders", "Coordination", "Documentation", "Deadline management"],
    successFactors: [
      "Tenir la qualité documentaire malgré la complexité multi-pays.",
      "Savoir orchestrer les bons contributeurs au bon moment.",
      "Garder une lecture commerciale du bid sans perdre la rigueur attendue."
    ],
    path: ["Tender specialist", "Bid manager", "Senior bid manager"],
    missions: [
      "Piloter les réponses à appels d'offres et demandes complexes à l'international.",
      "Coordonner ventes, service, médical, qualité, supply et juridique sur les bids critiques.",
      "Sécuriser délais, conformité et qualité de réponse sur les dossiers stratégiques."
    ],
    studies: ["École de commerce", "Master santé / commerce international", "Sciences + gestion de projet"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Hospital accounts", "International bids"]
  },
  {
    slug: "biotech-strategic-partnerships-manager",
    title: "Strategic Partnerships Manager Biotech",
    salary: "60kEUR - 105kEUR",
    sector: "Biotech",
    category: "Partenariats",
    shortageLevel: "Moderee",
    summary:
      "Développe et structure les alliances clés avec partenaires scientifiques, industriels et business dans des environnements biotech en accélération.",
    skills: ["Partnerships", "Alliance management", "Negotiation", "Ecosystem building", "Business development"],
    successFactors: [
      "Identifier les bons partenaires avant qu'ils ne deviennent évidents pour tout le monde.",
      "Savoir tenir une alliance sur la durée, pas seulement la signer.",
      "Relier les enjeux business, scientifiques et opérationnels dans chaque partenariat."
    ],
    path: ["Business development manager", "Alliance manager", "Strategic partnerships manager"],
    missions: [
      "Identifier, qualifier et faire progresser les partenariats stratégiques.",
      "Piloter les échanges avec partenaires, directions internes et relais marché.",
      "Transformer les partenariats en leviers concrets de croissance, crédibilité ou exécution."
    ],
    studies: ["École de commerce", "Doctorat / ingénieur avec exposition business", "MBA optionnel"],
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "AgroParisTech", "ESBS Strasbourg"],
    relatedIndustries: ["Biotech", "Biopharma", "Deeptech", "Healthtech", "Strategic alliances"]
  },
  {
    slug: "diagnostic-after-sales-director",
    title: "After-Sales Director Diagnostic",
    salary: "82kEUR - 125kEUR",
    sector: "Diagnostic",
    category: "After-sales / service",
    shortageLevel: "Elevee",
    summary:
      "Cadre la stratégie après-vente, le support et la fidélisation sur des environnements diagnostic où la qualité de service pèse directement sur la rétention des comptes.",
    skills: ["After-sales", "Service leadership", "Installed base", "Customer retention", "Operational governance"],
    successFactors: [
      "Piloter la satisfaction client comme un actif business concret.",
      "Faire converger service, pièces, support et force de vente autour du même niveau d'exigence.",
      "Transformer l'après-vente en levier de fidélisation et de croissance."
    ],
    path: ["After-sales manager", "Service director", "After-sales director"],
    missions: [
      "Définir la stratégie après-vente et les standards de performance associés.",
      "Piloter les équipes support, contrats de service et rétention comptes installés.",
      "Aligner l'après-vente avec les enjeux de renouvellement, satisfaction et profitabilité."
    ],
    studies: ["Ingénieur biomédical", "Master management", "Ingénieur instrumentation + leadership"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Instrumentation", "Service contracts"]
  },
  {
    slug: "medical-vet-commercial-training-manager",
    title: "Commercial Training Manager Medical Vet",
    salary: "55kEUR - 95kEUR",
    sector: "Medical Vet",
    category: "Formation commerciale",
    shortageLevel: "Moderee",
    summary:
      "Structure la montée en compétence des équipes commerciales et distributeurs en santé animale sur des portefeuilles techniques, médicaux et réglementés.",
    skills: ["Sales training", "Enablement", "Coaching", "Scientific communication", "Training design"],
    successFactors: [
      "Savoir transformer une expertise produit en réflexes terrain utiles.",
      "Adapter la formation à des populations commerciales très différentes.",
      "Mesurer l'impact de la formation sur l'exécution commerciale."
    ],
    path: ["Trainer", "Sales enablement manager", "Commercial training manager"],
    missions: [
      "Construire les parcours de formation des équipes commerciales et partenaires.",
      "Déployer les outils, modules et rituels de montée en compétence.",
      "Faire le lien entre besoins terrain, marketing, médical et direction commerciale."
    ],
    studies: ["École de commerce", "Vétérinaire avec exposition terrain", "Master formation / management"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Nutrition animale", "Distributor enablement"]
  }
];

const withDefaultRoleMetadata = (role: JobRole): JobRole => {
  const benchmark =
    glassdoorBenchmarks[role.slug] ?? glassdoorBenchmarks[role.slug.split("-").slice(1).join("-")];

  return {
    ...role,
    salary: benchmark?.salary ?? role.salary,
    salarySource:
      benchmark?.salarySource ??
      role.salarySource ??
      "Repere indicatif a calibrer selon le grade, la taille de l'entreprise, la localisation et le niveau d'exposition. A recouper avec Aon RMCD / benchmarks de remuneration et, quand disponible, avec Glassdoor.",
    sources: [
      ...(benchmark
        ? [
            {
              name: benchmark.sourceName,
              url: benchmark.sourceUrl
            }
          ]
        : []),
      ...(role.sources ?? [...defaultRoleSources])
    ]
  };
};

export const jobRoles: JobRole[] = [...coreRoles, ...strategicExtras]
  .map(withDefaultRoleMetadata)
  .sort((a, b) => a.title.localeCompare(b.title, "fr"));

export const jobRoleSectors = unique(jobRoles.map((role) => role.sector));
export const jobRoleCategories = unique(jobRoles.map((role) => role.category));

export const findJobRoleBySlug = (slug: string) => jobRoles.find((role) => role.slug === slug);

export const getRelatedJobRoles = (slug: string, sector: string) =>
  jobRoles.filter((role) => role.slug !== slug && role.sector === sector).slice(0, 6);
