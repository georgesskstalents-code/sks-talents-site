export type MarketSource = {
  name: string;
  url: string;
  note: string;
};

export type FundingSignal = {
  company: string;
  angle: string;
  sector: string;
  url: string;
  source: string;
};

export type NewsHubDetail = {
  slug: string;
  whyItMatters: string;
  editorialAngles: string[];
  sources: MarketSource[];
  fundingSignals: FundingSignal[];
};

export const editorialMarketSources: MarketSource[] = [
  {
    name: "France Biotech - cartographie des fonds santé 2024",
    url: "https://france-biotech.fr/wp-content/uploads/2025/01/Cartographie-des-fonds-dinvestissement-francais-en-sante-en-2024-Synthese-1.pdf",
    note: "Repère utile pour relier fonds actifs, signaux marché et startups à suivre."
  },
  {
    name: "Bpifrance - Biotech & Medtech",
    url: "https://www.bpifrance.fr/nos-solutions/investissement/investissement-expertise/biotech",
    note: "Source structurante pour les véhicules d’investissement et la lecture de l’écosystème santé."
  },
  {
    name: "Bpifrance - Biotech and Medtech VC funds",
    url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/",
    note: "Vue synthétique en anglais des principaux véhicules et mandats d’investissement."
  },
  {
    name: "Leaders League - Fonds santé France 2025",
    url: "https://www.leadersleague.com/fr/classements/sante-pharma-and-biotechnologies-fonds-lbo-sante-fonds-d-investissement-france-2025",
    note: "Classement utile pour relier acteurs, visibilité et signaux d’influence du marché."
  },
  {
    name: "Mars x Digitalis Ventures - Companion Fund II",
    url: "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300",
    note: "Signal fort pour la santé animale, le petcare et les logiques de scale-up du secteur."
  },
  {
    name: "Angels Santé",
    url: "https://www.angelssante.fr/",
    note: "Réseau investisseur à suivre pour les startups santé et les futurs recrutements associés."
  }
];

export const newsHubDetails: Record<string, NewsHubDetail> = {
  "mouvements-dirigeants-biotech": {
    slug: "mouvements-dirigeants-biotech",
    whyItMatters:
      "Les changements de dirigeants et d’experts signalent souvent une nouvelle phase de recrutement, de structuration ou d’ouverture internationale.",
    editorialAngles: [
      "Lire les nominations comme des signaux de croissance, pas seulement comme des annonces RH.",
      "Relier les mouvements dirigeants aux besoins downstream: sales, operations, regulatory et customer success.",
      "Mailler ces annonces avec les pages métiers, écoles et références SKS TALENTS."
    ],
    sources: editorialMarketSources.slice(0, 4),
    fundingSignals: [
      {
        company: "Faircraft.bio",
        angle: "Biotech deeptech à suivre pour ses mouvements leadership, engineering et laboratory management.",
        sector: "Biotech",
        url: "https://www.faircraft.bio/",
        source: "Entreprise / écosystème biotech"
      },
      {
        company: "Maat Pharma",
        angle: "Scale-up biotech à surveiller pour ses signaux de direction, industrialisation et stratégie clinique.",
        sector: "Biotech",
        url: "https://www.maatpharma.com/",
        source: "Seventure Life Sciences"
      }
    ]
  },
  "financements-series-a-b": {
    slug: "financements-series-a-b",
    whyItMatters:
      "Les séries A/B et les logiques de fonds santé sont souvent le point de départ des vagues de recrutement les plus visibles sur biotech, diagnostic et santé animale.",
    editorialAngles: [
      "Suivre les fonds et non seulement les startups pour anticiper les vagues hiring.",
      "Relier les levées à des rôles concrets: application, maintenance, sales, export, regulatory et leadership.",
      "Rendre chaque signal exploitable par un lecteur CEO, DRH ou candidat stratégique."
    ],
    sources: editorialMarketSources,
    fundingSignals: [
      {
        company: "Faircraft.bio",
        angle: "Entreprise deeptech à suivre dans les dynamiques françaises mêlant biotech, industrialisation et recrutements de structuration.",
        sector: "Biotech",
        url: "https://www.faircraft.bio/",
        source: "Entreprise / écosystème fonds santé"
      },
      {
        company: "Enterome",
        angle: "Biotech française souvent citée dans les portefeuilles life sciences à surveiller sur la scène financement.",
        sector: "Biotech",
        url: "https://enterome.com/",
        source: "Seventure Life Sciences"
      },
      {
        company: "Maat Pharma",
        angle: "Acteur biotech visible dans les logiques de financement santé et d’expansion d’équipes spécialisées.",
        sector: "Biotech",
        url: "https://www.maatpharma.com/",
        source: "Seventure Life Sciences"
      }
    ]
  },
  "consolidation-veterinaire": {
    slug: "consolidation-veterinaire",
    whyItMatters:
      "La consolidation des groupes de cliniques et les logiques petcare créent des besoins sur les opérations, la finance, les RH, le commerce et le support terrain.",
    editorialAngles: [
      "Suivre les groupes et plateformes qui structurent le marché vétérinaire.",
      "Relier les consolidations aux métiers de direction de clinique, COO, finance et structuration RH.",
      "Traiter aussi les signaux investors liés à la santé animale et au petcare."
    ],
    sources: editorialMarketSources.slice(3),
    fundingSignals: [
      {
        company: "Qovetia",
        angle: "À suivre pour les besoins autour des cliniques, de l’opérationnel, des RH et du business vétérinaire.",
        sector: "Vet Services",
        url: "https://qovetia.com/",
        source: "Écosystème vétérinaire"
      },
      {
        company: "Companion Fund II",
        angle: "Signal investisseur majeur à surveiller sur la santé animale et le petcare européen.",
        sector: "Animal Health",
        url: "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300",
        source: "Mars x Digitalis Ventures"
      }
    ]
  },
  "tendances-petfood-premium": {
    slug: "tendances-petfood-premium",
    whyItMatters:
      "Le petfood premium ne recrute pas seulement en R&D: les signaux marché touchent aussi le commerce, les opérations, l’export et la direction business.",
    editorialAngles: [
      "Suivre innovation produit, premiumisation et fonds liés au petcare.",
      "Relier les signaux marché aux métiers business unit, export, supply et customer service.",
      "Ancrer les articles sur des entreprises et marques visibles du secteur."
    ],
    sources: editorialMarketSources.slice(3),
    fundingSignals: [
      {
        company: "Affinity Petcare",
        angle: "À suivre pour les fonctions direction commerciale, business et croissance internationale.",
        sector: "Petfood",
        url: "https://www.affinity-petcare.com/",
        source: "Entreprise"
      },
      {
        company: "Saga Nutrition",
        angle: "À suivre pour les signaux marché sur nutrition animale, leadership commercial et structuration d’équipes.",
        sector: "Petfood",
        url: "https://www.saga-nutrition.com/",
        source: "Entreprise"
      }
    ]
  },
  "reglementation-diagnostic": {
    slug: "reglementation-diagnostic",
    whyItMatters:
      "La réglementation diagnostic transforme les besoins en application, maintenance, qualité, support client et direction des ventes dans les environnements IVD.",
    editorialAngles: [
      "Relier réglementation et organisation commerciale/technique.",
      "Faire le pont entre dispositifs, service terrain, customer support et conformité.",
      "Utiliser les signaux des acteurs leaders pour nourrir le SEO utile."
    ],
    sources: editorialMarketSources.slice(0, 4),
    fundingSignals: [
      {
        company: "Roche Diagnostics",
        angle: "À suivre pour les environnements IVD, application, maintenance et business unit management.",
        sector: "Diagnostic",
        url: "https://diagnostics.roche.com/",
        source: "Entreprise"
      },
      {
        company: "Mindray",
        angle: "À suivre pour les rôles service & support, maintenance et staffing terrain diagnostic.",
        sector: "Diagnostic",
        url: "https://www.mindray.com/en/products-solutions/solutions/laboratory-diagnostics",
        source: "Entreprise"
      },
      {
        company: "ELITechGroup",
        angle: "À suivre pour les signaux IVD, sales, application et support technique.",
        sector: "Diagnostic",
        url: "https://www.elitechgroup.com/",
        source: "Entreprise"
      }
    ]
  }
};
