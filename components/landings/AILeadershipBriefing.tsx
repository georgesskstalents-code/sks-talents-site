import { GraduationCap, CheckCircle } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";

const BENEFS = [
  "Panorama des usages IA concrets dans votre secteur",
  "Vos 3 signaux prioritaires (audit express live)",
  "Cadre AI Literacy + IA Act pour votre organisation",
  "Roadmap 90 jours priorisée ROI rapide / faible effort"
];

export default function AILeadershipBriefing() {
  return (
    <section className="bg-gradient-to-b from-white to-brand-mint/15 py-10 sm:py-14">
      <div className="container-shell">
        <p className="eyebrow">Point d&apos;entrée léger</p>
        <h2 className="t-h1 max-w-3xl font-display">
          Pas encore prêt à investir ?{" "}
          <span className="italic text-brand-teal">Testez d&apos;abord.</span>
        </h2>

        <article className="mt-8 grid gap-6 rounded-3xl border border-brand-teal/15 bg-white p-6 shadow-[0_22px_56px_rgba(15,58,60,0.08)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/60 to-brand-mint/30 text-brand-teal">
              <GraduationCap size={22} />
            </span>
            <p className="mt-4 t-h2 font-display font-semibold text-brand-ink">
              AI Leadership Briefing
            </p>
            <p className="mt-2 text-caption font-semibold uppercase tracking-[0.18em] text-brand-teal">
              1 heure en visio · avec Georges Kengue
            </p>

            <p className="mt-5 t-body">
              <span className="font-semibold text-brand-ink">Pour qui.</span> CEO, COO, DRH, VP RH
              curieux de l&apos;IA mais pas encore prêts à lancer un projet complet.
            </p>

            <p className="mt-4 t-body">
              <span className="font-semibold text-brand-ink">Format.</span> 1h visio · session
              personnalisée · pas de pitch commercial.
            </p>
          </div>

          <div className="rounded-2xl bg-[#faf7f1] p-5 sm:p-6">
            <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Ce que vous obtenez
            </p>
            <ul className="mt-4 space-y-3">
              {BENEFS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 t-body">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-brand-teal/15 bg-white p-4">
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand-stone">
                Investissement
              </p>
              <ul className="mt-2 space-y-2 t-body">
                <li>
                  <span className="text-brand-teal">→</span> <span className="font-semibold text-brand-ink">Gratuit</span>{" "}
                  si vous êtes adhérent France Biotech
                </li>
                <li>
                  <span className="text-brand-teal">→</span>{" "}
                  <span className="font-semibold text-brand-ink">300 € HT</span> sinon (déductible
                  d&apos;un accompagnement futur)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <CalendlyButton label="Réserver mon AI Leadership Briefing →" tone="solid" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
