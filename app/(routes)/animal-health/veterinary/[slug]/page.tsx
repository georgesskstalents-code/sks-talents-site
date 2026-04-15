import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { animalHealthHub, getSectorPage } from "@/data/sectors";

const categorySlug = "veterinary";

export function generateStaticParams() {
  return ["cliniques", "diagnostic-vet", "telemedicine"].map((slug) => ({ slug }));
}

export default async function VeterinaryDetailPage({
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
            Le contenu détaillé pourra être enrichi avec cas d’usage, benchmarks de staffing et CTA.
          </p>
        </div>
      </section>
    </>
  );
}
