import type { DiagnosticQuestion } from "@/components/landings/DiagnosticForm";

export const animalHealthQuestions: [
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion
] = [
  {
    id: "q1",
    title: "Quelle est la nature de votre organisation ?",
    options: [
      { value: "A", label: "Groupement de cliniques vétérinaires en consolidation" },
      { value: "B", label: "Marque petfood multinationale (Mars, Royal Canin, Hill's…)" },
      { value: "C", label: "Marque petfood PME premium en hyper-croissance" },
      { value: "D", label: "Diagnostic vétérinaire / HealthTech vétérinaire" },
      { value: "E", label: "Autre" }
    ],
    otherOptionValues: ["E"]
  },
  {
    id: "q2",
    title: "Quelle est votre situation aujourd'hui ?",
    options: [
      { value: "A", label: "Phase d'acquisition active (1+ rachat tous les 3 mois)" },
      { value: "B", label: "Phase de scale commercial (équipe sales 5 → 20+)" },
      { value: "C", label: "Phase de structuration interne (process RH artisanaux)" },
      { value: "D", label: "Phase de levée / due diligence prochaine" },
      { value: "E", label: "Plusieurs phases en parallèle" },
      { value: "F", label: "Autre" }
    ],
    otherOptionValues: ["F"]
  },
  {
    id: "q3",
    title: "Lequel de ces problèmes vous coûte le plus aujourd'hui ?",
    options: [
      { value: "A", label: "Documentation juridique RH éclatée" },
      { value: "B", label: "Reporting CODIR multi-sites manuel sur Excel" },
      { value: "C", label: "Modélisation financière sans préconisations" },
      { value: "D", label: "Appels entrants ratés / leads perdus" },
      { value: "E", label: "Pipeline M&A peu structuré" },
      { value: "F", label: "Sales qui closent moins de 20 % des opportunités" },
      { value: "G", label: "Autre" }
    ],
    otherOptionValues: ["G"]
  },
  {
    id: "q4",
    title: "Combien d'heures par semaine votre équipe dirigeante perd-elle sur des tâches non-stratégiques ?",
    options: [
      { value: "A", label: "Moins de 5 heures (on est plutôt OK)" },
      { value: "B", label: "5 à 15 heures (ça commence à peser)" },
      { value: "C", label: "15 à 30 heures (c'est devenu critique)" },
      { value: "D", label: "Plus de 30 heures (on n'avance plus)" },
      { value: "E", label: "Autre" }
    ],
    otherOptionValues: ["E"]
  },
  {
    id: "q5",
    title: "Quel est votre objectif prioritaire dans les 6 prochains mois ?",
    options: [
      { value: "A", label: "Industrialiser nos process pour préparer une levée" },
      { value: "B", label: "Sécuriser nos acquisitions et limiter le turnover post-rachat" },
      { value: "C", label: "Doubler notre pipeline commercial" },
      { value: "D", label: "Libérer du temps direction pour la stratégie" },
      { value: "E", label: "Améliorer la qualité de nos décisions data-driven" },
      { value: "F", label: "Autre" }
    ],
    otherOptionValues: ["F"]
  }
];
