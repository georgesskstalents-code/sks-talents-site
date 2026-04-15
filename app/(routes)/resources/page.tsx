import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import ListingCard from "@/components/ListingCard";
import ExternalLinkGrid from "@/components/ExternalLinkGrid";
import {
  associationsAndNetworks,
  clustersAndIncubators,
  events,
  financialPartners,
  institutionalPartners,
  mediaPartners,
  newsHubs,
  schools,
  veterinaryOfficialResources
} from "@/data/resources";
import { ecosystemStudy } from "@/data/ecosystemTargets";
import { trackedInvestmentFundsDirectory } from "@/data/investmentFunds";

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        kicker="Les ressources"
        title="Des hubs éditoriaux conçus pour capter les recherches à forte valeur."
        description="Salaires, fiches métiers, fonds, écoles, comparatifs et insights marché structurés comme des pages de référence à mettre à jour régulièrement, avec un focus sur les entreprises en Seed, Série A et Série B."
      />
      <SectionShell
        eyebrow="Éditorial"
        title="Des contenus pensés par persona, secteur et topic."
        description="La structure proposée permet de faire vivre plus de 50 articles, 35 fiches métiers et plusieurs hubs thématiques, notamment sur les recrutements critiques qui suivent une levée Seed, Série A ou Série B."
      >
        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Salaires", "Benchmarks par rôle, secteur, géographie et stade Seed / Série A / Série B."],
            ["Métiers", "Fiches de poste longues traînes, fonctions pénuriques et rôles ouverts après levée."],
            ["Fonds", "Top biotech companies, VC santé et écosystèmes financés en Seed, Série A ou Série B."],
            ["Écoles", "Pipelines talents, orientation et bassins académiques."],
            ["Comparatifs", "Requêtes à forte intention pour convertir plus vite sur des marchés en croissance."]
          ].map(([title, copy]) => (
            <div key={title} className="card-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{title}</p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{copy}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ListingCard
            href="/orientation"
            title="Orientez-vous"
            description="Un parcours étudiant pour clarifier 2 à 3 métiers plausibles, et une entrée “bilan de carrière” pour les professionnels déjà en poste."
            meta="Orientation"
          />
          <ListingCard
            href="/calcul-salaire-brut-net"
            title="Calcul salaire brut/net"
            description="Un simulateur pratique pour estimer le salaire net, le net apres impots et comparer plusieurs hypotheses de package."
            meta="Simulateur"
          />
          <ListingCard
            href="/salary-benchmarks"
            title="Benchmarks salaires"
            description="Un hub pour relier salaire, fiches métiers, comparatifs et décisions de recrutement sur vos verticales."
            meta="Salary SEO"
          />
          <ListingCard
            href="/investment-funds"
            title="Funds & portfolio"
            description="Profils de fonds vérifiés, méthode anti-hallucination et premiers jeux de données exploitables pour du contenu SEO production-safe sur les environnements Seed, Série A et Série B."
            meta="Investment"
          />
          <ListingCard
            href="/news"
            title="Actualités"
            description={`${newsHubs.length} hubs éditoriaux pour suivre le marché via France Biotech, Bpifrance, fonds santé et signaux de levée Seed, Série A et Série B.`}
            meta="Veille marché"
          />
          <ListingCard
            href="/schools"
            title="Écoles spécialisées"
            description={`${schools.length} pages écoles pour cartographier les viviers de talents par spécialité.`}
            meta="Talent pools"
          />
          <ListingCard
            href="/events"
            title="Événements & séminaires"
            description={`${events.length} pages événements pour travailler visibilité, maillage interne et preuves d’écosystème.`}
            meta="Écosystème"
          />
          <ListingCard
            href="/ecosystem"
            title="Écosystème & réseaux"
            description="100 acteurs à suivre entre écoles, clusters, fonds, médias, plateformes et partenaires pour cartographier les réseaux qui comptent."
            meta="Backlinks & autorité"
          />
          <ListingCard
            href="/comparatifs"
            title="Comparatifs SEO"
            description="Des pages comparatives pour capter les requêtes à forte intention et mieux convertir sur des sujets spécialisés."
            meta="Comparaison"
          />
          <ListingCard
            href="/market-hubs"
            title="Hubs de référence"
            description="10 pages hub plus fortes par thème pour renforcer le référencement, la navigation et l’autorité sectorielle, y compris autour des cycles de croissance et de financement."
            meta="High traffic pages"
          />
          <ListingCard
            href={`/studies/${ecosystemStudy.slug}`}
            title="Étude signature SKS TALENTS"
            description={ecosystemStudy.summary}
            meta="Insight 2026"
          />
          <ListingCard
            href="/team"
            title="Équipe & expertise"
            description="La page crédibilité pour présenter le positionnement, la spécialisation et la méthode SKS TALENTS."
            meta="Confiance"
          />
          <ListingCard
            href="/rejoignez-nous"
            title="Rejoignez-nous"
            description="Une landing page orientée conversion qui combine vision fondatrice, preuve sociale, méthode et CTA pour recruteurs, partenaires et talents."
            meta="Conversion"
          />
          <ListingCard
            href="/press"
            title="Presse & publications"
            description="Interventions, publications et actifs de marque à centraliser pour journalistes, partenaires et moteurs de recherche."
            meta="Autorité"
          />
          <ListingCard
            href="/media-kit"
            title="Media kit"
            description="La base pour structurer vos futures offres publicitaires, sponsorisées et études co-brandées."
            meta="Monétisation"
          />
          <ListingCard
            href="/partenaires-media"
            title="Partenaires & sponsorings"
            description="Une page dédiée aux offres de visibilité pour les partenaires, sponsors et marques de votre écosystème."
            meta="Partenariats"
          />
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Fonds d’investissement"
        title="Une base de fonds santé à suivre avec liens officiels"
        description="Cette sélection s’appuie sur la synthèse publique France Biotech 2024 et sur des sources officielles complémentaires comme Mars x Digitalis Ventures et Angels Santé."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trackedInvestmentFundsDirectory.slice(0, 12).map((fund) => (
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
            </a>
          ))}
        </div>
        <div className="mt-6">
          <ListingCard
            href="/investment-funds"
            title="Voir l’annuaire complet des fonds"
            description={`${trackedInvestmentFundsDirectory.length} entrées avec liens officiels, profils vérifiés et sources marché.`}
            meta="Fonds & ecosysteme"
          />
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Partenaires institutionnels"
        title="Des acteurs publics et institutionnels qui comptent dans l’écosystème"
        description="Cette sélection aide à capter les recherches liées à l’export, au financement, à la santé et à l’accompagnement des entreprises innovantes."
      >
        <ExternalLinkGrid items={institutionalPartners} />
      </SectionShell>
      <SectionShell
        eyebrow="Partenaires financiers"
        title="Fonds, banques et plateformes utiles pour la croissance"
        description="Des sources utiles pour les recherches autour du financement, des levées, des marchés et des partenaires capital marché."
      >
        <ExternalLinkGrid items={financialPartners} />
      </SectionShell>
      <SectionShell
        eyebrow="Associations & réseaux"
        title="Les fédérations et réseaux professionnels à surveiller"
        description="Ces pages renforcent votre couverture des requêtes liées aux réseaux santé, deeptech, medtech, biotech et leaders d’opinion."
      >
        <ExternalLinkGrid items={associationsAndNetworks} />
      </SectionShell>
      <SectionShell
        eyebrow="Pôles & clusters"
        title="Les hubs d’innovation, clusters et incubateurs à suivre"
        description="Un maillage utile pour les pages backlinks, l’autorité sectorielle et les recherches entreprises liées aux bassins d’innovation."
      >
        <ExternalLinkGrid items={clustersAndIncubators} />
      </SectionShell>
      <SectionShell
        eyebrow="Ressources vétérinaires"
        title="Des entrées officielles pour les étudiants, jeunes diplômés et structures vétérinaires"
        description="L’Ordre national des vétérinaires offre des ressources solides pour les recherches autour de la profession, des conditions d’exercice et des démarches."
      >
        <ExternalLinkGrid items={veterinaryOfficialResources} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ListingCard
            href="/blog/devenir-veterinaire-france"
            title="Devenir vétérinaire en France"
            description="Un article de synthèse relié aux écoles, aux conditions d’exercice et aux parcours officiels."
            meta="Orientation vétérinaire"
          />
          <ListingCard
            href="/blog/ecoles-metiers-animaliers"
            title="Écoles des métiers animaliers"
            description="Une page éditoriale pensée pour capter les recherches autour des formations animalières, des diplômes et des débouchés."
            meta="Animal careers SEO"
          />
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Médias"
        title="Les médias spécialisés à suivre"
        description="Des références éditoriales utiles pour relayer les signaux marché, le financement et les mouvements d’acteurs du secteur."
      >
        <ExternalLinkGrid items={mediaPartners} />
      </SectionShell>
    </>
  );
}
