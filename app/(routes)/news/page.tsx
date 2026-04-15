import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { newsHubs } from "@/data/resources";
import { editorialMarketSources } from "@/data/newsSignals";

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="Actualités"
        title="Des hubs de veille pour relier marché, recrutements et signaux business."
        description="La veille SKS TALENTS s’appuie sur France Biotech, Bpifrance, les fonds santé et les signaux entreprises pour partager en priorité les acteurs qui lèvent en Seed, Série A ou Série B, accélèrent leurs opérations et structurent leurs équipes de direction, production, sales, ingénierie et fonctions support."
        variant="ink"
      />
      <section className="container-shell grid gap-4 py-4 md:grid-cols-3">
        {[
          [
            "Seed",
            "Suivre les jeunes structures qui recrutent leurs premiers profils clés en direction, produit, science, opérations ou business."
          ],
          [
            "Série A",
            "Identifier les entreprises qui passent du prototype au scale-up et ouvrent des postes en production, qualité, ingénierie et go-to-market."
          ],
          [
            "Série B",
            "Repérer les sociétés qui structurent leadership, exécution terrain, revenue teams et industrialisation."
          ]
        ].map(([title, description]) => (
          <div key={title} className="card-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">{title}</p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{description}</p>
          </div>
        ))}
      </section>
      <section className="container-shell grid gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
        {editorialMarketSources.slice(0, 6).map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer noopener"
            className="card-surface block p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Source prioritaire</p>
            <h2 className="mt-3 font-display text-3xl text-brand-ink">{source.name}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-stone">{source.note}</p>
          </a>
        ))}
      </section>
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {newsHubs.map((item) => (
          <ListingCard
            key={item.slug}
            href={`/news/${item.slug}`}
            title={item.title}
            description={item.summary}
            meta={item.sector}
          />
        ))}
      </section>
    </>
  );
}
