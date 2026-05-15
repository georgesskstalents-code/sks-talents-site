import type { Metadata } from "next";
import Link from "next/link";
import FounderCard from "@/components/FounderCard";
import Hero from "@/components/Hero";
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
    icons: ["target-arrow"],
    title: "Vous dirigez. Vous recrutez.",
    description:
      "Life Sciences ou Animal Health, de la Series A au scale-up. Première shortlist en 10 jours.",
    primary: {
      label: "Réserver un échange",
      href: "https://calendly.com/g-kengue/talentconsulting"
    },
    secondary: [
      { label: "Notre méthode", href: "/services" },
      { label: "Life Sciences", href: "/life-sciences" },
      { label: "Animal Health", href: "/animal-health" }
    ]
  },
  {
    icons: ["cpu"],
    title: "Votre croissance est freinée par des process non structurés.",
    description:
      "Temps perdu, décisions ralenties, manque de visibilité. Nous déployons des agents IA sur mesure, activés selon vos priorités clés, en 4 semaines.",
    primary: { label: "Life Sciences", href: "/life-sciences/structuration-ia" },
    secondary: [
      { label: "Animal Health", href: "/animal-health/structuration-ia" },
      { label: "Diagnostic rapide (5 min)", href: "/diagnostic" }
    ]
  },
  {
    icons: ["briefcase", "school"],
    title: "Vous, les talents.",
    description:
      "Cadres en mobilité ou étudiants en construction de parcours, en Life Sciences et Animal Health.",
    primary: {
      label: "Mini-formation dirigeant",
      href: "https://www.purplesquirrel.fr/miniformation-dirigeant"
    },
    secondary: [
      { label: "Parcours étudiant", href: "/orientation" },
      { label: "Fiches métiers", href: "/job-roles" },
      { label: "Écoles spécialisées", href: "/schools" },
      { label: "Articles", href: "/blog" },
      { label: "Lexique", href: "/lexique-life-sciences-rh" }
    ]
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
            <FounderCard embedded />
          </div>
        </section>
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
