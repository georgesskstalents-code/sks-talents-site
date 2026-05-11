import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import FounderCard from "@/components/FounderCard";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MethodNarrative from "@/components/MethodNarrative";
import PageHero from "@/components/PageHero";
import RibbonCTA from "@/components/RibbonCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import SectionShell from "@/components/SectionShell";
import ServicesSection from "@/components/ServicesSection";
import { references } from "@/data/references";

const CANONICAL = "https://www.skstalents.fr/services";
const TITLE = "Nos services · Executive search, Programme IA, Structuration RH | SKS TALENTS";
const DESCRIPTION =
  "Cabinet executive search Life Sciences et Animal Health. Programme IA RH, structuration RH et accompagnement scale-up pour CEO biotech, medtech, vétérinaire.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    url: CANONICAL,
    siteName: "SKS TALENTS"
  }
};

// 5 signaux - verbatim depuis l'ancienne home (avant refonte 2026-05).
const youAreHerePoints: { title: string; html: string }[] = [
  {
    title: "Constituer un COMEX aligné",
    html: "Vous devez constituer un <strong>COMEX aligné</strong> sur votre <strong>stratégie</strong> et vos <strong>valeurs</strong>, et chaque recrutement <strong>impacte directement votre exécution</strong>."
  },
  {
    title: "Passer en phase scale-up",
    html: "Vous passez en phase <strong>scale-up</strong> (Série A, B ou au-delà) : vos <strong>processus de recrutement</strong> et votre <strong>employer branding</strong> ne tiennent plus la charge."
  },
  {
    title: "Structurer la fonction RH",
    html: "Vous voulez <strong>structurer la fonction RH</strong> et industrialiser le <strong>talent acquisition</strong> pour soutenir la <strong>roadmap business</strong>, sans alourdir l’organisation."
  },
  {
    title: "Automatiser les tâches à faible valeur",
    html: "Vous voulez <strong>automatiser les tâches RH à faible valeur ajoutée</strong> pour libérer la direction sur ce qui compte : <strong>la stratégie, la culture, l’humain</strong>."
  },
  {
    title: "Trouver un partenaire spécialisé",
    html: "Vous cherchez un partenaire qui maîtrise les enjeux <strong>Life Sciences & Animal Health</strong> (biotech, diagnostic, vétérinaire, petfood), pas un cabinet généraliste qui fait « aussi » de la santé."
  }
];

// Insight pénurie - verbatim depuis l'ancienne home.
const insightSignals = [
  {
    title: "Pénurie ciblée",
    description:
      "Le marché Life Sciences & Santé animale ne manque pas de CV. Il manque les profils rares, convaincables et crédibles pour un contexte Série A, Série B ou scale-up précis."
  },
  {
    title: "Pression marché",
    description:
      "En biotech, diagnostic, vétérinaire et petfood, chaque retard de recrutement se répercute sur l’exécution commerciale, technique, médicale ou managériale, et fragilise la roadmap COMEX."
  },
  {
    title: "Structuration RH digitalisée",
    description:
      "Le vrai levier RH aujourd’hui : digitaliser le recrutement, automatiser les tâches à faible valeur ajoutée et libérer la direction RH pour la stratégie et l’humain, là où se joue le succès des projets."
  }
];

const faqs = [
  {
    question: "Quels honoraires pour une mission executive search ?",
    answer: "Honoraires forfaitaires fixés en intake, indépendamment du salaire final. Permet de préserver la négociation salariale du candidat sans biais côté cabinet. Acompte au lancement, 2e tranche à la shortlist, solde à la signature."
  },
  {
    question: "Combien de temps dure une mission de bout en bout ?",
    answer: "Première shortlist garantie en 10 jours ouvrés. Le délai total dépend ensuite de la rapidité décisionnelle du client : nous voyons des signatures en 4 semaines comme en 4 mois. La médiane historique est de 60 jours."
  },
  {
    question: "Travaillez-vous avec des Series A ou seulement scale-up ?",
    answer: "Nous accompagnons les startups Series A jusqu'aux scale-ups Series C, soit typiquement de 5 à 200 employés. En deçà (pre-seed, seed), le besoin est rarement un cabinet executive search ; au-delà (post-IPO, ETI), nous restons utiles sur les rec critiques mais sans être votre partenaire principal."
  },
  {
    question: "Comment fonctionne la garantie de remplacement ?",
    answer: "Garantie de 6 mois après la signature. En cas de départ à l'initiative du candidat ou de rupture période d'essai, nous reprenons la mission gratuitement. Garantie suspendue en cas de pivot stratégique majeur ou de changement de direction côté entreprise."
  },
  {
    question: "Vos agents IA sont-ils inclus dans les honoraires ?",
    answer: "Les agents IA sont une offre à part entière, facturée en sus de l'executive search. Forfait au déploiement + abonnement mensuel après les 6 premiers mois. Vous pouvez les acheter seuls ou en complément d'une mission rec, selon votre maturité."
  }
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Executive search · Programme IA · Structuration RH",
  serviceType: "Executive Search · Talent Acquisition · Structuration RH",
  provider: { "@type": "Organization", name: "SKS TALENTS", url: "https://www.skstalents.fr" },
  areaServed: ["France", "Europe"],
  description: DESCRIPTION,
  url: CANONICAL
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.skstalents.fr" },
    { "@type": "ListItem", position: 2, name: "Nos services", item: CANONICAL }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* 1. Hero */}
      <PageHero
        kicker="Nos services"
        title="Executive search, RPO, onboarding et structuration RH."
        description="Trois offres complémentaires pour sécuriser vos recrutements critiques, absorber un volume de hiring exigeant et bâtir un cadre people robuste."
        variant="sand"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Nos services" }]}
      />

      {/* 2. Nos 3 offres (composant existant ServicesSection) */}
      <RevealOnScroll>
        <ServicesSection />
      </RevealOnScroll>

      {/* 3. Programmes IA (highlighted, mint) */}
      <RevealOnScroll delayMs={50}>
        <section className="bg-brand-mint py-14 sm:py-20">
          <div className="container-shell">
            <p className="eyebrow">Programmes IA</p>
            <h2 className="t-h1 mt-2 max-w-3xl font-display">
              Au-delà du recrutement : structurer vos RH avec l'IA.
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Link
                href="/life-sciences/structuration-ia"
                className="rounded-2xl border border-brand-teal/15 bg-white p-6 transition hover:shadow-soft"
              >
                <p className="eyebrow text-brand-teal">Programme Life Sciences</p>
                <h3 className="mt-2 t-h3 font-display text-brand-ink">Agent CEO Copilot stratégique</h3>
                <p className="mt-2 text-caption text-brand-stone">
                  Anticipez vos recrutements 6 mois à l'avance. Pour CEO biotech Series A à C.
                </p>
                <span className="mt-4 inline-block text-caption font-semibold text-brand-teal">En savoir plus</span>
              </Link>
              <Link
                href="/animal-health/structuration-ia"
                className="rounded-2xl border border-brand-teal/15 bg-white p-6 transition hover:shadow-soft"
              >
                <p className="eyebrow text-brand-teal">Programme Animal Health</p>
                <h3 className="mt-2 t-h3 font-display text-brand-ink">Agent Reporting Multi-Sites</h3>
                <p className="mt-2 text-caption text-brand-stone">
                  De 3 jours à 4 minutes de reporting. Pour groupements vétérinaires et petfood.
                </p>
                <span className="mt-4 inline-block text-caption font-semibold text-brand-teal">En savoir plus</span>
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 4. 5 signaux - compact cards SKS-bordered */}
      <RevealOnScroll delayMs={90}>
        <section className="container-shell py-10 sm:py-14">
          <p className="eyebrow">5 signaux qu’il est temps d’agir</p>
          <h2 className="t-h2 mt-2 max-w-3xl font-display">Vous vous reconnaissez si :</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {youAreHerePoints.map((point, index) => (
              <li
                key={point.title}
                className="flex gap-3 rounded-2xl border border-brand-teal/15 bg-white p-4 sm:p-5"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mint text-[11px] font-bold text-brand-teal"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="t-body font-semibold text-brand-ink">{point.title}</h3>
                  <p
                    className="mt-1 text-caption leading-6 text-brand-stone"
                    dangerouslySetInnerHTML={{ __html: point.html }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </RevealOnScroll>

      {/* 5. Insight pénurie (verbatim home) */}
      <RevealOnScroll delayMs={120}>
        <SectionShell
          eyebrow="Insight"
          title="Ce n’est pas la pénurie. C’est l’alignement."
          description="Brief flou, message marché bancal ou onboarding mal préparé : trois angles morts qui bloquent même avec de bons candidats."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {insightSignals.map((item) => (
              <div key={item.title} className="card-luxe panel-lift p-8">
                <p className="eyebrow">Insight</p>
                <h3 className="font-display text-3xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </RevealOnScroll>

      {/* 6. Méthode (composant existant) */}
      <RevealOnScroll delayMs={140}>
        <MethodNarrative />
      </RevealOnScroll>

      {/* 7. Garanties (composant existant) */}
      <RevealOnScroll delayMs={150}>
        <GuaranteeBadge variant="banner" />
      </RevealOnScroll>

      {/* 8. RibbonCTA ribbon */}
      <RevealOnScroll delayMs={160}>
        <RibbonCTA
          eyebrow="Prochaine étape"
          title="Si l’un de ces blocages résonne, ou si vous en vivez d’autres, donnons-nous 15 minutes."
          primaryLabel="Réserver 15 min d’analyse"
          secondaryHref="/diagnostic"
          secondaryLabel="Faire le diagnostic"
        />
      </RevealOnScroll>

      {/* 9. Références (Marquee + 3 premiers) */}
      <RevealOnScroll delayMs={170}>
        <SectionShell
          eyebrow="Preuves"
          title="Des marques reconnues. Des scale-ups ambitieuses."
        >
          <div className="space-y-8">
            <div className="card-luxe p-6 sm:p-8">
              <ReferenceMarquee items={references} />
            </div>
            <ReferenceGrid items={references.slice(0, 3)} />
          </div>
        </SectionShell>
      </RevealOnScroll>

      {/* 10. FAQ */}
      <RevealOnScroll delayMs={180}>
        <FAQSection
          eyebrow="FAQ"
          title="Vos questions, nos réponses."
          items={faqs}
        />
      </RevealOnScroll>

      {/* 11. Votre interlocuteur direct - bloc final */}
      <RevealOnScroll delayMs={190}>
        <FounderCard />
      </RevealOnScroll>
    </>
  );
}
