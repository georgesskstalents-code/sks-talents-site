import type { Metadata } from "next";
import Link from "next/link";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Partenaires & sponsorings",
  description:
    "Formats partenaires et sponsorings SKS TALENTS pour les acteurs Life Sciences, diagnostic, santé animale, medtech et petfood."
};

export default function PartnersMediaPage() {
  return (
    <>
      <PageHero
        kicker="Partenaires & sponsorings"
        title="Des partenariats éditoriaux pour les marques qui veulent une visibilité qualifiée."
        description="SKS TALENTS prépare un environnement de visibilité pensé pour des entreprises qui veulent être vues dans un contexte utile, crédible et aligné avec les recherches métier."
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Partenaires & sponsorings" }
        ]}
      />
      <SectionShell
        eyebrow="Offres"
        title="Trois niveaux de présence possibles."
        description="Les offres sont conçues pour rester utiles au lecteur tout en créant une vraie valeur business pour les entreprises visibles sur le site."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Partenaire d’écosystème",
              copy: "Présence dans les hubs réseaux, écoles, fonds ou écosystèmes avec lien direct et contexte éditorial."
            },
            {
              title: "Partenaire étude",
              copy: "Co-branding ou sponsorisation d’une étude/benchmark sur un sujet à forte recherche organique."
            },
            {
              title: "Partenaire visibilité",
              copy: "Intégration dans les pages à trafic métier élevé: fiches postes, comparatifs, benchmarks salaires ou hubs sectoriels."
            }
          ].map((item) => (
            <div key={item.title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Critères"
        title="Ce que nous cherchons chez un partenaire."
        description="L’objectif est d’élever la qualité perçue du site, pas de la diluer."
      >
        <div className="card-surface p-8">
          <ul className="grid gap-3 text-sm leading-7 text-brand-stone md:grid-cols-2">
            <li>Marque cohérente avec Life Sciences, diagnostic, medtech ou Animal Health.</li>
            <li>Intérêt réel pour l’audience: métiers, innovation, formation, outil ou marché.</li>
            <li>Capacité à fournir des informations vérifiables et des liens officiels.</li>
            <li>Respect d’un balisage clair quand un contenu est sponsorisé.</li>
          </ul>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Pages fortes"
        title="Les hubs qui capteront l’intention de recherche."
        description="C’est sur ces blocs éditoriaux que la monétisation long terme devient crédible."
      >
        <div className="flex flex-wrap gap-3">
          {[
            ["/job-roles", "Fiches métiers"],
            ["/salary-benchmarks", "Benchmarks salaires"],
            ["/investment-funds", "Fonds d’investissement"],
            ["/schools", "Écoles"],
            ["/comparatifs", "Comparatifs"],
            ["/studies", "Études"]
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
            >
              {label}
            </Link>
          ))}
        </div>
      </SectionShell>
      <section className="container-shell pb-8">
        <InlineLeadForm
          title="Parler sponsoring, partenariat ou étude co-brandée"
          description="Déposez votre besoin. SKS TALENTS vous recontacte pour qualifier le format, la cible et la logique éditoriale."
          role="Partenaire media"
          sector="Life Sciences"
          compact
        />
      </section>
    </>
  );
}
