import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import ListingCard from "@/components/ListingCard";
import PageHero from "@/components/PageHero";
import { marketHubs } from "@/data/marketHubs";

export function generateStaticParams() {
  return marketHubs.map((hub) => ({ slug: hub.slug }));
}

export default async function MarketHubDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = marketHubs.find((entry) => entry.slug === slug);

  if (!hub) {
    notFound();
  }

  return (
    <>
      <PageHero
        kicker={hub.kicker}
        title={hub.title}
        description={hub.description}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
          { label: "Hubs de référence", href: "/market-hubs" },
          { label: hub.title }
        ]}
      />
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Mot-clé principal
            </p>
            <h2 className="mt-3 font-display text-4xl text-brand-ink">{hub.primaryKeyword}</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{hub.summary}</p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Audience visée : {hub.audience}. Ce hub doit être mis à jour régulièrement pour
              rester une page de référence et servir de point d’entrée à plusieurs contenus satellites.
            </p>
          </div>
          <div className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Angles à couvrir
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              {hub.angles.map((angle) => (
                <li key={angle}>• {angle}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="container-shell grid gap-6 py-4 md:grid-cols-3">
        {hub.internalLinks.map((link) => (
          <ListingCard
            key={link.href}
            href={link.href}
            title={link.label}
            description={`Page reliée au hub ${hub.title} pour renforcer maillage, temps passé et conversion.`}
            meta="Lien interne clé"
          />
        ))}
      </section>
      <ContentPageSignature description="Hub de référence édité par SKS TALENTS pour aider dirigeants et équipes RH à lire rapidement un marché et identifier les bons interlocuteurs." />
    </>
  );
}
