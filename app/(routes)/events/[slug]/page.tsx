import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { events } from "@/data/resources";

export function generateStaticParams() {
  return events.map((item) => ({ slug: item.slug }));
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = events.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <PageHero
        kicker={`${item.sector} · ${item.location}`}
        title={item.title}
        description={item.summary}
      />
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Pourquoi suivre cet événement</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              {item.title} est un bon point d’observation pour repérer les dynamiques d’innovation,
              les signaux d’investissement et les besoins de recrutement qui se dessinent dans le secteur.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Cette page peut accueillir un angle éditorial, un debrief marché, ou une sélection de
              profils et décideurs à rencontrer.
            </p>
          </div>
          <div className="card-surface p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {item.dateLabel}
            </p>
            <h2 className="mt-4 font-display text-3xl">Opportunités de contenu</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Avant l’événement: tendances marché, profils en tension et angles de préparation.</li>
              <li>Pendant: insights terrain, networking et contenus courts pour LinkedIn ou blog.</li>
              <li>Après: synthèse des enseignements et opportunités de recrutement à ouvrir.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
