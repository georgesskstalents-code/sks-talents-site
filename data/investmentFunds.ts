export type InvestmentFund = {
  slug: string;
  name: string;
  organizationType: string;
  headquarters: string;
  founded: string;
  focusAreas: string[];
  stageFocus: string[];
  ticketSize?: string;
  assetsOrCapital: string;
  keyFacts: string[];
  portfolioHighlights: {
    company: string;
    focus: string;
    note: string;
    sourceUrl: string;
  }[];
  hiringSignal: string;
  methodologyNote: string;
  sourceSet: {
    name: string;
    url: string;
    note: string;
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type FundDirectoryEntry = {
  name: string;
  manager: string;
  href: string;
  source: string;
};

export const investmentFunds: InvestmentFund[] = [
  {
    slug: "sofina",
    name: "Sofina",
    organizationType: "Listed investment company",
    headquarters: "Brussels, Belgium",
    founded: "1898",
    focusAreas: ["Healthcare and life sciences", "Consumer", "Digital", "Education"],
    stageFocus: ["Growth", "Long-term patient capital", "Minority investments"],
    ticketSize: "Not stated as a fixed public range on the corporate overview pages",
    assetsOrCapital: "Total assets: EUR 12.167bn at 31 December 2025",
    keyFacts: [
      "Sofina is a family-controlled investment company listed on Euronext Brussels.",
      "It publishes healthcare and life sciences as one of its sectors of focus.",
      "Official figures page lists EUR 12.167bn total assets and EUR 10.843bn NAV at 31 December 2025."
    ],
    portfolioHighlights: [
      {
        company: "Included Health",
        focus: "Healthcare platform",
        note:
          "Sofina invested in Grand Rounds, predecessor of Included Health, in 2018 and increased ownership in a 2020 financing round.",
        sourceUrl: "https://www.sofinagroup.com/project/includedhealth/"
      },
      {
        company: "Vizgen",
        focus: "Spatial genomics / life science tools",
        note:
          "Sofina states it invested in Vizgen in 2022; the company develops spatial genomic mapping technologies.",
        sourceUrl: "https://www.sofinagroup.com/project/vizgen/"
      }
    ],
    hiringSignal:
      "Hiring must be validated company by company. Sofina’s official site is strong for investor identity and selected portfolio references, but does not publish a portfolio-wide hiring count.",
    methodologyNote:
      "Production-safe content should separate official Sofina facts from company-level hiring assumptions. Portfolio hiring numbers should only be added after company-level source validation.",
    sourceSet: [
      {
        name: "Sofina corporate site",
        url: "https://www.sofinagroup.com/",
        note: "Corporate identity, sector focus, financial calendar and annual reporting hub."
      },
      {
        name: "Sofina key figures",
        url: "https://www.sofinagroup.com/investor-relations/key-figures/",
        note: "Official assets and NAV figures."
      },
      {
        name: "Sofina Included Health profile",
        url: "https://www.sofinagroup.com/project/includedhealth/",
        note: "Official portfolio example in healthcare."
      },
      {
        name: "Sofina Vizgen profile",
        url: "https://www.sofinagroup.com/project/vizgen/",
        note: "Official portfolio example in life sciences."
      }
    ],
    seo: {
      title: "Sofina | Healthcare & Life Sciences Investment Profile | SKS TALENTS",
      description:
        "Profil vérifié de Sofina: société d’investissement cotée, focus healthcare & life sciences, chiffres clés officiels et points d’attention pour un contenu SEO fiable.",
      keywords: ["Sofina", "Sofina healthcare", "Sofina life sciences", "Sofina portfolio"]
    }
  },
  {
    slug: "seventure-partners",
    name: "Seventure Partners",
    organizationType: "Venture capital firm",
    headquarters: "Paris, France",
    founded: "1997",
    focusAreas: ["Life sciences", "Digital technologies", "Microbiome", "Nutrition", "Biotech"],
    stageFocus: ["Seed", "Early stage", "Late stage"],
    ticketSize: "EUR 1m-10m per round and up to EUR 20m across several rounds",
    assetsOrCapital: "EUR 1bn under management as of 30 June 2024",
    keyFacts: [
      "Seventure says it is one of the European leaders in venture capital.",
      "Its Life Sciences team says it has invested in microbiome, nutrition and biotech since the early 2000s.",
      "The official site documents more than 150 exits and 30 IPOs at firm level."
    ],
    portfolioHighlights: [
      {
        company: "Enterome",
        focus: "Microbiome / therapeutics",
        note:
          "Seventure’s Life Sciences page cites Enterome among the companies it helped establish and fund.",
        sourceUrl: "https://www.seventure.fr/en/life-sciences/"
      },
      {
        company: "Maat Pharma",
        focus: "Microbiome / biotech",
        note:
          "Seventure officially lists Maat Pharma among the companies it has funded in Life Sciences.",
        sourceUrl: "https://www.seventure.fr/en/life-sciences/"
      }
    ],
    hiringSignal:
      "Seventure is a strong source for investment thesis, check size and public portfolio examples. Company-by-company hiring still requires a second layer of validation from portfolio company sources.",
    methodologyNote:
      "Use Seventure for verified fund-level claims, then enrich each portfolio-company page only after checking the company’s own site, press releases or careers page.",
    sourceSet: [
      {
        name: "Seventure about page",
        url: "https://www.seventure.fr/en/about/about-seventure/",
        note: "Official AUM, exits, IPOs and firm positioning."
      },
      {
        name: "Seventure Life Sciences",
        url: "https://www.seventure.fr/en/life-sciences/",
        note: "Official life sciences thesis, geography and example portfolio companies."
      }
    ],
    seo: {
      title: "Seventure Partners | Life Sciences VC Profile | SKS TALENTS",
      description:
        "Profil vérifié de Seventure Partners: venture capital Life Sciences, montant géré, stratégie d’investissement et exemples de portefeuille documentés.",
      keywords: ["Seventure Partners", "Seventure Life Sciences", "Seventure microbiome", "VC santé Paris"]
    }
  },
  {
    slug: "bpifrance-biotech",
    name: "Bpifrance Biotech & Medtech",
    organizationType: "Public investment platform / venture funds",
    headquarters: "Paris, France",
    founded: "Bpifrance launched in 2013; relevant biotech funds launched across multiple vintages",
    focusAreas: ["Biotech", "Medtech", "Diagnostics", "Digital health", "Rare diseases"],
    stageFocus: ["Seed", "Series A", "Series B", "Early to mid-stage"],
    ticketSize: "Innobio 2 can invest up to EUR 14m alongside VCs in Series A and B rounds",
    assetsOrCapital:
      "Official biotech and medtech vehicles include Innobio EUR 173m, Rare Diseases Fund EUR 50m, Medtech Innovation Fund EUR 150m and other vehicles",
    keyFacts: [
      "Bpifrance operates several venture funds dedicated to biotech and medtech companies.",
      "Official pages document Innobio, Innobio 2, Rare Diseases Fund, Medtech Innovation Fund and Patient Autonome.",
      "The French-language biotech page documents FABS at EUR 340m and InnoBio 2 at EUR 143m invested / first closing ranges depending on source page and date."
    ],
    portfolioHighlights: [
      {
        company: "Portfolio examples not exhaustively listed on the English overview page",
        focus: "Biotech / medtech / diagnostics",
        note:
          "The official fund pages are strong on vehicle size and mandate. Company-level details need to be sourced from individual portfolio or press materials.",
        sourceUrl: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/"
      }
    ],
    hiringSignal:
      "Bpifrance is ideal for verified fund-vehicle pages and market ecosystem content. Hiring counts should be inferred only after reviewing beneficiary companies individually.",
    methodologyNote:
      "Because Bpifrance is a platform of multiple funds, production content should treat it as an umbrella investor page plus child pages per vehicle, not as a single homogeneous fund.",
    sourceSet: [
      {
        name: "Bpifrance biotech (FR)",
        url: "https://www.bpifrance.fr/nos-solutions/investissement/investissement-expertise/biotech",
        note: "Official descriptions of InnoBio 2, Rare Diseases Fund, FABS and Patient Autonome."
      },
      {
        name: "Bpifrance biotech and medtech VC funds (EN)",
        url: "https://www.bpifrance.com/products/biotech-and-medtech-vc-funds/",
        note: "Official English overview with multiple fund sizes and mandate."
      },
      {
        name: "Bpifrance funds of funds",
        url: "https://www.bpifrance.com/funds-of-funds/",
        note: "Useful for platform scale and context."
      }
    ],
    seo: {
      title: "Bpifrance Biotech & Medtech | Fonds et véhicules vérifiés | SKS TALENTS",
      description:
        "Vue production-safe des véhicules biotech et medtech de Bpifrance: tailles officielles, mandats d’investissement et méthode de qualification des signaux hiring.",
      keywords: ["Bpifrance biotech", "Innobio 2", "FABS Bpifrance", "fonds biotech France"]
    }
  },
  {
    slug: "eic-fund",
    name: "EIC Fund",
    organizationType: "European public venture capital fund",
    headquarters: "European Commission / Luxembourg-Brussels ecosystem",
    founded: "2020",
    focusAreas: ["Deep tech", "Biotech", "Healthtech", "Scaleups"],
    stageFocus: ["Breakthrough innovation", "Equity", "Co-investment"],
    ticketSize: "Not expressed as a simple public ticket range on the overview page",
    assetsOrCapital: "Capitalisation of over EUR 4bn",
    keyFacts: [
      "The EIC Fund is the venture capital investment arm of the European Innovation Council.",
      "Official site states over EUR 4bn capitalisation and more than EUR 1.4bn signed investment agreements.",
      "Official portfolio directory lists 301 invested companies and the overview summarises this as 300+ companies across 25 countries (the public page does not always show a timestamp; re-check on refresh)."
    ],
    portfolioHighlights: [
      {
        company: "EIC Fund portfolio",
        focus: "European deep tech and biotech scaleups",
        note:
          "The official site provides portfolio-level counts; company-level hiring still needs verification from each startup.",
        sourceUrl: "https://eic.ec.europa.eu/eic-fund_en"
      }
    ],
    hiringSignal:
      "Very useful for European deep-tech and biotech funding context, but not enough on its own to state role counts per portfolio company.",
    methodologyNote:
      "Use EIC Fund as a macro funding and portfolio-intensity signal; keep hiring claims at portfolio-company level only when a startup page or press release confirms them.",
    sourceSet: [
      {
        name: "EIC Fund overview",
        url: "https://eic.ec.europa.eu/eic-fund_en",
        note: "Official overview with capitalisation, signed investments and portfolio-company count."
      },
      {
        name: "EIC Fund invested companies",
        url: "https://eic.ec.europa.eu/eic-fund/eic-fund-invested-companies_en",
        note: "Official portfolio directory (invested companies list)."
      }
    ],
    seo: {
      title: "EIC Fund | Deep Tech & Biotech Funding Profile | SKS TALENTS",
      description:
        "Profil vérifié du EIC Fund: capitalisation, nombre de sociétés en portefeuille et rôle dans l’écosystème deep tech et biotech européen.",
      keywords: ["EIC Fund", "European Innovation Council fund", "deep tech Europe", "biotech EU funding"]
    }
  },
  {
    slug: "angels-sante",
    name: "Angels Santé",
    organizationType: "Réseau de business angels santé",
    headquarters: "Paris, France",
    founded: "2008",
    focusAreas: ["Biotech", "Medtech", "E-santé", "Santé"],
    stageFocus: ["Amorçage", "Seed", "Premiers tours"],
    ticketSize: "Non affiché comme range simple sur la page d’accueil",
    assetsOrCapital: "Le site met surtout en avant le réseau, les startups investies et les opérations annuelles",
    keyFacts: [
      "Angels Santé se présente comme le premier réseau de business angels dédié à la santé en Europe.",
      "La page d’accueil met en avant un réseau d’investisseurs experts santé et des startups investies depuis 2014.",
      "Le site insiste sur l’expertise scientifique, réglementaire et clinique mobilisée pour analyser les projets."
    ],
    portfolioHighlights: [
      {
        company: "Annuaire start-ups Angels Santé",
        focus: "Biotech, medtech et e-santé",
        note:
          "Le site met en avant un espace 'Nos Start-ups' comme porte d’entrée vers les sociétés accompagnées par le réseau.",
        sourceUrl: "https://www.angelssante.fr/"
      }
    ],
    hiringSignal:
      "Angels Santé est un bon signal d’activité early-stage en santé. Les besoins de recrutement doivent cependant être qualifiés startup par startup.",
    methodologyNote:
      "Utiliser Angels Santé comme source fund-ecosystem pour l’amorçage santé, puis vérifier chaque startup sur son propre site avant de publier des rôles, chiffres de croissance ou besoins hiring.",
    sourceSet: [
      {
        name: "Angels Santé",
        url: "https://www.angelssante.fr/",
        note: "Source officielle sur le positionnement du réseau, les chiffres-clés, l’activité et les start-ups."
      }
    ],
    seo: {
      title: "Angels Santé | Réseau de business angels santé | SKS TALENTS",
      description:
        "Profil vérifié d’Angels Santé: réseau de business angels dédié à la santé, positionnement early-stage et intérêt SEO pour les startups biotech, medtech et e-santé.",
      keywords: ["Angels Santé", "business angels santé", "investisseurs santé France", "amorçage healthtech"]
    }
  },
  {
    slug: "companion-fund-ii",
    name: "Companion Fund II",
    organizationType: "Fonds de venture capital animal health / pet care",
    headquarters: "Mars Petcare x Digitalis Ventures",
    founded: "2023",
    focusAreas: ["Santé animale", "Diagnostics vétérinaires", "Médecine vétérinaire", "IT vétérinaire", "Plateformes pet care"],
    stageFocus: ["Early stage", "Growth"],
    ticketSize: "Non détaillé comme ticket public simple sur le communiqué Mars",
    assetsOrCapital: "USD 300m",
    keyFacts: [
      "Mars et Digitalis Ventures annoncent le lancement du Companion Fund II comme fonds de USD 300m.",
      "Le communiqué officiel indique un focus sur les diagnostics vétérinaires, la médecine vétérinaire, les technologies de l’information et les plateformes en ligne.",
      "Le fonds vise surtout des entreprises de santé animale basées principalement aux États-Unis et en Europe."
    ],
    portfolioHighlights: [
      {
        company: "Smalls, MySimplePetLab, Scratch",
        focus: "Exemples cités dans le communiqué Mars",
        note:
          "Le communiqué Mars cite ces entreprises comme références issues du Companion Fund / de son premier millésime.",
        sourceUrl:
          "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300"
      }
    ],
    hiringSignal:
      "Très intéressant pour les contenus SEO en santé animale, vet tech et pet care. Les rôles doivent ensuite être vérifiés société par société sur les portefeuilles concernés.",
    methodologyNote:
      "Utiliser Companion Fund II comme signal macro animal health / vet innovation, sans extrapoler de volumes de recrutement tant que les sociétés ciblées ne publient pas elles-mêmes leurs besoins.",
    sourceSet: [
      {
        name: "Mars France - Companion Fund II",
        url: "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300",
        note: "Communiqué officiel de lancement du fonds et de son focus sectoriel."
      },
      {
        name: "Digitalis Ventures Animal Health",
        url: "https://digitalisventures.com/animal-health",
        note: "Entrée officielle Digitalis Ventures sur l’animal health."
      }
    ],
    seo: {
      title: "Companion Fund II | Mars x Digitalis Ventures | SKS TALENTS",
      description:
        "Profil vérifié du Companion Fund II: fonds Mars x Digitalis Ventures de 300 M$ dédié à la santé animale, aux diagnostics vétérinaires et aux technologies pet care.",
      keywords: ["Companion Fund II", "Mars Digitalis Ventures", "animal health fund", "pet care venture capital"]
    }
  }
];

export const trackedInvestmentFundsDirectory: FundDirectoryEntry[] = [
  { name: "Eurazeo Growth Fund III / IV", manager: "Eurazeo", href: "https://www.eurazeo.com/en/", source: "France Biotech 2024" },
  { name: "Mérieux Participations 4", manager: "Mérieux Equity Partners", href: "https://merieux-partners.com/en/", source: "France Biotech 2024" },
  { name: "Jeito I", manager: "Jeito", href: "https://www.jeito.life/", source: "France Biotech 2024" },
  { name: "Cathay Healthcare / Cathay Innovation III / Small Cap IV", manager: "Cathay Capital", href: "https://www.cathaycapital.com/", source: "France Biotech 2024" },
  { name: "Andera Biodiscovery 6", manager: "Andera Partners", href: "https://www.andera-partners.com/", source: "France Biotech 2024" },
  { name: "Sofinnova Crossover / Sofinnova Capital X", manager: "Sofinnova Partners", href: "https://www.sofinnovapartners.com/", source: "France Biotech 2024" },
  { name: "Lauxera Growth I", manager: "Lauxera", href: "https://lauxera.com/", source: "France Biotech 2024" },
  { name: "Health for Life II / Quadrivium 1", manager: "Seventure Partners", href: "https://www.seventure.fr/en/", source: "France Biotech 2024" },
  { name: "Capital Santé 2", manager: "Turenne Capital", href: "https://www.turennecapital.com/", source: "France Biotech 2024" },
  { name: "MH Innov", manager: "Malakoff Humanis", href: "https://www.malakoffhumanis.com/", source: "France Biotech 2024" },
  { name: "ARAC III", manager: "Kreaxi", href: "https://www.kreaxi.com/", source: "France Biotech 2024" },
  { name: "ISAI Venture III", manager: "ISAI", href: "https://www.isai.fr/", source: "France Biotech 2024" },
  { name: "Resonance", manager: "Otium Capital", href: "https://otiumcapital.com/", source: "France Biotech 2024" },
  { name: "50 Partners Capital 3", manager: "50 Partners", href: "https://www.50partners.fr/", source: "France Biotech 2024" },
  { name: "AXC2", manager: "Axeleo", href: "https://www.axeleo.com/", source: "France Biotech 2024" },
  { name: "Karista V", manager: "Karista", href: "https://www.karista.vc/", source: "France Biotech 2024" },
  { name: "Sharpstone Capital I", manager: "Sharpstone Capital", href: "https://sharpstonecap.com/", source: "France Biotech 2024" },
  { name: "Elaia DTS3 / DV4", manager: "Elaia", href: "https://www.elaia.com/", source: "France Biotech 2024" },
  { name: "Cap Innov’Est", manager: "Capital Grand Est", href: "https://www.capitalgrandest.eu/", source: "France Biotech 2024" },
  { name: "Irdi Impulsion", manager: "IRDI Capital Investissement", href: "https://www.irdi.fr/", source: "France Biotech 2024" },
  { name: "Europe Seed III / Breega Seed II", manager: "Breega", href: "https://www.breega.com/", source: "France Biotech 2024" },
  { name: "HCVC Fund II", manager: "HCVC", href: "https://www.hcvc.co/", source: "France Biotech 2024" },
  { name: "Pertinence Invest 2", manager: "Sofimac Innovation", href: "https://www.sofimacinnovation.com/", source: "France Biotech 2024" },
  { name: "Sorbonne Venture", manager: "Audacia / Sorbonne Université / Aloe", href: "https://www.audacia.fr/", source: "France Biotech 2024" },
  { name: "Kurma Diagnostics II / Biofund III / Kurma Growth Opportunities", manager: "Kurma Partners", href: "https://www.kurmapartners.com/", source: "France Biotech 2024" },
  { name: "Supernova Innovation 3 / Ambition Industrie", manager: "Supernova Invest", href: "https://www.supernovainvest.com/", source: "France Biotech 2024" },
  { name: "Biotech Promise 2022", manager: "Auriga Partners", href: "https://www.auriga-partners.com/", source: "France Biotech 2024" },
  { name: "Go Capital 3", manager: "GO Capital", href: "https://gocapital.fr/", source: "France Biotech 2024" },
  { name: "Newfund NAEH 2", manager: "Newfund", href: "https://newfundcap.com/", source: "France Biotech 2024" },
  { name: "FPCI Cap 6", manager: "UI Investissement", href: "https://www.ui-investissement.fr/", source: "France Biotech 2024" },
  { name: "Partech Ventures", manager: "Partech", href: "https://partechpartners.com/", source: "France Biotech 2024" },
  { name: "Alven Capital VI", manager: "Alven", href: "https://www.alven.co/", source: "France Biotech 2024" },
  { name: "Xange 4", manager: "XAnge", href: "https://xange.vc/", source: "France Biotech 2024" },
  { name: "Altitude II", manager: "Ring Capital", href: "https://www.ringcp.com/", source: "France Biotech 2024" },
  { name: "Ventech Capital V", manager: "Ventech", href: "https://www.ventechvc.com/", source: "France Biotech 2024" },
  { name: "Omnes Real Tech", manager: "Omnes Capital", href: "https://www.omnescapital.com/", source: "France Biotech 2024" },
  { name: "Extens / Digital Health 2", manager: "Extens / LBO France", href: "https://extens.eu/", source: "France Biotech 2024" },
  { name: "Crédit Mutuel Innovation", manager: "Crédit Mutuel Innovation", href: "https://www.creditmutuelinnovation.fr/", source: "France Biotech 2024" },
  { name: "Quadrille Technologies V", manager: "Quadrille Capital", href: "https://www.quadrillecapital.com/", source: "France Biotech 2024" },
  { name: "BioMedTech", manager: "Truffle Capital", href: "https://truffle.com/", source: "France Biotech 2024" },
  { name: "NACI1", manager: "AQUITI", href: "https://www.aquiti.fr/", source: "France Biotech 2024" },
  { name: "CapHornInvest", manager: "Cap Horn", href: "https://www.caphorn.vc/", source: "France Biotech 2024" },
  { name: "Blisce II", manager: "Blisce", href: "https://www.blisce.com/", source: "France Biotech 2024" },
  { name: "Serena III", manager: "Serena", href: "https://www.serena.vc/", source: "France Biotech 2024" },
  { name: "Jolt Capital IV", manager: "Jolt Capital", href: "https://www.jolt-capital.com/", source: "France Biotech 2024" },
  { name: "Companion Fund II", manager: "Mars Petcare x Digitalis Ventures", href: "https://www.mars.com/fr-fr/news-and-stories/press-releases-statements/mars-et-digitalis-ventures-lancent-un-fonds-de-300", source: "Mars / Digitalis" },
  { name: "Angels Santé", manager: "Angels Santé", href: "https://www.angelssante.fr/", source: "Angels Santé" }
];

export function getInvestmentFund(slug: string) {
  return investmentFunds.find((fund) => fund.slug === slug);
}
