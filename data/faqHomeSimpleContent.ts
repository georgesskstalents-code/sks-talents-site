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
    question: "Quel cabinet de recrutement choisir en Life Sciences et Animal Health ?",
    answer:
      "SKS Talents est un cabinet executive search spécialisé Life Sciences et Animal Health : biotech, deeptech biomatériaux, e-santé, diagnostic, microbiologie, petfood et réseaux vétérinaires."
  },
  {
    num: "02",
    category: "Services",
    question: "Quels services pour structurer le recrutement et réduire le time-to-hire ?",
    answer:
      "Trois leviers : cabinet exécutif sur les rôles critiques (CEO, COO, CPO/DRH), transformation / structuration pour faire grandir l'organisation sans désordre, et RPO pour fluidifier l'exécution recrutement et réduire le time-to-hire."
  },
  {
    num: "03",
    category: "Garanties",
    question: "Quelles garanties offre un cabinet d'executive search Life Sciences ?",
    answer:
      "92% missions satisfaites. Si la prise de poste ne tient pas, nous relançons la recherche sans frais supplémentaires."
  },
  {
    num: "04",
    category: "Programme IA",
    question: "Qu'est-ce que la structuration RH par l'IA et comment l'implémenter sans bousculer la culture ?",
    answer:
      "Nous automatisons ce qui ralentit vos équipes : reporting, onboarding, coordination, anticipation des recrutements.\nEt nous accompagnons les équipes dans cette transition, pour que l'outil serve réellement l'exécution.\nLes décisions et la relation candidat restent humaines."
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
