import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

const publications = [
  {
    title: "Étude SKS TALENTS 2026",
    description:
      "Un actif éditorial pour commenter les tensions de recrutement dans les Life Sciences et l’Animal Health.",
    href: "/studies/recrutement-life-sciences-animal-health-2026"
  },
  {
    title: "Écosystème & réseaux",
    description: "Une cartographie des clusters, écoles, fonds et événements à relier à la marque.",
    href: "/ecosystem"
  },
  {
    title: "Trustpilot SKS TALENTS",
    description:
      "La preuve sociale déjà visible pour rassurer journalistes, partenaires et prospects.",
    href: "https://fr.trustpilot.com/review/skstalents.fr"
  }
];

export default function PressPage() {
  return (
    <>
      <PageHero
        kicker="Presse"
        title="Interventions, publications et prises de parole."
        description="Une page pensée pour centraliser les actifs de marque utiles aux journalistes, partenaires, speakers et moteurs de recherche."
        variant="ink"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Presse & publications" }
        ]}
      />
      <SectionShell
        eyebrow="À relayer"
        title="Les actifs les plus faciles à citer aujourd’hui."
        description="Cette base peut ensuite être enrichie avec podcasts, interviews, conférences et tribunes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {publications.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="card-surface block p-6 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Publication</p>
              <h2 className="font-display text-3xl text-brand-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
            </a>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
