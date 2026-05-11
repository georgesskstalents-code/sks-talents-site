import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimalHealthContent from "./components/content";
import RevealOnScroll from "@/components/RevealOnScroll";
import RibbonCTA from "@/components/RibbonCTA";
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

const sectorTags = [
  "Groupes vétérinaires",
  "Petfood multinational",
  "Petfood PME premium",
  "Pharma & biotech vétérinaire",
  "Nutrition animale",
  "M&A vétérinaire"
];

const signauxAh = [
  "Consolider un groupe vétérinaire multi-sites",
  "Industrialiser un onboarding post-acquisition",
  "Recruter un Directeur Commercial petfood",
  "Structurer un pipeline M&A vétérinaire",
  "Trouver un partenaire qui parle vétérinaire ET petfood"
];

const postesAh = [
  { title: "Directeur Commercial Petfood", href: "/job-roles" },
  { title: "Vétérinaire Référent Multi-Sites", href: "/job-roles" },
  { title: "Responsable M&A Vétérinaire", href: "/job-roles" },
  { title: "Head of Nutrition Animale", href: "/job-roles" }
];

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

      {/* Tags secteurs — inline, compact */}
      <RevealOnScroll>
        <section className="container-shell pt-4 pb-2">
          <p className="eyebrow">Nos verticaux</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sectorTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-teal/20 bg-white px-3 py-1.5 text-caption font-semibold text-brand-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* 5 signaux AH — compact list */}
      <RevealOnScroll delayMs={50}>
        <section className="container-shell py-10 sm:py-14">
          <p className="eyebrow">5 signaux qu’il est temps d’agir en Animal Health</p>
          <h2 className="t-h2 mt-2 max-w-3xl font-display">Vous reconnaissez votre situation ?</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {signauxAh.map((signal, idx) => (
              <li
                key={signal}
                className="flex items-center gap-3 rounded-2xl border border-brand-teal/15 bg-white px-4 py-3"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal text-[11px] font-bold text-white"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="t-body font-semibold text-brand-ink">{signal}</p>
              </li>
            ))}
          </ul>
        </section>
      </RevealOnScroll>

      {/* Programme IA Animal Health */}
      <RevealOnScroll delayMs={90}>
        <section className="bg-brand-mint py-12 sm:py-16">
          <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-teal">Programme IA</p>
              <h2 className="t-h2 mt-2 font-display text-brand-ink">
                L'agent IA des groupements vétérinaires.
              </h2>
              <p className="mt-3 t-body text-brand-stone">
                « 32 directeurs de cliniques. 32 formats différents. 0 vue d'ensemble. » Sébastien Dupont résumait ainsi son enfer du reporting il y a 18 mois. Aujourd'hui, son agent IA consolide tout en temps réel : 28 OK, 3 alertes, 1 critique, et la recommandation d'action en clair.
              </p>
              <Link
                href="/animal-health/structuration-ia"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-caption font-semibold text-white transition hover:opacity-90"
              >
                Découvrir le programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-brand-teal/15 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint text-brand-teal">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="t-h3 font-display text-brand-ink">Agent Reporting Multi-Sites</p>
                  <p className="text-caption text-brand-stone">Démo interactive 30 sec</p>
                </div>
              </div>
              <p className="mt-3 text-caption text-brand-stone">
                De 3 jours à 4 minutes de reporting mensuel. Pour groupements vétérinaires et petfood.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Postes recrutés — grille compacte */}
      <RevealOnScroll delayMs={130}>
        <section className="container-shell py-10 sm:py-14">
          <p className="eyebrow">Postes que nous recrutons</p>
          <h2 className="t-h2 mt-2 max-w-3xl font-display">4 fiches métiers Animal Health.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {postesAh.map((poste) => (
              <Link
                key={poste.title}
                href={poste.href}
                className="flex flex-col gap-2 rounded-2xl border border-brand-teal/15 bg-white p-4 transition hover:shadow-soft"
              >
                <p className="t-body font-semibold text-brand-ink">{poste.title}</p>
                <span className="inline-flex items-center gap-1 text-caption font-semibold text-brand-teal">
                  Voir la fiche
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA final adapté */}
      <RevealOnScroll delayMs={160}>
        <RibbonCTA
          variant="final"
          eyebrow="Spécialiste Animal Health"
          title="100+ placements vétérinaire & petfood."
          description="Cabinet ancré dans l'écosystème des cliniques, groupements et industriels santé animale."
          secondaryHref="/animal-health/structuration-ia"
          secondaryLabel="Voir le programme IA"
        />
      </RevealOnScroll>
    </>
  );
}
