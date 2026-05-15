import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export default function MissionPage() {
  return (
    <>
      <PageHero
        kicker="Notre Mission"
        title="Sécuriser les décisions critiques de recrutement et de structuration dans les marchés exigeants."
        description="SKS TALENTS aide les dirigeants, DRH et équipes de direction à transformer un besoin flou ou risqué en décision lisible, exécutable et durable."
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Qui sommes-nous", href: "/about" },
          { label: "Notre Mission" }
        ]}
      />

      <SectionShell
        eyebrow="Positionnement"
        title="Nous ne recrutons pas seulement. Nous sécurisons des décisions critiques de croissance."
        description="Notre mission est simple : aider les entreprises Life Sciences, Animal Health, Diagnostic, MedTech et Petfood à prendre de meilleures décisions talent dans des contextes où le coût de l’erreur est trop élevé."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8">
            <p className="text-base leading-8 text-brand-stone">
              Un recrutement critique ne ralentit pas seulement une équipe. Il peut décaler une
              roadmap, fragiliser une levée, retarder une mise sur le marché, épuiser un management
              ou compliquer une phase de scale. C’est précisément là que SKS TALENTS intervient.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Notre mission consiste à réduire cette incertitude avec une lecture croisée du marché,
              des métiers, des bassins de talents, du stade de croissance et des attentes réelles
              des dirigeants.
            </p>
          </div>
          <div className="card-surface rounded-[32px] border border-brand-teal/20 p-8 shadow-[0_20px_55px_rgba(24,38,48,0.07)]">
            <p className="eyebrow">En clair</p>
            <div className="space-y-4 text-sm leading-7 text-brand-stone">
              <p>Nous intervenons quand un poste pèse sur l’exécution, la crédibilité ou la croissance.</p>
              <p>Nous cadrons le besoin, clarifions le niveau de rareté et sécurisons la trajectoire de recherche.</p>
              <p>Nous relions enfin recrutement, structuration RH et capacité réelle de l’entreprise à tenir l’échelle.</p>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Différenciation"
        title="Ce qui rend SKS TALENTS différent tient moins à un discours qu’à une discipline d’exécution."
        description="Nous assumons un positionnement de niche, parce que la spécialisation crée de la confiance et une meilleure qualité de décision."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-8">
            <p className="eyebrow">Ce que nous faisons différemment</p>
            <ul className="space-y-3 text-sm leading-7 text-brand-stone">
              <li>Nous partons des marchés et des métiers avant de parler d’outils ou de volume.</li>
              <li>Nous relions recrutement, signaux écosystème, écoles, fonds, contenus et structuration.</li>
              <li>Nous écrivons et organisons le site comme une base utile pour dirigeants, RH et candidats, pas comme une vitrine vide.</li>
              <li>Nous privilégions la lisibilité d’une mission à la promesse artificielle d’un recrutement facile.</li>
            </ul>
          </div>
          <div className="card-surface p-8">
            <p className="eyebrow">Preuves de crédibilité</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["100+", "placements"],
                ["10 jours", "1re shortlist"],
                ["4.5/5", "Trustpilot"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/35 p-5">
                  <p className="font-display text-4xl text-brand-teal">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-stone">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-brand-stone">
              Cette crédibilité se renforce aussi par notre proximité avec France Biotech,
              l’Université Paris-Saclay, des contenus sectoriels utiles et des références concrètes
              visibles sur le site.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Prochaine étape"
        title="Si votre besoin est critique, le meilleur moment pour le cadrer est maintenant."
        description="Vous pouvez prendre un rendez-vous, demander un rappel ou continuer à explorer nos services, références et contenus sectoriels."
      >
        <div className="card-surface grid gap-6 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl text-brand-ink">
              Parlons de votre besoin, de votre contexte et de la meilleure trajectoire.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-stone">
              Un échange court suffit pour savoir si le sujet relève d’un recrutement prioritaire,
              d’un RPO, d’une structuration RH ou d’un besoin de clarification plus large.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CalendlyButton label="Réserver un call" tone="solid" />
            <CalendlyButton label="Être rappelé" href="/contact#rappel" tone="outline" />
            <CalendlyButton label="Voir nos services" href="/services" tone="ghost" />
          </div>
        </div>
      </SectionShell>

      <ContentPageSignature
        title="SKS Talents"
        description="Notre mission : relier lecture marché, recrutement critique, structuration RH et exécution pour aider les dirigeants à décider avec plus de clarté."
      />
    </>
  );
}
