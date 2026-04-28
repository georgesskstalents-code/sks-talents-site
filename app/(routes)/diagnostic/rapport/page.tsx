import type { Metadata } from "next";
import Link from "next/link";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import PrintPageButton from "@/components/PrintPageButton";
import {
  getAnswersFromSearchParams,
  getDiagnosticResult,
  isDiagnosticComplete
} from "@/lib/recruitmentDiagnostic";

export const metadata: Metadata = {
  title: "Rapport diagnostic recrutement & croissance | SKS TALENTS",
  description:
    "Version imprimable du diagnostic SKS TALENTS pour résumer les frictions recrutement, structuration RH et automatisation.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "https://www.skstalents.fr/diagnostic/rapport"
  }
};

export default async function DiagnosticReportPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const answers = getAnswersFromSearchParams(params);
  const isComplete = isDiagnosticComplete(answers);
  const result = isComplete ? getDiagnosticResult(answers) : null;

  return (
    <>
      <PageHero
        kicker="Rapport PDF"
        title="Rapport de diagnostic prêt à partager"
        description="Une version imprimable du diagnostic pour synthétiser vos points de friction, vos priorités et la trajectoire recommandée."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Diagnostic", href: "/diagnostic" },
          { label: "Rapport" }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 sm:p-10">
          {result ? (
            <div className="space-y-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">Verdict</p>
                  <h2 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
                    {result.health.title}
                  </h2>
                </div>
                <PrintPageButton />
              </div>

              <p className="max-w-4xl text-base leading-8 text-brand-stone">{result.health.summary}</p>

              <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                <article className="rounded-[28px] border border-brand-teal/10 bg-brand-mint/30 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Prochaine étape recommandée
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-brand-ink">
                    {result.topRecommendation.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">
                    {result.topRecommendation.reason}
                  </p>
                  <Link
                    href={result.topRecommendation.href}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Ouvrir la page recommandée
                  </Link>
                </article>

                <article className="rounded-[28px] border border-brand-teal/10 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    Score global
                  </p>
                  <p className="mt-3 font-display text-5xl text-brand-ink">{result.totalScore}/16</p>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">
                    Plus le score est élevé, plus la friction actuelle vient de votre système de recrutement, de
                    structuration RH ou de capacité d’exécution.
                  </p>
                </article>
              </div>

              <article className="rounded-[28px] border border-brand-teal/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Vos 3 priorités
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-stone">
                  {result.priorities.map((priority) => (
                    <li key={priority}>• {priority}</li>
                  ))}
                </ul>
              </article>

              <div className="grid gap-4 lg:grid-cols-4">
                {[
                  ["Volume recrutements", answers.hiringVolume || "n/a"],
                  ["Time-to-hire", answers.timeToHire || "n/a"],
                  ["Temps dirigeant", answers.leaderTime || "n/a"],
                  ["Structuration RH", answers.processMaturity || "n/a"]
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(248,252,251,0.95),rgba(255,255,255,0.95))] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{label}</p>
                    <p className="mt-3 font-display text-3xl text-brand-ink">{value}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="eyebrow">Rapport indisponible</p>
              <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
                Commencez par remplir le diagnostic.
              </h2>
              <p className="max-w-3xl text-base leading-8 text-brand-stone">
                Le rapport PDF se construit à partir de vos réponses. Lancez d’abord le diagnostic, puis ouvrez
                la version imprimable une fois le résultat affiché.
              </p>
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Faire le diagnostic
              </Link>
            </div>
          )}
        </div>
      </section>

      <ContentPageSignature description="Rapport diagnostic édité par SKS TALENTS pour transformer un score, des frictions et une recommandation en document partageable." />
    </>
  );
}
