import CalendlyButton from "@/components/CalendlyButton";
import LeadCapturePanel from "@/components/LeadCapturePanel";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Une page de contact pensée pour convertir sans pousser."
        description="Prenez rendez-vous directement si votre besoin est mûr, ou laissez-nous qualifier votre demande via un rappel rapide et cadré."
      />
      <section id="rappel" className="container-shell grid gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4">
          <div className="card-surface p-8">
            <p className="eyebrow">Version finale recommandée</p>
            <h2 className="font-display text-4xl">Une page contact à deux entrées.</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">
              Inspirée par la clarté d’OpenSourcing, mais adaptée à votre positionnement plus premium:
              une colonne de réassurance à gauche, un panneau interactif à droite, et un chemin
              explicite entre “je veux être rappelé” et “je veux réserver”.
            </p>
            <div className="mt-6 grid gap-3">
              <CalendlyButton label="Diagnostic gratuit" tone="solid" />
              <CalendlyButton label="Réserver un call" tone="outline" />
              <CalendlyButton label="Réserver un audit" tone="ghost" />
            </div>
            <div className="mt-6 rounded-3xl border border-brand-teal/10 bg-brand-mint/40 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Email de contact
              </p>
              <a
                href="mailto:infos@skstalents.com"
                className="mt-2 inline-flex text-lg font-semibold text-brand-ink transition hover:text-brand-teal"
              >
                infos@skstalents.com
              </a>
              <p className="mt-2 text-sm leading-7 text-brand-stone">
                Toutes les demandes de contact et de rappel sont centralisées sur cette adresse.
              </p>
            </div>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Ce que nous cadrons ensemble</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Nature du besoin: recrutement, onboarding, structuration RH ou combinaison des trois.</li>
              <li>Niveau de rareté du profil et cartographie rapide du marché cible.</li>
              <li>Priorités de timing, localisation et contexte managérial.</li>
              <li>Choix du bon mode d’accompagnement: mission ciblée, search complet ou structuration.</li>
            </ul>
          </div>
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl">Sécurité & traitement des leads</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-stone">
              <li>Validation côté serveur des champs critiques.</li>
              <li>Honeypot anti-spam et limitation des requêtes par IP.</li>
              <li>Possibilité de raccorder un webhook sécurisé sans exposer de secret côté client.</li>
              <li>Notifications d’entrée unifiées vers infos@skstalents.com.</li>
            </ul>
          </div>
        </div>
        <LeadCapturePanel variant="contact" />
      </section>
    </>
  );
}
