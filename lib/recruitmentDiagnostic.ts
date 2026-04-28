export type AnswerValue = "0" | "2" | "4";

export type BlockerValue =
  | "sourcing"
  | "decision"
  | "onboarding"
  | "automation"
  | "structuration";

export type Answers = {
  hiringVolume: AnswerValue | "";
  timeToHire: AnswerValue | "";
  leaderTime: AnswerValue | "";
  processMaturity: AnswerValue | "";
  mainBlocker: BlockerValue | "";
};

export const initialAnswers: Answers = {
  hiringVolume: "",
  timeToHire: "",
  leaderTime: "",
  processMaturity: "",
  mainBlocker: ""
};

export const diagnosticQuestions = [
  {
    id: "hiringVolume",
    title: "Combien de recrutements prévoyez-vous sur les 12 prochains mois ?",
    options: [
      { label: "0 à 5 recrutements", value: "0" },
      { label: "6 à 15 recrutements", value: "2" },
      { label: "15 recrutements ou plus", value: "4" }
    ]
  },
  {
    id: "timeToHire",
    title: "Combien de temps prend un recrutement critique chez vous ?",
    options: [
      { label: "Moins de 30 jours", value: "0" },
      { label: "Entre 30 et 60 jours", value: "2" },
      { label: "Plus de 60 jours", value: "4" }
    ]
  },
  {
    id: "leaderTime",
    title: "Combien de temps dirigeant ou manager est absorbé chaque semaine par les RH ?",
    options: [
      { label: "Moins de 2 heures", value: "0" },
      { label: "Entre 2 et 5 heures", value: "2" },
      { label: "Plus de 5 heures", value: "4" }
    ]
  },
  {
    id: "processMaturity",
    title: "Comment jugez-vous votre niveau de structuration RH aujourd’hui ?",
    options: [
      { label: "Clair et déjà posé", value: "0" },
      { label: "Partiel, selon les sujets", value: "2" },
      { label: "Encore très artisanal", value: "4" }
    ]
  },
  {
    id: "mainBlocker",
    title: "Quel est votre blocage principal aujourd’hui ?",
    options: [
      { label: "Les bons profils ne répondent pas", value: "sourcing" },
      { label: "Les décisions internes sont trop lentes", value: "decision" },
      { label: "L’onboarding ou l’intégration tiennent mal", value: "onboarding" },
      { label: "Les tâches RH répétitives mangent le temps", value: "automation" },
      { label: "Il faut structurer avant d’embaucher davantage", value: "structuration" }
    ]
  }
] as const;

export function parseScore(value: AnswerValue | "") {
  return value ? Number(value) : 0;
}

export function isDiagnosticComplete(answers: Answers) {
  return Boolean(
    answers.hiringVolume &&
      answers.timeToHire &&
      answers.leaderTime &&
      answers.processMaturity &&
      answers.mainBlocker
  );
}

export function getDiagnosticResult(answers: Answers) {
  const totalScore =
    parseScore(answers.hiringVolume) +
    parseScore(answers.timeToHire) +
    parseScore(answers.leaderTime) +
    parseScore(answers.processMaturity);

  const sourcingScore =
    parseScore(answers.timeToHire) + (answers.mainBlocker === "sourcing" ? 4 : 0);
  const structurationScore =
    parseScore(answers.processMaturity) +
    parseScore(answers.hiringVolume) +
    (answers.mainBlocker === "structuration" || answers.mainBlocker === "onboarding" ? 4 : 0);
  const automationScore =
    parseScore(answers.leaderTime) +
    parseScore(answers.processMaturity) +
    (answers.mainBlocker === "automation" ? 4 : 0);
  const rpoScore =
    parseScore(answers.hiringVolume) +
    parseScore(answers.timeToHire) +
    (answers.mainBlocker === "decision" ? 3 : 0);

  const scoreMap = [
    {
      key: "executive-search",
      label: "Executive search ciblée",
      href: "/executive-search-life-sciences",
      reason: "Le marché doit être lu et approché plus directement.",
      score: sourcingScore
    },
    {
      key: "structuration-rh",
      label: "Structuration RH",
      href: "/structuration-rh-startup-sante",
      reason: "Votre croissance a besoin d’un socle RH plus lisible et plus robuste.",
      score: structurationScore
    },
    {
      key: "automation",
      label: "Automatisation RH utile",
      href: "/automatisation-processus-rh-sante",
      reason: "Le temps perdu vient surtout des tâches répétitives et du manque de fluidité.",
      score: automationScore
    },
    {
      key: "rpo",
      label: "RPO / Talent Advisory Partner",
      href: "/rpo-recrutement-life-sciences",
      reason: "Le volume et la cadence des recrutements exigent une capacité embarquée.",
      score: rpoScore
    }
  ].sort((a, b) => b.score - a.score);

  const topRecommendation = scoreMap[0];

  const health =
    totalScore >= 13
      ? {
          title: "Votre recrutement freine déjà votre croissance.",
          tone: "critical",
          summary:
            "Le problème n’est probablement plus seulement la rareté du marché. Il vient aussi du système : cadrage, décision, structuration RH et capacité d’exécution."
        }
      : totalScore >= 7
        ? {
            title: "Votre croissance avance avec friction.",
            tone: "warning",
            summary:
              "Le socle existe, mais il n’est pas encore assez structuré pour absorber sereinement la suite. C’est le bon moment pour corriger avant que la friction ne coûte plus cher."
          }
        : {
            title: "Votre base est saine, mais elle doit être sécurisée avant le scale.",
            tone: "healthy",
            summary:
              "Votre système tient encore. L’enjeu est maintenant d’anticiper la prochaine phase de croissance pour éviter que le recrutement ou les RH ne deviennent un frein."
          };

  const priorities = [
    parseScore(answers.timeToHire) >= 2 || answers.mainBlocker === "sourcing"
      ? "Resserrez le brief, réduisez les boucles de décision et renforcez la chasse sur les profils passifs."
      : null,
    parseScore(answers.processMaturity) >= 2 || answers.mainBlocker === "structuration"
      ? "Posez un socle simple : recrutement, onboarding et suivi de performance, avant d’ajouter plus d’outils."
      : null,
    parseScore(answers.leaderTime) >= 2 || answers.mainBlocker === "automation"
      ? "Automatisez les tâches répétitives qui capturent le temps dirigeant ou manager sans créer de valeur relationnelle."
      : null,
    parseScore(answers.hiringVolume) >= 2 || answers.mainBlocker === "decision"
      ? "Traitez le sujet comme une machine de croissance : séquence des rôles, priorisation et capacité d’exécution."
      : null,
    "Reliez chaque recrutement à un enjeu business visible : performance, rétention, go-to-market ou capacité d’exécution."
  ].filter(Boolean) as string[];

  return {
    totalScore,
    health,
    topRecommendation,
    priorities: priorities.slice(0, 3)
  };
}

function pickSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function asAnswerValue(value: string | undefined): AnswerValue | "" {
  return value === "0" || value === "2" || value === "4" ? value : "";
}

function asBlockerValue(value: string | undefined): BlockerValue | "" {
  return value === "sourcing" ||
    value === "decision" ||
    value === "onboarding" ||
    value === "automation" ||
    value === "structuration"
    ? value
    : "";
}

export function getAnswersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Answers {
  return {
    hiringVolume: asAnswerValue(pickSingleValue(searchParams.hiringVolume)),
    timeToHire: asAnswerValue(pickSingleValue(searchParams.timeToHire)),
    leaderTime: asAnswerValue(pickSingleValue(searchParams.leaderTime)),
    processMaturity: asAnswerValue(pickSingleValue(searchParams.processMaturity)),
    mainBlocker: asBlockerValue(pickSingleValue(searchParams.mainBlocker))
  };
}

export function buildDiagnosticReportHref(answers: Answers) {
  const params = new URLSearchParams({
    hiringVolume: answers.hiringVolume,
    timeToHire: answers.timeToHire,
    leaderTime: answers.leaderTime,
    processMaturity: answers.processMaturity,
    mainBlocker: answers.mainBlocker
  });

  return `/diagnostic/rapport?${params.toString()}`;
}
