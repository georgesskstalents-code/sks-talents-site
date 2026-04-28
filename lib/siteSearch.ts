import { articles, getArticleVerticalLabel } from "@/data/articles";
import { jobRoles } from "@/data/jobRoles";
import { references } from "@/data/references";
import { seoGrowthPages } from "@/data/seoGrowthPages";
import { events, schools } from "@/data/resources";
import { services } from "@/data/site";
import type { NotionSiteContentEntry } from "@/lib/notion";

export type SearchResult = {
  title: string;
  href: string;
  summary: string;
  category: string;
  meta?: string;
  keywords?: string[];
};

function hrefForNotionEntry(entry: NotionSiteContentEntry) {
  if (entry.contentType === "article") {
    return `/blog/${entry.slug}`;
  }

  if (entry.contentType === "study") {
    return `/studies/${entry.slug}`;
  }

  if (entry.contentType === "newsletter") {
    return `/newsletter/${entry.slug}`;
  }

  if (entry.contentType === "news") {
    return `/news/${entry.slug}`;
  }

  return `/${entry.slug}`;
}

export function buildNotionSearchResults(entries: NotionSiteContentEntry[]): SearchResult[] {
  return entries
    .filter((entry) => entry.slug && entry.title && entry.status === "Published")
    .map((entry) => ({
      title: entry.title,
      href: hrefForNotionEntry(entry),
      summary: entry.excerpt || entry.metaDescription || entry.mainContent,
      category:
        entry.contentType === "study"
          ? "Livre blanc"
          : entry.contentType === "newsletter"
            ? "Newsletter"
            : "Article",
      meta: entry.vertical || entry.category || "SKS TALENTS",
      keywords: [
        entry.vertical,
        entry.category,
        entry.seoTitle,
        entry.metaDescription,
        entry.salaryRange,
        entry.studies,
        entry.schools,
        entry.industries,
        entry.mainContent,
        entry.excerpt
      ]
    }));
}

const staticResults: SearchResult[] = [
  {
    title: "Life Sciences",
    href: "/life-sciences",
    summary: "Landing page principale pour biotech, diagnostic, e-santé, robotique et besoins de recrutement sectoriels.",
    category: "Page secteur",
    meta: "Life Sciences",
    keywords: ["life sciences", "biotech", "diagnostic", "e-sante", "robotique sante", "recrutement"]
  },
  {
    title: "Animal Health",
    href: "/animal-health",
    summary: "Page hub pour santé animale, vétérinaire, medical vet et petfood premium.",
    category: "Page secteur",
    meta: "Animal Health",
    keywords: ["animal health", "sante animale", "veterinaire", "medical vet", "petfood"]
  },
  {
    title: "Ressources",
    href: "/resources",
    summary: "Fonds, écoles, réseaux, médias et partenaires utiles pour vos recherches de marché.",
    category: "Ressources",
    meta: "Hub",
    keywords: ["ecosysteme", "fonds", "ecoles", "reseaux", "partenaires", "marche"]
  },
  {
    title: "Benchmarks salaires",
    href: "/salary-benchmarks",
    summary: "Repères de rémunération pour les rôles critiques en Life Sciences et Animal Health.",
    category: "Benchmark",
    meta: "Salaires",
    keywords: ["salaire", "salaires", "remuneration", "compensation", "package", "benchmark"]
  },
  {
    title: "Calcul salaire brut/net",
    href: "/calcul-salaire-brut-net",
    summary: "Convertisseur rapide pour estimer un salaire brut ou net.",
    category: "Outil",
    meta: "Rémunération",
    keywords: ["brut", "net", "salaire", "remuneration", "paie", "pay"]
  },
  {
    title: "Actualités",
    href: "/news",
    summary: "Lectures rapides des signaux marché, financements, nominations et mouvements d'écosystème.",
    category: "Actualités",
    meta: "Marché",
    keywords: ["actualites", "marche", "financement", "series a", "series b", "ecosysteme"]
  },
  {
    title: "Études",
    href: "/studies",
    summary: "Études et synthèses structurantes pour dirigeants, RH et fonctions clés.",
    category: "Étude",
    meta: "Analyse",
    keywords: ["etude", "analyse", "market intelligence", "insights", "salaire", "talent"]
  },
  {
    title: "Newsletter",
    href: "/newsletter",
    summary:
      "La note SKS TALENTS pour suivre les signaux marche, les metiers penuriques, les salaires, l'ecosysteme et les decisions dirigeants.",
    category: "Newsletter",
    meta: "Lecture courte",
    keywords: ["newsletter", "signaux marche", "talents", "salaires", "ecosysteme", "decision"]
  },
  {
    title: "Orientation",
    href: "/orientation",
    summary: "Parcours pour aider un talent à se situer sur les métiers, secteurs et trajectoires utiles.",
    category: "Orientation",
    meta: "Talents",
    keywords: ["orientation", "metier", "carriere", "talent", "fiches metiers"]
  },
  {
    title: "Diagnostic recrutement & croissance",
    href: "/diagnostic",
    summary:
      "5 questions simples pour savoir si votre recrutement, votre structuration RH ou vos process ralentissent la croissance.",
    category: "Diagnostic",
    meta: "Lead magnet",
    keywords: [
      "diagnostic recrutement",
      "diagnostic croissance",
      "structuration rh",
      "automatisation rh",
      "temps dirigeant",
      "recrutement lent",
      "score rh",
      "frein croissance"
    ]
  },
  {
    title: "Lexique Life Sciences & RH",
    href: "/lexique-life-sciences-rh",
    summary:
      "Hub central pour structuration RH, recrutement Life Sciences, automatisation RH, scale-up, FAQ LLM et livres blancs à télécharger.",
    category: "Hub SEO",
    meta: "Lexique",
    keywords: [
      "lexique rh",
      "structuration rh",
      "automatisation rh",
      "recrutement life sciences",
      "scale-up",
      "performance organisationnelle",
      "whitepaper",
      "guide rh"
    ]
  },
  {
    title: "Abonnement / Membership",
    href: "/abonnement",
    summary:
      "Offre récurrente pour suivre signaux talents, structuration RH, marché, priorités de recrutement et décisions de croissance.",
    category: "Abonnement",
    meta: "Membership",
    keywords: [
      "abonnement rh",
      "membership talents",
      "structuration rh",
      "veille marche",
      "advisory",
      "operator"
    ]
  },
  {
    title: "Mini scorecard dirigeant",
    href: "/scorecard-dirigeant",
    summary:
      "Scorecard rapide pour savoir si votre organisation est prête à absorber une nouvelle phase de croissance.",
    category: "Outil",
    meta: "Dirigeants",
    keywords: [
      "scorecard dirigeant",
      "audit rh rapide",
      "temps dirigeant",
      "scale-up",
      "organisation"
    ]
  },
  {
    title: "Pour qui ce site est utile",
    href: "/pour-qui",
    summary:
      "Page d’orientation pour dirigeants, RH, candidats et étudiants sur les marchés Life Sciences et Animal Health.",
    category: "Orientation",
    meta: "Audiences",
    keywords: ["dirigeants", "rh", "candidats", "etudiants", "orientation", "pour qui"]
  },
  {
    title: "Cas d’usage",
    href: "/cas-d-usage",
    summary:
      "Scénarios concrets : startup en croissance, scale-up après levée, entreprise sous tension recrutement, équipe RH débordée.",
    category: "Cas d’usage",
    meta: "Scénarios",
    keywords: [
      "cas d usage",
      "startup croissance",
      "scale up apres levee",
      "recrutement sous tension",
      "equipe rh debordee"
    ]
  },
  {
    title: "Nous contacter",
    href: "/contact#rappel",
    summary: "Échange confidentiel, besoin de recrutement, RPO, structuration RH ou rappel qualifié.",
    category: "Conversion",
    meta: "Contact",
    keywords: ["contact", "rendez-vous", "rappel", "recrutement", "executive search"]
  }
];

const serviceResults: SearchResult[] = services.map((service) => ({
  title: service.title,
  href: "/services",
  summary: service.description,
  category: "Service",
  meta: service.metric,
  keywords: [service.title, service.description, service.metric, "executive search", "rpo", "structuration rh"]
}));

const articleResults: SearchResult[] = articles.map((article) => ({
  title: article.title,
  href: `/blog/${article.slug}`,
  summary: article.excerpt,
  category: "Article",
  meta: getArticleVerticalLabel(article.vertical),
  keywords: [article.topic, ...article.persona, article.vertical, article.content]
}));

const referenceResults: SearchResult[] = references.map((reference) => ({
  title: reference.company,
  href: `/references/${reference.slug}`,
  summary: reference.summary,
  category: "Référence",
  meta: reference.category,
  keywords: [reference.category, reference.descriptor ?? "", reference.impact]
}));

const schoolResults: SearchResult[] = schools.map((school) => ({
  title: school.title,
  href: `/schools/${school.slug}`,
  summary: school.summary,
  category: "École",
  meta: school.sector,
  keywords: [school.sector, school.location ?? ""]
}));

const eventResults: SearchResult[] = events.map((event) => ({
  title: event.title,
  href: `/events/${event.slug}`,
  summary: event.summary,
  category: "Événement",
  meta: `${event.sector}${event.dateLabel ? ` · ${event.dateLabel}` : ""}`,
  keywords: [event.sector, event.location ?? "", event.dateLabel ?? ""]
}));

const jobRoleResults: SearchResult[] = jobRoles.map((jobRole) => ({
  title: jobRole.title,
  href: `/job-roles/${jobRole.slug}`,
  summary: jobRole.summary,
  category: "Fiche métier",
  meta: `${jobRole.sector} · ${jobRole.salary}`,
  keywords: [
    jobRole.sector,
    jobRole.category,
    jobRole.salary,
    ...jobRole.skills,
    ...jobRole.successFactors,
    ...jobRole.missions,
    ...jobRole.studies,
    ...jobRole.schools,
    ...jobRole.relatedIndustries
  ]
}));

const seoGrowthResults: SearchResult[] = seoGrowthPages.map((page) => ({
  title: page.title,
  href: `/${page.slug}`,
  summary: page.heroDescription,
  category: "Page SEO",
  meta: page.primaryKeyword,
  keywords: [
    page.primaryKeyword,
    ...page.secondaryKeywords,
    ...page.clusterItems,
    page.audience,
    page.directAnswer,
    page.heroDescription
  ]
}));

export const siteSearchIndex: SearchResult[] = [
  ...staticResults,
  ...serviceResults,
  ...seoGrowthResults,
  ...articleResults,
  ...jobRoleResults,
  ...referenceResults,
  ...schoolResults,
  ...eventResults
];

const stopwords = new Set([
  "de",
  "des",
  "du",
  "la",
  "le",
  "les",
  "et",
  "ou",
  "en",
  "sur",
  "pour",
  "un",
  "une",
  "dans",
  "avec",
  "the"
]);

const searchIntentExpansions: Array<{ triggers: string[]; tokens: string[] }> = [
  {
    triggers: ["remuneration", "rémunération", "salaire", "salaires", "compensation", "package", "brut", "net"],
    tokens: ["salaire", "salaires", "benchmark", "remuneration", "brut", "net", "compensation", "package"]
  },
  {
    triggers: ["ecole", "école", "formation", "master", "ecoles"],
    tokens: ["ecole", "ecoles", "formation", "master", "school"]
  },
  {
    triggers: ["event", "evenement", "événement", "seminaire", "salon", "conference"],
    tokens: ["event", "evenement", "salon", "conference", "seminaire"]
  },
  {
    triggers: ["job", "metier", "métier", "poste", "role", "rôle"],
    tokens: ["metier", "job", "role", "poste", "fiches metiers"]
  },
  {
    triggers: ["actualite", "actualité", "news", "marche", "marché", "financement"],
    tokens: ["actualites", "news", "marche", "financement", "series a", "series b"]
  },
  {
    triggers: ["absenteisme", "absentéisme", "absence", "arret court", "turnover social"],
    tokens: ["absenteisme", "absence", "qvt", "sante au travail", "taux", "rh", "prevention"]
  },
  {
    triggers: ["grossesse", "enceinte", "periode d essai", "période d'essai", "periode dessai", "salariee enceinte"],
    tokens: ["grossesse", "enceinte", "periode essai", "essai", "protection", "discrimination", "employeur"]
  },
  {
    triggers: ["arret maladie", "arrêt maladie", "depression", "dépression", "licenciement"],
    tokens: ["arret maladie", "depression", "licenciement", "employeur", "droits", "absence"]
  },
  {
    triggers: ["egalite", "égalité", "egalite femmes hommes", "index egalite", "index egapro"],
    tokens: ["egalite", "femmes hommes", "index", "egalite professionnelle", "remuneration", "publication"]
  },
  {
    triggers: ["ia", "intelligence artificielle", "ia rh", "ia collaborateurs", "structuration rh", "adoption ia"],
    tokens: ["ia", "intelligence artificielle", "rh", "collaborateurs", "structuration rh", "formation", "gouvernance"]
  }
];

const intentSuggestions: Record<string, string[]> = {
  remuneration: ["/salary-benchmarks", "/calcul-salaire-brut-net", "/job-roles"],
  ecole: ["/schools", "/resources", "/orientation"],
  evenement: ["/events", "/resources", "/ecosystem"],
  metier: ["/job-roles", "/orientation", "/salary-benchmarks"],
  actualite: ["/news", "/blog", "/studies"],
  absenteisme: ["/studies", "/blog", "/orientation"],
  grossesse: ["/blog", "/resources", "/orientation"],
  arretmaladie: ["/blog", "/resources", "/orientation"],
  egalite: ["/blog", "/salary-benchmarks", "/studies"],
  ia: ["/studies", "/services", "/orientation"]
};

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeSearch(value: string) {
  return normalizeSearchText(value)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !stopwords.has(token));
}

function expandSearchTokens(query: string) {
  const normalized = normalizeSearchText(query);
  const tokens = new Set(tokenizeSearch(normalized));

  searchIntentExpansions.forEach((intent) => {
    if (intent.triggers.some((trigger) => normalized.includes(normalizeSearchText(trigger)))) {
      intent.tokens.forEach((token) => tokens.add(normalizeSearchText(token)));
    }
  });

  return Array.from(tokens);
}

function getIntentKey(query: string) {
  const normalized = normalizeSearchText(query);

  if (["remuneration", "salaire", "salaires", "compensation", "package", "brut", "net"].some((term) => normalized.includes(term))) {
    return "remuneration";
  }

  if (["ecole", "ecoles", "formation", "master"].some((term) => normalized.includes(term))) {
    return "ecole";
  }

  if (["event", "evenement", "conference", "seminaire", "salon"].some((term) => normalized.includes(term))) {
    return "evenement";
  }

  if (["metier", "poste", "role", "job"].some((term) => normalized.includes(term))) {
    return "metier";
  }

  if (["actualite", "news", "marche", "financement"].some((term) => normalized.includes(term))) {
    return "actualite";
  }

  if (["absenteisme", "absence", "qvt"].some((term) => normalized.includes(term))) {
    return "absenteisme";
  }

  if (["grossesse", "enceinte", "periode essai", "periode dessai", "essai"].some((term) => normalized.includes(term))) {
    return "grossesse";
  }

  if (["arret maladie", "depression", "licenciement"].some((term) => normalized.includes(term))) {
    return "arretmaladie";
  }

  if (["egalite", "index egalite", "egapro", "femmes hommes"].some((term) => normalized.includes(term))) {
    return "egalite";
  }

  if (["intelligence artificielle", "ia", "ia rh", "structuration rh", "collaborateurs"].some((term) => normalized.includes(term))) {
    return "ia";
  }

  return null;
}

function dedupeResults(results: SearchResult[]) {
  return Array.from(new Map(results.map((item) => [`${item.href}-${item.title}`, item])).values());
}

export function getSuggestedResults(query: string, limit = 6, extraResults: SearchResult[] = []) {
  const intent = getIntentKey(query);
  if (!intent) {
    return [];
  }

  const suggestedHrefs = intentSuggestions[intent] ?? [];
  return dedupeResults([...extraResults, ...siteSearchIndex])
    .filter((item) => suggestedHrefs.includes(item.href))
    .slice(0, limit);
}

export function searchSite(query: string, limit = 18, extraResults: SearchResult[] = []) {
  const normalized = normalizeSearchText(query);

  if (!normalized) {
    return [];
  }

  const searchTokens = expandSearchTokens(query);
  const searchIndex = dedupeResults([...extraResults, ...siteSearchIndex]);

  return searchIndex
    .map((item) => {
      const normalizedTitle = normalizeSearchText(item.title);
      const normalizedMeta = normalizeSearchText(item.meta ?? "");
      const normalizedKeywords = normalizeSearchText((item.keywords ?? []).join(" "));
      const haystack = normalizeSearchText(
        `${item.title} ${item.summary} ${item.category} ${item.meta ?? ""} ${(item.keywords ?? []).join(" ")}`
      );
      let score = 0;

      if (normalizedTitle.includes(normalized)) {
        score += 10;
      }

      if (normalizedKeywords.includes(normalized) || normalizedMeta.includes(normalized)) {
        score += 6;
      }

      if (haystack.includes(normalized)) {
        score += 3;
      }

      searchTokens.forEach((token) => {
        if (normalizedTitle.includes(token)) {
          score += 5;
        }

        if (normalizedKeywords.includes(token)) {
          score += 4;
        }

        if (normalizedMeta.includes(token)) {
          score += 2;
        }

        if (haystack.includes(token)) {
          score += 1;
        }
      });

      if (searchTokens.length > 1 && searchTokens.every((token) => haystack.includes(token))) {
        score += 4;
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
