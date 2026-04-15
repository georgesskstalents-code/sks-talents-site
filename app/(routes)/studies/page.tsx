import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import { ecosystemStudy } from "@/data/ecosystemTargets";

export const metadata: Metadata = {
  title: "Etudes & insights",
  description:
    "Les études et insights SKS TALENTS pour relier recrutement spécialisé, signaux marché, écoles, funding, Seed, Série A, Série B et dynamiques sectorielles."
};

export default function StudiesPage() {
  return (
    <>
      <PageHero
        kicker="Études"
        title="Des analyses éditoriales pour nourrir la lecture du marché."
        description="Un espace pour publier vos études signatures, vos benchmarks et vos lectures sectorielles, puis les relier aux pages métiers, ressources, écosystèmes et signaux Seed, Série A ou Série B."
        variant="ink"
      />
      <section className="container-shell -mt-2 pb-2">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog/recrutement-apres-seed-serie-a-serie-b"
            className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            Seed / Série A / Série B
          </Link>
          <Link
            href={`/studies/${ecosystemStudy.slug}`}
            className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            Étude signature 2026
          </Link>
          <Link
            href="/ecosystem"
            className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            Voir l’écosystème
          </Link>
          <Link
            href="/comparatifs"
            className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            Comparatifs
          </Link>
          <Link
            href="/media-kit"
            className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-stone transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            Media kit
          </Link>
        </div>
      </section>
      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Link href={`/studies/${ecosystemStudy.slug}`} className="card-surface block p-8 transition hover:-translate-y-1">
            <p className="eyebrow">Signature</p>
            <h2 className="font-display text-4xl text-brand-ink">{ecosystemStudy.title}</h2>
            <p className="mt-4 text-lg leading-8 text-brand-stone">{ecosystemStudy.subtitle}</p>
          </Link>
          <Link href="/blog/recrutement-apres-seed-serie-a-serie-b" className="card-surface block p-8 transition hover:-translate-y-1">
            <p className="eyebrow">Growth</p>
            <h2 className="font-display text-4xl text-brand-ink">Quels recrutements après une levée Seed, Série A ou Série B ?</h2>
            <p className="mt-4 text-lg leading-8 text-brand-stone">
              Une page pivot pour relier financement, structuration d’équipe, rôles prioritaires et
              rythme de recrutement sur les marchés Life Sciences & Animal Health.
            </p>
          </Link>
        </div>
      </section>
      <section className="container-shell pb-8">
        <InlineLeadForm
          title="Recevoir un rappel à partir de nos études"
          description="Si vous cherchez un partenaire capable d’articuler contenu, crédibilité sectorielle et recrutement, cette entrée est faite pour vous."
          role="Direction / Talent"
          sector="Life Sciences"
          compact
        />
      </section>
    </>
  );
}
