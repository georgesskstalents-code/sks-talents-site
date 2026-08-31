export type JobRole = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  publishDate?: string;
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

const may2026EditorialBatchDate = "2026-05-04";

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

const AON_REWARDS_URL = "https://www.aon.com/france/aon-france/landing-page/guides_enquetes_remuneration.jsp";
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
    seoTitle: "Medical Affairs Manager Biotech : salaire 70-110 K€, missions MSL | SKS",
    seoDescription:
      "Fiche metier Medical Affairs Manager Biotech : evidence scientifique, KOL, MSL, salaire 70-110 K€ + bonus, formations. Benchmark biotech 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins veterinaires", "Diagnostic vet", "Scientific affairs"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "diagnostic-data-science-manager",
    title: "Data Science Manager Diagnostic & Medtech",
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "R&D Cosmetique / Formulation : salaire 42-65 K€, missions | SKS",
    seoDescription:
      "Fiche metier R&D Cosmetique - Formulation Scientist : missions cles (formulation, stabilite, industrialisation), salaire 42-65 K€, formations et ecoles. Benchmark 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Institut Agro Rennes Angers"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Assurance animale"]
  },
  {
    slug: "petfood-rd-director",
    title: "R&D Director Petfood",
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "MSAT Engineer Biotech : salaire 52-82 K€, missions bioproduction | SKS",
    seoDescription:
      "Fiche metier MSAT Engineer Biotech : transfert tech, industrialisation, salaire 52-82 K€, formations et ecoles. Benchmark bioproduction 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "CMC Project Manager Biotech : salaire 65-98 K€, missions | SKS",
    seoDescription:
      "Fiche metier CMC Project Manager Biotech : chemistry manufacturing controls, dossiers reglementaires, salaire 65-98 K€, formations. Benchmark 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    publishDate: may2026EditorialBatchDate,
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
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "Medical Director Biotech : salaire 100-170 K€, missions CMO | SKS",
    seoDescription:
      "Fiche metier Medical Director Biotech : leadership medical, essais cliniques, KOL, salaire 100-170 K€ + variable, formations et parcours. Benchmark 2026 SKS TALENTS.",
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
    schools: ["Universite Paris-Saclay", "Institut Pasteur", "Faculte de pharmacie Strasbourg", "Universite d'Angers", "Harvard Business School"],
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
    publishDate: may2026EditorialBatchDate,
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
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "Regulatory Affairs Cosmetique : salaire 55-88 K€, missions | SKS",
    seoDescription:
      "Fiche metier Regulatory Affairs Manager Cosmetique : dossiers CPSR, claims, CPNP, missions cles, salaire 55-88 K€, formations et parcours. Benchmark 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    seoTitle: "Marketing Cosmetique International : salaire 58-92 K€ | SKS",
    seoDescription:
      "Fiche metier International Marketing Manager Cosmetique : missions cles, salaire 58-92 K€ + variable, formations, ecoles, profils. Benchmark 2026 SKS TALENTS.",
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Institut Agro Rennes Angers", "Universite d'Angers"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Institut Agro Rennes Angers"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen"],
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
    publishDate: may2026EditorialBatchDate,
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
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins", "Diagnostic vet", "Nutrition animale"]
  },
  {
    slug: "veterinary-hr-business-partner",
    title: "HR Business Partner Veterinary",
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Institut Agro Rennes Angers"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Animal health"]
  },
  {
    slug: "cosmetique-export-manager-mena-afrique",
    title: "Export Manager Afrique & MENA Cosmétique",
    seoTitle: "Export Manager Cosmetique MENA & Afrique : 65-108 K€ | SKS",
    seoDescription:
      "Fiche metier Export Manager Cosmetique Afrique & MENA : missions, salaire 65-108 K€ + variable, distributeurs, reglementation. Benchmark 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
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
    seoTitle: "VP Sales Diagnostic : salaire 140-260 K€, missions IVD | SKS TALENTS",
    seoDescription:
      "Fiche metier VP Sales Diagnostic : direction commerciale IVD, hopital-labo, salaire 140-260 K€ + variable, formations. Benchmark exec search 2026 SKS TALENTS.",
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
    seoTitle: "VP Operations Biotech : salaire 120-210 K€, missions scale-up | SKS",
    seoDescription:
      "Fiche metier VP Operations Biotech : industrialisation, GMP, supply chain, salaire 120-210 K€ + variable. Series B+ scale-up. Benchmark 2026 SKS TALENTS.",
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
    seoTitle: "Head of Regulatory Medical Vet : salaire 78-110 K€, EMA/DGAL | SKS",
    seoDescription:
      "Fiche metier Head of Regulatory Medical Vet : pharma veterinaire, EMA CVMP, DGAL, salaire 78-110 K€ + variable. Benchmark Animal Health 2026 SKS TALENTS.",
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Faculte de pharmacie Strasbourg"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
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
    publishDate: may2026EditorialBatchDate,
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
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Universite d'Angers"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vaccins vétérinaires", "Nutrition animale", "Distributor enablement"]
  },
  {
    slug: "petfood-commercial-chiens-chats",
    title: "Commercial Petfood (Chiens & Chats)",
    salary: "48kEUR - 85kEUR + variable",
    sector: "Petfood",
    category: "Sales / développement commercial",
    shortageLevel: "Elevee",
    summary:
      "Développe les ventes de gammes petfood chiens et chats en reliant animation terrain, distribution, sell-out et lecture fine des attentes clients sur des marchés très concurrentiels.",
    skills: ["Développement commercial", "Petfood", "Sell-in / sell-out", "Animation réseau", "Négociation"],
    successFactors: [
      "Comprendre à la fois les leviers business du petfood premium et les contraintes très concrètes du terrain.",
      "Savoir faire progresser les volumes sans dégrader le positionnement de marque.",
      "Transformer les retours réseau en plans d'action commerciaux simples et efficaces."
    ],
    path: ["Chef de secteur", "Commercial réseau spécialisé", "Responsable commercial petfood"],
    missions: [
      "Développer les ventes des gammes chiens et chats auprès des réseaux spécialisés, distributeurs ou comptes stratégiques.",
      "Piloter l'animation commerciale, les plans promotionnels et la visibilité terrain des références clés.",
      "Faire remonter au marketing et à la direction commerciale les signaux marché, attentes clients et mouvements concurrentiels."
    ],
    studies: ["École de commerce", "Agroalimentaire", "Nutrition animale", "Business avec forte culture terrain"],
    schools: ["AgroParisTech", "Institut Agro Montpellier", "ENSAIA", "EM Lyon"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Réseaux spécialisés", "Grande distribution sélective", "Animal health retail"]
  },
  {
    slug: "veterinary-developpement-performance-clinique",
    title: "Vétérinaire Développement & Performance Clinique",
    salary: "55kEUR - 95kEUR + bonus",
    sector: "Veterinary",
    category: "Operations / performance clinique",
    shortageLevel: "Tres elevee",
    summary:
      "Accompagne un réseau de cliniques vétérinaires sur l'audit opérationnel, la performance économique, l'excellence de service et la montée en compétence des équipes terrain.",
    skills: ["Audit opérationnel", "Coaching terrain", "Performance clinique", "Management d'équipes", "Pilotage KPI"],
    successFactors: [
      "Savoir challenger une clinique avec tact, sans casser l'engagement des équipes.",
      "Relier qualité de soin, expérience client, rentabilité et exécution commerciale dans un même plan d'action.",
      "Installer des améliorations durables grâce à un suivi terrain rigoureux et crédible."
    ],
    path: ["Vétérinaire praticien", "Practice manager", "Responsable performance clinique", "Directeur régional opérations"],
    missions: [
      "Réaliser des audits complets en clinique sur l'organisation, la gestion interne, la rentabilité, les ventes, le marketing et le management.",
      "Définir les axes d'amélioration prioritaires puis accompagner la mise en œuvre d'un plan d'actions personnalisé.",
      "Former et coacher les équipes sur les bonnes pratiques commerciales, les parcours client, les procédures et le suivi des résultats."
    ],
    studies: ["Vétérinaire", "Master management de la santé", "Formation complémentaire en opérations ou business"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Pet services", "Excellence opérationnelle", "Practice performance"]
  },
  {
    slug: "veterinary-imageur",
    title: "Vétérinaire Imageur",
    salary: "60kEUR - 110kEUR",
    sector: "Veterinary",
    category: "Imagerie / diagnostic",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote les examens d'imagerie vétérinaire, interprète scanners, échographies et radiographies, puis éclaire les décisions thérapeutiques en lien avec la chirurgie, l'oncologie et la médecine interne.",
    skills: ["Scanner", "Échographie", "Radiologie", "Interprétation à distance", "Diagnostic vétérinaire"],
    successFactors: [
      "Allier excellence technique en imagerie et pédagogie claire auprès des équipes et des propriétaires.",
      "Savoir transformer une image complexe en décision clinique rapide et compréhensible.",
      "Partager ses connaissances pour faire progresser durablement le niveau collectif."
    ],
    path: ["Vétérinaire généraliste", "Vétérinaire référé", "Vétérinaire imageur", "Responsable imagerie"],
    missions: [
      "Réaliser les examens d'imagerie en clinique: scanner, échographie, radiographie et parfois endoscopie.",
      "Interpréter à distance les scanners et formaliser des lectures utiles pour les équipes soignantes.",
      "Contribuer aux décisions thérapeutiques avec l'oncologie, la chirurgie et la médecine interne tout en expliquant clairement les résultats."
    ],
    studies: ["Vétérinaire", "Internat / résidanat imagerie", "Formation approfondie en imagerie diagnostique"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Imagerie vétérinaire", "Cliniques référées", "Oncologie vétérinaire", "Chirurgie vétérinaire"]
  },
  {
    slug: "medical-vet-directeur-operations-learning",
    title: "Directeur des Opérations Learning Santé Animale",
    publishDate: may2026EditorialBatchDate,
    salary: "68kEUR - 92kEUR",
    salarySource:
      "Fourchette prudente pour la France, inspirée des repères Glassdoor 'Directeur des Opérations' observés en février 2026 et ajustée à un scope learning / delivery / santé animale plutôt qu'à un COO ou directeur de BU.",
    sector: "Medical Vet",
    category: "Operations / learning delivery",
    shortageLevel: "Elevee",
    summary:
      "Pilote la performance opérationnelle d'une activité learning en santé animale, en structurant les équipes, les méthodes de travail, la qualité des livrables et la relation avec les grands comptes.",
    skills: ["Operations management", "Project delivery", "KPI", "Leadership d'équipe", "Client management"],
    successFactors: [
      "Savoir faire grandir une organisation sans perdre en qualité d'exécution.",
      "Relier vision stratégique, rigueur opérationnelle et satisfaction client dans un même pilotage.",
      "Installer des méthodes de travail collaboratives qui tiennent dans un contexte de croissance."
    ],
    path: ["Chef de projet senior", "Responsable opérations", "Head of delivery", "Directeur des opérations learning"],
    missions: [
      "Encadrer une équipe pluridisciplinaire composée de chefs de projets, designers, développeurs et experts techniques.",
      "Définir et suivre les indicateurs de performance sur les budgets, délais, qualité et charge projet.",
      "Être l'interlocuteur clé des grands comptes et superviser les projets d'envergure de la conception à la livraison."
    ],
    studies: ["École de commerce", "Ingénierie", "Santé animale", "Management de projet ou formation équivalente"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Université Paris-Saclay"],
    relatedIndustries: ["Medical Vet", "Animal health", "Learning & development", "Edtech santé", "Formation scientifique"],
    sources: [
      {
        name: "Glassdoor - Directeur des Opérations France",
        url: "https://www.glassdoor.fr/Salaires/directeur-operations-salaire-SRCH_KO0%2C20.htm"
      }
    ]
  },
  {
    slug: "medical-vet-sales-developer-product-trainer-emea",
    title: "Sales Developer & Product Trainer EMEA",
    publishDate: may2026EditorialBatchDate,
    salary: "A calibrer selon le périmètre, la zone et la part variable",
    sector: "Medical Vet",
    category: "Sales / training / channel",
    shortageLevel: "Elevee",
    summary:
      "Rôle hybride à l'interface entre développement commercial, formation produit et animation de partenaires, avec un impact direct sur la performance du réseau indirect en EMEA.",
    skills: ["Développement commercial", "Formation produit", "Animation partenaires", "Analyse marché", "Anglais courant"],
    successFactors: [
      "Savoir vendre et former avec le même niveau d'impact.",
      "Adapter les messages et méthodes de vente selon les marchés et les partenaires.",
      "Créer une vraie relation terrain pour faire progresser durablement le sell-out."
    ],
    path: ["Commercial export", "Channel sales", "Product trainer", "Sales Developer & Product Trainer EMEA"],
    missions: [
      "Identifier de nouveaux partenaires, prospecter et ouvrir de nouveaux marchés en EMEA.",
      "Former les équipes commerciales des partenaires, structurer les méthodes de vente et fournir les outils de performance.",
      "Suivre la performance des partenaires, analyser le marché et la concurrence puis proposer des plans d'action."
    ],
    studies: ["Bac +3 / +5 business", "Bac +3 / +5 marketing", "Bac +3 / +5 sciences"],
    schools: ["École de commerce", "Master marketing", "Formation scientifique"],
    relatedIndustries: ["Medtech", "Biotech", "Animal health", "Industrie internationale", "Réseaux de partenaires"]
  },
  {
    slug: "biotech-csv-validation-engineer",
    title: "Ingénieur Validation CSV & Data Integrity Biotech",
    salary: "55kEUR - 85kEUR",
    sector: "Biotech",
    category: "Validation / data integrity",
    shortageLevel: "Tres elevee",
    summary:
      "Sécurise la conformité GxP des systèmes informatisés (CSV), la traçabilité et la data integrity sur des environnements biotech où une dérive documentaire ou technique coûte très cher.",
    skills: ["CSV", "Data integrity", "GxP", "Risk assessment", "Validation documentation"],
    successFactors: [
      "Traduire des contraintes réglementaires en exigences testables et pragmatiques.",
      "Faire converger qualité, IT, production et métiers sans créer de lourdeur.",
      "Avoir une discipline documentaire irréprochable sans perdre le terrain."
    ],
    path: ["Validation engineer", "CSV lead", "Quality systems / validation manager"],
    missions: [
      "Définir le plan de validation CSV (V-model, URS, risk assessment, protocoles, rapports).",
      "Auditer et fiabiliser les contrôles data integrity (ALCOA+) sur les systèmes critiques.",
      "Accompagner les équipes lors d'audits, inspections et revues qualité."
    ],
    studies: ["Ingénieur informatique", "Ingénieur qualité / procédés", "Master systèmes d'information", "Master qualité"],
    schools: ["Telecom Paris", "EPITA", "CentraleSupélec", "Universite Paris-Saclay"],
    relatedIndustries: ["Biotech", "Bioproduction", "CDMO", "GxP", "Digital manufacturing"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "biotech-sterility-assurance-lead",
    title: "Sterility Assurance Lead Biotech",
    salary: "65kEUR - 105kEUR",
    sector: "Biotech",
    category: "Qualité / stérilité",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote les sujets de maîtrise de la contamination, stérilité et microbiologie sur des lignes biotech où la moindre dérive peut bloquer un batch, une libération ou un audit.",
    skills: ["Sterility assurance", "Microbiology", "GMP", "Environmental monitoring", "Deviation/CAPA"],
    successFactors: [
      "Voir les risques avant qu'ils ne deviennent des écarts.",
      "Tenir un standard stérilité élevé sans rendre la production ingérable.",
      "Être crédible à la fois auprès du terrain et lors des audits."
    ],
    path: ["QC microbiology", "Sterility assurance lead", "Head of QA/QC sterility"],
    missions: [
      "Définir et piloter les plans de surveillance environnementale (EM) et les tendances.",
      "Encadrer investigations, déviations et CAPA liées à la microbiologie/stérilité.",
      "Former les équipes et renforcer les routines aseptiques et la culture qualité."
    ],
    studies: ["Pharmacie", "Microbiologie", "Master qualité", "Ingénieur bioprocédés"],
    schools: ["Faculte de pharmacie Strasbourg", "Universite Paris-Saclay", "Institut Pasteur", "AgroParisTech"],
    relatedIndustries: ["Biotech", "Bioproduction", "Aseptic manufacturing", "Cell therapy", "CDMO"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "biotech-automation-controls-engineer",
    title: "Automation & Controls Engineer Biotech",
    salary: "55kEUR - 90kEUR",
    sector: "Biotech",
    category: "Automation / maintenance",
    shortageLevel: "Elevee",
    summary:
      "Garantit la disponibilité et la fiabilité des automates, boucles de contrôle et systèmes industriels sur des environnements biotech où l'arrêt coûte en temps et en qualité.",
    skills: ["Automation", "Controls", "Troubleshooting", "Validation awareness", "Maintenance planning"],
    successFactors: [
      "Résoudre vite, documenter proprement, et éviter la récidive.",
      "Faire dialoguer production, maintenance, qualité et fournisseurs.",
      "Construire une fiabilité durable plutôt que gérer des urgences."
    ],
    path: ["Maintenance / automation engineer", "Automation lead", "Site reliability / engineering manager"],
    missions: [
      "Assurer le diagnostic et la remise en service d'équipements et systèmes automatisés critiques.",
      "Optimiser plans de maintenance, pièces critiques et routines de fiabilisation.",
      "Contribuer aux changements techniques en respectant les exigences qualité/validation."
    ],
    studies: ["Ingénieur automatisme", "Ingénieur maintenance", "Ingénieur instrumentation", "Master systèmes industriels"],
    schools: ["CentraleSupélec", "Mines Paris", "Grenoble INP", "Universite Paris-Saclay"],
    relatedIndustries: ["Biotech", "Bioproduction", "Industrie 4.0", "Maintenance critique", "CDMO"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "biotech-mes-implementation-lead",
    title: "MES Implementation Lead Biotech",
    salary: "70kEUR - 115kEUR",
    sector: "Biotech",
    category: "Digital / operations",
    shortageLevel: "Elevee",
    summary:
      "Pilote le déploiement d'un MES et la digitalisation des dossiers de lot, en reliant qualité, production et IT pour fiabiliser la traçabilité et accélérer la libération.",
    skills: ["MES", "Digital manufacturing", "Change management", "GxP literacy", "Process mapping"],
    successFactors: [
      "Ancrer le projet dans les usages terrain plutôt que dans un cahier des charges abstrait.",
      "Tenir ensemble conformité, adoption et vitesse d'exécution.",
      "Prioriser les workflows qui créent un gain réel pour la libération et l'audit."
    ],
    path: ["Manufacturing systems analyst", "MES lead", "Digital manufacturing manager"],
    missions: [
      "Cartographier les processus production/qualité et définir les exigences MES.",
      "Piloter intégrateurs, tests, validation, formation et adoption terrain.",
      "Sécuriser la continuité d'activité et la qualité des données durant le déploiement."
    ],
    studies: ["Ingénieur industriel", "Ingénieur informatique", "Master systèmes d'information", "Master qualité"],
    schools: ["Telecom Paris", "CentraleSupélec", "EPITA", "Universite Paris-Saclay"],
    relatedIndustries: ["Biotech", "Bioproduction", "GxP", "Industrial IT", "CDMO"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "biotech-clinical-operations-manager",
    title: "Clinical Operations Manager Biotech",
    seoTitle: "Clinical Operations Manager Biotech : 65-105 K€, essais cliniques | SKS",
    seoDescription:
      "Fiche metier Clinical Operations Manager Biotech : essais cliniques Phase I-III, CRO, centres, salaire 65-105 K€. Benchmark 2026 SKS TALENTS.",
    salary: "65kEUR - 105kEUR",
    sector: "Biotech",
    category: "Clinique / essais",
    shortageLevel: "Elevee",
    summary:
      "Pilote l'exécution des essais cliniques (planning, prestataires, centres, qualité) sur des biotech où les délais et la rigueur opérationnelle déterminent l'accès au financement et au marché.",
    skills: ["Clinical operations", "Vendor management", "Study timelines", "Quality oversight", "Stakeholder coordination"],
    successFactors: [
      "Garder la maîtrise des risques opérationnels avant qu'ils n'impactent le protocole.",
      "Créer une exécution simple dans un environnement multi-acteurs.",
      "Être très rigoureux sans ralentir l'avancement."
    ],
    path: ["Clinical trial assistant", "Clinical project manager", "Clinical operations manager"],
    missions: [
      "Planifier et suivre l'exécution des essais (sites, CRO, fournisseurs, budgets et jalons).",
      "Mettre en place la supervision qualité et les routines de pilotage projet.",
      "Coordonner clinique, médical, data, réglementaire et équipes internes."
    ],
    studies: ["Pharmacie", "Master recherche clinique", "Master santé publique", "Sciences de la vie + clinique"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Sciences Po", "ESSEC"],
    relatedIndustries: ["Biotech", "Biopharma", "Clinical trials", "CRO", "Regulated environments"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "biotech-pharmacovigilance-manager",
    title: "Pharmacovigilance Manager Biotech",
    salary: "65kEUR - 110kEUR",
    sector: "Biotech",
    category: "Sécurité / pharmacovigilance",
    shortageLevel: "Elevee",
    summary:
      "Structure et pilote la pharmacovigilance (process, prestataires, compliance, signal management) sur des biotech où la crédibilité sécurité impacte directement le développement.",
    skills: ["Pharmacovigilance", "Signal management", "Vendor oversight", "Compliance", "Medical writing literacy"],
    successFactors: [
      "Construire une fonction PV robuste sans surdimensionner la structure.",
      "Travailler étroitement avec médical et clinique tout en gardant une discipline compliance.",
      "Anticiper les risques sécurité et préparer les réponses auditables."
    ],
    path: ["PV specialist", "PV manager", "Head of pharmacovigilance"],
    missions: [
      "Définir les processus PV (cases, signaux, reporting, audits) et les indicateurs.",
      "Superviser les prestataires et la qualité des livrables sécurité.",
      "Assurer l'alignement entre PV, médical, clinique et réglementaire."
    ],
    studies: ["Pharmacie", "Médecine", "Master pharmacovigilance", "Master santé publique"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Universite de Montpellier pharmacie"],
    relatedIndustries: ["Biotech", "Biopharma", "Clinical development", "Drug safety", "Regulatory"],
    sources: [...defaultRoleSources, { name: "LEEM", url: "https://www.leem.org/" }]
  },
  {
    slug: "biotech-process-development-scientist",
    title: "Process Development Scientist (Upstream/Downstream) Biotech",
    salary: "55kEUR - 90kEUR",
    sector: "Biotech",
    category: "R&D / process development",
    shortageLevel: "Elevee",
    summary:
      "Développe et optimise les procédés upstream/downstream pour sécuriser la montée en échelle, la robustesse et la transférabilité industrielle des produits biotech.",
    skills: ["Bioprocess", "Scale-up", "DoE", "Tech transfer mindset", "Data analysis"],
    successFactors: [
      "Transformer des résultats labo en procédés transférables et stables.",
      "Travailler en continuité avec MSAT, production et qualité.",
      "Documenter et capitaliser sans ralentir l'itération."
    ],
    path: ["Scientist", "Senior scientist", "Process development lead"],
    missions: [
      "Concevoir et conduire des expérimentations pour optimiser rendement, qualité et robustesse.",
      "Préparer le scale-up et les transferts vers MSAT/production/CDMO.",
      "Analyser données procédés et formaliser les recommandations."
    ],
    studies: ["Doctorat sciences de la vie", "Ingénieur bioprocédés", "Master biotechnologies"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech"],
    relatedIndustries: ["Biotech", "Bioproduction", "Cell therapy", "CDMO", "Industrialization"],
    sources: [...defaultRoleSources, { name: "France Biotech - Panorama 2026", url: FRANCE_BIOTECH_PANORAMA_2026_URL }]
  },
  {
    slug: "diagnostic-lims-administrator",
    title: "LIMS Administrator Diagnostic",
    salary: "50kEUR - 80kEUR",
    sector: "Diagnostic",
    category: "Applications / systèmes laboratoire",
    shortageLevel: "Elevee",
    summary:
      "Administre et fiabilise un LIMS (paramétrage, incidents, évolutions, interfaces) sur des environnements diagnostics où l'indisponibilité du système bloque la chaîne laboratoire.",
    skills: ["LIMS", "Support applicatif", "Data quality", "Process mapping", "Stakeholder management"],
    successFactors: [
      "Comprendre le labo et ses contraintes avant de toucher au paramétrage.",
      "Garder une discipline de changements et de traçabilité sans rigidifier.",
      "Fiabiliser les interfaces et les données plutôt que multiplier les contournements."
    ],
    path: ["Lab systems specialist", "LIMS administrator", "Lab IT lead"],
    missions: [
      "Configurer et maintenir le LIMS (workflows, droits, référentiels, templates).",
      "Gérer incidents, évolutions et demandes utilisateurs avec une gouvernance claire.",
      "Coordonner intégrations et échanges de données avec instruments et middleware."
    ],
    studies: ["Bioinformatique", "Ingénieur informatique", "Master systèmes d'information", "Sciences + informatique"],
    schools: ["Telecom Paris", "EPITA", "Grenoble INP - Ensimag", "Universite Paris-Saclay"],
    relatedIndustries: ["Diagnostic", "IVD", "Laboratoires d'analyses", "Health data", "Interoperability"],
    sources: [
      ...defaultRoleSources,
      { name: "SIDIV", url: "https://sidiv.fr/" },
      { name: "Roche Diagnostics", url: "https://diagnostics.roche.com/" }
    ]
  },
  {
    slug: "diagnostic-hl7-integration-specialist",
    title: "HL7 / Interoperability Integration Specialist Diagnostic",
    salary: "55kEUR - 90kEUR",
    sector: "Diagnostic",
    category: "Middleware / interoperability",
    shortageLevel: "Tres elevee",
    summary:
      "Conçoit, déploie et maintient les interfaces HL7 (et autres standards) entre instruments, middleware, LIS/LIMS et SI hospitaliers pour sécuriser les flux diagnostics.",
    skills: ["HL7", "Integration", "Troubleshooting", "Clinical workflows", "Documentation"],
    successFactors: [
      "Diagnostiquer vite des incidents d'interface sans mettre en danger la continuité.",
      "Traduire le métier laboratoire en spécifications d'interopérabilité.",
      "Sécuriser la maintenance et la traçabilité des changements."
    ],
    path: ["Integration engineer", "Middleware specialist", "Interoperability lead"],
    missions: [
      "Analyser les flux cibles et mettre en place les interfaces et mapping nécessaires.",
      "Assurer la supervision, le support et la résolution des incidents d'intégration.",
      "Documenter, tester et sécuriser les changements sur des environnements critiques."
    ],
    studies: ["Ingénieur informatique", "Master systèmes d'information", "Bioinformatique", "Ingénierie biomédicale"],
    schools: ["Telecom Paris", "Grenoble INP - Ensimag", "EPITA", "CentraleSupélec"],
    relatedIndustries: ["Diagnostic", "IVD", "Hôpital", "Interopérabilité", "Health IT"],
    sources: [
      ...defaultRoleSources,
      { name: "SIDIV", url: "https://sidiv.fr/" },
      { name: "Mindray", url: "https://www.mindray.com/" }
    ]
  },
  {
    slug: "diagnostic-ivdr-regulatory-affairs-specialist",
    title: "Regulatory Affairs Specialist IVDR (IVD)",
    seoTitle: "Regulatory Affairs IVDR (IVD) : salaire 60-95 K€, dossiers | SKS TALENTS",
    seoDescription:
      "Fiche metier Regulatory Affairs Specialist IVDR (IVD) : PRRC, dossiers techniques, post-market surveillance, salaire 60-95 K€. Benchmark diagnostic 2026.",
    salary: "60kEUR - 95kEUR",
    sector: "Diagnostic",
    category: "Affaires réglementaires (IVD)",
    shortageLevel: "Tres elevee",
    summary:
      "Porte les dossiers techniques, la conformité IVDR et la coordination interne/externe sur des produits diagnostics où la robustesse documentaire conditionne l'accès au marché.",
    skills: ["IVDR", "Technical documentation", "Regulatory strategy", "Quality interfaces", "Stakeholder management"],
    successFactors: [
      "Rendre la complexité réglementaire lisible pour les équipes produit et qualité.",
      "Anticiper les points bloquants pour éviter les retards de mise sur le marché.",
      "Tenir une discipline documentaire audit-ready."
    ],
    path: ["Regulatory specialist", "Regulatory affairs manager", "Head of regulatory IVD"],
    missions: [
      "Construire et maintenir la documentation technique et les preuves de conformité.",
      "Coordonner qualité, clinique, R&D, industriels et partenaires externes.",
      "Préparer audits, interactions et jalons critiques du cycle de vie réglementaire."
    ],
    studies: ["Pharmacie", "Ingénieur biomédical", "Master affaires réglementaires", "Master qualité"],
    schools: ["Faculte de pharmacie Strasbourg", "Universite Paris-Saclay", "Telecom Paris"],
    relatedIndustries: ["Diagnostic", "IVD", "Regulatory", "Quality systems", "Hospital ecosystem"],
    sources: [
      ...defaultRoleSources,
      { name: "SIDIV", url: "https://sidiv.fr/" }
    ]
  },
  {
    slug: "diagnostic-clinical-data-manager",
    title: "Clinical Data Manager Diagnostic & Medtech",
    salary: "55kEUR - 90kEUR",
    sector: "Diagnostic",
    category: "Data / clinique",
    shortageLevel: "Elevee",
    summary:
      "Sécurise la qualité, la complétude et la traçabilité des données cliniques sur des projets diagnostic/medtech où la preuve et la conformité data conditionnent l'adoption et l'accès au marché.",
    skills: ["Clinical data", "Data quality", "Query management", "Process governance", "Stakeholder coordination"],
    successFactors: [
      "Être rigoureux sur la donnée sans ralentir l'équipe clinique.",
      "Créer des standards simples, compris et tenus dans la durée.",
      "Transformer la complexité des datasets en décisions actionnables."
    ],
    path: ["Data coordinator", "Clinical data manager", "Data management lead"],
    missions: [
      "Définir les standards data, contrôler la qualité et piloter les corrections (queries).",
      "Coordonner équipes cliniques, data, qualité et partenaires externes.",
      "Préparer les exports et livrables data pour analyses, audits et dossiers."
    ],
    studies: ["Bioinformatique", "Biostatistiques", "Master data santé", "Sciences de la vie"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Diagnostic", "Medtech", "Clinical evidence", "Health data", "Regulated environments"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "diagnostic-technical-support-lead",
    title: "Technical Support Lead Diagnostic",
    salary: "55kEUR - 90kEUR",
    sector: "Diagnostic",
    category: "Support / customer service",
    shortageLevel: "Elevee",
    summary:
      "Structure et pilote un support technique (niveau 2/3) sur des équipements et logiciels diagnostics, en sécurisant délais, qualité de réponse et escalades.",
    skills: ["Technical support", "Incident triage", "Customer communication", "Knowledge base", "Cross-team coordination"],
    successFactors: [
      "Réduire le temps de résolution sans sacrifier la qualité des diagnostics.",
      "Créer une base de connaissances qui évite la répétition des incidents.",
      "Coordonner R&D, qualité, service terrain et clients avec un langage clair."
    ],
    path: ["Support engineer", "Technical support lead", "Customer support manager"],
    missions: [
      "Mettre en place la gouvernance support (SLA, triage, escalade, reporting).",
      "Traiter les cas complexes et améliorer la résolution au premier contact.",
      "Faire remonter les signaux récurrents vers qualité, produit et ingénierie."
    ],
    studies: ["Ingénieur biomédical", "Ingénieur informatique", "Sciences + support", "Master systèmes"],
    schools: ["Telecom Paris", "UTC Biomed", "EPITA"],
    relatedIndustries: ["Diagnostic", "Medtech", "Customer support", "After-sales", "Hospital ecosystem"],
    sources: [
      ...defaultRoleSources,
      { name: "Roche Diagnostics", url: "https://diagnostics.roche.com/" }
    ]
  },
  {
    slug: "diagnostic-ot-cybersecurity-specialist",
    title: "OT Cybersecurity Specialist (Lab & Medtech)",
    salary: "65kEUR - 105kEUR",
    sector: "Diagnostic",
    category: "Cybersecurite / OT",
    shortageLevel: "Tres elevee",
    summary:
      "Protège les environnements OT et dispositifs connectés (laboratoire, production, service) en réduisant les risques cyber sans casser la disponibilité ni la conformité.",
    skills: ["OT security", "Risk assessment", "Segmentation", "Incident response", "GxP awareness"],
    successFactors: [
      "Comprendre la réalité opérationnelle avant d'imposer des contrôles.",
      "Prioriser les vrais risques (disponibilité, confidentialité, intégrité) sur des flux critiques.",
      "Créer des standards applicables et maintenables."
    ],
    path: ["Security engineer", "OT security specialist", "Cyber lead / CISO adjoint"],
    missions: [
      "Cartographier les actifs, flux et vulnérabilités OT liés au diagnostic/medtech.",
      "Définir les mesures de protection (segmentation, durcissement, gestion accès, monitoring).",
      "Contribuer aux plans de réponse incidents et à la coordination avec service/IT/qualité."
    ],
    studies: ["Master cybersecurite", "Ingénieur informatique", "Master systèmes d'information"],
    schools: ["Telecom Paris", "EPITA", "CentraleSupélec"],
    relatedIndustries: ["Diagnostic", "Medtech", "Health data", "Service operations", "Industrial IT"],
    sources: [...defaultRoleSources]
  },
  {
    slug: "medical-vet-pharmacovigilance-manager",
    title: "Pharmacovigilance Manager Santé Animale",
    salary: "60kEUR - 100kEUR",
    sector: "Medical Vet",
    category: "Sécurité / pharmacovigilance",
    shortageLevel: "Elevee",
    summary:
      "Pilote la pharmacovigilance vétérinaire (cas, signaux, compliance, prestataires) pour sécuriser le portefeuille et renforcer la crédibilité scientifique sur les marchés santé animale.",
    skills: ["Veterinary pharmacovigilance", "Signal management", "Compliance", "Vendor oversight", "Scientific communication"],
    successFactors: [
      "Tenir une discipline sécurité robuste avec des équipes souvent compactes.",
      "Rester proche du terrain et des vétérinaires tout en gardant une lecture compliance.",
      "Transformer les signaux en décisions utiles pour qualité et médical."
    ],
    path: ["PV specialist", "PV manager", "Head of pharmacovigilance veterinary"],
    missions: [
      "Structurer le process PV, les indicateurs et la gouvernance sécurité.",
      "Superviser prestataires et qualité des livrables, audits et plans d'amélioration.",
      "Travailler avec médical, qualité, réglementaire et réseaux vétérinaires."
    ],
    studies: ["Vétérinaire", "Pharmacie", "Master pharmacovigilance", "Master santé publique"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Medical Vet", "Animal health", "Vet pharma", "Vaccins veterinaires", "Drug safety"],
    sources: [
      {
        name: "Aon - Benchmarks de remuneration",
        url: AON_REWARDS_URL
      }
    ]
  },
  {
    slug: "medical-vet-country-manager-afrique-francophone",
    title: "Country Manager Afrique Francophone (Santé Animale)",
    salary: "70kEUR - 120kEUR + variable",
    sector: "Medical Vet",
    category: "Export / Afrique",
    shortageLevel: "Elevee",
    summary:
      "Développe la présence commerciale et partenaires en Afrique francophone sur des portefeuilles santé animale, en intégrant distribution, réglementation, pricing et exécution terrain.",
    skills: ["Export Africa", "Channel strategy", "Partner management", "Go-to-market", "Market intelligence"],
    successFactors: [
      "Être très opérationnel sur l'exécution distributeur et la disponibilité produit.",
      "Construire une relation institutionnelle et terrain crédible sur la durée.",
      "Adapter le modèle sans perdre la discipline commerciale."
    ],
    path: ["Export manager", "Regional sales manager", "Country manager Afrique francophone"],
    missions: [
      "Définir la stratégie pays/région, les priorités et les plans d'activation.",
      "Sélectionner, animer et faire progresser les distributeurs et partenaires.",
      "Assurer une coordination robuste avec supply, réglementaire, marketing et finance."
    ],
    studies: ["École de commerce", "Master commerce international", "Vétérinaire avec exposition business", "Sciences + business"],
    schools: ["EM Lyon", "ESSEC", "ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Audencia"],
    relatedIndustries: ["Animal health", "Export", "Distribution spécialisée", "Afrique francophone", "Medtech"],
    sources: [
      { name: "Business France", url: "https://www.businessfrance.fr/" },
      { name: "Bpifrance", url: "https://www.bpifrance.fr/" }
    ]
  },
  {
    slug: "veterinary-hospital-director",
    title: "Directeur d'Hôpital / Centre Vétérinaire Référé",
    salary: "65kEUR - 110kEUR + bonus",
    sector: "Veterinary",
    category: "Direction / operations",
    shortageLevel: "Elevee",
    summary:
      "Pilote un centre vétérinaire référé ou un hôpital, en sécurisant qualité de soins, organisation médicale, performance opérationnelle et attractivité des équipes dans un marché sous tension.",
    skills: ["Clinic leadership", "Operations", "Talent retention", "Quality of care", "Financial literacy"],
    successFactors: [
      "Relier excellence clinique et discipline opérationnelle sans dégrader l'expérience équipe.",
      "Stabiliser l'organisation sur des métiers pénuriques (vétérinaires, ASV, spécialistes).",
      "Créer une culture de qualité et de formation continue."
    ],
    path: ["Vétérinaire référé", "Responsable de service", "Directeur de centre vétérinaire"],
    missions: [
      "Structurer l'organisation médicale, la planification et la continuité de service.",
      "Piloter les indicateurs clés (activité, satisfaction, qualité, finances) et les plans d'amélioration.",
      "Recruter, fidéliser et faire progresser les équipes cliniques et support."
    ],
    studies: ["Vétérinaire", "Management en santé", "Formation leadership"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Centres référés", "Services vétérinaires", "Petcare"],
    sources: [
      { name: "Ordre national des vétérinaires", url: "https://www.veterinaire.fr/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "petfood-quality-food-safety-manager",
    title: "Quality & Food Safety Manager Petfood",
    salary: "55kEUR - 90kEUR",
    sector: "Petfood",
    category: "Qualité / food safety",
    shortageLevel: "Elevee",
    summary:
      "Structure et pilote la qualité et la sécurité des aliments sur des lignes petfood où la conformité, la traçabilité et la gestion des incidents impactent directement la marque.",
    skills: ["Food safety", "Quality systems", "HACCP mindset", "Supplier quality", "Incident management"],
    successFactors: [
      "Prévenir plutôt que subir : standards, audits et routines qui tiennent.",
      "Parler autant à l'usine qu'aux équipes marque et supply chain.",
      "Gérer les incidents avec sang-froid et discipline de communication."
    ],
    path: ["Quality engineer", "Quality manager", "Quality & food safety manager"],
    missions: [
      "Définir les standards qualité, audits et plans de contrôle sur la chaîne petfood.",
      "Piloter la conformité, les incidents et les actions correctives/préventives.",
      "Travailler avec achats, production, R&D et fournisseurs pour sécuriser les ingrédients."
    ],
    studies: ["Ingénieur agroalimentaire", "Qualité", "Master sécurité des aliments", "Ingénieur procédés"],
    schools: ["Institut Agro Montpellier", "AgroParisTech", "Sciences Agro Bordeaux", "ENSAIA"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Premium FMCG", "Food safety", "Supply chain"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "petfood-procurement-manager-ingredients",
    title: "Procurement Manager Ingrédients Petfood",
    salary: "55kEUR - 95kEUR",
    sector: "Petfood",
    category: "Achats / supply chain",
    shortageLevel: "Elevee",
    summary:
      "Sécurise les achats d'ingrédients critiques (qualité, disponibilité, coût) pour des industriels petfood confrontés à des marchés matières premières volatils et à des contraintes qualité fortes.",
    skills: ["Strategic sourcing", "Supplier negotiation", "Quality alignment", "Risk management", "Cost modeling"],
    successFactors: [
      "Arbitrer entre coût, qualité, disponibilité et risque sans décision court-termiste.",
      "Créer une relation fournisseur solide et audit-ready.",
      "Donner de la visibilité à la production et à la R&D sur les risques matières."
    ],
    path: ["Buyer", "Senior buyer", "Procurement manager ingredients"],
    missions: [
      "Piloter la stratégie achats sur les familles ingrédients et les fournisseurs critiques.",
      "Mettre en place des plans de sécurisation (multi-sourcing, stocks, contrats).",
      "Travailler avec qualité, R&D et production pour garantir conformité et continuité."
    ],
    studies: ["Ingénieur agroalimentaire", "École de commerce", "Master achats", "Supply chain"],
    schools: ["AgroParisTech", "Institut Agro Dijon", "Sciences Agro Bordeaux", "EM Lyon"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Procurement", "Agro-industrie", "Supply chain"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cosmetique-cosmetic-safety-assessor",
    title: "Cosmetic Safety Assessor / Toxicologue Cosmétique",
    seoTitle: "Cosmetic Safety Assessor : salaire 55-95 K€, missions | SKS",
    seoDescription:
      "Fiche metier Cosmetic Safety Assessor - Toxicologue Cosmetique : CPSR, DIP, evaluation securite produits, salaire 55-95 K€, formations. Benchmark 2026.",
    salary: "55kEUR - 95kEUR",
    sector: "Cosmetique",
    category: "Sécurité / réglementation",
    shortageLevel: "Elevee",
    summary:
      "Évalue la sécurité des produits cosmétiques, structure les dossiers, et sécurise la conformité des lancements sur des portefeuilles où la crédibilité scientifique est déterminante.",
    skills: ["Safety assessment", "Toxicology literacy", "Regulatory mindset", "Risk communication", "Documentation"],
    successFactors: [
      "Transformer une analyse scientifique en décision claire pour les équipes produit.",
      "Être rigoureux sur la documentation sans ralentir l'innovation.",
      "Anticiper les sujets ingrédients/claims avant le go-to-market."
    ],
    path: ["Regulatory specialist", "Safety assessor", "Head of safety / regulatory"],
    missions: [
      "Réaliser les évaluations sécurité et consolider les éléments nécessaires aux dossiers.",
      "Travailler avec formulation, R&D, qualité et marketing sur les choix ingrédients/claims.",
      "Sécuriser les revues internes et la traçabilité des décisions scientifiques."
    ],
    studies: ["Pharmacie", "Toxicologie", "Master chimie", "Master réglementation cosmétique"],
    schools: ["ISIPCA", "ICAP Montpellier", "Chimie ParisTech", "ESCOM Compiegne"],
    relatedIndustries: ["Cosmetique", "Dermocosmetique", "Ingredients actifs", "Regulatory", "Beauty tech"],
    sources: [
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cosmetique-packaging-development-engineer",
    title: "Packaging Development Engineer Cosmétique",
    seoTitle: "Packaging Development Engineer Cosmetique : 50-85 K€ | SKS",
    seoDescription:
      "Fiche metier Packaging Development Engineer Cosmetique : missions premium (materiaux, industrialisation), salaire 50-85 K€, formations. Benchmark 2026 SKS TALENTS.",
    salary: "50kEUR - 85kEUR",
    sector: "Cosmetique",
    category: "R&D / packaging",
    shortageLevel: "Moderee",
    summary:
      "Développe des packagings cosmétiques robustes, premium et industrialisables, en intégrant contraintes qualité, coût, supply chain et objectifs de durabilité.",
    skills: ["Packaging development", "Industrialization", "Supplier coordination", "Quality mindset", "Project management"],
    successFactors: [
      "Relier esthétique, usage et industrialisation sans compromis fragile.",
      "Créer une exécution fluide avec fournisseurs et usines.",
      "Anticiper les risques qualité et transport dès la conception."
    ],
    path: ["Packaging engineer", "Packaging development engineer", "Packaging lead"],
    missions: [
      "Piloter la conception packaging avec les équipes produit, R&D et marketing.",
      "Coordonner tests, validations, industrialisation et choix fournisseurs.",
      "Optimiser la fiabilité (qualité, transport, compatibilité) et les coûts."
    ],
    studies: ["Ingénieur matériaux", "Ingénieur packaging", "Chimie", "Design industriel"],
    schools: ["Chimie ParisTech", "ESCOM Compiegne", "ISIPCA"],
    relatedIndustries: ["Cosmetique", "Packaging premium", "Green chemistry", "Industrialization", "Premium FMCG"],
    sources: [
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cross-sector-talent-acquisition-lead-emea",
    title: "Talent Acquisition Lead EMEA (Life Sciences)",
    salary: "60kEUR - 105kEUR",
    sector: "Cross-sector",
    category: "HR / talent acquisition",
    shortageLevel: "Elevee",
    summary:
      "Construit une stratégie de recrutement multi-pays en EMEA (process, sourcing, marque employeur, stakeholders) sur des rôles pénuriques life sciences et fonctions support critiques.",
    skills: ["Talent acquisition", "Sourcing", "Stakeholder management", "Process design", "Employer branding"],
    successFactors: [
      "Savoir sourcer des niches sans sur-automatiser ni dégrader l'expérience candidat.",
      "Créer une discipline de recrutement scalable (KPIs, priorités, process).",
      "Parler le langage business (time-to-fill, impact) autant que RH."
    ],
    path: ["Recruiter", "Senior recruiter", "Talent acquisition lead EMEA"],
    missions: [
      "Définir les priorités de recrutement et les canaux de sourcing par pays et par rôle.",
      "Mettre en place des routines de pilotage (pipeline, délais, qualité, conversions).",
      "Accompagner les managers sur cadrage, messages, entretien et décision."
    ],
    studies: ["École de commerce", "Master RH", "Psychologie du travail", "Management"],
    schools: ["EM Lyon", "ESSEC", "Sciences Po", "Audencia"],
    relatedIndustries: ["Life Sciences", "Biotech", "Diagnostic", "Medtech", "HR"],
    sources: [
      { name: "Culture RH", url: "https://culture-rh.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "biotech-data-integrity-lead",
    title: "Data Integrity Lead (GxP) Biotech",
    salary: "70kEUR - 115kEUR + bonus",
    salarySource:
      "Repere indicatif pour un role Data Integrity / CSV senior en environnement GxP. Le niveau depend du scope (site vs multi-sites), des audits cibles et du niveau de transformation digitale (LIMS, MES, eBR).",
    sector: "Biotech",
    category: "Qualite / compliance digitale",
    shortageLevel: "Tres elevee",
    summary:
      "Structure et pilote la strategie data integrity (ALCOA+), la gouvernance des systemes critiques et la preparation audit sur des environnements biotech ou la confiance dans la donnee conditionne la libération.",
    skills: ["Data integrity (ALCOA+)", "CSV / qualification", "GxP documentation", "Risk-based approach", "Change control"],
    successFactors: [
      "Savoir prioriser les systemes et les risques plutot que multiplier les checklists.",
      "Rendre la compliance utilisable par le terrain (production, labo, IT).",
      "Transformer les findings audit en plan d'action pragmatique et mesurable."
    ],
    path: ["QA specialist", "CSV / validation lead", "Data integrity lead"],
    missions: [
      "Cartographier les systemes critiques (LIMS, MES, ERP, instruments) et les risques data integrity.",
      "Mettre en place des standards (governance, logs, audit trails, periodic reviews) et des rituels de suivi.",
      "Piloter les plans d'action (CAPA, changes, formation) jusqu'a stabilisation et preuve audit."
    ],
    studies: ["Pharmacie", "Ingenieur qualite / industriel", "Master systemes d'information", "Master data / compliance"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "ESBS Strasbourg"],
    relatedIndustries: ["Biotech", "Biopharma", "CDMO specialisees", "Digital manufacturing", "GxP"],
    sources: [
      ...defaultRoleSources,
      { name: "LEEM", url: "https://www.leem.org/" }
    ]
  },
  {
    slug: "biotech-quality-systems-manager",
    title: "Quality Systems Manager Biotech (GMP)",
    salary: "65kEUR - 105kEUR + bonus",
    salarySource:
      "Repere indicatif pour un Quality Systems Manager (SOP, change control, deviations, CAPA, audits). A calibrer selon maturite GMP, portefeuille produits et niveau multi-sites.",
    sector: "Biotech",
    category: "Assurance qualite",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote les systemes qualite (SOP, change control, deviations, CAPA, audits) afin de rendre l'execution GMP stable, auditable et compatible avec la vitesse d'industrialisation.",
    skills: ["Quality systems", "Change control", "Deviations / CAPA", "Audit readiness", "Process simplification"],
    successFactors: [
      "Eviter le piege du systeme qualite trop lourd qui ralentit le terrain.",
      "Construire des routines simples qui reduisent les ecarts et les reworks.",
      "Etre credible a la fois face aux operations et aux auditeurs."
    ],
    path: ["QA specialist", "QA systems lead", "Quality systems manager"],
    missions: [
      "Maintenir et faire evoluer les SOP, templates et standards qualite.",
      "Structurer change control, deviations et CAPA avec une logique risk-based.",
      "Preparer les audits et accompagner la resolution des findings jusqu'a cloture."
    ],
    studies: ["Ingenieur qualite", "Pharmacie", "Master sciences du vivant", "Master management qualite"],
    schools: ["Universite Paris-Saclay", "EBI Cergy", "AgroParisTech", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Biotech", "Biopharma", "Cell therapy", "CDMO specialisees", "GMP"],
    sources: [
      ...defaultRoleSources,
      { name: "LEEM", url: "https://www.leem.org/" }
    ]
  },
  {
    slug: "biotech-deviation-capa-manager",
    title: "Deviation & CAPA Manager Biotech",
    salary: "60kEUR - 95kEUR + bonus",
    salarySource:
      "Repere indicatif pour une fonction QA Operations orientee investigations et CAPA. Le niveau varie selon volumetrie deviations, criticite des lots et pression de planning.",
    sector: "Biotech",
    category: "QA operations",
    shortageLevel: "Tres elevee",
    summary:
      "Orchestre les investigations, deviations et CAPA afin de stabiliser les operations, reduire les recurrences et proteger la libération des lots en environnement biotech sous pression.",
    skills: ["Root cause analysis", "Deviations", "CAPA governance", "Data trending", "Facilitation terrain"],
    successFactors: [
      "Savoir tenir la rigueur d'investigation sans bloquer la production.",
      "Mettre fin aux recurrences (CAPA efficaces, pas juste des actions cosmetiques).",
      "Faire converger qualite, production, MSAT et maintenance sur des decisions rapides."
    ],
    path: ["QA officer", "QA operations lead", "Deviation & CAPA manager"],
    missions: [
      "Piloter le flux deviations / OOS / incidents et organiser les investigations.",
      "Animer les comites CAPA et assurer le suivi des actions jusqu'a verification d'efficacite.",
      "Mettre en place des analyses de tendance pour prioriser les vrais goulots d'execution."
    ],
    studies: ["Ingenieur bioprocedes", "Master qualite", "Pharmacie", "Master genie industriel"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Biopharma", "Cell therapy", "Quality operations", "GMP"],
    sources: [
      ...defaultRoleSources,
      { name: "LEEM", url: "https://www.leem.org/" }
    ]
  },
  {
    slug: "biotech-lab-automation-engineer",
    title: "Lab Automation Engineer Biotech",
    salary: "50kEUR - 82kEUR + bonus",
    salarySource:
      "Repere indicatif pour un profil automatisation labo (robotique, liquid handling, integration data). A ajuster selon criticite (GxP), parc instruments et complexite interop.",
    sector: "Biotech",
    category: "R&D / automation",
    shortageLevel: "Elevee",
    summary:
      "Automatise les workflows laboratoire (robotique, liquid handling, integration data) pour accelerer la production de preuve, fiabiliser les assays et rendre la donnee exploitable.",
    skills: ["Lab automation", "Integration data", "Scripting / APIs", "Experiment design literacy", "Documentation"],
    successFactors: [
      "Livrer des gains mesurables (throughput, qualite, reproductibilite) pas juste des demos.",
      "Relier terrain labo, data et qualite sans frictions organisationnelles.",
      "Documenter et maintenir les automations pour eviter la 'dette labo'."
    ],
    path: ["Ingénieur instrumentation", "Automation engineer", "Lab automation lead"],
    missions: [
      "Identifier les workflows prioritaires a automatiser et definir les criteres de succes.",
      "Integrer robots, instruments et LIMS / data pipelines quand applicable.",
      "Former les equipes et assurer la maintenance / evolution des scripts et standards."
    ],
    studies: ["Diplome d'ingenieur", "Master bioinformatique / data", "Master instrumentation", "Biotechnologies"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "Grenoble INP - Ensimag", "ESBS Strasbourg"],
    relatedIndustries: ["Biotech", "Digital health", "Bioinformatics", "Laboratoire", "Automation"],
    sources: [
      ...defaultRoleSources,
      { name: "France Biotech - Panorama 2026", url: FRANCE_BIOTECH_PANORAMA_2026_URL }
    ]
  },
  {
    slug: "biotech-gmp-training-manager",
    title: "GMP Training Manager Biotech",
    salary: "55kEUR - 90kEUR + bonus",
    salarySource:
      "Repere indicatif pour un role formation GMP / compliance (training matrix, onboarding, refresh). A calibrer selon effectifs operations, exposition audit et maturite du site.",
    sector: "Biotech",
    category: "Qualite / formation",
    shortageLevel: "Elevee",
    summary:
      "Structure la formation GMP (training matrix, onboarding, refresh) et rend la compliance praticable en production, QC et support, avec une logique de preuve audit.",
    skills: ["GMP training", "Training matrix", "Audit readiness", "Pedagogie", "Documentation"],
    successFactors: [
      "Faire de la formation un levier d'execution (moins d'ecarts), pas un simple passage obligatoire.",
      "Tenir la preuve (traçabilité) sans creer une usine a gaz.",
      "Adapter les messages au terrain, aux shifts et aux profils multi-metiers."
    ],
    path: ["QA specialist", "Training coordinator", "GMP training manager"],
    missions: [
      "Construire et maintenir la training matrix par role et par process critique.",
      "Mettre en place des modules pragmatiques (SOP, deviations, data integrity, aseptique).",
      "Assurer le suivi (completion, effectiveness checks) et la preparation audit."
    ],
    studies: ["Master qualite", "Pharmacie", "Ingenieur", "Master RH / formation (avec exposé industrie)"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "EBI Cergy"],
    relatedIndustries: ["Biotech", "Biopharma", "Industrialisation", "Quality", "GMP"],
    sources: [
      ...defaultRoleSources,
      { name: "LEEM", url: "https://www.leem.org/" }
    ]
  },
  {
    slug: "diagnostic-product-manager-ivd",
    title: "Product Manager IVD (Diagnostic & Medtech)",
    salary: "65kEUR - 105kEUR + variable",
    salarySource:
      "Repere indicatif pour un Product Manager IVD. A ajuster selon portefeuille, exposition IVDR, scope international et complexite (hardware + software + reagents).",
    sector: "Diagnostic",
    category: "Produit / go-to-market",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la roadmap produit IVD (besoins clients, evidence, pricing, documentation) et aligne R&D, regulatory, marketing et ventes pour accelerer l'adoption sans fragiliser la conformité.",
    skills: ["Product management", "Voice of customer", "Regulatory literacy (IVDR)", "Pricing", "Cross-functional leadership"],
    successFactors: [
      "Traduire des besoins labo en decisions roadmap claires et tenables.",
      "Savoir arbitrer entre time-to-market, evidence clinique et contraintes regulatory.",
      "Outiller les ventes et le support avec des messages simples et robustes."
    ],
    path: ["Application specialist", "Product manager", "Head of product"],
    missions: [
      "Recueillir les besoins terrain (labo, hopital, distributeurs) et formaliser les priorites produit.",
      "Coordonner launches, documentation, claims et supports de vente/formation.",
      "Suivre adoption, performance et retours incidents pour boucler la boucle produit."
    ],
    studies: ["Ingenieur biomedical", "Pharmacie", "Master biologie / diagnostic", "Master marketing (avec base technique)"],
    schools: ["Telecom Paris", "Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "EPITA"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Health data", "Laboratoires d'analyses"],
    sources: [
      { name: "SIDIV", url: "https://sidiv.fr/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "diagnostic-service-delivery-manager-emea",
    title: "Service Delivery Manager EMEA (Diagnostic & Medtech)",
    salary: "60kEUR - 100kEUR + variable",
    salarySource:
      "Repere indicatif pour une fonction Service Delivery / Operations EMEA (support, installation, SLA). A calibrer selon footprint, complexite parc instruments et niveau multi-pays.",
    sector: "Diagnostic",
    category: "Operations / service",
    shortageLevel: "Elevee",
    summary:
      "Garantit la performance de delivery service en EMEA (installation, support, SLA, escalade) sur des solutions diagnostic/medtech ou l'experience client conditionne le renouvellement et la reputation.",
    skills: ["Service delivery", "SLA management", "Escalation handling", "Operations metrics", "Stakeholder alignment"],
    successFactors: [
      "Mettre sous controle les irritants (delais, pieces, planning, formation) plutot que 'courir' apres les incidents.",
      "Aligner support, field service, IT et ventes sur une meme definition du succes client.",
      "Piloter par les donnees (SLA, backlog, NPS) sans perdre le terrain."
    ],
    path: ["Service coordinator", "Service operations manager", "Service delivery manager EMEA"],
    missions: [
      "Structurer le pilotage service (SLA, backlog, cadence d'escalade) sur les pays couverts.",
      "Coordonner les equipes terrain et partenaires (distributeurs) sur l'installation et le support.",
      "Contribuer a l'amelioration continue (process, pieces, formation) avec operations et produit."
    ],
    studies: ["Ingenieur", "Master management industriel", "Supply chain", "Master service management"],
    schools: ["CentraleSupelec", "Telecom Paris", "EM Lyon"],
    relatedIndustries: ["Diagnostic", "Medtech", "Service operations", "Customer experience", "IVD"],
    sources: [
      { name: "Mindray", url: "https://www.mindray.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "diagnostic-laboratory-informatics-manager",
    title: "Laboratory Informatics Manager (LIMS / Interop)",
    salary: "65kEUR - 110kEUR + bonus",
    salarySource:
      "Repere indicatif pour un manager LIMS / informatics en environnement labo. A ajuster selon criticite (GxP), perimetre (LIMS + middleware + data) et niveau multi-sites.",
    sector: "Diagnostic",
    category: "Digital / lab informatics",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote le SI laboratoire (LIMS, middleware, interfaces HL7/ASTM) afin d'assurer traçabilité, performance et securite des flux dans des environnements diagnostic/medtech fortement connectes.",
    skills: ["LIMS", "Interoperabilite", "HL7 / ASTM", "Cyber hygiene", "Process mapping"],
    successFactors: [
      "Eviter les integrations 'fragiles' et documenter pour rendre le systeme maintenable.",
      "Relier exigences metier (labo) et contraintes IT sans decrochage.",
      "Tenir ensemble performance, traçabilité et securite."
    ],
    path: ["LIMS analyst", "LIMS administrator", "Laboratory informatics manager"],
    missions: [
      "Gouverner le cycle de vie LIMS/middleware (changes, releases, incidents).",
      "Fiabiliser les interfaces et la qualite des donnees (mapping, logs, monitoring).",
      "Coordonner IT, labo et fournisseurs sur priorites, roadmap et securite."
    ],
    studies: ["Ingenieur informatique", "Master informatique sante", "Bioinformatique", "Master systemes d'information"],
    schools: ["Telecom Paris", "EPITA", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Diagnostic", "Health data", "Laboratoires d'analyses", "IVD", "Interoperabilite"],
    sources: [
      { name: "SIDIV", url: "https://sidiv.fr/" },
      { name: "Roche Diagnostics", url: "https://diagnostics.roche.com/" }
    ]
  },
  {
    slug: "diagnostic-udi-labeling-specialist-ivdr",
    title: "UDI & Labelling Specialist IVDR (IVD)",
    salary: "55kEUR - 90kEUR + bonus",
    salarySource:
      "Repere indicatif pour un specialiste UDI/labeling en medtech/IVD. A calibrer selon volume references, geographies et maturite IVDR.",
    sector: "Diagnostic",
    category: "Reglementaire / quality",
    shortageLevel: "Elevee",
    summary:
      "Securise UDI, etiquetage et claims en environnement IVDR, en lien avec regulatory, quality et operations, afin d'eviter des retards go-to-market et des non-conformites critiques.",
    skills: ["UDI / labeling", "IVDR literacy", "Document control", "Change management", "Cross-functional coordination"],
    successFactors: [
      "Tenir un systeme de documentation robuste et scalable.",
      "Eviter les changements tardifs qui cassent la supply chain et les kits.",
      "Etre capable d'expliquer les exigences aux equipes non-regulatory."
    ],
    path: ["Regulatory specialist", "Labeling specialist", "UDI & labeling lead"],
    missions: [
      "Piloter les exigences UDI et etiquetage (formats, langues, claims) pour les produits IVD.",
      "Coordonner les changes (packaging, IFU, fiches techniques) avec quality et supply.",
      "Mettre en place des controles et rituels pour reduire les erreurs et accelerer les releases."
    ],
    studies: ["Master affaires reglementaires", "Pharmacie", "Ingenieur biomedical", "Qualite"],
    schools: ["Faculte de pharmacie Strasbourg", "Universite Paris-Saclay", "Telecom Paris"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Regulatory", "Packaging"],
    sources: [
      { name: "SIDIV", url: "https://sidiv.fr/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "medical-vet-key-account-manager-emea-distributors",
    title: "Key Account Manager EMEA (Distributeurs) Santé Animale",
    salary: "60kEUR - 105kEUR + variable",
    salarySource:
      "Repere indicatif pour un KAM/channel manager oriente distributeurs en sante animale. A ajuster selon couverture EMEA, portefeuille produits et maturite channel.",
    sector: "Medical Vet",
    category: "Commercial / channel",
    shortageLevel: "Elevee",
    summary:
      "Pilote la performance des distributeurs (sell-in/sell-out, plans d'activation, formation) sur un perimetre EMEA en sante animale, avec un enjeu critique de cohérence d'execution multi-pays.",
    skills: ["Channel management", "KAM", "Distributor enablement", "Negotiation", "Forecast / demand"],
    successFactors: [
      "Savoir activer des partenaires sans perdre la maitrise du message ni des priorites.",
      "Aligner pricing, supply et activations pour eviter les ruptures et l'erosion de marge.",
      "Construire une discipline de pilotage (KPIs) sans micro-management."
    ],
    path: ["Sales representative", "Key account manager", "Channel / distributor lead"],
    missions: [
      "Construire les plans annuels distributeurs (objectifs, activations, conditions).",
      "Assurer la formation et l'alignement produit/medical selon les pays et gammes.",
      "Coordonner supply, marketing et service client pour tenir la promesse terrain."
    ],
    studies: ["Ecole de commerce", "Master sante animale", "Veterinaire avec orientation business", "Management"],
    schools: ["Audencia", "EM Lyon", "ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen"],
    relatedIndustries: ["Medical Vet", "Vet pharma", "Vaccins veterinaires", "Distribution", "EMEA"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "medical-vet-veterinary-services-strategy-manager",
    title: "Veterinary Services Strategy Manager (Groupes & Réseaux)",
    salary: "65kEUR - 115kEUR + bonus",
    salarySource:
      "Repere indicatif pour une fonction strategie/operations a l'interface cliniques, services et partenaires. A ajuster selon taille du reseau, multi-sites et exposition P&L.",
    sector: "Medical Vet",
    category: "Strategy / services",
    shortageLevel: "Elevee",
    summary:
      "Structure des offres de services (qualite clinique, parcours, telemedecine, formation) pour des réseaux vétérinaires ou partenaires sante animale, afin d'augmenter la performance sans degrader l'experience praticien.",
    skills: ["Operations strategy", "Service design", "Change management", "Clinical literacy", "Stakeholder alignment"],
    successFactors: [
      "Traduire des objectifs business en routines utiles pour les cliniques.",
      "Eviter la 'sur-organisation' qui detruit l'adhesion terrain.",
      "Construire une feuille de route priorisee et mesurable (impact, adoption)."
    ],
    path: ["Operations manager", "Clinic performance lead", "Veterinary services strategy manager"],
    missions: [
      "Identifier les leviers a fort impact (parcours client, qualite, scheduling, equipements).",
      "Mettre en place des standards et outils (playbooks, rituels, KPIs) avec les directeurs de sites.",
      "Coordonner partenaires (pet insurance, referes, telemedecine) pour enrichir l'offre."
    ],
    studies: ["Ecole veterinaire", "Ecole de commerce", "Master management sante", "MBA (option healthcare)"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "EM Lyon", "ESSEC"],
    relatedIndustries: ["Medical Vet", "Veterinary", "Groupes de cliniques", "Services veterinaires", "Telemedecine vet"],
    sources: [
      { name: "Ordre national des vétérinaires", url: "https://www.veterinaire.fr/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "veterinary-emergency-critical-care-veterinarian",
    title: "Vétérinaire Urgences & Soins Intensifs (ECC)",
    salary: "55kEUR - 110kEUR + gardes",
    salarySource:
      "Repere indicatif selon niveau (clinique generaliste vs centre refere) et intensite des gardes. La penurie se renforce avec la croissance des reseaux et l'exigence de continuité de service.",
    sector: "Veterinary",
    category: "Clinique specialisee",
    shortageLevel: "Tres elevee",
    summary:
      "Prend en charge les cas critiques (urgence, hospitalisation, stabilisation) et structure les protocoles ECC dans des centres veterinaires ou hopitaux ou la continuité de soins est un enjeu majeur.",
    skills: ["Triage & stabilization", "Critical care protocols", "Team coordination", "Client communication", "Stress management"],
    successFactors: [
      "Tenir la qualite clinique sous pression et standardiser les routines critiques.",
      "Travailler en equipe (ASV, autres specialites) avec une communication sans friction.",
      "Savoir expliquer vite et bien des decisions difficiles aux proprietaires."
    ],
    path: ["Vétérinaire praticien", "Urgentiste / ECC", "Responsable ECC / medical lead"],
    missions: [
      "Assurer le triage, la stabilisation et la prise en charge des urgences.",
      "Piloter l'hospitalisation et coordonner les examens / specialites selon priorites.",
      "Contribuer a la formation et a la standardisation des protocoles d'urgence."
    ],
    studies: ["Diplome veterinaire", "Residency / formation ECC", "Formations continues urgences / reanimation"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Services veterinaires de specialite", "Diagnostic vet", "Pet insurance"],
    sources: [
      { name: "Ordre national des vétérinaires", url: "https://www.veterinaire.fr/" }
    ]
  },
  {
    slug: "veterinary-anesthesia-veterinarian",
    title: "Vétérinaire Anesthésiste / Analgésie",
    salary: "55kEUR - 115kEUR + gardes",
    salarySource:
      "Repere indicatif selon niveau (centre refere), volume chirurgie et organisation des gardes. La rarete est forte sur les profils capables de standardiser les protocoles et de former les equipes.",
    sector: "Veterinary",
    category: "Clinique specialisee",
    shortageLevel: "Tres elevee",
    summary:
      "Securise l'anesthesie et l'analgesie sur des actes complexes, forme les equipes et met sous controle les risques peri-operatoires dans des centres veterinaires de reference.",
    skills: ["Anesthesia protocols", "Pain management", "Monitoring", "Team training", "Risk management"],
    successFactors: [
      "Standardiser sans rigidifier : protocoles clairs, adaptables et auditable en interne.",
      "Former et rassurer les equipes chirurgicales et ASV.",
      "Travailler au plus pres du terrain pour reduire les complications et la variabilite."
    ],
    path: ["Vétérinaire praticien", "Anesthesie / analgesie", "Responsable anesthesie"],
    missions: [
      "Evaluer le risque anesthesique et definir les protocoles par typologie de cas.",
      "Assurer le monitoring et la gestion douleur peri-operatoire.",
      "Former les equipes et mettre en place des rituels de retour d'experience."
    ],
    studies: ["Diplome veterinaire", "Formation specialisee anesthesie", "Formations continues anesthesie / douleur"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Groupes de cliniques", "Services veterinaires de specialite", "Diagnostic vet", "Telemedecine vet"],
    sources: [
      { name: "Ordre national des vétérinaires", url: "https://www.veterinaire.fr/" }
    ]
  },
  {
    slug: "veterinary-clinical-pathologist",
    title: "Vétérinaire Pathologiste Clinique (Lab)",
    salary: "55kEUR - 110kEUR",
    salarySource:
      "Repere indicatif selon niveau d'expertise (specialiste) et exposition (labo de reference vs reseau). La penurie est liee au besoin croissant d'interpretation et de qualite diagnostic.",
    sector: "Veterinary",
    category: "Diagnostic / laboratoire",
    shortageLevel: "Elevee",
    summary:
      "Interprete les resultats biologiques, structure les routines qualite et conseille les cliniciens pour accelerer les decisions medicales sur des parcours de soins de plus en plus outilles et data-driven.",
    skills: ["Clinical pathology", "Interpretation", "Quality mindset", "Communication cliniciens", "Data literacy"],
    successFactors: [
      "Transformer des resultats en decisions cliniques actionnables.",
      "Fiabiliser la qualite labo (pre-analytique, analytique, post-analytique) avec pragmatisme.",
      "Collaborer avec les cliniciens sans jargon inutile."
    ],
    path: ["Vétérinaire praticien", "Clinique / labo", "Pathologiste clinique / responsable plateau"],
    missions: [
      "Interpréter les examens (hematologie, biochimie, coagulation) et conseiller les cliniciens.",
      "Participer a la validation des methodes, controles qualite et investigations anomalies.",
      "Contribuer a la formation et a la standardisation des comptes rendus."
    ],
    studies: ["Diplome veterinaire", "Formation clinique / biologie", "Specialisation pathologie clinique (si applicable)"],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: ["Veterinary", "Diagnostic veterinaire", "Laboratoires d'analyses", "Telemedecine vet", "Services veterinaires de specialite"],
    sources: [
      { name: "Ordre national des vétérinaires", url: "https://www.veterinaire.fr/" }
    ]
  },
  {
    slug: "petfood-sensory-science-manager",
    title: "Sensory Science Manager Petfood",
    salary: "55kEUR - 95kEUR + bonus",
    salarySource:
      "Repere indicatif pour un role sensoriel/palatabilite senior. A ajuster selon portefeuille, ressources R&D et niveau d'internalisation des panels / tests.",
    sector: "Petfood",
    category: "R&D / sensory & palatability",
    shortageLevel: "Elevee",
    summary:
      "Pilote les tests sensoriels et la strategie palatabilite pour aligner formulation, qualité et performance produit sur un marche petfood premiumise ou l'experience animal/proprietaire est decisive.",
    skills: ["Sensory science", "Panel / testing design", "Data analysis", "Cross-functional R&D", "Product strategy"],
    successFactors: [
      "Relier les tests a des decisions formulation claires, pas juste des rapports.",
      "Standardiser les methodes pour comparer les lots et les innovations dans le temps.",
      "Travailler avec qualite et production pour stabiliser la variabilite."
    ],
    path: ["R&D scientist", "Sensory lead", "Sensory science manager"],
    missions: [
      "Definir les protocoles de tests (panels, home-use, preference) et la gouvernance des donnees.",
      "Collaborer avec formulation, qualite et production sur l'amelioration continue.",
      "Cadrer les objectifs palatabilite par segment (chiens/chats, premium, therapeutique)."
    ],
    studies: ["Ingenieur agroalimentaire", "Master sciences sensorielles", "Nutrition", "Statistiques appliquees"],
    schools: ["Institut Agro Montpellier", "AgroParisTech", "ENSAIA", "Sciences Agro Bordeaux"],
    relatedIndustries: ["Petfood", "Premium FMCG", "Nutrition animale", "R&D", "Food science"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "petfood-regulatory-compliance-lead",
    title: "Regulatory & Compliance Lead Petfood",
    salary: "55kEUR - 95kEUR",
    salarySource:
      "Repere indicatif pour un role compliance/regulatory petfood. A calibrer selon geographies, complexite matieres premieres et exigences claims / nutrition.",
    sector: "Petfood",
    category: "Compliance / qualite",
    shortageLevel: "Elevee",
    summary:
      "Securise la conformite des produits petfood (ingredients, etiquetage, claims, export) et structure la documentation utile pour accelerer lancements et audits sans fragiliser la supply chain.",
    skills: ["Regulatory literacy", "Labeling / claims", "Risk assessment", "Document control", "Cross-border mindset"],
    successFactors: [
      "Eviter les blocages tardifs (packaging, claims) en cadrant tres tot les risques.",
      "Rendre la compliance compatible avec la vitesse go-to-market.",
      "Travailler avec achats/qualite pour tenir les exigences sur les ingredients."
    ],
    path: ["Quality specialist", "Regulatory specialist", "Regulatory & compliance lead"],
    missions: [
      "Verifier ingredients, claims et etiquetage selon les marches cibles.",
      "Structurer les dossiers (specs, preuves, validations) et la gouvernance des changes.",
      "Accompagner export, supply et marketing sur les arbitrages conformite."
    ],
    studies: ["Ingenieur agroalimentaire", "Master qualite", "Master affaires reglementaires", "Nutrition"],
    schools: ["AgroParisTech", "Institut Agro Dijon", "Institut Agro Montpellier"],
    relatedIndustries: ["Petfood", "Food safety", "Regulatory", "Export", "Agro-industrie"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Business France", url: "https://www.businessfrance.fr/" }
    ]
  },
  {
    slug: "petfood-supply-chain-planner-senior",
    title: "Senior Supply Chain Planner Petfood",
    salary: "50kEUR - 85kEUR + bonus",
    salarySource:
      "Repere indicatif pour un planner senior. A ajuster selon volatilite ingredients, complexite multi-usines et exigences service client (OTIF).",
    sector: "Petfood",
    category: "Supply chain",
    shortageLevel: "Elevee",
    summary:
      "Pilote la planification (S&OP, capacites, stocks) sur des industriels petfood soumis a forte volatilite matieres, contraintes qualite et exigences de service, afin d'eviter ruptures et surstocks.",
    skills: ["S&OP", "Demand planning", "Inventory management", "Scenario planning", "Supplier coordination"],
    successFactors: [
      "Construire des scenarios clairs plutot que subir les urgences.",
      "Arbitrer entre service, cout et qualite avec des decisions explicites.",
      "Aligner achats, production et service client sur un plan unique."
    ],
    path: ["Supply chain analyst", "Planner", "Senior supply chain planner"],
    missions: [
      "Construire le plan de production et les parametres stocks par gamme et site.",
      "Animer les routines S&OP (demande, capacite, contraintes ingredients).",
      "Mettre sous controle les ruptures (plans d'action, alternatives, priorites clients)."
    ],
    studies: ["Supply chain", "Ingenieur industriel", "Ecole de commerce", "Master logistique"],
    schools: ["Institut Agro Dijon", "AgroParisTech", "EM Lyon"],
    relatedIndustries: ["Petfood", "Agro-industrie", "Supply chain", "Premium FMCG", "Procurement"],
    sources: [
      { name: "Mars", url: "https://www.mars.com/" },
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cosmetique-qa-compliance-manager",
    title: "QA Compliance Manager Cosmétique",
    seoTitle: "QA Compliance Manager Cosmetique : salaire 55-90 K€ | SKS",
    seoDescription:
      "Fiche metier QA Compliance Manager Cosmetique : deviations, CAPA, audits, change control, salaire 55-90 K€, formations. Benchmark 2026 SKS TALENTS.",
    salary: "55kEUR - 90kEUR",
    salarySource:
      "Repere indicatif pour un QA compliance manager (deviation/CAPA, audits, change). A calibrer selon sites, sous-traitance et exigences export.",
    sector: "Cosmetique",
    category: "Assurance qualite",
    shortageLevel: "Elevee",
    summary:
      "Securise la conformite qualite des operations cosmetiques (process, deviations, CAPA, audits, change control) afin d'accelerer les lancements sans fragiliser la robustesse industrielle.",
    skills: ["QA compliance", "Audit readiness", "CAPA", "Supplier quality", "Documentation"],
    successFactors: [
      "Faire vivre la qualite sur le terrain plutot que dans des fichiers.",
      "Savoir piloter des partenaires/CMO sans perdre la maitrise du standard.",
      "Tenir l'equilibre vitesse de lancement / robustesse qualite."
    ],
    path: ["QA specialist", "QA compliance lead", "QA compliance manager"],
    missions: [
      "Piloter les deviations, CAPA et changes pour maintenir la stabilite d'execution.",
      "Preparer et conduire audits internes/externes (sites, sous-traitants).",
      "Structurer la documentation qualite (SOP, templates, rituels) utile au terrain."
    ],
    studies: ["Master qualite", "Chimie", "Pharmacie", "Ingenieur"],
    schools: ["ISIPCA", "Chimie ParisTech", "ICAP Montpellier", "ESCOM Compiegne"],
    relatedIndustries: ["Cosmetique", "Dermocosmetique", "Packaging premium", "Green chemistry", "Premium FMCG"],
    sources: [
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cosmetique-qhse-manager",
    title: "Responsable QHSE Cosmétique (Production)",
    seoTitle: "Responsable Production Cosmetique / QHSE : 50-85 K€ | SKS",
    seoDescription:
      "Fiche metier Responsable Production Cosmetique (QHSE) : securite usine, standards terrain, salaire 50-85 K€, formations et parcours. Benchmark 2026 SKS TALENTS.",
    salary: "50kEUR - 85kEUR",
    salarySource:
      "Repere indicatif pour un responsable QHSE en environnement industriel. A ajuster selon taille usine, risques (chimie, solvants) et exposition audits / clients.",
    sector: "Cosmetique",
    category: "QHSE / production",
    shortageLevel: "Moderee",
    summary:
      "Pilote la securite, l'hygiene et l'environnement en usine cosmetique, structure les standards terrain et reduit les incidents tout en accompagnant la performance industrielle et la conformite.",
    skills: ["HSE management", "Risk analysis", "Industrial culture", "Training", "Continuous improvement"],
    successFactors: [
      "Etre present sur le terrain pour faire vivre les standards (pas seulement ecrire).",
      "Prioriser les risques concrets et mesurer les effets des actions.",
      "Travailler avec production et qualite sans opposition sterile."
    ],
    path: ["HSE specialist", "QHSE manager", "QHSE lead multi-sites"],
    missions: [
      "Evaluer les risques et deployer les plans d'action securite/environnement.",
      "Animer la formation et les routines terrain (audits, causeries, retours d'incidents).",
      "Contribuer a la conformité et a l'amelioration continue en production."
    ],
    studies: ["Ingenieur HSE", "Master QHSE", "Chimie / genie industriel", "Master environnement"],
    schools: ["Chimie ParisTech", "ESCOM Compiegne", "ISIPCA"],
    relatedIndustries: ["Cosmetique", "Industrialisation", "Green chemistry", "Packaging premium", "Premium FMCG"],
    sources: [
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL }
    ]
  },
  {
    slug: "cross-sector-chief-information-security-officer",
    title: "Chief Information Security Officer (CISO) Life Sciences",
    salary: "110kEUR - 180kEUR + bonus",
    salarySource:
      "Repere indicatif pour une fonction CISO/Head of Security. A calibrer selon taille, exposition internationale, contraintes (GxP, data sante) et niveau de transformation cloud/IoT.",
    sector: "Cross-sector",
    category: "Executive / cybersecurity",
    shortageLevel: "Tres elevee",
    summary:
      "Definit la strategie cyber (risk, IAM, resilience, gouvernance) et rend la securite compatible avec l'execution (labo, production, terrain) dans des organisations life sciences ou la confiance et la continuité sont critiques.",
    skills: ["Security strategy", "Risk governance", "IAM", "Incident response", "Stakeholder influence"],
    successFactors: [
      "Prioriser les risques majeurs plutot que multiplier les controles inutiles.",
      "Faire adopter la securite par les metiers sans casser la vitesse d'execution.",
      "Mettre sous controle les incidents via preparation, exercices et rituels."
    ],
    path: ["Security manager", "Head of security", "CISO"],
    missions: [
      "Construire et piloter la strategie cyber (policies, roadmap, budget, KPIs).",
      "Mettre sous controle les risques cloud, data, OT et fournisseurs (tiers).",
      "Orchestrer la reponse a incident et la gouvernance (comex, audits, compliance)."
    ],
    studies: ["Ingenieur informatique", "Master cybersecurite", "Master systemes d'information", "MBA (option leadership)"],
    schools: ["Telecom Paris", "EPITA", "CentraleSupelec", "ESSEC"],
    relatedIndustries: ["Life Sciences", "Biotech", "Diagnostic", "Medtech", "Cybersecurite"],
    sources: [
      { name: "Aon - Benchmarks de remuneration", url: AON_REWARDS_URL },
      { name: "Culture RH", url: "https://culture-rh.com/" }
    ]
  }
];

const nuclearMedicineRoles: JobRole[] = [
  {
    slug: "diagnostic-nuclear-medicine-business-unit-director",
    title: "Business Unit Director Médecine Nucléaire",
    seoTitle: "Business Unit Director Medecine Nucleaire : 110-165 K€ | SKS TALENTS",
    seoDescription:
      "Fiche metier Business Unit Director Medecine Nucleaire : radiopharmacie, TEP, PMSI, salaire 110-165 K€ + variable. Benchmark medecine nucleaire 2026 SKS TALENTS.",
    publishDate: may2026EditorialBatchDate,
    salary: "110kEUR - 165kEUR + variable",
    sector: "Diagnostic",
    category: "Direction générale / BU",
    shortageLevel: "Elevee",
    summary:
      "Pilote une business unit en médecine nucléaire, en reliant stratégie de croissance, exécution commerciale, accès hôpital et coordination industrielle.",
    skills: ["P&L", "Go-to-market hôpital", "Leadership cross-functional", "Healthtech strategy", "Key account leadership"],
    successFactors: [
      "Savoir relier enjeux cliniques, industriels et commerciaux dans une seule feuille de route.",
      "Arbitrer vite entre croissance, accès marché et faisabilité opérationnelle.",
      "Porter une narration crédible face aux hôpitaux, investisseurs et partenaires."
    ],
    path: ["Directeur commercial", "General manager", "Business unit director"],
    missions: [
      "Définir la stratégie de croissance de l'activité médecine nucléaire sur le territoire.",
      "Aligner ventes, market access, opérations, qualité et affaires médicales.",
      "Piloter les comptes stratégiques, les partenaires clés et les indicateurs de performance."
    ],
    studies: ["École de commerce", "Ingénieur + business", "Pharmacien ou scientifique avec forte exposition marché"],
    schools: ["HEC Paris", "ESSEC", "CentraleSupélec", "Université Paris-Saclay", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: ["Médecine nucléaire", "Diagnostic", "Oncologie", "Radiopharmacie", "RIV"],
    sources: [
      {
        name: "France Biotech - État des lieux de la médecine nucléaire",
        url: "https://france-biotech.fr/wp-content/uploads/2025/06/France-Biotech-CP-Etat-des-Lieux-med-nucleaire-VDEF-1.pdf"
      },
      {
        name: "Aon",
        url: "https://www.aon.com/"
      }
    ]
  },
  {
    slug: "diagnostic-radiopharmacy-operations-director",
    title: "Directeur des Opérations Radiopharmacie",
    salary: "95kEUR - 145kEUR",
    sector: "Diagnostic",
    category: "Operations / industrialisation",
    shortageLevel: "Elevee",
    summary:
      "Structure les opérations radiopharmaceutiques, la qualité et la continuité d'exécution sur des environnements où le temps, la sûreté et la conformité sont critiques.",
    skills: ["GMP", "Operations leadership", "Quality systems", "Supply chain critique", "Industrial execution"],
    successFactors: [
      "Tenir une discipline qualité sans ralentir l'exécution.",
      "Maîtriser des environnements où la fenêtre de production et de livraison est très contrainte.",
      "Créer des routines d'exploitation robustes et auditable."
    ],
    path: ["Production manager", "Site operations leader", "Operations director"],
    missions: [
      "Piloter les opérations quotidiennes, la qualité et la coordination des flux radiopharmaceutiques.",
      "Sécuriser la conformité, la disponibilité des capacités et la fiabilité des processus.",
      "Structurer les équipes opérations, qualité, maintenance et supply."
    ],
    studies: ["Ingénieur procédés", "Pharmacien industriel", "Master qualité / production"],
    schools: ["Mines Paris", "Chimie ParisTech", "Université Paris-Saclay", "Faculté de pharmacie Strasbourg"],
    relatedIndustries: ["Radiopharmacie", "Médecine nucléaire", "Bioproduction", "Diagnostic", "Oncologie"],
    sources: [
      {
        name: "Orano - Médecine nucléaire",
        url: "https://www.orano.group/fr/"
      },
      {
        name: "Aon",
        url: "https://www.aon.com/"
      }
    ]
  },
  {
    slug: "diagnostic-market-access-director-riv",
    title: "Directeur Market Access & Affaires Publiques RIV",
    salary: "90kEUR - 150kEUR + variable",
    sector: "Diagnostic",
    category: "Market access / affaires publiques",
    shortageLevel: "Elevee",
    summary:
      "Porte les sujets de valorisation, accès au marché et structuration institutionnelle dans la radiothérapie interne vectorisée et la médecine nucléaire.",
    skills: ["Market access", "Public affairs", "Health economics", "Stakeholder engagement", "Hospital ecosystem"],
    successFactors: [
      "Parler à la fois le langage clinique, institutionnel et économique.",
      "Comprendre les blocages d'accès marché avant qu'ils n'allongent les cycles.",
      "Transformer la complexité réglementaire en feuille de route lisible."
    ],
    path: ["Public affairs manager", "Market access lead", "Market access director"],
    missions: [
      "Construire la stratégie d'accès au marché et d'influence institutionnelle.",
      "Coordonner dossiers de valorisation, parcours de soin et messages publics.",
      "Travailler avec sociétés savantes, associations, autorités et directions internes."
    ],
    studies: ["Pharmacien", "École de commerce", "Master santé publique / économie de la santé"],
    schools: ["Sciences Po", "Université Paris-Saclay", "ESSEC", "Faculté de pharmacie Montpellier", "Harvard Business School", "Yale SOM"],
    relatedIndustries: ["RIV", "Médecine nucléaire", "Oncologie", "Diagnostic", "Health policy"],
    sources: [
      {
        name: "France Biotech - Task force dédiée à l'innovation en médecine nucléaire",
        url: "https://france-biotech.fr/communiques-de-presse/france-biotech-annonce-le-lancement-dune-nouvelle-task-force-dediee-a-linnovation-en-medecine-nucleaire-radiotherapie-interne-vectorisee/"
      },
      {
        name: "Aon",
        url: "https://www.aon.com/"
      }
    ]
  },
  {
    slug: "diagnostic-nuclear-medicine-key-account-director",
    title: "Key Account Director Médecine Nucléaire Hôpital",
    salary: "85kEUR - 140kEUR + variable",
    sector: "Diagnostic",
    category: "Sales / comptes stratégiques",
    shortageLevel: "Elevee",
    summary:
      "Développe les comptes hospitaliers et centres experts en médecine nucléaire, avec une forte dimension clinique, parcours patient et structuration de l'adoption.",
    skills: ["Key account management", "Hospital sales", "Complex selling", "Clinical stakeholder mapping", "Tender strategy"],
    successFactors: [
      "Savoir vendre sans simplifier à l'excès un sujet hautement technique.",
      "Comprendre les décideurs médicaux, pharmaceutiques et administratifs.",
      "Faire progresser les comptes sur le long terme plutôt que chercher un coup court."
    ],
    path: ["KAM hôpital", "National account manager", "Key account director"],
    missions: [
      "Cartographier et développer les centres hospitaliers et les comptes universitaires stratégiques.",
      "Coordonner offres, appels d'offres, adoption clinique et relations long terme.",
      "Faire remonter les besoins terrain vers marketing, médical, service et direction."
    ],
    studies: ["École de commerce", "Pharmacien avec exposition commerciale", "Scientifique + business"],
    schools: ["ESSEC", "EM Lyon", "Université Paris-Saclay", "Faculté de pharmacie Strasbourg"],
    relatedIndustries: ["Médecine nucléaire", "Diagnostic", "Oncologie", "RIV", "Hôpital"],
    sources: [
      {
        name: "Centre Oscar Lambret - La médecine nucléaire",
        url: "https://www.centreoscarlambret.fr/medecine-nucleaire/"
      },
      {
        name: "Aon",
        url: "https://www.aon.com/"
      }
    ]
  },
  {
    slug: "diagnostic-cyclotron-and-pet-operations-manager",
    title: "Cyclotron & PET Operations Manager",
    salary: "70kEUR - 110kEUR",
    sector: "Diagnostic",
    category: "Operations / site",
    shortageLevel: "Elevee",
    summary:
      "Supervise les opérations d'un environnement cyclotron et PET scan, en sécurisant disponibilité, maintenance, sûreté et coordination des équipes techniques.",
    skills: ["Site operations", "Equipment management", "Maintenance planning", "Safety culture", "Technical coordination"],
    successFactors: [
      "Faire cohabiter fiabilité technique, exigences de sûreté et pression service.",
      "Garder une lecture très opérationnelle des risques de disponibilité.",
      "Créer une exécution simple dans un environnement intrinsèquement complexe."
    ],
    path: ["Field service manager", "Technical operations manager", "Site operations manager"],
    missions: [
      "Piloter les opérations du site, la maintenance et la disponibilité des équipements critiques.",
      "Coordonner équipes techniques, partenaires, qualité et exploitation clinique.",
      "Suivre les indicateurs de sûreté, de performance et de continuité d'activité."
    ],
    studies: ["Ingénieur biomédical", "Ingénieur instrumentation", "Master physique appliquée"],
    schools: ["Télécom Paris", "CentraleSupélec", "Université Paris-Saclay", "Grenoble INP"],
    relatedIndustries: ["Médecine nucléaire", "PET scan", "Cyclotron", "Diagnostic", "Maintenance critique"],
    sources: [
      {
        name: "Dominique Ouattara - Centre Européen de Médecine Nucléaire annoncé à Abidjan",
        url: "https://dominiqueouattara.ci/"
      },
      {
        name: "Aon",
        url: "https://www.aon.com/"
      }
    ]
  }
];

const may2026RoleBatch: JobRole[] = [
  {
    slug: "biotech-data-integrity-lead",
    title: "Data Integrity Lead (GxP) Biotech",
    salary: "70kEUR - 110kEUR",
    sector: "Biotech",
    category: "Validation / data integrity",
    shortageLevel: "Tres elevee",
    summary:
      "Assure l'intégrité et la traçabilité des données (ALCOA+) sur des environnements GxP, en reliant qualité, IT et opérations pour rendre les preuves auditables et exploitables.",
    skills: ["Data integrity (ALCOA+)", "GxP / Annex 11", "Risk assessment", "Change control", "Stakeholder management"],
    successFactors: [
      "Traduire les exigences qualité en décisions opérationnelles simples et tenables.",
      "Prioriser les risques réels (données critiques) plutôt que multiplier la paperasse.",
      "Créer une coopération efficace entre QA, IT, labo et production."
    ],
    path: ["QA specialist", "CSV / validation engineer", "Data integrity lead"],
    missions: [
      "Définir le cadre data integrity (périmètre, criticité, contrôles, gouvernance) sur les systèmes GxP.",
      "Piloter analyses de risques, plans de remédiation, et preuves associées (audit trail, accès, sauvegardes, revue).",
      "Structurer la collaboration avec QA/CSV, IT, métiers et fournisseurs pour tenir l'exécution."
    ],
    studies: ["Ingénieur", "Master qualité / pharma", "Master systèmes d'information"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Bioproduction", "LIMS / ELN", "GxP", "Digital manufacturing"]
  },
  {
    slug: "biotech-lims-product-owner",
    title: "LIMS Product Owner Biotech",
    salary: "60kEUR - 95kEUR",
    sector: "Biotech",
    category: "Applications / systèmes laboratoire",
    shortageLevel: "Tres elevee",
    summary:
      "Cadre et priorise un LIMS pour que le laboratoire délivre plus vite des résultats traçables, sans dégrader la conformité ni l'adoption terrain.",
    skills: ["LIMS", "Product ownership", "GxP / data integrity", "Workflow design", "Change management"],
    successFactors: [
      "Transformer les irritants terrain en backlog actionnable (et limité).",
      "Faire tenir ensemble conformité, ergonomie et performance opérationnelle.",
      "Sécuriser l'adoption : formation, support, gouvernance et arbitrages clairs."
    ],
    path: ["LIMS administrator", "Business analyst", "LIMS product owner"],
    missions: [
      "Collecter les besoins, cartographier les workflows et définir une vision produit LIMS orientée exécution.",
      "Prioriser et piloter la delivery (paramétrage, interfaces, validation) avec IT, QA/CSV et les équipes labo.",
      "Mettre en place la gouvernance : règles de données, rôles, évolutions et amélioration continue."
    ],
    studies: ["Ingénieur", "Master bioinformatique / data", "Master systèmes d'information"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Laboratoires", "LIMS / ELN", "Data governance", "Diagnostic"]
  },
  {
    slug: "biotech-csv-validation-lead",
    title: "CSV / Computer System Validation Lead Biotech",
    salary: "65kEUR - 105kEUR",
    sector: "Biotech",
    category: "Validation / data integrity",
    shortageLevel: "Tres elevee",
    summary:
      "Sécurise la validation des systèmes informatisés (CSV) pour accélérer l'exécution biotech sans fragiliser la conformité ni la preuve audit.",
    skills: ["CSV", "Validation lifecycle", "GAMP mindset", "Risk-based approach", "Supplier management"],
    successFactors: [
      "Adapter l'effort de validation au risque et au cycle de vie du système.",
      "Produire des preuves simples, cohérentes et réellement auditables.",
      "Limiter la dette documentaire en gardant un cadre standard."
    ],
    path: ["Validation engineer", "CSV specialist", "CSV lead"],
    missions: [
      "Définir une approche validation basée sur le risque (URS, tests, traçabilité) sur les systèmes GxP.",
      "Piloter la relation fournisseurs : qualification, releases, changements, et documentation.",
      "Outiller l'organisation (templates, standards, formation) pour accélérer les projets digitaux."
    ],
    studies: ["Ingénieur", "Master qualité", "Master systèmes d'information"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "GxP", "LIMS / ELN", "MES", "Automation"]
  },
  {
    slug: "biotech-upstream-process-development-scientist",
    title: "Upstream Process Development Scientist Biotech",
    salary: "55kEUR - 90kEUR",
    sector: "Biotech",
    category: "R&D / process development",
    shortageLevel: "Elevee",
    summary:
      "Développe et optimise les étapes upstream (culture cellulaire, fermentation, fed-batch) pour rendre le procédé robuste, reproductible et transférable vers la production.",
    skills: ["Upstream development", "DoE / optimisation", "Scale-down models", "Data analysis", "Tech transfer"],
    successFactors: [
      "Rendre un procédé robuste : tolérances, contrôles, et compréhension des variabilités.",
      "Documenter pour transférer : ce qui n'est pas transmissible ne scale pas.",
      "Travailler main dans la main avec analytique, MSAT et production."
    ],
    path: ["Process development scientist", "Senior scientist", "Upstream lead / MSAT"],
    missions: [
      "Concevoir des expériences et optimiser les paramètres critiques du procédé upstream.",
      "Collaborer avec analytique pour définir les contrôles et l'interprétation des données.",
      "Préparer le transfert et l'industrialisation : documentation, comparabilité, handover."
    ],
    studies: ["Master bioprocédés", "Ingénieur biotech", "Doctorat sciences de la vie"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Bioproduction", "Cell therapy", "CDMO", "Industrialisation"]
  },
  {
    slug: "biotech-downstream-process-development-scientist",
    title: "Downstream Process Development Scientist Biotech",
    salary: "55kEUR - 90kEUR",
    sector: "Biotech",
    category: "R&D / process development",
    shortageLevel: "Elevee",
    summary:
      "Conçoit et optimise les étapes downstream (purification, filtration, formulation) pour sécuriser qualité, rendement et transférabilité industrielle.",
    skills: ["Downstream development", "Chromatography", "Filtration / UFDF", "Process robustness", "Documentation"],
    successFactors: [
      "Relier rendement et qualité : ce qui augmente le rendement peut aussi augmenter le risque qualité.",
      "Construire des designs expérimentaux lisibles et exploitables par la production.",
      "Anticiper l'industrialisation (équipements, consommables, contraintes GMP) dès le développement."
    ],
    path: ["Process development scientist", "Senior scientist", "Downstream lead / MSAT"],
    missions: [
      "Développer la stratégie purification/formulation et optimiser les paramètres critiques.",
      "Travailler avec analytique et qualité pour sécuriser la comparabilité et les spécifications.",
      "Préparer le transfert : batch records, paramètres critiques, troubleshooting et formation."
    ],
    studies: ["Master bioprocédés", "Ingénieur biotech", "Doctorat sciences de la vie"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Bioproduction", "CDMO", "Purification", "Industrialisation"]
  },
  {
    slug: "biotech-qc-microbiology-lead",
    title: "QC Microbiology Lead Biotech",
    salary: "55kEUR - 90kEUR",
    sector: "Biotech",
    category: "Qualité / stérilité",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote le contrôle microbiologique (matières, environnement, utilités, stérilité) pour sécuriser les lots et éviter les dérives qui bloquent la production ou la libération.",
    skills: ["QC microbiology", "Environmental monitoring", "Sterility testing", "Deviation / CAPA", "GMP mindset"],
    successFactors: [
      "Rendre les routines microbiologie robustes sans ralentir inutilement l'usine.",
      "Savoir analyser les dérives et décider vite (impact, enquête, actions).",
      "Aligner production, QA et QC sur une lecture pragmatique du risque."
    ],
    path: ["QC microbiology specialist", "QC microbiology lead", "QC manager / head of QC"],
    missions: [
      "Piloter les plans de contrôle microbiologie, tendances et investigations en cas de dérive.",
      "Coordonner les actions CAPA avec QA, production, utilités et maintenance.",
      "Assurer la conformité GMP et la préparation aux audits sur le périmètre microbio."
    ],
    studies: ["Master microbiologie", "Ingénieur biotech", "Master qualité"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Sterility assurance", "Environmental monitoring", "GMP manufacturing", "CDMO"]
  },
  {
    slug: "biotech-sterility-assurance-specialist",
    title: "Sterility Assurance Specialist Biotech",
    salary: "60kEUR - 95kEUR",
    sector: "Biotech",
    category: "Qualité / stérilité",
    shortageLevel: "Tres elevee",
    summary:
      "Sécurise la stratégie stérilité (procédés aseptiques, contamination control, validation) sur des environnements où la moindre dérive peut bloquer libération, audits ou supply.",
    skills: ["Sterility assurance", "Contamination control strategy", "Aseptic processing", "Validation", "Quality leadership"],
    successFactors: [
      "Garder une vision système : procédés, utilités, flux, comportements, documentation.",
      "Aider l'usine à exécuter : standards clairs, pratiques terrain, formation.",
      "Être à l'aise dans l'audit : preuves, traçabilité, décisions et limites."
    ],
    path: ["QA specialist", "Sterility assurance specialist", "Sterility assurance lead"],
    missions: [
      "Définir et maintenir la stratégie stérilité et contamination control (risques, exigences, standards).",
      "Piloter/assurer la validation des procédés et l'analyse d'impact en cas de déviation.",
      "Former et accompagner les équipes production/QC/QA pour tenir le niveau attendu."
    ],
    studies: ["Ingénieur biotech", "Master qualité pharma", "Master microbiologie"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Aseptic manufacturing", "Cell therapy", "Sterility assurance", "GMP"]
  },
  {
    slug: "biotech-single-use-technology-engineer",
    title: "Single-Use Technology Engineer Biotech",
    salary: "58kEUR - 92kEUR",
    sector: "Biotech",
    category: "Operations / industrialisation",
    shortageLevel: "Elevee",
    summary:
      "Pilote la stratégie single-use (consommables, intégration, compatibilité, supply) pour sécuriser disponibilité, qualité et performance sur des procédés bioproduction.",
    skills: ["Single-use systems", "Supplier management", "Process integration", "Risk management", "Troubleshooting"],
    successFactors: [
      "Sécuriser la supply chain consommables sans surcharger l'usine.",
      "Anticiper compatibilité, extractables/leachables et contraintes qualité.",
      "Traduire un incident terrain en action corrective pragmatique et documentée."
    ],
    path: ["Process engineer", "MSAT engineer", "Single-use technology engineer"],
    missions: [
      "Qualifier et standardiser les consommables single-use (poches, filtres, connecteurs) selon le procédé.",
      "Travailler avec achats, qualité et production pour sécuriser fournisseurs, stocks et changements.",
      "Résoudre les incidents : investigations, mitigation, documentation et prévention."
    ],
    studies: ["Ingénieur biotech", "Master bioprocédés", "Ingénieur procédés"],
    schools: ["Universite Paris-Saclay", "ESBS Strasbourg", "EBI Cergy", "AgroParisTech", "Institut Pasteur"],
    relatedIndustries: ["Biotech", "Bioproduction", "Single-use", "CDMO", "Supply chain critique"]
  },
  {
    slug: "biotech-ot-cybersecurity-engineer",
    title: "OT Cybersecurity Engineer Biotech Manufacturing",
    salary: "70kEUR - 115kEUR",
    sector: "Biotech",
    category: "Cybersecurite / OT",
    shortageLevel: "Tres elevee",
    summary:
      "Sécurise les environnements industriels (OT) d'une bioproduction : automatisme, réseaux, équipements et accès, sans casser la disponibilité ni la validation GxP.",
    skills: ["OT security", "Network segmentation", "IAM / access control", "Incident response", "GxP constraints"],
    successFactors: [
      "Comprendre la réalité usine : disponibilité > théorie, sans renoncer aux contrôles essentiels.",
      "Travailler avec automation, IT, QA/CSV et maintenance pour intégrer la sécurité au cycle de vie.",
      "Prioriser les risques : accès, segmentation, sauvegardes, et procédures d'intervention."
    ],
    path: ["Security engineer", "OT security engineer", "OT cybersecurity lead"],
    missions: [
      "Évaluer les risques OT (réseaux, automates, équipements) et définir les mesures prioritaires.",
      "Mettre en place segmentation, durcissement, supervision et procédures d'accès adaptées.",
      "Contribuer aux audits et à la gestion des changements sur les systèmes industriels."
    ],
    studies: ["Ingénieur informatique", "Master cybersecurite", "Ingénieur automatisme avec spécialisation"],
    schools: ["Universite Paris-Saclay", "Telecom Paris", "EPITA", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Biotech", "GMP manufacturing", "Automation", "OT security", "Digital operations"]
  },
  {
    slug: "diagnostic-ivd-software-engineer",
    title: "IVD Software Engineer (IEC 62304) Diagnostic",
    salary: "55kEUR - 95kEUR",
    sector: "Diagnostic",
    category: "Digital / operations",
    shortageLevel: "Elevee",
    summary:
      "Développe le logiciel d'un dispositif IVD (embedded ou applicatif) en tenant ensemble performance, fiabilité, traçabilité et contraintes réglementaires.",
    skills: ["Software engineering", "Requirements management", "Risk management", "Testing discipline", "Design documentation"],
    successFactors: [
      "Concevoir pour l'audit : exigences, traçabilité, tests et release management.",
      "Garder une lecture produit : ce qui compte pour l'utilisateur, pas seulement le code.",
      "Travailler avec qualité/réglementaire sans ralentir inutilement la delivery."
    ],
    path: ["Software engineer", "Senior software engineer", "Technical lead / architect"],
    missions: [
      "Développer et maintenir les composants logiciels d'un produit IVD (performance, stabilité, sécurité).",
      "Collaborer avec produit, qualité et clinique pour aligner exigences, risques et tests.",
      "Documenter et industrialiser : CI, gestion versions, et support post-release."
    ],
    studies: ["Ingénieur logiciel", "Master informatique", "Ingénieur biomédical + software"],
    schools: ["Universite Paris-Saclay", "Grenoble INP - Ensimag", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Digital health", "Software regulated"]
  },
  {
    slug: "diagnostic-software-quality-engineer",
    title: "Software Quality Engineer IVD (IEC 62304) Diagnostic",
    salary: "60kEUR - 100kEUR",
    sector: "Diagnostic",
    category: "Qualite",
    shortageLevel: "Tres elevee",
    summary:
      "Structure la qualité logicielle IVD : exigences, traçabilité, tests, validation et gestion des changements, pour rendre les releases auditables et fiables.",
    skills: ["Software quality", "Traceability", "Test strategy", "Risk management", "Quality systems"],
    successFactors: [
      "Créer des standards utilisables (pas des checklists théoriques).",
      "Faire tenir ensemble vitesse de delivery et discipline qualité.",
      "Détecter tôt les risques : exigences floues, tests incomplets, dette de traçabilité."
    ],
    path: ["QA engineer", "Software quality engineer", "Quality lead / head of quality"],
    missions: [
      "Mettre en place la stratégie de qualité logicielle : exigences, tests, traçabilité et critères de release.",
      "Piloter la validation logicielle et la gestion des changements avec R&D/produit et regulatory.",
      "Préparer et soutenir les audits : preuves, dossiers, et cohérence des décisions."
    ],
    studies: ["Ingénieur", "Master qualité", "Master informatique"],
    schools: ["Universite Paris-Saclay", "Grenoble INP - Ensimag", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Medtech", "Quality systems", "Regulated software"]
  },
  {
    slug: "diagnostic-biostatistician",
    title: "Biostatistician Diagnostics",
    salary: "55kEUR - 95kEUR",
    sector: "Diagnostic",
    category: "Data / clinique",
    shortageLevel: "Elevee",
    summary:
      "Conçoit et analyse les plans d'étude et les données de performance pour soutenir les claims, la robustesse et la crédibilité clinique d'un diagnostic.",
    skills: ["Biostatistics", "Study design", "Data interpretation", "Method validation", "Scientific communication"],
    successFactors: [
      "Rendre les résultats lisibles et décisionnels, pas seulement 'statistiquement corrects'.",
      "Travailler avec R&D, clinique et regulatory pour cadrer ce qui doit être prouvé.",
      "Anticiper les biais et les limites avant qu'ils deviennent un risque de dossier."
    ],
    path: ["Statistician", "Biostatistician", "Biostatistics lead"],
    missions: [
      "Construire les plans d'analyse et contribuer au design des études de performance.",
      "Analyser les données (sensibilité/spécificité, robustesse, comparabilité) et formaliser les conclusions.",
      "Supporter la rédaction et la revue des livrables scientifiques/réglementaires liés aux performances."
    ],
    studies: ["Master biostatistiques", "Master data science santé", "Ingénieur statistique"],
    schools: ["Universite Paris-Saclay", "Grenoble INP - Ensimag", "Telecom Paris", "EPITA", "Faculte de pharmacie Strasbourg"],
    relatedIndustries: ["Diagnostic", "IVD", "Clinical evidence", "Medical imaging", "Health data"]
  },
  {
    slug: "diagnostic-field-application-scientist-ngs",
    title: "Field Application Scientist NGS Diagnostic",
    salary: "50kEUR - 85kEUR + variable",
    sector: "Diagnostic",
    category: "Applications / support terrain",
    shortageLevel: "Tres elevee",
    summary:
      "Fait le pont entre le produit NGS et l'usage terrain : formation, support, troubleshooting et remontée structurée pour accélérer adoption et satisfaction.",
    skills: ["NGS literacy", "Training & onboarding", "Troubleshooting", "Customer communication", "Technical writing"],
    successFactors: [
      "Rendre les utilisateurs autonomes : formation, routines, support et documentation.",
      "Transformer les irritants terrain en feedback exploitable par produit/R&D.",
      "Garder une posture de confiance, même quand le terrain est sous pression."
    ],
    path: ["Application specialist", "Field application scientist", "Field application manager"],
    missions: [
      "Former et accompagner les laboratoires sur les workflows NGS (prépa, run, analyse, interprétation).",
      "Assurer le support de niveau avancé : diagnostic incidents, escalade et résolution.",
      "Structurer les retours terrain et contribuer à l'amélioration continue (docs, process, produit)."
    ],
    studies: ["Master biologie moléculaire", "Ingénieur biotech", "Master bioinformatique"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Telecom Paris", "Grenoble INP - Ensimag"],
    relatedIndustries: ["Diagnostic", "NGS", "Laboratoires d'analyses", "Bioinformatique", "Support terrain"]
  },
  {
    slug: "diagnostic-pms-vigilance-manager-ivd",
    title: "PMS & Vigilance Manager IVD (IVDR)",
    salary: "62kEUR - 100kEUR",
    sector: "Diagnostic",
    category: "Sécurité / réglementation",
    shortageLevel: "Tres elevee",
    summary:
      "Structure la surveillance après mise sur le marché (PMS) et la vigilance IVD : collecte signaux, analyse, CAPA et pilotage des obligations IVDR sans ralentir l'exécution produit.",
    skills: ["Post-market surveillance", "Vigilance mindset", "Risk management", "CAPA governance", "Cross-functional coordination"],
    successFactors: [
      "Transformer des signaux terrain en décisions claires (sans sur-réagir).",
      "Tenir la discipline : délais, preuves, et cohérence entre qualité, clinique et support.",
      "Créer des routines PMS utilisables quand le volume d'incidents augmente."
    ],
    path: ["QA / regulatory specialist", "PMS & vigilance manager", "Safety / compliance lead"],
    missions: [
      "Mettre en place la stratégie PMS/vigilance : sources, outils, indicateurs et gouvernance.",
      "Piloter la gestion des incidents : triage, investigation, CAPA et communication avec les parties prenantes.",
      "Assurer la cohérence dossier : liens entre risques, performance, retours terrain et décisions de produit."
    ],
    studies: ["Pharmacie", "Master affaires réglementaires", "Ingénieur biomédical"],
    schools: ["Universite Paris-Saclay", "Faculte de pharmacie Strasbourg", "Telecom Paris", "EPITA"],
    relatedIndustries: ["Diagnostic", "IVD", "IVDR", "Quality systems", "Customer support"]
  },
  {
    slug: "medical-vet-pharmacovigilance-specialist",
    title: "Pharmacovigilance Specialist Veterinary / Animal Health",
    salary: "55kEUR - 90kEUR",
    sector: "Medical Vet",
    category: "Sécurité / pharmacovigilance",
    shortageLevel: "Elevee",
    summary:
      "Pilote la collecte, l'analyse et la déclaration des événements indésirables en santé animale, en sécurisant conformité, signalement et apprentissage produit.",
    skills: ["Pharmacovigilance", "Case processing", "Signal detection mindset", "Regulatory compliance", "Scientific writing"],
    successFactors: [
      "Structurer des routines qui tiennent quand le volume augmente.",
      "Faire coopérer médical, qualité, support et regulatory autour d'un même standard.",
      "Savoir communiquer des limites et des risques sans paniquer l'organisation."
    ],
    path: ["PV associate", "Pharmacovigilance specialist", "PV lead / safety manager"],
    missions: [
      "Mettre en place/faire tourner le process de pharmacovigilance : intake, qualification, triage, délais.",
      "Analyser les cas, contribuer à la détection de signaux et aux plans d'action.",
      "Assurer la conformité des déclarations et la préparation aux audits sur le périmètre safety."
    ],
    studies: ["Vétérinaire", "Pharmacie", "Doctorat sciences", "Master pharmacovigilance"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Faculte de pharmacie Strasbourg", "Universite d'Angers"],
    relatedIndustries: ["Animal health", "Vet pharma", "Vaccins veterinaires", "Compliance", "Product safety"],
    sources: [
      ...defaultRoleSources,
      {
        name: "Ordre national des vétérinaires",
        url: "https://www.veterinaire.fr/"
      }
    ]
  },
  {
    slug: "medical-vet-vaccine-manufacturing-manager",
    title: "Vaccine Manufacturing Manager Animal Health",
    salary: "65kEUR - 105kEUR",
    sector: "Medical Vet",
    category: "Production",
    shortageLevel: "Elevee",
    summary:
      "Pilote la production de vaccins santé animale en sécurisant qualité, rendements, planning et exécution GMP, avec une forte pression sur la continuité d'approvisionnement.",
    skills: ["Vaccine manufacturing", "GMP execution", "People leadership", "Deviation / CAPA", "Production planning"],
    successFactors: [
      "Stabiliser l'exécution : routines, standards, et discipline de revue.",
      "Faire tenir ensemble planning, qualité et sécurité, surtout en période de tension supply.",
      "Garder une lecture terrain : flux, incidents, résolution, et communication."
    ],
    path: ["Production supervisor", "Production manager", "Manufacturing manager"],
    missions: [
      "Piloter l'activité de production (équipes, planning, performance) sur le périmètre vaccins.",
      "Gérer déviations, investigations et CAPA avec QA/QC et équipes support.",
      "Contribuer à l'amélioration continue : rendement, robustesse, capacité et formation."
    ],
    studies: ["Ingénieur biotech", "Master bioprocédés", "Vétérinaire avec exposition industrialisation"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Faculte de pharmacie Strasbourg", "Universite d'Angers"],
    relatedIndustries: ["Animal health", "Vaccins veterinaires", "Bioproduction", "GMP manufacturing", "Supply chain"]
  },
  {
    slug: "medical-vet-veterinary-medical-advisor",
    title: "Veterinary Medical Advisor (Animal Health)",
    salary: "60kEUR - 100kEUR + bonus",
    sector: "Medical Vet",
    category: "Affaires scientifiques",
    shortageLevel: "Elevee",
    summary:
      "Fait le lien entre science, terrain et stratégie : support médical, formation, evidence et lecture marché sur un portefeuille santé animale.",
    skills: ["Medical affairs", "Scientific communication", "KOL / terrain", "Training", "Cross-functional collaboration"],
    successFactors: [
      "Rester crédible scientifiquement tout en gardant une lecture terrain et business.",
      "Structurer l'evidence utile : ce qui aide le terrain, le marketing et la conformité.",
      "Savoir cadrer les messages et les limites du produit sans sur-promettre."
    ],
    path: ["Vétérinaire terrain", "Medical advisor", "Medical affairs manager"],
    missions: [
      "Assurer le support médical/scientifique pour les équipes terrain et les clients.",
      "Contribuer au contenu : formation, documentation, réponses scientifiques, et retours d'expérience.",
      "Travailler avec marketing, qualité et regulatory pour maintenir un discours cohérent et conforme."
    ],
    studies: ["Vétérinaire", "Pharmacie", "Doctorat sciences de la vie"],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Faculte de pharmacie Strasbourg", "Universite d'Angers"],
    relatedIndustries: ["Animal health", "Vet pharma", "Vaccins veterinaires", "Medical communications", "Field support"],
    sources: [
      ...defaultRoleSources,
      {
        name: "Ordre national des vétérinaires",
        url: "https://www.veterinaire.fr/"
      }
    ]
  },
  {
    slug: "petfood-packaging-development-engineer",
    title: "Packaging Development Engineer Petfood",
    salary: "50kEUR - 85kEUR",
    sector: "Petfood",
    category: "R&D / packaging",
    shortageLevel: "Elevee",
    summary:
      "Développe et sécurise les emballages petfood (barrière, conservation, industrialisation) pour réduire incidents, pertes, coûts logistiques et risques qualité.",
    skills: ["Packaging development", "Industrialization", "Supplier management", "Quality by design", "Cost / sustainability trade-offs"],
    successFactors: [
      "Concevoir des solutions qui tiennent en usine : cadence, variabilité, et tolérances.",
      "Gérer les compromis : coût, barrière, stockage, transport et expérience marque.",
      "Sécuriser la supply : validation, changements fournisseurs et contrôles qualité."
    ],
    path: ["Packaging engineer", "Packaging development engineer", "Packaging lead"],
    missions: [
      "Développer et qualifier les solutions packaging (matériaux, formats, performances) pour le petfood.",
      "Travailler avec production, qualité, achats et fournisseurs pour industrialiser et sécuriser.",
      "Piloter les changements : tests, validation, documentation et suivi terrain."
    ],
    studies: ["Ingénieur packaging", "Ingénieur agroalimentaire", "Ingénieur matériaux"],
    schools: ["Institut Agro Montpellier", "AgroParisTech", "Sciences Agro Bordeaux", "ENSAIA", "Institut Agro Dijon"],
    relatedIndustries: ["Petfood", "Premium FMCG", "Packaging", "Food safety", "Supply chain"]
  },
  {
    slug: "petfood-supplier-quality-engineer",
    title: "Supplier Quality Engineer Petfood",
    salary: "50kEUR - 85kEUR",
    sector: "Petfood",
    category: "Achats / supply chain",
    shortageLevel: "Elevee",
    summary:
      "Sécurise la qualité fournisseurs (ingrédients, co-manufacturing, packaging) pour réduire non-conformités, incidents et ruptures sur une chaîne petfood sous contrainte.",
    skills: ["Supplier quality", "Audits", "Incident / CAPA", "Specification management", "Risk-based thinking"],
    successFactors: [
      "Se concentrer sur les fournisseurs et ingrédients qui portent le vrai risque qualité.",
      "Tenir un cadre d'audit et de CAPA qui améliore réellement l'exécution terrain.",
      "Créer une relation ferme mais constructive avec achats, R&D et fournisseurs."
    ],
    path: ["Quality engineer", "Supplier quality engineer", "Supplier quality lead"],
    missions: [
      "Définir la stratégie de qualification fournisseurs (audits, évaluations, critères) sur les catégories critiques.",
      "Piloter incidents, déviations et CAPA avec fournisseurs et équipes internes.",
      "Maintenir spécifications, contrôles et routines de revue pour sécuriser la supply."
    ],
    studies: ["Ingénieur agroalimentaire", "Qualité", "Ingénieur procédés", "Master sécurité des aliments"],
    schools: ["Institut Agro Montpellier", "AgroParisTech", "Sciences Agro Bordeaux", "ENSAIA", "Institut Agro Dijon"],
    relatedIndustries: ["Petfood", "Nutrition animale", "Supplier quality", "Co-manufacturing", "Food safety"]
  }
];

const august2026AnimalHealthBatch: JobRole[] = [
  {
    slug: "medical-vet-technical-manager-swine",
    title: "Vétérinaire Technique Porc Grand Compte",
    salary: "55kEUR - 81kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable, primes, véhicule et intéressement en supplément. Fourchette dépendante de l'expérience, taille et type d'entreprise (grand groupe international vs PME/labo national), région et périmètre du poste.",
    sector: "Medical Vet",
    category: "Affaires techniques filière porc",
    shortageLevel: "Tres elevee",
    summary:
      "Assure le support technique de la gamme porcine auprès des grands comptes industriels (groupements, intégrateurs, coopératives). Accompagne les protocoles vaccinaux, forme les équipes commerciales internes et les techniciens groupements, anime la relation KOL vétérinaires porc et remonte les insights terrain au marketing et R&D.",
    skills: [
      "Production porcine (naissage, engraissement, post-sevrage)",
      "Vaccination et biosécurité (PPA, PCV2, SDRP, mycoplasmes)",
      "Formation technique force de vente",
      "Relation KOL vétérinaires filière porc",
      "Autonomie et crédibilité terrain"
    ],
    successFactors: [
      "Être crédible face aux praticien.ne.s et vétérinaires de groupement dès les premiers échanges.",
      "Traduire des données techniques complexes en messages actionnables pour la force de vente.",
      "Anticiper les tendances filière (biosécurité, PPA, antibiorésistance, bien-être animal, One Health)."
    ],
    path: [
      "Vétérinaire praticien.ne porc",
      "Vétérinaire technique porc",
      "Chef de Produit Porc / Responsable Médical Porc"
    ],
    missions: [
      "Accompagner les élevages porcins industriels sur les protocoles vaccinaux, sanitaires et de biosécurité.",
      "Former les équipes commerciales internes et les techniciens groupements aux nouveautés produits et évolutions réglementaires.",
      "Animer un réseau de KOL vétérinaires porc, participer aux congrès (AFMVP, IPVS, ESPHM) et remonter les insights terrain au marketing et à la R&D."
    ],
    studies: [
      "Docteur.e vétérinaire (DEFV)",
      "5+ ans d'expérience en production porcine",
      "Formation continue biosécurité, PPA, antibiorésistance"
    ],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: [
      "Laboratoires santé animale porc (Boehringer Ingelheim, Zoetis, MSD Animal Health, Ceva, Virbac)",
      "Cabinets vétérinaires porcins (Porc.Spective, Chêne Vert Conseil)",
      "Groupements porcins (Cooperl Arc Atlantique, Evel'Up, Aveltis, Porelia)",
      "Nutrition animale porc (Sanders, Le Gouessant, Cargill)",
      "Instituts techniques (IFIP, INRAE, Anses)"
    ],
    sources: [
      { name: "IFIP - Institut du Porc", url: "https://ifip.asso.fr/" },
      { name: "SNGTV - Groupements Techniques Vétérinaires", url: "https://www.sngtv.org/" },
      { name: "AFMVP - Médecine Vétérinaire Porcine", url: "https://www.afmvp.com/" }
    ]
  },
  {
    slug: "medical-vet-technical-manager-poultry",
    title: "Vétérinaire Technique Volaille",
    salary: "45kEUR - 90kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Le positionnement dans la fourchette dépend de trois critères : la taille de l'entreprise, la localisation du poste et la part variable propre à chaque structure (bonus, primes, véhicule), non incluse dans la fourchette.",
    sector: "Medical Vet",
    category: "Affaires techniques filière volaille",
    shortageLevel: "Tres elevee",
    summary:
      "Assure le support technique de la gamme aviaire (chair, ponte, dinde, canard) : audits couvoir, expertise vaccination (in ovo, nébulisation, sous-cutanée), formation force de vente, relation KOL vétérinaires aviaires et interlocuteurs intégrateurs.",
    skills: [
      "Systèmes de production aviaire (chair, ponte, dinde, canard, palmipèdes)",
      "Vaccination aviaire (in ovo, spray, nébulisation, sous-cutanée)",
      "Audits couvoir et biosécurité",
      "Formation technique et scientifique",
      "Relation KOL et intégrateurs"
    ],
    successFactors: [
      "Maîtriser les spécificités des différents systèmes de production aviaire.",
      "Apprécier la transversalité entre expertise technique, marketing et commercial.",
      "Anticiper les risques sanitaires (grippe aviaire, Salmonella, Newcastle)."
    ],
    path: [
      "Vétérinaire praticien.ne aviaire",
      "Vétérinaire technique volaille",
      "Product Manager Volaille / Responsable Médical Volaille"
    ],
    missions: [
      "Organiser et réaliser le plan d'audits en couvoir sur les différentes espèces avicoles (Gallus, dinde, palmipèdes).",
      "Apporter l'expertise vaccination au couvoir : voie sous-cutanée, in ovo, nébulisation.",
      "Investiguer les problématiques sanitaires et techniques rencontrées sur le terrain.",
      "Apporter aux acteurs de la filière (ayants droit, conseillers, techniciens, éleveurs) une information scientifique fiable et animer les réunions techniques.",
      "Prendre en charge la formation initiale et continue de la force de vente et l'accompagner sur le terrain.",
      "Concevoir et monitorer les essais cliniques et techniques terrain.",
      "Contribuer aux supports techniques et marketing de la gamme, à l'analyse des segments de marché et à la veille scientifique.",
      "Rédiger et publier des articles scientifiques en revues à comité de lecture, congrès et presse professionnelle.",
      "Développer et pérenniser la relation avec les leaders d'opinion, les sociétés savantes et les experts de terrain.",
      "Contribuer aux obligations pharmaceutiques et réglementaires de la gamme (pharmacovigilance, bonnes pratiques de distribution)."
    ],
    studies: [
      "Docteur.e vétérinaire (DEFV)",
      "Spécialisation ou expérience aviaire (junior à senior accepté)",
      "Formation continue biosécurité aviaire"
    ],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: [
      "Laboratoires de santé animale, gamme aviaire",
      "Cabinets et groupes vétérinaires aviaires",
      "Instituts techniques et centres de recherche avicoles",
      "Couvoirs et entreprises de sélection génétique",
      "Groupements, intégrateurs et industriels de la filière volaille"
    ],
    sources: [
      { name: "ITAVI - Institut Technique de l'Aviculture", url: "https://www.itavi.asso.fr/" },
      { name: "SNGTV - Groupements Techniques Vétérinaires", url: "https://www.sngtv.org/" },
      { name: "Anses - Grippe aviaire et surveillance", url: "https://www.anses.fr/fr/system/files/anses-grippe-aviaire.pdf" }
    ]
  },
  {
    slug: "medical-vet-technical-manager-ruminant",
    title: "Vétérinaire Technique Ruminant Bovin",
    salary: "50kEUR - 75kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable, primes, véhicule en supplément. Fourchette dépendante de l'expérience, du périmètre (laitier / allaitant / mixte) et de la région d'exercice.",
    sector: "Medical Vet",
    category: "Affaires techniques filière ruminant",
    shortageLevel: "Elevee",
    summary:
      "Assure le support technique de la gamme bovine (laitier et allaitant) : santé de la mamelle, reproduction, protocoles vaccinaux, accompagnement éleveurs et vétérinaires praticiens ruraux sur les enjeux sanitaires et de productivité.",
    skills: [
      "Production bovine laitière et allaitante",
      "Santé de la mamelle et qualité du lait",
      "Reproduction bovine et protocoles vaccinaux",
      "Pédagogie et accompagnement éleveurs",
      "Formation vétérinaires praticiens ruraux"
    ],
    successFactors: [
      "Comprendre les contraintes économiques et opérationnelles de l'élevage bovin.",
      "Avoir un vrai sens pédagogique face aux vétérinaires ruraux et éleveurs.",
      "Trouver l'équilibre entre soutien technique et posture commerciale crédible."
    ],
    path: [
      "Vétérinaire praticien.ne rural.e / mixte",
      "Vétérinaire technique ruminant",
      "Chef de Produit Bovin / Responsable Médical Ruminant"
    ],
    missions: [
      "Accompagner les éleveurs bovins et vétérinaires praticiens sur les protocoles santé mamelle, reproduction et vaccination.",
      "Former la force de vente aux enjeux techniques et sanitaires spécifiques ruminants.",
      "Contribuer à la stratégie médicale des gammes bovines et aux publications scientifiques."
    ],
    studies: [
      "Docteur.e vétérinaire (DEFV)",
      "Expérience élevage bovin (praticien.ne rural.e ou mixte)",
      "Formation continue santé bovine"
    ],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: [
      "Laboratoires santé animale ruminants (Boehringer Ingelheim, MSD Animal Health, Zoetis, Ceva, Virbac, Vétoquinol)",
      "Cabinets vétérinaires ruraux et GTV / SNGTV",
      "Coopératives laitières (Lactalis, Sodiaal, Savencia, Agrial)",
      "Nutrition animale ruminants (InVivo, Neovia/ADM, Sanders)",
      "Contrôle laitier et instituts techniques (IDELE, CNIEL)"
    ],
    sources: [
      { name: "IDELE - Institut de l'Élevage", url: "https://idele.fr/" },
      { name: "SNGTV - Groupements Techniques Vétérinaires", url: "https://www.sngtv.org/" },
      { name: "CNIEL - Interprofession laitière", url: "https://www.filiere-laitiere.fr/" }
    ]
  },
  {
    slug: "medical-vet-head-of-regulatory-europe",
    title: "Head of Regulatory Affairs Europe Santé Animale",
    salary: "90kEUR - 140kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. LTI, stock-options et bonus annuel en supplément (10-25% du fixe). Fourchette dépendante du portefeuille (mono-produit vs multi-thérapeutique), de la taille des équipes managées et de la dimension internationale.",
    sector: "Medical Vet",
    category: "Direction réglementaire",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote les enregistrements et la conformité réglementaire à l'échelle européenne (EMA) pour un portefeuille santé animale. Définit la stratégie réglementaire, orchestre les soumissions, anime l'interface autorités et manage une équipe réglementaire senior.",
    skills: [
      "Réglementation santé animale européenne (EMA, VMD, DCVMP)",
      "Stratégie réglementaire multi-pays",
      "Management d'équipe réglementaire",
      "Interface autorités et négociation",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Comprendre les spécificités réglementaires vétérinaires vs pharma humaine.",
      "Anticiper les évolutions du cadre EMA et adapter la stratégie du portefeuille.",
      "Naviguer entre exigences science, business et compliance sans compromis dangereux."
    ],
    path: [
      "Regulatory Affairs Specialist / Manager",
      "Head of Regulatory pays / région",
      "Head of Regulatory Europe / Global"
    ],
    missions: [
      "Définir et déployer la stratégie réglementaire européenne du portefeuille santé animale.",
      "Piloter les soumissions, variations et interactions avec EMA / autorités nationales.",
      "Manager l'équipe réglementaire, orchestrer les partenariats consultants et anticiper les évolutions cadre EU."
    ],
    studies: [
      "Docteur.e vétérinaire OU pharmacien.ne OU scientifique senior",
      "10+ ans en affaires réglementaires santé animale",
      "Master affaires réglementaires ou équivalent recommandé"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Université d'Angers", "Faculté de pharmacie Strasbourg", "Harvard Business School"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva, Virbac, Vétoquinol)",
      "EMA / ANMV (ANSES) / autres autorités nationales EU",
      "Cabinets consultants réglementaires (Halloran, Voisin Consulting, TSD Consulting)",
      "Biotech animal health en croissance internationale",
      "Vaccins vétérinaires et biologics"
    ],
    sources: [
      { name: "EMA - Committee for Medicinal Products for Veterinary Use", url: "https://www.ema.europa.eu/en/committees/committee-medicinal-products-veterinary-use-cvmp" },
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" },
      { name: "ANMV / ANSES - Agence Nationale Médicament Vétérinaire", url: "https://www.anses.fr/fr/content/anmv" }
    ]
  },
  {
    slug: "medical-vet-market-access-manager",
    title: "Market Access Manager Santé Animale",
    salary: "70kEUR - 110kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 15-25% + LTI selon niveau. Fourchette dépendante du périmètre (pays vs région EU), de la maturité produit et de la complexité des payeurs / prescripteurs ciblés.",
    sector: "Medical Vet",
    category: "Market access",
    shortageLevel: "Elevee",
    summary:
      "Définit et déploie la stratégie d'accès au marché pour des gammes santé animale : pricing, valeur médico-économique, relations payeurs et prescripteurs, argumentaires d'adoption. Interface stratégique entre médical, marketing, ventes et affaires publiques.",
    skills: [
      "Pricing et stratégie médico-économique",
      "Relations payeurs, prescripteurs et éleveurs décisionnaires",
      "Argumentaires valeur et outreach commercial",
      "Analyse données HEOR santé animale",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Combiner rigueur scientifique et sens business dans un secteur non remboursé au sens classique.",
      "Comprendre les circuits de décision spécifiques (vétérinaire prescripteur, éleveur payeur, groupement acheteur).",
      "Construire des argumentaires valeur crédibles auprès de KOL exigeants."
    ],
    path: [
      "Product Manager ou Medical Affairs santé animale",
      "Market Access Specialist / Manager",
      "Head of Market Access région / Europe"
    ],
    missions: [
      "Élaborer la stratégie pricing et valeur médico-économique des gammes santé animale.",
      "Piloter les relations avec payeurs institutionnels, prescripteurs et groupements acheteurs.",
      "Développer les argumentaires d'adoption et outils commerciaux pour la force de vente."
    ],
    studies: [
      "Docteur.e vétérinaire OU scientifique + compétence économique / stratégique",
      "Master management ou HEOR recommandé",
      "5-10 ans d'expérience santé animale ou pharma"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "ESSEC / HEC / ESCP", "Sciences Po"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva, Virbac)",
      "Cabinets conseil market access santé animale",
      "Agences HEOR (Icon, IQVIA vet)",
      "Biotech animal health en phase de lancement",
      "Nutrition animale et diagnostic vétérinaire"
    ],
    sources: [
      { name: "AnimalhealthEurope - Industrie santé animale EU", url: "https://www.animalhealtheurope.eu/" },
      { name: "Kynetec - Animal Health Market Intelligence", url: "https://kynetec.com/" }
    ]
  },
  {
    slug: "medical-vet-business-development-manager",
    title: "Business Development Manager Santé Animale",
    salary: "70kEUR - 110kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Bonus performance 20-30% + LTI selon taille des deals conclus. Fourchette dépendante du périmètre géographique et de la nature des accords (licensing, M&A, partenariats).",
    sector: "Medical Vet",
    category: "Business development",
    shortageLevel: "Elevee",
    summary:
      "Identifie et développe les opportunités de croissance externe pour les laboratoires santé animale : partenariats stratégiques, licensing in / out, nouveaux marchés géographiques ou segments, veille concurrentielle et intelligence économique.",
    skills: [
      "Business development et licensing santé animale",
      "M&A et due diligence stratégique",
      "Veille concurrentielle et intelligence économique",
      "Négociation contrats complexes",
      "Réseau industriel et institutionnel santé animale"
    ],
    successFactors: [
      "Avoir une fibre entrepreneuriale et une tolérance au risque calculé.",
      "Combiner expertise scientifique / vétérinaire ET compréhension fine des modèles économiques.",
      "Construire un réseau international avec KOL, VC, laboratoires concurrents et startups."
    ],
    path: [
      "Vétérinaire / ingénieur avec expérience commerciale ou stratégique",
      "Business Development Manager pays / région",
      "Head of BD Europe / Global ou Chief Business Officer"
    ],
    missions: [
      "Identifier les opportunités de licensing, M&A et partenariats stratégiques dans le portefeuille santé animale.",
      "Piloter la veille concurrentielle et l'intelligence économique sur les segments cibles.",
      "Négocier et closer les accords stratégiques en interface avec direction générale et affaires juridiques."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro",
      "MBA ou Master management stratégique recommandé",
      "7-10 ans d'expérience mixte scientifique + business"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "HEC / ESSEC / INSEAD", "Harvard Business School"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva)",
      "Biotech et startups animal health / petcare",
      "Fonds VC/PE santé animale (Digitalis Ventures, Companion Fund, Anterra Capital)",
      "Cabinets conseil M&A santé (McKinsey Life Sciences, EY Parthenon)",
      "Petfood premium et distribution vétérinaire"
    ],
    sources: [
      { name: "Vetnosis / Animal Pharm - M&A et deals santé animale", url: "https://animalpharm.agribusinessintelligence.informa.com/" },
      { name: "Digitalis Ventures - Fonds spécialisé animal health", url: "https://digitalisventures.com/" }
    ]
  },
  {
    slug: "medical-vet-country-manager-france",
    title: "Country Manager France Santé Animale",
    salary: "110kEUR - 180kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Bonus performance 30-50% + LTI stock-options significatives pour grands groupes internationaux. Fourchette dépendante de la taille du P&L, du nombre de collaborateurs et de la maturité de la filiale France.",
    sector: "Medical Vet",
    category: "Direction pays",
    shortageLevel: "Elevee",
    summary:
      "Dirige une filiale ou un pays santé animale : P&L, management d'équipes commerciales, marketing, technique, opérations et affaires réglementaires. Définit et déploie la stratégie locale en cohérence avec les orientations groupe internationales.",
    skills: [
      "Direction générale P&L multi-fonctions",
      "Leadership et management d'équipes 30-200 personnes",
      "Stratégie commerciale santé animale multi-segments",
      "Interface siège international et gestion matricielle",
      "Anglais courant obligatoire, seconde langue appréciée"
    ],
    successFactors: [
      "Être un leader confirmé avec un parcours commercial + management + opérations solide.",
      "Comprendre les enjeux locaux France (filière élevage, cliniques vétérinaires, distribution) tout en dialoguant avec le siège international.",
      "Naviguer les arbitrages entre croissance court terme et investissements structurels long terme."
    ],
    path: [
      "Business Unit Director ou Directeur commercial santé animale",
      "Country Manager pays secondaire / région émergente",
      "Country Manager France ou Head of Southern Europe"
    ],
    missions: [
      "Piloter le P&L de la filiale France santé animale et déployer la stratégie business locale.",
      "Manager les directions commerciales, marketing, technique, opérations et réglementaires.",
      "Représenter le groupe auprès des interlocuteurs stratégiques France (industriels, syndicats, autorités, KOL)."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro OU école de commerce",
      "MBA recommandé pour les grands groupes",
      "15+ ans d'expérience dont 5+ en direction opérationnelle santé animale"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "HEC / ESSEC / ESCP / INSEAD", "Harvard Business School"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva, Virbac, Vétoquinol, Merial/Sanofi)",
      "Petfood premium multinational (Nestlé Purina, Mars Petcare, Royal Canin, Hill's, Affinity Petcare)",
      "Nutrition animale grands groupes (Cargill, ADM, InVivo, Neovia)",
      "Groupes vétérinaires internationaux (AniCura, IVC Evidensia, VetPartners)",
      "Cabinets conseil executive search santé animale"
    ],
    sources: [
      { name: "AnimalhealthEurope - Industrie santé animale EU", url: "https://www.animalhealtheurope.eu/" },
      { name: "SIMV - Syndicat de l'Industrie du Médicament et diagnostic Vétérinaires", url: "https://www.simv.org/" }
    ]
  },
  {
    slug: "medical-vet-key-account-manager-large-accounts",
    title: "Key Account Manager Grand Compte Santé Animale",
    salary: "50kEUR - 70kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 20-40% du fixe selon atteinte objectifs individuels et collectifs. Fourchette dépendante du portefeuille de comptes (nombre + poids stratégique) et du niveau de séniorité.",
    sector: "Medical Vet",
    category: "Commercial grand compte",
    shortageLevel: "Elevee",
    summary:
      "Gère et développe un portefeuille de comptes stratégiques (groupements vétérinaires, coopératives, centrales d'achat, groupes distribution) : négociation d'appels d'offres, relation avec les décisionnaires en organisations complexes, reporting et pilotage business.",
    skills: [
      "Gestion grand compte et négociation commerciale complexe",
      "Connaissance filière santé animale (vétérinaire, élevage, distribution)",
      "Pilotage appels d'offres et contrats-cadres",
      "Reporting business et CRM",
      "Relation multi-niveaux (achat, technique, direction)"
    ],
    successFactors: [
      "Combiner rigueur commerciale et compréhension technique des enjeux santé animale.",
      "Naviguer les processus de décision complexes (achats, technique, direction) sans perdre en réactivité.",
      "Construire une relation long terme fondée sur la valeur, pas uniquement sur le prix."
    ],
    path: [
      "Technico-commercial.e ou véto commercial.e junior",
      "Key Account Manager grand compte",
      "Head of KAM / Directeur.rice commercial.e grands comptes"
    ],
    missions: [
      "Développer le portefeuille de comptes stratégiques et négocier les contrats-cadres.",
      "Répondre aux appels d'offres et défendre les propositions commerciales en interne et externe.",
      "Assurer le reporting business, la remontée d'informations terrain et la coordination interne."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro OU école de commerce",
      "3-8 ans d'expérience commerciale santé animale ou secteurs adjacents",
      "Formation continue négociation grand compte"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "École de commerce généraliste"],
    relatedIndustries: [
      "Laboratoires santé animale (Zoetis, Boehringer Ingelheim, MSD, Ceva, Elanco, Virbac)",
      "Nutrition animale (Sanders, InVivo, Neovia, Cargill)",
      "Génétique animale (Groupe Grimaud, Hendrix Genetics)",
      "Distribution vétérinaire (Alcyon, Coveto, Centravet)",
      "Groupes vétérinaires (AniCura, IVC Evidensia, Sévétys, VetPartners, Univet)"
    ],
    sources: [
      { name: "SIMV - Syndicat Industrie Médicament et Diagnostic Vétérinaires", url: "https://www.simv.org/" },
      { name: "Ordre National des Vétérinaires - Démographie", url: "https://www.veterinaire.fr/" }
    ]
  },
  {
    slug: "petfood-veterinary-advisor",
    title: "Vétérinaire Conseiller Technique Petfood",
    salary: "50kEUR - 75kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 10-20%, véhicule et intéressement en supplément. Fourchette dépendante de la taille de la marque petfood (multinational vs premium challenger) et du périmètre.",
    sector: "Petfood",
    category: "Affaires techniques petfood",
    shortageLevel: "Elevee",
    summary:
      "Assure le support scientifique et technique sur les gammes d'alimentation chien et chat : formation des prescripteurs vétérinaires, communication scientifique, relation KOL nutrition companion animal, contribution aux publications et positionnements marketing.",
    skills: [
      "Nutrition et physiologie chien / chat",
      "Formation scientifique prescripteurs vétérinaires",
      "Communication scientifique et publications",
      "Relation KOL nutrition companion animal",
      "Pédagogie et vulgarisation clinique"
    ],
    successFactors: [
      "Combiner rigueur scientifique et pédagogie accessible aux praticien.ne.s en clinique.",
      "Comprendre les enjeux commerciaux du petfood premium (positionnement, différenciation, claims).",
      "Construire un réseau KOL solide en nutrition et médecine préventive companion animal."
    ],
    path: [
      "Vétérinaire praticien.ne companion animal",
      "Vétérinaire conseiller technique petfood",
      "Scientific Affairs Manager / Head of Veterinary Advocacy petfood"
    ],
    missions: [
      "Former les prescripteurs vétérinaires en clinique et en congrès aux gammes d'alimentation chien / chat.",
      "Développer les contenus scientifiques (études cliniques, publications, argumentaires nutrition).",
      "Animer le réseau KOL nutrition et médecine préventive companion animal."
    ],
    studies: [
      "Docteur.e vétérinaire (DEFV)",
      "Appétence nutrition et médecine préventive companion animal",
      "Diplôme complémentaire ou spécialisation nutrition recommandée"
    ],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA"],
    relatedIndustries: [
      "Petfood premium multinational (Royal Canin, Hill's, Nestlé Purina Pro Plan, Mars Petcare, Affinity Petcare)",
      "Petfood challenger premium (Virbac Nutrition, Ultra Premium Direct, Saga Nutrition, Almo Nature)",
      "Cliniques vétérinaires companion animal et groupements",
      "Nutrition thérapeutique et diet vétérinaire",
      "Distribution spécialisée petshop (Maxi Zoo, Zooplus, Truffaut)"
    ],
    sources: [
      { name: "AFVAC - Association Française Vétérinaires Animaux de Compagnie", url: "https://www.afvac.com/" },
      { name: "WSAVA Global Nutrition Committee", url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/" }
    ]
  },
  {
    slug: "medical-vet-medical-affairs-manager",
    title: "Responsable Médical Santé Animale",
    salary: "65kEUR - 95kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Bonus performance 15-25% + LTI selon la taille du groupe. Fourchette dépendante du périmètre thérapeutique (mono-espèce vs multi-espèces) et de la maturité de la gamme.",
    sector: "Medical Vet",
    category: "Affaires médicales",
    shortageLevel: "Elevee",
    summary:
      "Porte la responsabilité médicale d'une gamme santé animale : stratégie médicale, pharmacovigilance, publications scientifiques, essais cliniques, formation medico-marketing, interface R&D, marketing et affaires réglementaires.",
    skills: [
      "Stratégie médicale et scientifique gamme santé animale",
      "Pharmacovigilance vétérinaire",
      "Publications scientifiques et communication médicale",
      "Pilotage essais cliniques et post-marketing",
      "Interface cross-fonctionnelle (R&D, marketing, réglementaire)"
    ],
    successFactors: [
      "Être un.e expert.e scientifique crédible sur une aire thérapeutique clairement identifiée.",
      "Traduire les données scientifiques en messages actionnables pour marketing et force de vente.",
      "Anticiper les enjeux pharmacovigilance et post-marketing avant qu'ils deviennent business-critical."
    ],
    path: [
      "Vétérinaire spécialiste ou scientifique senior",
      "Medical Advisor / Scientific Affairs Manager",
      "Head of Medical Affairs / Medical Director région"
    ],
    missions: [
      "Définir et déployer la stratégie médicale d'une gamme santé animale (positioning, evidence, communication).",
      "Piloter la pharmacovigilance, la sécurité produit et les études post-marketing.",
      "Coordonner l'interface R&D / marketing / réglementaire et animer les publications scientifiques."
    ],
    studies: [
      "Docteur.e vétérinaire (DEFV) obligatoire",
      "Doctorat ou spécialisation dans une aire thérapeutique appréciée",
      "Anglais courant obligatoire, publications appréciées"
    ],
    schools: ["Oniris", "VetAgro Sup", "ENVT", "ENVA", "Université d'Angers"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva, Virbac, Vétoquinol)",
      "Biotech animal health et vaccins vétérinaires",
      "Nutrition thérapeutique et petfood premium",
      "Diagnostic vétérinaire",
      "Écoles vétérinaires et centres hospitaliers universitaires vétérinaires (CHUV)"
    ],
    sources: [
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" },
      { name: "SIMV - Syndicat Industrie Médicament et Diagnostic Vétérinaires", url: "https://www.simv.org/" }
    ]
  },
  {
    slug: "medical-vet-product-manager",
    title: "Chef de Produit Santé Animale",
    salary: "45kEUR - 70kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 10-20% du fixe. Fourchette dépendante de la taille de la gamme pilotée, du chiffre d'affaires géré et du niveau de séniorité (3-5 ans à 8-10 ans).",
    sector: "Medical Vet",
    category: "Marketing produit",
    shortageLevel: "Elevee",
    summary:
      "Gère le cycle de vie d'une gamme santé animale : stratégie marketing produit, lancement, pricing, positionnement, coordination avec force de vente, analyse de marché et benchmarks concurrentiels. Fait le pont entre R&D, médical, ventes et communication.",
    skills: [
      "Marketing produit santé animale",
      "Lancement produit et cycle de vie",
      "Analyse de marché et intelligence concurrentielle",
      "Coordination force de vente et outils commerciaux",
      "Orientation data et exécution opérationnelle"
    ],
    successFactors: [
      "Combiner rigueur analytique et sens du terrain (comprendre les praticien.ne.s et éleveurs).",
      "Traduire une stratégie médicale et scientifique en plan marketing actionnable.",
      "Piloter le lancement produit sans perdre en qualité d'exécution commerciale."
    ],
    path: [
      "Assistant.e Chef de Produit ou technico-commercial.e",
      "Chef de Produit Santé Animale",
      "Senior Product Manager / Group Product Manager / Head of Marketing gamme"
    ],
    missions: [
      "Définir le plan marketing d'une gamme santé animale (positioning, pricing, promotion, distribution).",
      "Piloter les lancements produit et la coordination avec force de vente et affaires médicales.",
      "Analyser les performances marché, la concurrence et proposer les évolutions produit / prix / offre."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro + spécialisation marketing",
      "3-5 ans d'expérience marketing produit santé animale ou secteurs adjacents",
      "Formation continue marketing digital et data appréciée"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "École de commerce généraliste"],
    relatedIndustries: [
      "Laboratoires santé animale (Zoetis, Boehringer Ingelheim, MSD, Ceva, Elanco, Virbac, Vétoquinol)",
      "Petfood premium (Royal Canin, Hill's, Purina, Mars Petcare, Affinity)",
      "Nutrition animale industrielle (Sanders, InVivo, Cargill)",
      "Diagnostic vétérinaire (IDEXX, Zoetis Diagnostics, Virbac Diagnostics)",
      "Distribution vétérinaire et petshop"
    ],
    sources: [
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" },
      { name: "SIMV - Syndicat Industrie Médicament et Diagnostic Vétérinaires", url: "https://www.simv.org/" }
    ]
  },
  {
    slug: "medical-vet-head-of-vets-channel-petfood",
    title: "Head of Vets Channel Petfood",
    salary: "90kEUR - 130kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 20-35 % du fixe + LTI selon la taille de la marque et la maturité du canal vétérinaire. Fourchette dépendante du poids du canal vet dans le CA France (30 à 60 % typiquement) et de la maturité groupements adressés.",
    sector: "Medical Vet",
    category: "Direction canal vétérinaire petfood",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la stratégie du canal vétérinaire d'une marque petfood premium en France. Défend la marge canal face à la montée en puissance des centrales d'achat de groupements vétérinaires (AniCura, IVC Evidensia, VetPartners) et à l'érosion de la prescription par le D2C. Construit des accords partenariat basés sur la valeur non-tarifaire (formation, data, exclusivité de gamme) plutôt que sur la seule remise sur volume.",
    skills: [
      "Direction canal vétérinaire prescripteur",
      "Négociation grands comptes (centrales d'achat groupements)",
      "Stratégie pricing et valeur non-tarifaire",
      "Pilotage marge canal et prix net réalisé",
      "Anglais courant obligatoire (interface siège international)"
    ],
    successFactors: [
      "Comprendre le transfert de pouvoir de négociation en cours (indépendants vers centrales d'achat).",
      "Construire des accords partenariat basés sur la valeur non-tarifaire (formation praticiens, data, exclusivité gamme) plutôt que la remise sur volume.",
      "Défendre la marge canal devant un siège international dont les objectifs ont été fixés quand le canal était atomisé."
    ],
    path: [
      "Product Manager Petfood ou KAM Petfood/Santé Animale",
      "Head of Vets Channel régional",
      "Head of Vets Channel Europe / Global"
    ],
    missions: [
      "Piloter la stratégie du canal vétérinaire (prescripteurs + groupements) pour la marque petfood.",
      "Négocier les accords cadres avec les centrales d'achat de groupements vétérinaires et les distributeurs spécialisés.",
      "Défendre la marge canal et le prix net réalisé face à la pression des groupements consolidateurs et à l'érosion D2C."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro OU école de commerce",
      "8-15 ans d'expérience canal vétérinaire ou petfood premium",
      "MBA ou Master management stratégique apprécié"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "HEC / ESSEC / ESCP"],
    relatedIndustries: [
      "Petfood premium multinational (Royal Canin, Hill's, Nestlé Purina Pro Plan, Mars Petcare, Affinity, Virbac Nutrition)",
      "Groupements vétérinaires FR (AniCura, IVC Evidensia, VetPartners France, Univet, Sévétys, VetOne)",
      "Distribution vétérinaire (Alcyon, Coveto, Centravet)",
      "Marques petfood challenger premium (Ultra Premium Direct, Saga Nutrition, Almo Nature)",
      "Nutrition thérapeutique vétérinaire"
    ],
    sources: [
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" },
      { name: "AFVAC - Association Française Vétérinaires Animaux de Compagnie", url: "https://www.afvac.com/" },
      { name: "Kynetec Petfood Market Intelligence", url: "https://kynetec.com/" }
    ]
  },
  {
    slug: "medical-vet-network-development-director-consolidation",
    title: "Directeur.rice Développement Réseau Consolidation Vétérinaire",
    salary: "85kEUR - 130kEUR + package actionnariat",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Bonus performance 20-30 % + package actionnariat (equity, phantom shares) significatif pour aligner sur la valeur créée plutôt que le nombre de deals signés. Fourchette dépendante de la taille du groupement (10 à 100+ cliniques) et de la profondeur du pipeline propriétaire à sourcer.",
    sector: "Veterinary",
    category: "Direction M&A consolidation vétérinaire",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote le pipeline propriétaire d'acquisitions pour un groupement vétérinaire en croissance. Sécurise les cibles avant la concurrence (autres consolidateurs), négocie des deals structurés pour préserver la valeur post-acquisition (earn-out, equity, rétention vétérinaires clés), et supervise la première phase d'intégration. Poste stratégique dans une course de consolidation contre des acteurs qui se disputent un stock de cibles fini.",
    skills: [
      "Pipeline propriétaire M&A (cibles non mises en concurrence)",
      "Négociation deals structurés (prix + earn-out + equity + rétention)",
      "Due diligence stratégique et opérationnelle",
      "Structuration financière (LBO, LMBO, dette senior)",
      "Réseau vétérinaire terrain et confrères"
    ],
    successFactors: [
      "Construire un pipeline propriétaire (cibles non mises en concurrence = prix payé nettement plus bas).",
      "Aligner sur la valeur créée (via package actionnariat) plutôt que sur le nombre de deals signés.",
      "Anticiper les risques d'intégration post-acquisition (attrition vétérinaires clés, perte de patientèle) dès la phase de sourcing."
    ],
    path: [
      "Vétérinaire praticien.ne senior ou Business Development santé animale",
      "Deal Manager groupement vétérinaire",
      "Directeur.rice Développement Réseau / Chief M&A Officer"
    ],
    missions: [
      "Sourcer et qualifier les cibles d'acquisition dans la consolidation vétérinaire FR (5 à 30 cliniques par deal).",
      "Négocier les termes des deals (prix, earn-out, equity, engagements de rétention des vétérinaires cédants).",
      "Superviser la première phase d'intégration post-acquisition pour préserver la patientèle et la culture clinique."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro + MBA",
      "10-15 ans d'expérience mixte terrain vétérinaire + finance / M&A",
      "Formation continue M&A santé (recommandée)"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "HEC / ESSEC / INSEAD", "Harvard Business School", "Yale SOM"],
    relatedIndustries: [
      "Groupements vétérinaires consolidateurs (AniCura, IVC Evidensia, VetPartners France, Univet, Sévétys, VetOne, Argos Vet)",
      "Fonds VC/PE santé animale et petcare (Digitalis Ventures, Companion Fund, Ardian, IK Partners)",
      "Cabinets M&A santé (Rothschild Healthcare, Lazard MidCap)",
      "Cabinets vétérinaires indépendants en cession",
      "Sociétés de conseil intégration post-acquisition"
    ],
    sources: [
      { name: "Vetnosis / Animal Pharm - M&A et deals santé animale", url: "https://animalpharm.agribusinessintelligence.informa.com/" },
      { name: "Digitalis Ventures - Fonds spécialisé animal health", url: "https://digitalisventures.com/" },
      { name: "Ordre National des Vétérinaires - Démographie et consolidation", url: "https://www.veterinaire.fr/" }
    ]
  },
  {
    slug: "medical-vet-director-of-operations-training-agency",
    title: "Directeur.rice des Opérations Agence de Formation Santé Animale",
    salary: "75kEUR - 110kEUR",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Bonus 10-20 % + intéressement au résultat. Fourchette dépendante de la taille de l'agence (10 à 60 formateurs) et de la profondeur du portefeuille clients labos.",
    sector: "Medical Vet",
    category: "Direction opérations formation",
    shortageLevel: "Elevee",
    summary:
      "Pilote l'industrialisation de la delivery d'une agence de formation santé animale prise entre des labos clients qui compriment leurs budgets et un modèle dont la marge dépend historiquement du temps humain. Transforme un service dépendant du temps humain en modules reproductibles enrichis de digital, maintient la qualité pédagogique tout en augmentant la scalabilité. Poste de marge brute, pas de croissance de volume.",
    skills: [
      "Industrialisation delivery formation santé animale",
      "Reproductibilité modules et digital learning",
      "Pilotage marge brute et efficience opérationnelle",
      "Management d'équipe formateurs internes et externes",
      "Interface labos clients santé animale"
    ],
    successFactors: [
      "Transformer un service dépendant du temps humain en modules reproductibles enrichis de digital.",
      "Maintenir la qualité pédagogique et la crédibilité scientifique tout en augmentant la scalabilité.",
      "Piloter la marge brute plutôt que la croissance de volume (arbitrage stratégique face aux labos qui compriment leurs budgets)."
    ],
    path: [
      "Chef.fe de projet formation santé animale",
      "Head of Delivery / Head of Operations agence formation",
      "Directeur.rice des Opérations / Managing Director agence"
    ],
    missions: [
      "Industrialiser la delivery des modules de formation santé animale (présentiel, digital, hybride).",
      "Piloter la marge brute, la reproductibilité des modules et l'efficience opérationnelle.",
      "Encadrer les formateurs internes et externes, sourcer les experts scientifiques partenaires et interfacer les labos clients."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e pédagogique OU école de commerce",
      "8-15 ans d'expérience mixte formation santé animale + operations",
      "Formation continue digital learning et sciences de l'éducation appréciée"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "Sciences de l'éducation", "École de commerce généraliste", "Harvard Business School"],
    relatedIndustries: [
      "Agences de formation santé animale (Vetalis, VetOnline, agences indépendantes)",
      "Laboratoires santé animale clients (Zoetis, Boehringer Ingelheim, MSD, Ceva, Elanco, Virbac, Vétoquinol)",
      "EdTech santé et plateformes digital learning vétérinaire",
      "Écoles vétérinaires et centres de formation continue (AFVAC, SNGTV)",
      "Cabinets conseil L&D et transformation digitale formation"
    ],
    sources: [
      { name: "AFVAC - Formations continues vétérinaires", url: "https://www.afvac.com/" },
      { name: "E-learning Letter - Média spécialisé digital learning", url: "https://www.e-learning-letter.com/" },
      { name: "WSAVA - Continuing Education vétérinaire", url: "https://wsava.org/" }
    ]
  },
  {
    slug: "medical-vet-head-of-commercial-development-ai-startup",
    title: "Head of Commercial Development Startup IA Animal Health",
    salary: "70kEUR - 100kEUR + variable + BSPCE",
    salarySource:
      "Ordre de grandeur France pour un.e first commercial hire en scale-up early stage. Fixe + variable 20-40 % + BSPCE ou equity aligné.e sur la création de valeur. Fourchette dépendante de la séniorité (7-15 ans d'expérience commerciale santé animale ou SaaS B2B).",
    sector: "Medical Vet",
    category: "Direction commerciale startup IA Animal Health",
    shortageLevel: "Tres elevee",
    summary:
      "First commercial hire d'une startup française spécialisée dans les produits IA pour les professionnel.le.s de la santé animale (assistant IA privé, assistant vétérinaire, CRM santé animale). Poste stratégique de transition d'une organisation founder-led vers une phase commerciale structurée. Rattachement direct aux fondateur.rice.s.",
    skills: [
      "Direction commerciale et business development santé animale",
      "Vente B2B SaaS et cycles de vente scale-up",
      "Cartographie comptes et pipeline discipliné",
      "Représentation externe et ambassadeur.rice produit",
      "Français et anglais courants obligatoires"
    ],
    successFactors: [
      "Comprendre en profondeur les produits et traduire la value proposition pour chaque segment client (vétérinaires, cliniques, industriels).",
      "Libérer les fondateur.rice.s des tâches commerciales front-line pour qu'ils.elles se recentrent sur stratégie et produit.",
      "Construire un playbook commercial reproductible sur lequel un.e second.e commercial pourra se brancher."
    ],
    path: [
      "Sales Manager ou Business Development santé animale / SaaS B2B",
      "Head of Commercial Development first hire scale-up",
      "VP Sales ou Chief Revenue Officer post-scaling"
    ],
    missions: [
      "Piloter la stratégie commerciale end-to-end : cartographie des comptes prioritaires, ciblage des décisionnaires, construction d'un pipeline discipliné.",
      "Représenter la startup auprès des vétérinaires, cliniques, groupements et acteurs industriels de la santé animale.",
      "Structurer l'infrastructure commerciale (CRM, tracking, follow-ups, pipeline reviews, reporting) et remonter le feedback marché structuré aux fondateur.rice.s et à l'équipe produit."
    ],
    studies: [
      "Docteur.e vétérinaire OU école de commerce OU ingénieur.e agri / agro",
      "7-15 ans d'expérience commerciale santé animale, services vétérinaires ou SaaS B2B",
      "MBA apprécié pour la dimension stratégique"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "HEC / ESSEC / ESCP", "École de commerce généraliste", "MIT Sloan", "Harvard Business School"],
    relatedIndustries: [
      "Startups IA santé animale (assistants IA vétérinaires, CRM santé animale)",
      "Éditeurs SaaS B2B vétérinaire (PMS cliniques, télémédecine, workflow)",
      "Groupements vétérinaires en croissance (AniCura, IVC Evidensia, VetPartners France, Univet, Sévétys)",
      "Distribution vétérinaire (Alcyon, Coveto, Centravet)",
      "Écosystème deeptech HealthTech et Animal Health early stage"
    ],
    sources: [
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" },
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Vetstoria Digital Transformation Report", url: "https://www.vetstoria.com/" }
    ]
  },
  {
    slug: "veterinary-multisite-coordinator-france",
    title: "Coordinateur.rice Multisite Cliniques Vétérinaires",
    salary: "55kEUR - 85kEUR + véhicule",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Véhicule de fonction + variable 10-15 %. Fourchette dépendante de l'expérience management multisite et du nombre de cliniques à animer (10 à 40 typiquement).",
    sector: "Veterinary",
    category: "Coordination multisite terrain",
    shortageLevel: "Elevee",
    summary:
      "Maillon essentiel de proximité pour les cliniques vétérinaires d'un groupement multi-sites. Accompagne les équipes sur le terrain, facilite leur quotidien opérationnel et garantit le bon déploiement des projets du groupe (RH, marketing, finance, process internes). Poste itinérant, majoritairement en clinique, au plus près des équipes.",
    skills: [
      "Management de proximité multisite (10 à 40 cliniques)",
      "Accompagnement du changement et diplomatie",
      "Adaptabilité face aux imprévus opérationnels",
      "Communication et écoute active",
      "Culture d'entreprise et fédération d'équipes"
    ],
    successFactors: [
      "Insuffler une dynamique positive fondée sur l'écoute, l'entraide et la bienveillance face aux équipes cliniques.",
      "Assurer le ruissellement des projets siège vers le terrain sans crisper les responsables de site (RH, marketing, finance, outils).",
      "Être un.e ambassadeur.rice de la culture d'entreprise sur le terrain, avec présence physique majoritaire en cliniques."
    ],
    path: [
      "Manager d'équipe multisite (santé animale, santé humaine, retail, services)",
      "Coordinateur.rice Multisite Cliniques Vétérinaires",
      "Directeur.rice Régional.e Cliniques Vétérinaires"
    ],
    missions: [
      "Épauler les responsables de site et les équipes locales (vétérinaires, ASV) dans leurs décisions managériales quotidiennes.",
      "Assurer la transmission et l'appropriation des sujets transverses venant du siège et de la direction de région (RH, marketing, finance, process internes).",
      "Capter les besoins du terrain, apporter des solutions concrètes et réactives, et être le lien de proximité entre les cliniques et le siège."
    ],
    studies: [
      "Docteur.e vétérinaire OU management école de commerce OU expérience équivalente",
      "5-10 ans d'expérience en management multisite (santé animale, santé humaine, retail, services)",
      "Formation continue accompagnement du changement recommandée"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "École de commerce généraliste", "Écoles management"],
    relatedIndustries: [
      "Groupements vétérinaires en croissance et consolidation (AniCura, IVC Evidensia, VetPartners France, Univet, Sévétys, VetOne)",
      "Réseaux cliniques santé humaine (soins premiers, kinésithérapie, radiologie)",
      "Retail et services multisites",
      "Distribution vétérinaire et petshop",
      "Fondations et associations santé animale"
    ],
    sources: [
      { name: "Ordre National des Vétérinaires - Démographie", url: "https://www.veterinaire.fr/" },
      { name: "SNGTV - Groupements Techniques Vétérinaires", url: "https://www.sngtv.org/" },
      { name: "AFVAC - Formations Managériales Vétérinaires", url: "https://www.afvac.com/" }
    ]
  },
  {
    slug: "biotech-chairperson-board-scale-up-life-sciences",
    title: "Président.e du Conseil d'Administration Scale-up Life Sciences",
    salary: "Retainer 15kEUR - 40kEUR/an + BSPCE + D&O",
    salarySource:
      "Package de gouvernance : retainer annuel en numéraire 15-40 k€ + dotation en equity (BSPCE ou actions, % et vesting à définir avec le conseil) alignée sur la création de valeur, prise en charge des frais et assurance responsabilité des mandataires sociaux (RCMS / D&O). Le poids cash vs equity est adapté au stade de la société et à l'implication attendue.",
    sector: "Biotech",
    category: "Gouvernance Chairperson scale-up",
    shortageLevel: "Tres elevee",
    summary:
      "Mandat social non salarié de présidence du conseil d'administration d'une scale-up française Life Sciences en forte croissance internationale (biotech, diagnostic, medtech ou génomique clinique). Rôle stratégique de sparring-partner du CEO, contribution à la crédibilité de la société auprès des investisseurs et facilitation des mises en relation utiles. Implication typique : environ 1 jour par mois plus disponibilité entre les séances, souvent plus intense les premiers mois.",
    skills: [
      "Gouvernance de conseil d'administration et animation des débats",
      "Sparring-partner CEO sans se substituer à l'exécutif",
      "Vision stratégique long terme et alignement parties prenantes",
      "Réseau écosystème pharma, biotech, financeurs et institutionnel",
      "Indépendance de jugement et posture non-polarisante"
    ],
    successFactors: [
      "Présider le conseil et garantir un fonctionnement de gouvernance au plus haut standard.",
      "Contribuer à la crédibilité de la société auprès des investisseurs, partenaires et futurs financeurs.",
      "Soutenir la structuration de la gouvernance dans un contexte de croissance et d'internationalisation (intégration post-acquisition, montée en maturité)."
    ],
    path: [
      "Dirigeant.e ou administrateur.rice indépendant.e Life Sciences",
      "Président.e du Conseil scale-up biotech / diagnostic / medtech",
      "Multi-mandats gouvernance internationale"
    ],
    missions: [
      "Présider le conseil, animer les débats et garantir un fonctionnement de gouvernance au plus haut standard.",
      "Accompagner la vision stratégique et la réussite à long terme de l'entreprise en apportant un regard indépendant, être sparring-partner du CEO.",
      "Veiller à l'alignement des parties prenantes (actionnaires, investisseurs, direction) et faciliter les mises en relation utiles avec l'écosystème pharma, biotech, financeurs ou institutionnel."
    ],
    studies: [
      "Dirigeant.e ou administrateur.rice de haut niveau du secteur Life Sciences (biotech, diagnostic, medtech, pharma ou génomique)",
      "Expérience confirmée de gouvernance (présidence de conseil ou mandats d'administrateur.rice indépendant.e)",
      "Formations spécifiques gouvernance (IFA - Institut Français des Administrateurs) appréciées"
    ],
    schools: ["Grandes écoles + doctorat sciences", "IFA - Institut Français des Administrateurs", "Écoles Life Sciences internationales", "Harvard Business School", "Yale SOM"],
    relatedIndustries: [
      "Scale-ups Life Sciences françaises en internationalisation (biotech, diagnostic, medtech, génomique clinique)",
      "Grands groupes pharma en portefeuille administrateur.rice indépendant.e",
      "Fonds VC/PE santé (Sofinnova, Jeito, Bpifrance, Seventure, Truffle Capital)",
      "Institutions et écosystème (France Biotech, Angels Santé, EIC Fund)",
      "Réseau IFA - Institut Français des Administrateurs"
    ],
    sources: [
      { name: "IFA - Institut Français des Administrateurs", url: "https://www.ifa-asso.com/" },
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "France Invest - Governance VC/PE santé", url: "https://www.franceinvest.eu/" }
    ]
  },
  {
    slug: "veterinary-talent-acquisition-specialist",
    title: "Talent Acquisition Specialist Vétérinaire",
    salary: "40kEUR - 60kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 10-15 % sur volume et qualité de recrutements. Fourchette dépendante du nombre de cliniques à sourcer et du niveau de séniorité (3-8 ans).",
    sector: "Veterinary",
    category: "Talent acquisition vétérinaire",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote le sourcing et le recrutement des vétérinaires, ASV et fonctions support pour un groupement de cliniques vétérinaires en croissance. Fait face à un marché en pénurie structurelle avec 5000 postes vétérinaires non pourvus en France. Doit combiner sourcing digital, marque employeur, réseau sectoriel et process d'entretien optimisés.",
    skills: [
      "Sourcing vétérinaires et ASV (marché en pénurie)",
      "Marque employeur et attractivité multisite",
      "Process recrutement et entretiens structurés",
      "ATS et outils digitaux de recrutement",
      "Compréhension du marché vétérinaire FR (Ordre + SNVEL)"
    ],
    successFactors: [
      "Comprendre les vraies motivations des vétérinaires (autonomie, qualité de vie, formation continue) au-delà du salaire.",
      "Construire un pipeline candidats permanent, pas seulement réactif aux besoins urgents.",
      "Structurer la marque employeur du groupement pour se différencier des concurrents consolidateurs."
    ],
    path: [
      "Chargé.e de recrutement junior santé ou vétérinaire",
      "Talent Acquisition Specialist Vétérinaire",
      "Head of Talent Acquisition groupement / DRH multisite"
    ],
    missions: [
      "Sourcer et recruter les vétérinaires, ASV et fonctions support pour les cliniques du groupement.",
      "Développer la marque employeur du groupement auprès des écoles vétérinaires et sur les canaux digitaux.",
      "Structurer les process d'entretien et de sélection pour garantir qualité et vitesse de recrutement."
    ],
    studies: [
      "Master RH ou Talent Acquisition",
      "3-8 ans d'expérience recrutement (idéalement santé, vétérinaire ou multisite)",
      "Formation continue sourcing digital et marque employeur"
    ],
    schools: ["Écoles RH (IGS, Ciffop, IAE)", "Sciences Po", "Écoles de commerce"],
    relatedIndustries: [
      "Groupements vétérinaires (AniCura, IVC Evidensia, VetPartners France, Univet, Sévétys, VetOne)",
      "Cabinets vétérinaires indépendants en croissance",
      "Réseaux santé humaine multisite (soins primaires, kinésithérapie)",
      "Cabinets de recrutement spécialisés vétérinaire",
      "Écoles vétérinaires (Oniris, VetAgro Sup, ENVT, ENVA) partenariats employabilité"
    ],
    sources: [
      { name: "Ordre National des Vétérinaires - Démographie et tensions", url: "https://www.veterinaire.fr/" },
      { name: "SNVEL - Syndicat National Vétérinaires Exercice Libéral", url: "https://www.snvel.fr/" },
      { name: "Vetstoria Digital Transformation Report", url: "https://www.vetstoria.com/" }
    ]
  },
  {
    slug: "medical-vet-commercial-director-france-animal-nutrition",
    title: "Directeur.rice Commercial.e France Nutrition Animale",
    salary: "85kEUR - 110kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 25-40 % + véhicule + intéressement. Fourchette dépendante de la taille du portefeuille clients (distributeurs, éleveurs, coopératives) et de la marge nette du canal.",
    sector: "Medical Vet",
    category: "Direction commerciale nutrition animale",
    shortageLevel: "Elevee",
    summary:
      "Pilote la direction commerciale France d'une marque de nutrition animale. Développe le réseau de distributeurs, éleveurs directs et coopératives agricoles. Défend la marge canal face à la pression des groupements d'achat. Manage une force de vente terrain de 5 à 20 commerciaux.",
    skills: [
      "Direction commerciale multi-canaux (distributeurs, éleveurs, coopératives)",
      "Négociation grands comptes et coopératives",
      "Management force de vente terrain",
      "Pilotage marge nette et pricing",
      "Connaissance filière nutrition animale (bovin, porc, volaille, aqua)"
    ],
    successFactors: [
      "Naviguer les circuits de décision complexes des coopératives et centrales d'achat.",
      "Fédérer une force de vente terrain autonome sur des territoires étendus.",
      "Défendre la marge canal face à la pression des acheteurs concentrés."
    ],
    path: [
      "Responsable commercial régional ou KAM Nutrition Animale",
      "Directeur.rice Commercial.e France Nutrition Animale",
      "Country Manager France ou VP Sales Europe"
    ],
    missions: [
      "Piloter la stratégie commerciale France de la marque nutrition animale sur ses canaux distributeurs, éleveurs et coopératives.",
      "Manager la force de vente terrain (5 à 20 commerciaux régionaux) et les key account managers.",
      "Négocier les contrats-cadres avec les coopératives, centrales d'achat et grands distributeurs, en défendant la marge nette."
    ],
    studies: [
      "Docteur.e vétérinaire OU ingénieur.e agri / agro OU école de commerce",
      "10-15 ans d'expérience commerciale nutrition animale ou secteurs adjacents (santé animale, coopératives)",
      "MBA ou formation continue direction commerciale appréciés"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "UniLaSalle Rouen", "AgroParisTech", "Institut Agro Montpellier", "HEC / ESSEC", "Harvard Business School"],
    relatedIndustries: [
      "Nutrition animale (Sanders, InVivo, Cargill, Neovia/ADM, Provimi)",
      "Coopératives agricoles (Terrena, Agrial, Triskalia/Eureden)",
      "Laboratoires santé animale (Boehringer Ingelheim, MSD, Zoetis, Ceva)",
      "Distribution vétérinaire et petshop",
      "Génétique animale (Grimaud, Hendrix Genetics)"
    ],
    sources: [
      { name: "IDELE - Institut de l'Élevage", url: "https://idele.fr/" },
      { name: "IFIP - Institut du Porc", url: "https://ifip.asso.fr/" },
      { name: "ITAVI - Institut Technique de l'Aviculture", url: "https://www.itavi.asso.fr/" }
    ]
  },
  {
    slug: "medical-vet-growth-marketing-crm-manager",
    title: "Growth Marketing & CRM Manager Santé Animale",
    salary: "55kEUR - 85kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 10-20 % sur objectifs acquisition/rétention. Fourchette dépendante du périmètre (agence formation, petfood, éditeur SaaS santé animale) et de la maturité data.",
    sector: "Medical Vet",
    category: "Growth marketing et CRM santé animale",
    shortageLevel: "Elevee",
    summary:
      "Pilote la stratégie growth marketing et CRM d'une agence de formation, d'une marque petfood ou d'un éditeur SaaS santé animale. Structure l'acquisition digitale, la rétention client et l'exploitation data pour maximiser la marge brute et le LTV.",
    skills: [
      "Growth marketing acquisition et rétention",
      "CRM et marketing automation (HubSpot, Salesforce, Brevo)",
      "Data et analytics (GA4, dashboards)",
      "Content marketing et lead nurturing",
      "Compréhension écosystème santé animale et vétérinaire"
    ],
    successFactors: [
      "Combiner rigueur data et créativité éditoriale pour parler aux vétérinaires et professionnels.",
      "Structurer la CRM discipline (segmentation, lifecycle, scoring) sans over-engineering.",
      "Piloter la marge brute et le LTV, pas juste le volume de leads."
    ],
    path: [
      "Chargé.e marketing digital ou CRM junior",
      "Growth Marketing & CRM Manager Santé Animale",
      "Head of Marketing / VP Marketing scale-up santé animale"
    ],
    missions: [
      "Piloter l'acquisition digitale (SEO, SEA, LinkedIn Ads, partenariats) sur les cibles vétérinaires et professionnels santé animale.",
      "Structurer la CRM et l'automation marketing (segmentation clients, campagnes nurturing, réactivation).",
      "Suivre et optimiser les KPIs growth (CAC, LTV, taux de conversion) et exploiter la data pour piloter la stratégie."
    ],
    studies: [
      "École de commerce ou ingénieur avec spécialisation marketing digital",
      "5-10 ans d'expérience growth marketing + CRM (idéalement B2B ou santé animale)",
      "Certifications HubSpot / Salesforce / GA4 appréciées"
    ],
    schools: ["HEC / ESSEC / ESCP", "École de commerce généraliste", "Sciences Po", "Écoles ingénieur avec spécialisation marketing"],
    relatedIndustries: [
      "Agences formation santé animale",
      "Marques petfood premium et challenger",
      "Éditeurs SaaS santé animale (PMS cliniques, télémédecine, workflow)",
      "Laboratoires santé animale (marketing digital)",
      "Startups IA santé animale"
    ],
    sources: [
      { name: "E-learning Letter - Média spécialisé digital learning", url: "https://www.e-learning-letter.com/" },
      { name: "Culture RH - Média spécialisé RH", url: "https://culture-rh.com/" },
      { name: "AnimalhealthEurope - Federation industrie AH", url: "https://www.animalhealtheurope.eu/" }
    ]
  },
  {
    slug: "biotech-group-cfo-pre-ipo",
    title: "Group CFO Biotech Series pré-IPO",
    salary: "150kEUR - 220kEUR + variable + LTI + equity",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 30-50 % + LTI stock-options significatives (2-5 % capital vesting) pour phase pré-IPO. Fourchette dépendante de la taille du groupe (100 à 500 collaborateurs) et de la roadmap capital markets.",
    sector: "Biotech",
    category: "Direction financière groupe pré-IPO",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la direction financière d'un groupe biotech en phase pré-IPO (levée Series C+, croissance externe, structuration capital markets). Interface board + investisseurs + banques d'affaires. Structure les rounds de financement, pilote le cash burn, prépare l'IPO ou la sortie M&A.",
    skills: [
      "Direction financière groupe biotech international",
      "Structuration levées Series C+ et préparation IPO",
      "M&A et due diligence buy-side",
      "Reporting board et investisseurs institutionnels",
      "Anglais courant obligatoire (interface banques d'affaires US/UK)"
    ],
    successFactors: [
      "Naviguer les exigences des investisseurs institutionnels et des marchés capitaux sans crisper l'organisation.",
      "Piloter le cash burn tout en préservant la vélocité R&D et clinique.",
      "Structurer la finance pour supporter simultanément la croissance organique, la M&A et la préparation IPO."
    ],
    path: [
      "CFO biotech Series B",
      "Group CFO Biotech Series pré-IPO",
      "CFO listed biotech ou Chief Financial Officer big pharma"
    ],
    missions: [
      "Piloter la direction financière du groupe biotech en phase pré-IPO (finance, contrôle de gestion, trésorerie, taxation).",
      "Structurer les rounds de financement Series C+ et préparer l'IPO ou la sortie M&A avec banques d'affaires.",
      "Assurer le reporting board, investisseurs et régulateurs (préparation prospectus, roadshow, etc.)."
    ],
    studies: [
      "École de commerce grande école (HEC, ESSEC, ESCP, INSEAD) ou école d'ingénieur + MBA",
      "15+ ans d'expérience finance dont 8+ en direction financière biotech / life sciences",
      "Expérience IPO ou M&A confirmée"
    ],
    schools: ["HEC", "ESSEC", "ESCP", "INSEAD", "Sciences Po", "Écoles ingénieur + MBA", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: [
      "Biotech scale-up en phase Series C+ / pré-IPO",
      "Groupes pharma en croissance externe",
      "Fonds VC/PE santé (Sofinnova, Jeito, Bpifrance, Seventure, Truffle Capital)",
      "Banques d'affaires spécialisées Life Sciences (Rothschild, Bryan Garnier, Portzamparc)",
      "Big Four audit et transaction advisory (EY, PwC, KPMG, Deloitte)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Bpifrance - Biotech & Medtech VC funds", url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/" },
      { name: "Leaders League - Fonds santé France 2025", url: "https://www.leadersleague.com/fr/classements/sante-pharma-and-biotechnologies-fonds-lbo-sante-fonds-d-investissement-france-2025" }
    ]
  },
  {
    slug: "biotech-plant-director-gmp-bpf",
    title: "Plant Director BPF / GMP Biotech-Pharma",
    salary: "110kEUR - 160kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 20-30 % + LTI selon la taille du groupe. Fourchette dépendante de la taille du site (50 à 400 collaborateurs), de la complexité produit (stérile / non stérile) et des inspections FDA / EMA.",
    sector: "Biotech",
    category: "Direction industrielle GMP",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote un site de production biotech-pharma en environnement BPF (bonnes pratiques de fabrication) / GMP (Good Manufacturing Practice). Responsable production, qualité, EHS, HR site et budget. Interface autorités (ANSM, EMA, FDA) sur les inspections et les mises à jour de dossier CMC.",
    skills: [
      "Direction site industriel biotech-pharma BPF / GMP",
      "Environnement stérile ou aseptique (fill and finish, biologics)",
      "Interface autorités réglementaires (ANSM, EMA, FDA)",
      "Management de site 50-400 collaborateurs",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Maintenir un site en conformité BPF / GMP en continu, y compris pendant les scale-ups et modifications process.",
      "Anticiper les inspections FDA / EMA plutôt que les subir.",
      "Piloter production + qualité + EHS + HR + budget sans crisper les équipes techniques."
    ],
    path: [
      "Head of Production ou Head of Manufacturing biotech",
      "Plant Director BPF / GMP Biotech-Pharma",
      "VP Manufacturing Europe ou Chief Manufacturing Officer"
    ],
    missions: [
      "Piloter la production biotech-pharma en environnement BPF / GMP (batch release, capacité, planning industriel).",
      "Garantir la conformité qualité, EHS et réglementaire du site (inspections ANSM, EMA, FDA).",
      "Manager le site (production, qualité, maintenance, EHS, HR) et le budget opérationnel."
    ],
    studies: [
      "Ingénieur.e génie industriel, chimie ou pharmaceutique",
      "15+ ans d'expérience industrielle biotech-pharma dont 5+ en direction de site",
      "Formation continue BPF / GMP et scale-up biotech"
    ],
    schools: ["Écoles ingénieur (Centrale, Mines, ENSIC, Chimie ParisTech)", "AgroParisTech", "Écoles pharma (Paris, Strasbourg)"],
    relatedIndustries: [
      "Biotech en phase industrielle (Sanofi, Servier, Ipsen, Boehringer Ingelheim, GSK)",
      "CDMO biotech (Delpharm, Fareva, Recipharm)",
      "Vaccins vétérinaires (site GMP)",
      "Bioproduction (Faircraft, Enterome, Maat Pharma)",
      "Sites production petfood industriel (moindre criticité mais process similaire)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "LEEM - Les Entreprises du Médicament", url: "https://www.leem.org/" },
      { name: "EMA - GMP guidelines", url: "https://www.ema.europa.eu/en/human-regulatory/research-development/compliance/good-manufacturing-practice" }
    ]
  },
  {
    slug: "biotech-head-of-engineering-lab-operations",
    title: "Head of Engineering & Lab Operations Biotech Scale-up",
    salary: "90kEUR - 140kEUR + variable + BSPCE",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 15-25 % + BSPCE ou stock-options (0.5-2 % capital) pour scale-up deeptech biotech. Fourchette dépendante de la taille de l'équipe (10 à 50 ingénieurs) et de la maturité technologique.",
    sector: "Biotech",
    category: "Direction ingénierie et lab operations",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote l'ingénierie et les opérations laboratoire d'une scale-up biotech deeptech (bioproduction, gene therapy, synthetic biology). Assure la scalabilité des procédés du bench vers le pilote, puis vers l'industrialisation. Manage les ingénieurs bioproduction, automation et lab operations.",
    skills: [
      "Direction ingénierie biotech scale-up",
      "Scale-up procédés bioproduction (bench → pilote → industriel)",
      "Automation laboratoire et bioréacteurs",
      "Management ingénieurs et scientifiques 10-50 personnes",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Faire dialoguer science R&D et ingénierie industrielle sans compromis.",
      "Anticiper les goulots d'étranglement scale-up avant qu'ils bloquent le programme clinique.",
      "Fédérer une équipe hybride ingénieurs + scientifiques + techniciens autour d'une vision produit claire."
    ],
    path: [
      "Ingénieur.e bioproduction senior ou Head of Bioengineering",
      "Head of Engineering & Lab Operations Biotech Scale-up",
      "VP Engineering ou Chief Manufacturing Officer"
    ],
    missions: [
      "Piloter l'ingénierie et les opérations laboratoire de la scale-up biotech (bioproduction, automation, lab management).",
      "Scaler les procédés du bench vers le pilote puis vers l'industrialisation en préservant la robustesse.",
      "Manager les équipes ingénieurs et scientifiques, arbitrer les priorités techniques avec la R&D et la clinique."
    ],
    studies: [
      "Ingénieur.e biotechnologies, génie des procédés ou bioingénierie",
      "10-15 ans d'expérience scale-up biotech dont 5+ en management",
      "Doctorat ou expérience académique de haut niveau appréciés"
    ],
    schools: ["Écoles ingénieur (Centrale, Mines, INSA, AgroParisTech, ENSIC)", "Universités biotechnologies (Paris-Saclay, Strasbourg)"],
    relatedIndustries: [
      "Biotech deeptech scale-up (Faircraft, Standing Ovation, Enterome, Maat Pharma)",
      "Bioproduction et biofabs (Servier Bioproduction, Sanofi Bioproduction)",
      "Startups synthetic biology et gene therapy",
      "CDMO biotech spécialisés",
      "Instituts de recherche transitionnelle (Institut Pasteur, INRAE, CNRS)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Bpifrance Le Hub - Biotech scale-up", url: "https://lehub.bpifrance.fr/" },
      { name: "EIC Fund - European Innovation Council", url: "https://eic.ec.europa.eu/eic-fund_en" }
    ]
  },
  {
    slug: "medtech-cto-startup-scale-up",
    title: "CTO MedTech Startup / Scale-up",
    salary: "120kEUR - 180kEUR + variable + BSPCE",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 20-30 % + BSPCE ou equity (1-4 % capital vesting) selon stade Series A/B/C. Fourchette dépendante de la nature du produit (dispositif médical connecté, IA médicale, robotique).",
    sector: "Diagnostic",
    category: "Direction technique MedTech",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la direction technique d'une startup ou scale-up medtech (dispositif médical connecté, IA médicale, robotique chirurgicale, imagerie). Responsable roadmap produit, architecture logicielle et hardware, conformité MDR / IVDR, sécurité (cybersecurité device) et management équipe engineering.",
    skills: [
      "Direction technique medtech (software + hardware + regulatory)",
      "Conformité MDR / IVDR / FDA 510k",
      "Cybersécurité dispositifs médicaux connectés",
      "Management équipe engineering 10-50 personnes",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Naviguer les contraintes réglementaires (MDR, IVDR, FDA) sans étouffer l'innovation produit.",
      "Piloter simultanément le roadmap produit et la conformité qualité du système de gestion (ISO 13485).",
      "Recruter et retenir des ingénieurs seniors dans un marché medtech FR ultra-tendu."
    ],
    path: [
      "Head of Engineering ou VP Engineering medtech",
      "CTO MedTech Startup / Scale-up",
      "CTO groupe medtech international ou Chief Product Officer"
    ],
    missions: [
      "Piloter la direction technique de la medtech (roadmap produit, architecture software + hardware, sécurité).",
      "Garantir la conformité réglementaire (MDR, IVDR, FDA) et le système de management de la qualité (ISO 13485).",
      "Manager l'équipe engineering, définir la stratégie tech et arbitrer les priorités avec le CEO et le board."
    ],
    studies: [
      "École ingénieur (informatique, électronique, biomédical)",
      "12-18 ans d'expérience tech dont 5+ en direction technique medtech",
      "Master ou doctorat en sciences biomédicales appréciés"
    ],
    schools: ["Écoles ingénieur (Polytechnique, Centrale, Mines, Telecom Paris, ENS)", "EPITA", "Master biomédical", "MIT Sloan"],
    relatedIndustries: [
      "Startups medtech connectées (UroMems, SonoMind, Lucis, RDS, Lifebloom)",
      "Scale-ups IA médicale (Owkin, Waiv, SquareMind, imagerie)",
      "Robotique chirurgicale (Moon Surgical, Squair)",
      "Dispositifs médicaux implantables (Sorin, Carmat)",
      "Diagnostic in vitro digitalisé (bioMérieux Digital, HalioDx)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "SIDIV - Syndicat de l'Industrie du Diagnostic In Vitro", url: "https://sidiv.fr/" },
      { name: "EMA - Medical Devices Regulation", url: "https://www.ema.europa.eu/en/human-regulatory/overview/medical-devices" }
    ]
  },
  {
    slug: "medtech-international-growth-lead",
    title: "International Growth Lead HealthTech / MedTech",
    salary: "90kEUR - 140kEUR + variable + LTI",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 25-40 % + LTI selon atteinte objectifs pays. Fourchette dépendante du nombre de pays cibles (3 à 10) et de la maturité produit sur le marché.",
    sector: "Diagnostic",
    category: "Développement international HealthTech",
    shortageLevel: "Elevee",
    summary:
      "Pilote le développement international d'une scale-up medtech ou healthtech en phase d'expansion. Ouvre les nouveaux marchés (EU, UK, US, Middle East, Asia), structure les filiales ou partenariats distributeurs, adapte le go-to-market par géographie. Interface board sur la stratégie geographique.",
    skills: [
      "Développement international multi-géographies",
      "Structuration filiales et partenariats distributeurs",
      "Go-to-market adapté par pays (regulatory + commercial)",
      "Négociation contrats distribution et licensing internationaux",
      "Anglais courant obligatoire, autres langues appréciées"
    ],
    successFactors: [
      "Naviguer les spécificités réglementaires, culturelles et commerciales de chaque géographie.",
      "Structurer les partenariats distributeurs sans dépendance excessive (ne pas céder trop d'exclusivité trop vite).",
      "Piloter la croissance internationale sans consommer excessivement le cash de la scale-up."
    ],
    path: [
      "Country Manager ou Business Development International medtech",
      "International Growth Lead HealthTech / MedTech",
      "VP International ou Chief Commercial Officer"
    ],
    missions: [
      "Piloter le développement international de la medtech (identification pays cibles, entry strategy, structuration commerciale).",
      "Ouvrir les nouveaux marchés via filiales, partenariats distributeurs ou joint-ventures selon la géographie.",
      "Adapter le go-to-market par pays (regulatory + pricing + partenariats) et piloter la performance des filiales."
    ],
    studies: [
      "École de commerce grande école ou ingénieur avec MBA",
      "10-15 ans d'expérience internationale dont 5+ en scale-up healthtech / medtech",
      "Expérience opérationnelle plusieurs pays (EU + US + Asie ou Middle East)"
    ],
    schools: ["HEC", "ESSEC", "ESCP", "INSEAD", "Écoles ingénieur + MBA", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: [
      "Scale-ups medtech en internationalisation (UroMems, SonoMind, RDS, Lifebloom)",
      "Scale-ups healthtech (Doctolib, Alan, Withings)",
      "Groupes medtech internationaux (Envista, Boston Scientific, Stryker)",
      "Diagnostic IVD international (bioMérieux, Roche Diagnostics, Abbott)",
      "Fonds VC/PE growth santé (Sofinnova Growth, Kurma Partners)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Business France - Export santé", url: "https://www.businessfrance.fr/" },
      { name: "France HealthCare - Ecosystème export", url: "https://www.francehealthcare.fr/" }
    ]
  },
  {
    slug: "biotech-ceo-scale-up",
    title: "CEO Scale-up Biotech",
    salary: "180kEUR - 320kEUR + variable + stock-options",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 40-60 % sur milestones cliniques/business + stock-options significatives (2-6 % capital vesting 4 ans). Fourchette dépendante du stade (Series A à pré-IPO) et de la taille de l'équipe (20 à 300 collaborateurs).",
    sector: "Biotech",
    category: "Direction générale scale-up biotech",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la direction générale d'une scale-up biotech en phase Series A à Series C+ (5 à 300 collaborateurs). Responsable stratégie, board management, levées de fonds, roadmap R&D et clinique, partenariats industriels, structuration COMEX. Interface investisseurs institutionnels + KOL scientifiques + autorités réglementaires.",
    skills: [
      "Direction générale scale-up biotech multi-phases (Series A à pré-IPO)",
      "Board management et levée de fonds (Series B, C, pré-IPO, IPO)",
      "Partenariats industriels (licensing, co-développement, M&A)",
      "Vision scientifique et compréhension roadmap R&D / clinique",
      "Anglais courant obligatoire (interface investisseurs + KOL internationaux)"
    ],
    successFactors: [
      "Naviguer simultanément la vision scientifique long terme et l'exécution business court terme.",
      "Construire une relation de confiance solide avec le board et les investisseurs institutionnels.",
      "Attirer et retenir les talents C-level (CSO, CFO, CMO, VP Manufacturing) dans un marché ultra-tendu."
    ],
    path: [
      "COO ou VP scale-up biotech + expérience opérationnelle senior",
      "CEO Scale-up Biotech Series A/B",
      "CEO biotech listed ou Chairman board"
    ],
    missions: [
      "Piloter la direction générale de la scale-up biotech (stratégie, exécution, board, investisseurs).",
      "Structurer les levées de fonds Series B/C/pré-IPO et les partenariats industriels (licensing, co-développement).",
      "Recruter et manager le COMEX (CSO, CFO, CMO, VP Manufacturing) et interfacer les KOL scientifiques internationaux."
    ],
    studies: [
      "Docteur.e (PhD sciences ou MD) ET/OU MBA grande école",
      "15+ ans d'expérience biotech dont 5+ en direction générale ou COMEX C-level",
      "Réseau scientifique et VC internationalement établi"
    ],
    schools: ["Doctorat sciences (Paris-Saclay, Strasbourg, Institut Pasteur)", "MBA (HEC, INSEAD, Wharton, Stanford, Harvard)", "Harvard Business School", "MIT Sloan", "Yale SOM"],
    relatedIndustries: [
      "Scale-ups biotech en phase Series A à pré-IPO (Nanobiotix, Sensorion, Adcytherix, Cyllène, Bionyra)",
      "Groupes pharma en spin-out biotech",
      "Instituts de recherche transitionnelle (Institut Pasteur, INRAE, CNRS)",
      "Fonds VC/PE santé (Sofinnova, Jeito, Bpifrance, Seventure, Truffle Capital)",
      "Big Pharma en partenariats et licensing"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Bpifrance - Biotech & Medtech VC funds", url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/" },
      { name: "Leaders League - Fonds santé France 2025", url: "https://www.leadersleague.com/fr/classements/sante-pharma-and-biotechnologies-fonds-lbo-sante-fonds-d-investissement-france-2025" }
    ]
  },
  {
    slug: "biotech-coo-scale-up",
    title: "COO Scale-up Biotech / MedTech",
    salary: "150kEUR - 230kEUR + variable + LTI",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 30-45 % + LTI stock-options (1-3 % capital). Fourchette dépendante du périmètre (industrialisation, supply chain, HR, finance) et de la maturité de l'organisation.",
    sector: "Biotech",
    category: "Direction opérations scale-up",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote les opérations transverses d'une scale-up biotech ou medtech (industrialisation, supply chain, HR, IT, facility). Bras droit du CEO sur l'exécution opérationnelle. Structure les process, met en place le reporting, prépare l'organisation à la prochaine phase de croissance (Series C+, IPO, internationalisation).",
    skills: [
      "Direction opérations transverses scale-up (industrialisation + supply + HR + IT)",
      "Structuration process et reporting scale-up",
      "Management d'équipe multi-fonctions 50-300 personnes",
      "Interface CEO et board sur l'exécution opérationnelle",
      "Anglais courant obligatoire"
    ],
    successFactors: [
      "Structurer les process sans étouffer la culture entrepreneuriale de la scale-up.",
      "Anticiper les besoins organisationnels 12-18 mois avant qu'ils bloquent la croissance.",
      "Être un vrai bras droit du CEO sans se substituer à lui.elle sur la stratégie."
    ],
    path: [
      "VP Operations ou Head of Operations scale-up",
      "COO Scale-up Biotech / MedTech",
      "CEO scale-up ou COO groupe international"
    ],
    missions: [
      "Piloter les opérations transverses de la scale-up (industrialisation, supply chain, HR, IT, facility).",
      "Structurer les process et le reporting pour supporter la croissance (Series C+, IPO, internationalisation).",
      "Manager les directeurs.rices de fonction support et interfacer le CEO + le board sur l'exécution opérationnelle."
    ],
    studies: [
      "École ingénieur ou école de commerce + MBA apprécié",
      "12-18 ans d'expérience opérations dont 5+ en scale-up biotech ou medtech",
      "Expérience internationale multi-pays appréciée"
    ],
    schools: ["Écoles ingénieur (Centrale, Mines, Polytechnique)", "HEC", "ESSEC", "INSEAD", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: [
      "Scale-ups biotech en phase Series B à pré-IPO",
      "Scale-ups medtech en industrialisation",
      "Groupes pharma en spin-out",
      "CDMO biotech (Delpharm, Fareva, Recipharm)",
      "Cabinets conseil opérations Life Sciences (McKinsey, BCG, Bain)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "LEEM - Les Entreprises du Médicament", url: "https://www.leem.org/" },
      { name: "Bpifrance Le Hub - Biotech scale-up", url: "https://lehub.bpifrance.fr/" }
    ]
  },
  {
    slug: "life-sciences-chro-scale-up",
    title: "DRH Scale-up Life Sciences / Animal Health",
    salary: "120kEUR - 180kEUR + variable + LTI",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 25-35 % + LTI stock-options (0.5-2 % capital). Fourchette dépendante de la taille de l'organisation (50 à 300 collaborateurs) et de la phase (Series B à pré-IPO).",
    sector: "Biotech",
    category: "Direction RH scale-up Life Sciences",
    shortageLevel: "Tres elevee",
    summary:
      "Pilote la direction des ressources humaines d'une scale-up Life Sciences ou Animal Health en croissance rapide (0 → 50 → 200+ collaborateurs). Structure la culture d'entreprise, les process RH, la marque employeur, la rémunération et la rétention des talents clés. Interface board sur la structuration People.",
    skills: [
      "Direction RH scale-up en hypercroissance",
      "Structuration culture d'entreprise et marque employeur",
      "Rémunération C-level et systèmes stock-options / BSPCE",
      "Rétention des talents clés post-levée (vesting, career pathing)",
      "Interface board et investisseurs sur les enjeux people"
    ],
    successFactors: [
      "Structurer les process RH sans étouffer la culture entrepreneuriale founder-led.",
      "Anticiper les tensions salariales et de rétention post-levée (guerre des talents).",
      "Construire une marque employeur qui attire les talents seniors des Big Pharma / Big Groups."
    ],
    path: [
      "HR Business Partner senior ou Head of HR scale-up",
      "DRH Scale-up Life Sciences / Animal Health",
      "DRH groupe international ou Chief People Officer listed company"
    ],
    missions: [
      "Piloter la direction RH de la scale-up (recrutement, rémunération, formation, culture, mobility).",
      "Structurer les process RH et la marque employeur pour supporter la croissance (0 → 200+ collaborateurs).",
      "Interfacer le board et le CEO sur les enjeux people (rétention talents clés, stock-options, structuration COMEX)."
    ],
    studies: [
      "Master RH ou école de commerce avec spécialisation RH",
      "12-18 ans d'expérience RH dont 5+ en scale-up biotech / medtech / healthtech ou Animal Health",
      "Formation continue rémunération C-level et systèmes equity appréciée"
    ],
    schools: ["HEC", "ESSEC", "ESCP", "Sciences Po", "IGS", "Ciffop", "IAE", "Harvard Business School", "Yale SOM"],
    relatedIndustries: [
      "Scale-ups biotech en phase Series B à pré-IPO",
      "Scale-ups medtech et healthtech en internationalisation",
      "Groupements vétérinaires en consolidation (AniCura, IVC Evidensia, VetPartners, Univet, Sévétys)",
      "Marques petfood en hypercroissance premium",
      "Big Pharma / Groupes santé animale (vivier candidats RH senior)"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "Culture RH - Média spécialisé RH", url: "https://culture-rh.com/" },
      { name: "Aon - Benchmarks de rémunération", url: "https://www.aon.com/" }
    ]
  },
  {
    slug: "biotech-technical-sales-engineer-ingredients",
    title: "Ingénieur.e Technico-Commercial.e Ingrédients Biotech",
    salary: "55kEUR - 80kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable 15-25 % + véhicule. Fourchette dépendante de la région (Sud-Ouest, Grand Ouest, Île-de-France) et du portefeuille clients biotech-pharma.",
    sector: "Biotech",
    category: "Technico-commercial ingrédients biotech",
    shortageLevel: "Elevee",
    summary:
      "Pilote la relation technico-commerciale entre un fabricant d'ingrédients biotech (probiotiques, prébiotiques, actifs cosmétiques, ferments) et ses clients biotech-pharma et cosmétique. Combine expertise scientifique de l'ingrédient et posture commerciale terrain. Poste itinérant régional.",
    skills: [
      "Technico-commercial ingrédients biotech (probiotiques, prébiotiques, actifs)",
      "Interface clients formulation biotech-pharma et cosmétique",
      "Négociation contrats et prix ingrédients",
      "Support technique et formation clients",
      "Français et anglais professionnels"
    ],
    successFactors: [
      "Être crédible scientifiquement face aux équipes R&D et formulation clientes.",
      "Combiner posture technique (support formulation) et posture commerciale (croissance CA région).",
      "Développer un portefeuille clients biotech-pharma sans négliger le retour d'information vers la R&D interne."
    ],
    path: [
      "Ingénieur.e formulation ou R&D biotech-cosmétique",
      "Ingénieur.e Technico-Commercial.e Ingrédients Biotech",
      "Key Account Manager ou Directeur.rice Commercial.e Ingrédients"
    ],
    missions: [
      "Développer et fidéliser un portefeuille clients biotech-pharma et cosmétique sur une région donnée.",
      "Assurer le support technique et la formation clients sur les ingrédients biotech (probiotiques, prébiotiques, actifs).",
      "Remonter le feedback marché structuré à la R&D et au marketing produit."
    ],
    studies: [
      "Ingénieur.e biotechnologies, chimie ou pharmacie",
      "3-8 ans d'expérience technico-commerciale ingrédients biotech ou cosmétique",
      "Formation continue vente technique appréciée"
    ],
    schools: ["Écoles ingénieur biotech (ENSTBB, ESIL, ENSAIA)", "Chimie ParisTech", "AgroParisTech"],
    relatedIndustries: [
      "Fabricants ingrédients biotech (Lesaffre, Roquette, Solabia, Biokar, Adisseo)",
      "Actifs cosmétiques (Silab, Codif, Naolys, Lucas Meyer)",
      "Ferments et probiotiques (Danisco, IFF Health, Lallemand)",
      "Biotech clients formulation (labs formulation biotech-cosmétique)",
      "Distributeurs ingrédients spécialisés"
    ],
    sources: [
      { name: "France Biotech - Panorama HealthTech", url: "https://france-biotech.fr/" },
      { name: "France Chimie - Fédération industrie chimie", url: "https://www.francechimie.fr/" },
      { name: "COSMED - Association filière cosmétique", url: "https://www.cosmed.fr/" }
    ]
  }
];

const august2026ChloeBatchDate = "2026-08-27";

const august2026ChloeBatch: JobRole[] = [
  {
    slug: "head-of-marketing-petfood-premium",
    title: "Head of Marketing Petfood Premium",
    seoTitle: "Head of Marketing Petfood Premium : salaire 100-140 K€, missions | SKS",
    seoDescription:
      "Fiche metier Head of Marketing Petfood Premium : brand building, trade, digital, salaire 100-140 K€, formations. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "100kEUR - 140kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 15-20 % du fixe et LTI 5-10 % en supplement selon la taille du groupe et la trajectoire de la marque. Fourchette calibree pour un.e directeur.rice marketing petfood pilotant 5-10 personnes sur des marques premium (fresh food, sans cereales, insectes).",
    sector: "Petfood",
    category: "Direction marketing",
    shortageLevel: "Elevee",
    summary:
      "Dirige la strategie marketing des marques premium petfood, orchestre brand building, trade et digital, et pilote une equipe marketing 5-10 personnes pour installer la preference d'achat.",
    skills: [
      "Brand building premium (fresh food, sans cereales, insectes)",
      "Trade marketing GMS et retail specialise",
      "Digital, e-commerce et data marketing",
      "P&L marque et pilotage media mix",
      "Management d'equipe marketing 5-10 personnes"
    ],
    successFactors: [
      "Trouver l'equilibre entre logique premium et exigences retail multi-canal.",
      "Faire dialoguer brand, trade, digital et R&D sans siloter les roadmaps.",
      "Transformer les insights animaux et humains en positionnement lisible en rayon."
    ],
    path: [
      "Brand manager senior",
      "Marketing director marque",
      "Head of marketing groupe petfood"
    ],
    missions: [
      "Definir la strategie marketing des marques premium et arbitrer le portefeuille.",
      "Piloter brand building, trade GMS et animalerie, digital et e-commerce.",
      "Manager une equipe 5-10 personnes (brand, trade, digital, insights).",
      "Suivre le P&L marque, arbitrer media mix et innovations avec R&D et supply.",
      "Preparer les revues comex et defendre les investissements marketing."
    ],
    studies: [
      "Ecole de commerce ou master marketing",
      "8-15 ans d'experience marketing FMCG premium ou petfood",
      "Anglais courant obligatoire pour groupes internationaux"
    ],
    schools: ["HEC Paris", "ESSEC", "ESCP", "EDHEC", "EM Lyon", "AgroParisTech", "Institut Agro Rennes-Angers", "Harvard Business School"],
    relatedIndustries: [
      "Groupes petfood premium (Mars Petcare, Nestle Purina, Affinity, United Petfood)",
      "Marques challenger fresh food et sans cereales (Edgard Cooper, Tomojo, Ultra Premium Direct, Hector Kitchen)",
      "FMCG premium alimentaire humain (transferts frequents)",
      "Retail specialise animalerie et pure players e-commerce",
      "Agences media, brand et data marketing"
    ],
    sources: [
      { name: "FACCO - Federation des fabricants d'aliments pour animaux familiers", url: "https://www.facco.fr/" },
      { name: "PROMOJARDIN - Marche petfood specialise", url: "https://www.promojardin.com/" }
    ]
  },
  {
    slug: "head-of-innovation-petfood",
    title: "Head of Innovation Petfood",
    seoTitle: "Head of Innovation Petfood : salaire 110-150 K€, missions R&D | SKS",
    seoDescription:
      "Fiche metier Head of Innovation Petfood : pipeline produits premium, claims scientifiques, sourcing durable, salaire 110-150 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "110kEUR - 150kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 20 % du fixe. Fourchette dependante de la taille du groupe, du perimetre R&D + go-to-market et du nombre de marches couverts.",
    sector: "Petfood",
    category: "Direction innovation",
    shortageLevel: "Tres elevee",
    summary:
      "Porte la strategie innovation petfood a l'articulation R&D et go-to-market : pipeline produits premium, claims scientifiques defendables, sourcing durable et pilotage transversal avec marketing, qualite et supply.",
    skills: [
      "Pipeline innovation produit multi-annee",
      "Nutrition animale et formulation premium",
      "Claims scientifiques et defense reglementaire",
      "Sourcing durable (proteines alternatives, insectes, sous-produits valorises)",
      "Go-to-market et co-construction avec marketing"
    ],
    successFactors: [
      "Etre a l'aise entre logique scientifique, contraintes industrielles et logique de marque.",
      "Prioriser les projets a fort potentiel plutot que multiplier les initiatives.",
      "Savoir defendre un claim face au marketing, aux autorites et aux distributeurs."
    ],
    path: [
      "R&D manager ou nutrition scientist senior",
      "Innovation manager petfood",
      "Head of innovation ou VP innovation"
    ],
    missions: [
      "Definir la roadmap innovation 3-5 ans et arbitrer le portefeuille projets.",
      "Piloter la generation d'idees, la validation scientifique et le time-to-market.",
      "Structurer une politique de sourcing durable (insectes, algues, proteines alternatives).",
      "Aligner claims scientifiques avec marketing, reglementaire et service clients.",
      "Manager une equipe innovation R&D transverse et piloter les partenariats externes."
    ],
    studies: [
      "Ingenieur.e agro ou nutrition",
      "Doctorat nutrition animale ou sciences du vivant apprecie",
      "10-15 ans d'experience R&D ou innovation petfood / nutrition animale"
    ],
    schools: ["AgroParisTech", "Institut Agro Rennes-Angers", "Institut Agro Montpellier", "ENSAIA", "Oniris", "MIT Sloan", "Harvard Business School"],
    relatedIndustries: [
      "Petfood premium (Mars Petcare, Nestle Purina, Hill's, Affinity, United Petfood)",
      "Marques fresh food et clean label (Edgard Cooper, Tomojo, Yora, Hector Kitchen)",
      "Ingredientistes petfood (Diana Pet Food / Symrise, ADM, Kemin)",
      "Startups proteines alternatives (Innovafeed, Ynsect, Entobel)",
      "Instituts techniques (Anses, INRAE, Adisseo R&D)"
    ],
    sources: [
      { name: "FACCO - Marche petfood France", url: "https://www.facco.fr/" },
      { name: "FEFAC - Federation europeenne alimentation animale", url: "https://fefac.eu/" }
    ]
  },
  {
    slug: "cfo-petfood-group",
    title: "CFO Groupe Petfood",
    seoTitle: "CFO Groupe Petfood : salaire 130-180 K€, missions M&A IPO prep | SKS",
    seoDescription:
      "Fiche metier CFO Groupe Petfood : pilotage finance groupe 100-500 M€, M&A, refinancement, reporting international. Salaire 130-180 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "130kEUR - 180kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable STI cible 20-30 % du fixe et LTI 10-20 % (actions, phantom, MEP). Fourchette dependante de la taille du groupe (100-500 M€ CA), du perimetre international et de la trajectoire (M&A, refinancement, IPO prep).",
    sector: "Petfood",
    category: "Direction financiere",
    shortageLevel: "Elevee",
    summary:
      "Dirige la finance d'un groupe petfood 100-500 M€ de CA : pilotage P&L, cash et bilan consolide, gestion des operations M&A et refinancement, preparation IPO le cas echeant, reporting international et dialogue investisseurs.",
    skills: [
      "Direction finance groupe multi-sites",
      "M&A, integration et post-merger",
      "Refinancement, LBO et dialogue banques",
      "Preparation IPO et relation investisseurs",
      "Consolidation IFRS et reporting international"
    ],
    successFactors: [
      "Concilier vision strategique groupe et rigueur d'execution operationnelle.",
      "Batir une lecture financiere lisible pour un actionnariat souvent PE ou familial.",
      "Anticiper le mur de refinancement plutot que le subir."
    ],
    path: [
      "Directeur.rice financier.e BU ou pays",
      "Group controller ou finance director",
      "CFO groupe"
    ],
    missions: [
      "Piloter le P&L, le cash et le bilan consolide du groupe.",
      "Structurer les operations M&A, refinancement et preparer une eventuelle IPO.",
      "Superviser controlling, tresorerie, fiscalite, consolidation et audit interne.",
      "Animer le reporting aupres du board, des actionnaires et des banques.",
      "Faire dialoguer finance, supply, commerce et marketing sur les grands arbitrages."
    ],
    studies: [
      "Ecole de commerce ou ingenieur avec double competence finance",
      "DSCG, master finance, MBA ou audit big four apprecie",
      "12-20 ans d'experience finance dont directions groupe"
    ],
    schools: ["HEC Paris", "ESSEC", "ESCP", "EM Lyon", "EDHEC", "Sciences Po Paris", "Dauphine", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: [
      "Groupes petfood consolides (United Petfood, Partner in Pet Food, Butcher's, Monge)",
      "FMCG alimentaire humain (transferts frequents vers petfood)",
      "Private equity mid-cap et large-cap (CVC, PAI, Ardian, Eurazeo)",
      "Cabinets M&A et banques d'affaires",
      "Audit et transaction services (Big Four)"
    ],
    sources: [
      { name: "FACCO - Marche petfood France", url: "https://www.facco.fr/" },
      { name: "France Invest - Statistiques PE", url: "https://www.franceinvest.eu/" }
    ]
  },
  {
    slug: "category-manager-petfood",
    title: "Category Manager Petfood",
    seoTitle: "Category Manager Petfood : salaire 65-90 K€, missions GMS | SKS",
    seoDescription:
      "Fiche metier Category Manager Petfood : pilotage categorie chien chat premium sans cereales snacks, relation acheteurs GMS. Salaire 65-90 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "65kEUR - 90kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 15 % du fixe. Fourchette dependante de l'enseigne cliente, du portefeuille de categories et du niveau de seniorite.",
    sector: "Petfood",
    category: "Category management",
    shortageLevel: "Elevee",
    summary:
      "Pilote une categorie retail petfood (chien, chat, premium, sans cereales, snacks), entretient la relation avec les acheteur.rice.s GMS, structure le mix produit et anime l'innovation trade en collaboration avec la force de vente.",
    skills: [
      "Category management GMS et retail specialise",
      "Analyse Nielsen, IRI, panels distributeurs",
      "Merchandising et assortiment",
      "Negociation acheteur.rice enseignes",
      "Trade marketing et innovation retail"
    ],
    successFactors: [
      "Croiser les insights shopper avec la mecanique reelle du rayon.",
      "Nourrir la relation acheteur.rice sans se laisser enfermer par le sell-in.",
      "Traduire un plan categoriel en actions terrain executables par la force de vente."
    ],
    path: [
      "Chef.fe de secteur ou compte cle",
      "Category analyst puis category manager",
      "Senior category manager ou trade marketing manager"
    ],
    missions: [
      "Piloter une categorie petfood (chien, chat, premium, sans cereales, snacks) sur un perimetre enseignes.",
      "Analyser panels et donnees shopper pour eclairer assortiment, prix et promo.",
      "Construire les plans categoriels et les defendre avec les acheteur.rice.s.",
      "Coordonner marketing, force de vente et supply autour du plan promo et de l'innovation.",
      "Piloter les revues d'assortiment et les temps forts categoriels."
    ],
    studies: [
      "Ecole de commerce ou master marketing / distribution",
      "5-10 ans d'experience GMS, category management ou trade marketing",
      "Maitrise Nielsen / IRI appreciee"
    ],
    schools: ["ESSEC", "EDHEC", "NEOMA", "SKEMA", "Kedge", "Institut Agro Rennes-Angers"],
    relatedIndustries: [
      "Groupes petfood (Mars Petcare, Nestle Purina, Affinity, United Petfood)",
      "Enseignes GMS (Carrefour, E.Leclerc, Systeme U, Intermarche, Auchan)",
      "Retail specialise (Maxi Zoo, Animalis, Tom&Co)",
      "FMCG alimentaire (transferts frequents category management)",
      "Instituts panels (NielsenIQ, Circana / IRI, Kantar)"
    ],
    sources: [
      { name: "FACCO - Marche petfood France", url: "https://www.facco.fr/" },
      { name: "LSA - Actualites distribution", url: "https://www.lsa-conso.fr/" }
    ]
  },
  {
    slug: "brand-manager-petfood-premium",
    title: "Brand Manager Petfood Premium",
    seoTitle: "Brand Manager Petfood Premium : salaire 55-80 K€, missions | SKS",
    seoDescription:
      "Fiche metier Brand Manager Petfood Premium : ownership marque, positionnement, communication, roadmap produit. Salaire 55-80 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "55kEUR - 80kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 15 % du fixe. Fourchette dependante de la marque geree (challenger vs marque leader), du budget medias et de l'exposition management.",
    sector: "Petfood",
    category: "Marketing brand",
    shortageLevel: "Elevee",
    summary:
      "Assure l'ownership d'une marque premium petfood : positionnement, plateforme de communication, roadmap produit, pilotage des agences et suivi du P&L marque.",
    skills: [
      "Brand management premium",
      "Plateforme de marque et communication 360",
      "Pilotage agences (creation, media, digital, PR)",
      "P&L marque et pricing",
      "Insights consommateur.rice et etudes qualitatives"
    ],
    successFactors: [
      "Tenir le cap du positionnement face aux tentations de sur-promotion.",
      "Faire vivre la marque au-dela du 30 secondes TV, jusqu'au rayon et au SAV.",
      "Aligner claim scientifique, claim marketing et perception reelle du.de la client.e."
    ],
    path: [
      "Chef.fe de produit junior",
      "Brand manager",
      "Senior brand manager ou marketing manager"
    ],
    missions: [
      "Detenir le positionnement, la plateforme de marque et le plan de communication.",
      "Piloter les agences creation, media, digital et RP.",
      "Construire la roadmap produit avec R&D, packaging et supply.",
      "Suivre le P&L de la marque et defendre les investissements marketing.",
      "Nourrir la marque avec des insights consommateur.rice.s et animal.e.s de compagnie."
    ],
    studies: [
      "Ecole de commerce ou master marketing",
      "4-8 ans d'experience FMCG ou petfood",
      "Anglais courant apprecie"
    ],
    schools: ["HEC Paris", "ESSEC", "ESCP", "EDHEC", "EM Lyon", "NEOMA", "SKEMA"],
    relatedIndustries: [
      "Groupes petfood premium (Mars Petcare, Nestle Purina, Affinity, Hill's)",
      "Marques challenger fresh food et clean label (Edgard Cooper, Tomojo, Ultra Premium Direct, Hector Kitchen)",
      "FMCG premium (transferts frequents vers petfood)",
      "Agences creation, media, PR specialisees",
      "Retail specialise animalerie"
    ],
    sources: [
      { name: "FACCO - Marche petfood France", url: "https://www.facco.fr/" },
      { name: "IREP - Marche publicitaire France", url: "https://www.irep.asso.fr/" }
    ]
  },
  {
    slug: "head-of-sustainability-petfood",
    title: "Head of Sustainability Petfood",
    seoTitle: "Head of Sustainability Petfood : salaire 90-130 K€, missions CSRD ESG | SKS",
    seoDescription:
      "Fiche metier Head of Sustainability Petfood : empreinte carbone recettes, sourcing durable, CSRD, scope 1/2/3, ESG. Salaire 90-130 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "90kEUR - 130kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 15 % du fixe. Fonction jeune dans le petfood, avec un turnover eleve (environ 40 % de sortie sous 18 mois), la fourchette basse cible les profils monter-en-poste, la haute les seniors avec deja une premiere reussite CSRD.",
    sector: "Petfood",
    category: "Direction RSE ESG",
    shortageLevel: "Tres elevee",
    summary:
      "Structure la strategie sustainability petfood sur le double perimetre produit (empreinte carbone recettes, sourcing durable, packaging, claims) et corporate (CSRD, scope 1/2/3, gouvernance ESG). Fonction jeune dans le secteur, avec un turnover eleve estime a 40 % sous 18 mois, qu'un cadrage clair de mandat permet de reduire.",
    skills: [
      "Bilan carbone produit et ACV (analyse cycle de vie)",
      "Sourcing durable (proteines alternatives, cereales, packaging)",
      "CSRD, ESRS, scope 1/2/3",
      "Gouvernance ESG et reporting extra-financier",
      "Alliances filiere et lobbying responsable"
    ],
    successFactors: [
      "Obtenir un mandat clair sur le double perimetre produit et corporate des la prise de poste.",
      "Ne pas confondre plan RSE affichage et transformation reelle des recettes ou de la supply.",
      "Defendre les arbitrages carbone / cout / performance en comex sans perdre en credibilite.",
      "Se premunir des ecueils qui alimentent le turnover secteur : mandat flou, pas de budget dedie, isolation dans la com corporate."
    ],
    path: [
      "Sustainability manager ou responsable ACV",
      "Head of sustainability produit ou corporate",
      "Direction RSE ou VP sustainability groupe"
    ],
    missions: [
      "Piloter la strategie sustainability sur perimetre produit (empreinte carbone recettes, packaging, sourcing).",
      "Structurer la conformite CSRD, ESRS, scope 1/2/3 et le reporting extra-financier.",
      "Construire la gouvernance ESG (board, comex, filiales) et animer les alliances filiere.",
      "Manager une equipe RSE / ACV et coordonner R&D, supply, achats et communication.",
      "Documenter les claims durabilite et securiser l'exposition greenwashing."
    ],
    studies: [
      "Ingenieur.e agro ou environnement",
      "Master specialise RSE, ESG, sustainability ou developpement durable",
      "8-15 ans d'experience RSE dont exposition FMCG ou nutrition"
    ],
    schools: ["AgroParisTech", "Mines ParisTech", "Institut Agro Rennes-Angers", "HEC Paris", "ESSEC", "Sciences Po Paris", "Yale SOM", "Harvard Business School"],
    relatedIndustries: [
      "Groupes petfood (Mars Petcare, Nestle Purina, Affinity, United Petfood)",
      "FMCG alimentaire (Danone, Unilever, Nestle - transferts sustainability frequents)",
      "Cabinets conseil ESG (EcoAct, Carbone 4, Utopies, I Care)",
      "Ingredientistes proteines alternatives (Innovafeed, Ynsect, Nextprotein)",
      "Autorites et referentiels (ADEME, EFRAG, SBTi, PEF)"
    ],
    sources: [
      { name: "ADEME - Bilan carbone et ACV agroalimentaire", url: "https://www.ademe.fr/" },
      { name: "EFRAG - Referentiel CSRD ESRS", url: "https://www.efrag.org/" },
      { name: "FACCO - Marche petfood France", url: "https://www.facco.fr/" }
    ]
  },
  {
    slug: "ceo-veterinary-group",
    title: "CEO Groupe Veterinaire",
    seoTitle: "CEO Groupe Veterinaire : salaire 180-280 K€, missions multi-site | SKS",
    seoDescription:
      "Fiche metier CEO Groupe Veterinaire : direction generale 100-500 cliniques, 200-800 collaborateur.rice.s, equity ou phantom. Salaire 180-280 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "180kEUR - 280kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable STI cible 30-40 % du fixe et LTI significatif (equity ou phantom sur scale-up soutenue par private equity). Fourchette dependante de la taille du groupe (100-500 sites), du perimetre geographique et de la phase (build-up, integration, sortie).",
    sector: "Veterinary",
    category: "Direction generale",
    shortageLevel: "Tres elevee",
    summary:
      "Dirige un groupe de cliniques veterinaires 100-500 sites : posture d'operateur multi-site rigoureux et de leader people credible aupres des veterinaires et directeur.rice.s de clinique. Pilote 200-800 collaborateur.rice.s, la relation actionnaires et le plan de croissance.",
    skills: [
      "Direction generale groupe multi-site",
      "Operating model retail medical et pilotage P&L par site",
      "Leadership people credible face aux veterinaires et ASV",
      "Strategie build-up et integration post-acquisition",
      "Relation actionnaires PE ou industriels et gouvernance board"
    ],
    successFactors: [
      "Tenir ensemble exigence economique et qualite de soin sans compromis dangereux.",
      "Etre credible aupres des veterinaires : profil medical ou tres longue exposition sante.",
      "Reussir la structuration RH d'un metier en tension et fideliser les directeur.rice.s de site.",
      "Faire vivre une culture commune apres des acquisitions successives."
    ],
    path: [
      "Directeur.rice regional.e cliniques ou COO",
      "Managing director pays sante animale ou retail medical",
      "CEO groupe veterinaire"
    ],
    missions: [
      "Definir et deployer la strategie du groupe : croissance organique, build-up et integration.",
      "Piloter l'operating model multi-site, le P&L consolide et la performance par region.",
      "Animer la gouvernance : board, actionnaires, comex et directions regionales.",
      "Structurer la strategie RH d'un secteur en tension (attractivite, formation, retention).",
      "Representer le groupe aupres des instances de la profession et du secteur sante animale."
    ],
    studies: [
      "Docteur.e veterinaire avec parcours management OU dirigeant.e experimente.e sante / retail medical",
      "MBA ou executive education apprecie",
      "15-25 ans d'experience dont directions multi-site significatives"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "HEC Paris", "INSEAD", "ESSEC", "Harvard Business School", "Yale SOM"],
    relatedIndustries: [
      "Groupes cliniques veterinaires (IVC Evidensia, VetPartners, Univet, Anicura, Argos Veterinaire)",
      "Retail medical humain (Ramsay Sante, Elsan, Almaviva, Colisee)",
      "Groupes dentaires ou opticiens (transferts operating model multi-site)",
      "Private equity buy-and-build (Ardian, IK, PAI, Bridgepoint)",
      "Instances profession (Ordre National des Veterinaires, SNVEL)"
    ],
    sources: [
      { name: "Ordre National des Veterinaires", url: "https://www.veterinaire.fr/" },
      { name: "SNVEL - Syndicat National des Veterinaires d'Exercice Liberal", url: "https://www.snvel.fr/" }
    ]
  },
  {
    slug: "head-of-rd-animal-health",
    title: "Head of R&D Sante Animale",
    seoTitle: "Head of R&D Sante Animale : salaire 140-190 K€, missions pipeline | SKS",
    seoDescription:
      "Fiche metier Head of R&D Sante Animale : pipeline pharma biologiques vaccins diagnostic IA, 20-80 chercheur.se.s. Salaire 140-190 K€. Benchmark FR 2026 SKS TALENTS.",
    publishDate: august2026ChloeBatchDate,
    salary: "140kEUR - 190kEUR + variable",
    salarySource:
      "Ordre de grandeur France, fixe brut annuel. Variable cible 20-25 % du fixe et LTI selon groupe. Fourchette dependante du perimetre R&D (mono-technologie vs pharma + biologiques + vaccins + diagnostic + IA), de la taille des equipes et de l'exposition internationale.",
    sector: "Medical Vet",
    category: "Direction R&D",
    shortageLevel: "Tres elevee",
    summary:
      "Dirige la R&D d'un laboratoire sante animale sur un perimetre elargi : pipeline pharmaceutique, biologiques, vaccins, diagnostic et applications IA. Manage 20-80 chercheur.se.s, arbitre les investissements et defend les projets face au comex et aux autorites.",
    skills: [
      "Direction R&D multi-technologies (pharma, biologiques, vaccins, diagnostic, IA)",
      "Pipeline management et arbitrage portefeuille projets",
      "Interface reglementaire EMA / ANMV, USDA, PMDA",
      "Partenariats academiques et deals in-licensing",
      "Management d'equipes 20-80 chercheur.se.s"
    ],
    successFactors: [
      "Naviguer entre technologies tres differentes sans sur-investir dans une seule.",
      "Arbitrer entre pipeline propre, partenariats externes et acquisitions ciblees.",
      "Maintenir un dialogue scientifique credible avec les leaders d'opinion veterinaires.",
      "Faire monter en competence les equipes sur l'IA sans caricaturer l'apport."
    ],
    path: [
      "R&D manager ou head of therapeutic area",
      "Head of R&D pays ou region",
      "Head of R&D global ou CSO"
    ],
    missions: [
      "Piloter la roadmap R&D et le portefeuille projets multi-technologies.",
      "Arbitrer les investissements pharma, biologiques, vaccins, diagnostic et IA.",
      "Animer les partenariats academiques et securiser les deals in-licensing.",
      "Manager une equipe 20-80 chercheur.se.s et structurer les centres de R&D.",
      "Defendre les projets face au comex, aux autorites et aux KOL veterinaires."
    ],
    studies: [
      "Docteur.e veterinaire, pharmacien.ne ou PhD sciences du vivant",
      "MBA ou executive education en direction R&D apprecie",
      "15-20 ans d'experience R&D sante animale ou pharma humaine transferable"
    ],
    schools: ["ENVA (Maisons-Alfort)", "Oniris", "VetAgro Sup", "ENVT", "AgroParisTech", "Institut Pasteur", "Universite Paris-Saclay", "Harvard Business School", "MIT Sloan"],
    relatedIndustries: [
      "Big Pharma Animal Health (Zoetis, Boehringer Ingelheim, MSD Animal Health, Elanco, Ceva, Virbac, Vetoquinol)",
      "Diagnostic veterinaire (IDEXX, Zoetis Diagnostics, Innovative Diagnostics)",
      "Biotech animal health emergentes",
      "R&D pharma humaine (transferts frequents)",
      "Instituts et laboratoires publics (INRAE, Anses, Institut Pasteur)"
    ],
    sources: [
      { name: "AnimalhealthEurope - Federation industrie sante animale", url: "https://www.animalhealtheurope.eu/" },
      { name: "Anses - Agence securite sanitaire alimentation environnement travail", url: "https://www.anses.fr/" }
    ]
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

const mergedJobRoles = [
  ...strategicExtras,
  ...nuclearMedicineRoles,
  ...coreRoles,
  ...may2026RoleBatch,
  ...august2026AnimalHealthBatch,
  ...august2026ChloeBatch
].map(withDefaultRoleMetadata);

export const jobRoles: JobRole[] = Array.from(
  mergedJobRoles.reduce((acc, role) => {
    if (!acc.has(role.slug)) {
      acc.set(role.slug, role);
    }
    return acc;
  }, new Map<string, JobRole>())
    .values()
).sort((a, b) => a.title.localeCompare(b.title, "fr"));

export const jobRoleSectors = unique(jobRoles.map((role) => role.sector));
export const jobRoleCategories = unique(jobRoles.map((role) => role.category));

export const findJobRoleBySlug = (slug: string) => jobRoles.find((role) => role.slug === slug);

export const getRelatedJobRoles = (slug: string, sector: string) =>
  jobRoles.filter((role) => role.slug !== slug && role.sector === sector).slice(0, 6);
