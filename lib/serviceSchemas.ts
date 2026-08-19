/**
 * Service schemas pour les pages hub metier.
 *
 * Note 2026-08-19 : aggregateRating retire du niveau Service suite
 * a un signalement GSC ("Element : {service name}"). Le domain-wide
 * aggregateRating reste porte par l'Organization schema (lib/seo.ts)
 * qui est charge sur toutes les pages.
 *
 * A importer et injecter dans les pages hub (/life-sciences, /animal-health, etc).
 */

const PROVIDER = {
  "@type": "Organization" as const,
  "@id": "https://www.skstalents.fr/#organization",
  name: "SKS TALENTS",
  url: "https://www.skstalents.fr"
};

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    provider: PROVIDER,
    areaServed: (opts.areaServed ?? ["France", "Europe"]).map((c) => ({
      "@type": "Country",
      name: c
    }))
  };
}

export const lifeSciencesServiceSchema = buildServiceSchema({
  name: "Executive Search Life Sciences France - Recrutement CEO, COO, CMO biotech",
  description:
    "Cabinet d'executive search Life Sciences en France : recrutement de cadres dirigeants (CEO, COO, CMO, CSO, VP) pour scale-ups biotech, medtech, diagnostic et deeptech sante Series A a C.",
  url: "https://www.skstalents.fr/life-sciences",
  serviceType: "Executive Search Life Sciences"
});

export const animalHealthServiceSchema = buildServiceSchema({
  name: "Executive Search Animal Health - Recrutement veterinaire, petfood, diagnostic animal",
  description:
    "Cabinet d'executive search Animal Health en France : recrutement de dirigeants pour groupements veterinaires, cliniques referees, petfood premium, diagnostic veterinaire et industrie pharmaceutique animale.",
  url: "https://www.skstalents.fr/animal-health",
  serviceType: "Executive Search Animal Health"
});

export const diagnosticServiceSchema = buildServiceSchema({
  name: "Executive Search Diagnostic IVD - Recrutement cadres IVD, medtech, NGS",
  description:
    "Cabinet de recrutement executive search specialise en diagnostic in vitro (IVD), NGS, point of care testing et medtech. Recrutement de VP Sales, Head of Regulatory IVDR, Application Specialists.",
  url: "https://www.skstalents.fr/diagnostic",
  serviceType: "Executive Search Diagnostic IVD"
});

export const structurationIaLsServiceSchema = buildServiceSchema({
  name: "Digitalisation RH par l'IA - Life Sciences - Programme SKS Talents",
  description:
    "Digitalisation RH par l'IA pour scale-ups biotech, medtech et deeptech Series A a C. Agents IA + automatisation + structuration RH. CEO Copilot, Talent Intelligence, Retention.",
  url: "https://www.skstalents.fr/life-sciences/structuration-ia",
  serviceType: "Digitalisation RH par l'IA"
});

export const structurationIaAhServiceSchema = buildServiceSchema({
  name: "Digitalisation sante animale par l'IA - Groupements veterinaires, petfood",
  description:
    "Digitalisation sante animale par l'IA pour groupements veterinaires, cliniques, petfood et diagnostic animal. 3 agents IA (Reporting Multi-Sites, Juridique RH, Pipeline Commercial). ROI 6 mois.",
  url: "https://www.skstalents.fr/animal-health/structuration-ia",
  serviceType: "Digitalisation RH par l'IA Animal Health"
});
