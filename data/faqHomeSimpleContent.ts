export type FaqHomeSimpleItem = {
  num: string;
  category: string;
  question: string;
  answer: string;
};

export const FAQ_HOME_SIMPLE_ITEMS: ReadonlyArray<FaqHomeSimpleItem> = [
  {
    num: "01",
    category: "Secteurs",
    question: "Dans quels secteurs pouvez-vous m'accompagner ?",
    answer:
      "Life Sciences et Animal Health : biotech, deeptech biomatériaux, e-santé, diagnostic, microbiologie, petfood et réseaux vétérinaires."
  },
  {
    num: "02",
    category: "Services",
    question: "Quels sont vos services ?",
    answer:
      "Trois leviers : cabinet exécutif sur les rôles critiques (CEO, COO, CPO/DRH), transformation / structuration pour faire grandir l'organisation sans désordre, et RPO pour fluidifier l'exécution recrutement."
  },
  {
    num: "03",
    category: "Garanties",
    question: "Quelles garanties offrez-vous sur vos placements ?",
    answer:
      "92% missions satisfaites. Si la prise de poste ne tient pas, nous relançons la recherche sans frais supplémentaires."
  },
  {
    num: "04",
    category: "Programme IA",
    question: "Comment implémenter l'IA sans bousculer la culture ?",
    answer:
      "Nous automatisons les tâches répétitives pour structurer vos process : reporting board, onboarding, anticipation des recrutements critiques. L'arbitrage sur les profils et la relation candidat restent humains."
  }
];

export function getFaqHomeSimpleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_HOME_SIMPLE_ITEMS.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer }
    }))
  };
}
