import CalendlyButton from "@/components/CalendlyButton";
import CountUpStat from "@/components/CountUpStat";
import Hero from "@/components/Hero";
import HomeSearchSection from "@/components/HomeSearchSection";
import InlineLeadForm from "@/components/InlineLeadForm";
import ParallaxLayer from "@/components/ParallaxLayer";
import RevealOnScroll from "@/components/RevealOnScroll";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import ResourceHub from "@/components/ResourceHub";
import SectionShell from "@/components/SectionShell";
import ServicesSection from "@/components/ServicesSection";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { articles } from "@/data/articles";
import { references } from "@/data/references";
import Link from "next/link";

const ecosystemPartners = [
  {
    name: "France Biotech",
    href: "https://france-biotech.fr/",
    logoPath: "/images/partners/france-biotech.svg",
    description:
      "Réseau clé pour comprendre la healthtech française, ses dynamiques et ses signaux marché."
  },
  {
    name: "Université Paris-Saclay",
    href: "https://www.universite-paris-saclay.fr",
    logoPath: "/images/partners/universite-paris-saclay.svg",
    description:
      "Viviers scientifiques majeurs pour biotech, santé, sciences du vivant, data et innovation."
  }
];

const painPoints = [
  {
    title: "Le recrutement prend trop de temps",
    description:
      "Un poste prioritaire reste vacant, la roadmap glisse et la pression remonte sur les équipes déjà en place."
  },
  {
    title: "Les bons profils sont difficiles à trouver",
    description:
      "Les bons profils existent, mais ils sont rares, sollicités et difficiles à convaincre si le besoin est mal cadré."
  },
  {
    title: "Les équipes ne passent pas correctement à l’échelle",
    description:
      "Quand le recrutement, l’onboarding et la structuration RH ne sont pas alignés, la croissance devient plus fragile."
  },
  {
    title: "La structure RH n’est pas prête pour la suite",
    description:
      "Dans les secteurs scientifiques, techniques et régulés, une mauvaise embauche coûte du temps, de la crédibilité et de l’énergie managériale."
  }
];

const diagnosticSignals = [
  "Mon recrutement bloque sur des rôles clés",
  "Je perds trop de temps côté direction ou management",
  "Je dois structurer mes RH avant de recruter davantage"
];

const methodologySteps = [
  {
    step: "01",
    title: "Cadrer la vraie mission",
    description:
      "Nous repartons du contexte business, du niveau de rareté et du vrai impact attendu sur le poste."
  },
  {
    step: "02",
    title: "Lire le marché correctement",
    description:
      "Nous challengons le brief, activons le bon réseau et construisons une narration crédible pour convertir les profils rares."
  },
  {
    step: "03",
    title: "Présenter peu, mais juste",
    description:
      "L’objectif n’est pas le volume. L’objectif est une shortlist lisible, comparable et utile pour décider vite."
  },
  {
    step: "04",
    title: "Sécuriser l’après",
    description:
      "Nous relions recrutement, onboarding et structuration pour que la décision tienne dans le temps."
  }
];

const insightSignals = [
  {
    title: "Pénurie ciblée",
    description:
      "Le marché ne manque pas de profils au sens large. Il manque surtout des profils rares, convaincables et crédibles pour votre contexte exact."
  },
  {
    title: "Pression marché",
    description:
      "Dans les environnements biotech, diagnostic, medtech ou santé animale, chaque retard de recrutement se répercute sur l’exécution commerciale, technique ou managériale."
  },
  {
    title: "Mauvais alignement",
    description:
      "Le vrai blocage n’est pas seulement la rareté. C’est l’écart entre le besoin réel, le message marché, la shortlist et la capacité d’intégration."
  }
];

const marketSignals = [
  {
    title: "Rareté réelle",
    description:
      "Les profils vraiment utiles sont peu nombreux. L’enjeu n’est pas le volume, mais la bonne cible."
  },
  {
    title: "Narration marché",
    description:
      "Quand l’opportunité est mieux racontée, l’adhésion des candidats augmente et la conversation devient plus crédible."
  },
  {
    title: "Décision",
    description:
      "Une shortlist lisible permet aux dirigeants et managers de décider plus vite sans multiplier les entretiens inutiles."
  }
];

const methodBenefits = [
  "Brief challengé avant activation du marché",
  "Shortlist plus courte, mais plus décidable",
  "Lecture RH et business alignée dès le départ",
  "Intégration sécurisée après la décision"
];

const proofStats = [
  ["100+", "placements"],
  ["10 jours", "1re shortlist"],
  ["4.5/5", "Trustpilot"]
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <RevealOnScroll>
        <section className="container-shell -mt-2 pb-8">
          <div className="mesh-panel relative overflow-hidden p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0">
              <ParallaxLayer
                offset={5}
                className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-brand-mint/45 blur-3xl"
              />
              <ParallaxLayer
                offset={4}
                className="absolute right-0 bottom-[-2rem] h-28 w-28 rounded-full bg-cyan-100/70 blur-3xl"
              />
            </div>
            <div className="relative grid gap-4 md:grid-cols-3">
              {proofStats.map(([value, label]) => (
                <CountUpStat key={label} value={value} label={label} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delayMs={90}>
        <SectionShell
          eyebrow="Si vous êtes ici"
          title="C’est souvent qu’un recrutement important prend trop de temps, crée trop d’incertitude ou mobilise mal vos équipes."
          description="Avant même de parler de solution, il faut reconnaître ce qui se passe vraiment sur le terrain : roadmap ralentie, management sous tension, manque de lisibilité et difficulté à convaincre les bons profils."
        >
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="card-luxe panel-lift flex h-full flex-col justify-between p-8"
              >
                <span className="mb-6 inline-flex w-fit rounded-full border border-brand-teal/12 bg-brand-mint px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  Point de friction
                </span>
                <h2 className="font-display text-3xl text-brand-ink">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={100}>
        <section className="container-shell pb-4">
          <div className="card-surface bg-grain p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="space-y-5">
                <p className="eyebrow">Diagnostic</p>
                <h2 className="section-title max-w-[18ch]">
                  Votre recrutement est-il devenu un frein à votre croissance ?
                </h2>
                <p className="section-copy max-w-3xl">
                  5 questions simples pour identifier si le vrai sujet vient du sourcing, de la
                  décision, de la structuration RH, de l’onboarding ou des tâches RH qui absorbent
                  trop de temps côté direction.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Faire le diagnostic
                  </Link>
                  <CalendlyButton label="Je réserve un call — 15 min" tone="outline" />
                </div>
              </div>

              <div className="grid gap-3">
                {diagnosticSignals.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[26px] border border-brand-teal/10 bg-white px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      Signal 0{index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delayMs={110}>
        <SectionShell
          eyebrow="Insight"
          title="Le vrai blocage n’est pas seulement la pénurie. C’est l’alignement entre besoin, marché et intégration."
          description="Quand le poste est mal raconté, quand le brief reste flou ou quand l’entreprise n’est pas prête à intégrer le rôle, le recrutement ralentit même avec de bons candidats en face."
        >
          <div className="relative overflow-hidden rounded-[34px]">
            <div className="pointer-events-none absolute inset-0">
              <ParallaxLayer
                offset={4}
                className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-mint/35 blur-3xl"
              />
            </div>
            <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {insightSignals.map((item) => (
              <div key={item.title} className="card-luxe panel-lift p-8">
                <p className="eyebrow">Insight</p>
                <h3 className="font-display text-3xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{item.description}</p>
              </div>
            ))}
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={125}>
        <ServicesSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={135}>
        <SectionShell
          eyebrow="Signal marché"
          title="Quand le marché est bien lu, le recrutement devient plus clair, plus crédible et plus décidable."
          description="Nous utilisons la lecture marché pour mieux calibrer le rôle, raconter l’opportunité au bon niveau et éviter les shortlists qui consomment du temps sans créer de décision."
        >
          <div className="grid gap-5 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
            <div className="card-luxe p-8 sm:p-10">
              <p className="eyebrow">Lecture marché</p>
              <h3 className="font-display text-4xl text-brand-ink sm:text-5xl">
                Mieux cadrer avant d’ouvrir le marché.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-brand-stone">
                Nous utilisons la lecture terrain pour clarifier le niveau de rareté, corriger le
                message de mission et éviter les démarches qui consomment du temps sans créer de
                décision.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {marketSignals.slice(0, 2).map((item) => (
                  <div key={item.title} className="rounded-[26px] border border-brand-teal/10 bg-brand-mint/35 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-luxe p-8 sm:p-10">
              <p className="eyebrow">Ce que cela change</p>
              <div className="space-y-5">
                {marketSignals.map((item, index) => (
                  <div key={item.title} className="rounded-[26px] border border-brand-teal/10 bg-white px-5 py-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                          {item.title}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
                      </div>
                      <div className="rounded-full bg-brand-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                        0{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Biotech", "Diagnostic", "Medtech", "Animal Health", "Petfood"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-teal/12 bg-brand-mint/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-stone"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={145}>
        <SectionShell
          eyebrow="Méthode"
          title="Une méthode pensée pour des dirigeants qui veulent décider vite, sans sacrifier l’exigence."
          description="Notre différence ne tient pas à un discours. Elle tient à un process qui transforme un besoin sensible en mission lisible, pilotable et exécutable."
        >
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div className="grid gap-4">
                {methodologySteps.map((item) => (
                  <div key={item.step} className="card-luxe panel-lift p-7">
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
              <InlineLeadForm
                title="Audit de vos enjeux recrutement & structuration RH"
                description="Déposez vos coordonnées en moins d’une minute. Nous revenons rapidement avec une première lecture claire de vos priorités : recrutement critique, RPO, structuration RH ou échange de cadrage."
                role="Direction / Talent"
                sector="Life Sciences & Animal Health"
              />
            </div>
            <div className="mesh-panel p-8 sm:p-10">
              <p className="eyebrow">Ce que la méthode évite</p>
              <h3 className="font-display text-4xl text-brand-ink">
                Une mission lisible vaut mieux qu’une suite d’étapes décoratives.
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">
                Le sujet n’est pas d’ajouter de la complexité. Le sujet est de transformer un besoin
                sensible en processus clair pour le manager, crédible pour le marché et tenable pour
                l’intégration.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {methodBenefits.map((item, index) => (
                  <div key={item} className="card-luxe p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      0{index + 1}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-brand-stone">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={165}>
        <SectionShell
          eyebrow="Preuves"
          title="La crédibilité se construit avec des résultats visibles, des références lisibles et des signaux externes."
          description="Avant de prendre contact, un dirigeant doit pouvoir se faire une idée claire du niveau d’exécution, de spécialisation et de confiance."
        >
          <div className="space-y-8">
            <div className="card-luxe p-8 sm:p-10">
              <p className="eyebrow">Références & exécution</p>
              <h3 className="font-display text-4xl text-brand-ink">
                Des marques reconnues et des scale-ups ambitieuses.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-stone">
                Nous mettons en avant des cas lisibles pour montrer ce qui a été recruté, dans quel
                contexte et avec quel niveau d’exigence.
              </p>
              <div className="mt-6">
                <ReferenceMarquee items={references} />
              </div>
            </div>
            <ReferenceGrid items={references.slice(0, 6)} />
          </div>
          <div className="mt-6">
            <TestimonialMarquee />
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={185}>
        <SectionShell
          eyebrow="Écosystème"
          title="Une expertise renforcée par des partenaires qui comptent réellement dans nos marchés."
          description="SKS TALENTS évolue dans un environnement spécialisé. Cette proximité renforce la crédibilité avant la prise de contact et nourrit notre lecture des viviers, de l’innovation et des signaux marché."
        >
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="grid gap-4 md:grid-cols-2">
              {ecosystemPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                className="card-luxe panel-lift block p-6"
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
            <div className="card-luxe panel-lift p-8">
              <p className="eyebrow">Pourquoi c’est important</p>
              <h3 className="font-display text-4xl text-brand-ink">
                Un cabinet visible gagne aussi en crédibilité grâce à son environnement.
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
                <li>Des partenaires identifiables renforcent la confiance avant prise de contact.</li>
                <li>Ils ancrent SKS TALENTS dans les réseaux qui comptent pour Google et pour les prospects.</li>
                <li>Ils créent un pont naturel entre écoles, innovation, recrutement et contenus sectoriels.</li>
              </ul>
              <div className="mt-6">
                <CalendlyButton label="Voir l’écosystème complet" href="/ecosystem" tone="outline" />
              </div>
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={205}>
        <SectionShell
          eyebrow="Contenus utiles"
          title="Des contenus conçus pour informer, rassurer et faire avancer la décision avant même la prise de contact."
          description="Articles, fiches métiers, benchmarks salaires, écoles, événements, fonds et comparatifs : chaque bloc doit aider le lecteur à comprendre un sujet, mieux lire le marché et avancer vers une décision."
        >
          <ResourceHub
            articles={articles.slice(0, 3)}
            resourceStats={[
              { label: "Articles blog", value: "50+" },
              { label: "Fiches métiers", value: "35+" },
              { label: "Écoles & events", value: "45+" }
            ]}
          />
        </SectionShell>
      </RevealOnScroll>

      <RevealOnScroll delayMs={225}>
        <HomeSearchSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={245}>
        <SectionShell
          eyebrow="Dernière étape"
          title="Le meilleur prochain pas dépend surtout de la maturité de votre besoin."
          description="Les prospects déjà convaincus réservent directement un créneau. Les contextes plus sensibles peuvent demander un rappel ou un premier échange plus discret."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-luxe panel-lift p-6">
              <p className="eyebrow">Leads chauds</p>
              <h3 className="font-display text-3xl text-brand-ink">Rendez-vous direct</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">
                Pour un besoin clair, le calendrier vous permet d’entrer directement dans un échange
                de cadrage.
              </p>
              <div className="mt-5">
                <CalendlyButton label="Réserver un diagnostic" tone="solid" />
              </div>
            </div>
            <div className="card-luxe panel-lift p-6">
              <p className="eyebrow">Leads complexes</p>
              <h3 className="font-display text-3xl text-brand-ink">Être rappelé</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">
                Si le contexte est sensible, le formulaire callback qualifie le besoin avant le
                premier échange.
              </p>
              <div className="mt-5">
                <CalendlyButton label="Voir l’espace contact" href="/contact#rappel" tone="outline" />
              </div>
            </div>
            <div className="card-luxe panel-lift p-6">
              <p className="eyebrow">Explorer avant d’agir</p>
              <h3 className="font-display text-3xl text-brand-ink">Services & références</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">
                Si vous avez besoin d’un dernier niveau de réassurance, les services, références et
                contenus sectoriels restent les meilleurs points d’entrée.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CalendlyButton label="Voir nos services" href="/services" tone="ghost" />
                <CalendlyButton label="Nos références" href="/references" tone="outline" />
              </div>
            </div>
          </div>
        </SectionShell>
      </RevealOnScroll>
    </>
  );
}
