import CalendlyButton from "@/components/CalendlyButton";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import HeroVideoCard from "@/components/HeroVideoCard";
import InlineLeadForm from "@/components/InlineLeadForm";

const heroStats = [
  ["100+", "placements"],
  ["10 j", "1re shortlist"],
  ["seed → scale-up", "exec search"]
];

export default function Hero() {
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID ?? process.env.VIMEO_VIDEO_ID ?? "851364422";

  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed Vimeo background — mounted after first paint via HeroBackgroundVideo (LCP-safe) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroBackgroundVideo vimeoId={vimeoId} />
        {/* White → mint gradient for legibility, with subtle teal accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/80 to-brand-mint/70" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-mint/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-100/55 blur-3xl" />
      </div>

      <div className="container-shell relative pb-12 pt-10 sm:pt-14 lg:pb-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          {/* LEFT — copy, CTAs, KPIs */}
          <div className="max-w-2xl space-y-7">
            <p className="eyebrow">Executive search · Life Sciences &amp; Santé animale</p>
            <h1 className="font-display text-4xl leading-[0.98] text-brand-ink sm:text-5xl xl:text-[64px]">
              Recruter les bons talents n’est pas un enjeu RH.{" "}
              <span className="text-brand-teal">C’est une décision stratégique pour votre COMEX.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-brand-stone sm:text-lg">
              Nous aidons les CEO, COO et DRH à recruter en{" "}
              <strong>Life Sciences &amp; Santé animale</strong> — biotech, diagnostic, medtech,
              vétérinaire, petfood — de la <strong>Série A</strong> à la <strong>Série B</strong>{" "}
              et au <strong>scale-up</strong>. Vite, juste, sans dégrader la qualité.
            </p>

            <div className="flex flex-wrap gap-3">
              <CalendlyButton label="Réserver 15 min d’analyse" />
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white/85 px-6 py-4 text-sm font-semibold text-brand-teal backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
              >
                Décrire mon besoin
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[20px] border border-brand-teal/15 bg-white/80 p-4 backdrop-blur"
                >
                  <p className="font-display text-2xl text-brand-ink">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — lead form + click-to-play video card */}
          <div id="lead-form" className="space-y-4">
            <InlineLeadForm
              title="Parlons de votre recrutement critique"
              description="Déposez vos coordonnées. Nous revenons rapidement avec une lecture claire de la meilleure trajectoire : executive search, RPO, structuration RH ou échange de cadrage."
              role="CEO / COO / CPO / DRH"
              sector="Life Sciences & Animal Health"
              compact
            />
            <HeroVideoCard vimeoId={vimeoId} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
