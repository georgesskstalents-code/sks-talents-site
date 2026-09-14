import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import {
  breadcrumbNode,
  faqNode,
  orgRef,
  pageGraph,
  SERVICE_STRUCTURATION_RH_ID
} from "@/lib/seo";
import {
  deliverables,
  STRUCTURATION_RH_CANONICAL,
  structurationRhFaqs,
  triggers
} from "./content";

const TITLE = "Structuration RH et digitalisation des process";
const DESCRIPTION =
  "Audit RH, organisation cible, process de recrutement et d'onboarding, automatisation et gouvernance IA pour CEO, COO et DRH en biotech, medtech et santé animale.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "structuration RH",
    "digitalisation des process RH",
    "organisation RH scale-up",
    "process de recrutement biotech",
    "onboarding medtech",
    "DRH à temps partagé",
    "automatisation RH"
  ],
  alternates: { canonical: STRUCTURATION_RH_CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    url: STRUCTURATION_RH_CANONICAL,
    siteName: "SKS TALENTS"
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true }
};

const serviceNode = {
  "@type": "Service",
  "@id": SERVICE_STRUCTURATION_RH_ID,
  name: "Structuration RH et digitalisation des process",
  serviceType: "Conseil en organisation RH",
  provider: orgRef,
  url: STRUCTURATION_RH_CANONICAL,
  description: DESCRIPTION,
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Europe" }
  ],
  audience: {
    "@type": "Audience",
    audienceType: "CEO, COO, DRH de biotech, medtech, diagnostic et santé animale"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Livrables de structuration RH",
    itemListElement: deliverables.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.title }
    }))
  }
};

export default function StructurationRhPage() {
  return (
    <>
      <script
        id="structuration-rh-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageGraph([
              breadcrumbNode([
                { name: "Accueil", path: "" },
                { name: "Structuration RH", path: "/structuration-rh" }
              ]),
              serviceNode,
              faqNode(structurationRhFaqs)
            ])
          )
        }}
      />

      <PageHero
        kicker="Structuration RH"
        title="Structurer et digitaliser vos process RH après une levée de fonds ou une acquisition."
        description="Vos recrutements s'accélèrent, votre organisation ne suit pas. Nous remettons un cadre : organisation cible, process, grille de rémunération, outillage."
        variant="teal"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Structuration RH" }]}
      />

      <SectionShell
        eyebrow="01 · Le moment"
        title="Quand un dirigeant en a besoin."
        description="La structuration RH n'arrive presque jamais comme un projet planifié. Elle s'impose après un événement qui change l'échelle de l'organisation."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {triggers.map((item) => (
            <article key={item.title} className="card-surface p-7">
              <h3 className="font-display text-2xl text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-brand-stone">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="max-w-3xl text-base leading-8 text-brand-stone">
          Le point commun de ces quatre situations : le nombre de décisions RH à prendre augmente
          plus vite que le nombre de personnes capables de les prendre. Tant que l&apos;organisation
          est petite, l&apos;informel absorbe cet écart. Passé un certain volume, il le transforme en
          incohérences visibles, sur les rémunérations d&apos;abord, sur les départs ensuite.
        </p>
      </SectionShell>

      <SectionShell
        eyebrow="02 · Le contenu"
        title="Ce que nous livrons."
        description="Six livrables, activés séparément ou ensemble selon le point de départ. Chacun se termine par un document utilisable sans nous."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => (
            <article key={item.title} className="card-surface p-7">
              <h3 className="font-display text-xl text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="03 · Le format"
        title="Comment ça se passe."
        description="Deux formats, selon que vous ayez besoin d'un chantier borné ou d'une présence dans la durée."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="card-surface p-8">
            <p className="eyebrow">Format A</p>
            <h3 className="mt-2 font-display text-2xl text-brand-ink">Mission cadrée</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Un périmètre défini, un calendrier, des livrables datés. Le format adapté quand le
              besoin est identifié : refondre le process de recrutement, construire la grille de
              rémunération, préparer une due diligence RH.
            </p>
          </article>
          <article className="card-surface p-8">
            <p className="eyebrow">Format B</p>
            <h3 className="mt-2 font-display text-2xl text-brand-ink">DRH à temps partagé</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Une présence régulière pour installer les rituels et tenir le cadre pendant la phase de
              croissance, sans créer un poste de DRH à temps plein trop tôt.
            </p>
          </article>
        </div>
        <div className="card-surface p-8">
          <h3 className="font-display text-2xl text-brand-ink">Le déroulé</h3>
          <ol className="mt-5 space-y-4 text-base leading-8 text-brand-stone">
            <li>
              <span className="font-semibold text-brand-ink">1. Cadrage.</span> Une réunion avec le/la
              dirigeant.e et, selon les cas, le board ou le/la lead investor. On y fixe le périmètre,
              les livrables et les critères de fin de mission.
            </li>
            <li>
              <span className="font-semibold text-brand-ink">2. Audit.</span> Lecture de l&apos;existant
              et entretiens avec les personnes clés. Le livrable est la cartographie des frictions,
              hiérarchisée.
            </li>
            <li>
              <span className="font-semibold text-brand-ink">3. Construction.</span> Organisation
              cible, process, grille, outillage. Chaque document est construit avec vos équipes, pas
              livré par-dessus.
            </li>
            <li>
              <span className="font-semibold text-brand-ink">4. Transfert.</span> Formation des
              managers concernés et point de contrôle à distance de la fin de mission.
            </li>
          </ol>
          <p className="mt-5 text-sm leading-7 text-brand-stone">
            Durée type de la mission complète : [[A_FOURNIR: durée type d&apos;une mission de
            structuration RH]]. Sur le volet outillage, les pilotes décrits sur nos pages de
            digitalisation par l&apos;IA sont généralement opérationnels en 4 à 6 semaines.
          </p>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="04 · Les effets"
        title="Résultats observés."
        description="Les chiffres ci-dessous sont ceux déjà publiés sur nos deux pages de digitalisation par l'IA. Ils sont repris tels quels, avec leur page d'origine."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card-surface p-8">
            <p className="font-display text-4xl text-brand-teal">3 jours → 4 minutes</p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Temps de production du reporting mensuel consolidé d&apos;un groupement vétérinaire,
              une fois la remontée des données automatisée.
            </p>
            <Link
              className="mt-4 inline-block text-sm font-semibold text-brand-teal underline"
              href="/animal-health/structuration-ia"
            >
              Source : digitalisation santé animale par l&apos;IA
            </Link>
          </article>
          <article className="card-surface p-8">
            <p className="font-display text-4xl text-brand-teal">2 semaines → 48 h</p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Délai de préparation d&apos;une due diligence RH, documents et avenants centralisés.
            </p>
            <Link
              className="mt-4 inline-block text-sm font-semibold text-brand-teal underline"
              href="/animal-health/structuration-ia"
            >
              Source : digitalisation santé animale par l&apos;IA
            </Link>
          </article>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-brand-stone">
          Ces ordres de grandeur concernent le volet outillage et automatisation. Les effets sur la
          cohérence des rémunérations et sur la rétention se mesurent sur un horizon plus long, et
          nous ne publions pas de chiffre que nous ne pouvons pas sourcer.
        </p>
      </SectionShell>

      <SectionShell
        eyebrow="05 · Et le recrutement"
        title="Recruter le bon dirigeant ne suffit pas."
        description="Une organisation qui ne tient pas fait échouer un bon recrutement. C'est la raison pour laquelle nous faisons les deux."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/life-sciences" className="card-surface block p-8 transition hover:border-brand-teal/40">
            <h3 className="font-display text-2xl text-brand-ink">Executive search Life Sciences</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Biotech, diagnostic, medtech et deeptech. Recherche directe sur les fonctions cadres et
              dirigeantes.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-teal">
              Voir la page Life Sciences →
            </span>
          </Link>
          <Link href="/animal-health" className="card-surface block p-8 transition hover:border-brand-teal/40">
            <h3 className="font-display text-2xl text-brand-ink">Executive search santé animale</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Groupements vétérinaires, laboratoires et petfood premium.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-teal">
              Voir la page santé animale →
            </span>
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="06 · Aller plus loin"
        title="Aller plus loin avec l'IA."
        description="Quand les process sont posés, l'étape suivante est de retirer aux équipes ce qui est répétitif."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/life-sciences/structuration-ia"
            className="card-surface block p-8 transition hover:border-brand-teal/40"
          >
            <h3 className="font-display text-2xl text-brand-ink">Digitalisation RH par l&apos;IA</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-teal">
              Life Sciences
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Reporting investisseurs, anticipation des recrutements, signaux de rétention.
            </p>
          </Link>
          <Link
            href="/animal-health/structuration-ia"
            className="card-surface block p-8 transition hover:border-brand-teal/40"
          >
            <h3 className="font-display text-2xl text-brand-ink">Digitalisation par l&apos;IA</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-teal">
              Santé animale
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Reporting multi-sites, centralisation documentaire, qualification des appels.
            </p>
          </Link>
        </div>
      </SectionShell>

      <FAQSection
        eyebrow="FAQ"
        title="Quatre questions que posent les dirigeants."
        description="Ce que les CEO, COO et DRH nous demandent avant de lancer une mission de structuration."
        items={structurationRhFaqs}
        emitJsonLd={false}
      />

      <SectionShell
        eyebrow="Prochaine étape"
        title="Un échange de 15 minutes pour qualifier le besoin."
        description="Nous regardons votre situation, nous vous disons si une mission de structuration est justifiée, et sinon nous vous le disons aussi."
      >
        <div className="flex flex-wrap gap-3">
          <CalendlyButton label="Réserver 15 min d’analyse" />
          <CalendlyButton label="Faire le diagnostic en ligne" href="/diagnostic" tone="outline" />
        </div>
      </SectionShell>
    </>
  );
}
