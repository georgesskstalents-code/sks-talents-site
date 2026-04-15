import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import SectionShell from "@/components/SectionShell";
import { investmentFunds, trackedInvestmentFundsDirectory } from "@/data/investmentFunds";

export default function InvestmentFundsPage() {
  return (
    <>
      <PageHero
        kicker="Investment Funds"
        title="Profils de fonds et d’écosystèmes financés, version vérifiée"
        description="Une première base production-safe sur les fonds et plateformes d’investissement à fort impact biotech, healthtech et deep tech, avec un angle clair sur les tours Seed, Série A et Série B, là où se déclenchent souvent les recrutements critiques en direction, production, opérations, sales et ingénierie."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
          { label: "Investment funds" }
        ]}
      />
      <section className="container-shell grid gap-6 py-4 lg:grid-cols-2">
        <a
          href="https://france-biotech.fr/wp-content/uploads/2025/01/Cartographie-des-fonds-dinvestissement-francais-en-sante-en-2024-Synthese-1.pdf"
          target="_blank"
          rel="noreferrer noopener"
          className="card-surface block p-6 transition hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Source sectorielle</p>
          <h2 className="mt-3 font-display text-3xl text-brand-ink">Cartographie France Biotech des fonds santé</h2>
          <p className="mt-4 text-sm leading-7 text-brand-stone">
            Référence utile pour structurer les pages fonds, qualifier l’écosystème français en santé
            et enrichir les contenus SEO sans inventer de signaux hiring non sourcés.
          </p>
        </a>
        <a
          href="https://www.leadersleague.com/fr/classements/sante-pharma-and-biotechnologies-fonds-lbo-sante-fonds-d-investissement-france-2025"
          target="_blank"
          rel="noreferrer noopener"
          className="card-surface block p-6 transition hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Signal marché</p>
          <h2 className="mt-3 font-display text-3xl text-brand-ink">Leaders League · fonds santé 2025</h2>
          <p className="mt-4 text-sm leading-7 text-brand-stone">
            Source complémentaire pour situer les acteurs visibles du private equity et des fonds
            santé, à manier comme repère de marché et non comme preuve unique de performance.
          </p>
        </a>
      </section>
      <SectionShell
        eyebrow="Verified Data"
        title="Une base exploitable pour générer du contenu SEO sans hallucination"
        description="Chaque profil s’appuie sur des sources primaires officielles et une méthode stricte: pas de chiffre hiring inventé, pas de partenariat affirmé sans preuve, et distinction nette entre fait, estimation et inférence."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {investmentFunds.map((fund) => (
            <ListingCard
              key={fund.slug}
              href={`/investment-funds/${fund.slug}`}
              title={fund.name}
              description={fund.seo.description}
              meta={fund.organizationType}
            />
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Intentions de recherche"
        title="Ce hub doit capter les requêtes fonds, entreprises financées, Seed, Série A, Série B et signaux hiring."
        description="L’objectif n’est pas seulement de lister des fonds, mais de devenir une ressource utile pour les dirigeants, RH et candidats qui cherchent à comprendre où se créent les besoins après un tour de table."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Top fonds santé", "Fonds biotech, medtech, animal health et initiatives corporate venture à suivre sur les phases Seed, Série A et Série B."],
            ["Entreprises financées", "Pages liées aux sociétés en croissance, à leurs segments et à leurs fonctions stratégiques en direction, production, opérations, sales et ingénierie."],
            ["Actualisation régulière", "France Biotech, Leaders League, Bpifrance, Angels Santé et autres sources officielles servent de base de refresh mensuel."]
          ].map(([title, copy]) => (
            <div key={title} className="card-surface p-8">
              <h2 className="font-display text-3xl text-brand-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Annuaire de fonds"
        title="Fonds à suivre dans la santé, les life sciences et l’animal health"
        description="Liste de travail bâtie à partir des noms visibles dans la synthèse publique France Biotech 2024, enrichie avec Angels Santé et Companion Fund II. Chaque entrée renvoie vers le site officiel du gestionnaire ou de l’initiative, avec un intérêt particulier pour les tours Seed, Série A et Série B qui structurent la croissance."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trackedInvestmentFundsDirectory.map((fund) => (
            <a
              key={`${fund.name}-${fund.manager}`}
              href={fund.href}
              target="_blank"
              rel="noreferrer noopener"
              className="card-surface block p-5 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {fund.source}
              </p>
              <h3 className="mt-3 font-display text-2xl text-brand-ink">{fund.name}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{fund.manager}</p>
              <p className="mt-4 text-sm font-semibold text-brand-teal">Ouvrir le site officiel</p>
            </a>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
