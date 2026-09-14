import { proof } from "@/data/proof";

export const SITE_URL = "https://www.skstalents.fr";

/** Identifiants stables reutilises par reference dans tous les @graph du site. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#georges-kengue`;
export const SERVICE_EXECUTIVE_SEARCH_ID = `${SITE_URL}/#service-executive-search`;
export const SERVICE_RPO_ID = `${SITE_URL}/#service-rpo`;
export const SERVICE_STRUCTURATION_RH_ID = `${SITE_URL}/#service-structuration-rh`;

export const LINKEDIN_PERSONAL_URL = "https://www.linkedin.com/in/georges-kengue-81988b36/";
export const LINKEDIN_COMPANY_URL = "https://www.linkedin.com/company/sks-talents/";

/** Reference courte vers un noeud du graphe, a utiliser au lieu de le redefinir. */
export const orgRef = { "@id": ORG_ID } as const;
export const personRef = { "@id": PERSON_ID } as const;

const AUDIENCE = {
  "@type": "Audience",
  audienceType: "CEO, COO, DRH de biotech, medtech, diagnostic et sante animale"
} as const;

const AREA_SERVED = [
  { "@type": "Country", name: "France" },
  { "@type": "Country", name: "Sénégal" },
  { "@type": "Country", name: "Côte d'Ivoire" },
  { "@type": "Country", name: "Bénin" }
];

export const organizationNode = {
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": ORG_ID,
  name: "SKS TALENTS",
  legalName: "SPECIFIC KEY SKILLS TALENTS",
  alternateName: "SKS Talents",
  slogan: "Your Talent · Our Future",
  priceRange: "€€€",
  url: SITE_URL,
  email: "g.kengue@skstalents.fr",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/brand/logo-sks-talents.svg`,
    width: 512,
    height: 512
  },
  image: `${SITE_URL}/brand/logo-sks-talents.svg`,
  // Date d'immatriculation reelle de la SAS (source INSEE, SIREN 919 079 392).
  foundingDate: proof.legalFoundingDate,
  taxID: "FR93919079392",
  vatID: "FR93919079392",
  identifier: [
    { "@type": "PropertyValue", name: "SIREN", value: "919079392" },
    { "@type": "PropertyValue", name: "SIRET", value: "91907939200016" }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "128, rue la Boétie",
    postalCode: "75008",
    addressLocality: "Paris",
    addressCountry: "FR"
  },
  areaServed: AREA_SERVED,
  knowsAbout: [
    "recrutement life sciences",
    "recrutement animal health",
    "recrutement diagnostic",
    "recrutement medtech",
    "recrutement healthtech",
    "recrutement e-santé",
    "recrutement robotique santé",
    "recrutement petfood",
    "structuration RH",
    "automatisation RH",
    "RPO",
    "executive search life sciences",
    "chasse de tête dirigeants santé",
    "recrutement après levée de fonds",
    "recrutement série A biotech",
    "recrutement série B healthtech",
    "médecine nucléaire",
    "fonds santé",
    "salary benchmarks",
    "orientation biotech"
  ],
  sameAs: [proof.trustpilotUrl, LINKEDIN_COMPANY_URL, LINKEDIN_PERSONAL_URL],
  founder: personRef,
  employee: personRef,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["French", "English"],
      email: "g.kengue@skstalents.fr",
      url: "https://calendly.com/g-kengue/talentconsulting"
    }
  ],
  description:
    "Cabinet de recrutement spécialisé en Life Sciences, biotech, diagnostic, healthtech, e-santé, robotique santé, médecine vétérinaire, petfood premium, RPO et structuration RH.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(proof.trustpilotRating),
    bestRating: "5",
    worstRating: "1",
    reviewCount: proof.trustpilotCount,
    url: proof.trustpilotUrl
  },
  serviceType: [
    "Executive Search Life Sciences",
    "Executive Search Animal Health",
    "Executive Search Biotech",
    "Executive Search MedTech",
    "Executive Search Diagnostic",
    "Recrutement veterinaire",
    "Recrutement petfood",
    "Structuration RH digitalisation par l'IA",
    "Recrutement scale-up Series A Series B"
  ]
};

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Georges Kengue",
  jobTitle: "Fondateur",
  worksFor: orgRef,
  url: `${SITE_URL}/team`,
  sameAs: [LINKEDIN_PERSONAL_URL],
  knowsAbout: [
    "executive search Life Sciences",
    "recrutement santé animale",
    "structuration RH",
    "digitalisation des process RH"
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "IGS Paris"
  }
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "SKS TALENTS",
  url: SITE_URL,
  publisher: orgRef,
  inLanguage: ["fr-FR", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const serviceNodes = [
  {
    "@type": "Service",
    "@id": SERVICE_EXECUTIVE_SEARCH_ID,
    name: "Executive search Life Sciences et santé animale",
    serviceType: "Executive search",
    provider: orgRef,
    areaServed: AREA_SERVED,
    audience: AUDIENCE,
    url: `${SITE_URL}/services`,
    description:
      "Recherche directe de dirigeants et de cadres pour la biotech, la medtech, le diagnostic, la santé animale et le petfood."
  },
  {
    "@type": "Service",
    "@id": SERVICE_RPO_ID,
    name: "RPO",
    serviceType: "Recruitment Process Outsourcing",
    provider: orgRef,
    areaServed: AREA_SERVED,
    audience: AUDIENCE,
    url: `${SITE_URL}/services`,
    description:
      "Externalisation pilotée du processus de recrutement pour absorber un plan de recrutement après une levée de fonds."
  },
  {
    "@type": "Service",
    "@id": SERVICE_STRUCTURATION_RH_ID,
    name: "Structuration RH et digitalisation des process",
    serviceType: "Conseil en organisation RH",
    provider: orgRef,
    areaServed: AREA_SERVED,
    audience: AUDIENCE,
    url: `${SITE_URL}/structuration-rh`,
    description:
      "Audit RH, organisation cible, process de recrutement et d'onboarding, outillage, automatisation et gouvernance IA.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Livrables de structuration RH",
      itemListElement: [
        "Audit RH",
        "Organigramme cible",
        "Process de recrutement et d'onboarding",
        "Grille de rémunération",
        "Outillage et automatisation",
        "Gouvernance IA"
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name }
      }))
    }
  }
];

/** Graphe global injecte une seule fois dans le layout racine. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode, personNode, ...serviceNodes]
};

/** Enveloppe un ensemble de noeuds specifiques a une page dans un seul script. */
export function pageGraph(nodes: ReadonlyArray<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}

/** Construit un noeud BreadcrumbList a partir d'une liste de paliers. */
export function breadcrumbNode(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

/** Construit un noeud FAQPage. Une seule FAQPage par page, jamais deux. */
export function faqNode(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

/**
 * Conserves pour compatibilite avec les pages pas encore migrees vers @graph.
 * Ne pas utiliser dans du nouveau code : preferer pageGraph + orgRef.
 */
export const organizationSchema = { "@context": "https://schema.org", ...organizationNode };
export const websiteSchema = { "@context": "https://schema.org", ...websiteNode };

/**
 * Le layout racine applique le template `%s | SKS TALENTS` a chaque title de
 * page. Les titres ecrits en base contenaient deja ce suffixe, ce qui
 * produisait `... | SKS TALENTS | SKS TALENTS | SKS TALENTS` dans le SERP :
 * titre tronque, illisible, et zero clic sur des pages pourtant bien placees.
 *
 * Cette fonction retire tout suffixe de marque deja present pour que le
 * template soit la seule source du suffixe.
 */
export function stripBrandSuffix(title: string): string {
  return title
    .replace(/\s*[|\u00b7\-]\s*SKS(\s+TALENTS)?\s*$/i, "")
    .replace(/\s*[|\u00b7\-]\s*SKS(\s+TALENTS)?\s*$/i, "")
    .trim();
}
