import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import { animalHealthHub, getSectorPage } from "@/data/sectors";

const categorySlug = "petfood";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSectorPage("animal-health", categorySlug, slug);
  if (!page) return {};
  const url = `https://www.skstalents.fr/animal-health/petfood/${slug}`;
  const title = `${page.title} : recrutement petfood`;
  const description = page.summary.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "SKS TALENTS" }
  };
}


export function generateStaticParams() {
  return ["premium", "innovation"].map((slug) => ({ slug }));
}

export default async function PetfoodDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSectorPage("animal-health", categorySlug, slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHero kicker={animalHealthHub.title} title={page.title} description={page.summary} />
      <section className="container-shell py-8">
        <div className="card-surface max-w-4xl p-8">
          <p className="text-base leading-8 text-brand-stone">
            Cette page sectorielle peut porter une promesse premiumisation, innovation nutritionnelle
            et accompagnement dirigeant.
          </p>
        </div>
      </section>
      <ContentPageSignature description="Page sectorielle SKS TALENTS sur le petfood pour connecter premiumisation, innovation, talents business et décisions de croissance." />
    </>
  );
}
