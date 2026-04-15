import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PackageComparator from "@/components/PackageComparator";
import SalaryCalculator from "@/components/SalaryCalculator";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Calcul salaire brut en net et coût employeur | SKS TALENTS",
  description:
    "Calculez le salaire brut en net et le coût employeur avec une estimation France plus fine par statut, net imposable et salaire net apres prelevement a la source.",
  keywords: [
    "calcul salaire brut net",
    "coût employeur",
    "charges patronales",
    "salaire net",
    "salaire brut",
    "simulateur salaire",
    "prelevement a la source",
    "simulateur cout employeur"
  ],
  alternates: {
    canonical: "/calcul-salaire-brut-net"
  },
  openGraph: {
    title: "Calcul salaire brut en net et coût employeur | SKS TALENTS",
    description:
      "Simulateur France de salaire brut en net et coût employeur avec statut detaille, temps de travail, net imposable et estimation apres impots.",
    url: "https://www.skstalents.fr/calcul-salaire-brut-net",
    type: "website"
  }
};

export default function SalaryCalculatorPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Calcul du salaire brut en net",
    url: "https://www.skstalents.fr/calcul-salaire-brut-net",
    description:
      "Simulateur pour convertir un salaire brut en net et estimer un coût employeur avec une logique France plus detaillee."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle difference entre salaire net et net imposable ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le net imposable reintegre notamment la part non deductible de CSG-CRDS. Il sert de base au calcul du prelevement a la source et peut donc etre superieur au net verse."
        }
      },
      {
        "@type": "Question",
        name: "Comment est estime le coût employeur ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le coût employeur additionne le brut et les charges patronales estimees. Il varie selon le statut, l'effectif, le taux accidents du travail et d'eventuels alleegements."
        }
      },
      {
        "@type": "Question",
        name: "Le resultat est-il identique a une fiche de paie ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. Le simulateur donne une estimation structuree et credible, mais une fiche de paie reelle depend de la convention collective, de l'entreprise, des exonérations et de la situation individuelle."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker="Simulateur salaire"
        title="Calcul du salaire brut en net et du coût employeur"
        description="Un simulateur France pour estimer le net salarie, le net imposable, le prelevement a la source et le coût employeur selon plusieurs statuts."
      />
      <section className="container-shell pb-4">
        <div className="card-surface flex flex-wrap gap-3 p-5">
          <a
            href="#simulateur-brut-net"
            className="inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Aller au simulateur
          </a>
          <a
            href="#comparateur-packages"
            className="inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            Aller au comparateur de packages
          </a>
        </div>
      </section>
      <div id="simulateur-brut-net">
      <SectionShell
        eyebrow="Outil pratique"
        title="Estimez le net salarie et le budget employeur avec une logique France plus credible"
        description="Cette version affine les calculs selon le statut, la retraite complementaire, le net imposable et les cas plus specifiques comme la fonction publique, le portage, l'activite independante et les charges employeur."
      >
        <SalaryCalculator />
      </SectionShell>
      </div>
      <div id="comparateur-packages">
      <SectionShell
        eyebrow="Comparateur"
        title="Comparez deux packages avec fixe, variable, bonus et avantages"
        description="Un module dédié pour arbitrer entre deux offres, tester plusieurs niveaux d’atteinte du variable et mesurer la valeur réelle d’un package global."
      >
        <PackageComparator />
      </SectionShell>
      </div>
      <SectionShell
        eyebrow="Guide"
        title="Comprendre le brut, le net et le coût employeur"
        description="Avant une embauche, une negociation salariale ou une construction de package, il est utile de distinguer clairement ce que paie l'entreprise, ce que percoit le salarie et ce qui sert de base au prelevement a la source."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Salaire brut</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Le brut correspond a la remuneration avant retenues salariales. C'est le point de
              depart le plus courant pour raisonner sur un package de recrutement.
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Salaire net</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Le net verse est ce que le salarie percoit avant impots. Le net imposable peut etre
              different, car il reintegre certaines contributions comme une partie de la CSG.
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Coût employeur</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Le coût employeur additionne le salaire brut et les charges patronales. C'est le bon
              indicateur pour estimer le vrai budget d'une embauche.
            </p>
          </article>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="FAQ"
        title="Questions frequentes sur le brut, le net et les charges patronales"
        description="Les requetes autour du calcul de salaire changent selon que l'on se place cote candidat, manager, DRH ou employeur. Voici les points de reperes les plus utiles."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Quelle difference entre net et net imposable ?</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Le net imposable sert au calcul du prelevement a la source. Il est souvent legerement
              superieur au net verse car il reintegre notamment la part non deductible de CSG-CRDS.
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Le coût employeur est-il identique pour tous ?</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Non. Il varie selon le statut, l'effectif, le taux accidents du travail, la retraite
              complementaire, certaines exonérations et les dispositifs d'alleegement applicables.
            </p>
          </article>
          <article className="card-surface p-6">
            <h3 className="font-display text-2xl text-brand-ink">Ce simulateur remplace-t-il une paie ?</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Non. Il fournit une estimation solide pour orienter une decision RH ou une negociation,
              mais une fiche de paie exacte depend toujours du cadre juridique et conventionnel reel.
            </p>
          </article>
        </div>
      </SectionShell>
    </>
  );
}
