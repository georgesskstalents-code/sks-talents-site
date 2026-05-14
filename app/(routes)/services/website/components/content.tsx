"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Strategie Talent",
    description:
      "Diagnostic complet des besoins, priorisation des postes critiques et feuille de route de recrutement.",
    features: ["Diagnostic RH", "Mapping des roles", "Roadmap de recrutement"]
  },
  {
    icon: Briefcase,
    title: "Sourcing Specialise",
    description:
      "Recherche ciblee par verticale sur des profils rares en biotech, diagnostic, veterinary et petfood.",
    features: ["Approche directe", "Screening rigoureux", "Candidats qualifies"]
  },
  {
    icon: Users,
    title: "Integration & Retention",
    description:
      "Onboarding structure, suivi apres embauche et accompagnement manager pour securiser la retention.",
    features: ["Onboarding 360", "Suivi 3-6 mois", "Retention program"]
  }
];

const packages = [
  {
    name: "Recrutement Complet",
    price: "Custom",
    description:
      "Le package le plus complet pour cadrer, sourcer, evaluer et integrer des talents critiques.",
    features: [
      "Sourcing illimite",
      "Prequalification",
      "Onboarding structure",
      "Suivi 6 mois",
      "Garantie de remplacement"
    ],
    highlighted: true
  },
  {
    name: "Recrutement Express",
    price: "Custom",
    description:
      "Pour les besoins urgents sur des profils a forte tension avec un cycle d'execution resserre.",
    features: ["Fast-track search", "Shortlist rapide", "Pilotage resserre", "Suivi 3 mois"],
    highlighted: false
  },
  {
    name: "Consulting RH",
    price: "Custom",
    description:
      "Audit, structuration et mise en place des bases RH pour soutenir la croissance des equipes.",
    features: ["Audit RH", "Documentation", "Outillage", "Formation managers"],
    highlighted: false
  }
];

const processSteps = [
  "Discovery",
  "Profiling",
  "Sourcing",
  "Selection",
  "Onboarding",
  "Retention"
].map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  description: [
    "Comprendre les enjeux business, l'urgence et le contexte de l'equipe.",
    "Definir le bon niveau d'exigence, les soft skills et le scope reel du poste.",
    "Activer le bon mix entre chasse, reseau, inbound et maillage sectoriel.",
    "Evaluer les profils avec une lecture metier, humaine et operationnelle.",
    "Preparer l'arrivee et accelerer la prise de poste sans casser le rythme.",
    "Suivre les premiers mois pour consolider la performance et la retention."
  ][index]
}));

const challenges = [
  "Penurie de talents qualifies sur des niches scientifiques et techniques.",
  "Process de recrutement trop lent face a la vitesse des enjeux business.",
  "Difficulte a evaluer des profils tres experts ou hybrides.",
  "Integration fragile et risque de turnover dans les premiers mois.",
  "Manque de vision RH long terme dans les phases d'acceleration.",
  "Couts de recrutement mal calibres ou mal pilotes."
];

const caseStudies = [
  {
    company: "Faircraft.bio",
    role: "Biotech Startup",
    challenge: "Constituer une equipe de bioinformaticiens et profils deeptech sur une phase d'acceleration.",
    result: "4 recrutements finalises sur des roles critiques et meilleure lisibilite de la proposition employeur.",
    metrics: ["Biotech", "Deeptech", "Hiring critique"]
  },
  {
    company: "Roche Diagnostics",
    role: "Diagnostic Leader",
    challenge: "Renforcer l'equipe autour d'expertises pointues en diagnostic et environnements NGS.",
    result: "Pipeline plus cible et delais de recrutement reduits sur des profils rares.",
    metrics: ["Diagnostic", "NGS", "Time-to-hire"]
  },
  {
    company: "Affinity Petcare",
    role: "Premium Petfood",
    challenge: "Attirer un leadership R&D et innovation dans un marche concurrentiel.",
    result: "Meilleure articulation entre pitch employeur, niveau de role et exigences business.",
    metrics: ["Petfood", "R&D", "Leadership"]
  },
  {
    company: "Saga Nutrition",
    role: "Animal Nutrition",
    challenge: "Structurer les process RH et fiabiliser les recrutements sur une phase de croissance.",
    result: "Cadre RH plus lisible et execution plus robuste sur les recrutements prioritaires.",
    metrics: ["Structuration", "RH", "Croissance"]
  }
];

const estimatorOptions = {
  need: [
    { value: "critical-hire", label: "Recrutement critique" },
    { value: "rapid-scale", label: "Acceleration equipe" },
    { value: "rh-structuring", label: "Structuration RH" }
  ],
  urgency: [
    { value: "urgent", label: "Urgent" },
    { value: "standard", label: "Standard" },
    { value: "strategic", label: "Strategique" }
  ],
  rarity: [
    { value: "rare", label: "Profil rare" },
    { value: "specialized", label: "Profil specialise" },
    { value: "managerial", label: "Leadership / management" }
  ]
};

const faqItems = [
  {
    question: "A qui s'adresse cette offre ?",
    answer:
      "A des dirigeants, DRH, founders et equipes talent qui doivent recruter sur des marches techniques, scientifiques ou regulés."
  },
  {
    question: "Que se passe-t-il pendant le premier diagnostic ?",
    answer:
      "Nous cadrons le besoin, les enjeux de rarete, le niveau de role, la proposition employeur et le bon mode d'intervention."
  },
  {
    question: "Combien de temps faut-il pour voir les premiers profils ?",
    answer:
      "Cela depend du niveau de tension du marche, mais un premier signal utile arrive generalement rapidement apres le cadrage."
  },
  {
    question: "Pouvez-vous intervenir sur la retention et l'onboarding ?",
    answer:
      "Oui, l'accompagnement peut couvrir l'integration, les premiers mois du manager et l'ajustement des process RH."
  }
];

type WebsiteServicesContentProps = {
  vimeoId: string;
};

export default function WebsiteServicesContent({ vimeoId }: WebsiteServicesContentProps) {
  const [need, setNeed] = useState("critical-hire");
  const [urgency, setUrgency] = useState("urgent");
  const [rarity, setRarity] = useState("rare");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const recommendation = useMemo(() => {
    if (need === "rh-structuring") {
      return {
        packageName: "Consulting RH",
        reason:
          "Le besoin semble davantage organisationnel: audit, structuration des rituels et mise a plat des priorites people."
      };
    }

    if (urgency === "urgent" || rarity === "rare") {
      return {
        packageName: "Recrutement Express",
        reason:
          "Le bon angle est un dispositif resserre pour accelerer la mise sur le marche et la qualification des premiers profils."
      };
    }

    return {
      packageName: "Recrutement Complet",
      reason:
        "Le besoin combine probablement cadrage, sourcing, evaluation et integration avec un niveau d'exigence eleve."
    };
  }, [need, rarity, urgency]);

  return (
    <div className="bg-white">
      <section className="border-b border-brand-teal/10 bg-white">
        <div className="container-shell flex flex-wrap items-center gap-2 py-4 text-sm text-brand-stone">
          <Link href="/" className="hover:text-brand-teal">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-brand-teal">
            Services
          </Link>
          <span>/</span>
          <span className="font-semibold text-brand-ink">Website</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 py-20 text-white sm:py-28">
        <div className="animate-blob absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="container-shell relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto max-w-4xl text-center lg:text-left">
              <span className="inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-200">
                Service Website
              </span>
              <h1 className="mt-6 animate-fade-in-up font-display text-6xl leading-none sm:text-7xl">
                Scaling teams
                <br />
                <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  without losing soul
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75 lg:mx-0">
                Une page premium dediee a l'offre website et recrutement, pensee pour convertir sans
                casser l'architecture actuelle du site SKS TALENTS.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href="/references"
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
                >
                  Voir les cas clients
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
                >
                  Explorer le blog
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
                >
                  Parler a Georges
                </Link>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  ["100+", "placements reussis"],
                  ["10 jours", "1re shortlist"],
                  ["2 sem.-3 mois", "mission prioritaire ou direction"]
                ].map(([value, label], index) => (
                  <div
                    key={label}
                    className="animate-fade-in-up rounded-3xl border border-white/10 bg-white/5 p-6"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <p className="font-display text-5xl text-teal-300">{value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-in-up card-surface overflow-hidden p-4">
              <div className="relative overflow-hidden rounded-[24px] bg-[#163334] p-4 text-white">
                <div className="aspect-video rounded-[18px] border border-white/10 bg-black/20">
                  <iframe
                    title="Presentation video SKS TALENTS"
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=0&muted=0&title=0&byline=0&portrait=0`}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Life Sciences", "Animal Health", "Executive Search"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-mint/40 py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">Estimateur rapide</p>
            <h2 className="text-4xl font-black text-gray-900 sm:text-5xl">
              Orientez-vous vers le bon package en moins d'une minute
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-stone">
              Selectionnez votre contexte pour obtenir une premiere recommandation de dispositif
              avant un echange de cadrage.
            </p>
          </div>
          <div className="card-surface p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Besoin</span>
                <select
                  value={need}
                  onChange={(event) => setNeed(event.target.value)}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                >
                  {estimatorOptions.need.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Urgence</span>
                <select
                  value={urgency}
                  onChange={(event) => setUrgency(event.target.value)}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                >
                  {estimatorOptions.urgency.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-semibold text-brand-stone">
                <span>Rareté</span>
                <select
                  value={rarity}
                  onChange={(event) => setRarity(event.target.value)}
                  className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-brand-ink outline-none"
                >
                  {estimatorOptions.rarity.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 rounded-3xl bg-brand-mint/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Recommendation
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">
                {recommendation.packageName}
              </h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{recommendation.reason}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Demander un diagnostic
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal"
                >
                  Comparer avec les autres offres
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell text-center">
          <h2 className="animate-fade-in-up text-5xl font-black text-gray-900 sm:text-6xl">
            Debloquez le potentiel de vos talents
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-600">
            Une approche 360 degres du recrutement, du cadrage du besoin jusqu'a l'integration,
            avec une execution adaptee aux secteurs Life Sciences et Animal Health.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 text-base font-bold text-white transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 active:scale-95"
            >
              Commencer maintenant
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/references"
              className="inline-flex items-center justify-center rounded-xl border-2 border-teal-500 px-8 py-4 text-base font-bold text-teal-600 transition duration-300 hover:bg-teal-50"
            >
              Voir les references
            </Link>
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
            {services.map((service, index) => (
              <article
                key={service.title}
                className="animate-fade-in-up rounded-[28px] border-2 border-gray-100 bg-white p-10 transition duration-300 hover:scale-105 hover:border-teal-300 hover:shadow-2xl"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-teal-500/15 to-cyan-500/15 p-4">
                  <service.icon className="text-teal-600" size={32} />
                </div>
                <h3 className="mt-6 text-2xl font-black text-gray-900">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-gray-600">{service.description}</p>
                <ul className="mt-8 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle className="text-teal-500" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Nos Packages</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`rounded-[28px] border-2 p-10 transition duration-300 hover:scale-105 ${
                  pkg.highlighted
                    ? "relative border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-2xl"
                    : "border-gray-100 bg-white hover:border-teal-300"
                }`}
              >
                {pkg.highlighted ? (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500 px-4 py-1 text-sm font-bold text-white">
                    POPULAIRE
                  </span>
                ) : null}
                <h3 className="text-2xl font-black text-gray-900">{pkg.name}</h3>
                <p className="mt-2 text-3xl font-black text-teal-600">{pkg.price}</p>
                <p className="mt-4 text-base leading-8 text-gray-600">{pkg.description}</p>
                <ul className="mt-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="text-teal-500" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Reserver un appel
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
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">
              Les Defis que nous resolvons
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {challenges.map((challenge) => (
              <div
                key={challenge}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-teal-300 hover:shadow-lg"
              >
                <Shield className="mt-1 flex-shrink-0 text-teal-500" size={26} />
                <p className="text-lg font-semibold text-gray-700">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">Cas Clients</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study.company}
                className="rounded-[28px] border-2 border-gray-100 bg-white p-8 transition duration-300 hover:scale-[1.02] hover:border-teal-300 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-black text-gray-900">{study.company}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
                  {study.role}
                </p>
                <div className="mt-6 border-b border-gray-200 pb-6">
                  <p className="text-sm leading-7 text-gray-600">
                    <span className="font-bold text-gray-900">Defi:</span> {study.challenge}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    <span className="font-bold text-gray-900">Resultat:</span> {study.result}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
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

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 py-24 text-white sm:py-32">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="container-shell relative z-10 text-center">
          <h2 className="mx-auto max-w-4xl text-5xl font-black sm:text-6xl">
            Pret a transformer votre recrutement?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/75">
            Commencez par un appel gratuit de 30 minutes avec un expert SKS TALENTS. Aucun
            engagement, juste un cadrage utile et concret.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 px-10 py-5 text-lg font-bold text-white transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/40 active:scale-95"
            >
              Collaborons maintenant
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-10 py-5 text-lg font-bold text-white/90 transition duration-300 hover:bg-white/10"
            >
              Revenir aux services
              <TrendingUp size={20} />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: CheckCircle, label: "Zero erreur d'hydratation" },
              { icon: Zap, label: "Animations fluides" },
              { icon: Users, label: "Conversion orientee service" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <item.icon className="mx-auto text-teal-300" size={24} />
                <p className="mt-3 text-sm font-semibold text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="text-4xl font-black text-gray-900 sm:text-5xl">
              Les questions qui reviennent avant de lancer un mandat
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-brand-stone">
              Une FAQ pensée pour répondre simplement aux vraies questions qui se posent avant de
              démarrer un mandat.
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question} className="card-surface overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="text-lg font-semibold text-brand-ink">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-brand-teal transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-brand-teal/10 px-6 py-5 text-sm leading-7 text-brand-stone">
                      {item.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div className="container-shell">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-ink px-4 py-3 text-white shadow-2xl">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">Service Website</p>
              <p className="text-sm font-semibold">Diagnostic gratuit en 30 minutes</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white"
            >
              Reserver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
