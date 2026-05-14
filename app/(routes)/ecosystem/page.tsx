import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadForm from "@/components/InlineLeadForm";
import EcosystemDirectory from "@/components/EcosystemDirectory";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import {
  ecosystemCategories,
  ecosystemDetailedPages,
  ecosystemPriorityTargets,
  ecosystemStudy
} from "@/data/ecosystemTargets";

export const metadata: Metadata = {
  title: "Ecosysteme Life Sciences, Animal Health, MedTech & Cosmetique",
  description:
    "Un panorama SKS TALENTS des écoles, clusters, médias, fonds, événements et partenaires à suivre dans les Life Sciences, la santé animale, la cosmétique, la medtech et l’agro-industrie.",
  keywords: [
    "ecosysteme life sciences",
    "ecosysteme biotech france",
    "medtech france acteurs",
    "sante animale ecosysteme",
    "ecoles cosmetique france",
    "clusters biotech france"
  ]
};

export default function EcosystemPage() {
  const ecosystemPartners = [
    {
      name: "France Biotech",
      href: "https://france-biotech.fr/",
      description:
        "Réseau structurant de la healthtech française, utile pour la visibilité sectorielle, les signaux marché et les connexions écosystème.",
      logoPath: "/images/partners/france-biotech.svg"
    },
    {
      name: "Université Paris-Saclay",
      href: "http://www.universite-paris-saclay.fr",
      description:
        "Viviers scientifiques et académiques de référence pour biotech, santé, data, sciences du vivant et innovation médicale.",
      logoPath: "/images/partners/universite-paris-saclay.svg"
    }
  ];

  return (
    <>
      <PageHero
        kicker="Écosystème"
        title="100 acteurs à suivre pour comprendre les réseaux qui comptent vraiment."
        description="Cette page rassemble les écoles, clusters, fonds, médias, événements, plateformes et partenaires qui structurent les Life Sciences, l’Animal Health, la medtech, la cosmétique et l’agro-industrie. Un repère éditorial et une cartographie sectorielle pour situer rapidement les bons interlocuteurs."
        variant="teal"
      />

      <SectionShell
        eyebrow="Partenaires d’écosystème"
        title="Des acteurs clés au cœur de notre lecture du marché"
        description="SKS TALENTS évolue dans un écosystème spécialisé. Nous mettons ici en avant deux de nos partenaires de référence qui renforcent notre proximité avec les viviers scientifiques et entrepreneuriaux."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {ecosystemPartners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface block p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Partenaire écosystème
              </p>
              <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-[24px] border border-brand-teal/10 bg-white px-6 py-6">
                <img
                  src={partner.logoPath}
                  alt={partner.name}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <h3 className="mt-5 font-display text-3xl text-brand-ink">{partner.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{partner.description}</p>
            </a>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Top cibles"
        title="Les 15 premiers acteurs à regarder de près."
        description="Ce premier cercle concentre les réseaux, écoles et partenaires les plus pertinents pour nourrir votre visibilité, votre compréhension du marché et votre présence dans l’écosystème."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ecosystemPriorityTargets.map((target) => (
            <a
              key={target.name}
              href={target.href}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface block p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Priorité immédiate
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{target.name}</h3>
              <p className="mt-4 text-sm font-semibold text-brand-teal">Visiter le site</p>
            </a>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Focus éditoriaux"
        title="Les pages détaillées à renforcer en priorité."
        description="Ces sous-pages transforment la cartographie en lectures spécialisées par thème, plus rapides à parcourir pour cibler vos sujets prioritaires."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemDetailedPages.map((item) => (
            <Link
              key={item.slug}
              href={`/ecosystem/${item.slug}`}
              className="card-surface block p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="container-shell -mt-2 pb-2">
        <div className="flex flex-wrap gap-3">
          {ecosystemDetailedPages.slice(0, 6).map((item) => (
            <Link
              key={item.slug}
              href={`/ecosystem/${item.slug}`}
              className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <SectionShell
        eyebrow="Etude signature"
        title={ecosystemStudy.title}
        description={ecosystemStudy.summary}
      >
        <div className="card-surface grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="font-display text-4xl text-brand-ink">{ecosystemStudy.subtitle}</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Une synthèse SKS TALENTS pour relier réseaux, funding, écoles, métiers en tension et
              signaux de recrutement observables sur le marché.
            </p>
          </div>
          <div className="flex items-center lg:justify-end">
            <Link
              href={`/studies/${ecosystemStudy.slug}`}
              className="inline-flex rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Lire l’étude
            </Link>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Répertoire"
        title="Filtrer les acteurs par secteur, priorité et nom."
        description="Un répertoire utile vaut mieux qu’une simple liste. Utilisez les filtres pour isoler rapidement les réseaux et institutions les plus pertinents."
      >
        <EcosystemDirectory categories={ecosystemCategories} />
      </SectionShell>

      <SectionShell
        eyebrow="Conversion"
        title="Transformer la cartographie en échange utile."
        description="Si vous cherchez à recruter, à vous rendre visible ou à structurer vos prises de parole, on peut cadrer cela rapidement."
      >
        <InlineLeadForm
          title="Parler de votre visibilité ou de vos recrutements"
          description="Un formulaire court, un email direct, et une alternative Calendly pour les besoins les plus mûrs."
          role="Direction / Talent"
          sector="Life Sciences"
          compact
        />
      </SectionShell>
    </>
  );
}
