import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import LifeSciencesContent from "./components/content";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionShell from "@/components/SectionShell";
import RibbonCTA from "@/components/RibbonCTA";
import { getSectorLandingPage } from "@/data/sectorLandingPages";

const page = getSectorLandingPage("life");

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  keywords: [
    "recrutement life sciences",
    "cabinet recrutement biotech",
    "recrutement diagnostic ivd ngs",
    "executive search life sciences",
    "RPO life sciences",
    "structuration recrutement life sciences",
    "recrutement e-sante",
    "recrutement robotique sante"
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
  serviceType: "Recrutement exécutif Life Sciences",
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
      name: "Life Sciences",
      item: page.metadata.canonical
    }
  ]
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recrutement Life Sciences",
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
  "Biotech",
  "Medtech (MDR/IVDR)",
  "Diagnostic & IVD",
  "Deeptech / ARN",
  "E-santé / digital health",
  "Cosmétique scientifique",
  "Industrielle BPF/GMP"
];

const signauxLs = [
  "Constituer un COMEX biotech aligné",
  "Passer de Series A à Series B",
  "Recruter un VP Reg ou Head of CMC",
  "Scaler 50 → 200 employés sans perdre le cap",
  "Trouver un partenaire qui parle MDR/IVDR/GMP"
];

// 4 fiches métiers Life Sciences — placeholders, à enrichir avec les slugs réels de data/jobRoles.ts
const postesLs = [
  { title: "TODO_GEORGES_LS_POSTE_1", href: "/job-roles" },
  { title: "TODO_GEORGES_LS_POSTE_2", href: "/job-roles" },
  { title: "TODO_GEORGES_LS_POSTE_3", href: "/job-roles" },
  { title: "TODO_GEORGES_LS_POSTE_4", href: "/job-roles" }
];

export default function LifeSciencesHubPage() {
  return (
    <>
      <script
        id="life-sciences-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="life-sciences-collectionpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        id="life-sciences-professionalservice-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        id="life-sciences-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <LifeSciencesContent />

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

      {/* 5 signaux LS-adapted */}
      <RevealOnScroll delayMs={50}>
        <SectionShell
          eyebrow="5 signaux qu’il est temps d’agir en Life Sciences"
          title="Vous reconnaissez votre situation ?"
        >
          <div className="mx-auto max-w-4xl space-y-3">
            {signauxLs.map((signal, idx) => (
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

      {/* Programme IA Life Sciences */}
      <RevealOnScroll delayMs={90}>
        <section className="bg-brand-mint py-14 sm:py-20">
          <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-teal">Programme IA</p>
              <h2 className="t-h1 mt-2 font-display text-brand-ink">
                {/* TODO_GEORGES_LS_PROG_IA_H2 — h2 d'accroche, max 80 car. */}
                TODO_GEORGES_LS_PROG_IA_H2
              </h2>
              <p className="mt-4 t-body text-brand-stone">
                {/* TODO_GEORGES_LS_PROG_IA_DESC — résumé du programme avec persona Marie Laurent (CEO biotech Series B oncologie) et bénéfices clés. 2-3 phrases. */}
                TODO_GEORGES_LS_PROG_IA_DESC
              </p>
              <Link
                href="/life-sciences/structuration-ia"
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
                  <p className="t-h3 font-display text-brand-ink">Agent CEO Copilot stratégique</p>
                  <p className="text-caption text-brand-stone">Démo interactive 30 sec</p>
                </div>
              </div>
              <p className="mt-4 text-caption text-brand-stone">
                Anticipez vos recrutements 6 mois à l'avance. Pour CEO biotech, medtech, deeptech, e-santé Series A à C.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Postes recrutés */}
      <RevealOnScroll delayMs={130}>
        <SectionShell
          eyebrow="Postes que nous recrutons"
          title="4 fiches métiers Life Sciences."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {postesLs.map((poste) => (
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
          eyebrow="Spécialiste Life Sciences"
          title="Membre Commission RH France Biotech."
          description="Cabinet ancré dans l'écosystème biotech, medtech, diagnostic et e-santé."
          secondaryHref="/life-sciences/structuration-ia"
          secondaryLabel="Voir le programme IA"
        />
      </RevealOnScroll>
    </>
  );
}
