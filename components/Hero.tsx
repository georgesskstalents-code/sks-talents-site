import CalendlyButton from "@/components/CalendlyButton";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

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
        {/* Strong white overlay to mask the video's embedded text/branding — keeps motion subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/96 via-white/92 to-brand-mint/80" />
        <div className="absolute inset-0 bg-white/30" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-mint/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-100/55 blur-3xl" />
      </div>

      <div className="container-shell relative pb-6 pt-6 sm:pt-8 lg:pb-10 lg:pt-10">
        <div className="mx-auto max-w-4xl space-y-4 text-left">
          <p className="eyebrow">Executive search · Life Sciences &amp; Santé animale</p>
          <h1 className="font-display text-3xl leading-[1] text-brand-ink sm:text-4xl lg:text-[44px]">
            Recruter les bons talents n’est pas un enjeu RH.{" "}
            <span className="text-brand-teal">C’est une décision stratégique pour votre COMEX.</span>
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-brand-stone sm:text-base">
            Nous aidons les CEO, COO et DRH à recruter en{" "}
            <strong>Life Sciences &amp; Santé animale</strong> — biotech, diagnostic, medtech,
            vétérinaire, petfood — de la <strong>Série A</strong> à la <strong>Série B</strong>{" "}
            et au <strong>scale-up</strong>. Vite, juste, sans dégrader la qualité.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <CalendlyButton label="Réserver 15 min d’analyse" />
            <CalendlyButton label="Décrire mon besoin" href="/contact" tone="outline" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[16px] border border-brand-teal/15 bg-white/85 p-3 backdrop-blur"
              >
                <p className="font-display text-xl text-brand-ink">{value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-stone/80">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
