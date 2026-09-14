import type { Metadata } from "next";
import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { marketHubs } from "@/data/marketHubs";

export const metadata: Metadata = {
  title: "Bassins d'emploi Life Sciences en France",
  description:
    "Les pôles français de la biotech, de la medtech et de la santé animale : entreprises, écoles et dynamique de recrutement par territoire.",
  alternates: { canonical: "https://www.skstalents.fr/market-hubs" }
};

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

