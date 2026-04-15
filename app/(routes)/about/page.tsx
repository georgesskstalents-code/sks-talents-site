import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Qui sommes-nous"
        title="Plus de 10 ans au service des marchés scientifiques et animal health."
        description="SKS TALENTS aide les entreprises à recruter des leaders et à structurer des organisations RH solides sur des environnements où la crédibilité marché compte autant que l’exécution."
      />
      <SectionShell
        eyebrow="Notre histoire"
        title="Un cabinet de niche, pensé pour les secteurs où l’à-peu-près coûte cher."
        description="Depuis plus d’une décennie, nous accompagnons des laboratoires, scale-ups, groupes de diagnostic, réseaux vétérinaires et marques petfood premium."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["100+", "placements réussis"],
            ["13", "case studies partenaires"],
            ["2", "expertises structurantes"]
          ].map(([value, label]) => (
            <div key={label} className="card-surface p-8">
              <p className="font-display text-5xl text-brand-teal">{value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-brand-stone">{label}</p>
            </div>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
