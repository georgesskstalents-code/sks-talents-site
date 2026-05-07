import type { Metadata } from "next";
import AnimalHealthLanding from "./AnimalHealthLanding";

const CANONICAL = "https://www.skstalents.fr/animal-health/structuration-ia";
const TITLE = "Structuration RH (Agent & automatisation) · Animal Health | SKS TALENTS";
const DESCRIPTION =
  "Démo 90 sec : passez de 3 jours à 4 minutes de reporting multi-sites. 6 agents IA pour groupements vétérinaires et petfood. ROI 6 mois. RGPD by design.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    url: CANONICAL,
    siteName: "SKS TALENTS"
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  keywords: [
    "structuration RH animal health",
    "agents IA cliniques vétérinaires",
    "executive search vétérinaire",
    "recrutement petfood premium",
    "consolidation cliniques vétérinaires",
    "M&A vétérinaire",
    "reporting multi-sites cliniques"
  ]
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Structuration RH + Agents IA Animal Health",
  serviceType: "Executive Search · Structuration RH · Agents IA",
  provider: {
    "@type": "Organization",
    name: "SKS TALENTS",
    url: "https://www.skstalents.fr"
  },
  areaServed: ["France", "Europe"],
  description: DESCRIPTION,
  url: CANONICAL
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
    { "@type": "ListItem", position: 2, name: "Animal Health", item: "https://www.skstalents.fr/animal-health" },
    { "@type": "ListItem", position: 3, name: "Structuration RH + IA", item: CANONICAL }
  ]
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Démo Agent Reporting Multi-Sites · SKS Talents",
  description:
    "Démo interactive de 90 secondes. Comment un cofondateur DG d'un groupement vétérinaire passe de 3 jours à 4 minutes de reporting mensuel.",
  thumbnailUrl: "https://www.skstalents.fr/opengraph-image",
  uploadDate: "2026-05-05T00:00:00Z",
  duration: "PT1M30S",
  contentUrl: CANONICAL + "#demo"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps prend le déploiement d'un agent IA SKS Talents ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le pilote est généralement opérationnel en 4 à 6 semaines, avec un ROI mesurable dès le 4ème mois sur la majorité des cas."
      }
    },
    {
      "@type": "Question",
      name: "Pour quelles tailles d'organisation est-ce pertinent ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Groupements de 10 à 100+ cliniques vétérinaires en consolidation, marques petfood multinationales et PME premium en hyper-croissance (5 → 50M€ ARR)."
      }
    },
    {
      "@type": "Question",
      name: "Les données restent-elles confidentielles ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, RGPD by design : hébergement européen, isolation par client, contrat de sous-traitance signé, droit à l'oubli activable à tout moment."
      }
    }
  ]
};

export default function AnimalHealthStructurationIaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AnimalHealthLanding />
    </>
  );
}
