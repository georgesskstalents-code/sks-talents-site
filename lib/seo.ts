export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SKS TALENTS",
  alternateName: "SKS Talents",
  url: "https://www.skstalents.fr",
  email: "g.kengue@skstalents.com",
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Sénégal" },
    { "@type": "Country", name: "Côte d'Ivoire" },
    { "@type": "Country", name: "Bénin" }
  ],
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
  sameAs: [
    "https://fr.trustpilot.com/review/skstalents.fr",
    "https://linkedin.com/m/search/results/all/?keywords=sks+talents&fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86378852&position=0&origin=RICH_QUERY_TYPEAHEAD_HISTORY&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BrPgcaT3hSCqaGuomz7Pvvw%3D%3D"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["French", "English"],
      email: "g.kengue@skstalents.com",
      url: "https://calendly.com/g-kengue/talentconsulting"
    }
  ],
  description:
    "Cabinet de recrutement spécialisé en Life Sciences, biotech, diagnostic, healthtech, e-santé, robotique santé, médecine vétérinaire, petfood premium, RPO et structuration RH."
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SKS TALENTS",
  url: "https://www.skstalents.fr",
  inLanguage: ["fr-FR", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.skstalents.fr/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
