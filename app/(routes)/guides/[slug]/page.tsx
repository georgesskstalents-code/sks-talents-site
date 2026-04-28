import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";
import CommercialNextSteps from "@/components/CommercialNextSteps";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import { getWhitepaperGuideBySlug, whitepaperGuides } from "@/data/lexiconHub";

export const dynamicParams = false;

export function generateStaticParams() {
  return whitepaperGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getWhitepaperGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  const url = `https://www.skstalents.fr/guides/${guide.slug}`;

  return {
    title: `${guide.title} | SKS TALENTS`,
    description: guide.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: "SKS TALENTS",
      locale: "fr_FR",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description
    }
  };
}

export default async function WhitepaperGuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getWhitepaperGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: "SKS TALENTS"
    },
    audience: guide.audience.map((label) => ({
      "@type": "Audience",
      audienceType: label
    }))
  };

  return (
    <>
      <script
        id={`${guide.slug}-creativework-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        kicker="Guide premium"
        title={guide.title}
        description={guide.description}
        variant="sand"
        template="editorial"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Guides", href: "/lexique-life-sciences-rh#whitepapers" },
          { label: guide.title }
        ]}
      />

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Problème business
              </p>
              <p className="mt-3 text-lg leading-8 text-brand-stone">{guide.problem}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Bénéfice clé
              </p>
              <p className="mt-3 text-lg font-semibold leading-8 text-brand-ink">{guide.benefit}</p>
            </div>
            <div className="rounded-[26px] border border-brand-teal/10 bg-brand-mint/25 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Pour qui</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {guide.audience.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-brand-teal/12 bg-white px-4 py-2 text-sm font-semibold text-brand-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Ce guide vous aide à
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
                {guide.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-teal" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {guide.sections.map((section) => (
            <article key={section.title} className="card-surface h-full p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Dedans</p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">{section.title}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-stone">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-teal" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <div className="card-surface p-8 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Prochain pas
          </p>
          <h2 className="mt-4 font-display text-5xl text-brand-ink sm:text-6xl">
            Faites le lien entre lecture et exécution.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-brand-stone">
            Le guide vous donne le cadre. Le diagnostic vous aide ensuite à voir où vous perdez réellement du
            temps dans vos RH, votre recrutement ou votre organisation.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Demander un diagnostic
            </Link>
            <CalendlyButton label="Réserver un call" tone="outline" />
          </div>
        </div>
      </section>

      <section className="container-shell pb-8 sm:pb-12">
        <CommercialNextSteps
          guideHref={`/guides/${guide.slug}`}
          title="Après la lecture"
          description="Ne laissez pas le guide rester théorique. Enchaînez avec les pages qui aident à qualifier la situation, prioriser et décider plus vite."
        />
      </section>

      <ContentPageSignature description="Guide édité par SKS TALENTS pour aider les dirigeants à relier recrutement, structuration RH, automatisation utile et croissance durable." />
    </>
  );
}
