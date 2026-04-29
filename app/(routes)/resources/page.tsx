import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import ListingCard from "@/components/ListingCard";
import ExternalLinkGrid from "@/components/ExternalLinkGrid";
import ResourcesAlertsCard from "@/components/ResourcesAlertsCard";
import Link from "next/link";
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
import { getNotionSiteContentList } from "@/lib/notion";

export const dynamic = "force-dynamic";

// Masque les blocs SEO internes (Formats SEO, Matrice de décision, FAQ GEO,
// 'Question fréquente' externes). Ces sections ne concernent pas le lecteur.
const SHOW_INTERNAL_SEO_BLOCKS = false;

export default async function ResourcesPage() {
  let notionEvents: Awaited<ReturnType<typeof getNotionSiteContentList>> = [];

  try {
    notionEvents = await getNotionSiteContentList("event", 100);
  } catch (error) {
    console.error("Resources page: failed to load Notion events, using local fallback.", error);
  }

  const eventCount = new Set([...events.map((item) => item.slug), ...notionEvents.map((item) => item.slug)]).size;

  return (
    <>
      <PageHero
        kicker="Les ressources"
        title="Des hubs éditoriaux conçus pour capter les recherches à forte valeur."
        description="Salaires, fiches métiers, fonds, écoles, comparatifs et insights marché structurés comme des pages de référence à mettre à jour régulièrement, avec un focus sur les entreprises en Seed, Série A et Série B."
      />
      <SectionShell
        eyebrow="Comment naviguer"
        title="Cinq hubs pour aller droit à l’information utile."
        description="Salaires, métiers, fonds, écoles et comparatifs : chaque hub regroupe les pages de référence du site, à mettre à jour en continu pour les recrutements Seed, Série A et Série B."
      >
        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { title: "Salaires", href: "/salary-benchmarks", copy: "Benchmarks par rôle, secteur, géographie et stade Seed / Série A / Série B." },
            { title: "Métiers", href: "/job-roles", copy: "Fiches de poste longues traînes, fonctions pénuriques et rôles ouverts après levée." },
            { title: "Fonds", href: "/investment-funds", copy: "Top biotech companies, VC santé et écosystèmes financés en Seed, Série A ou Série B." },
            { title: "Écoles", href: "/schools", copy: "Pipelines talents, orientation et bassins académiques." },
            { title: "Comparatifs", href: "/comparatifs", copy: "Requêtes à forte intention pour convertir plus vite sur des marchés en croissance." }
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="card-surface group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.title}
              </p>
              <p className="mt-3 flex-1 text-sm leading-7 text-brand-stone">{item.copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-teal transition group-hover:gap-1.5">
                Voir le hub →
              </span>
            </Link>
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
            description={`${eventCount} pages événements pour travailler visibilité, maillage interne et preuves d’écosystème.`}
            meta="Écosystème"
          />
          <ListingCard
            href="/ecosystem"
            title="Écosystème & réseaux"
            description="100 acteurs à suivre entre écoles, clusters, fonds, médias, plateformes et partenaires pour cartographier les réseaux qui comptent."
            meta="Écosystème & réseaux"
          />
          {SHOW_INTERNAL_SEO_BLOCKS && (
            <ListingCard
              href="/comparatifs"
              title="Comparatifs SEO"
              description="Des pages comparatives pour capter les requêtes à forte intention et mieux convertir sur des sujets spécialisés."
              meta="Comparaison"
            />
          )}
          {SHOW_INTERNAL_SEO_BLOCKS && (
            <>
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
            </>
          )}
          {SHOW_INTERNAL_SEO_BLOCKS && (
            <>
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
            </>
          )}
        </div>
      </SectionShell>
      {SHOW_INTERNAL_SEO_BLOCKS && (
      <SectionShell
        eyebrow="Formats SEO"
        title="Quels formats de contenu renforcent le mieux votre visibilité ?"
        description="Les formats les plus efficaces pour le SEO spécialisé ne se limitent pas aux articles. Votre site couvre déjà plusieurs briques fortes ; cette matrice les rend plus lisibles pour les visiteurs, pour Google et pour les moteurs conversationnels."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ListingCard
            href="/blog"
            title="Articles de fond"
            description="Des contenus longs pour capter la longue traîne, répondre à des questions précises et asseoir l’expertise SKS TALENTS sur les Life Sciences et l’Animal Health."
            meta="Autorité & longue traîne"
          />
          <ListingCard
            href="/studies"
            title="Guides pratiques & études"
            description="Des formats plus structurés pour traiter les sujets “comment faire”, transformer une veille en méthode et convertir des lecteurs qualifiés en leads."
            meta="How-to & lead magnet"
          />
          <ListingCard
            href="/comparatifs"
            title="Comparatifs & formats listes"
            description="Des pages conçues pour les requêtes à forte intention, les arbitrages rapides et les lecteurs qui cherchent une réponse simple avant de décider."
            meta="Intentions fortes"
          />
          <ListingCard
            href="/references"
            title="Études de cas & preuves"
            description="Le format le plus utile pour renforcer la confiance, montrer des environnements déjà traités et soutenir la conversion sur des marchés exigeants."
            meta="Confiance & conversion"
          />
          <ListingCard
            href="/services/website"
            title="Vidéo embarquée & présentation"
            description="Un format d’engagement utile pour retenir l’attention, expliquer votre positionnement et garder le trafic sur le site avec un support visuel plus vivant."
            meta="Engagement & réassurance"
          />
          <ListingCard
            href="/studies"
            title="Repères visuels & infographies"
            description="Des synthèses visuelles pour simplifier des sujets complexes, rendre les contenus plus partageables et soutenir une lecture plus rapide sur mobile."
            meta="Visuel & backlinks"
          />
          <ListingCard
            href="/salary-benchmarks"
            title="FAQ & réponses directes"
            description="Des blocs courts, structurés et lisibles pour capter la position zéro, répondre aux requêtes conversationnelles et nourrir Google comme les LLM."
            meta="Position zéro & GEO"
          />
          <ListingCard
            href="/job-roles"
            title="Fiches métiers détaillées"
            description="Un format SEO très fort pour travailler la pénurie, les compétences, la rémunération, le marché et la décision de recrutement dans une même page."
            meta="SEO métier"
          />
          <ListingCard
            href="/news"
            title="Actualités à enrichir"
            description="Les signaux chauds, nominations, financements et mouvements d’écosystème à transformer ensuite en articles de fond, guides ou études de cas."
            meta="Freshness & intent"
          />
        </div>
      </SectionShell>
      )}
      {SHOW_INTERNAL_SEO_BLOCKS && (
      <SectionShell
        eyebrow="Matrice de décision"
        title="Quel format choisir selon votre objectif SEO ?"
        description="Le bon format dépend du résultat attendu. Cette lecture simple reprend la logique la plus utile pour un site expert : trafic qualifié, position zéro, backlinks, confiance et conversion."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Attirer un trafic qualifié",
              copy: "Privilégiez des articles de fond et des fiches métiers longues traînes pour répondre à des requêtes précises, contextualisées et proches des besoins terrain.",
              links: [
                { href: "/blog", label: "Articles de fond" },
                { href: "/job-roles", label: "Fiches métiers" }
              ]
            },
            {
              title: "Capter la position zéro",
              copy: "Les guides structurés, les réponses courtes et les FAQ restent les formats les plus lisibles pour les requêtes “comment”, “pourquoi” et les moteurs conversationnels.",
              links: [
                { href: "/studies", label: "Guides & études" },
                { href: "/salary-benchmarks", label: "FAQ & réponses directes" }
              ]
            },
            {
              title: "Générer des backlinks",
              copy: "Les synthèses visuelles, repères marché et pages data simplifient le complexe et se partagent plus facilement quand une donnée mérite d’être citée.",
              links: [
                { href: "/studies", label: "Repères visuels" },
                { href: "/news", label: "Données & signaux marché" }
              ]
            },
            {
              title: "Renforcer la confiance",
              copy: "Les études de cas, références et preuves d’exécution sont les meilleurs formats pour montrer que vous savez opérer sur des marchés exigeants.",
              links: [
                { href: "/references", label: "Références" },
                { href: "/team", label: "Équipe & expertise" }
              ]
            },
            {
              title: "Retenir et convertir",
              copy: "La vidéo embarquée, les comparatifs et les pages de service aident à garder le visiteur sur le site puis à l’orienter vers une prise de contact utile.",
              links: [
                { href: "/services/website", label: "Vidéo embarquée" },
                { href: "/comparatifs", label: "Comparatifs" }
              ]
            },
            {
              title: "Transformer l’actualité en autorité",
              copy: "Les signaux chauds ont plus de valeur lorsqu’ils sont réécrits ensuite en article de fond, guide pratique ou étude plus durable.",
              links: [
                { href: "/news", label: "Actualités" },
                { href: "/blog", label: "Passer en article de fond" }
              ]
            }
          ].map((item) => (
            <article key={item.title} className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Objectif prioritaire</p>
              <h3 className="mt-3 font-display text-2xl text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.copy}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {item.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-brand-teal/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal transition hover:border-brand-teal/40 hover:bg-brand-teal hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
      )}
      <SectionShell
        eyebrow="Veille continue"
        title="Souhaitez-vous recevoir les prochaines ressources à forte valeur ?"
        description="Un point d’entrée simple pour rester exposé aux prochains contenus utiles publiés par SKS TALENTS : signaux marché, métiers, salaires, événements, écoles, fonds et ressources d’écosystème."
      >
        <ResourcesAlertsCard />
      </SectionShell>
      {SHOW_INTERNAL_SEO_BLOCKS && (
      <>
      <SectionShell
        eyebrow="Question fréquente"
        title="Quels fonds santé suivre pour comprendre un marché ou une levée ?"
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
        eyebrow="Question fréquente"
        title="Quels partenaires institutionnels et publics comptent vraiment dans cet écosystème ?"
        description="Cette sélection aide à capter les recherches liées à l’export, au financement, à la santé et à l’accompagnement des entreprises innovantes."
      >
        <ExternalLinkGrid items={institutionalPartners} />
      </SectionShell>
      <SectionShell
        eyebrow="Question fréquente"
        title="Quels partenaires financiers suivre pour la croissance ?"
        description="Des sources utiles pour les recherches autour du financement, des levées, des marchés et des partenaires capital marché."
      >
        <ExternalLinkGrid items={financialPartners} />
      </SectionShell>
      <SectionShell
        eyebrow="Question fréquente"
        title="Quelles associations et quels réseaux professionnels faut-il surveiller ?"
        description="Ces pages renforcent votre couverture des requêtes liées aux réseaux santé, deeptech, medtech, biotech et leaders d’opinion."
      >
        <ExternalLinkGrid items={associationsAndNetworks} />
      </SectionShell>
      <SectionShell
        eyebrow="Question fréquente"
        title="Quels clusters, pôles et incubateurs suivre dans les sciences du vivant ?"
        description="Un maillage utile pour les pages backlinks, l’autorité sectorielle et les recherches entreprises liées aux bassins d’innovation."
      >
        <ExternalLinkGrid items={clustersAndIncubators} />
      </SectionShell>
      <SectionShell
        eyebrow="Question fréquente"
        title="Où trouver des ressources vétérinaires fiables ?"
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
        eyebrow="Question fréquente"
        title="Quels médias spécialisés suivre pour les signaux marché ?"
        description="Des références éditoriales utiles pour relayer les signaux marché, le financement et les mouvements d’acteurs du secteur."
      >
        <ExternalLinkGrid items={mediaPartners} />
      </SectionShell>
      <FAQSection
        eyebrow="FAQ GEO"
        title="Questions fréquentes sur les ressources SKS TALENTS"
        description="Une FAQ structurée pour rendre cette page encore plus lisible par Google, ChatGPT, Claude, Mistral et Perplexity, ainsi que par vos visiteurs."
        items={[
          {
            question: "Que trouve-t-on dans les ressources SKS TALENTS ?",
            answer:
              "Les ressources SKS TALENTS regroupent des hubs salaires, métiers, écoles, fonds, événements, comparatifs, médias, partenaires institutionnels et réseaux sectoriels pour répondre rapidement à une recherche de marché ou de recrutement."
          },
          {
            question: "Quelles ressources sont les plus utiles pour un CEO, COO ou DRH ?",
            answer:
              "Un CEO ou COO utilisera surtout les pages marché, fonds, comparatifs et événements. Un DRH ou CPO utilisera davantage les fiches métiers, benchmarks salaires, écoles spécialisées et pages ressources liées à la pénurie ou à la structuration RH."
          },
          {
            question: "Comment utiliser cette page pour répondre à une question précise ?",
            answer:
              "La logique la plus efficace consiste à partir d’une question métier, salaire, école, événement, levée ou écosystème, puis à suivre les passerelles internes entre hubs. Cette structure a été pensée pour accélérer la recherche d’information utile et transformer la lecture en action."
          },
          {
            question: "Quel format choisir selon son objectif SEO ?",
            answer:
              "Pour du trafic qualifié, les articles de fond et fiches métiers restent les plus solides. Pour la position zéro, les guides pratiques et FAQ sont les plus efficaces. Pour la conversion, les études de cas, références, comparatifs et vidéos embarquées apportent plus de réassurance."
          },
          {
            question: "Pourquoi combiner plusieurs formats sur un même site ?",
            answer:
              "Parce qu’un site d’autorité ne repose pas sur un seul type de page. Les articles captent la longue traîne, les FAQ répondent vite, les études de cas rassurent, les visuels simplifient les sujets complexes et les vidéos augmentent le temps d’attention."
          },
          {
            question: "Pourquoi cette page peut-elle être citée par les IA ?",
            answer:
              "Parce qu’elle concentre des réponses courtes, des catégories explicites, des liens clairs et des blocs thématiques fortement alignés avec les requêtes réelles sur les Life Sciences, l’Animal Health, le diagnostic, les fonds, les écoles et les contenus d’autorité."
          }
        ]}
      />
      </>
      )}
    </>
  );
}
