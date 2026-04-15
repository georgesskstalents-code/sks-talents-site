import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { schools } from "@/data/resources";

export const metadata: Metadata = {
  title: "Orientation biotechnologies | BTS, BUT, licence, master et écoles | SKS TALENTS",
  description:
    "Guide d’orientation biotechnologies SKS TALENTS: parcours post-bac, débouchés, écoles, universités et premiers métiers à explorer en France et pour les lycéens français en Afrique.",
  keywords: [
    "orientation biotechnologies",
    "écoles biotechnologies",
    "BTS biotechnologies",
    "master biotechnologies",
    "débouchés biotechnologies",
    "orientation biotechnologies sénégal",
    "orientation biotech maroc",
    "lycée français afrique biotechnologies"
  ]
};

const faqItems = [
  {
    question: "Quelles études mènent vers les biotechnologies ?",
    answer:
      "Selon votre niveau et votre projet, les portes d’entrée peuvent être un BTS, un BUT, une licence, un master, une école d’ingénieurs spécialisée ou un parcours plus orienté recherche."
  },
  {
    question: "Les débouchés biotech sont-ils uniquement en laboratoire ?",
    answer:
      "Non. Les biotechnologies mènent aussi vers la qualité, la production, la bioinformatique, le réglementaire, la gestion de projet et certains rôles business spécialisés."
  },
  {
    question: "Comment affiner mon orientation après ce guide ?",
    answer:
      "Le guide donne les grandes passerelles. L’agent d’orientation SKS TALENTS permet ensuite de cibler 2 à 3 pistes plus réalistes selon votre profil."
  }
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function OrientationBiotechnologiesPage() {
  const biotechSchools = schools
    .filter((school) => ["Biotech", "Life Sciences", "MedTech"].includes(school.sector))
    .slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker="Guide orientation biotechnologies"
        title="Biotechnologies: comprendre les parcours, les écoles et les débouchés avant de choisir."
        description="Un point d’entrée éditorial pensé pour les étudiants, jeunes diplômés et lycéens français en Afrique qui veulent clarifier les passerelles entre BTS, BUT, licence, master, écoles spécialisées et métiers biotech."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Orientation", href: "/orientation" },
          { label: "Biotechnologies" }
        ]}
      />
      <SectionShell
        eyebrow="Étudiants France & Afrique"
        title="Un guide pensé pour les recherches post-bac francophones."
        description="La page vise aussi les lycéens et familles qui cherchent depuis les écoles françaises du Sénégal, de Côte d’Ivoire, du Congo, du Bénin ou du Maroc un premier repère crédible sur les biotechnologies."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {["Sénégal", "Côte d’Ivoire", "Congo", "Bénin", "Maroc"].map((country) => (
            <div key={country} className="card-surface p-5 text-center text-sm font-semibold text-brand-stone">
              {country}
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Lecture rapide"
        title="Trois questions à se poser avant d’avancer."
        description="Le bon parcours dépend moins d’un intitulé de formation que du type de science, d’environnement et de métier que vous voulez réellement rejoindre."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Quel niveau viser ?",
              copy: "Post-bac, bac+3, bac+5 ou doctorat: les portes d’entrée ne mènent pas aux mêmes rôles, ni au même rythme d’évolution."
            },
            {
              title: "Quel terrain de jeu ?",
              copy: "R&D, bioinformatique, qualité, production, réglementaire ou business: chaque voie appelle des formations et expériences différentes."
            },
            {
              title: "Quel secteur final ?",
              copy: "Biotech thérapeutique, diagnostic, medtech, cosmétique scientifique ou agro-industrie ne recrutent pas exactement les mêmes profils."
            }
          ].map((item) => (
            <div key={item.title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Débouchés"
        title="Des métiers concrets derrière le mot biotechnologies."
        description="Les biotechnologies ouvrent sur des métiers scientifiques, industriels et data plus variés qu’on ne l’imagine souvent au départ."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Technicien supérieur en laboratoire ou bioproduction",
            "Ingénieur biotechnologies ou bioprocédés",
            "Bioinformaticien orienté génomique ou NGS",
            "Chef de projet qualité, réglementaire ou industrialisation"
          ].map((item) => (
            <div key={item} className="card-surface p-6 text-sm leading-7 text-brand-stone">
              {item}
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Écoles à explorer"
        title="Une première sélection d’établissements à comparer."
        description="Ces pages écoles servent à comparer les viviers, les spécialisations et les passerelles possibles avant même d’entrer dans un bilan plus approfondi."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {biotechSchools.map((school) => (
            <Link
              key={school.slug}
              href={`/schools/${school.slug}`}
              className="card-surface block p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                {school.sector} · {school.location}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{school.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{school.summary}</p>
            </Link>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="FAQ"
        title="Questions fréquentes sur l’orientation biotech."
        description="Une couche éditoriale utile pour répondre aux recherches récurrentes et mieux structurer la page pour Google."
      >
        <div className="grid gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <h2 className="font-display text-3xl text-brand-ink">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.answer}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Suite logique"
        title="Passez ensuite par l’agent d’orientation."
        description="Le guide vous donne le cadre. L’agent affine ensuite selon votre niveau, vos préférences et le secteur qui vous attire réellement."
      >
        <div className="card-surface p-8">
          <p className="text-sm leading-7 text-brand-stone">
            Pour un étudiant ou un jeune diplômé, l’objectif n’est pas de recevoir un conseil trop large,
            mais d’obtenir 2 à 3 pistes plausibles, des débouchés lisibles et une liste d’écoles ou
            d’environnements à regarder ensuite.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/orientation"
              className="inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Lancer l’agent d’orientation
            </Link>
            <Link
              href="/schools"
              className="inline-flex rounded-full border border-brand-teal/25 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
            >
              Explorer toutes les écoles
            </Link>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
