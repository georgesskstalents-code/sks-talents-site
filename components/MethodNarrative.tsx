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
      "Pénurie réelle ou imaginaire ? Qui bouge dans votre vertical biotech, diagnostic, vétérinaire ou petfood ? Quels concurrents Série A/B recrutent les mêmes profils ? Nous activons notre réseau spécialisé Life Sciences & Santé animale pour vous apporter une lecture marché claire, pas une liste de CV."
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
      "Au-delà du recrutement, nous structurons la fonction RH par la digitalisation et l’automatisation des tâches à faible valeur ajoutée. La direction se concentre sur la stratégie et l’humain, là où se joue vraiment le succès des projets Life Sciences & Santé animale."
  }
];

export default function MethodNarrative() {
  return (
    <section className="container-shell pb-8">
      {/* Intro on top, full width, compact */}
      <div className="mx-auto mb-8 max-w-3xl space-y-4 text-center">
        <p className="eyebrow">Notre méthode racontée</p>
        <h2 className="font-display text-[26px] leading-[1.15] text-brand-ink sm:text-4xl sm:leading-[1.1]">
          <span className="text-brand-teal">4 chapitres</span> qui transforment un recrutement
          sensible en mission lisible.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-brand-stone sm:text-[15px]">
          Recruter un dirigeant Life Sciences &amp; Santé animale en Série A, Série B ou scale-up
          ressemble plus à un voyage qu’à une checklist. Chaque chapitre est une étape concrète,
          traçable, et explicable au COMEX.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          <CalendlyButton label="Réserver 15 min d’analyse" tone="solid" />
          <CalendlyButton label="Voir un cas concret" href="/references" tone="outline" />
        </div>
      </div>

      {/* 4 chapters in a 2x2 grid - more compact than vertical stack */}
      <div className="grid gap-4 md:grid-cols-2">
        {chapters.map((chap, idx) => (
          <article
            key={chap.title}
            className="card-luxe panel-lift flex gap-4 p-5 sm:p-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-xs font-bold text-white shadow-[0_6px_18px_rgba(20,82,84,0.22)]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                {chap.chapter}
              </p>
              <h3 className="font-display text-base leading-[1.25] text-brand-ink sm:text-xl sm:leading-[1.2]">
                {chap.title}
              </h3>
              <p className="text-[13px] leading-6 text-brand-stone">{chap.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
