import CalendlyButton from "@/components/CalendlyButton";

const chapters = [
  {
    chapter: "Chapitre 1",
    title: "On part du vrai problème, pas du brief",
    body:
      "Avant d’ouvrir un mandat, nous passons une heure avec vous à challenger le besoin : pourquoi ce poste maintenant en Série A, Série B ou scale-up ? Quel impact business attendu ? Quelle marge de manœuvre RH ? Cette étape évite 80 % des recrutements Life Sciences & Santé animale qui patinent."
  },
  {
    chapter: "Chapitre 2",
    title: "On lit le marché à votre place",
    body:
      "Pénurie réelle ou imaginaire ? Qui bouge dans votre vertical biotech, diagnostic, medtech, vétérinaire ou petfood ? Quels concurrents Série A/B recrutent les mêmes profils ? Nous activons notre réseau spécialisé Life Sciences & Santé animale pour vous apporter une lecture marché claire — pas une liste de CV."
  },
  {
    chapter: "Chapitre 3",
    title: "On présente peu, mais juste",
    body:
      "Une shortlist de 3 candidats lisibles vaut mieux que 12 CV à trier. Chaque profil arrive avec un dossier comparatif (parcours, motivations, fit business, signaux à creuser) pour que la décision soit rapide et défendable au COMEX."
  },
  {
    chapter: "Chapitre 4",
    title: "On structure pour libérer la stratégie et l’humain",
    body:
      "Au-delà du recrutement, nous structurons la fonction RH par la digitalisation et l’automatisation des tâches à faible valeur ajoutée. La direction se concentre sur la stratégie et l’humain — là où se joue vraiment le succès des projets Life Sciences & Santé animale."
  }
];

export default function MethodNarrative() {
  return (
    <section className="container-shell pb-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="lg:sticky lg:top-32 space-y-6">
          <p className="eyebrow">Notre méthode racontée</p>
          <h2 className="font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl">
            <span className="text-brand-teal">4 chapitres</span> qui transforment un recrutement
            sensible en mission lisible.
          </h2>
          <p className="text-base leading-8 text-brand-stone">
            Beaucoup de cabinets vendent un process en 4 étapes. Nous racontons le nôtre comme une
            histoire, parce que recruter un dirigeant Life Sciences &amp; Santé animale en Série A,
            Série B ou scale-up ressemble plus à un voyage qu’à une checklist. Chaque chapitre est
            une étape concrète, traçable, et explicable au COMEX.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <CalendlyButton label="Réserver 15 min d’analyse" tone="solid" />
            <CalendlyButton label="Voir un cas concret" href="/references" tone="outline" />
          </div>
        </div>

        <div className="relative space-y-5">
          <div className="pointer-events-none absolute left-[2.05rem] top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand-teal/30 via-brand-teal/10 to-transparent sm:block" />
          {chapters.map((chap, idx) => (
            <article
              key={chap.title}
              className="card-luxe panel-lift relative flex gap-5 p-6 sm:p-8"
            >
              <div className="relative flex shrink-0 flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white shadow-[0_8px_24px_rgba(20,82,84,0.25)]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                  {chap.chapter}
                </p>
                <h3 className="font-display text-2xl leading-[1.15] text-brand-ink sm:text-[28px]">
                  {chap.title}
                </h3>
                <p className="text-sm leading-7 text-brand-stone sm:text-[15px] sm:leading-8">
                  {chap.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
