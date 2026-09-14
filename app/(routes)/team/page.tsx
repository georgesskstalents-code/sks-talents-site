import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import CalendlyButton from "@/components/CalendlyButton";
import { proof, proofLabels } from "@/data/proof";

export const metadata: Metadata = {
  title: "Georges Kengue, fondateur",
  description:
    "Georges Kengue a fondé SKS Talents, cabinet executive search Life Sciences et santé animale. Parcours, méthode et repères de satisfaction.",
  alternates: { canonical: "https://www.skstalents.fr/team" }
};

export default function TeamPage() {
  const ecosystemPartners = [
    {
      name: "France Biotech",
      href: "https://france-biotech.fr/",
      logoPath: "/images/partners/france-biotech.svg",
      description: "Un réseau clé pour lire les signaux healthtech, relier innovation et recrutement, et ancrer notre positionnement sectoriel."
    },
    {
      name: "Université Paris-Saclay",
      href: "http://www.universite-paris-saclay.fr",
      logoPath: "/images/partners/universite-paris-saclay.svg",
      description: "Un repère académique majeur pour les viviers biotech, santé, sciences du vivant et innovation scientifique."
    }
  ];

  return (
    <>
      <PageHero
        kicker="Équipe"
        title="Une expertise de niche pour des recrutements exigeants."
        description="SKS TALENTS se positionne comme un cabinet spécialisé capable d’articuler connaissance sectorielle, approche humaine et exigence opérationnelle."
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Équipe & expertise" }
        ]}
      />
      <SectionShell
        eyebrow="Fondateur"
        title="Un positionnement construit autour de la spécialisation."
        description="Le cœur de la promesse SKS TALENTS: comprendre des marchés techniques avant de prétendre recruter pour eux."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8">
            <p className="text-sm leading-8 text-brand-stone">
              Georges Kengue a construit SKS TALENTS après un master Responsable Ressources Humaines à
              l’IGS Paris, un passage en multinationales puis plusieurs années dans un cabinet
              anglophone de chasse de talents. Cette trajectoire nourrit une lecture très concrète des
              marchés scientifiques et techniques.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-stone">
              Le cabinet accompagne aujourd’hui les entreprises en Life Sciences, diagnostic, santé animale,
              medtech et petfood avec une approche qui combine mapping marché, cadrage des rôles et
              conversion de candidats rares.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              <li>{proof.placementsLabel} réussis sur des marchés spécialisés.</li>
              <li>{proof.firstShortlistLabel} pour une première shortlist sur les missions bien cadrées.</li>
              <li>De l’intake à la signature : {proof.intakeToSignature}.</li>
              <li>{proofLabels.trustpilotSentence} publics, comme repère externe de satisfaction.</li>
            </ul>
            <div className="mt-6">
              <CalendlyButton label="Découvrir la page rejoignez-nous" href="/rejoignez-nous" tone="outline" />
            </div>
          </div>
          <div className="card-surface flex flex-col p-8">
            <p className="eyebrow">Expertise</p>
            <h2 className="font-display text-4xl text-brand-ink">Ce qui fait la différence.</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Lecture croisée des métiers, des secteurs et des bassins de talents.</li>
              <li>Conversion pensée pour les dirigeants, RH et candidats de niche.</li>
              <li>Contenus sectoriels conçus pour rassurer avant la prise de contact.</li>
            </ul>
            <div className="mt-8 overflow-hidden rounded-[28px] border border-brand-teal/10 bg-brand-mint/40 p-3">
              <img
                src="/images/georges-kengue.jpeg"
                alt="Georges Kengue"
                className="h-full w-full rounded-[22px] object-cover"
              />
            </div>
          </div>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Écosystème"
        title="Une expertise renforcée par des partenaires repères."
        description="La crédibilité SKS TALENTS se construit aussi dans sa proximité avec les réseaux qui structurent les viviers, l’innovation et les conversations du secteur."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {ecosystemPartners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface block p-8 transition hover:-translate-y-1"
            >
              <div className="flex min-h-[120px] items-center justify-center rounded-[24px] border border-brand-teal/10 bg-white px-6 py-6">
                <img
                  src={partner.logoPath}
                  alt={partner.name}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <h3 className="mt-5 font-display text-3xl text-brand-ink">{partner.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{partner.description}</p>
            </a>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="À lire ensuite"
        title="Notre mission, expliquée comme un parcours de décision."
        description="Si vous voulez comprendre non seulement qui nous sommes, mais comment nous créons de la valeur pour un dirigeant ou un DRH, la page mission prolonge logiquement cette lecture."
      >
        <div className="card-surface grid gap-4 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="text-sm leading-7 text-brand-stone">
            Vous y trouverez notre positionnement, les problèmes que nous adressons, notre méthode, la valeur créée, notre différence et un parcours client simple à suivre.
          </p>
          <CalendlyButton label="Voir Notre Mission" href="/mission" tone="outline" />
        </div>
      </SectionShell>
    </>
  );
}
