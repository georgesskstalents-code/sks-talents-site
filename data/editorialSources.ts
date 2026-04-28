import { investmentFunds, trackedInvestmentFundsDirectory } from "./investmentFunds";
import { editorialMarketSources, newsHubDetails } from "./newsSignals";
import { references } from "./references";
import { schools } from "./resources";

export type EditorialSource = {
  name: string;
  domain: string;
  type:
    | "association"
    | "media"
    | "linkedin"
    | "institution"
    | "benchmark"
    | "regulator"
    | "education"
    | "company"
    | "investor"
    | "event";
  personas: Array<"CEO" | "COO" | "CPO" | "DRH" | "Candidates">;
  topics: string[];
  href: string;
};

export const editorialSourceRegistry: EditorialSource[] = [
  {
    name: "France Biotech",
    domain: "france-biotech.fr",
    type: "association",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "healthtech", "market signals", "hiring"],
    href: "https://france-biotech.fr/"
  },
  {
    name: "France Biotech LinkedIn",
    domain: "linkedin.com",
    type: "linkedin",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["ecosystem", "events", "market signals"],
    href: "https://www.linkedin.com/company/france-biotech/posts/?feedView=all"
  },
  {
    name: "Business France",
    domain: "businessfrance.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["export", "international growth", "VIE", "events", "attractiveness"],
    href: "https://www.businessfrance.fr/"
  },
  {
    name: "Business France LinkedIn",
    domain: "linkedin.com",
    type: "linkedin",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["events", "export", "international growth", "ecosystem"],
    href: "https://www.linkedin.com/company/business-france/posts/?feedView=all"
  },
  {
    name: "Abidjanaises In Tech",
    domain: "abidjanaisesintech.ci",
    type: "association",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["ecosystem", "women in tech", "talent", "digital", "africa"],
    href: "https://www.abidjanaisesintech.ci/"
  },
  {
    name: "La French Tech",
    domain: "lafrenchtech.gouv.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["startup", "ecosystem", "public policy", "growth", "international"],
    href: "https://lafrenchtech.gouv.fr/fr/"
  },
  {
    name: "Challenges",
    domain: "challenges.fr",
    type: "media",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["startups", "investment", "growth", "healthtech"],
    href: "https://www.challenges.fr/"
  },
  {
    name: "Biotech Finances",
    domain: "biotech-finances.com",
    type: "media",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "biotech", "medtech", "M&A"],
    href: "https://biotech-finances.com/"
  },
  {
    name: "EY",
    domain: "ey.com",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["life sciences", "healthtech", "reports", "market signals"],
    href: "https://www.ey.com/"
  },
  {
    name: "Culture RH",
    domain: "culture-rh.com",
    type: "media",
    personas: ["DRH", "COO", "CEO"],
    topics: ["HR", "talent", "people ops", "management"],
    href: "https://culture-rh.com/"
  },
  {
    name: "E-learning Letter",
    domain: "e-learning-letter.com",
    type: "media",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["learning", "upskilling", "L&D", "HR tech"],
    href: "https://www.e-learning-letter.com/"
  },
  {
    name: "LEEM",
    domain: "leem.org",
    type: "association",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["pharma", "regulation", "industry", "employment"],
    href: "https://www.leem.org/"
  },
  {
    name: "SIDIV",
    domain: "sidiv.fr",
    type: "association",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["diagnostic", "IVD", "regulation", "market"],
    href: "https://sidiv.fr/"
  },
  {
    name: "Le Hub Bpifrance",
    domain: "lehub.bpifrance.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["growth", "startup", "scale-up", "funding"],
    href: "https://lehub.bpifrance.fr/"
  },
  {
    name: "Bpifrance",
    domain: "bpifrance.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "biotech", "medtech", "growth"],
    href: "https://www.bpifrance.fr/"
  },
  {
    name: "Bpifrance International",
    domain: "bpifrance.com",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "biotech", "medtech", "growth"],
    href: "https://www.bpifrance.com/"
  },
  {
    name: "Bpifrance Le Hub LinkedIn",
    domain: "linkedin.com",
    type: "linkedin",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["startup", "funding", "growth", "talent"],
    href: "https://www.linkedin.com/company/bpifrance-le-hub/posts/?feedView=all"
  },
  {
    name: "Angels Santé",
    domain: "angelssante.fr",
    type: "investor",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["angel investing", "health", "funding"],
    href: "https://www.angelssante.fr/"
  },
  {
    name: "Angels Santé LinkedIn",
    domain: "linkedin.com",
    type: "linkedin",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["ecosystem", "startups", "health funding"],
    href: "https://www.linkedin.com/company/angelssante/posts/?feedView=all"
  },
  {
    name: "Seventure Partners",
    domain: "seventure.fr",
    type: "investor",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "life sciences", "microbiome", "portfolio"],
    href: "https://www.seventure.fr/en/"
  },
  {
    name: "Sofina",
    domain: "sofinagroup.com",
    type: "investor",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "life sciences", "healthcare", "portfolio"],
    href: "https://www.sofinagroup.com/"
  },
  {
    name: "EIC Fund (European Innovation Council)",
    domain: "eic.ec.europa.eu",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "deep tech", "biotech", "eu ecosystem"],
    href: "https://eic.ec.europa.eu/eic-fund_en"
  },
  {
    name: "Digitalis Ventures",
    domain: "digitalisventures.com",
    type: "investor",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["animal health", "petcare", "funding", "portfolio"],
    href: "https://digitalisventures.com/"
  },
  {
    name: "Aon",
    domain: "aon.com",
    type: "benchmark",
    personas: ["CEO", "COO", "DRH"],
    topics: ["compensation", "salary", "rewards", "retention"],
    href: "https://www.aon.com/"
  },
  {
    name: "Glassdoor",
    domain: "glassdoor.fr",
    type: "benchmark",
    personas: ["CEO", "COO", "DRH", "Candidates"],
    topics: ["salary", "roles", "packages"],
    href: "https://www.glassdoor.fr/"
  },
  {
    name: "Leaders League",
    domain: "leadersleague.com",
    type: "media",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funds", "rankings", "healthcare"],
    href: "https://www.leadersleague.com/"
  },
  {
    name: "Mars",
    domain: "mars.com",
    type: "company",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["animal health", "petcare", "funding", "growth"],
    href: "https://www.mars.com/"
  },
  {
    name: "Roche Diagnostics",
    domain: "diagnostics.roche.com",
    type: "company",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["diagnostic", "IVD", "equipment", "hiring"],
    href: "https://diagnostics.roche.com/"
  },
  {
    name: "Mindray",
    domain: "mindray.com",
    type: "company",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["diagnostic", "devices", "field service", "medical equipment"],
    href: "https://www.mindray.com/"
  },
  {
    name: "Orano",
    domain: "orano.group",
    type: "company",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["nuclear medicine", "industrialization", "innovation", "healthtech"],
    href: "https://www.orano.group/fr/"
  },
  {
    name: "Centre Oscar Lambret",
    domain: "centreoscarlambret.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["nuclear medicine", "oncology", "care pathways"],
    href: "https://www.centreoscarlambret.fr/medecine-nucleaire/"
  },
  {
    name: "Institut Pasteur de Dakar",
    domain: "institutpasteurdakar.sn",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["bioproduction", "vaccines", "Senegal", "public health"],
    href: "https://www.institutpasteurdakar.sn/"
  },
  {
    name: "European External Action Service",
    domain: "eeas.europa.eu",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["Senegal", "vaccines", "MADIBA", "manufacturing in Africa"],
    href: "https://www.eeas.europa.eu/"
  },
  {
    name: "Dominique Ouattara",
    domain: "dominiqueouattara.ci",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["Côte d'Ivoire", "nuclear medicine", "health infrastructure"],
    href: "https://dominiqueouattara.ci/"
  },
  {
    name: "Ordre national des vétérinaires",
    domain: "veterinaire.fr",
    type: "regulator",
    personas: ["Candidates", "DRH", "COO", "CEO"],
    topics: ["veterinary", "schools", "exercise rules"],
    href: "https://www.veterinaire.fr/"
  },
  {
    name: "Université Paris-Saclay",
    domain: "universite-paris-saclay.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["schools", "research", "training"],
    href: "https://www.universite-paris-saclay.fr/"
  },
  {
    name: "SVTSUP",
    domain: "svtsup.fr",
    type: "education",
    personas: ["Candidates", "DRH"],
    topics: ["schools", "biotech training", "orientation"],
    href: "https://www.svtsup.fr/"
  },
  {
    name: "BioFIT",
    domain: "biofit-event.com",
    type: "event",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["biotech", "partnerships", "ecosystem", "events"],
    href: "https://www.biofit-event.com/"
  },
  {
    name: "MEDFIT",
    domain: "medfit-event.com",
    type: "event",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["medtech", "diagnostic", "ecosystem", "events"],
    href: "https://www.medfit-event.com/"
  },
  {
    name: "Oniris",
    domain: "oniris-nantes.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["veterinary", "schools", "animal health"],
    href: "https://www.oniris-nantes.fr/"
  },
  {
    name: "VetAgro Sup",
    domain: "vetagro-sup.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["veterinary", "schools", "animal health"],
    href: "https://www.vetagro-sup.fr/"
  },
  {
    name: "ENVA (École nationale vétérinaire d'Alfort)",
    domain: "vet-alfort.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["veterinary", "schools", "animal health"],
    href: "https://www.vet-alfort.fr/"
  },
  {
    name: "ENVT (École nationale vétérinaire de Toulouse)",
    domain: "envt.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["veterinary", "schools", "animal health"],
    href: "https://envt.fr/"
  },
  {
    name: "UniLaSalle Rouen - École vétérinaire",
    domain: "unilasalle.fr",
    type: "education",
    personas: ["Candidates", "DRH", "CEO"],
    topics: ["veterinary", "schools", "animal health"],
    href: "https://www.unilasalle.fr/formations/ecole-veterinaire"
  },
  {
    name: "Trustpilot",
    domain: "trustpilot.com",
    type: "media",
    personas: ["CEO", "COO", "DRH", "Candidates"],
    topics: ["reviews", "reputation"],
    href: "https://fr.trustpilot.com/review/skstalents.fr"
  },
  {
    name: "Purple Squirrel",
    domain: "purplesquirrel.fr",
    type: "institution",
    personas: ["CEO", "COO", "CPO", "DRH", "Candidates"],
    topics: ["training", "upskilling", "career transition", "life sciences"],
    href: "https://www.purplesquirrel.fr/formations-gratuites-purplesquirrel"
  }
];

export const weeklyEditorialWatchlist = editorialSourceRegistry.filter((source) =>
  ["association", "media", "linkedin", "institution", "investor", "benchmark", "regulator", "education"].includes(
    source.type
  )
);

function hostnameFromUrl(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function uniqueNonEmpty(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

const derivedPrimarySourceUrls = uniqueNonEmpty([
  ...investmentFunds.flatMap((fund) => [
    ...fund.sourceSet.map((source) => source.url),
    ...fund.portfolioHighlights.map((highlight) => highlight.sourceUrl)
  ]),
  ...trackedInvestmentFundsDirectory.map((fund) => fund.href),
  ...schools.map((school) => school.href ?? ""),
  ...references.map((reference) => reference.website ?? ""),
  ...editorialMarketSources.map((source) => source.url),
  ...Object.values(newsHubDetails).flatMap((detail) => [
    ...detail.sources.map((source) => source.url),
    ...detail.fundingSignals.map((signal) => signal.url)
  ])
]);

const derivedPrimaryDomains = uniqueNonEmpty(derivedPrimarySourceUrls.map(hostnameFromUrl));

export const editorialAllowedDomains = Array.from(
  new Set([...editorialSourceRegistry.map((source) => source.domain), ...derivedPrimaryDomains])
);
