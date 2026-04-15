import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle, Target, TrendingUp, Users, Zap } from "lucide-react";
import type { VerticalLandingConfig } from "@/data/verticalLandings";

const iconMap = [Target, Zap, Users, Briefcase, TrendingUp];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Cadrer le besoin, les enjeux, le contexte équipe et la réalité du marché."
  },
  {
    number: "02",
    title: "Profiling",
    description: "Définir le scope réel, le niveau de rôle et les signaux de fit attendus."
  },
  {
    number: "03",
    title: "Sourcing",
    description: "Activer les bons viviers, l’approche directe et le maillage sectoriel."
  },
  {
    number: "04",
    title: "Selection",
    description: "Qualifier les profils avec une lecture métier, humaine et opérationnelle."
  },
  {
    number: "05",
    title: "Offer",
    description: "Sécuriser l’attractivité du package et la cohérence du closing."
  },
  {
    number: "06",
    title: "Onboarding",
    description: "Préparer l’intégration pour réduire le risque de mismatch et de turnover."
  }
];

export default function VerticalLandingPage({ config }: { config: VerticalLandingConfig }) {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 py-20 text-white sm:py-28">
        <div className="animate-blob absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-200">
              {config.kicker}
            </span>
            <h1 className="mt-6 font-display text-6xl leading-none sm:text-7xl">
              {config.title}
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                {config.focus}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {config.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 text-base font-bold text-white transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30"
              >
                Demander un diagnostic
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/references"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold text-white/85 transition hover:bg-white/15"
              >
                Voir les cas clients
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {config.stats.map((item, index) => (
                <div
                  key={item.label}
                  className="animate-fade-in-up rounded-3xl border border-white/10 bg-white/5 p-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="font-display text-5xl text-teal-300">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Nos Services</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {config.services.map((service, index) => {
              const Icon = iconMap[index % iconMap.length];

              return (
                <article
                  key={service.title}
                  className="animate-fade-in-up rounded-[28px] border-2 border-gray-100 bg-white p-10 transition duration-300 hover:scale-105 hover:border-teal-300 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-teal-500/15 to-cyan-500/15 p-4">
                    <Icon className="text-teal-600" size={32} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-gray-900">{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-gray-600">{service.description}</p>
                  <ul className="mt-8 space-y-3">
                    {service.features?.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <CheckCircle className="text-teal-500" size={20} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Packages</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {config.packages.map((pkg) => (
              <article
                key={pkg.title}
                className={`rounded-[28px] border-2 p-10 transition duration-300 hover:scale-105 ${
                  pkg.accent
                    ? "relative border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-2xl"
                    : "border-gray-100 bg-white hover:border-teal-300"
                }`}
              >
                {pkg.accent ? (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500 px-4 py-1 text-sm font-bold text-white">
                    {pkg.accent}
                  </span>
                ) : null}
                <h3 className="text-2xl font-black text-gray-900">{pkg.title}</h3>
                <p className="mt-4 text-base leading-8 text-gray-600">{pkg.description}</p>
                <ul className="mt-8 space-y-3">
                  {pkg.features?.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="text-teal-500" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Réserver un échange
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Notre Process</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-[24px] border-2 border-gray-100 bg-white p-8 transition duration-300 hover:scale-105 hover:border-teal-300 hover:shadow-xl"
              >
                <p className="text-6xl font-black text-teal-500/20">{step.number}</p>
                <h3 className="mt-4 text-2xl font-black text-gray-900">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-gray-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Challenges</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {config.challenges.map((challenge) => (
              <div
                key={challenge}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-teal-300 hover:shadow-lg"
              >
                <CheckCircle className="mt-1 shrink-0 text-teal-500" size={28} />
                <p className="text-lg font-semibold text-gray-700">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Case Studies</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {config.caseStudies.map((study) => (
              <article
                key={study.company}
                className="rounded-[28px] border-2 border-gray-100 bg-white p-8 transition duration-300 hover:scale-105 hover:border-teal-300 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-black text-gray-900">{study.company}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-600">{study.role}</p>
                <div className="mb-6 mt-4 border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Challenge:</span> {study.challenge}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="font-bold">Result:</span> {study.result}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-teal-300/30 bg-teal-500/10 px-3 py-1 text-sm font-bold text-teal-600"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Pages liées</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {config.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="card-surface block p-6 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  Verticale liée
                </p>
                <h3 className="mt-3 font-display text-3xl text-brand-ink">{link.label}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 py-24 sm:py-32">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="container-shell relative z-10 text-center text-white">
          <h2 className="text-5xl font-black sm:text-6xl">{config.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">{config.ctaDescription}</p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 px-10 py-5 text-lg font-bold text-white transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/40"
          >
            Prendre un rendez-vous
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
