import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimalHealthContent from "./components/content";
import { getSectorLandingPage } from "@/data/sectorLandingPages";

const page = getSectorLandingPage("animal");

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  keywords: [
    "recrutement animal health",
    "cabinet recrutement sante animale",
    "recrutement diagnostic veterinaire",
    "recrutement cliniques veterinaires",
    "recrutement petfood",
    "executive search animal health",
    "structuration recrutement sante animale"
  ],
  alternates: {
    canonical: page.metadata.canonical
  },
  openGraph: {
    title: page.metadata.title,
    description: page.metadata.description,
    type: "website",
    locale: "fr_FR",
    url: page.metadata.canonical,
    siteName: "SKS TALENTS"
  },
  twitter: {
    card: "summary_large_image",
    title: page.metadata.title,
    description: page.metadata.description
  },
  robots: {
    index: true,
    follow: true
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: page.faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SKS TALENTS",
  url: page.metadata.canonical,
  serviceType: "Recrutement Animal Health",
  description: page.metadata.description,
  areaServed: ["France", "Europe"],
  availableLanguage: ["French", "English"]
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.skstalents.fr"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Animal Health",
      item: page.metadata.canonical
    }
  ]
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recrutement Animal Health",
  url: page.metadata.canonical,
  description: page.metadata.description,
  about: page.verticals.map((item) => item.name),
  isPartOf: "https://www.skstalents.fr",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: page.strategicLinks.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `https://www.skstalents.fr${item.href}`
    }))
  }
};

export default function AnimalHealthHubPage() {
  return (
    <>
      <script
        id="animal-health-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="animal-health-collectionpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        id="animal-health-professionalservice-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        id="animal-health-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AnimalHealthContent />
      <section className="container-shell py-8">
        <Link
          href="/animal-health/structuration-ia"
          className="group flex items-start gap-4 rounded-3xl border border-brand-teal/20 bg-gradient-to-br from-brand-mint/40 to-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:items-center sm:p-8"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-teal text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-eyebrow font-semibold uppercase text-brand-teal">🆕 Nouveau programme</p>
            <p className="mt-1 t-h2 font-display">Structuration RH + IA Animal Health</p>
            <p className="mt-2 t-body">
              6 agents IA sectoriels · ROI 6 mois · Démo interactive 90 sec.
            </p>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-brand-teal transition group-hover:translate-x-0.5" />
        </Link>
      </section>
    </>
  );
}
