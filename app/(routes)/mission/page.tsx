import CalendlyButton from "@/components/CalendlyButton";
import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

const clientJourney = [
  {
    step: "01",
    title: "Cadrage sans flou",
    description:
      "Nous repartons du contexte business, du stade de croissance, des tensions marché et du vrai niveau d’impact attendu sur le poste."
  },
  {
    step: "02",
    title: "Lecture marché ciblée",
    description:
      "Nous activons un sourcing spécialisé, un mapping utile et une narration de mission crédible pour approcher les bons profils."
  },
  {
    step: "03",
    title: "Sélection orientée décision",
    description:
      "Nous ne présentons pas des CV en volume. Nous filtrons, comparons et mettons en perspective ce qui aide un dirigeant à décider vite et bien."
  },
  {
    step: "04",
    title: "Sécurisation dans le temps",
    description:
      "L’intégration, la coordination avec les managers et la structuration RH comptent autant que la signature pour éviter les erreurs coûteuses."
  }
];

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
        eyebrow="Problème"
        title="Les entreprises ne souffrent pas d’un manque de CV. Elles souffrent d’un manque de clarté, de temps et de marge d’erreur."
        description="Dans les secteurs régulés ou techniques, un poste mal calibré ou mal pourvu produit des coûts invisibles mais immédiats."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Croissance ralentie", "Le poste reste vacant et les projets critiques avancent moins vite."],
            ["Managers saturés", "Les équipes absorbent la charge et perdent du temps sur le court terme."],
            ["Message marché faible", "Le rôle est mal raconté, donc les bons profils ne se projettent pas."],
            ["Erreur plus coûteuse", "Dans les Life Sciences et l’Animal Health, une mauvaise embauche coûte du temps, de la crédibilité et de l’énergie."]
          ].map(([title, description]) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[32px] border border-brand-teal/24 bg-white/95 p-6 shadow-[0_18px_50px_rgba(24,38,48,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_24px_60px_rgba(65,160,164,0.14)]"
            >
              <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-brand-teal/20 via-brand-teal to-brand-teal/20 opacity-80" />
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Méthode"
        title="Notre manière de travailler repose sur le process, pas sur des promesses vagues."
        description="La différence SKS TALENTS se joue dans la qualité du cadrage, la lecture fine des marchés et la capacité à transformer une recherche sensible en mission pilotable."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card-surface rounded-[32px] border border-brand-teal/20 p-8 shadow-[0_20px_55px_rgba(24,38,48,0.07)]">
            <p className="eyebrow">Notre approche</p>
            <ul className="space-y-3 text-sm leading-7 text-brand-stone">
              <li>Cadrage rapide et honnête du besoin, du niveau de rareté et du timing réaliste.</li>
              <li>Brief challengé pour éviter les fiches de poste trop larges ou trop abstraites.</li>
              <li>Sourcing spécialisé, mapping marché et lecture des alternatives crédibles.</li>
              <li>Expérience candidat premium pour soutenir la conversion des profils rares.</li>
              <li>Suivi d’intégration et logique de structuration quand le besoin dépasse le simple recrutement.</li>
            </ul>
          </div>
          <div className="grid gap-4">
            {clientJourney.map((item) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-[32px] border border-brand-teal/22 bg-white/95 p-6 shadow-[0_18px_50px_rgba(24,38,48,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-teal/38 hover:shadow-[0_24px_60px_rgba(65,160,164,0.14)]"
              >
                <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-brand-teal/15 via-brand-teal/85 to-brand-teal/15 opacity-80" />
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-brand-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-brand-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Valeur créée"
        title="Ce que les clients gagnent est concret : vitesse, lisibilité, crédibilité et meilleure exécution."
        description="La valeur ne se mesure pas seulement au fait de recruter. Elle se mesure à ce que l’entreprise évite, accélère ou débloque grâce à une décision juste."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Un meilleur time-to-hire", "Quand le besoin est bien cadré, les premiers profils pertinents arrivent plus vite."],
            ["Une shortlist plus crédible", "Les candidats présentés sont comparables entre eux et lisibles pour un comité de décision."],
            ["Une meilleure conversion", "Le rôle est raconté de façon plus juste, donc les bons profils se projettent davantage."],
            ["Une trajectoire plus stable", "Recrutement, onboarding et structuration sont reliés pour éviter les erreurs à répétition."]
          ].map(([title, description]) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[32px] border border-brand-teal/24 bg-white/95 p-6 shadow-[0_18px_50px_rgba(24,38,48,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_24px_60px_rgba(65,160,164,0.14)]"
            >
              <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-brand-teal/20 via-brand-teal to-brand-teal/20 opacity-80" />
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{description}</p>
            </div>
          ))}
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
        eyebrow="Parcours client"
        title="Collaborer avec SKS TALENTS doit être simple, lisible et rassurant."
        description="L’objectif est que chaque client comprenne très vite ce qui va se passer, ce qui est attendu et à quoi ressemble le prochain pas."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Diagnostic", "Nous clarifions le besoin, le contexte, l’urgence et le niveau de confidentialité."],
            ["Priorisation", "Nous définissons ce qu’il faut ouvrir, ce qu’il faut challenger et ce qui relève d’un arbitrage de direction."],
            ["Exécution", "Nous pilotons la recherche, les retours marché, les entretiens et la shortlist."],
            ["Décision", "Nous aidons à comparer, sécuriser l’offre et préparer l’intégration ou la suite de structuration."]
          ].map(([title, description]) => (
            <div key={title} className="card-surface p-6">
              <h3 className="font-display text-3xl text-brand-ink">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{description}</p>
            </div>
          ))}
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
