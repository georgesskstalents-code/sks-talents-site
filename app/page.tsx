import type { Metadata } from "next";
import CalendlyButton from "@/components/CalendlyButton";
import EcosystemTrustBar from "@/components/EcosystemTrustBar";
import FounderCard from "@/components/FounderCard";
import Hero from "@/components/Hero";
import MethodNarrative from "@/components/MethodNarrative";
import MobileDiagnosticsSection from "@/components/MobileDiagnosticsSection";
import MobileFichesMetiersSection from "@/components/MobileFichesMetiersSection";
import MobileOrientationSection from "@/components/MobileOrientationSection";
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

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.skstalents.fr"
  }
};

const youAreHerePoints: { title: string; html: string }[] = [
  {
    title: "Constituer un COMEX aligné",
    html: "Vous devez constituer un <strong>COMEX aligné</strong> sur votre <strong>stratégie</strong> et vos <strong>valeurs</strong>, et chaque recrutement <strong>impacte directement votre exécution</strong>."
  },
  {
    title: "Passer en phase scale-up",
    html: "Vous passez en phase <strong>scale-up</strong> (Série A, B ou au-delà) : vos <strong>processus de recrutement</strong> et votre <strong>employer branding</strong> ne tiennent plus la charge."
  },
  {
    title: "Structurer la fonction RH",
    html: "Vous voulez <strong>structurer la fonction RH</strong> et industrialiser le <strong>talent acquisition</strong> pour soutenir la <strong>roadmap business</strong>, sans alourdir l’organisation."
  },
  {
    title: "Automatiser les tâches à faible valeur",
    html: "Vous voulez <strong>automatiser les tâches RH à faible valeur ajoutée</strong> pour libérer la direction sur ce qui compte : <strong>la stratégie, la culture, l’humain</strong>."
  },
  {
    title: "Trouver un partenaire spécialisé",
    html: "Vous cherchez un partenaire qui maîtrise les enjeux <strong>Life Sciences & Animal Health</strong> (biotech, diagnostic, vétérinaire, petfood), pas un cabinet généraliste qui fait « aussi » de la santé."
  }
];

const diagnosticSignals = [
  "Mon recrutement bloque sur des rôles clés (Série A, Série B, scale-up)",
  "Je perds trop de temps côté COMEX et management sur des tâches RH à faible valeur ajoutée",
  "Je dois structurer mes RH par la digitalisation avant de recruter davantage"
];

const insightSignals = [
  {
    title: "Pénurie ciblée",
    description:
      "Le marché Life Sciences & Santé animale ne manque pas de CV. Il manque les profils rares, convaincables et crédibles pour un contexte Série A, Série B ou scale-up précis."
  },
  {
    title: "Pression marché",
    description:
      "En biotech, diagnostic, vétérinaire et petfood, chaque retard de recrutement se répercute sur l’exécution commerciale, technique, médicale ou managériale, et fragilise la roadmap COMEX."
  },
  {
    title: "Structuration RH digitalisée",
    description:
      "Le vrai levier RH aujourd’hui : digitaliser le recrutement, automatiser les tâches à faible valeur ajoutée et libérer la direction RH pour la stratégie et l’humain, là où se joue le succès des projets."
  }
];

export default function HomePage() {
  return (
    <>
      <SmoothScrollProvider />
      <Hero />

      <div className="hidden md:block">
        <RevealOnScroll>
          <EcosystemTrustBar />
        </RevealOnScroll>
      </div>

      <RevealOnScroll delayMs={50}>
        <FounderCard />
      </RevealOnScroll>

      <RevealOnScroll delayMs={90}>
        <SectionShell
          eyebrow="5 signaux qu’il est temps d’agir"
          title="Vous vous reconnaissez si :"
        >
          <div className="mx-auto max-w-4xl space-y-4">
            {youAreHerePoints.map((point, index) => (
              <article
                key={index}
                className="card-luxe panel-lift flex gap-5 p-6 sm:p-8"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white shadow-[0_8px_24px_rgba(20,82,84,0.25)]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                    Signal {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-lg leading-[1.2] text-brand-ink sm:text-[28px] sm:leading-[1.15]">
                    {point.title}
                  </h3>
                  <p
                    className="text-sm leading-7 text-brand-stone sm:text-[15px] sm:leading-8"
                    dangerouslySetInnerHTML={{ __html: point.html }}
                  />
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </RevealOnScroll>

      <div className="hidden md:block">
        <RevealOnScroll delayMs={100}>
          <RibbonCTA
            eyebrow="Prochaine étape"
            title="Si l’un de ces blocages résonne, ou si vous en vivez d’autres, donnons-nous 15 minutes."
            primaryLabel="Réserver 15 min d’analyse"
            secondaryHref="/diagnostic"
            secondaryLabel="Faire le diagnostic"
          />
        </RevealOnScroll>
      </div>

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
                  <CalendlyButton label="Je réserve un call · 15 min" tone="outline" />
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

      {/* Mobile-only: 3 sectoral AI diagnostics, right below the recruitment diagnostic */}
      <RevealOnScroll delayMs={115}>
        <MobileDiagnosticsSection />
      </RevealOnScroll>

      <div className="hidden md:block">
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
      </div>

      <div className="hidden md:block">
        <RevealOnScroll delayMs={140}>
          <MethodNarrative />
        </RevealOnScroll>
      </div>

      <div className="hidden md:block">
        <RevealOnScroll delayMs={150}>
          <RibbonCTA
            eyebrow="On en parle ?"
            title="15 minutes pour identifier votre vrai blocage recrutement."
            primaryLabel="Réserver 15 min d’analyse"
            secondaryHref="/services"
            secondaryLabel="Voir nos services"
          />
        </RevealOnScroll>
      </div>

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

      {/* Mobile-only: orientation + tools (Étudiant / Dirigeant / Calcul salaire / Écoles) */}
      <RevealOnScroll delayMs={175}>
        <MobileOrientationSection />
      </RevealOnScroll>

      {/* Mobile-only: fiches métiers (4 rôles + CTA toutes les fiches) */}
      <RevealOnScroll delayMs={180}>
        <MobileFichesMetiersSection />
      </RevealOnScroll>

    </>
  );
}
