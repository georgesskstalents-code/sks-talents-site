import type { Metadata } from "next";
import Link from "next/link";
import ContentPageSignature from "@/components/ContentPageSignature";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { ecosystemCategories, ecosystemStudy } from "@/data/ecosystemTargets";

const category = ecosystemCategories.find((item) => item.slug === "associations-clusters");

export const metadata: Metadata = {
  title: "Associations, clusters et federations a suivre",
  description:
    "Les associations, clusters et fédérations qui structurent la biotech, le diagnostic, la medtech, la cosmétique et la santé animale."
};

export default function EcosystemAssociationsClustersPage() {
  if (!category) {
    return null;
  }

  return (
    <>
      <PageHero
        kicker="Écosystème"
        title="Associations, clusters et fédérations à suivre"
        description={category.description}
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Écosystème", href: "/ecosystem" },
          { label: "Associations, clusters et fédérations" }
        ]}
      />

      <SectionShell
        eyebrow="Pourquoi cette page"
        title="Les réseaux qui structurent vraiment le marché."
        description="Cette cartographie relie les fédérations, clusters et réseaux à fort impact aux sujets de visibilité, de recrutement et de compréhension marché."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {category.targets.map((target) => (
            <article key={target.name} className="card-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-3xl text-brand-ink">{target.name}</h2>
                <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                  {target.priority}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{target.angle}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                {target.sectors.join(" · ")}
              </p>
              {target.url ? (
                <a
                  href={target.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex rounded-full border border-brand-teal/20 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                >
                  Visiter le site
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="À lire aussi"
        title={ecosystemStudy.title}
        description="L’étude signature sert de pont éditorial entre la cartographie des réseaux et les signaux de marché à interpréter."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h3 className="font-display text-3xl text-brand-ink">{ecosystemStudy.subtitle}</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">{ecosystemStudy.summary}</p>
            <Link
              href={`/studies/${ecosystemStudy.slug}`}
              className="mt-5 inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Lire l’étude
            </Link>
          </div>
          <div className="card-surface p-6">
            <InlineLeadForm
              title="Recevoir un rappel sur cet écosystème"
              description="Parlez-nous de votre sujet de visibilité, de veille ou de recrutement dans cet écosystème."
              role="Direction / Talent"
              sector="Life Sciences"
              compact
            />
          </div>
        </div>
      </SectionShell>

      <ContentPageSignature description="Page écosystème éditée par SKS TALENTS pour cartographier les associations, clusters et fédérations qui comptent dans les Life Sciences et l’Animal Health." />
    </>
  );
}
