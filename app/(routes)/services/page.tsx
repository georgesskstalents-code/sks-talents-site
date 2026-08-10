import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import MethodNarrative from "@/components/MethodNarrative";
import PageHero from "@/components/PageHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import { faqsByPage } from "@/data/faqsByPage";

const CANONICAL = "https://www.skstalents.fr/services";
const TITLE = "Executive search + digitalisation RH par l'IA - Life Sciences";
const DESCRIPTION =
  "Cabinet executive search Life Sciences et Animal Health + digitalisation RH par l'IA. Structuration RH, agents IA, automatisation. Accompagnement scale-up pour CEO biotech, medtech, veterinaire.";

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
  }
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${CANONICAL}#service`,
  name: "Executive Search + Digitalisation RH par l'IA - Life Sciences",
  serviceType: "Executive Search + Digitalisation RH par l'IA",
  provider: {
    "@type": "Organization",
    "@id": "https://www.skstalents.fr/#organization",
    name: "SKS TALENTS",
    url: "https://www.skstalents.fr"
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Europe" }
  ],
  description: DESCRIPTION,
  url: CANONICAL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    bestRating: "5",
    worstRating: "1",
    reviewCount: 17,
    url: "https://fr.trustpilot.com/review/skstalents.fr"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
    { "@type": "ListItem", position: 2, name: "Nos services", item: CANONICAL }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* 1. Hero */}
      <PageHero
        kicker="Nos services"
        title="Executive search, RPO, onboarding et structuration RH."
        description="Trois offres complémentaires pour sécuriser vos recrutements critiques, absorber un volume de hiring exigeant et bâtir un cadre people robuste."
        variant="sand"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Nos services" }]}
      />

      {/* 2. Nos 3 offres (composant existant ServicesSection) */}
      <RevealOnScroll>
        <ServicesSection />
      </RevealOnScroll>

      {/* 3. Méthode SKS (différenciateur) */}
      <RevealOnScroll delayMs={50}>
        <MethodNarrative />
      </RevealOnScroll>

      {/* 4. Interlocuteur direct - closer humain avec Calendly + LinkedIn + Trustpilot */}
      <RevealOnScroll delayMs={100}>
        <FounderCard />
      </RevealOnScroll>
          <FAQSection eyebrow="FAQ" title={faqsByPage["services"].title} description={faqsByPage["services"].description} items={faqsByPage["services"].items} />
    </>
  );
}
