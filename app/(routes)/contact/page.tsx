import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | SKS TALENTS",
  description:
    "Parlez à SKS TALENTS pour cadrer un recrutement critique, un besoin RPO ou une structuration RH en Life Sciences, biotech, diagnostic et Animal Health."
};

const quickPaths = [
  {
    title: "Recrutement critique",
    description:
      "Pour un poste sensible, une fonction rare ou un recrutement qui engage directement la trajectoire de l’entreprise."
  },
  {
    title: "RPO / volume de hiring",
    description:
      "Pour absorber une phase de croissance, structurer le pipeline et fluidifier l’exécution côté direction et RH."
  },
  {
    title: "Structuration RH",
    description:
      "Pour clarifier l’organisation, le cadrage des rôles, le niveau d’exigence et les priorités people avant de recruter."
  }
];

const contactSignals = [
  "Lecture rapide de vos enjeux sous 24 à 48h.",
  "Approche pensée pour CEO, COO, CPO et DRH.",
  "Intervention sur biotech, diagnostic, santé animale et petfood.",
  "Échange utile, cadré et directement exploitable."
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Parler à SKS TALENTS"
        title="Audit de vos enjeux recrutement, structuration RH et exécution."
        description="Un point de contact clair pour transformer un besoin sensible en échange utile, cadré et directement actionnable."
      />

      <section className="container-shell pb-8">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="card-surface p-8 sm:p-10">
              <p className="eyebrow">Quand nous contacter</p>
              <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
                Quand le sujet dépasse un simple besoin RH.
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-stone">
                Cette page est pensée pour les entreprises qui doivent recruter juste, vite et
                avec un vrai niveau d’exigence dans des environnements Life Sciences, biotech,
                diagnostic, santé animale et petfood.
              </p>
              <div className="mt-6 space-y-3">
                {contactSignals.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-brand-teal/12 bg-brand-mint/20 px-5 py-4 text-sm leading-7 text-brand-stone"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <CalendlyButton label="Réserver un call" />
                <a
                  href="mailto:g.kengue@skstalents.com"
                  className="inline-flex items-center justify-center rounded-full border border-brand-teal/25 px-6 py-4 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  g.kengue@skstalents.com
                </a>
              </div>
            </div>

            <div className="card-luxe p-8">
              <p className="eyebrow">Chemins rapides</p>
              <div className="mt-5 grid gap-4">
                {quickPaths.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-brand-teal/12 bg-white/90 px-5 py-5"
                  >
                    <h3 className="font-display text-2xl text-brand-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-brand-stone">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div id="rappel" className="scroll-mt-28">
            <InlineLeadForm
              title="Recevoir un rappel qualifié"
              description="Déposez vos coordonnées en moins d’une minute. Nous revenons avec une première lecture claire de la meilleure trajectoire : executive search, RPO, structuration RH ou échange de cadrage."
              role="CEO / COO / CPO / DRH"
              sector="Life Sciences, Biotech, Diagnostic, Animal Health & Petfood"
            />
          </div>
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="mesh-panel p-8 sm:p-10">
          <p className="eyebrow">Avant l’échange</p>
          <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
            Vous pouvez aussi préparer la discussion par la bonne entrée.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
            Si vous préférez avancer d’abord par la preuve, les services ou les références, voici
            les trois pages les plus utiles avant de nous contacter.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/services",
                title: "Voir les services",
                copy: "Executive search, RPO, onboarding et structuration RH."
              },
              {
                href: "/references",
                title: "Voir les références",
                copy: "Des missions, des contextes et des signaux concrets de crédibilité."
              },
              {
                href: "/mission",
                title: "Comprendre la méthode",
                copy: "Une lecture plus claire du niveau d’exigence, du process et du cadrage."
              }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-luxe panel-lift block p-6 transition"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  SKS TALENTS
                </p>
                <h3 className="mt-4 font-display text-3xl text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-stone">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
