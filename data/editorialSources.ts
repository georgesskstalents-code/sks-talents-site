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
    | "investor";
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
    name: "Biotech Finances",
    domain: "biotech-finances.com",
    type: "media",
    personas: ["CEO", "COO", "CPO", "DRH"],
    topics: ["funding", "biotech", "medtech", "M&A"],
    href: "https://biotech-finances.com/"
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
    name: "Trustpilot",
    domain: "trustpilot.com",
    type: "media",
    personas: ["CEO", "COO", "DRH", "Candidates"],
    topics: ["reviews", "reputation"],
    href: "https://fr.trustpilot.com/review/skstalents.fr"
  }
];

export const weeklyEditorialWatchlist = editorialSourceRegistry.filter((source) =>
  ["association", "media", "linkedin", "institution", "investor", "benchmark", "regulator"].includes(source.type)
);

export const editorialAllowedDomains = Array.from(
  new Set(editorialSourceRegistry.map((source) => source.domain))
);
