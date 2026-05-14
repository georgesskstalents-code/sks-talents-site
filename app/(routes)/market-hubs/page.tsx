import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { marketHubs } from "@/data/marketHubs";

export default function MarketHubsPage() {
  return (
    <>
      <PageHero
        kicker="Hubs de référence"
        title="10 hubs éditoriaux pour devenir une référence sur vos marchés."
        description="Chaque hub clarifie une question marché précise, relie les contenus existants et oriente vers des décisions concrètes côté visibilité, équipe et croissance."
      />
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {marketHubs.map((hub) => (
          <ListingCard
            key={hub.slug}
            href={`/market-hubs/${hub.slug}`}
            title={hub.title}
            description={hub.description}
            meta={`${hub.kicker} · ${hub.primaryKeyword}`}
          />
        ))}
      </section>
    </>
  );
}

