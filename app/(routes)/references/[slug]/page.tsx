import { notFound } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";
import PageHero from "@/components/PageHero";
import { references } from "@/data/references";

export function generateStaticParams() {
  return references.map((reference) => ({ slug: reference.slug }));
}

export default async function ReferenceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reference = references.find((entry) => entry.slug === slug);

  if (!reference) {
    notFound();
  }

  return (
    <>
      <PageHero
        kicker={reference.category}
        title={reference.company}
        description={reference.summary}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Références", href: "/references" },
          { label: reference.company }
        ]}
      />
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Contexte de mission</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{reference.summary}</p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              L’accompagnement SKS TALENTS combine en général cadrage du besoin, calibration du
              marché et sécurisation de l’expérience candidat sur les rôles les plus sensibles.
            </p>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Impact observé</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{reference.impact}</p>
            {reference.descriptor ? (
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {reference.descriptor}
              </p>
            ) : null}
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Gain de lisibilité sur la proposition employeur et le niveau d’exigence du mandat.</li>
              <li>Meilleur ciblage des profils et conversations plus qualifiées avec le marché.</li>
              <li>Maillage possible vers secteur, article et preuve sociale associés.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {reference.website ? (
                <a
                  href={reference.website}
                  className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Visiter le site
                </a>
              ) : null}
              <CalendlyButton
                label="Être rappelé"
                href="/contact#rappel"
                tone="outline"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
