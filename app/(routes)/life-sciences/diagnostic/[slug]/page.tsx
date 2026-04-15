import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getSectorPage, lifeSciencesHub } from "@/data/sectors";

const categorySlug = "diagnostic";

export function generateStaticParams() {
  return ["ivd-testing", "ai-diagnostics", "genomics-ngs"].map((slug) => ({ slug }));
}

export default async function DiagnosticDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSectorPage("life-sciences", categorySlug, slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHero kicker={lifeSciencesHub.title} title={page.title} description={page.summary} />
      <section className="container-shell py-8">
        <div className="card-surface max-w-4xl p-8">
          <p className="text-base leading-8 text-brand-stone">
            Le gabarit détail permet d’ajouter un angle métier, des mots-clés spécifiques, des
            preuves clients et un parcours de conversion plus fin.
          </p>
        </div>
      </section>
    </>
  );
}
