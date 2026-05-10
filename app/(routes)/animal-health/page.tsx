import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimalHealthContent from "./components/content";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionShell from "@/components/SectionShell";
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
  { title: "TODO_GEORGES_AH_POSTE_1", href: "/job-roles" },
  { title: "TODO_GEORGES_AH_POSTE_2", href: "/job-roles" },
  { title: "TODO_GEORGES_AH_POSTE_3", href: "/job-roles" },
  { title: "TODO_GEORGES_AH_POSTE_4", href: "/job-roles" }
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

      {/* Tags secteurs */}
      <RevealOnScroll>
        <section className="container-shell py-8">
          <p className="eyebrow">Nos verticaux</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sectorTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-teal/20 bg-white px-4 py-2 text-caption font-semibold text-brand-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* 5 signaux AH-adapted */}
      <RevealOnScroll delayMs={50}>
        <SectionShell
          eyebrow="5 signaux qu’il est temps d’agir en Animal Health"
          title="Vous reconnaissez votre situation ?"
        >
          <div className="mx-auto max-w-4xl space-y-3">
            {signauxAh.map((signal, idx) => (
              <article
                key={signal}
                className="card-luxe panel-lift flex items-start gap-4 p-5 sm:p-6"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="t-h3 font-display text-brand-ink">{signal}</p>
              </article>
            ))}
          </div>
        </SectionShell>
      </RevealOnScroll>

      {/* Programme IA Animal Health */}
      <RevealOnScroll delayMs={90}>
        <section className="bg-brand-mint py-14 sm:py-20">
          <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-teal">Programme IA</p>
              <h2 className="t-h1 mt-2 font-display text-brand-ink">
                {/* TODO_GEORGES_AH_PROG_IA_H2 — h2 d'accroche, max 80 car. */}
                TODO_GEORGES_AH_PROG_IA_H2
              </h2>
              <p className="mt-4 t-body text-brand-stone">
                {/* TODO_GEORGES_AH_PROG_IA_DESC — résumé du programme avec persona Sébastien Dupont (cofondateur DG groupement vétérinaire 32 cliniques) et bénéfices clés. 2-3 phrases. */}
                TODO_GEORGES_AH_PROG_IA_DESC
              </p>
              <Link
                href="/animal-health/structuration-ia"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-caption font-semibold text-white transition hover:opacity-90"
              >
                Découvrir le programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mint text-brand-teal">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="t-h3 font-display text-brand-ink">Agent Reporting Multi-Sites</p>
                  <p className="text-caption text-brand-stone">Démo interactive 30 sec</p>
                </div>
              </div>
              <p className="mt-4 text-caption text-brand-stone">
                De 3 jours à 4 minutes de reporting mensuel. Pour groupements vétérinaires et petfood.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Postes recrutés */}
      <RevealOnScroll delayMs={130}>
        <SectionShell
          eyebrow="Postes que nous recrutons"
          title="4 fiches métiers Animal Health."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {postesAh.map((poste) => (
              <Link
                key={poste.title}
                href={poste.href}
                className="rounded-2xl border border-brand-teal/15 bg-white p-5 transition hover:shadow-soft"
              >
                <p className="t-h3 font-display text-brand-ink">{poste.title}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-caption font-semibold text-brand-teal">
                  Voir la fiche
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </SectionShell>
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
