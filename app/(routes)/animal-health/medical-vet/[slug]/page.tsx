import { notFound } from "next/navigation";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import { animalHealthHub, getSectorPage } from "@/data/sectors";

const categorySlug = "medical-vet";

export function generateStaticParams() {
  return ["pharma-vaccins", "biotech-animal"].map((slug) => ({ slug }));
}

export default async function MedicalVetDetailPage({
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
            Une lecture sectorielle pour clarifier les enjeux talent, les profils recherchés et le contexte marché en santé animale.
          </p>
        </div>
      </section>
      <ContentPageSignature description="Page sectorielle SKS TALENTS dédiée à la santé animale pour relier promesse marché, angles métier et conversion vers un échange qualifié." />
    </>
  );
}
