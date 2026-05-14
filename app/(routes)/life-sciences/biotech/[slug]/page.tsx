import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import { getSectorPage, lifeSciencesHub } from "@/data/sectors";

const categorySlug = "biotech";

export function generateStaticParams() {
  return ["arn-therapies", "deeptech-startups"].map((slug) => ({ slug }));
}

export default async function BiotechDetailPage({
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
            Une lecture sectorielle biotech pour clarifier les enjeux talent, les fonctions clés
            et les besoins de structuration après une levée ou un changement d’étape.
          </p>
        </div>
      </section>
      <ContentPageSignature description="Page sectorielle SKS TALENTS sur la biotech pour relier innovation, financement, recrutement critique et structuration d’équipe." />
    </>
  );
}
