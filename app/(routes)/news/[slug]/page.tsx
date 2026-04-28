import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import { newsHubs } from "@/data/resources";
import { newsHubDetails } from "@/data/newsSignals";

export function generateStaticParams() {
  return newsHubs.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsHubs.find((entry) => entry.slug === slug);
  const detail = newsHubDetails[slug];

  if (!item || !detail) {
    notFound();
  }

  return (
    <>
      <PageHero kicker={item.sector} title={item.title} description={item.summary} />
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Pourquoi ce hub compte</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              {detail.whyItMatters}
            </p>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Angles éditoriaux</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              {detail.editorialAngles.map((angle) => (
                <li key={angle}>{angle}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Sources à suivre</h2>
            <div className="mt-5 grid gap-4">
              {detail.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-[22px] border border-brand-teal/10 bg-brand-mint/35 p-5 transition hover:-translate-y-0.5"
                >
                  <p className="text-sm font-semibold text-brand-ink">{source.name}</p>
                  <p className="mt-2 text-sm leading-7 text-brand-stone">{source.note}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Entreprises à suivre</h2>
            <div className="mt-5 grid gap-4">
              {detail.fundingSignals.map((signal) => (
                <a
                  key={signal.company}
                  href={signal.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-[22px] border border-brand-teal/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    {signal.sector} · {signal.source}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-brand-ink">{signal.company}</p>
                  <p className="mt-3 text-sm leading-7 text-brand-stone">{signal.angle}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContentPageSignature description="Hub éditorial SKS TALENTS pour transformer les actualités sectorielles en angles de contenu, en signaux business et en pistes de recrutement." />
    </>
  );
}
