import Link from "next/link";
import PageHero from "@/components/PageHero";
import { comparisons } from "@/data/comparisons";

export default function ComparisonsPage() {
  return (
    <>
      <PageHero
        kicker="Comparatifs"
        title="Des pages comparatives pour répondre aux requêtes à forte intention."
        description="Comparer plutôt que lister: c’est un levier utile pour le SEO, pour la pédagogie et pour la conversion sur des sujets spécialisés."
        variant="teal"
      />
      <section className="container-shell grid gap-6 py-4 md:grid-cols-3">
        {[
          ["Entreprises", "Comparer un acteur financé, un groupe établi ou un écosystème plus généraliste."],
          ["Rôles", "Comparer deux fonctions proches: application vs maintenance, NGS vs bioinfo clinique, export vs business unit."],
          ["Salaires", "Comparer les ordres de grandeur, les niveaux de tension et les trajectoires de carrière selon les marchés."]
        ].map(([title, copy]) => (
          <div key={title} className="card-surface p-8">
            <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
          </div>
        ))}
      </section>
      <section className="container-shell grid gap-6 py-8 md:grid-cols-2">
        {comparisons.map((item) => (
          <Link
            key={item.slug}
            href={`/comparatifs/${item.slug}`}
            className="card-surface block p-8 transition hover:-translate-y-1"
          >
            <p className="eyebrow">{item.heroKicker}</p>
            <h2 className="font-display text-4xl text-brand-ink">{item.title}</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{item.description}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
