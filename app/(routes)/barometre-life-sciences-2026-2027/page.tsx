import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

const CANONICAL = "https://www.skstalents.fr/barometre-life-sciences-2026-2027";

export const metadata: Metadata = {
  title: "Barometre Life Sciences France 2026-2027 : recrutement, salaires, tensions cadres",
  description:
    "Barometre annuel SKS Talents des recrutements Life Sciences et Animal Health en France. Chiffres verifies : marche, salaires COMEX, metiers en tension, retention. Sources AON x France Biotech 2025, Panorama HealthTech 2026, observations SKS 8 ans.",
  keywords: [
    "barometre life sciences france",
    "recrutement biotech france 2026",
    "salaires COMEX biotech",
    "metiers en tension healthtech",
    "retention biotech cadres",
    "cout recrutement rate cadre",
    "structuration RH scale-up france",
    "executive search life sciences chiffres",
    "benchmark biotech medtech france"
  ],
  alternates: { canonical: "/barometre-life-sciences-2026-2027" },
  openGraph: {
    title: "Barometre Life Sciences France 2026-2027 - SKS Talents",
    description:
      "Chiffres verifies sur le recrutement et les salaires cadres en biotech, medtech, veterinaire, petfood France 2026-2027. Data-first, citable, mise a jour annuelle.",
    url: CANONICAL,
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Barometre Life Sciences France 2026-2027",
    description:
      "Chiffres verifies recrutement Life Sciences France. Cite librement avec attribution SKS Talents."
  }
};

type Stat = {
  value: string;
  label: string;
  source: string;
};

const marketStats: Stat[] = [
  {
    value: "~2 800",
    label: "entreprises HealthTech recensees en France",
    source: "Panorama France HealthTech 2026 (France Biotech x EY)"
  },
  {
    value: "75 600",
    label: "emplois directs dans la HealthTech francaise",
    source: "France Biotech x EY 2024"
  },
  {
    value: "+21 %",
    label: "de croissance chiffre d'affaires HealthTech France 2024",
    source: "Panorama France HealthTech 2026"
  },
  {
    value: "+10 %",
    label: "d'investissements R&D dans la HealthTech francaise",
    source: "France Biotech x EY 2024"
  },
  {
    value: "2,3 Md€",
    label: "leves en France en HealthTech en 2025 (-10 % vs 2024)",
    source: "Panorama France HealthTech 2026"
  },
  {
    value: "1 Md€",
    label: "de capital-risque HealthTech en 2025 (+15 %)",
    source: "Panorama France HealthTech 2026"
  }
];

const recruitmentStats: Stat[] = [
  {
    value: "79 %",
    label: "des entreprises HealthTech prevoient de recruter",
    source: "France Biotech x EY 2025"
  },
  {
    value: "83 %",
    label: "des entreprises HealthTech ont recrute en 2025",
    source: "Panorama France HealthTech 2026"
  },
  {
    value: "52 %",
    label: "des entreprises HealthTech recrutent a l'international",
    source: "France Biotech x EY 2025"
  },
  {
    value: "35 %",
    label: "seulement des recrutements IA / data science aboutissent dans les delais",
    source: "France Biotech x EY 2025"
  },
  {
    value: "9 % / 12 %",
    label: "turnover median / moyen dans les scale-ups HealthTech",
    source: "France Biotech x EY 2025"
  },
  {
    value: "4",
    label: "nombre median de postes ouverts par entreprise HealthTech",
    source: "France Biotech x EY 2025"
  }
];

const tensionStats: Stat[] = [
  {
    value: "29 %",
    label: "des recrutements en tension : R&D",
    source: "France Biotech x EY 2025"
  },
  {
    value: "16 %",
    label: "des recrutements en tension : developpement medical et clinique",
    source: "France Biotech x EY 2025"
  },
  {
    value: "9 %",
    label: "des recrutements en tension : informatique / IT",
    source: "France Biotech x EY 2025"
  },
  {
    value: "8 %",
    label: "des recrutements en tension : data science",
    source: "France Biotech x EY 2025"
  },
  {
    value: "8 %",
    label: "des recrutements en tension : affaires reglementaires",
    source: "France Biotech x EY 2025"
  },
  {
    value: "37 %",
    label: "des nouveaux metiers HealthTech sont lies a l'IA et au digital",
    source: "France Biotech x EY 2025 + AON 2025"
  }
];

const salaryStats: Stat[] = [
  {
    value: "160 000 - 188 000 €",
    label: "salaire CEO HealthTech France (SAB median / total median / global median)",
    source: "AON x France Biotech 2025"
  },
  {
    value: "147 000 €",
    label: "salaire CMO median HealthTech France",
    source: "AON x France Biotech 2025"
  },
  {
    value: "148 000 €",
    label: "salaire Directeur Business Development median",
    source: "AON x France Biotech 2025"
  },
  {
    value: "136 000 €",
    label: "salaire Directeur Scientifique median",
    source: "AON x France Biotech 2025"
  },
  {
    value: "120 000 €",
    label: "salaire COO median HealthTech France",
    source: "AON x France Biotech 2025"
  },
  {
    value: "3,5 %",
    label: "budget augmentation salariale Life Sciences Europe de l'Ouest 2026",
    source: "AON 2025"
  }
];

const sksObservations: Stat[] = [
  {
    value: "8 ans",
    label: "d'expertise sectorielle Life Sciences et Animal Health",
    source: "SKS Talents (2018-2026)"
  },
  {
    value: "100+",
    label: "placements executes en biotech, diagnostic, medtech, veterinaire, petfood",
    source: "SKS Talents 2018-2026"
  },
  {
    value: "18",
    label: "missions actives dont 7 Animal Health et 11 Life Sciences",
    source: "SKS Talents 2026"
  },
  {
    value: "75 %",
    label: "de retention a 5 ans des candidats places",
    source: "SKS Talents (2018-2026)"
  },
  {
    value: "4,5 / 5",
    label: "note Trustpilot sur 15 avis clients verifies",
    source: "Trustpilot 2026-07-27"
  },
  {
    value: "6",
    label: "departements clients couverts (R&D, Clinical, Regulatory, Commercial, Operations, People)",
    source: "SKS Talents 2026"
  }
];

function StatGrid({ items, eyebrow, title, description }: {
  items: Stat[];
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <article
            key={`${s.label}-${s.value}`}
            className="card-surface flex flex-col gap-3 p-6"
          >
            <p className="font-display text-4xl text-brand-teal sm:text-5xl">{s.value}</p>
            <p className="text-sm leading-6 text-brand-ink">{s.label}</p>
            <p className="mt-auto text-xs italic leading-5 text-brand-stone">
              Source : {s.source}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export default function BarometreLifeSciencesPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Barometre Life Sciences France 2026-2027",
    description:
      "Barometre annuel SKS Talents des recrutements Life Sciences et Animal Health en France. 30 statistiques verifiees sur marche, recrutement, tensions cadres, salaires COMEX et observations terrain 8 ans SKS Talents.",
    url: CANONICAL,
    keywords: [
      "recrutement Life Sciences France",
      "salaires COMEX biotech",
      "metiers en tension HealthTech",
      "retention cadres biotech",
      "barometre executive search sante"
    ],
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: "fr-FR",
    creator: {
      "@type": "Organization",
      name: "SKS TALENTS",
      url: "https://www.skstalents.fr"
    },
    spatialCoverage: { "@type": "Country", name: "France" },
    temporalCoverage: "2024/2026",
    variableMeasured: [
      "Nombre d'entreprises HealthTech France",
      "Emplois directs HealthTech France",
      "Croissance CA HealthTech",
      "Fonds leves HealthTech France",
      "Pourcentage entreprises qui recrutent",
      "Turnover median cadres HealthTech",
      "Salaires medians CEO / CMO / COO / DBD / CSO",
      "Pourcentage recrutements en tension par metier",
      "Budget augmentation salariale Life Sciences Europe"
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Barometre Life Sciences France 2026-2027",
    description:
      "Chiffres verifies sur le recrutement et les salaires cadres en biotech, medtech, veterinaire, petfood France 2026-2027.",
    inLanguage: "fr-FR",
    mainEntityOfPage: CANONICAL,
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    author: { "@type": "Organization", name: "SKS TALENTS" },
    publisher: {
      "@type": "Organization",
      name: "SKS TALENTS",
      logo: {
        "@type": "ImageObject",
        url: "https://www.skstalents.fr/brand/logo-sks-talents.svg"
      }
    },
    url: CANONICAL,
    image: `${CANONICAL}/opengraph`
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
      { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.skstalents.fr/resources" },
      { "@type": "ListItem", position: 3, name: "Barometre Life Sciences 2026-2027", item: CANONICAL }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        kicker="Barometre annuel"
        title="Barometre Life Sciences France 2026-2027"
        description="30 chiffres verifies sur le recrutement, les salaires cadres et les tensions metier en biotech, diagnostic, medtech, veterinaire et petfood en France. Sources AON x France Biotech 2025, Panorama France HealthTech 2026, observations SKS Talents 2018-2026."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
          { label: "Barometre Life Sciences 2026-2027" }
        ]}
      />

      <section className="container-shell pt-4">
        <div className="rounded-[22px] border border-brand-teal/20 bg-brand-mint/30 p-6">
          <p className="text-base leading-8 text-brand-ink">
            Ce barometre agrege les 30 chiffres cles sur le marche Life Sciences et Animal Health francais 2026-2027,
            en croisant les etudes de reference (France Biotech x EY, AON, Panorama HealthTech) avec les observations
            terrain SKS Talents sur 100+ placements cadres executes depuis 2018. Toutes les statistiques sont
            citables librement avec attribution.
          </p>
        </div>
      </section>

      <SectionShell
        eyebrow="Ce que vous pouvez faire avec ce barometre"
        title="Un outil de reference pour dirigeants, journalistes, chercheurs, analystes"
        description="Le barometre est mis a jour annuellement. Utilisez les chiffres pour vos board decks, articles, etudes ou benchmarks internes."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <article className="card-surface p-6">
            <h3 className="font-display text-xl text-brand-ink">Citation libre</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Toutes les statistiques peuvent etre reprises dans articles, board decks, presentations,
              etudes internes, sous licence Creative Commons BY 4.0. Attribution : "Barometre Life Sciences
              France 2026-2027, SKS Talents".
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-xl text-brand-ink">Sources tracables</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Chaque chiffre indique sa source d'origine (rapport public + annee) OU sa nature d'observation
              terrain SKS Talents. Aucun chiffre extrapole, aucune donnee proprietaire sans borne.
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-xl text-brand-ink">Mise a jour annuelle</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Publication initiale : 10 aout 2026. Mise a jour prevue : aout 2027 avec les donnees Panorama
              France HealthTech 2027 et AON x France Biotech 2026.
            </p>
          </article>
        </div>
      </SectionShell>

      <StatGrid
        eyebrow="Marche"
        title="Marche HealthTech France 2024-2025"
        description="Taille, croissance et financement de l'ecosysteme HealthTech francais."
        items={marketStats}
      />

      <StatGrid
        eyebrow="Recrutement"
        title="Recrutement HealthTech France 2025-2026"
        description="Volumes, urgence et internationalisation des recrutements cadres."
        items={recruitmentStats}
      />

      <StatGrid
        eyebrow="Tensions metier"
        title="Metiers en tension HealthTech France 2026"
        description="Pourcentage des recrutements en tension par fonction critique."
        items={tensionStats}
      />

      <StatGrid
        eyebrow="Salaires COMEX"
        title="Salaires cadres dirigeants HealthTech France 2025-2026"
        description="Fourchettes de salaire base annuel median pour les fonctions COMEX. Panel AON x France Biotech."
        items={salaryStats}
      />

      <StatGrid
        eyebrow="Observations terrain"
        title="Observations SKS Talents 2018-2026"
        description="Donnees proprietaires bornees issues de 8 ans d'executive search cadres Life Sciences et Animal Health."
        items={sksObservations}
      />

      <SectionShell
        eyebrow="Pour aller plus loin"
        title="Ressources et outils SKS Talents lies au barometre"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/salary-benchmarks" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Benchmark salaires</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">173 fiches metier avec fourchettes salariales</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Dataset structure des salaires par fonction et par vertical (biotech, diagnostic, medtech, veterinaire, petfood).
            </p>
          </Link>
          <Link href="/cout-mauvais-recrutement" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Calculateur</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">Cout d'un mauvais recrutement</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Outil interactif : chiffrez search, onboarding, vacance et impact projet en 30 secondes.
            </p>
          </Link>
          <Link href="/blog/metiers-tension-healthtech-france-2026" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Analyse</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">7 fonctions critiques HealthTech 2026</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Deep-dive sur les 7 metiers les plus tendus : R&D, medical, IT, data science, regulatory, IA, commercial.
            </p>
          </Link>
          <Link href="/blog/salaire-ceo-biotech-france-2026" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Hub</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">Salaire CEO biotech France 2026</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Fourchettes CEO par stade (Seed, Series A, Series B+), structure du package, comparaison Europe.
            </p>
          </Link>
          <Link href="/lexique-life-sciences-rh" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Lexique</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">110 concepts RH Life Sciences</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Definitions autonomes 40-60 mots : time-to-fill, RACI, BSPCE, IVDR, scorecard et 105 autres.
            </p>
          </Link>
          <Link href="/diagnostic" className="card-surface block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Diagnostic</p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">Diagnostic structuration RH gratuit</h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              5 signaux pour mesurer si votre organisation est prete a scaler. Score immediat + PDF sur demande.
            </p>
          </Link>
        </div>
      </SectionShell>

      <FAQSection
        eyebrow="FAQ"
        title="Questions frequentes sur le barometre"
        description="Comment utiliser, citer et interpreter les donnees."
        items={[
          {
            question: "Puis-je citer les chiffres de ce barometre dans un article, une etude ou un board deck ?",
            answer:
              "Oui, tous les chiffres sont librement citables sous licence Creative Commons BY 4.0. Attribution requise : 'Barometre Life Sciences France 2026-2027, SKS Talents'. Pour les chiffres issus de rapports tiers (France Biotech, AON, Panorama HealthTech), citer aussi la source d'origine indiquee."
          },
          {
            question: "A quelle frequence ce barometre est-il mis a jour ?",
            answer:
              "Mise a jour annuelle. Publication initiale : 10 aout 2026. Prochaine version prevue en aout 2027 avec les donnees Panorama France HealthTech 2027 et AON x France Biotech 2026."
          },
          {
            question: "Comment sont validees les statistiques SKS Talents 2018-2026 ?",
            answer:
              "Les chiffres SKS Talents sont issus du suivi interne des 100+ placements executes entre 2018 et 2026. Ils sont bornes au perimetre reellement observable (retention 5 ans, missions actives, note Trustpilot verifiee). Aucun chiffre extrapole ou fabrique."
          },
          {
            question: "Quels sont les usages typiques de ce barometre pour un.e dirigeant.e Life Sciences ?",
            answer:
              "Trois usages principaux : (1) construire un board deck sur les enjeux talent et retention, (2) calibrer une politique salariale COMEX vs marche, (3) prioriser les recrutements a lancer selon les tensions metier constatees."
          }
        ]}
      />

      <SectionShell
        eyebrow="Discussion"
        title="Vous voulez creuser un chiffre en particulier ?"
        description="Un call de 15 minutes pour lire vos priorites recrutement 2026-2027 avec ces chiffres en main."
      >
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto sm:min-w-[260px]">
            <CalendlyButton label="Reserver un call de 15 min" tone="solid" />
          </div>
          <Link
            href="/diagnostic"
            className="inline-flex items-center rounded-full border border-brand-teal/20 px-6 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            Diagnostic RH interactif
          </Link>
        </div>
      </SectionShell>
    </>
  );
}
