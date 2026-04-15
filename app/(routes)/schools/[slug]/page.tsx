import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { schools } from "@/data/resources";

export function generateStaticParams() {
  return schools.map((item) => ({ slug: item.slug }));
}

export default async function SchoolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = schools.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const isVeterinarySchool = ["enva", "envt", "oniris", "vetagro-sup", "unilasalle-rouen-veterinaire"].includes(
    item.slug
  );

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
            <h2 className="font-display text-3xl">Pourquoi cette école intéresse nos clients</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              {item.title} alimente des viviers utiles pour les organisations qui recrutent sur des
              fonctions scientifiques, qualité, réglementaires, médicales ou business à forte
              technicité.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Cette page peut détailler les spécialisations les plus pertinentes, les stages,
              alternances et premiers postes qui alimentent la chaîne de talents du secteur.
            </p>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Profils souvent suivis</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Jeunes diplômés ou profils à 2-5 ans d’expérience en sortie d’écosystème école.</li>
              <li>Talents orientés R&D, qualité, affaires réglementaires ou opérations selon la spécialité.</li>
              <li>Profils business ou hybrides lorsque l’école nourrit aussi des parcours management.</li>
            </ul>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint/50"
              >
                Visiter le site officiel
              </a>
            ) : null}
          </div>
        </div>
      </section>
      {isVeterinarySchool ? (
        <section className="container-shell py-4">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card-surface flex items-center justify-center p-8">
              {item.logoUrl ? (
                <img src={item.logoUrl} alt={item.title} className="max-h-24 max-w-full object-contain" />
              ) : null}
            </div>
            <div className="card-surface p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Source officielle
              </p>
              <h2 className="mt-3 font-display text-3xl text-brand-ink">
                Une des cinq écoles qui forment des vétérinaires en France
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-stone">
                L’Ordre national des vétérinaires précise que cinq établissements de l’enseignement
                supérieur en France forment des vétérinaires : quatre écoles publiques et une école
                privée. Cette page relie l’école, le vivier de talents, les parcours étudiants et les
                débouchés business ou cliniques en santé animale.
              </p>
              <a
                href="https://www.veterinaire.fr/la-profession-veterinaire/devenir-veterinaire/les-ecoles"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint/50"
              >
                Voir la source de l’Ordre
              </a>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
