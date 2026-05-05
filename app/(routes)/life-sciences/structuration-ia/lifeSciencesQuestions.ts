import type { DiagnosticQuestion } from "@/components/landings/DiagnosticForm";

export const lifeSciencesQuestions: [
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion,
  DiagnosticQuestion
] = [
  {
    id: "q1",
    title: "Quel est le profil de votre startup ?",
    options: [
      { value: "A", label: "Biotech (oncologie, thérapie cellulaire, gene therapy)" },
      { value: "B", label: "Medtech (dispositifs médicaux, IVD, électromédical)" },
      { value: "C", label: "Deeptech biomatériaux" },
      { value: "D", label: "E-santé / Digital Health / SaaS B2B santé" },
      { value: "E", label: "Diagnostic IVD / Life Sciences industriel" },
      { value: "F", label: "Autre" }
    ],
    otherOptionValues: ["F"]
  },
  {
    id: "q2",
    title: "Quel est votre stade actuel ?",
    options: [
      { value: "A", label: "Pre-Series A" },
      { value: "B", label: "Series A (5-10 M€)" },
      { value: "C", label: "Series B (10-30 M€)" },
      { value: "D", label: "Series C+ (30 M€+)" },
      { value: "E", label: "Scale-up post-Series C" },
      { value: "F", label: "Autre" }
    ],
    otherOptionValues: ["F"]
  },
  {
    id: "q3",
    title: "Lequel de ces problèmes vous coûte le plus aujourd'hui ?",
    options: [
      { value: "A", label: "Reporting talent au board / fonds périmé" },
      { value: "B", label: "Burn rate humain non maîtrisé (180-250k€/mois)" },
      { value: "C", label: "Time-to-fill profils rares" },
      { value: "D", label: "Commercial bloqué (objectif ARR non atteint)" },
      { value: "E", label: "Onboarding raté (VP qui partent à 6 mois)" },
      { value: "F", label: "Process scaling non adapté" },
      { value: "G", label: "Autre" }
    ],
    otherOptionValues: ["G"]
  },
  {
    id: "q4",
    title: "Quand est votre prochain board ?",
    options: [
      { value: "A", label: "Moins d'1 mois" },
      { value: "B", label: "1 à 3 mois" },
      { value: "C", label: "3 à 6 mois" },
      { value: "D", label: "Pas de board défini" },
      { value: "E", label: "Autre" }
    ],
    otherOptionValues: ["E"]
  },
  {
    id: "q5",
    title: "Quelle est votre priorité stratégique sur 6 mois ?",
    options: [
      { value: "A", label: "Préparer ma prochaine levée" },
      { value: "B", label: "Recruter 2-3 profils critiques R&D" },
      { value: "C", label: "Industrialiser mon prototype" },
      { value: "D", label: "Atteindre mes objectifs ARR commerciaux" },
      { value: "E", label: "Réduire mon turnover senior" },
      { value: "F", label: "Structurer ma fonction RH pour scaler" },
      { value: "G", label: "Autre" }
    ],
    otherOptionValues: ["G"]
  }
];
