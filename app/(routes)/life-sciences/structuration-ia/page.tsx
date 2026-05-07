import type { Metadata } from "next";
import LifeSciencesLanding from "./LifeSciencesLanding";

const CANONICAL = "https://www.skstalents.fr/life-sciences/structuration-ia";
const TITLE = "Structuration RH (Agent & automatisation) · Life Sciences | SKS TALENTS";
const DESCRIPTION =
  "Démo 90 sec : anticipez vos recrutements 6 mois à l'avance. Pour CEO biotech, medtech, deeptech, e-santé Series A à C. 100 % rétention 12 mois.";

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
    "CEO copilot biotech",
    "structuration RH life sciences",
    "executive search biotech series B",
    "talent intelligence biotech",
    "anticipation recrutements life sciences",
    "agents IA medtech",
    "scale-up biotech recrutement"
  ]
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CEO Copilot IA Life Sciences",
  serviceType: "Executive Search · Talent Intelligence · CEO Copilot",
  provider: { "@type": "Organization", name: "SKS TALENTS", url: "https://www.skstalents.fr" },
  areaServed: ["France", "Europe"],
  description: DESCRIPTION,
  url: CANONICAL
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
    { "@type": "ListItem", position: 2, name: "Life Sciences", item: "https://www.skstalents.fr/life-sciences" },
    { "@type": "ListItem", position: 3, name: "CEO Copilot IA", item: CANONICAL }
  ]
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Démo Agent CEO Copilot stratégique · SKS Talents",
  description:
    "Démo interactive de 90 secondes. Comment une CEO biotech Series B en oncologie passe de 2 jours à 5 minutes de préparation board, et anticipe ses recrutements 6 mois à l'avance.",
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
      name: "À quelles startups Life Sciences le CEO Copilot s'adresse-t-il ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aux CEO biotech, medtech, deeptech biomatériaux et e-santé en phase Series A à Series C+ (5 → 200 employés), avec un board structuré et une roadmap R&D explicite."
      }
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il après le diagnostic en 5 questions ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous recevez immédiatement par email l'agent IA prioritaire recommandé, le ROI projeté sur 6 mois, deux agents complémentaires et 3 priorités stratégiques. Un appel de 15 min avec Georges Kengue est ensuite proposé pour cadrer le déploiement."
      }
    },
    {
      "@type": "Question",
      name: "Combien de temps pour voir un ROI mesurable ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le pilote du CEO Copilot est généralement opérationnel en 4 à 6 semaines. Le premier board pack auto-généré arrive dans la foulée, et le premier hire stratégique anticipé sur 6 mois est mesurable dès le 4ème mois."
      }
    }
  ]
};

export default function LifeSciencesStructurationIaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <LifeSciencesLanding />
    </>
  );
}
