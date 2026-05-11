import type { Metadata } from "next";
import Link from "next/link";
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
    title: "Vous structurez votre équipe",
    description: "Series A à scale-up. Première shortlist en 10 jours.",
    cta1: { label: "Réserver un échange", href: "https://calendly.com/g-kengue/talentconsulting" },
    cta2: { label: "Notre méthode", href: "/services" },
    cta3: { label: "Références", href: "/references" },
    highlighted: true
  },
  {
    icon: "cpu",
    title: "Vos enjeux de croissance évoluent plus vite que vos capacités internes.",
    description: "Nous concevons et déployons des agents IA sur mesure, alignés avec vos priorités business, pour automatiser vos process clés et recentrer vos équipes dirigeantes sur l'essentiel.",
    cta1: { label: "Programme Life Sciences", href: "/life-sciences/structuration-ia" },
    cta2: { label: "Programme Animal Health", href: "/animal-health/structuration-ia" },
    cta3: { label: "Diagnostic agents", href: "/diagnostic" },
    cta2Primary: true
  },
  {
    icon: "briefcase",
    title: "Je cherche un poste",
    description: "Cadres, experts, dirigeants en mobilité.",
    cta1: { label: "Missions ouvertes", href: "/rejoignez-nous" },
    cta2: { label: "Fiches métiers", href: "/job-roles" },
    cta3: { label: "Mini-formation dirigeant", href: "https://www.purplesquirrel.fr/miniformation-dirigeant" }
  },
  {
    icon: "school",
    title: "Je m'oriente",
    description: "Étudiants, jeunes diplômés.",
    cta1: { label: "Parcours étudiant", href: "/orientation" },
    cta2: { label: "Écoles spécialisées", href: "/schools" },
    cta3: { label: "Mini-formation dirigeant", href: "https://www.purplesquirrel.fr/miniformation-dirigeant" }
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

      {/* 7. Founder card - interlocuteur direct, position finale */}
      <RevealOnScroll delayMs={195}>
        <FounderCard />
      </RevealOnScroll>
    </>
  );
}
