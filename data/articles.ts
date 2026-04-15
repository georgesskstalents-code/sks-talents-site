export type ArticlePersona = "CEO" | "COO" | "DRH" | "CPO";

export type Article = {
  id: string;
  title: string;
  slug: string;
  vertical: string;
  persona: ArticlePersona[];
  topic: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  sources?: {
    name: string;
    url: string;
  }[];
};

const verticalLabels: Record<string, string> = {
  biotech: "Biotech",
  diagnostic: "Diagnostic",
  cosmetique: "Cosmétique",
  "medical-vet": "Medical Vet",
  "vet-services": "Vet Services",
  petfood: "Petfood"
};

export const articles: Article[] = [
  {
    id: "arn-hiring-2025",
    title: "ARN Therapeutics Hiring Trends 2025",
    slug: "arn-hiring-2025",
    vertical: "biotech",
    persona: ["CEO", "CPO"],
    topic: "recruitment",
    excerpt: "Les tendances de recrutement pour les rôles ARN en 2025",
    content:
      "Avec la croissance exponentielle des thérapies ARN, les entreprises biotech cherchent des talents spécialisés...",
    author: "SKS TALENTS",
    date: "2026-04-09",
    readTime: 8
  },
  {
    id: "crispr-gene-editing-roles",
    title: "CRISPR Gene Editing: Key Roles & Skills",
    slug: "crispr-gene-editing-roles",
    vertical: "biotech",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Quels sont les rôles critiques en édition génétique CRISPR?",
    content:
      "L'édition génétique CRISPR est une technologie révolutionnaire qui demande des profils très spécialisés...",
    author: "SKS TALENTS",
    date: "2026-04-08",
    readTime: 10
  },
  {
    id: "deeptech-startup-talent-war",
    title: "DeepTech Startup Talent War: Early-Stage Biotech",
    slug: "deeptech-startup-talent-war",
    vertical: "biotech",
    persona: ["CEO", "COO"],
    topic: "market",
    excerpt: "Comment les startups biotech font face à la compétition pour les talents",
    content:
      "Les startups DeepTech en biotech font face à une concurrence féroce pour attirer les meilleurs talents...",
    author: "SKS TALENTS",
    date: "2026-04-07",
    readTime: 12
  },
  {
    id: "ngs-bioinformatician-demand",
    title: "NGS Bioinformatician: The Highest Demand Role in 2026",
    slug: "ngs-bioinformatician-demand",
    vertical: "diagnostic",
    persona: ["CPO", "DRH"],
    topic: "market",
    excerpt: "Pourquoi les bioinformaticiens NGS sont les plus recherchés",
    content:
      "Le séquençage de nouvelle génération (NGS) crée une demande énorme de bioinformaticiens spécialisés...",
    author: "SKS TALENTS",
    date: "2026-04-06",
    readTime: 9
  },
  {
    id: "ai-medical-imaging-careers",
    title: "AI in Medical Imaging: New Career Paths",
    slug: "ai-medical-imaging-careers",
    vertical: "diagnostic",
    persona: ["CEO", "CPO"],
    topic: "skills",
    excerpt: "Les nouveaux métiers créés par l'IA en imagerie médicale",
    content:
      "L'intelligence artificielle révolutionne l'imagerie médicale et crée des opportunités de carrière inédites...",
    author: "SKS TALENTS",
    date: "2026-04-05",
    readTime: 11
  },
  {
    id: "genomics-precision-medicine",
    title: "Genomics & Precision Medicine: Hiring Guide",
    slug: "genomics-precision-medicine",
    vertical: "diagnostic",
    persona: ["DRH", "CPO"],
    topic: "recruitment",
    excerpt: "Guide de recrutement pour les rôles en médecine de précision",
    content:
      "La médecine de précision basée sur la génomique demande des profils très spécifiques...",
    author: "SKS TALENTS",
    date: "2026-04-04",
    readTime: 10
  },
  {
    id: "veterinary-pharma-recruitment",
    title: "Veterinary Pharma R&D: Specialized Recruitment",
    slug: "veterinary-pharma-recruitment",
    vertical: "medical-vet",
    persona: ["CPO", "DRH"],
    topic: "recruitment",
    excerpt: "Recruter des experts en R&D pharma vétérinaire",
    content:
      "Le secteur de la pharmacologie vétérinaire a besoin de talents très spécialisés pour la R&D...",
    author: "SKS TALENTS",
    date: "2026-04-03",
    readTime: 9
  },
  {
    id: "antiparasitic-drug-development",
    title: "Antiparasitic Drug Development: Talent Shortage",
    slug: "antiparasitic-drug-development",
    vertical: "medical-vet",
    persona: ["CEO", "CPO"],
    topic: "market",
    excerpt: "La pénurie de talents en développement de nouveaux antiparasitaires",
    content:
      "Le développement de nouveaux antiparasitaires est un domaine critique mais avec peu de talents disponibles...",
    author: "SKS TALENTS",
    date: "2026-04-02",
    readTime: 8
  },
  {
    id: "vaccine-manufacturing-careers",
    title: "Vaccine Manufacturing: Career Opportunities 2026",
    slug: "vaccine-manufacturing-careers",
    vertical: "medical-vet",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Opportunités de carrière dans la fabrication de vaccins vétérinaires",
    content:
      "La fabrication de vaccins vétérinaires offre de nombreuses opportunités pour les professionnels qualifiés...",
    author: "SKS TALENTS",
    date: "2026-04-01",
    readTime: 10
  },
  {
    id: "veterinarian-shortage-solutions",
    title: "Veterinarian Shortage: Staffing Solutions",
    slug: "veterinarian-shortage-solutions",
    vertical: "vet-services",
    persona: ["CEO", "COO"],
    topic: "market",
    excerpt: "Solutions face à la pénurie de vétérinaires",
    content:
      "La France fait face à une pénurie critique de vétérinaires. Voici les solutions de recrutement...",
    author: "SKS TALENTS",
    date: "2026-03-31",
    readTime: 11
  },
  {
    id: "pet-clinic-group-expansion",
    title: "Pet Clinic Group Expansion: Building Your Team",
    slug: "pet-clinic-group-expansion",
    vertical: "vet-services",
    persona: ["COO", "DRH"],
    topic: "recruitment",
    excerpt: "Construire une équipe pour l'expansion de groupes de cliniques",
    content:
      "L'expansion des groupes de cliniques vétérinaires nécessite une stratégie RH spécifique...",
    author: "SKS TALENTS",
    date: "2026-03-30",
    readTime: 9
  },
  {
    id: "telemedicine-vet-practice",
    title: "Telemedicine in Veterinary Practice: New Roles",
    slug: "telemedicine-vet-practice",
    vertical: "vet-services",
    persona: ["CPO", "DRH"],
    topic: "skills",
    excerpt: "Les nouveaux rôles créés par la télémédecine vétérinaire",
    content:
      "La télémédecine vétérinaire crée de nouveaux rôles et demande des compétences différentes...",
    author: "SKS TALENTS",
    date: "2026-03-29",
    readTime: 8
  },
  {
    id: "pet-nutrition-science-trends",
    title: "Pet Nutrition Science: Research & Development Trends",
    slug: "pet-nutrition-science-trends",
    vertical: "petfood",
    persona: ["CEO", "CPO"],
    topic: "market",
    excerpt: "Tendances actuelles en recherche de nutrition pour animaux",
    content:
      "La science de la nutrition pour animaux de compagnie connaît une évolution rapide avec de nouvelles tendances...",
    author: "SKS TALENTS",
    date: "2026-03-28",
    readTime: 10
  },
  {
    id: "therapeutic-pet-diet-formulation",
    title: "Therapeutic Diet Formulation: Expert Profiles",
    slug: "therapeutic-pet-diet-formulation",
    vertical: "petfood",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Profils d'experts pour la formulation de diètes thérapeutiques",
    content:
      "La formulation de régimes thérapeutiques pour animaux demande des experts spécialisés...",
    author: "SKS TALENTS",
    date: "2026-03-27",
    readTime: 9
  },
  {
    id: "sustainable-proteins-petfood",
    title: "Sustainable Protein Innovation in Petfood",
    slug: "sustainable-proteins-petfood",
    vertical: "petfood",
    persona: ["CEO", "CPO"],
    topic: "market",
    excerpt: "Innovation en protéines durables pour l'alimentation animale",
    content:
      "Les protéines alternatives et durables révolutionnent l'industrie du petfood...",
    author: "SKS TALENTS",
    date: "2026-03-26",
    readTime: 11
  },
  {
    id: "precision-medicine-biotech",
    title: "Precision Medicine in Biotech: Roles & Salaries",
    slug: "precision-medicine-biotech",
    vertical: "biotech",
    persona: ["DRH", "CPO"],
    topic: "recruitment",
    excerpt: "Rôles et salaires en médecine de précision biotech",
    content:
      "La médecine de précision offre des rôles bien rémunérés mais hautement spécialisés...",
    author: "SKS TALENTS",
    date: "2026-03-25",
    readTime: 10
  },
  {
    id: "synthetic-biology-startups",
    title: "Synthetic Biology Startups: Talent Acquisition",
    slug: "synthetic-biology-startups",
    vertical: "biotech",
    persona: ["CEO", "CPO"],
    topic: "recruitment",
    excerpt: "Acquérir des talents pour les startups en biologie synthétique",
    content:
      "Les startups de biologie synthétique recherchent des talents très rares et spécialisés...",
    author: "SKS TALENTS",
    date: "2026-03-24",
    readTime: 9
  },
  {
    id: "immunotherapy-development-careers",
    title: "Immunotherapy Development: Career Path",
    slug: "immunotherapy-development-careers",
    vertical: "biotech",
    persona: ["CPO", "DRH"],
    topic: "skills",
    excerpt: "Parcours de carrière en développement d'immunothérapie",
    content:
      "Le développement d'immunothérapies offre des carrières brillantes avec une forte demande...",
    author: "SKS TALENTS",
    date: "2026-03-23",
    readTime: 10
  },
  {
    id: "cell-therapy-manufacturing",
    title: "Cell Therapy Manufacturing: Staffing Challenges",
    slug: "cell-therapy-manufacturing",
    vertical: "biotech",
    persona: ["COO", "DRH"],
    topic: "market",
    excerpt: "Défis de staffing en fabrication de thérapie cellulaire",
    content:
      "La fabrication de thérapies cellulaires fait face à des défis majeurs en recrutement...",
    author: "SKS TALENTS",
    date: "2026-03-22",
    readTime: 11
  },
  {
    id: "ivd-testing-laboratory-roles",
    title: "IVD Testing: Laboratory Roles & Recruitment",
    slug: "ivd-testing-laboratory-roles",
    vertical: "diagnostic",
    persona: ["DRH", "CPO"],
    topic: "recruitment",
    excerpt: "Rôles en laboratoires de tests IVD et stratégie de recrutement",
    content:
      "Les tests in vitro (IVD) demandent des profils spécialisés dans les laboratoires de diagnostic...",
    author: "SKS TALENTS",
    date: "2026-03-21",
    readTime: 9
  },
  {
    id: "molecular-diagnostics-pcr-ngs",
    title: "Molecular Diagnostics: PCR & NGS Expert Profiles",
    slug: "molecular-diagnostics-pcr-ngs",
    vertical: "diagnostic",
    persona: ["CPO", "DRH"],
    topic: "skills",
    excerpt: "Profils d'experts en diagnostique moléculaire (PCR, NGS)",
    content:
      "Les experts en diagnostique moléculaire (PCR, NGS) sont parmi les profils les plus recherchés...",
    author: "SKS TALENTS",
    date: "2026-03-20",
    readTime: 10
  },
  {
    id: "point-of-care-testing-poct",
    title: "Point-of-Care Testing (POCT): Market Growth",
    slug: "point-of-care-testing-poct",
    vertical: "diagnostic",
    persona: ["CEO", "CPO"],
    topic: "market",
    excerpt: "Croissance du marché des tests de diagnostic rapide (POCT)",
    content:
      "Le marché des tests de diagnostic rapide (POCT) croît rapidement et crée de nouveaux emplois...",
    author: "SKS TALENTS",
    date: "2026-03-19",
    readTime: 8
  },
  {
    id: "rwe-clinical-data-management",
    title: "Real-World Evidence & Clinical Data: Career Guide",
    slug: "rwe-clinical-data-management",
    vertical: "diagnostic",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Guide de carrière en données cliniques et RWE",
    content:
      "Les données cliniques du monde réel (RWE) créent de nouvelles opportunités de carrière...",
    author: "SKS TALENTS",
    date: "2026-03-18",
    readTime: 9
  },
  {
    id: "regulatory-affairs-vet-pharma",
    title: "Regulatory Affairs in Veterinary Pharma",
    slug: "regulatory-affairs-vet-pharma",
    vertical: "medical-vet",
    persona: ["CPO", "DRH"],
    topic: "skills",
    excerpt: "Les rôles réglementaires en pharmacologie vétérinaire",
    content:
      "Les affaires réglementaires en pharmacologie vétérinaire demandent une expertise spécifique...",
    author: "SKS TALENTS",
    date: "2026-03-17",
    readTime: 10
  },
  {
    id: "biotech-animal-gene-therapy",
    title: "Biotech Animal: Gene Therapy Applications",
    slug: "biotech-animal-gene-therapy",
    vertical: "medical-vet",
    persona: ["CEO", "CPO"],
    topic: "market",
    excerpt: "Applications de thérapie génique en santé animale",
    content:
      "La thérapie génique appliquée aux animaux ouvre un nouveau marché avec des opportunités de recrutement...",
    author: "SKS TALENTS",
    date: "2026-03-16",
    readTime: 11
  },
  {
    id: "vet-clinic-digital-transformation",
    title: "Digital Transformation in Veterinary Clinics",
    slug: "vet-clinic-digital-transformation",
    vertical: "vet-services",
    persona: ["COO", "DRH"],
    topic: "recruitment",
    excerpt: "Transformation digitale des cliniques vétérinaires",
    content:
      "La transformation digitale des cliniques vétérinaires crée de nouveaux besoins en talents...",
    author: "SKS TALENTS",
    date: "2026-03-15",
    readTime: 9
  },
  {
    id: "vet-imaging-advanced-diagnostics",
    title: "Advanced Imaging in Veterinary Medicine",
    slug: "vet-imaging-advanced-diagnostics",
    vertical: "vet-services",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Imagerie avancée en médecine vétérinaire",
    content:
      "L'imagerie avancée en médecine vétérinaire (IRM, CT) demande des spécialistes qualifiés...",
    author: "SKS TALENTS",
    date: "2026-03-14",
    readTime: 10
  },
  {
    id: "petfood-premium-brands-strategies",
    title: "Premium Petfood Brands: Recruitment Strategies",
    slug: "petfood-premium-brands-strategies",
    vertical: "petfood",
    persona: ["CPO", "DRH"],
    topic: "recruitment",
    excerpt: "Stratégies de recrutement pour les marques premium de petfood",
    content:
      "Les marques premium de petfood recherchent des talents en R&D et marketing très spécialisés...",
    author: "SKS TALENTS",
    date: "2026-03-13",
    readTime: 9
  },
  {
    id: "petfood-product-development-innovation",
    title: "Petfood Product Development: Innovation Roles",
    slug: "petfood-product-development-innovation",
    vertical: "petfood",
    persona: ["CEO", "CPO"],
    topic: "skills",
    excerpt: "Rôles d'innovation en développement de produits petfood",
    content:
      "Le développement innovant de produits petfood demande des profils créatifs et scientifiques...",
    author: "SKS TALENTS",
    date: "2026-03-12",
    readTime: 10
  },
  {
    id: "petfood-quality-assurance-compliance",
    title: "Quality Assurance in Petfood Manufacturing",
    slug: "petfood-quality-assurance-compliance",
    vertical: "petfood",
    persona: ["COO", "DRH"],
    topic: "recruitment",
    excerpt: "Assurance qualité dans la fabrication de petfood",
    content:
      "L'assurance qualité en fabrication de petfood est critique et demande une expertise spécifique...",
    author: "SKS TALENTS",
    date: "2026-03-11",
    readTime: 8
  },
  {
    id: "fair-craft-bio-case-study",
    title: "Case Study: Faircraft.bio - Building a Biotech Team",
    slug: "fair-craft-bio-case-study",
    vertical: "biotech",
    persona: ["CEO", "COO"],
    topic: "case-study",
    excerpt: "Comment Faircraft.bio a construit son équipe de talents",
    content:
      "Faircraft.bio, startup spécialisée dans les ARN, a utilise notre expertise pour recruter son équipe clé...",
    author: "SKS TALENTS",
    date: "2026-03-10",
    readTime: 11
  },
  {
    id: "purple-squirrel-outplacement",
    title: "Purple Squirrel: Outplacement en Life Sciences",
    slug: "purple-squirrel-outplacement",
    vertical: "biotech",
    persona: ["DRH", "CPO"],
    topic: "case-study",
    excerpt: "Partenariat avec Purple Squirrel pour l'outplacement spécialisé",
    content:
      "Purple Squirrel est notre partenaire d'outplacement spécialisé en Life Sciences...",
    author: "SKS TALENTS",
    date: "2026-03-09",
    readTime: 9
  },
  {
    id: "france-biotech-funds-healthcare-hiring",
    title: "Cartographie des Fonds Santé: quels signaux de recrutement lire en 2026 ?",
    slug: "france-biotech-funds-healthcare-hiring",
    vertical: "biotech",
    persona: ["CEO", "DRH"],
    topic: "market",
    excerpt: "Comment utiliser la cartographie France Biotech des fonds santé pour anticiper les vagues de recrutement.",
    content:
      "La cartographie France Biotech des fonds d'investissement français en santé n'est pas seulement un document de place. Pour un dirigeant ou un DRH, c'est un radar très utile pour comprendre où les capitaux circulent, quelles verticales concentrent l'attention et quelles startups risquent d'entrer dans une phase d'accélération de leurs équipes. Lorsqu'un fonds est actif sur la biotech, le diagnostic ou la santé animale, cela se traduit souvent quelques mois plus tard par des besoins en profils structurants: affaires réglementaires, application, maintenance, supply, qualité, business development ou direction de business unit.\n\nChez SKS TALENTS, nous lisons ces signaux comme des déclencheurs de hiring. Une levée ou une cartographie active ne veut pas dire que toutes les entreprises recrutent immédiatement, mais elle permet de prioriser les acteurs à surveiller, les zones de tension métier et les fonctions qui deviennent critiques lorsque la croissance s'accélère. Pour les candidats, cela aide à comprendre où se trouvent les prochaines opportunités. Pour les entreprises, cela aide à voir à quel moment la compétition talents va monter.\n\nLa vraie valeur n'est donc pas la donnée brute, mais l'interprétation opérationnelle: quel fonds soutient quel type d'actifs, quels modèles d'entreprise passent de la R&D au go-to-market, et quels recrutements deviennent urgents quand la pression de croissance augmente. C'est précisément ce pont entre écosystème, métiers pénuriques et exécution recrutement que le site SKS TALENTS doit rendre visible à grande échelle.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 9,
    sources: [
      {
        name: "France Biotech - Cartographie des fonds d'investissement français en santé en 2024",
        url: "https://france-biotech.fr/wp-content/uploads/2025/01/Cartographie-des-fonds-dinvestissement-francais-en-sante-en-2024-Synthese-1.pdf"
      }
    ]
  },
  {
    id: "bpifrance-biotech-medtech-funds-hiring",
    title: "Bpifrance, biotech et medtech: quels métiers montent avec les fonds ?",
    slug: "bpifrance-biotech-medtech-funds-hiring",
    vertical: "diagnostic",
    persona: ["CEO", "DRH"],
    topic: "funds",
    excerpt: "Une lecture recrutement des véhicules biotech/medtech soutenus par Bpifrance.",
    content:
      "Les pages biotech et medtech de Bpifrance sont précieuses parce qu'elles rendent visibles des véhicules d'investissement, des priorités d'innovation et une certaine lecture stratégique du marché français. Pour SKS TALENTS, ces signaux sont utiles pour anticiper les besoins sur les fonctions qui suivent l'innovation: clinical affairs, affaires réglementaires, MSAT, supply planning, ingénierie d'application, ventes techniques et direction des opérations.\n\nQuand les fonds se structurent ou se réactivent, les entreprises accompagnées cherchent rarement seulement des chercheurs. Elles cherchent aussi des profils capables de faire passer une innovation de la preuve scientifique à la mise sur le marché. Cela crée des opportunités très concrètes sur des rôles de transition entre R&D, qualité, industrialisation, service terrain et commercialisation.\n\nC'est exactement ce type de lecture qui permet de produire des contenus plus utiles que la moyenne: au lieu de commenter la finance pour la finance, nous la relions à des métiers, à des trajectoires de carrière et à des besoins de recrutement réels. C'est ce positionnement qui peut faire de SKS TALENTS une source de référence sur les contenus talents life sciences.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Bpifrance - Investissement expertise Biotech",
        url: "https://www.bpifrance.fr/nos-solutions/investissement/investissement-expertise/biotech"
      },
      {
        name: "Bpifrance - Biotech and Medtech VC funds",
        url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/"
      }
    ]
  },
  {
    id: "leaders-league-health-funds-france",
    title: "Fonds santé France 2025: comment lire le classement Leaders League côté recrutement",
    slug: "leaders-league-health-funds-france",
    vertical: "biotech",
    persona: ["CEO", "COO"],
    topic: "funds",
    excerpt: "Le classement des fonds santé devient plus utile lorsqu'il est lu sous l'angle hiring et structuration.",
    content:
      "Le classement Leaders League sur les fonds LBO santé et biotechnologies ne sert pas seulement à identifier des noms connus. Il peut aussi aider à comprendre quels acteurs disposent d'une vraie capacité d'influence sur la structuration des entreprises du secteur, et donc sur la nature des recrutements qui émergent ensuite. Lorsqu'un fonds ou un acteur de premier plan intensifie sa présence, les sociétés en portefeuille doivent souvent professionnaliser leur leadership, leur exécution commerciale, leur support technique ou leur pilotage financier.\n\nPour un cabinet comme SKS TALENTS, la lecture utile consiste à relier ces signaux à des postes précis: directeur business unit, CFO, COO, directeur EMEA, export manager Afrique, ingénieur d'application ou customer service manager. Ces rôles deviennent visibles quand les organisations doivent passer à une échelle supérieure et tenir une exécution plus robuste.\n\nUn bon contenu SEO n'a pas besoin d'en faire trop. Il doit simplement aider un lecteur à comprendre ce que le marché bouge vraiment. C'est ce lien entre financement, structuration et fonctions pénuriques qui permet d'émerger aussi dans Google, ChatGPT ou Claude quand quelqu'un cherche une information sérieuse sur l'écosystème santé.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Leaders League - Santé, pharma & biotechnologies, fonds d'investissement France 2025",
        url: "https://www.leadersleague.com/fr/classements/sante-pharma-and-biotechnologies-fonds-lbo-sante-fonds-d-investissement-france-2025"
      }
    ]
  },
  {
    id: "companion-fund-animal-health-hiring",
    title: "Animal Health: ce que le Companion Fund II change pour le recrutement",
    slug: "companion-fund-animal-health-hiring",
    vertical: "medical-vet",
    persona: ["CEO", "DRH"],
    topic: "market",
    excerpt: "Le Companion Fund II est un vrai signal pour la santé animale, le petcare et les métiers associés.",
    content:
      "Le lancement du Companion Fund II par Mars et Digitalis Ventures envoie un signal clair au marché: la santé animale et le petcare restent des terrains d'innovation et d'investissement très actifs. Pour les entreprises, cela veut dire plus de concurrence pour attirer des profils capables d'exécuter sur des marchés encore jeunes mais déjà exigeants. Pour les candidats, cela ouvre des opportunités sur des rôles moins visibles que les métiers purement vétérinaires classiques.\n\nLes fonctions qui montent dans ce contexte ne se limitent pas à la R&D. On voit aussi de la demande sur le business development, la direction de clinique, la structuration RH, le support technique, les opérations multi-sites, l'export et la direction régionale. C'est précisément là que SKS TALENTS peut devenir utile comme média et comme cabinet: expliquer les débouchés, les tensions du marché et les rôles qui se raréfient.\n\nSi vous voulez capter le trafic de qualité dans l'animal health, ce sont ces contenus croisés qu'il faut publier: fonds, entreprises à suivre, métiers pénuriques, salaires, écoles et orientation. Le marché récompense les acteurs qui savent relier tous ces blocs avec cohérence.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Mars et Digitalis Ventures lancent un fonds de 300 millions de dollars",
        url: "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300"
      }
    ]
  },
  {
    id: "angels-sante-startups-hiring-signals",
    title: "Angels Santé: pourquoi ce réseau investisseur compte pour le hiring healthtech",
    slug: "angels-sante-startups-hiring-signals",
    vertical: "diagnostic",
    persona: ["CEO", "DRH"],
    topic: "funds",
    excerpt: "Angels Santé est aussi un indicateur de futures équipes à structurer dans la santé.",
    content:
      "Angels Santé est un bon exemple de source utile pour faire de la veille sur les jeunes entreprises santé susceptibles d'entrer dans une phase de structuration. Les business angels et réseaux d'investisseurs ne produisent pas tous immédiatement des volumes de recrutement massifs, mais ils signalent souvent les startups qui vont devoir professionnaliser leur organisation dans les 12 à 24 mois.\n\nPour un site comme SKS TALENTS, ce type de source permet de produire des contenus plus fins: profils à suivre, signaux faibles de marché, premiers métiers à recruter après une levée, ou encore fonctions transverses qui deviennent critiques quand la startup sort de sa phase purement scientifique. C'est particulièrement vrai sur le diagnostic, la medtech et certains sujets data/IA santé.\n\nCe positionnement éditorial est précieux car il vous différencie des sites qui ne parlent que d'offres d'emploi. Vous devenez utile avant l'offre, donc plus visible, plus cité et plus susceptible d'être repris comme référence par les moteurs conversationnels.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 7,
    sources: [
      {
        name: "Angels Santé",
        url: "https://www.angelssante.fr/"
      }
    ]
  },
  {
    id: "orientation-biotech-lycees-francais-afrique",
    title: "Orientation biotech: un guide utile pour les lycéens français en Afrique",
    slug: "orientation-biotech-lycees-francais-afrique",
    vertical: "biotech",
    persona: ["DRH", "CPO"],
    topic: "orientation",
    excerpt: "Comment capter les recherches post-bac biotech depuis le Sénégal, la Côte d'Ivoire, le Congo, le Bénin ou le Maroc.",
    content:
      "Les lycéens des écoles françaises en Afrique cherchent souvent des repères concrets sur les biotechnologies, la medtech ou la cosmétique scientifique, mais tombent sur des contenus trop généralistes ou trop centrés sur la France métropolitaine. C'est une vraie opportunité éditoriale pour SKS TALENTS: créer des pages d'orientation qui parlent à la fois des débouchés, des écoles, des niveaux d'études et des environnements professionnels visés.\n\nUn bon contenu d'orientation ne doit pas seulement lister des formations. Il doit relier des parcours à des métiers, montrer les passerelles entre BTS, BUT, licence, master, écoles d'ingénieurs et expliquer comment ces choix ouvrent ensuite vers la biotech, le diagnostic, la santé animale ou les fonctions business spécialisées. C'est cette dimension concrète qui retient l'attention et augmente le temps passé sur le site.\n\nÀ long terme, ce type de contenu crée un trafic très durable. Les recherches reviennent chaque année, les familles cherchent de nouveaux repères, et les moteurs conversationnels valorisent les pages qui répondent bien à ces questions récurrentes. C'est exactement le type de bibliothèque éditoriale qui peut faire émerger SKS TALENTS comme référence.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 9,
    sources: [
      {
        name: "Université Paris-Saclay",
        url: "http://www.universite-paris-saclay.fr"
      },
      {
        name: "SVTSUP - Écoles d'ingénieurs en biotechnologies",
        url: "https://www.svtsup.fr/ecoles-ingenieurs-et-debouches/ecoles-ingenieurs-biotechnologies/"
      }
    ]
  },
  {
    id: "export-manager-afrique-life-sciences",
    title: "Export Manager Afrique en Life Sciences: un rôle sous-estimé mais critique",
    slug: "export-manager-afrique-life-sciences",
    vertical: "diagnostic",
    persona: ["CEO", "DRH"],
    topic: "skills",
    excerpt: "Pourquoi les rôles export Afrique deviennent stratégiques sur le diagnostic, la medtech et certains segments biotech.",
    content:
      "Le rôle d'Export Manager Afrique reste souvent sous-estimé dans les bibliothèques métiers, alors qu'il devient central pour des entreprises qui veulent croître sur des marchés francophones et anglophones du continent. Dans le diagnostic, la medtech ou certains segments life sciences, ce rôle ne consiste pas seulement à vendre. Il faut comprendre la distribution, les relais locaux, les rythmes institutionnels, les enjeux de support et les contraintes d'exécution terrain.\n\nC'est un poste hybride, à la frontière du business development, du key account management, de la structuration de réseau et parfois du service client avancé. Cette hybridité explique en partie la tension du marché: peu de profils cumulent compréhension sectorielle, expérience export et maturité interculturelle. C'est exactement le type de fiche métier qui peut générer un trafic très ciblé et qualifié.\n\nPour SKS TALENTS, traiter ce rôle de manière sérieuse permet de capter des recherches peu couvertes par les grands sites généralistes et de démontrer une vraie connaissance des enjeux internationaux liés à vos industries.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Université Paris-Saclay",
        url: "http://www.universite-paris-saclay.fr"
      }
    ]
  },
  {
    id: "ingenieur-application-diagnostic-ivd",
    title: "Ingénieur d'application diagnostic IVD: missions, salaire et écoles",
    slug: "ingenieur-application-diagnostic-ivd",
    vertical: "diagnostic",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt: "Une fiche éditoriale pensée pour une des fonctions les plus demandées du diagnostic.",
    content:
      "L'ingénieur d'application IVD est l'un des meilleurs exemples de métier pénurique à forte valeur business. Il se situe à l'interface entre le client, la technique, la formation, le support et parfois même la vente. Dans des environnements laboratoire et diagnostic, il joue un rôle décisif dans l'adoption des solutions et la qualité de l'expérience utilisateur.\n\nCe poste attire du trafic car il est recherché à la fois par les candidats, les recruteurs et les managers commerciaux. Une bonne page doit répondre simplement aux questions concrètes: quelles missions, quel niveau scientifique, quelles compétences relationnelles, quel salaire moyen, et vers quelles écoles ou formations regarder. Lorsqu'elle est bien construite, elle peut remonter aussi bien sur Google que dans les réponses générées par les IA.\n\nPour SKS TALENTS, c'est un rôle parfait pour démontrer la capacité à parler métier avec précision, et pas seulement recrutement de manière abstraite. Plus vous publiez ce type de contenu opérationnel, plus vous devenez crédible comme source du marché.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Roche Diagnostics",
        url: "https://diagnostics.roche.com/"
      },
      {
        name: "Mindray - Laboratory diagnostics",
        url: "https://www.mindray.com/en/products-solutions/solutions/laboratory-diagnostics"
      }
    ]
  },
  {
    id: "cybersecurity-medtech-diagnostic",
    title: "Cybersecurity medtech & diagnostic: un métier encore sous-couvert",
    slug: "cybersecurity-medtech-diagnostic",
    vertical: "diagnostic",
    persona: ["CEO", "COO"],
    topic: "skills",
    excerpt: "Pourquoi la cybersécurité appliquée aux environnements healthtech mérite une vraie place dans votre bibliothèque métiers.",
    content:
      "La cybersécurité appliquée à la medtech et au diagnostic reste peu visible dans les médias RH traditionnels, alors qu'elle devient structurante pour les fabricants, intégrateurs et acteurs de la donnée santé. Entre les équipements connectés, les flux interopérables, les middleware et les contraintes réglementaires, les organisations ont besoin de profils capables de protéger sans bloquer l'opérationnel.\n\nCe type de contenu est stratégique car il se situe au croisement de plusieurs tendances de recherche: cybersécurité, santé, industrie réglementée et métiers pénuriques. Il intéresse aussi bien les entreprises que les candidats qui cherchent à se repositionner sur des secteurs à plus forte valeur. En SEO comme en visibilité IA, ce sont souvent ces niches encore peu couvertes qui offrent le plus grand potentiel.\n\nPour SKS TALENTS, publier régulièrement sur ces rôles crée un pont précieux entre vos verticales historiques et les métiers d'avenir qui vont peser dans les décisions de recrutement des prochaines années.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Bpifrance - Biotech and Medtech VC funds",
        url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/"
      }
    ]
  },
  {
    id: "drh-life-sciences-hypercroissance",
    title: "DRH Life Sciences en hypercroissance: ce qu'il faut structurer en priorité",
    slug: "drh-life-sciences-hypercroissance",
    vertical: "biotech",
    persona: ["CEO", "DRH"],
    topic: "recruitment",
    excerpt: "Un angle très business sur la fonction RH quand la croissance accélère dans les marchés scientifiques.",
    content:
      "Dans les Life Sciences, une DRH ne peut pas être seulement une fonction support. Quand la croissance accélère, elle devient une architecte de l'organisation: calibration des rôles, hiérarchisation des priorités, sécurisation des recrutements, accompagnement des managers, outillage RH et marque employeur. C'est particulièrement vrai sur les marchés où l'erreur de recrutement coûte cher et où la rétention devient un enjeu de compétitivité.\n\nCe contenu est important car il répond à une vraie question marché: de quoi une DRH a-t-elle besoin pour exceller dans une biotech, un acteur du diagnostic ou une société de santé animale ? En apportant une réponse claire, concrète et orientée exécution, SKS TALENTS se différencie fortement des contenus RH généralistes.\n\nPour le trafic, ce type d'article joue un rôle clé: il attire les dirigeants, les RH eux-mêmes, mais aussi les moteurs conversationnels qui cherchent des synthèses utiles sur les fonctions critiques d'un secteur donné. C'est exactement ce type de pièce éditoriale qui nourrit la crédibilité d'une plateforme de niche.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 9,
    sources: [
      {
        name: "Trustpilot SKS TALENTS",
        url: "https://fr.trustpilot.com/review/skstalents.fr"
      }
    ]
  },
  {
    id: "devenir-veterinaire-france",
    title: "Devenir vétérinaire en France : les 5 écoles à connaître",
    slug: "devenir-veterinaire-france",
    vertical: "vet-services",
    persona: ["CEO", "DRH"],
    topic: "market",
    excerpt:
      "Une page de référence sur les écoles vétérinaires françaises, les parcours et les premiers repères pour les étudiants et jeunes diplômés.",
    content:
      "Pour les recherches liées à l'orientation vétérinaire, une information revient immédiatement sur le site de l'Ordre national des vétérinaires : cinq établissements de l'enseignement supérieur en France forment des vétérinaires. Le même contenu précise qu'il s'agit de quatre écoles publiques et d'une école privée. C'est un point d'entrée utile pour les étudiants, les familles, les jeunes diplômés et les acteurs qui recrutent en santé animale.\n\nLes écoles citées par l'Ordre sont l'École nationale vétérinaire d'Alfort, l'École nationale vétérinaire de Toulouse, Oniris VetAgroBio Nantes, VetAgro Sup à Lyon et l'école vétérinaire UniLaSalle Rouen. Pour SKS TALENTS, cette cartographie a un intérêt SEO fort mais aussi business : elle relie directement la formation initiale aux viviers de talents pour les groupes de cliniques, l'industrie vétérinaire, la nutrition animale, les fabricants d'équipements et les fonctions support spécialisées.\n\nCette page a aussi vocation à rassurer sur le parcours. Les recherches autour de 'devenir vétérinaire', 'écoles vétérinaires France' ou 'étudiant vétérinaire' sont souvent fragmentées. En agrégeant les sources officielles, les écoles et les débouchés, SKS TALENTS peut devenir une ressource plus claire, plus orientée métier et plus utile qu'une simple liste de liens. C'est exactement ce type de contenu de référence qui aide à remonter dans Google et dans les moteurs conversationnels lorsque quelqu'un cherche des informations concrètes sur la profession.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Ordre national des vétérinaires - Les écoles",
        url: "https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles"
      }
    ]
  },
  {
    id: "ecoles-metiers-animaliers",
    title: "Écoles des métiers animaliers : formations, diplômes et débouchés",
    slug: "ecoles-metiers-animaliers",
    vertical: "vet-services",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt:
      "Un guide SEO sur les écoles des métiers animaliers, du parcours vétérinaire aux formations courtes autour des animaux.",
    content:
      "Les écoles des métiers animaliers attirent des profils très variés : futurs vétérinaires, auxiliaires de santé animale, soigneurs, éleveurs, éducateurs, toiletteurs ou profils orientés comportement animal. En pratique, les formations peuvent aller d'une certification courte à un master, en passant par les bacs professionnels, les BTS ou les bachelors. Le contenu doit donc clarifier les différences entre les parcours, les niveaux de diplôme et les débouchés possibles.\n\nPour le référencement, ce sujet est particulièrement intéressant car il relie plusieurs intentions de recherche : 'trouver mon école', 'm'aider à choisir', 'travailler avec les animaux', 'devenir auxiliaire vétérinaire', 'école métier animalier'. En reliant ces requêtes aux pages écoles, aux fiches métiers et aux secteurs couverts par SKS TALENTS, on construit une vraie bibliothèque utile pour les étudiants comme pour les recruteurs qui souhaitent comprendre les bassins de formation.\n\nDu point de vue business, ces pages servent aussi la marque employeur et l'autorité sectorielle. Elles permettent de parler non seulement du vétérinaire praticien, mais aussi de toute la chaîne des métiers animaliers et des industries connexes : santé animale, petfood, groupements de cliniques, laboratoires, équipementiers et services spécialisés autour des animaux.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 9,
    sources: [
      {
        name: "Thotis - Écoles des métiers animaliers",
        url: "https://thotismedia.com/ecoles-des-metiers-animaliers/"
      },
      {
        name: "Ordre national des vétérinaires - Les écoles",
        url: "https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles"
      }
    ]
  },
  {
    id: "conditions-exercice-veterinaire-france",
    title: "Conditions d'exercice vétérinaire en France : les repères à connaître",
    slug: "conditions-exercice-veterinaire-france",
    vertical: "vet-services",
    persona: ["CEO", "DRH"],
    topic: "market",
    excerpt:
      "Une synthèse claire pour relier l'exercice vétérinaire, les jeunes diplômés, l'exercice en société et les démarches ordinales.",
    content:
      "Les conditions d'exercice vétérinaire en France restent un sujet de recherche concret, autant pour les professionnels que pour les groupes de cliniques, les recruteurs et les étudiants en fin de cursus. Le site de l'Ordre national des vétérinaires centralise justement plusieurs points d'entrée utiles : les conditions d'exercice en France, les ressources pour les jeunes diplômés, l'entrée dédiée aux étudiants vétérinaires, l'entraide au sein de la profession et l'exercice en société des associés vétérinaires.\n\nPour SKS TALENTS, ce sujet est intéressant car il relie directement le recrutement, l'installation, la gouvernance clinique, la structuration RH et les réalités du terrain. Une bonne page de référence doit donc croiser les sources officielles, les débouchés et les besoins des organisations qui recrutent : groupes de cliniques, laboratoires vétérinaires, industries santé animale et acteurs du service.\n\nEn SEO, ce type de contenu permet de capter des requêtes à forte utilité pratique. En visibilité conversationnelle, il renforce surtout la crédibilité du site dès qu'une question touche à la profession vétérinaire, aux démarches ou à l'organisation de l'exercice.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Ordre national des vétérinaires - Les conditions d'exercice en France",
        url: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/les-conditions-dexercice-en-france"
      },
      {
        name: "Ordre national des vétérinaires - L'exercice en société des associés vétérinaires",
        url: "https://www.veterinaire.fr/je-suis-veterinaire/mon-exercice-professionnel/lexercice-en-societe-des-associes-veterinaires"
      }
    ]
  },
  {
    id: "france-biotech-cartographie-fonds-sante-2024",
    title: "France Biotech 2024 : les fonds santé français à suivre",
    slug: "france-biotech-cartographie-fonds-sante-2024",
    vertical: "biotech",
    persona: ["CEO", "COO"],
    topic: "market",
    excerpt:
      "Une synthèse éditoriale à partir de la cartographie France Biotech 2024 pour structurer les pages fonds, entreprises financées et signaux hiring.",
    content:
      "La synthèse France Biotech sur la cartographie des fonds d'investissement français en santé en 2024 donne un cadre très utile pour le contenu éditorial de SKS TALENTS. Le document précise que la cartographie couvre les gestionnaires de fonds privés dont le siège est situé en France, avec des investissements en amorçage, séries A, B, C, D et post-cotation, sur les biotechnologies, les dispositifs médicaux, ainsi que les logiciels, solutions numériques et l'IA appliquée à la santé.\n\nUn signal fort du document est l'ordre de grandeur du marché français : la synthèse fait apparaître qu'environ soixante-cinq fonds français investissent en santé. Elle donne aussi un Top 10 par montant total de fonds, avec notamment Eurazeo Growth Fund III à 1 900 M€, Mérieux Participations 4 à 568 M€, Jeito I à 534 M€, Cathay Healthcare à 500 M€ et Andera Biodiscovery 6 à 456 M€.\n\nPour SKS TALENTS, ce type de contenu ne sert pas seulement à parler financement. Il permet aussi de nourrir les pages 'funds', les articles de veille, les comparatifs et les signaux de recrutement autour des entreprises financées. C'est un très bon exemple de page hub: exacte sur les chiffres, utile pour les dirigeants et directement exploitable pour la stratégie SEO sur les Life Sciences, la medtech et la santé numérique.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 10,
    sources: [
      {
        name: "France Biotech - Cartographie des fonds d'investissement français en santé en 2024 (synthèse)",
        url: "https://france-biotech.fr/wp-content/uploads/2025/01/Cartographie-des-fonds-dinvestissement-francais-en-sante-en-2024-Synthese-1.pdf"
      }
    ]
  },
  {
    id: "aon-remuneration-life-sciences-2025-2026",
    title: "Rémunération Life Sciences 2025-2026 : ce que dit Aon pour l'Europe et la France",
    slug: "aon-remuneration-life-sciences-2025-2026",
    vertical: "biotech",
    persona: ["CEO", "DRH", "CPO"],
    topic: "market",
    excerpt:
      "Budgets salariaux, mérite, inflation et fonctions sous tension : une synthèse business du webinar Aon pour France Biotech.",
    content:
      "Le webinar Aon réalisé pour France Biotech en novembre 2025 donne un repère très utile pour piloter rémunération, attraction et rétention dans les Life Sciences. Aon indique que les augmentations moyennes globales de salaire de base en Europe de l'Ouest devraient atteindre 3,5 % en 2025, contre 3,7 % en 2024, avec des augmentations au mérite autour de 3,2 %.\n\nLe document précise aussi que la progression du salaire de base dans l'industrie des sciences de la vie atteint en moyenne 3,3 % à travers l'Europe occidentale. Pour la France, Aon montre un budget global d'augmentation de salaire à 3,5 % en 2025 et un budget prévisionnel 2026 également à 3,5 %, tandis que les augmentations individuelles au mérite se situent à 3,0 % en 2025 et 3,0 % en projection 2026.\n\nLe message RH le plus important ne concerne pas seulement les budgets. Aon cite comme fonctions les plus difficiles à recruter et à retenir les rôles en Medical Affairs, Market Access & Pricing, Regulatory Affairs, Commercial/Sales ainsi que Digital & Data Science. Pour un cabinet comme SKS TALENTS, ce signal est structurant : il valide la priorité à donner aux fonctions stratégiques et opérationnelles qui soutiennent la R&D, l'accès au marché et la commercialisation.\n\nPour les dirigeants et DRH, l'enjeu n'est donc pas seulement d'augmenter les salaires. Il s'agit surtout de calibrer les packages, la lisibilité de carrière, la rapidité de décision et la crédibilité du projet. Dans des marchés spécialisés, la rémunération reste un signal fort, mais elle ne compense pas seule une organisation lente, un scope flou ou un manque de projection.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "Aon - Études, guides et benchmarks de rémunération",
        url: "https://www.aon.com/france/produits-et-services/rh/benchmark_remuneration.jsp"
      },
      {
        name: "France Biotech",
        url: "https://france-biotech.fr/"
      }
    ]
  },
  {
    id: "clinical-development-salaire-france-europe",
    title: "Clinical Development : benchmark salaire France vs Europe",
    slug: "clinical-development-salaire-france-europe",
    vertical: "biotech",
    persona: ["DRH", "CPO"],
    topic: "skills",
    excerpt:
      "Un repère de rémunération concret à partir du benchmark Aon / France Biotech 2023-2024 pour les profils Clinical Development.",
    content:
      "Le benchmark Aon préparé pour France Biotech sur les rémunérations 2023-2024 fournit un point d'ancrage précis pour un rôle de Clinical Development en profil contributeur individuel avec 2 à 4 années d'expérience attendues. Pour la France, le niveau médian du salaire de base est indiqué à 59 169 euros.\n\nLe même document montre qu'en France, 54,9 % des salariés sur ce repère sont éligibles à un bonus, 32,6 % en reçoivent effectivement un, et que le montant moyen cible du bonus est de 7 032 euros. En comparaison, la Suisse apparaît à 133 909 euros de salaire de base médian et le Royaume-Uni à 62 580 euros, ce qui rappelle à quel point les comparaisons internationales doivent être replacées dans le coût de la vie, la fiscalité et la profondeur des marchés.\n\nAon insiste d'ailleurs sur un point essentiel : à haut niveau d'expertise ou de responsabilité, le marché des talents devient davantage européen que strictement national. La négociation du package est plus individualisée, et en France certaines organisations ajoutent participation et intéressement, ce qui change sensiblement la lecture du package total.\n\nPour SKS TALENTS, ce type de benchmark est utile de deux façons. D'abord pour éviter les fourchettes déconnectées du marché sur des postes cliniques sensibles. Ensuite pour rappeler que le salaire fixe n'est qu'une partie de l'équation : bonus, long term incentives, visibilité du rôle et qualité du programme comptent tout autant pour attirer des talents rares.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 7,
    sources: [
      {
        name: "Aon - Études, guides et benchmarks de rémunération",
        url: "https://www.aon.com/france/produits-et-services/rh/benchmark_remuneration.jsp"
      },
      {
        name: "France Biotech",
        url: "https://france-biotech.fr/"
      }
    ]
  },
  {
    id: "france-healthtech-2026-emploi-recrutement",
    title: "France HealthTech 2026 : emploi, recrutements et fonctions sous tension",
    slug: "france-healthtech-2026-emploi-recrutement",
    vertical: "biotech",
    persona: ["CEO", "DRH", "COO"],
    topic: "market",
    excerpt:
      "Les chiffres France Biotech 2026 à retenir pour piloter recrutements, R&D, commercialisation et production.",
    content:
      "Le Panorama France HealthTech 2026 confirme la résilience du secteur tout en montrant un environnement plus exigeant. La filière compte près de 2 800 entreprises innovantes en santé en 2025, plus précisément 2 738 PME innovantes en santé, réparties entre 895 biotech, 1 393 medtech et environ 410 entreprises de santé numérique / IA.\n\nSur le plan emploi, les sociétés participantes à l'étude représentent 14 493 emplois directs en 2025, et la filière HealthTech dans son ensemble environ 80 000 emplois directs. France Biotech indique que plus des deux tiers des entreprises ont recruté en 2025 et que 78 % comptent recruter en 2026, pour 1 189 recrutements prévus.\n\nLe sujet n'est pas seulement quantitatif. Le document montre que près des deux tiers des recrutements 2026 se concentreront sur la R&D, la commercialisation et la production. Plus précisément, les prévisions se répartissent entre 25 % pour la R&D, 20 % pour la commercialisation / marketing, 19 % pour la production, 15 % pour les fonctions support, 13 % pour le développement médical et clinique, puis 8 % pour les autres fonctions.\n\nPour les dirigeants, cela confirme qu'un plan de recrutement HealthTech sérieux doit couvrir toute la chaîne de valeur, de la découverte à l'accès au marché puis à l'exécution industrielle et commerciale. Pour SKS TALENTS, c'est précisément là que se joue la différence entre une approche généraliste et un recrutement réellement sectoriel.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "France Biotech - Panorama France HealthTech",
        url: "https://france-biotech.fr/publications/le-panorama-france-healthtech/"
      },
      {
        name: "France Biotech - Panorama France Healthtech 2026",
        url: "https://france-biotech.fr/videos/panorama-france-healthtech/"
      }
    ]
  },
  {
    id: "metiers-penuriques-healthtech-2026",
    title: "Les métiers les plus difficiles à recruter en HealthTech en 2026",
    slug: "metiers-penuriques-healthtech-2026",
    vertical: "diagnostic",
    persona: ["CEO", "DRH", "CPO"],
    topic: "recruitment",
    excerpt:
      "France Biotech 2026 pointe les fonctions les plus sous tension : data science, R&D, clinique, business development et réglementaire.",
    content:
      "Le Panorama France HealthTech 2026 donne un signal très clair sur les tensions de recrutement. D'après les entreprises interrogées, les postes sur lesquels les difficultés sont les plus fortes sont l'informatique / data science (38 %), la R&D (30 %), le développement médical et clinique (28 %), le business développement (26 %), les affaires réglementaires (22 %), la production (16 %), puis les ventes et l'assurance qualité à 11 %, devant les opérations à 9 %.\n\nCe classement est précieux parce qu'il relie trois besoins qui se croisent rarement sur une seule page : l'innovation scientifique, la capacité à industrialiser et l'exigence d'aller au marché. En pratique, cela veut dire que les entreprises qui cherchent à recruter des profils data, réglementaires, cliniques ou business dans la HealthTech ne sont pas en concurrence seulement avec leurs pairs directs, mais avec tout l'écosystème qui recrute en même temps sur les mêmes viviers.\n\nPour SKS TALENTS, ces chiffres justifient la construction d'une bibliothèque métiers très détaillée. Les pages qui performent demain seront celles qui expliquent concrètement les missions, les études, les écoles, les packages et les industries connexes pour ces fonctions pénuriques.\n\nSur un plan très opérationnel, ces tensions poussent aussi les entreprises à mieux définir le scope de leurs postes. Plus le rôle est flou, plus la recherche s'allonge. À l'inverse, un brief bien cadré, un package cohérent et une narration claire de l'opportunité permettent de raccourcir fortement le délai d'attraction.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 7,
    sources: [
      {
        name: "France Biotech - Panorama France HealthTech",
        url: "https://france-biotech.fr/publications/le-panorama-france-healthtech/"
      }
    ]
  },
  {
    id: "financement-healthtech-france-2025",
    title: "Financement HealthTech France 2025 : résilience du capital-risque, prudence sur le reste",
    slug: "financement-healthtech-france-2025",
    vertical: "biotech",
    persona: ["CEO", "COO"],
    topic: "market",
    excerpt:
      "2,3 Mds€ levés en France, 1 Md€ en capital-risque et des cycles de financement plus longs : lecture business du Panorama 2026.",
    content:
      "Le Panorama France HealthTech 2026 montre un marché du financement plus sélectif, mais pas arrêté. En France, les HealthTech ont levé 2,3 milliards d'euros en 2025, soit une baisse de 10 % par rapport à 2024. Dans ce total, 1 milliard d'euros a été levé en capital-risque, en hausse de 15 %, tandis que 1,3 milliard d'euros a été levé en refinancement sur les marchés boursiers.\n\nAu niveau micro, le signal de prudence est très clair. Seules 20 % des entreprises ont levé des fonds en 2025, contre 37 % en 2024, et la durée moyenne d'une levée est estimée à 10 mois. En parallèle, 41 % des entreprises déclarent des tensions de trésorerie et 50 % rencontrent des difficultés pour se refinancer.\n\nPour un dirigeant, cela change directement la façon de recruter. Quand le financement prend plus de temps et que la visibilité cash baisse, les postes ouverts doivent être plus critiques, mieux séquencés et plus vite rentabilisés. Cela renforce la valeur des profils capables d'agir sur la R&D utile, l'accès au marché, la production et la commercialisation.\n\nPour SKS TALENTS, ce contexte confirme qu'une stratégie de recrutement ne peut plus être pensée indépendamment du cycle de financement. Les entreprises qui s'en sortent le mieux sont souvent celles qui recrutent moins, mais mieux, avec un brief très net et un vrai arbitrage entre postes de construction, postes de scale et postes de traction business.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 8,
    sources: [
      {
        name: "France Biotech - Panorama France HealthTech",
        url: "https://france-biotech.fr/publications/le-panorama-france-healthtech/"
      },
      {
        name: "France Biotech - Panorama France Healthtech 2026",
        url: "https://france-biotech.fr/videos/panorama-france-healthtech/"
      }
    ]
  },
  {
    id: "ia-generative-healthtech-france-2026",
    title: "IA générative en HealthTech : un usage déjà massif en France en 2026",
    slug: "ia-generative-healthtech-france-2026",
    vertical: "diagnostic",
    persona: ["CEO", "COO", "DRH"],
    topic: "market",
    excerpt:
      "France Biotech 2026 montre une adoption forte de l'IA générative dans les biotech, les medtech et la santé numérique.",
    content:
      "Le Panorama France HealthTech 2026 montre que l'IA générative n'est plus un sujet théorique pour les entreprises du secteur. Près des deux tiers des sociétés utilisent déjà l'IA générative dans leurs activités, et 44 % ont déjà développé un ou plusieurs outils en interne.\n\nL'adoption est différenciée selon les segments : 53 % des biotech déclarent utiliser l'IA générative, 70 % des medtech et 73 % des entreprises de santé numérique / IA. Ce niveau de diffusion explique pourquoi les besoins en informatique et data science ressortent comme les plus difficiles à couvrir dans l'étude.\n\nPour les équipes dirigeantes, cela veut dire que la transformation IA ne se joue plus seulement dans les équipes produit ou tech. Elle concerne aussi la R&D, la qualité des données, l'industrialisation, les workflows cliniques, le support et la commercialisation. La vraie question n'est plus 'faut-il utiliser l'IA ?', mais 'quels cas d'usage prioriser et avec quelles compétences ?'.\n\nCôté recrutement, cette dynamique soutient la demande sur les profils data science, AI product, digital transformation, middleware, cybersécurité et interopérabilité santé. Pour SKS TALENTS, ces pages doivent devenir des points d'entrée à forte valeur : elles attirent du trafic, répondent à des questions concrètes et orientent vers des services de recrutement, de structuration RH ou d'orientation.",
    author: "SKS TALENTS",
    date: "2026-04-14",
    readTime: 7,
    sources: [
      {
        name: "France Biotech - Panorama France HealthTech",
        url: "https://france-biotech.fr/publications/le-panorama-france-healthtech/"
      }
    ]
  },
  {
    id: "recrutement-apres-seed-serie-a-serie-b",
    title: "Quels recrutements après une levée Seed, Série A ou Série B ?",
    slug: "recrutement-apres-seed-serie-a-serie-b",
    vertical: "biotech",
    persona: ["CEO", "COO", "DRH", "CPO"],
    topic: "market",
    excerpt:
      "Une grille simple pour prioriser direction, production, opérations, sales et ingénierie après une levée de fonds.",
    content:
      "Le volume de recrutement ne dépend pas seulement du montant levé. Il dépend surtout du stade de maturité de l'entreprise, de sa roadmap et du niveau de dette organisationnelle accumulé avant la levée. C'est pour cela que les pages SEO qui performent ne doivent pas seulement parler financement, mais expliquer très concrètement quels postes deviennent critiques après un tour Seed, Série A ou Série B.\n\nEn phase Seed, les priorités portent souvent sur quelques recrutements structurants : leadership scientifique ou produit, première couche operations, qualité, engineering, business development ou profil hybride capable de couvrir plusieurs zones grises. Le risque ici n'est pas seulement de se tromper de personne, mais de recruter trop tôt ou trop large.\n\nAprès une Série A, l'entreprise passe souvent d'une logique de preuve à une logique d'exécution. Les besoins montent sur les fonctions de production, industrialisation, RA/QA, clinical, sales, field et structuration des opérations. C'est aussi le moment où les recrutements de middle management commencent à compter autant que les têtes d'affiche.\n\nAprès une Série B, les arbitrages changent encore. Il faut sécuriser la qualité d'exécution, renforcer les équipes de direction, créer de la redondance organisationnelle et recruter des profils capables de faire tourner plusieurs lignes en parallèle : sites, régions, équipes terrain, revenue operations, supply et service. Dans les Life Sciences comme dans l'Animal Health, c'est souvent là que les erreurs coûtent le plus cher.\n\nPour SKS TALENTS, cette lecture par stade est centrale. Elle permet de relier levée de fonds, page fonds, page métier, benchmark salaire, études et contenu de veille. C'est exactement ce maillage qui transforme un site cabinet en ressource de référence utile pour Google, ChatGPT, Claude et les décideurs du marché.",
    author: "SKS TALENTS",
    date: "2026-04-15",
    readTime: 8,
    sources: [
      {
        name: "France Biotech - Panorama France HealthTech",
        url: "https://france-biotech.fr/publications/le-panorama-france-healthtech/"
      },
      {
        name: "Bpifrance",
        url: "https://www.bpifrance.fr/"
      }
    ]
  }
];

export function getArticlePersonaOptions() {
  return ["Tous", ...new Set(articles.flatMap((article) => article.persona))];
}

export function getArticleVerticalLabel(vertical: string) {
  return verticalLabels[vertical] ?? vertical;
}
