import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { comparisons } from "@/data/comparisons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((item) => item.slug === slug);

  if (!comparison) {
    return {};
  }

  return {
    title: comparison.title,
    description: comparison.description
  };
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const comparison = comparisons.find((item) => item.slug === slug);

  if (!comparison) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker={comparison.heroKicker}
        title={comparison.title}
        description={comparison.description}
        variant={comparison.heroVariant}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Comparatifs", href: "/comparatifs" },
          { label: comparison.title }
        ]}
      />
      <SectionShell
        eyebrow="Comparaison"
        title="Ce qu’il faut retenir."
        description="Une page comparative doit aider à décider, pas seulement à lire."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {comparison.points.map((point) => (
            <div key={point} className="card-surface p-6">
              <p className="text-sm leading-8 text-brand-stone">{point}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Les questions qui reviennent le plus souvent avant de nous contacter."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {comparison.faq.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-ink">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.answer}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Et maintenant ?"
        title="Passer du comparatif à l’action."
        description="Si votre contexte demande un cadrage plus fin, laissez-nous vous rappeler ou réservez directement un créneau."
      >
        <InlineLeadForm
          title="Parler de votre besoin"
          description="Un échange court suffit souvent pour clarifier le bon angle de recrutement."
          compact
        />
      </SectionShell>
    </>
  );
}
