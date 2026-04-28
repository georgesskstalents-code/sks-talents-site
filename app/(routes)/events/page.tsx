import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { events } from "@/data/resources";
import { getNotionSiteContentList, mapNotionEntryToResourceItem } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const notionEvents = await getNotionSiteContentList("event", 100);
  const mergedEvents = Array.from(
    new Map(
      [...events, ...notionEvents.map(mapNotionEntryToResourceItem)].map((item) => [item.slug, item])
    ).values()
  );

  return (
    <>
      <PageHero
        kicker="Événements"
        title="Les salons et rendez-vous qui structurent vos marchés."
        description="Chaque page événement renforce la présence du site dans l’écosystème et nourrit les contenus de preuve sociale, de veille et de networking."
        variant="teal"
      />
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {mergedEvents.map((item) => (
          <ListingCard
            key={item.slug}
            href={`/events/${item.slug}`}
            title={item.title}
            description={item.summary}
            meta={`${item.sector} · ${item.location} · ${item.dateLabel}`}
          />
        ))}
      </section>
    </>
  );
}
