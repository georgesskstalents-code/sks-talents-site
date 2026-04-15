import CalendlyButton from "@/components/CalendlyButton";
import Hero from "@/components/Hero";
import InlineLeadForm from "@/components/InlineLeadForm";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import ReferenceGrid from "@/components/ReferenceGrid";
import ResourceHub from "@/components/ResourceHub";
import SectionShell from "@/components/SectionShell";
import ServicesSection from "@/components/ServicesSection";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { articles } from "@/data/articles";
import { references } from "@/data/references";

export default function HomePage() {
  const ecosystemPartners = [
    {
      name: "France Biotech",
      href: "https://france-biotech.fr/",
      logoPath: "/images/partners/france-biotech.svg",
      description: "Réseau clé pour comprendre la healthtech française, ses dynamiques et ses signaux marché."
    },
    {
      name: "Université Paris-Saclay",
      href: "http://www.universite-paris-saclay.fr",
      logoPath: "/images/partners/universite-paris-saclay.svg",
      description: "Viviers scientifiques majeurs pour biotech, santé, sciences du vivant, data et innovation."
    }
  ];

  return (
    <>
      <Hero />
      <ServicesSection />
      <SectionShell
        eyebrow="Partenaires d’écosystème"
        title="Des acteurs clés au cœur de notre lecture du marché"
        description="SKS TALENTS évolue dans un écosystème spécialisé. Nous mettons ici en avant deux de nos partenaires de référence qui renforcent notre proximité avec les viviers scientifiques et entrepreneuriaux."
      >
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {ecosystemPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card-surface block p-6 transition hover:-translate-y-1"
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
          <div className="card-surface p-8">
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
      <SectionShell
        eyebrow="Cabinet de recrutement spécialisé Life Sciences & Animal Health"
        title="Des talents qui accélèrent vos décisions. Des recrutements qui sécurisent votre croissance."
        description="Un poste stratégique reste vacant. Les projets ralentissent. Les équipes s’adaptent. La pression monte."
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface p-8">
            <div className="space-y-4 text-sm leading-7 text-brand-stone">
              <p>
                Ce n’est jamais “juste un recrutement”. C’est votre roadmap qui prend du retard.
              </p>
              <p>
                Vous ne cherchez pas un CV. Vous cherchez quelqu’un qui comprend immédiatement vos
                enjeux, s’intègre à votre culture et fait avancer les choses dès le premier jour.
              </p>
              <p>
                Dans les secteurs biotech, deeptech, animal health, petfood, ces profils existent.
                Mais ils sont rares, très sollicités… et difficiles à convaincre.
              </p>
              <p>
                Pendant ce temps, chaque mauvais recrutement vous coûte plus qu’un salaire : du
                temps, de la crédibilité et un avantage concurrentiel.
              </p>
              <p>C’est là que SKS TALENTS intervient.</p>
              <p>
                Depuis plus de 8 ans, nous accompagnons dirigeants et équipes exécutives (CEO,
                DRH, CPO, COO) dans des environnements exigeants et régulés, où chaque décision
                compte.
              </p>
              <p className="font-semibold text-brand-ink">
                Nous ne recrutons pas. Nous sécurisons des décisions critiques.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-sm leading-7 text-brand-stone">
              <li>Executive search ciblé et confidentiel</li>
              <li>Cadrage stratégique des besoins</li>
              <li>Sourcing spécialisé et évaluation approfondie</li>
              <li>Onboarding, structuration et digitalisation RH</li>
            </ul>
            <div className="mt-6 rounded-3xl border border-brand-teal/10 bg-brand-mint/45 p-5">
              <p className="text-sm leading-7 text-brand-stone">
                Résultat : des recrutements qui performent.
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-ink">
                Première shortlist qualifiée sous 10 jours sur les missions bien cadrées.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["100+", "placements réalisés"],
                ["10 jours", "première shortlist cadrée"],
                ["4.5/5", "Trustpilot · 13 avis publics"]
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-5xl text-brand-teal">{value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-brand-stone">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-3xl border border-brand-line bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Échangeons sur votre besoin critique
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Planifiez un échange confidentiel et identifions rapidement les profils capables
                de faire avancer votre roadmap.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CalendlyButton label="Prendre rendez-vous" tone="solid" />
                <CalendlyButton label="Nous contacter" href="/contact#rappel" tone="outline" />
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-brand-teal/10 bg-brand-mint/45 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Témoignage
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">
                  “Une approche très spécialisée, rapide et structurée sur des profils difficiles à
                  approcher dans nos métiers techniques.”
                </p>
              </div>
              <div className="rounded-3xl border border-brand-teal/10 bg-white p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Exécution observée
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-stone">
                  <li>Première shortlist sous 10 jours sur les missions bien cadrées.</li>
                  <li>Postes couverts en 3 à 4 semaines sur les recherches prioritaires.</li>
                  <li>Preuve relationnelle externe via Trustpilot avant prise de contact.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <TestimonialMarquee />
            </div>
            <div className="mt-6">
              <ReferenceMarquee items={references} />
            </div>
          </div>
          <TrustpilotWidget />
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Conversion"
        title="Parlez-nous du besoin sans passer par une page contact longue."
        description="Un formulaire court pour les prospects déjà convaincus, avec une alternative directe vers Calendly."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <InlineLeadForm
            title="Recevoir un rappel qualifié"
            description="Déposez vos coordonnées en moins d’une minute. Toutes les demandes arrivent sur infos@skstalents.com."
            role="Direction / Talent"
            sector="Life Sciences"
          />
          <div className="card-surface p-8">
            <p className="eyebrow">Et maintenant ?</p>
            <h3 className="font-display text-4xl text-brand-ink">
              Trois chemins de conversion selon votre maturité.
            </h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Besoin urgent: prenez un créneau sur Calendly.</li>
              <li>Contexte sensible: demandez un rappel qualifié.</li>
              <li>Besoin de preuve: consultez Trustpilot, les références et les études.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <CalendlyButton label="Réserver un diagnostic" tone="solid" />
              <CalendlyButton
                label="Écrire à infos@skstalents.com"
                href="mailto:infos@skstalents.com"
                tone="outline"
              />
            </div>
          </div>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Références"
        title="Des marques reconnues et des scale-ups ambitieuses"
        description="Quelques cas partenaires parmi les références mises en avant sur le site, avec un défilement continu pour rendre la preuve sectorielle plus visible."
      >
        <ReferenceMarquee items={references} />
        <ReferenceGrid items={references.slice(0, 6)} />
      </SectionShell>
      <SectionShell
        eyebrow="Ressources"
        title="Un socle éditorial conçu pour le SEO et la conversion"
        description="Articles, fiches métiers, événements et écoles pour nourrir les recherches des dirigeants, RH et candidats."
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
      <SectionShell
        eyebrow="Passer à l'action"
        title="Deux parcours de conversion, selon la maturité du besoin"
        description="Les prospects chauds réservent directement sur Calendly. Les sujets plus sensibles passent par un rappel qualifié depuis la homepage ou la page contact."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-surface p-6">
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
          <div className="card-surface p-6">
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
          <div className="card-surface p-6">
            <p className="eyebrow">Preuve & réassurance</p>
            <h3 className="font-display text-3xl text-brand-ink">Références sectorielles</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Les cas clients et contenus sectoriels rassurent avant conversion et soutiennent le SEO.
            </p>
            <div className="mt-5">
              <CalendlyButton label="Découvrir nos références" href="/references" tone="ghost" />
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
