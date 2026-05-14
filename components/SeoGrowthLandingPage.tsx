import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import type { SeoGrowthPage } from "@/data/seoGrowthPages";
import Link from "next/link";

type Props = {
  page: SeoGrowthPage;
};

const proofItems = [
  { value: "10 j", label: "1re shortlist qualifiée" },
  { value: "60 j", label: "De l’intake à la signature" },
  { value: "92%", label: "Missions satisfaites" },
  { value: "100+", label: "Placements / mandats" }
];

export default function SeoGrowthLandingPage({ page }: Props) {
  return (
    <>
      <PageHero
        kicker={page.kicker}
        title={page.heroTitle}
        description={page.heroDescription}
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
          { label: page.title }
        ]}
      />

      <section className="container-shell -mt-8 pb-8 sm:pb-10">
        <div className="card-surface p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-4">
            {proofItems.map((item) => (
              <article
                key={item.label}
                className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/25 px-5 py-5"
              >
                <p className="font-display text-5xl leading-none text-brand-teal">{item.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                  {item.label}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CalendlyButton label="Je réserve un call - 15 min" tone="solid" />
            <CalendlyButton label="Être rappelé" href="/contact#rappel" tone="outline" />
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Réponse directe
            </p>
            <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
              {page.primaryKeyword}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-stone">{page.directAnswer}</p>
            <p className="mt-5 text-base leading-8 text-brand-stone">
              Audience visée : {page.audience}
            </p>
          </article>

          <article className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Ce que cette page doit déclencher
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-brand-stone">
              {page.businessImpact.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            {page.marketContext ? (
              <p className="mt-5 text-sm leading-7 text-brand-stone/90">{page.marketContext}</p>
            ) : null}
          </article>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Ce que SKS active
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {page.sksApproach.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-brand-teal/10 bg-white px-5 py-5 shadow-soft"
                >
                  <p className="text-sm leading-7 text-brand-stone">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {page.clusterLabel}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.clusterItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-teal/15 bg-brand-mint/35 px-4 py-2 text-sm font-medium text-brand-ink"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-brand-stone">
              Variations utiles : {page.secondaryKeywords.join(" · ")}.
            </p>
          </article>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">FAQ</p>
          <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
            {page.faqTitle}
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {page.faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="rounded-[24px] border border-brand-teal/12 bg-white px-5 py-5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none font-display text-2xl leading-tight text-brand-ink">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {page.internalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="card-surface block p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Lien interne clé
              </p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">{link.label}</h2>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{link.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-10">
        <div className="card-surface p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Diagnostic
              </p>
              <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
                Je veux savoir si le vrai frein vient du marché ou de mon système.
              </h2>
              <p className="text-base leading-8 text-brand-stone">
                Avant de réserver un call, vous pouvez faire notre diagnostic rapide : 5 questions
                pour repérer si votre blocage vient surtout du sourcing, de la décision, de la
                structuration RH, de l’onboarding ou des tâches RH répétitives.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[22px] border border-brand-teal/10 bg-brand-mint/25 px-5 py-4">
                <p className="text-sm leading-7 text-brand-stone">
                  Résultat immédiat, sans inscription obligatoire.
                </p>
              </div>
              <div className="rounded-[22px] border border-brand-teal/10 bg-white px-5 py-4">
                <p className="text-sm leading-7 text-brand-stone">
                  3 priorités concrètes pour reprendre le contrôle.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Faire le diagnostic
                </Link>
                <CalendlyButton label="Je réserve un call - 15 min" tone="outline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-12 sm:pb-16">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Conversion
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-6xl">
            Je veux un cadrage <span className="italic text-brand-teal">lisible</span> avant de recruter.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            Si cette page correspond à votre recherche, le plus utile est d’échanger sur le rôle, le
            contexte, la rareté du marché et la meilleure trajectoire : executive search, RPO,
            structuration RH ou automatisation des process.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CalendlyButton label="Je réserve un call - 15 min" tone="solid" />
            <CalendlyButton label="Écrire à SKS" href="/contact#rappel" tone="outline" />
          </div>
        </div>
      </section>

      <ContentPageSignature description="Page éditée par SKS TALENTS pour aider dirigeants et équipes RH à relier signaux marché, structuration RH, automatisation utile et décisions de croissance." />
    </>
  );
}
