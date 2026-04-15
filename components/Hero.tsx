import CalendlyButton from "@/components/CalendlyButton";
import LeadCapturePanel from "@/components/LeadCapturePanel";

export default function Hero() {
  const vimeoId = process.env.VIMEO_VIDEO_ID ?? "000000000";

  return (
    <section className="relative isolate overflow-hidden pb-10">
      <div className="absolute inset-0 bg-grain" />
      <div className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full bg-brand-mint/70 blur-3xl" />
      <div className="absolute right-0 top-24 h-[22rem] w-[22rem] rounded-full bg-cyan-100 blur-3xl" />
      <div className="container-shell relative grid gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:py-24">
        <div className="space-y-8">
          <div className="eyebrow">Cabinet de recrutement spécialisé Life Sciences & Animal Health</div>
          <div className="space-y-5">
            <h1 className="font-display text-5xl leading-none text-brand-ink sm:text-7xl">
              Des talents qui accélèrent vos décisions.
              <span className="mt-3 block text-brand-teal">
                Des recrutements qui sécurisent votre croissance.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-brand-stone">
              Un poste stratégique vacant ne ralentit pas seulement votre équipe. Il met en
              tension toute votre roadmap.
            </p>
          </div>
          <ul className="grid gap-3 text-lg leading-8 text-brand-ink">
            {[
              "Vous ne cherchez pas un CV. Vous cherchez un profil capable de comprendre vos enjeux et de s’aligner à votre culture.",
              "Biotech, deeptech, animal health, petfood: les talents réellement impactants sont rares, sollicités et difficiles à capter.",
              "Executive search ciblé, cadrage stratégique, sourcing spécialisé, onboarding et digitalisation RH.",
              "Première shortlist qualifiée sous 10 jours sur les missions bien cadrées."
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-3 h-2.5 w-2.5 rounded-full bg-brand-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CalendlyButton label="Prendre rendez-vous" tone="solid" />
            <CalendlyButton label="Nous contacter" href="/contact#rappel" tone="outline" />
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex -space-x-2">
              {["GK", "LS", "AH", "NGS", "RH"].map((avatar) => (
                <div
                  key={avatar}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-brand-mint text-sm font-bold text-brand-teal shadow-soft"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4">
              <p className="text-2xl font-semibold text-brand-ink">4.5/5</p>
              <p className="text-base text-brand-stone">
                13 avis publics sur Trustpilot, 100+ placements réalisés et des missions prioritaires
                couvertes entre 2 semaines et 3 mois selon le niveau du poste.
              </p>
            </div>
          </div>
        </div>
        <LeadCapturePanel variant="hero" />
      </div>
      <div className="container-shell relative">
        <div className="card-surface overflow-hidden p-4 sm:p-5">
          <div className="grid gap-6 rounded-[28px] bg-[#163334] p-5 text-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-200">
                Présentation
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">
                Vos marchés sont exigeants. Votre recrutement devrait l&apos;être aussi.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/75">
                Cadrage rapide, brief challengé, sourcing ciblé — pour les contextes où l&apos;erreur
                ne pardonne pas.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["100+", "placements"],
                  ["10 jours", "1re shortlist"],
                  ["2 sem.-3 mois", "mission prioritaire ou de direction"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/5 px-4 py-4">
                    <p className="font-display text-4xl text-teal-200">{value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
              <iframe
                title="Présentation SKS TALENTS"
                src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
