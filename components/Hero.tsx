import CalendlyButton from "@/components/CalendlyButton";
import HeroVideoCard from "@/components/HeroVideoCard";
import InlineLeadForm from "@/components/InlineLeadForm";

export default function Hero() {
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? process.env.VIMEO_VIDEO_ID ?? "851364422";
  const backgroundSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`;

  return (
    <section className="container-shell pt-8 sm:pt-10">
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="mesh-panel relative overflow-hidden p-7 sm:p-9">
          {/* Vimeo background video (muted, looping, autoplay) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <iframe
              src={backgroundSrc}
              title="SKS Talents — vidéo de présentation en arrière-plan"
              aria-hidden="true"
              tabIndex={-1}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
              frameBorder={0}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-white/90" />
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-4rem] top-[-5rem] h-40 w-40 rounded-full bg-brand-mint/45 blur-3xl" />
            <div className="absolute right-[-3rem] top-10 h-28 w-28 rounded-full bg-cyan-100/70 blur-3xl" />
          </div>

          <div className="relative max-w-3xl space-y-6">
            <div className="space-y-4">
              <p className="eyebrow">Executive search · Life Sciences &amp; Animal Health</p>
              <h1 className="font-display text-4xl leading-[0.98] text-brand-ink sm:text-5xl xl:text-6xl">
                Recruter les bons talents n’est pas un enjeu RH.{" "}
                <span className="text-brand-teal">C’est une décision stratégique.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-brand-stone sm:text-lg">
                Nous aidons les CEO, COO et DRH à recruter en biotech, diagnostic, santé animale et
                petfood — vite, juste, et sans dégrader la qualité.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <CalendlyButton label="Réserver 15 min d’analyse" />
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
              >
                Décrire mon besoin
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["100+", "placements"],
                ["10 j", "1re shortlist"],
                ["seed → scale-up", "exec search"]
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="card-luxe flex flex-col items-start gap-1 p-4"
                >
                  <p className="font-display text-2xl text-brand-ink">{value}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
                    {label}
                  </p>
                </div>
              ))}
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
