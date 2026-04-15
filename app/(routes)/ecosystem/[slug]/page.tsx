import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { ecosystemCategories, ecosystemDetailedPages, ecosystemStudy } from "@/data/ecosystemTargets";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ecosystemDetailedPages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = ecosystemDetailedPages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.seoDescription
  };
}

export default async function EcosystemDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = ecosystemDetailedPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const targets = ecosystemCategories
    .filter((category) => page.categorySlugs.includes(category.slug))
    .flatMap((category) =>
      category.targets.filter((target) =>
        page.sectorFilter === "Life Sciences" ? true : target.sectors.includes(page.sectorFilter)
      )
    );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Pourquoi suivre ${page.title.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: page.whyItMatters[0]
        }
      },
      {
        "@type": "Question",
        name: "Comment transformer cette veille en action business ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: page.ctaDescription
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker={page.kicker}
        title={page.title}
        description={page.description}
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Écosystème", href: "/ecosystem" },
          { label: page.title }
        ]}
      />

      <SectionShell
        eyebrow="Pourquoi cette page"
        title="Ce qu’il faut regarder en priorité."
        description="L’objectif est de transformer une simple veille en actif éditorial utile pour les recruteurs, décideurs et moteurs de recherche."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Points clés
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Pourquoi c’est stratégique
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              {page.whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Acteurs"
        title="Les acteurs les plus pertinents de cette catégorie."
        description="Chaque carte peut devenir une opportunité de présence, de contenu ou de relation dans l’écosystème."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {targets.map((target) => (
            <article key={target.name} className="card-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-3xl text-brand-ink">{target.name}</h3>
                <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                  {target.priority}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{target.angle}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                {target.sectors.join(" · ")}
              </p>
              {target.url ? (
                <a
                  href={target.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex rounded-full border border-brand-teal/20 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  Visiter le site
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="À lire aussi"
        title={ecosystemStudy.title}
        description="L’étude signature donne un angle propriétaire à relayer depuis ces pages détaillées."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h3 className="font-display text-3xl text-brand-ink">{ecosystemStudy.subtitle}</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">{ecosystemStudy.summary}</p>
            <Link
              href={`/studies/${ecosystemStudy.slug}`}
              className="mt-5 inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Lire l’étude
            </Link>
          </div>
          <div className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              CTA contextuel
            </p>
            <h3 className="mt-3 font-display text-3xl text-brand-ink">{page.ctaTitle}</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">{page.ctaDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact#rappel"
                className="inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Demander un rappel
              </Link>
              <a
                href="https://calendly.com/g-kengue/talentconsulting"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                Réserver un call
              </a>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Et maintenant ?"
        title="Activer cette page dans votre acquisition."
        description="Le moyen le plus simple de convertir cette lecture en échange concret."
      >
        <InlineLeadForm
          title="Recevoir un rappel sur ce sujet"
          description={`Parlez-nous de votre besoin lié à ${page.title.toLowerCase()} et nous revenons vers vous rapidement.`}
          role="Direction / Talent"
          sector={page.sectorFilter}
          compact
        />
      </SectionShell>
    </>
  );
}
