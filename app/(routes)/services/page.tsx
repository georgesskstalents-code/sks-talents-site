import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import MethodNarrative from "@/components/MethodNarrative";
import PageHero from "@/components/PageHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServicesSection from "@/components/ServicesSection";

const CANONICAL = "https://www.skstalents.fr/services";
const TITLE = "Nos services · Executive search, Programme IA, Structuration RH | SKS TALENTS";
const DESCRIPTION =
  "Cabinet executive search Life Sciences et Animal Health. Programme IA RH, structuration RH et accompagnement scale-up pour CEO biotech, medtech, vétérinaire.";

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
  name: "Executive search · Programme IA · Structuration RH",
  serviceType: "Executive Search · Talent Acquisition · Structuration RH",
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
    </>
  );
}
