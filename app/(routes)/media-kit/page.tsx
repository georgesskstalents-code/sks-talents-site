import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Media kit",
  description:
    "Media kit SKS TALENTS pour partenaires, sponsors et annonceurs souhaitant toucher les décideurs Life Sciences, diagnostic et Animal Health."
};

export default function MediaKitPage() {
  return (
    <>
      <PageHero
        kicker="Media kit"
        title="Une audience niche pour des marques qui veulent parler au bon marché."
        description="SKS TALENTS construit un média de référence sur les métiers, les écoles, les fonds, les comparatifs et les dynamiques de recrutement dans les Life Sciences et l’Animal Health."
        variant="ink"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Media kit" }
        ]}
      />
      <SectionShell
        eyebrow="Pourquoi ici"
        title="Un environnement éditorial conçu pour capter l’intention métier."
        description="Le site ne vise pas un trafic générique. Il vise des recherches métiers, marché, école, salaire, funding et recrutement à forte valeur pour des audiences techniques et décisionnelles."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Audience", "Dirigeants, DRH, managers, candidats experts et étudiants spécialisés."],
            ["Formats", "Études, hubs sectoriels, comparatifs, fiches métiers, annuaires et pages partenaires."],
            ["Valeur", "Visibilité contextuelle, crédibilité sectorielle et environnement éditorial longue traîne."]
          ].map(([title, copy]) => (
            <div key={title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Opportunités"
        title="Des formats sponsorisables pensés pour rester utiles au lecteur."
        description="L’objectif n’est pas de vendre de la publicité intrusive, mais des emplacements et contenus cohérents avec la promesse éditoriale du site."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface p-8">
            <h2 className="font-display text-4xl text-brand-ink">Formats premium</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Études ou benchmarks co-brandés.</li>
              <li>Présence dans les hubs école, fonds, comparatifs ou métiers.</li>
              <li>Pages partenaires sectorielles contextualisées.</li>
              <li>Newsletter ou séquences de nurturing thématiques.</li>
            </ul>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-4xl text-brand-ink">Règles d’acceptation</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Priorité aux marques utiles à vos audiences cibles.</li>
              <li>Séparation claire entre contenu éditorial et partenariat.</li>
              <li>Pas de promesse chiffrée inventée ni de placement trompeur.</li>
              <li>Traçabilité des sources et liens directs vers l’annonceur quand pertinent.</li>
            </ul>
          </div>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Suite logique"
        title="Passez au détail commercial ou à la page partenaires."
        description="Le media kit pose le cadre. La page partenaires précise ensuite les offres d’intégration et de visibilité."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/partenaires-media"
            className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Voir la page partenaires
          </Link>
          <Link
            href="/studies"
            className="rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
          >
            Explorer les études
          </Link>
        </div>
      </SectionShell>
      <section className="container-shell pb-8">
        <InlineLeadForm
          title="Recevoir le media kit complet"
          description="Laissez vos coordonnées pour ouvrir une discussion sur les formats sponsorisés, études partenaires et pages de visibilité."
          role="Partenaire / annonceur"
          sector="Life Sciences"
          compact
        />
      </section>
    </>
  );
}
