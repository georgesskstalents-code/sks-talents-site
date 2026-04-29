import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Nos services"
        title="Executive search, RPO, onboarding et structuration RH."
        description="Trois offres complémentaires pour sécuriser vos recrutements critiques, absorber un volume de hiring exigeant et bâtir un cadre people robuste."
      />
      <ServicesSection />
      {false && (
        <section className="container-shell py-8 pb-16">
          <div className="card-surface bg-grain p-8 sm:p-10">
            <p className="eyebrow">Focus digital</p>
            <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
              Decouvrir la page service website
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone sm:text-lg">
              Une page premium dediee a la presentation de l'offre website, avec 8 sections, design
              conversion et narration orientee preuve, process et packages.
            </p>
            <Link
              href="/services/website"
              className="mt-8 inline-flex rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Ouvrir la page /services/website
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
