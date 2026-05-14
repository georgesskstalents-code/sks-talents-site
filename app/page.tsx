import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, GraduationCap } from "lucide-react";
import FounderCard from "@/components/FounderCard";
import Hero from "@/components/Hero";
import MethodNarrative from "@/components/MethodNarrative";
import PersonaPortalsGrid, { type PersonaPortal } from "@/components/PersonaPortalsGrid";
import RevealOnScroll from "@/components/RevealOnScroll";
import ReferenceCardMarquee from "@/components/ReferenceCardMarquee";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { references } from "@/data/references";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.skstalents.fr"
  }
};

const personaPortals: PersonaPortal[] = [
  {
    icon: "target-arrow",
    title: "Vous dirigez. Vous recrutez.",
    description: "Life Sciences ou Animal Health, de la Series A au scale-up. Première shortlist en 10 jours.",
    cta1: { label: "Réserver un échange", href: "https://calendly.com/g-kengue/talentconsulting" },
    cta2: { label: "Notre méthode", href: "/services" },
    cta3: { label: "Références & cas clients", href: "/references" },
    highlighted: true
  },
  {
    icon: "cpu",
    title: "Vos process freinent votre croissance.",
    description: "3 à 4 agents IA validés par verticale, déployés en 4 semaines.",
    cta1: { label: "Programme Life Sciences", href: "/life-sciences/structuration-ia" },
    cta2: { label: "Programme Animal Health", href: "/animal-health/structuration-ia" },
    cta3: { label: "Diagnostic agents (5 min)", href: "/diagnostic" },
    cta2Primary: true,
    cta3Primary: true
  }
];

export default function HomePage() {
  return (
    <>
      <SmoothScrollProvider />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Persona portals */}
      <RevealOnScroll delayMs={50}>
        <PersonaPortalsGrid portals={personaPortals} />
      </RevealOnScroll>

      {/* 2b. Vous, les talents */}
      <RevealOnScroll delayMs={75}>
        <section className="py-10 sm:py-16">
          <div className="container-shell">
            <div className="flex items-center gap-3 text-brand-teal">
              <Briefcase className="h-7 w-7" aria-hidden />
              <GraduationCap className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="t-h1 mt-5 max-w-3xl font-display">Vous, les talents.</h2>
            <p className="t-body-l mt-3 max-w-3xl">
              Que vous soyez en mobilité ou en train de construire votre parcours, SKS Talents vous
              accompagne dans les Life Sciences et l'Animal Health.
            </p>
            <div className="mt-8 grid gap-8 border-t border-brand-teal/15 pt-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="t-h3 font-display text-brand-ink">Je pilote ma prochaine étape</h3>
                <p className="mt-2 text-caption text-brand-stone">
                  Cadres, experts, dirigeants en mobilité.
                </p>
                <a
                  href="https://www.purplesquirrel.fr/miniformation-dirigeant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-5 py-3.5 text-caption font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-6"
                >
                  Mini-formation dirigeant
                </a>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/job-roles"
                    className="text-caption font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Fiches métiers
                  </Link>
                  <Link
                    href="/blog"
                    className="text-caption font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Articles
                  </Link>
                </div>
              </div>

              <div className="sm:border-l sm:border-brand-teal/15 sm:pl-10">
                <h3 className="t-h3 font-display text-brand-ink">Je construis ma trajectoire</h3>
                <p className="mt-2 text-caption text-brand-stone">Étudiants, jeunes diplômés.</p>
                <Link
                  href="/orientation"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-5 py-3.5 text-caption font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-6"
                >
                  Parcours étudiant
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/schools"
                    className="text-caption font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Écoles spécialisées
                  </Link>
                  <Link
                    href="/lexique-life-sciences-rh"
                    className="text-caption font-semibold text-brand-teal underline-offset-4 hover:underline"
                  >
                    Lexique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 3. Notre approche IA */}
      <RevealOnScroll delayMs={100}>
        <section className="bg-brand-mint py-14 sm:py-20">
          <div className="container-shell">
            <p className="eyebrow">Notre approche</p>
            <h2 className="t-h1 mt-2 max-w-3xl font-display">
              L'IA appliquée à vos RH, par verticale.
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Link
                href="/life-sciences/structuration-ia"
                className="rounded-2xl border border-brand-teal/15 bg-white p-6 transition hover:shadow-soft"
              >
                <p className="eyebrow text-brand-teal">Programme Life Sciences</p>
                <h3 className="mt-2 t-h3 font-display text-brand-ink">
                  Agent CEO Copilot stratégique
                </h3>
                <p className="mt-2 text-caption text-brand-stone">
                  Anticipez vos recrutements 6 mois à l'avance. Pour CEO biotech Series A à C.
                </p>
                <span className="mt-4 inline-block text-caption font-semibold text-brand-teal">
                  Découvrir
                </span>
              </Link>
              <Link
                href="/animal-health/structuration-ia"
                className="rounded-2xl border border-brand-teal/15 bg-white p-6 transition hover:shadow-soft"
              >
                <p className="eyebrow text-brand-teal">Programme Animal Health</p>
                <h3 className="mt-2 t-h3 font-display text-brand-ink">
                  Agent Reporting Multi-Sites
                </h3>
                <p className="mt-2 text-caption text-brand-stone">
                  De 3 jours à 4 minutes de reporting. Pour groupements vétérinaires et petfood.
                </p>
                <span className="mt-4 inline-block text-caption font-semibold text-brand-teal">
                  Découvrir
                </span>
              </Link>
            </div>
            <FounderCard embedded />
          </div>
        </section>
      </RevealOnScroll>

      {/* 5. Method narrative - now visible on mobile too (removed hidden md:block wrapper) */}
      <RevealOnScroll delayMs={140}>
        <MethodNarrative />
      </RevealOnScroll>

      {/* 6. Proofs (Marquee + 6 references + 1 inline testimonial) */}
      <RevealOnScroll delayMs={165}>
        <section className="py-14 sm:py-20">
          <div className="container-shell space-y-10">
            <div className="space-y-5">
              <p className="eyebrow">Preuves</p>
              <h2 className="section-title max-w-5xl">
                Des marques reconnues. Des scale-ups ambitieuses.
              </h2>
              <p className="section-copy">
                Ce que nous avons recruté, dans quel contexte, avec quel niveau d'exigence.
              </p>
            </div>
            <ReferenceCardMarquee items={references.slice(0, 6)} />
            <TestimonialMarquee />
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
