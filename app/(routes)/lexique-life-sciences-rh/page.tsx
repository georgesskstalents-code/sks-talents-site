import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import GlossaryExplorer from "@/components/GlossaryExplorer";
import WhitepaperLeadCard from "@/components/WhitepaperLeadCard";
import { glossaryConcepts, glossaryGroups, lexiconHubPage, whitepaperGuides } from "@/data/lexiconHub";

const canonicalUrl = "https://www.skstalents.fr/lexique-life-sciences-rh";

export const metadata: Metadata = {
  title: `${lexiconHubPage.metaTitle} | SKS TALENTS`,
  description: lexiconHubPage.metaDescription,
  keywords: [
    "structuration RH",
    "recrutement Life Sciences",
    "automatisation RH",
    "scale-up",
    "performance organisationnelle",
    "lexique RH",
    "healthtech",
    "animal health"
  ],
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: lexiconHubPage.metaTitle,
    description: lexiconHubPage.metaDescription,
    url: canonicalUrl,
    siteName: "SKS TALENTS",
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: lexiconHubPage.metaTitle,
    description: lexiconHubPage.metaDescription
  }
};

export default function LexiconLifeSciencesRhPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lexiconHubPage.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: lexiconHubPage.title,
    description: lexiconHubPage.metaDescription,
    url: canonicalUrl,
    hasDefinedTerm: glossaryConcepts.map((concept) => ({
      "@type": "DefinedTerm",
      name: concept.term,
      description: `${concept.definition} ${concept.whyItMatters} ${concept.businessInsight}`
    }))
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: lexiconHubPage.title,
    description: lexiconHubPage.metaDescription,
    url: canonicalUrl,
    hasPart: whitepaperGuides.map((guide) => ({
      "@type": "CreativeWork",
      name: guide.title,
      description: guide.description,
      url: `https://www.skstalents.fr/guides/${guide.slug}`
    }))
  };

  return (
    <>
      <script
        id="lexicon-life-sciences-rh-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        id="lexicon-life-sciences-rh-definedtermset-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <script
        id="lexicon-life-sciences-rh-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <section className="container-shell py-16 sm:py-20">
        <div className="card-surface overflow-hidden p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-brand-teal/12 bg-brand-mint/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                Hub central Life Sciences & RH
              </p>
              <h1 className="t-h1 mt-6 max-w-5xl">
                {lexiconHubPage.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-stone">
                {lexiconHubPage.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#whitepapers"
                  className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Télécharger le guide
                </Link>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  Demander un diagnostic
                </Link>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand-ink/60">
                Recrutement Life Sciences · Structuration RH · Automatisation RH · Scale-up ·
                Performance organisationnelle
              </p>
            </div>

            <div className="rounded-[30px] border border-brand-teal/12 bg-[linear-gradient(180deg,rgba(247,251,251,0.98),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_60px_rgba(21,39,41,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                En 10 secondes
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {lexiconHubPage.heroSignals.map((signal) => (
                  <div key={signal} className="rounded-[22px] border border-brand-teal/10 bg-white px-4 py-4">
                    <p className="text-sm font-semibold leading-6 text-brand-ink">{signal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[24px] border border-brand-teal/10 bg-brand-mint/28 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  Ce que la page vous aide à faire
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-brand-stone">
                  {lexiconHubPage.mandatoryInsights.map((insight) => (
                    <li key={insight} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-teal" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Intro LLM</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            {lexiconHubPage.introQuestion}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-brand-stone">{lexiconHubPage.introAnswer}</p>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="grid gap-5 lg:grid-cols-4">
          {lexiconHubPage.problemBlocks.map((block) => (
            <article key={block.title} className="card-surface h-full p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Problème</p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">{block.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{block.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Checklist</p>
              <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">Êtes-vous structuré ?</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
                Utilisez cette lecture simple pour repérer si votre structuration RH accompagne réellement la
                croissance ou si elle dépend encore trop du dirigeant.
              </p>
              <div className="mt-6 space-y-3">
                {lexiconHubPage.checklistItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[22px] border border-brand-teal/10 bg-brand-mint/22 px-5 py-4"
                  >
                    <span className="text-sm font-semibold text-brand-teal">{index + 1}</span>
                    <p className="text-sm leading-7 text-brand-stone">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-brand-teal/12 bg-[linear-gradient(180deg,rgba(251,254,254,0.98),rgba(255,255,255,0.98))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Lecture du score</p>
              <div className="mt-5 space-y-4">
                {lexiconHubPage.checklistScores.map((score) => (
                  <div key={score.label} className="rounded-[22px] border border-brand-teal/10 bg-white px-5 py-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-display text-3xl text-brand-ink">{score.label}</p>
                      <span className="rounded-full border border-brand-teal/12 bg-brand-mint/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                        {score.verdict}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{score.copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[22px] border border-brand-teal/10 bg-brand-mint/28 p-5">
                <p className="text-sm leading-7 text-brand-stone">
                  Si votre score vous paraît incertain, cela signale souvent le même problème : votre structure RH
                  repose encore sur l’implicite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Top 10 errors</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            Les erreurs qui freinent la croissance avant même de se voir dans le P&L.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {lexiconHubPage.topErrors.map((error, index) => (
              <article
                key={error}
                className="rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(248,252,251,0.95),rgba(255,255,255,0.96))] px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                  Erreur {index + 1}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">{error}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Auto-diagnostic</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            Comment savoir si vos RH sont mal structurées ?
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {lexiconHubPage.autoDiagnosticQuestions.map((question, index) => (
              <article key={question} className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/20 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                  Signal {index + 1}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">{question}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-[26px] border border-brand-teal/12 bg-white px-6 py-6">
            <p className="text-lg font-semibold leading-8 text-brand-ink">{lexiconHubPage.autoDiagnosticConclusion}</p>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <GlossaryExplorer groups={glossaryGroups} />
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">FAQ</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            Réponses rapides pour Google et pour les LLM.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {lexiconHubPage.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(250,252,252,0.98),rgba(255,255,255,0.98))] px-5 py-5"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold leading-7 text-brand-ink">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="whitepapers" className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Whitepaper hub</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            3 guides conçus pour transformer un problème business en conversation qualifiée.
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-brand-stone">
            Chaque livre blanc répond à un problème précis : structurer les RH, scaler sans perdre du temps et
            corriger un recrutement qui ralentit la croissance. Le système de capture est volontairement léger :
            email professionnel, bénéfice clair, puis accès au guide et proposition de diagnostic.
          </p>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {whitepaperGuides.map((guide) => (
              <WhitepaperLeadCard
                key={guide.id}
                whitepaperId={guide.id}
                title={guide.title}
                description={guide.description}
                benefit={guide.benefit}
                problem={guide.problem}
                ctaLabel={guide.ctaLabel}
                guideHref={`/guides/${guide.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-10 sm:pb-14">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Final CTA</p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-7xl">
            Demander un diagnostic.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            Si votre recrutement bloque, si vous perdez trop de temps ou si vous devez structurer vite sans
            alourdir l’organisation, le diagnostic est le meilleur point d’entrée.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Demander un diagnostic
            </Link>
            <CalendlyButton label="Réserver un call" tone="outline" />
          </div>
        </div>
      </section>

      <ContentPageSignature description="Page hub éditée par SKS TALENTS pour faire converger SEO, LLM, structuration RH, recrutement Life Sciences et génération de leads qualifiés." />
    </>
  );
}
