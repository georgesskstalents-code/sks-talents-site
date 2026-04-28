export const newsletterCadence = {
  label: "2 editions par mois",
  schedule: "Premier vendredi + dernier vendredi du mois",
  readTime: "5 minutes de lecture max"
} as const;

export const newsletterPromisePillars = [
  {
    title: "Signaux marche",
    description:
      "Les signaux qui comptent vraiment sur vos verticales : tensions de recrutement, mouvements d'ecosysteme, financements et arbitrages utiles."
  },
  {
    title: "Metiers & salaires",
    description:
      "Les fonctions penuriques, les reperes de remuneration et les zones de friction qui ralentissent une equipe ou un recrutement."
  },
  {
    title: "Ecosysteme",
    description:
      "Les acteurs, evenements, ecoles, clusters, reseaux et sources officielles qui comptent quand il faut lire un marche serieusement."
  },
  {
    title: "Decisions dirigeants",
    description:
      "Une lecture courte pour aider CEO, COO, DRH et CPO a mieux cadrer une decision recrutement, structuration ou mobilite."
  }
] as const;

export const newsletterSegments = [
  {
    id: "recruiting-leader",
    label: "Dirigeant qui recrute",
    description:
      "Pour CEO, COO, fondateurs et managers qui doivent cadrer un role critique, accelerer une shortlist ou mieux lire leur marche."
  },
  {
    id: "hr-structuring",
    label: "DRH / CPO / structuration",
    description:
      "Pour DRH, CPO et responsables talent qui ont besoin d'une lecture plus nette sur les salaires, les metiers et la structuration RH."
  },
  {
    id: "mobility-leader",
    label: "Dirigeant / cadre en mobilite",
    description:
      "Pour dirigeants et cadres en repositionnement qui veulent rester exposes aux signaux utiles, aux benchmarks et aux trajectoires credibles."
  }
] as const;

export type NewsletterSegmentId = (typeof newsletterSegments)[number]["id"];

export function getNewsletterSegment(segmentId?: string) {
  return newsletterSegments.find((item) => item.id === segmentId) ?? newsletterSegments[0];
}

export const newsletterWelcomeSequence = [
  {
    step: "Email 1",
    title: "Bienvenue + meilleure ressource",
    description:
      "Le point d'entree pour comprendre la promesse SKS, les signaux suivis et la premiere ressource a ouvrir."
  },
  {
    step: "Email 2",
    title: "Contenus piliers",
    description:
      "Les pages fortes a lire en priorite : recherche, ressources, pages metiers, articles de fond et hubs de reference."
  },
  {
    step: "Email 3",
    title: "Benchmark / etude / page forte",
    description:
      "Une piece premium reliee a un vrai besoin : benchmark salaires, etude de marche ou livre blanc exploitable."
  },
  {
    step: "Email 4",
    title: "Proposition d'echange",
    description:
      "Une invitation simple a ouvrir la conversation si le lecteur veut cadrer un enjeu recrutement, RH ou trajectoire."
  }
] as const;

export const newsletterEditionExamples = [
  {
    title: "Le signal marche du mois",
    description:
      "Une lecture courte pour relier un signal chaud a ses consequences concretes sur le recrutement et la structuration."
  },
  {
    title: "La tension talent a surveiller",
    description:
      "Un focus sur un metier penurique, un angle de remuneration ou une zone de friction qui compte pour decider plus juste."
  },
  {
    title: "Le repere ecosysteme utile",
    description:
      "Une source officielle, un acteur, un event, une ecole ou un mouvement a connaitre pour rester au bon niveau de lecture."
  }
] as const;
