import type { Metadata } from "next";
import Link from "next/link";
import { faqNode, pageGraph } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import PackageComparator from "@/components/PackageComparator";
import SalaryCalculator from "@/components/SalaryCalculator";
import SectionShell from "@/components/SectionShell";
import FAQSection from "@/components/FAQSection";
import { faqsByPage } from "@/data/faqsByPage";

export const metadata: Metadata = {
  title: "Coût employeur et salaire brut en net",
  description:
    "Combien coûte réellement un recrutement cadre ? Estimez le coût employeur, les charges patronales et le net perçu à partir du brut, statut par statut.",
  keywords: [
    "coût employeur",
    "calcul salaire employeur",
    "simulateur coût employeur",
    "charges patronales cadre",
    "coût employeur cadre",
    "salaire brut net coût employeur",
    "calcul coût salarié"
  ],
  alternates: {
    canonical: "/calcul-salaire-brut-net"
  },
  openGraph: {
    title: "Coût employeur et salaire brut en net",
    description:
      "Estimez le coût employeur d'un recrutement cadre : charges patronales, net perçu, net imposable et prélèvement à la source.",
    url: "https://www.skstalents.fr/calcul-salaire-brut-net",
    type: "website"
  }
};

export default function SalaryCalculatorPage() {
  const webPageSchema = {
    "@type": "WebPage",
    name: "Calcul du salaire brut en net",
    url: "https://www.skstalents.fr/calcul-salaire-brut-net",
    description:
      "Simulateur pour convertir un salaire brut en net et estimer un coût employeur avec une logique France plus detaillee."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageGraph([webPageSchema, faqNode(faqsByPage["calcul-salaire-brut-net"].items)])
          )
        }}
      />
      <PageHero
        kicker="Simulateur employeur"
        title="Combien vous coûte réellement un recrutement cadre ?"
        description="Estimez le coût employeur complet à partir du brut : charges patronales, net perçu par la personne recrutée, net imposable et prélèvement à la source, statut par statut."
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
      <SectionShell
        eyebrow="Aller plus loin"
        title="Vous recrutez en Life Sciences ou en santé animale ?"
        description="Une estimation de salaire ne dit pas si votre offre tient face au marché. Ces trois pages le précisent."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/salary-benchmarks"
            className="rounded-[28px] border border-brand-teal/12 bg-white p-6 transition hover:border-brand-teal/40"
          >
            <p className="font-display text-xl text-brand-ink">Benchmarks salaires</p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Les fourchettes observées par fonction et par secteur, pour situer votre offre.
            </p>
          </Link>
          <Link
            href="/life-sciences"
            className="rounded-[28px] border border-brand-teal/12 bg-white p-6 transition hover:border-brand-teal/40"
          >
            <p className="font-display text-xl text-brand-ink">Recrutement Life Sciences</p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Biotech, diagnostic, medtech et deeptech : comment nous cadrons une recherche cadre.
            </p>
          </Link>
          <Link
            href="/animal-health"
            className="rounded-[28px] border border-brand-teal/12 bg-white p-6 transition hover:border-brand-teal/40"
          >
            <p className="font-display text-xl text-brand-ink">Recrutement santé animale</p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">
              Groupements vétérinaires, laboratoires et petfood premium.
            </p>
          </Link>
        </div>
      </SectionShell>
          <FAQSection eyebrow="FAQ" title={faqsByPage["calcul-salaire-brut-net"].title} description={faqsByPage["calcul-salaire-brut-net"].description} items={faqsByPage["calcul-salaire-brut-net"].items} emitJsonLd={false} />
    </>
  );
}
