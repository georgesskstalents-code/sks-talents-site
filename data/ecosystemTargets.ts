export type EcosystemTarget = {
  name: string;
  priority: "P1" | "P2" | "P3";
  angle: string;
  sectors: string[];
  url?: string;
};

export type EcosystemCategory = {
  slug: string;
  title: string;
  description: string;
  targets: EcosystemTarget[];
};

export type EcosystemDetailedPage = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  seoDescription: string;
  categorySlugs: string[];
  sectorFilter: string;
  highlights: string[];
  whyItMatters: string[];
  ctaTitle: string;
  ctaDescription: string;
};

export const ecosystemCategories: EcosystemCategory[] = [
  {
    slug: "associations-clusters",
    title: "Associations, clusters et fédérations",
    description:
      "Les réseaux sectoriels qui structurent la biotech, le diagnostic, la cosmétique, l’agro-industrie et la santé animale.",
    targets: [
      {
        name: "France Biotech",
        priority: "P1",
        angle: "fiche membre / ressource partenaire",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.france-biotech.fr/"
      },
      {
        name: "EuropaBio",
        priority: "P2",
        angle: "member ecosystem / article expert",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.europabio.org/"
      },
      {
        name: "Medicen Paris Region",
        priority: "P1",
        angle: "annuaire / partenaire écosystème",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://www.medicen.org/"
      },
      {
        name: "Lyonbiopôle Auvergne-Rhône-Alpes",
        priority: "P1",
        angle: "membre / ressource recrutement",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://www.lyonbiopole.com/"
      },
      {
        name: "Eurobiomed",
        priority: "P1",
        angle: "annuaire innovation santé",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://www.eurobiomed.org/"
      },
      {
        name: "Atlanpole Biotherapies",
        priority: "P1",
        angle: "partenaire / article expert",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.atlanpolebiotherapies.com/"
      },
      {
        name: "BioValley France",
        priority: "P1",
        angle: "annuaire acteur / publication",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.biovalley-france.com/"
      },
      {
        name: "Polepharma",
        priority: "P1",
        angle: "contenu expert recrutement pharma",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.polepharma.com/"
      },
      {
        name: "France Deeptech",
        priority: "P2",
        angle: "écosystème startup",
        sectors: ["Biotech", "MedTech", "Green Engineering"],
        url: "https://france.deeptech.com/"
      },
      {
        name: "Clubster NSL",
        priority: "P2",
        angle: "santé nutrition longévité",
        sectors: ["Life Sciences", "Diagnostic", "Petfood"],
        url: "https://www.clubster-nsl.com/"
      },
      {
        name: "PMT Healthcare",
        priority: "P2",
        angle: "medtech / diagnostics",
        sectors: ["Diagnostic", "MedTech"],
        url: "https://www.pmt-healthcare.com/"
      },
      {
        name: "Agri Sud-Ouest Innovation",
        priority: "P2",
        angle: "agro et nutrition",
        sectors: ["Agro-industrie", "Petfood", "Green Engineering"],
        url: "https://www.agrisudouest.com/"
      },
      {
        name: "Vitagora",
        priority: "P2",
        angle: "food / nutrition / innovation",
        sectors: ["Agro-industrie", "Petfood"],
        url: "https://www.vitagora.com/"
      },
      {
        name: "Cosmetic Valley",
        priority: "P1",
        angle: "cosmétique / innovation / talents",
        sectors: ["Cosmétique", "Life Sciences"],
        url: "https://cosmetic-valley.com/"
      },
      {
        name: "La Ferme Digitale",
        priority: "P3",
        angle: "agro / green engineering",
        sectors: ["Agro-industrie", "Green Engineering"],
        url: "https://www.lafermedigitale.fr/"
      }
    ]
  },
  {
    slug: "ecoles-formations",
    title: "Écoles et centres de formation",
    description:
      "Des viviers à suivre pour nourrir votre connaissance du marché des talents et des parcours de formation.",
    targets: [
      {
        name: "AgroParisTech",
        priority: "P1",
        angle: "page partenaire / ressource carrière",
        sectors: ["Agro-industrie", "Petfood", "Green Engineering"],
        url: "https://www.agroparistech.fr/"
      },
      {
        name: "Oniris",
        priority: "P1",
        angle: "page carrière / partenaire",
        sectors: ["Animal Health", "Agro-industrie"],
        url: "https://www.oniris-nantes.fr/"
      },
      {
        name: "VetAgro Sup",
        priority: "P1",
        angle: "page entreprises / carrière",
        sectors: ["Animal Health"],
        url: "https://www.vetagro-sup.fr/"
      },
      {
        name: "ENVA",
        priority: "P1",
        angle: "relation entreprises / alumni",
        sectors: ["Animal Health"],
        url: "https://www.vet-alfort.fr/"
      },
      {
        name: "ISIPCA",
        priority: "P1",
        angle: "partenaire / article métiers cosmétique",
        sectors: ["Cosmétique"],
        url: "https://www.isipca.fr/"
      },
      {
        name: "Université Paris-Saclay",
        priority: "P1",
        angle: "page insertion / partenaire",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://www.universite-paris-saclay.fr/"
      },
      {
        name: "Université de Strasbourg",
        priority: "P2",
        angle: "pharma / biotech / carrière",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.unistra.fr/"
      },
      {
        name: "Université de Montpellier",
        priority: "P2",
        angle: "pharma / life sciences",
        sectors: ["Biotech", "Life Sciences", "Cosmétique"],
        url: "https://www.umontpellier.fr/"
      },
      {
        name: "EBI Cergy",
        priority: "P1",
        angle: "alumni / entreprise partenaire",
        sectors: ["Biotech", "Cosmétique", "Agro-industrie"],
        url: "https://www.ebi-edu.com/"
      },
      {
        name: "Institut Agro Rennes-Angers",
        priority: "P2",
        angle: "page entreprises",
        sectors: ["Agro-industrie", "Petfood", "Green Engineering"],
        url: "https://institut-agro-rennes-angers.fr/"
      },
      {
        name: "Institut Agro Montpellier",
        priority: "P2",
        angle: "partenariat / carrière",
        sectors: ["Agro-industrie", "Green Engineering"],
        url: "https://www.institut-agro-montpellier.fr/"
      },
      {
        name: "Mines Nancy",
        priority: "P3",
        angle: "innovation / ingénierie verte",
        sectors: ["Green Engineering"],
        url: "https://mines-nancy.univ-lorraine.fr/"
      },
      {
        name: "Mines Paris",
        priority: "P3",
        angle: "innovation / industries scientifiques",
        sectors: ["Green Engineering", "Life Sciences"],
        url: "https://www.minesparis.psl.eu/"
      },
      {
        name: "Télécom Paris",
        priority: "P3",
        angle: "medtech / data santé",
        sectors: ["Diagnostic", "MedTech"],
        url: "https://www.telecom-paris.fr/"
      },
      {
        name: "IMT Atlantique",
        priority: "P3",
        angle: "medtech / IA / industrie",
        sectors: ["MedTech", "Green Engineering"],
        url: "https://www.imt-atlantique.fr/"
      },
      {
        name: "INSA Lyon",
        priority: "P2",
        angle: "bioingénierie / santé",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.insa-lyon.fr/"
      },
      {
        name: "Grenoble INP Ensimag",
        priority: "P3",
        angle: "data / diagnostic / medtech",
        sectors: ["Diagnostic", "MedTech"],
        url: "https://ensimag.grenoble-inp.fr/"
      },
      {
        name: "ESPCI Paris",
        priority: "P2",
        angle: "biotech / chimie / innovation",
        sectors: ["Biotech", "Cosmétique"],
        url: "https://www.espci.psl.eu/"
      },
      {
        name: "Chimie ParisTech",
        priority: "P2",
        angle: "formulation / cosmétique / chimie",
        sectors: ["Cosmétique", "Green Engineering"],
        url: "https://www.chimieparistech.psl.eu/"
      },
      {
        name: "ICAP Montpellier",
        priority: "P1",
        angle: "cosmétique / formulation",
        sectors: ["Cosmétique"]
      }
    ]
  },
  {
    slug: "innovation",
    title: "Incubateurs, accélérateurs et réseaux d’innovation",
    description:
      "Les lieux qui font émerger les startups et innovations susceptibles de recruter dans vos verticales.",
    targets: [
      {
        name: "Station F",
        priority: "P2",
        angle: "page écosystème / partenaire",
        sectors: ["Biotech", "MedTech", "Cosmétique"],
        url: "https://stationf.co/"
      },
      {
        name: "Paris Biotech Santé",
        priority: "P1",
        angle: "startup santé / recrutement",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://parisbiotechsante.org/"
      },
      {
        name: "Wilco",
        priority: "P2",
        angle: "startup / growth",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.wilco-startup.com/"
      },
      {
        name: "Euratechnologies",
        priority: "P2",
        angle: "healthtech / biotech",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.euratechnologies.com/"
      },
      {
        name: "Genopole",
        priority: "P1",
        angle: "biotech / annuaire / partenaires",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.genopole.fr/"
      },
      {
        name: "Incuballiance",
        priority: "P2",
        angle: "deeptech / santé",
        sectors: ["Biotech", "MedTech"],
        url: "https://incuballiance.com/"
      },
      {
        name: "Pulsalys",
        priority: "P2",
        angle: "valorisation / deeptech",
        sectors: ["Biotech", "MedTech", "Green Engineering"],
        url: "https://www.pulsalys.fr/"
      },
      {
        name: "SATT Ouest Valorisation",
        priority: "P2",
        angle: "biotech / medtech",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.ouest-valorisation.fr/"
      },
      {
        name: "Quest for Health",
        priority: "P2",
        angle: "santé / startups",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://questforhealth.eu/"
      },
      {
        name: "White Reflective",
        priority: "P3",
        angle: "healthtech / community",
        sectors: ["MedTech"]
      }
    ]
  },
  {
    slug: "events",
    title: "Événements et conférences",
    description:
      "Les salons, conventions et conférences qui structurent votre visibilité et votre présence dans l’écosystème.",
    targets: [
      {
        name: "BioFIT",
        priority: "P1",
        angle: "speaker / media partner / guide",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.biofit-event.com/"
      },
      {
        name: "MEDFIT",
        priority: "P1",
        angle: "speaker / partner",
        sectors: ["Diagnostic", "MedTech"],
        url: "https://www.medfit-event.com/"
      },
      {
        name: "NutrEvent",
        priority: "P1",
        angle: "partner / resource page",
        sectors: ["Biotech", "Life Sciences", "Petfood"],
        url: "https://www.nutrevent.com/"
      },
      {
        name: "France Vet",
        priority: "P1",
        angle: "exposant / contenu expert",
        sectors: ["Animal Health"],
        url: "https://francevet.fr/"
      },
      {
        name: "Forum Labo",
        priority: "P1",
        angle: "ressource / speaker",
        sectors: ["Diagnostic", "MedTech"],
        url: "https://www.forumlabo.com/"
      },
      {
        name: "JIB",
        priority: "P1",
        angle: "diagnostic / contenu expert",
        sectors: ["Diagnostic"],
        url: "https://www.jib-journees.com/"
      },
      {
        name: "Animal Health Innovation Europe",
        priority: "P1",
        angle: "partner / expert article",
        sectors: ["Animal Health"],
        url: "https://www.animalhealthinnovationeurope.com/"
      },
      {
        name: "Petfood Forum Europe",
        priority: "P2",
        angle: "content / insight contribution",
        sectors: ["Petfood"],
        url: "https://www.petfoodforumevents.com/"
      },
      {
        name: "One Health Conference",
        priority: "P2",
        angle: "tribune / participation",
        sectors: ["Life Sciences", "Animal Health"]
      },
      {
        name: "NGS World",
        priority: "P2",
        angle: "bioinfo / diagnostic insight",
        sectors: ["Diagnostic"]
      },
      {
        name: "Deeptech Founders Day",
        priority: "P2",
        angle: "expertise recrutement startup",
        sectors: ["Biotech", "MedTech"]
      },
      {
        name: "Bioproduction Congress",
        priority: "P2",
        angle: "talents process / CMC",
        sectors: ["Biotech"]
      },
      {
        name: "Healthcare AI Forum",
        priority: "P2",
        angle: "data santé / recrutement",
        sectors: ["Diagnostic", "MedTech"]
      },
      {
        name: "Clinical Data Europe",
        priority: "P2",
        angle: "data / hiring",
        sectors: ["Diagnostic", "Life Sciences"]
      },
      {
        name: "Regulatory Affairs Live",
        priority: "P2",
        angle: "talents RA / market view",
        sectors: ["Biotech", "Diagnostic", "Animal Health"]
      }
    ]
  },
  {
    slug: "funds",
    title: "Fonds, VC et finance innovation",
    description:
      "Les investisseurs et fonds qui influencent directement la création de postes et l’accélération du recrutement.",
    targets: [
      {
        name: "Bpifrance",
        priority: "P1",
        angle: "annuaire / témoignage / guide recrutement",
        sectors: ["Biotech", "Diagnostic", "MedTech", "Green Engineering"],
        url: "https://www.bpifrance.fr/"
      },
      {
        name: "EIC Fund",
        priority: "P2",
        angle: "beneficiary ecosystem content",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://eic.ec.europa.eu/eic-fund_en"
      },
      {
        name: "Seventure Partners",
        priority: "P2",
        angle: "portfolio talent insight",
        sectors: ["Biotech", "Animal Health"],
        url: "https://www.seventure.fr/en/"
      },
      {
        name: "Sofina",
        priority: "P2",
        angle: "portfolio / thought leadership",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.sofinagroup.com/"
      },
      {
        name: "Kurma Partners",
        priority: "P2",
        angle: "animal health / biotech",
        sectors: ["Biotech", "Animal Health"],
        url: "https://kurmapartners.com/"
      },
      {
        name: "Demeter",
        priority: "P2",
        angle: "green engineering / food / biotech",
        sectors: ["Green Engineering", "Petfood", "Biotech"],
        url: "https://demeter-im.com/"
      },
      {
        name: "UI Investissement Santé",
        priority: "P3",
        angle: "healthcare ecosystem",
        sectors: ["Biotech", "Diagnostic"]
      },
      {
        name: "Andera Partners",
        priority: "P2",
        angle: "healthcare / biotech content",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.anderapartners.com/"
      },
      {
        name: "Eurazeo Healthcare",
        priority: "P2",
        angle: "growth / healthtech",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.eurazeo.com/"
      },
      {
        name: "Jeito Capital",
        priority: "P2",
        angle: "biotech ecosystem / hiring",
        sectors: ["Biotech"],
        url: "https://www.jeito.life/"
      }
    ]
  },
  {
    slug: "media",
    title: "Médias, blogs et publications sectorielles",
    description:
      "Les publications à cibler pour être cité comme source experte par les recruteurs, décideurs et moteurs IA.",
    targets: [
      {
        name: "Biotech.info",
        priority: "P1",
        angle: "tribune / interview / étude",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://biotechinfo.fr/"
      },
      {
        name: "L'Usine Nouvelle Santé",
        priority: "P2",
        angle: "tribune / interview",
        sectors: ["Biotech", "Diagnostic", "MedTech"],
        url: "https://www.usinenouvelle.com/"
      },
      {
        name: "Les Echos Start / santé",
        priority: "P2",
        angle: "tribune / portrait",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://start.lesechos.fr/"
      },
      {
        name: "Maddyness",
        priority: "P2",
        angle: "startup / RH / growth angle",
        sectors: ["Biotech", "MedTech", "Cosmétique"],
        url: "https://www.maddyness.com/"
      },
      {
        name: "FrenchWeb",
        priority: "P2",
        angle: "startup / talent / IA / biotech",
        sectors: ["Biotech", "MedTech"],
        url: "https://www.frenchweb.fr/"
      },
      {
        name: "Mind Health / TICpharma-like",
        priority: "P3",
        angle: "angle niche",
        sectors: ["Diagnostic", "MedTech"]
      },
      {
        name: "News Tank Santé",
        priority: "P2",
        angle: "expert quote / interview",
        sectors: ["Biotech", "Life Sciences"],
        url: "https://www.newstank.fr/"
      },
      {
        name: "The Pharma Network",
        priority: "P3",
        angle: "tribune marché",
        sectors: ["Biotech"]
      },
      {
        name: "Hospitalia",
        priority: "P3",
        angle: "recrutement santé / tendances",
        sectors: ["Diagnostic", "Life Sciences"],
        url: "https://www.hospitalia.fr/"
      },
      {
        name: "Bref Eco / région innovation",
        priority: "P3",
        angle: "histoire de croissance",
        sectors: ["Biotech", "Green Engineering"],
        url: "https://www.brefeco.com/"
      }
    ]
  },
  {
    slug: "platforms",
    title: "Communautés, annuaires et plateformes professionnelles",
    description:
      "Les plateformes qui renforcent votre présence de marque, vos citations et vos signaux d’entité.",
    targets: [
      {
        name: "LinkedIn entreprise SKS TALENTS",
        priority: "P1",
        angle: "profil entité relié",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://linkedin.com/m/search/results/all/?keywords=sks+talents&fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86378852&position=0&origin=RICH_QUERY_TYPEAHEAD_HISTORY&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BrPgcaT3hSCqaGuomz7Pvvw%3D%3D"
      },
      {
        name: "Trustpilot",
        priority: "P1",
        angle: "profil marque / avis",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://fr.trustpilot.com/review/skstalents.fr"
      },
      {
        name: "Pappers",
        priority: "P1",
        angle: "fiche entreprise",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://www.pappers.fr/entreprise/specific-key-skills-talents-919079392"
      },
      {
        name: "Societe.com",
        priority: "P2",
        angle: "fiche / citations",
        sectors: ["Life Sciences", "Animal Health"]
      },
      {
        name: "Welcome to the Jungle",
        priority: "P2",
        angle: "page entreprise",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://www.welcometothejungle.com/"
      },
      {
        name: "JobTeaser",
        priority: "P2",
        angle: "campus / employeur / contenu carrière",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://www.jobteaser.com/"
      },
      {
        name: "Hellowork recruteur",
        priority: "P3",
        angle: "marque employeur",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://www.hellowork.com/fr-fr/"
      },
      {
        name: "APEC",
        priority: "P2",
        angle: "ressource ou citation",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://www.apec.fr/"
      },
      {
        name: "Indeed Entreprises",
        priority: "P3",
        angle: "contenu expert",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://fr.indeed.com/"
      },
      {
        name: "ChooseMyCompany",
        priority: "P3",
        angle: "réputation employeur / marque",
        sectors: ["Life Sciences", "Animal Health"],
        url: "https://choosemycompany.com/"
      }
    ]
  },
  {
    slug: "partners",
    title: "Partenaires, clients et leviers relationnels",
    description:
      "Les entreprises et partenaires qui peuvent devenir des relais de crédibilité et de co-contenu.",
    targets: [
      {
        name: "Faircraft.bio",
        priority: "P1",
        angle: "case study co-brandée",
        sectors: ["Biotech"],
        url: "https://www.faircraft.bio/"
      },
      {
        name: "Roche Diagnostics",
        priority: "P1",
        angle: "témoignage / contenu expert",
        sectors: ["Diagnostic"],
        url: "https://diagnostics.roche.com/"
      },
      {
        name: "Beckman Coulter",
        priority: "P2",
        angle: "article sectoriel / visibilité",
        sectors: ["Diagnostic"],
        url: "https://www.beckmancoulter.com/"
      },
      {
        name: "Mindray",
        priority: "P2",
        angle: "insight recrutement diagnostic",
        sectors: ["Diagnostic"],
        url: "https://www.mindray.com/"
      },
      {
        name: "Visionix",
        priority: "P2",
        angle: "contenu métiers dispositifs",
        sectors: ["MedTech"],
        url: "https://www.visionix.com/"
      },
      {
        name: "Conexsanté",
        priority: "P2",
        angle: "partenariat contenu / talent",
        sectors: ["MedTech"]
      },
      {
        name: "Affinity Petcare",
        priority: "P1",
        angle: "case study / talent article",
        sectors: ["Petfood", "Animal Health"],
        url: "https://www.affinity-petcare.com/"
      },
      {
        name: "Saga Nutrition",
        priority: "P1",
        angle: "contenu petfood / hiring",
        sectors: ["Petfood"]
      },
      {
        name: "Qovetia",
        priority: "P1",
        angle: "partenariat contenu santé animale",
        sectors: ["Animal Health"],
        url: "https://www.qovetia.com/"
      },
      {
        name: "Solabia",
        priority: "P2",
        angle: "article / case / talent insight",
        sectors: ["Biotech", "Cosmétique"],
        url: "https://www.solabia.com/"
      }
    ]
  }
];

export const ecosystemPriorityTargets = [
  { name: "France Biotech", href: "https://france-biotech.fr/" },
  { name: "Leem", href: "https://www.leem.org/" },
  { name: "Sidiv", href: "https://www.sidiv.fr/" },
  { name: "Snitem", href: "https://www.snitem.fr/" },
  { name: "Medicen Paris Region", href: "https://www.medicen.org/" },
  { name: "Lyonbiopôle Auvergne-Rhône-Alpes", href: "https://www.lyonbiopole.com/" },
  { name: "Cosmetic Valley", href: "https://cosmetic-valley.com/" },
  { name: "BioFIT", href: "https://www.biofit-event.com/" },
  { name: "MEDFIT", href: "https://www.medfit-event.com/" },
  { name: "France Vet", href: "https://france.vet/" },
  { name: "AgroParisTech", href: "https://www.agroparistech.fr/" },
  { name: "Oniris", href: "https://www.oniris-nantes.fr/" },
  { name: "VetAgro Sup", href: "https://www.vetagro-sup.fr/" },
  { name: "ISIPCA", href: "https://www.isipca.fr/" },
  { name: "EBI Cergy", href: "https://www.ebi-edu.com/" },
  { name: "Genopole", href: "https://www.genopole.fr/" }
] as const;

export const ecosystemDetailedPages: EcosystemDetailedPage[] = [
  {
    slug: "clusters-biotech",
    title: "Clusters biotech a suivre en France",
    kicker: "Biotech",
    description:
      "Les clusters, pôles et réseaux qui structurent la biotech française et créent des opportunités de recrutement, de visibilité et de partenariat.",
    seoDescription:
      "Panorama des clusters biotech à suivre en France: réseaux, pôles, annuaires et relais utiles pour recruter, comprendre le marché et gagner en visibilité.",
    categorySlugs: ["associations-clusters", "innovation"],
    sectorFilter: "Biotech",
    highlights: [
      "Identifier les bassins où les startups biotech se structurent plus vite.",
      "Repérer les réseaux qui publient membres, événements et actualités indexables.",
      "Créer des liens durables avec les écosystèmes qui influencent le hiring."
    ],
    whyItMatters: [
      "Les clusters sont souvent les premiers relais de visibilité d’un cabinet spécialisé.",
      "Ils permettent de toucher fondateurs, scientifiques, RH et investisseurs au même endroit.",
      "Ils aident à nourrir une stratégie de contenus crédible autour du marché biotech français."
    ],
    ctaTitle: "Structurer votre veille biotech",
    ctaDescription: "Échangeons si vous voulez prioriser les clusters, événements et viviers à activer pour vos prochains recrutements biotech."
  },
  {
    slug: "ecoles-cosmetique",
    title: "Ecoles cosmetique et formulation a suivre",
    kicker: "Cosmétique",
    description:
      "Les écoles, programmes et centres de formation qui alimentent les métiers de la formulation, de l’innovation produit, du réglementaire et du développement cosmétique.",
    seoDescription:
      "Sélection d’écoles cosmétique, formulation et chimie à suivre pour comprendre les viviers de talents et les parcours de formation du secteur.",
    categorySlugs: ["ecoles-formations"],
    sectorFilter: "Cosmétique",
    highlights: [
      "Cartographier les viviers les plus visibles sur les métiers formulation et innovation.",
      "Relier les écoles aux besoins des marques et laboratoires en croissance.",
      "Créer un contenu utile à la fois pour candidats, recruteurs et partenaires."
    ],
    whyItMatters: [
      "Les requêtes école + métier captent une audience très qualifiée.",
      "La cosmétique reste sous-traitée par beaucoup de cabinets multisectoriels.",
      "Une bonne cartographie écoles renforce votre autorité sur la verticale beauté scientifique."
    ],
    ctaTitle: "Cartographier les viviers cosmétique",
    ctaDescription: "Nous pouvons vous aider à relier écoles, métiers et besoins business sur la formulation, le réglementaire et l’innovation produit."
  },
  {
    slug: "fonds-sante",
    title: "Fonds sante et investisseurs a suivre",
    kicker: "Funds",
    description:
      "Les fonds, VCs et financeurs à suivre pour comprendre où se créent les nouvelles équipes en biotech, diagnostic, medtech et santé animale.",
    seoDescription:
      "Les fonds santé et investisseurs à suivre pour comprendre les dynamiques de hiring dans la biotech, la medtech, le diagnostic et l’innovation santé.",
    categorySlugs: ["funds"],
    sectorFilter: "Life Sciences",
    highlights: [
      "Faire le lien entre financement, accélération produit et besoins de recrutement.",
      "Repérer les portefeuilles qui peuvent devenir des gisements de futurs clients.",
      "Positionner SKS TALENTS comme observateur du hiring post-funding."
    ],
    whyItMatters: [
      "Les annonces d’investissement précèdent souvent les vagues d’embauche.",
      "Les décideurs recherchent des partenaires qui comprennent ce cycle.",
      "Ces contenus sont bien adaptés aux moteurs IA quand ils relient contexte et utilité métier."
    ],
    ctaTitle: "Relier funding et hiring",
    ctaDescription: "Si vous voulez convertir les signaux de financement en plan de recrutement, ce type de lecture sectorielle est un vrai levier."
  },
  {
    slug: "events-diagnostic",
    title: "Evenements diagnostic et medtech a suivre",
    kicker: "Diagnostic",
    description:
      "Les événements, conventions et rendez-vous clés du diagnostic, de la data santé et de la medtech pour suivre les signaux marché et les acteurs qui recrutent.",
    seoDescription:
      "Panorama des événements diagnostic et medtech à suivre pour comprendre le marché, repérer les acteurs actifs et renforcer sa présence sectorielle.",
    categorySlugs: ["events"],
    sectorFilter: "Diagnostic",
    highlights: [
      "Identifier les événements où les décideurs diagnostic se rencontrent réellement.",
      "Relier présence terrain, contenus courts et pages SEO durables.",
      "Créer des angles éditoriaux autour des tendances NGS, IVD, IA et data clinique."
    ],
    whyItMatters: [
      "Le diagnostic est fortement événementialisé et très propice au contenu expert.",
      "Un bon maillage événements + articles + fiches métiers renforce votre pertinence thématique.",
      "Ces pages peuvent générer des requêtes non-brand utiles toute l’année."
    ],
    ctaTitle: "Activer le bon terrain diagnostic",
    ctaDescription: "Nous pouvons transformer cette veille événements en plan d’action contenu, visibilité et recrutement pour votre activité diagnostic."
  },
  {
    slug: "clusters-diagnostic-medtech",
    title: "Clusters diagnostic et medtech a suivre",
    kicker: "Diagnostic & MedTech",
    description:
      "Les clusters, pôles et réseaux qui structurent le diagnostic et la medtech en France et en Europe.",
    seoDescription:
      "Panorama des clusters diagnostic et medtech à suivre pour comprendre les écosystèmes qui créent visibilité, partenariats et opportunités de recrutement.",
    categorySlugs: ["associations-clusters", "innovation"],
    sectorFilter: "Diagnostic",
    highlights: [
      "Repérer les lieux où se croisent IVD, medtech, IA santé et diagnostics moléculaires.",
      "Identifier les réseaux qui publient membres, actualités et événements citables.",
      "Créer des ponts entre visibilité sectorielle et besoins de recrutement."
    ],
    whyItMatters: [
      "Le diagnostic fonctionne beaucoup par réseaux, démonstrations et conventions spécialisées.",
      "La medtech est plus lisible quand elle est reliée à ses pôles et clusters.",
      "Ces pages attirent une audience très qualifiée, souvent business."
    ],
    ctaTitle: "Renforcer votre présence diagnostic",
    ctaDescription: "Nous pouvons vous aider à transformer ces réseaux en visibilité utile et en pipeline de recrutement."
  },
  {
    slug: "ecoles-animal-health",
    title: "Ecoles sante animale et veterinaire a suivre",
    kicker: "Animal Health",
    description:
      "Les écoles et établissements à suivre pour comprendre les viviers vétérinaires, nutrition animale et santé publique animale.",
    seoDescription:
      "Sélection d’écoles santé animale et vétérinaire à suivre pour cartographier les viviers de talents et les parcours de formation du secteur.",
    categorySlugs: ["ecoles-formations"],
    sectorFilter: "Animal Health",
    highlights: [
      "Mieux lire les viviers liés aux cliniques, laboratoires et nutrition animale.",
      "Rapprocher les établissements des besoins réels de recrutement.",
      "Créer un contenu utile pour employeurs et candidats du secteur."
    ],
    whyItMatters: [
      "La santé animale souffre souvent d’une tension forte sur certains profils.",
      "Les écoles spécialisées sont des points d’entrée SEO et relationnels puissants.",
      "Cette verticale gagne quand elle est traitée de manière dédiée."
    ],
    ctaTitle: "Cibler les viviers santé animale",
    ctaDescription: "Nous pouvons vous aider à relier établissements, tensions marché et besoins concrets sur vos recrutements santé animale."
  },
  {
    slug: "ecoles-agro-green-engineering",
    title: "Ecoles agro-industrie et ingenierie verte a suivre",
    kicker: "Agro & Green",
    description:
      "Les établissements à suivre pour les viviers agro-industrie, durabilité, procédés, packaging et ingénierie verte.",
    seoDescription:
      "Panorama des écoles agro-industrie et ingénierie verte à suivre pour mieux comprendre les bassins de talents en innovation durable.",
    categorySlugs: ["ecoles-formations"],
    sectorFilter: "Green Engineering",
    highlights: [
      "Identifier les formations utiles à l’agro, au petfood et aux industries durables.",
      "Rapprocher les enjeux procédés, data et formulation des établissements pertinents.",
      "Mieux lire les parcours hybrides industrie et durabilité."
    ],
    whyItMatters: [
      "L’ingénierie verte reste peu couverte par les cabinets généralistes.",
      "Ces pages vous différencient fortement sur des requêtes plus spécifiques.",
      "Elles créent aussi des passerelles naturelles vers petfood et agro-industrie."
    ],
    ctaTitle: "Activer les bons viviers agro & green",
    ctaDescription: "Nous pouvons vous aider à prioriser les écoles et formations utiles à vos enjeux d’innovation durable."
  },
  {
    slug: "media-biotech-sante",
    title: "Medias biotech et sante a suivre",
    kicker: "Médias",
    description:
      "Les médias, newsletters et publications à suivre pour capter les signaux de marché et construire une présence éditoriale crédible.",
    seoDescription:
      "Les médias biotech et santé à suivre pour nourrir sa veille, trouver des angles éditoriaux et renforcer sa visibilité sectorielle.",
    categorySlugs: ["media"],
    sectorFilter: "Biotech",
    highlights: [
      "Repérer les publications qui comptent vraiment dans votre niche.",
      "Créer des angles de tribunes et d’interviews plus crédibles.",
      "Renforcer les citations de marque là où vos prospects s’informent."
    ],
    whyItMatters: [
      "Les médias sectoriels restent des accélérateurs de crédibilité.",
      "Ils nourrissent aussi les signaux repris ensuite par les moteurs IA.",
      "Une présence éditoriale régulière améliore votre empreinte non-brand."
    ],
    ctaTitle: "Construire une présence média plus forte",
    ctaDescription: "Nous pouvons transformer vos expertises sectorielles en angles éditoriaux plus visibles et plus utiles."
  },
  {
    slug: "plateformes-marque-employeur",
    title: "Plateformes marque employeur et entite a suivre",
    kicker: "Plateformes",
    description:
      "Les plateformes qui renforcent vos signaux d’entité, vos avis, vos citations et votre lisibilité de marque.",
    seoDescription:
      "Les plateformes marque employeur et entité à suivre pour renforcer sa visibilité, ses citations de marque et sa présence en ligne.",
    categorySlugs: ["platforms"],
    sectorFilter: "Life Sciences",
    highlights: [
      "Uniformiser marque, email, domaine et présence publique.",
      "Créer des points d’entrée fiables autour de la marque SKS TALENTS.",
      "Renforcer la cohérence des signaux qui structurent votre présence publique."
    ],
    whyItMatters: [
      "Les moteurs ont besoin de repères cohérents pour bien comprendre une entité.",
      "Les profils externes crédibles soutiennent vos pages principales.",
      "C’est l’un des moyens les plus simples de démarrer proprement."
    ],
    ctaTitle: "Renforcer vos signaux de marque",
    ctaDescription: "Nous pouvons vous aider à aligner présence publique, contenus et signaux d’entité sur les plateformes clés."
  },
  {
    slug: "partners-diagnostic",
    title: "Partenaires diagnostic a suivre",
    kicker: "Diagnostic",
    description:
      "Les entreprises et partenaires à suivre pour comprendre les mouvements, les besoins métiers et les signaux de croissance du diagnostic.",
    seoDescription:
      "Les partenaires diagnostic à suivre pour relier visibilité marché, métiers en tension et opportunités de contenu sectoriel.",
    categorySlugs: ["partners"],
    sectorFilter: "Diagnostic",
    highlights: [
      "Relier entreprises visibles et besoins métiers spécifiques.",
      "Créer des cas d’usage ou contenus orientés diagnostic et IVD.",
      "Faire remonter des signaux plus concrets que des pages génériques."
    ],
    whyItMatters: [
      "Le diagnostic se gagne souvent par preuves, références et expertise terrain.",
      "Les partenaires visibles servent aussi de relais de crédibilité.",
      "Ces pages parlent directement aux décideurs du secteur."
    ],
    ctaTitle: "Faire parler votre expertise diagnostic",
    ctaDescription: "Nous pouvons vous aider à transformer vos références diagnostic en preuve sectorielle utile et visible."
  },
  {
    slug: "partners-animal-health-petfood",
    title: "Partenaires sante animale et petfood a suivre",
    kicker: "Animal Health & Petfood",
    description:
      "Les partenaires et entreprises à suivre dans la santé animale, les groupes vétérinaires et le petfood premium.",
    seoDescription:
      "Panorama de partenaires santé animale et petfood à suivre pour comprendre les dynamiques du secteur et renforcer sa présence spécialisée.",
    categorySlugs: ["partners"],
    sectorFilter: "Animal Health",
    highlights: [
      "Relier références clients, réseaux vétérinaires et marchés petcare.",
      "Créer des angles de contenus plus différenciants sur la santé animale.",
      "Faire émerger une expertise visible sur une niche encore sous-couverte."
    ],
    whyItMatters: [
      "La santé animale reste un excellent terrain de différenciation SEO.",
      "Les contenus sectoriels bien faits y sont encore relativement rares.",
      "Les partenaires et réseaux comptent beaucoup dans la confiance marché."
    ],
    ctaTitle: "Renforcer votre empreinte santé animale",
    ctaDescription: "Nous pouvons structurer avec vous une lecture plus visible des marchés vétérinaires, petcare et petfood premium."
  },
  {
    slug: "funds-biotech-growth",
    title: "Fonds biotech growth a suivre",
    kicker: "Funds",
    description:
      "Les fonds et investisseurs à suivre pour lire les signaux de croissance biotech et anticiper les futurs besoins de recrutement.",
    seoDescription:
      "Les fonds biotech growth à suivre pour comprendre le lien entre financement, accélération business et besoins de recrutement.",
    categorySlugs: ["funds"],
    sectorFilter: "Biotech",
    highlights: [
      "Relier croissance du portefeuille et futurs besoins de recrutement.",
      "Identifier les investisseurs à forte influence sectorielle.",
      "Créer des contenus utiles autour du hiring post-funding."
    ],
    whyItMatters: [
      "Les fonds sont des signaux précoces de futures vagues de hires.",
      "Ces contenus sont recherchés par les candidats, fondateurs et recruteurs.",
      "Ils renforcent votre positionnement analytique."
    ],
    ctaTitle: "Lire les signaux post-funding",
    ctaDescription: "Nous pouvons vous aider à convertir la veille investisseurs en décisions de recrutement et de positionnement marché."
  },
  {
    slug: "events-animal-health-petfood",
    title: "Evenements sante animale et petfood a suivre",
    kicker: "Events",
    description:
      "Les rendez-vous clés pour suivre les acteurs, tendances et opportunités de visibilité en santé animale et petfood.",
    seoDescription:
      "Les événements santé animale et petfood à suivre pour renforcer sa veille, sa visibilité et sa compréhension des réseaux du secteur.",
    categorySlugs: ["events"],
    sectorFilter: "Animal Health",
    highlights: [
      "Identifier les événements qui comptent vraiment pour le secteur.",
      "Relier prise de parole, présence terrain et contenu SEO durable.",
      "Faire émerger les bons angles de communication sectoriels."
    ],
    whyItMatters: [
      "Les événements sectoriels créent des occasions de visibilité rapide.",
      "Ils alimentent des contenus récurrents et bien maillés.",
      "Ils renforcent votre présence dans un écosystème très relationnel."
    ],
    ctaTitle: "Activer les bons événements secteur",
    ctaDescription: "Nous pouvons vous aider à choisir les événements les plus utiles à votre visibilité et à vos recrutements."
  },
  {
    slug: "incubateurs-healthtech",
    title: "Incubateurs healthtech et deeptech a suivre",
    kicker: "Innovation",
    description:
      "Les incubateurs et accélérateurs qui font émerger des startups healthtech, biotech et medtech à surveiller.",
    seoDescription:
      "Les incubateurs healthtech et deeptech à suivre pour repérer les startups en croissance, les signaux marché et les futurs besoins de talents.",
    categorySlugs: ["innovation"],
    sectorFilter: "MedTech",
    highlights: [
      "Repérer les lieux où naissent les nouveaux besoins de talents.",
      "Identifier les programmes qui donnent de la visibilité aux jeunes pousses.",
      "Construire une veille plus orientée opportunités."
    ],
    whyItMatters: [
      "L’amont du marché se lit souvent dans les incubateurs.",
      "Ces pages permettent d’être présent avant même que les entreprises deviennent très visibles.",
      "Elles nourrissent bien une stratégie de contenu de niche."
    ],
    ctaTitle: "Suivre les jeunes pousses qui montent",
    ctaDescription: "Nous pouvons vous aider à transformer cette veille innovation en approche recrutement et visibilité plus proactive."
  }
];

export const ecosystemStudy = {
  slug: "recrutement-life-sciences-animal-health-2026",
  title: "Etude signature SKS TALENTS 2026",
  subtitle:
    "5 signaux qui redessinent le recrutement en biotech, diagnostic, santé animale et petfood.",
  summary:
    "Une étude éditoriale signée SKS TALENTS pour relier tensions de recrutement, structuration des écosystèmes et priorités concrètes des entreprises spécialisées."
};
