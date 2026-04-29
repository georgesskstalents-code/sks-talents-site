import CalendlyButton from "@/components/CalendlyButton";
import CountUpStat from "@/components/CountUpStat";
import EcosystemTrustBar from "@/components/EcosystemTrustBar";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import Hero from "@/components/Hero";
import HomeSearchSection from "@/components/HomeSearchSection";
import LatestInsights from "@/components/LatestInsights";
import MethodNarrative from "@/components/MethodNarrative";
import ParallaxLayer from "@/components/ParallaxLayer";
import RibbonCTA from "@/components/RibbonCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import SectionShell from "@/components/SectionShell";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { references } from "@/data/references";
import Link from "next/link";

const painPoints = [
  {
    title: "Le recrutement prend trop de temps",
    description:
      "Un poste prioritaire reste vacant, la roadmap glisse et la pression remonte sur les équipes déjà en place."
  },
  {
    title: "Les bons profils sont difficiles à trouver",
    description:
      "Les bons profils existent, mais ils sont rares, sollicités et difficiles à convaincre si le besoin est mal cadré."
  },
  {
    title: "Les équipes ne passent pas correctement à l’échelle",
    description:
      "Quand le recrutement, l’onboarding et la structuration RH ne sont pas alignés, la croissance devient plus fragile."
  },
  {
    title: "La structure RH n’est pas prête pour la suite",
    description:
      "Dans les secteurs scientifiques, techniques et régulés, une mauvaise embauche coûte du temps, de la crédibilité et de l’énergie managériale."
  }
];

const diagnosticSignals = [
  "Mon recrutement bloque sur des rôles clés",
  "Je perds trop de temps côté direction ou management",
  "Je dois structurer mes RH avant de recruter davantage"
];

const insightSignals = [
  {
    title: "Pénurie ciblée",
    description:
      "Le marché ne manque pas de profils au sens large. Il manque surtout des profils rares, convaincables et crédibles pour votre contexte exact."
  },
  {
    title: "Pression marché",
    description:
      "Dans les environnements biotech, diagnostic, medtech ou santé animale, chaque retard de recrutement se répercute sur l’exécution commerciale, technique ou managériale."
  },
  {
    title: "Mauvais alignement",
    description:
      "Le vrai blocage n’est pas seulement la rareté. C’est l’écart entre le besoin réel, le message marché, la shortlist et la capacité d’intégration."
  }
];

const proofStats = [
  ["100+", "placements"],
  ["10 jours", "1re shortlist"],
  ["4.5/5", "Trustpilot"]
];

export default function HomePage() {
  return (
    <>
      <SmoothScrollProvider />
      <Hero />

      <RevealOnScroll>
        <EcosystemTrustBar />
      </RevealOnScroll>

      <RevealOnScroll delayMs={40}>
        <GuaranteeBadge />
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="container-shell -mt-2 pb-8">
          <div className="mesh-panel relative overflow-hidden p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0">
              <ParallaxLayer
                offset={5}
                className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-brand-mint/45 blur-3xl"
              />
              <ParallaxLayer
                offset={4}
                className="absolute right-0 bottom-[-2rem] h-28 w-28 rounded-full bg-cyan-100/70 blur-3xl"
              />
            </div>
            <div className="relative grid gap-4 md:grid-cols-3">
              {proofStats.map(([value, label]) => (
                <CountUpStat key={label} value={value} label={label} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delayMs={90}>
        <SectionShell
          eyebrow="Si vous êtes ici"
          title="Vous avez un poste critique qui traîne. C’est ce qu’on règle."
          description="Roadmap qui glisse, équipes sous tension, profils rares à convaincre. Avant la solution, il faut nommer le vrai problème."
        >
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="card-luxe panel-lift flex h-full flex-col justify-between p-8"
              >
                <span className="mb-6 inline-flex w-fit rounded-full border border-brand-teal/12 bg-brand-mint px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  Point de friction
                </span>
                <h2 className="font-display text-3xl text-brand-ink">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={100}>
        <RibbonCTA
          eyebrow="Prochaine étape"
          title="Vous reconnaissez l'un de ces blocages ? Parlons-en 15 minutes."
          primaryLabel="Réserver 15 min d’analyse"
          secondaryHref="/diagnostic"
          secondaryLabel="Faire le diagnostic"
        />
      </RevealOnScroll>

      <RevealOnScroll delayMs={110}>
        <section className="container-shell pb-4">
          <div className="card-surface bg-grain p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="space-y-5">
                <p className="eyebrow">Diagnostic</p>
                <h2 className="section-title max-w-[18ch]">
                  Votre recrutement est-il devenu un frein à votre croissance ?
                </h2>
                <p className="section-copy max-w-3xl">
                  5 questions simples pour identifier si le vrai sujet vient du sourcing, de la
                  décision, de la structuration RH, de l’onboarding ou des tâches RH qui absorbent
                  trop de temps côté direction.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Faire le diagnostic
                  </Link>
                  <CalendlyButton label="Je réserve un call — 15 min" tone="outline" />
                </div>
              </div>

              <div className="grid gap-3">
                {diagnosticSignals.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[26px] border border-brand-teal/10 bg-white px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Signal 0{index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delayMs={120}>
        <SectionShell
          eyebrow="Insight"
          title="Ce n’est pas la pénurie. C’est l’alignement."
          description="Brief flou, message marché bancal ou onboarding mal préparé : trois angles morts qui bloquent même avec de bons candidats."
        >
          <div className="relative overflow-hidden rounded-[34px]">
            <div className="pointer-events-none absolute inset-0">
              <ParallaxLayer
                offset={4}
                className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-mint/35 blur-3xl"
              />
            </div>
            <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {insightSignals.map((item) => (
                <div key={item.title} className="card-luxe panel-lift p-8">
                  <p className="eyebrow">Insight</p>
                  <h3 className="font-display text-3xl text-brand-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={140}>
        <MethodNarrative />
      </RevealOnScroll>

      <RevealOnScroll delayMs={150}>
        <RibbonCTA
          eyebrow="On en parle ?"
          title="15 minutes pour identifier votre vrai blocage recrutement."
          primaryLabel="Réserver 15 min d’analyse"
          secondaryHref="/services"
          secondaryLabel="Voir nos services"
        />
      </RevealOnScroll>

      <RevealOnScroll delayMs={165}>
        <SectionShell
          eyebrow="Preuves"
          title="Des marques reconnues. Des scale-ups ambitieuses."
          description="Ce que nous avons recruté, dans quel contexte, avec quel niveau d’exigence."
        >
          <div className="space-y-8">
            <div className="card-luxe p-8 sm:p-10">
              <p className="eyebrow">Références &amp; exécution</p>
              <h3 className="font-display text-4xl text-brand-ink">
                Des marques reconnues et des scale-ups ambitieuses.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-stone">
                Nous mettons en avant des cas lisibles pour montrer ce qui a été recruté, dans quel
                contexte et avec quel niveau d’exigence.
              </p>
              <div className="mt-6">
                <ReferenceMarquee items={references} />
              </div>
            </div>
            <ReferenceGrid items={references.slice(0, 6)} />
          </div>
          <div className="mt-6">
            <TestimonialMarquee />
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={185}>
        <LatestInsights />
      </RevealOnScroll>

      <RevealOnScroll delayMs={195}>
        <HomeSearchSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={210}>
        <RibbonCTA
          variant="final"
          eyebrow="Dernière étape"
          title="Recrutez le bon dirigeant Life Sciences. Sans perdre 6 mois."
          description="100+ profils placés. 10 jours en moyenne pour la première shortlist. Une méthode qui transforme un recrutement sensible en mission lisible — et défendable au COMEX."
          primaryLabel="Réserver 15 min d’analyse"
          secondaryHref="/references"
          secondaryLabel="Voir nos références"
        />
      </RevealOnScroll>
    </>
  );
}
