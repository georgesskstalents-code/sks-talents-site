import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import CoutRecrutementCalculator from "@/components/CoutRecrutementCalculator";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

const CANONICAL = "https://www.skstalents.fr/cout-mauvais-recrutement";

export const metadata: Metadata = {
  title: "Calculateur cout d'un mauvais recrutement | SKS TALENTS",
  description:
    "Calculez le vrai cout d'un recrutement rate en Life Sciences et Animal Health : search, onboarding, vacance, equipe demobilisee, projets decales. Fourchettes bornees sources AON x France Biotech 2025.",
  keywords: [
    "cout mauvais recrutement",
    "cout recrutement rate",
    "combien coute un mauvais recrutement",
    "impact turnover cadre",
    "cout cache recrutement",
    "cout recrutement biotech",
    "cout recrutement medtech",
    "cout hire scale-up"
  ],
  alternates: {
    canonical: "/cout-mauvais-recrutement"
  },
  openGraph: {
    title: "Calculateur cout d'un mauvais recrutement - SKS TALENTS",
    description:
      "Estimez en 30 secondes le cout cache d'un recrutement rate sur un poste cadre Life Sciences ou Animal Health.",
    url: CANONICAL,
    type: "website"
  }
};

export default function CoutMauvaisRecrutementPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculateur du cout d'un mauvais recrutement",
    description:
      "Simulateur en ligne pour estimer le cout total d'un recrutement rate sur un poste cadre : search, onboarding, vacance, equipe et projets decales.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: CANONICAL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    },
    provider: {
      "@type": "Organization",
      name: "SKS TALENTS",
      url: "https://www.skstalents.fr"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
      { "@type": "ListItem", position: 2, name: "Outils", item: "https://www.skstalents.fr/resources" },
      { "@type": "ListItem", position: 3, name: "Calculateur cout mauvais recrutement", item: CANONICAL }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coute reellement un mauvais recrutement sur un poste cadre ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sur un poste cadre Life Sciences ou Animal Health, un recrutement rate coute entre 1 et 2,5 fois le salaire brut annuel. Sur un profil C-level a 150 000 EUR, cela represente 150 000 a 375 000 EUR de cout total, cumulant search, onboarding, vacance, perte de productivite equipe et projets decales."
        }
      },
      {
        "@type": "Question",
        name: "Sur quelles donnees repose ce calculateur ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les fourchettes s'appuient sur le benchmark AON x France Biotech 2025, le Panorama France HealthTech 2026 et les observations SKS Talents sur 100+ placements cadres Life Sciences et Animal Health cumules sur 8 ans. Les cas mesurent la variabilite reelle du marche selon urgence, disponibilite et negociations."
        }
      },
      {
        "@type": "Question",
        name: "Quel est le poste de cout le plus sous-estime ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'impact projet et decision retardee. Un.e VP ou C-level absent decale des jalons cliniques, financiers ou strategiques dont le cout n'apparait jamais dans le budget RH mais peut representer plusieurs multiples du salaire annuel sur une biotech Series B ou une scale-up medtech."
        }
      },
      {
        "@type": "Question",
        name: "Comment reduire ce cout avant meme d'ouvrir un poste ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trois leviers : structurer un job intake serieux avec fondateur et board, formaliser une scorecard candidat AVANT les entretiens, et prevoir une revue trimestrielle a 90 et 180 jours pour detecter tot les signaux de derive. C'est le travail amont qui coupe le risque, pas la chasse elle-meme."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        kicker="Outil pratique"
        title="Combien coute vraiment un mauvais recrutement ?"
        description="Estimez en 30 secondes le cout cache d'un recrutement rate sur un poste cadre. Search, onboarding, vacance, equipe, projets : chaque poste est chiffre avec des fourchettes sourcees marche."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Outils", href: "/resources" },
          { label: "Cout d'un mauvais recrutement" }
        ]}
      />

      <section className="container-shell pt-4">
        <div className="rounded-[22px] border border-brand-teal/20 bg-brand-mint/30 p-6">
          <p className="text-base leading-8 text-brand-ink">
            Un recrutement rate sur un poste cadre Life Sciences coute entre 1 et 2,5 fois le salaire brut annuel.
            Ce n'est pas seulement le search et l'onboarding : c'est aussi la vacance du poste, la demobilisation
            de l'equipe, les jalons decales et la perte de credibilite dirigeante. Ce calculateur chiffre les 4
            postes principaux avec des fourchettes bornees sur donnees marche verifiables.
          </p>
        </div>
      </section>

      <SectionShell
        eyebrow="Simulateur"
        title="Estimez le cout cache d'un recrutement rate en 4 parametres"
        description="Ajustez le salaire, le type de poste, le delai de remplacement et la taille de l'equipe. Le resultat s'actualise en direct avec le detail par poste de cout."
      >
        <CoutRecrutementCalculator />
      </SectionShell>

      <SectionShell
        eyebrow="Aller plus loin"
        title="Les 3 fonctions ou le cout d'un rate est le plus violent"
        description="Le multiplicateur du cout ne depend pas que du salaire : le stade de croissance, la fonction et le contexte board pesent lourd. Ces trois analyses detaillees vous aident a lire votre propre situation."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/blog/cout-rate-ceo-biotech-series-b"
            className="card-surface block p-6 transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Direction executive
            </p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">
              Cout d'un.e CEO biotech Series B rate
            </h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Runway brule, narratif investisseurs degrade, confiance board perdue avant la Series C.
            </p>
          </Link>
          <Link
            href="/blog/cout-rate-cto-deeptech-series-a"
            className="card-surface block p-6 transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Direction technique
            </p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">
              Cout d'un.e CTO deeptech Series A mal calibre.e
            </h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Roadmap produit decalee de 12 a 18 mois, ingenieur.e.s cles qui partent, fenetre Series B ratee.
            </p>
          </Link>
          <Link
            href="/blog/cout-rate-cmo-medtech-scale-up"
            className="card-surface block p-6 transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Acces marche
            </p>
            <h3 className="mt-3 font-display text-2xl text-brand-ink">
              Cout d'un.e CMO medtech en scale-up
            </h3>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Reglementaire bloque, reseau KOL absent, dossier remboursement mal calibre, go-to-market retarde.
            </p>
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Reduire le risque"
        title="Trois leviers pour eviter que ce cout se realise"
        description="Le meilleur ROI n'est pas dans la chasse : il est dans le travail de cadrage AVANT ouverture du poste."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">1. Job intake structure</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Session de cadrage de 45 minutes entre fondateur, hiring manager et RH. Definit besoin reel,
              criteres mesurables, signaux d'exclusion. Sans intake, la fiche de poste reste floue et le
              process s'allonge de 30 a 50 %.
            </p>
            <Link
              href="/lexique-life-sciences-rh#job-intake"
              className="mt-4 inline-block text-sm font-semibold text-brand-teal underline"
            >
              Voir la definition
            </Link>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">2. Scorecard candidat</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Grille d'evaluation commune, decidee AVANT les entretiens. Reduit les biais, aligne les debriefs
              entre DRH, CEO et experts metier, accelere la decision sur des postes cadres rares.
            </p>
            <Link
              href="/lexique-life-sciences-rh#scorecard-candidat"
              className="mt-4 inline-block text-sm font-semibold text-brand-teal underline"
            >
              Voir la definition
            </Link>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">3. Revue trimestrielle 90/180 j</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Rituel de check formel avec le/la lead investor ou le board a 90 et 180 jours post-signature.
              Detecte tot les signaux de derive et rend une correction de trajectoire possible avant que le
              runway ne se tende.
            </p>
            <Link
              href="/blog/quel-est-le-vrai-cout-mauvais-recrutement"
              className="mt-4 inline-block text-sm font-semibold text-brand-teal underline"
            >
              Article complet
            </Link>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Prochaine etape"
        title="On regarde votre poste ensemble ?"
        description="Un call de 15 minutes suffit pour cadrer un poste critique avant d'ouvrir la recherche. Confidentiel, sans engagement, oriente decision."
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
