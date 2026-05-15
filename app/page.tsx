import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, FlaskConical, PawPrint, Star, Target, TrendingUp } from "lucide-react";
import FAQHomeTabs from "@/components/FAQHomeTabs";
import Hero from "@/components/Hero";
import PersonaPortalsGrid, { type PersonaPortal } from "@/components/PersonaPortalsGrid";
import RevealOnScroll from "@/components/RevealOnScroll";
import ReferenceCardMarquee from "@/components/ReferenceCardMarquee";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { getFaqJsonLd } from "@/data/faqHomeContent";
import { references } from "@/data/references";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function StructurerIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="4" r="2" />
      <circle cx="4" cy="14" r="2" />
      <circle cx="20" cy="14" r="2" />
      <circle cx="12" cy="20" r="2" />
      <path d="M12 6 L5.5 12.5 M12 6 L18.5 12.5 M5.5 15.5 L10.5 19.5 M18.5 15.5 L13.5 19.5" />
    </svg>
  );
}

function QuoteIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M9.17 6C5.78 6 3 8.66 3 12.04v5.96h6V12h-3c0-2.27 1.8-4 4-4V6h-.83zM21 6h-.83C16.78 6 14 8.66 14 12.04v5.96h6V12h-3c0-2.27 1.8-4 4-4V6z" />
    </svg>
  );
}

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
    title: "Éliminez le répétitif.",
    description:
      "Temps perdu, décisions ralenties, manque de visibilité. Nous déployons des agents IA sur mesure, activés selon vos priorités clés, en 4 semaines.",
    primary: { label: "Diagnostic rapide (5 min)", href: "/diagnostic" },
    secondary: [
      { label: "Life Sciences", href: "/life-sciences/structuration-ia" },
      { label: "Animal Health", href: "/animal-health/structuration-ia" }
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
      { label: "Lexique", href: "/lexique-life-sciences-rh" },
      { label: "Fonds d'investissement", href: "/investment-funds" }
    ]
  }
];

export default function HomePage() {
  const faqJsonLd = getFaqJsonLd();

  return (
    <>
      <script
        id="home-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SmoothScrollProvider />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Persona portals */}
      <RevealOnScroll delayMs={50}>
        <PersonaPortalsGrid portals={personaPortals} />
      </RevealOnScroll>

      {/* 3. Notre approche IA - desktop only (cache sur mobile par CEO direction 2026-05-15) */}
      <RevealOnScroll delayMs={100}>
        <section className="hidden bg-brand-mint/50 pt-14 pb-6 md:block sm:pt-20 sm:pb-8">
          <div className="container-shell">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <div>
                <span className="inline-flex items-center rounded-full border border-brand-teal/15 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                  Notre approche
                </span>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl lg:text-[56px]">
                  L&apos;IA appliquée à vos RH, selon{" "}
                  <span className="italic text-brand-teal">vos enjeux.</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-brand-stone">
                  Des agents IA conçus pour anticiper, structurer et piloter vos recrutements
                  clés. Adaptés à vos enjeux Life Sciences &amp; Santé animale.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  {[
                    { Icon: Target, title: "Anticiper", subtitle: "vos recrutements" },
                    { Icon: StructurerIcon, title: "Structurer", subtitle: "vos processus" },
                    { Icon: TrendingUp, title: "Piloter", subtitle: "vos équipes" }
                  ].map(({ Icon, title, subtitle }) => (
                    <div key={title} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mint text-brand-teal">
                        <Icon size={18} />
                      </span>
                      <div className="leading-tight">
                        <p className="font-display text-sm font-semibold text-brand-ink">{title}</p>
                        <p className="text-xs text-brand-stone">{subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/life-sciences/structuration-ia"
                  className="relative overflow-hidden rounded-2xl border border-brand-teal/15 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-brand-teal"
                  />
                  <span className="inline-flex items-center rounded-full bg-brand-mint px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                    Life Sciences
                  </span>
                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint text-brand-teal">
                    <FlaskConical size={26} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-brand-ink">
                    Agent CEO Copilot stratégique
                  </h3>
                  <div className="mt-3 h-px w-12 bg-brand-teal/30" />
                  <p className="mt-4 text-sm leading-7 text-brand-stone">
                    Anticipez vos recrutements 6 mois à l&apos;avance. Structurez vos décisions et
                    sécurisez vos talents clés.
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
                    Découvrir l&apos;agent
                    <ArrowRight size={14} />
                  </p>
                </Link>
                <Link
                  href="/animal-health/structuration-ia"
                  className="relative overflow-hidden rounded-2xl border border-emerald-600/15 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-emerald-600"
                  />
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    Animal Health
                  </span>
                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <PawPrint size={26} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-brand-ink">
                    Agent Reporting Multi-Sites
                  </h3>
                  <div className="mt-3 h-px w-12 bg-emerald-600/30" />
                  <p className="mt-4 text-sm leading-7 text-brand-stone">
                    De 3 jours à 4 minutes de reporting. Pour groupements vétérinaires et petfood.
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                    Découvrir l&apos;agent
                    <ArrowRight size={14} />
                  </p>
                </Link>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-brand-teal/15 bg-white p-6 shadow-soft sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.3fr_auto_1fr] lg:items-center lg:gap-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <img
                    src="/images/georges-kengue.jpeg"
                    alt="Georges Kengue, fondateur de SKS Talents"
                    className="h-20 w-20 shrink-0 rounded-full object-cover shadow-soft ring-2 ring-brand-mint sm:h-24 sm:w-24"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                      Votre interlocuteur direct
                    </p>
                    <p className="mt-2 font-display text-xl leading-tight text-brand-ink sm:text-2xl">
                      Georges Kengue
                    </p>
                    <p className="mt-1 text-sm leading-6 text-brand-stone">
                      Fondateur SKS TALENTS · Executive Search Life Sciences &amp; Santé animale
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <a
                        href="https://calendly.com/g-kengue/talentconsulting"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                      >
                        <CalendarClock size={14} />
                        Réserver 15 min
                      </a>
                      <a
                        href="https://www.linkedin.com/in/georges-kengue-81988b36/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                      >
                        <LinkedinIcon size={14} />
                        LinkedIn
                      </a>
                      <a
                        href="https://fr.trustpilot.com/review/skstalents.fr"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                      >
                        <Star size={14} />
                        Avis Trustpilot
                      </a>
                    </div>
                  </div>
                </div>

                <div aria-hidden className="hidden h-24 w-px bg-brand-teal/15 lg:block" />

                <div>
                  <QuoteIcon size={28} />
                  <p className="mt-3 font-display text-lg leading-snug text-brand-ink sm:text-xl">
                    L&apos;IA ne remplace pas l&apos;humain. Elle libère du temps là où le talent
                    fait la différence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 6. Proofs (Marquee + 6 references + 1 inline testimonial) */}
      <RevealOnScroll delayMs={165}>
        <section className="pt-6 pb-6 sm:pt-8 sm:pb-8">
          <div className="container-shell space-y-10">
            <div className="space-y-5">
              <p className="eyebrow">Preuves</p>
              <h2 className="section-title max-w-5xl">
                Ils nous ont fait confiance.
              </h2>
              <p className="section-copy">
                Dans des moments où structurer et sécuriser les bons talents devient un enjeu de croissance.
              </p>
            </div>
            <ReferenceCardMarquee items={references.slice(0, 6)} />
            <TestimonialMarquee />
          </div>
        </section>
      </RevealOnScroll>

      {/* 7. FAQ tabs Life Sciences / Animal Health */}
      <RevealOnScroll delayMs={190}>
        <FAQHomeTabs />
      </RevealOnScroll>
    </>
  );
}
