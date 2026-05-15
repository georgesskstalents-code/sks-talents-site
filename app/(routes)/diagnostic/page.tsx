import ContentPageSignature from "@/components/ContentPageSignature";
import RecruitmentGrowthDiagnostic from "@/components/RecruitmentGrowthDiagnostic";

export const metadata = {
  title: "Diagnostic recrutement & croissance | SKS TALENTS",
  description:
    "En 2 minutes, identifiez si votre blocage vient du sourcing, de la décision ou de vos process. 5 questions, résultat immédiat.",
  alternates: {
    canonical: "https://www.skstalents.fr/diagnostic"
  }
};

export default function DiagnosticPage() {
  return (
    <>
      {/* HERO compact, focalise sur la promesse */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-mint/50 via-white to-brand-mint/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl"
        />

        <div className="container-shell relative py-16 sm:py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Diagnostic · 2 min · gratuit
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl lg:text-6xl">
            Le problème n&apos;est pas toujours{" "}
            <span className="italic text-brand-teal">le recrutement.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-stone sm:text-xl">
            En 2 minutes, identifiez si le blocage vient :
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/70 px-4 py-2 text-sm font-semibold text-amber-800">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              du sourcing
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/60 px-4 py-2 text-sm font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              de la décision
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/70 px-4 py-2 text-sm font-semibold text-sky-800">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              ou de vos process
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#form"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-7 py-4 text-base font-semibold text-white shadow-[0_18px_36px_rgba(15,58,60,0.18)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Lancer le diagnostic (5 questions)
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="text-sm font-medium text-brand-stone">
              <span className="text-brand-ink">Résultat immédiat.</span> Sans inscription
              obligatoire.
            </p>
          </div>
        </div>
      </section>

      <section id="form" className="container-shell scroll-mt-24 py-10 sm:py-14">
        <RecruitmentGrowthDiagnostic />
      </section>

      <ContentPageSignature description="Diagnostic édité par SKS TALENTS pour aider dirigeants et équipes RH à transformer un problème business flou en lecture actionnable, puis en échange utile." />
    </>
  );
}
