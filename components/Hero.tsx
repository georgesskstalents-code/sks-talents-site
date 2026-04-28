import CalendlyButton from "@/components/CalendlyButton";
import HeroVideoCard from "@/components/HeroVideoCard";
import InlineLeadForm from "@/components/InlineLeadForm";

export default function Hero() {
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? process.env.VIMEO_VIDEO_ID ?? "851364422";

  return (
    <section className="container-shell pt-8 sm:pt-10">
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="mesh-panel relative overflow-hidden p-7 sm:p-9">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-4rem] top-[-5rem] h-40 w-40 rounded-full bg-brand-mint/45 blur-3xl" />
            <div className="absolute right-[-3rem] top-10 h-28 w-28 rounded-full bg-cyan-100/70 blur-3xl" />
          </div>

          <div className="relative max-w-3xl space-y-6">
            <div className="space-y-4">
              <p className="eyebrow">Cabinet de recrutement Life Sciences & Animal Health</p>
              <h1 className="font-display text-4xl leading-[0.98] text-brand-ink sm:text-5xl xl:text-6xl">
                Recruter les bons talents n’est pas un enjeu RH.{" "}
                <span className="text-brand-teal">C’est une décision stratégique.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-brand-stone sm:text-lg">
                Nous accompagnons CEO, COO, CPO et DRH dans le recrutement de profils clés en Life
                Sciences, biotech, diagnostic, santé animale et petfood, pour sécuriser les talents
                critiques, structurer les fonctions clés et soutenir la croissance.
              </p>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-brand-stone sm:text-[15px]">
              Spécialistes de l’executive search, nous intervenons de la phase seed à la scale-up,
              de la Série A à la Série B, là où chaque recrutement compte pour la trajectoire de
              l’entreprise.
            </p>

            <div className="flex flex-wrap gap-3">
              <CalendlyButton label="Prendre rendez-vous" />
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
              >
                Discuter de vos besoins
              </a>
            </div>

            <div className="card-luxe max-w-2xl p-5 sm:p-6">
              <p className="eyebrow">Pourquoi ça bloque</p>
              <p className="mt-3 text-sm leading-7 text-brand-stone sm:text-[15px]">
                Entre seed, série A, série B et scale-up, un recrutement mal cadré ralentit le
                go-to-market, fragilise l’exécution et use les managers. Notre rôle est de rendre
                le recrutement plus lisible, plus crédible et plus décidable pour les CEO, COO,
                CPO et DRH qui doivent construire vite sans dégrader la qualité.
              </p>
            </div>
          </div>
        </div>

        <div
          id="lead-form"
          className="space-y-4"
        >
          <InlineLeadForm
            title="Parlons de votre recrutement critique"
            description="Déposez vos coordonnées. Nous revenons rapidement avec une lecture claire de la meilleure trajectoire pour une phase de seed, série A, série B ou scale-up : executive search, RPO, structuration RH ou échange de cadrage."
            role="CEO / COO / CPO / DRH"
            sector="Life Sciences & Animal Health"
            compact
          />
          <HeroVideoCard vimeoId={vimeoId} compact />
        </div>
      </div>
    </section>
  );
}
