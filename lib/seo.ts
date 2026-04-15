export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SKS TALENTS",
  url: "https://www.skstalents.fr",
  email: "infos@skstalents.com",
  sameAs: [
    "https://fr.trustpilot.com/review/skstalents.fr",
    "https://linkedin.com/m/search/results/all/?keywords=sks+talents&fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A86378852&position=0&origin=RICH_QUERY_TYPEAHEAD_HISTORY&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BrPgcaT3hSCqaGuomz7Pvvw%3D%3D"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["French", "English"],
      email: "infos@skstalents.com",
      url: "https://calendly.com/g-kengue/talentconsulting"
    }
  ],
  description:
    "Cabinet de recrutement spécialisé en Life Sciences, diagnostic, médecine vétérinaire et petfood premium."
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SKS TALENTS",
  url: "https://www.skstalents.fr"
};
