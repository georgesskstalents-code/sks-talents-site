import type { Metadata } from "next";
import CalendlyButton from "@/components/CalendlyButton";
import InlineLeadForm from "@/components/InlineLeadForm";
import PageHero from "@/components/PageHero";
import ReferenceMarquee from "@/components/ReferenceMarquee";
import SectionShell from "@/components/SectionShell";
import { references } from "@/data/references";

export const metadata: Metadata = {
  title: "Rejoignez-nous | Recrutement Life Sciences, Diagnostic & Animal Health | SKS TALENTS",
  description:
    "SKS TALENTS accompagne les entreprises qui recrutent dans les Life Sciences, le diagnostic, la santé animale et le petfood premium. Découvrez la vision de Georges Kengue, nos repères d’exécution et notre environnement de travail.",
  keywords: [
    "cabinet recrutement life sciences",
    "recrutement biotech",
    "recrutement diagnostic",
    "rejoignez-nous recrutement",
    "cabinet chasse de tête scientifique"
  ]
};

const faqItems = [
  {
    question: "SKS TALENTS intervient-il uniquement en Life Sciences ?",
    answer:
      "Le cabinet intervient principalement en Life Sciences, diagnostic, santé animale, medtech, cosmétique scientifique et petfood premium, avec une logique de spécialisation sur les marchés techniques."
  },
  {
    question: "En combien de temps recevez-vous une première shortlist ?",
    answer:
      "Sur les missions bien cadrées, une première shortlist peut être présentée sous 10 jours. Le délai complet dépend ensuite du niveau de rareté du poste et de la rapidité de décision côté client."
  },
  {
    question: "Comment prendre contact avec SKS TALENTS ?",
    answer:
      "Vous pouvez réserver un créneau via Calendly, demander à être rappelé depuis le formulaire inline ou écrire directement à infos@skstalents.com."
  }
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function RejoignezNousPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        kicker="Rejoignez-nous"
        title="Attirer des talents spécialisés commence par une proposition claire, crédible et bien exécutée."
        description="Avez-vous du mal à attirer des talents ? Vos retours d’annonces d’emploi ne sont pas qualifiés ou ne correspondent pas à votre secteur ? SKS TALENTS vous aide à structurer le message, cadrer le besoin et approcher les bons profils plus vite."
        variant="teal"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Rejoignez-nous" }
        ]}
      />
      <SectionShell
        eyebrow="Vision fondatrice"
        title="Une lecture terrain des métiers scientifiques, techniques et RH."
        description="Je suis Georges Kengue, fondateur de SKS TALENTS. Après un master Responsable Ressources Humaines à l’IGS Paris, trois années passées en multinationales puis quatre années dans un cabinet anglophone de chasse de talents, j’ai observé de près les mutations du marché de l’emploi scientifique et technique, ainsi que les enjeux qu’elles créent pour les entreprises."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8">
            <p className="text-sm leading-8 text-brand-stone">
              Nous sommes convaincus que les industries de niche comme les Life Sciences, le diagnostic,
              la santé animale, la cosmétique et les environnements medtech sont des moteurs d’innovation
              pour l’avenir. Elles participent déjà à la croissance économique des entreprises et des pays
              dans lesquels nous intervenons: France, Sénégal, Côte d’Ivoire et Congo.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-stone">
              Le succès d’une entreprise dépend des personnes qui la composent. Nous aidons donc les
              dirigeants et DRH à ne pas se contenter de moins que ce que leur organisation mérite.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CalendlyButton label="Réserver un call" tone="solid" />
              <CalendlyButton
                label="Écrire à infos@skstalents.com"
                href="mailto:infos@skstalents.com"
                tone="outline"
              />
            </div>
          </div>
          <InlineLeadForm
            title="Parler de votre besoin"
            description="Un formulaire court pour les entreprises qui veulent être rappelées rapidement au sujet d’un recrutement ou d’une structuration RH."
            role="Direction / RH"
            sector="Life Sciences"
          />
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Repères"
        title="Des indicateurs simples pour rassurer avant la prise de contact."
        description="Nous préférons des signaux lisibles et actionnables à des promesses vagues."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["100+", "placements réussis sur des marchés spécialisés"],
            ["10 jours", "première shortlist sur les missions bien cadrées"],
            ["3 à 4 semaines", "poste couvert sur les recherches prioritaires"],
            ["4,5/5", "note Trustpilot visible sur 13 avis publics"]
          ].map(([value, label]) => (
            <div key={label} className="card-surface p-8">
              <p className="font-display text-5xl text-brand-teal">{value}</p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{label}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Méthode"
        title="Ce que nous apportons quand les retours ne sont pas qualifiés."
        description="L’enjeu n’est pas seulement de publier une annonce, mais de rendre une opportunité lisible, désirable et crédible pour des profils exigeants."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Cadrage du besoin",
              copy: "Nous clarifions le rôle, le niveau d’impact attendu, le scope et les contraintes réelles avant de lancer le marché."
            },
            {
              title: "Positionnement employeur",
              copy: "Nous aidons à reformuler l’offre, la mission et les perspectives pour des profils qui comparent plusieurs options."
            },
            {
              title: "Sourcing spécialisé",
              copy: "Nous activons une approche ciblée sur des écosystèmes biotech, diagnostic, vétérinaire, medtech et petfood."
            },
            {
              title: "Suivi d’intégration",
              copy: "L’accompagnement continue pendant l’onboarding pour sécuriser la rencontre entre le poste, le manager et le talent."
            }
          ].map((item) => (
            <div key={item.title} className="card-surface p-8">
              <h3 className="font-display text-3xl text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.copy}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Culture d’équipe"
        title="Chez SKS TALENTS, nous misons sur la progression, le coaching et la responsabilité."
        description="Nous mettons l’accent sur la formation continue, le mentorat dès l’intégration et une mobilité interne pensée pour faire évoluer rapidement les profils les plus impliqués."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Développer ses compétences</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Coaching et mentorat dès l’arrivée dans l’équipe.</li>
              <li>Développement continu des compétences commerciales, sectorielles et conseil.</li>
              <li>Plan de mobilité interne pour accélérer la progression des collaborateurs.</li>
            </ul>
          </div>
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Reconnaître l’engagement</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Système de commission pour récompenser la performance.</li>
              <li>Redistribution d’une partie des bénéfices pour aligner réussite collective et individuelle.</li>
              <li>Équipe multiculturelle, persévérante, soudée et bienveillante dans un cadre agréable.</li>
            </ul>
          </div>
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Références"
        title="Des environnements variés, mais un même niveau d’exigence sur les talents."
        description="Les marques ci-dessous donnent un aperçu des secteurs et contextes dans lesquels nous intervenons."
      >
        <ReferenceMarquee items={references} />
      </SectionShell>
      <SectionShell
        eyebrow="FAQ"
        title="Questions fréquentes avant de nous solliciter."
        description="Une couche de réassurance utile pour les visiteurs, mais aussi pour l’indexation enrichie sur les pages à forte intention."
      >
        <div className="grid gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <h3 className="font-display text-3xl text-brand-ink">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-stone">{item.answer}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <SectionShell
        eyebrow="Et maintenant ?"
        title="Contactez-nous pour bénéficier d’une plateforme intuitive et de l’expertise du cabinet."
        description="Que vous cherchiez à recruter plus juste, à structurer votre organisation RH ou à rejoindre un environnement de travail plus exigeant, un premier échange permet de clarifier la bonne trajectoire."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8">
            <h3 className="font-display text-3xl text-brand-ink">Trois portes d’entrée claires</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Entreprises: prise de brief et cadrage du besoin.</li>
              <li>Partenaires: mise en relation, co-branding et contenus sectoriels.</li>
              <li>Candidats et profils conseil: échange exploratoire sur l’écosystème SKS TALENTS.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <CalendlyButton label="Réserver un call" tone="solid" />
              <CalendlyButton label="Être rappelé" href="/contact#rappel" tone="outline" />
            </div>
          </div>
          <div className="card-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Contact direct</p>
            <h3 className="mt-3 font-display text-3xl text-brand-ink">infos@skstalents.com</h3>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              Toutes les demandes de contact, de rappel et les leads qualifiés sont centralisés sur
              cette adresse pour garder un traitement simple, réactif et cohérent.
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-stone">
              La page est aussi pensée pour servir de point d’entrée SEO sur des requêtes comme
              cabinet de recrutement life sciences, recrutement biotech, recrutement diagnostic ou
              chasse de tête santé animale.
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
