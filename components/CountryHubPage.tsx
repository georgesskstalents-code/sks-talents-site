import type { Metadata } from "next";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import FAQSection from "@/components/FAQSection";
import GEOAnswerCard from "@/components/GEOAnswerCard";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import type { CountryHub } from "@/data/countryHubs";

type CountryHubPageProps = {
  hub: CountryHub;
};

export function buildCountryHubMetadata(hub: CountryHub): Metadata {
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    keywords: [
      `${hub.slug} life sciences`,
      `${hub.slug} recrutement santé`,
      `${hub.slug} biotech`,
      `${hub.slug} animal health`,
      `${hub.slug} healthtech`,
      `${hub.slug} médecine nucléaire`
    ]
  };
}

export default function CountryHubPage({ hub }: CountryHubPageProps) {
  return (
    <>
      <PageHero
        kicker={hub.kicker}
        title={hub.title}
        description={hub.description}
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: hub.title }]}
      />

      <SectionShell
        eyebrow="Réponse directe"
        title="Un hub pays pensé pour Google, les LLM et les lecteurs qui veulent aller vite."
        description="L’objectif n’est pas de dupliquer des contenus. L’objectif est de clarifier le bon angle pays, le bon contexte marché et les bons liens internes."
      >
        <GEOAnswerCard
          title={hub.answerTitle}
          answer={hub.answer}
          bullets={hub.bullets}
        />
      </SectionShell>

      <SectionShell
        eyebrow="Priorités"
        title={hub.priorityTitle}
        description={hub.priorityDescription}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hub.priorities.map((item) => (
            <div
              key={item}
              className="rounded-[30px] border border-brand-teal/20 bg-white/95 p-6 shadow-[0_18px_45px_rgba(24,38,48,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Axe à pousser
              </p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">{item}</h2>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Pages clés"
        title={hub.contentTitle}
        description={hub.contentDescription}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {hub.contentLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[30px] border border-brand-teal/18 bg-white/95 p-6 shadow-[0_18px_45px_rgba(24,38,48,0.06)] transition hover:-translate-y-1 hover:border-brand-teal/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Contenu lié
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.label}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Écosystème"
        title={hub.ecosystemTitle}
        description={hub.ecosystemDescription}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {hub.ecosystemLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-surface block p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Ressource interne
              </p>
              <h3 className="mt-3 font-display text-3xl text-brand-ink">{item.label}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <FAQSection
        eyebrow="FAQ GEO"
        title={`Questions fréquentes sur ${hub.title}`}
        description="Une couche FAQ structurée pour rendre la page encore plus lisible par Google, ChatGPT, Claude, Mistral et Perplexity."
        items={hub.faq}
      />

      <SectionShell
        eyebrow="Prochain pas"
        title={hub.ctaTitle}
        description={hub.ctaDescription}
      >
        <div className="card-surface flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-brand-stone">
              Nous pouvons vous aider à transformer ce trafic pays en contenus plus utiles, en signaux marché plus lisibles et en décisions plus concrètes autour du recrutement, de la visibilité ou de la structuration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CalendlyButton label="Réserver un call" tone="solid" />
            <CalendlyButton label="Voir les ressources" href="/resources" tone="outline" />
          </div>
        </div>
      </SectionShell>

      <ContentPageSignature description={hub.signatureDescription} />
    </>
  );
}
