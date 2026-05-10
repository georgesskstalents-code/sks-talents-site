/**
 * Diagnostic matching engine - pure functions, fully testable.
 *
 * Two diagnostics share the same shape: 5 multi-choice questions
 * (Q1=profil, Q2=stade, Q3=douleur principale, Q4=mesure, Q5=objectif 6 mois)
 * + final lead fields. The matcher maps Q3 to a primary AI agent + 2 complements,
 * weighted by Q1/Q2/Q4/Q5.
 */

export type DiagnosticSector = "animal-health" | "life-sciences";

export type DiagnosticAnswers = {
  q1: string; // profil
  q2: string; // maturité / stade
  q3: string; // douleur n°1 (drives the primary recommendation)
  q4: string; // mesure (heures perdues / proximité board)
  q5: string; // objectif 6 mois
  q1Other?: string;
  q2Other?: string;
  q3Other?: string;
  q4Other?: string;
  q5Other?: string;
};

export type DiagnosticLead = {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
};

export type AIAgent = {
  id: string;
  label: string;
  badge?: "DÉMO ⭐" | "PREMIUM" | "NOUVEAU";
  pitch: string;
  roiHeadline: string;
  iconKey: string;
};

export type DiagnosticResult = {
  sector: DiagnosticSector;
  primary: AIAgent;
  complements: [AIAgent, AIAgent];
  roiSummary: string;
  priorities: [string, string, string];
  frictionScore: { axis: string; score: number }[];
};

// ---------------------------------------------------------------- Animal Health

const ANIMAL_HEALTH_AGENTS: Record<string, AIAgent> = {
  A: {
    id: "ah-juridique-rh",
    label: "Agent Juridique RH multi-sites",
    pitch:
      "Centralise contrats, génère avenants conformes à la convention vétérinaire, alerte échéances, prépare due diligences.",
    roiHeadline: "Due diligence 48h vs 2 sem",
    iconKey: "FileText"
  },
  B: {
    id: "ah-reporting-dirigeant",
    label: "Agent Reporting Dirigeant multi-sites",
    badge: "DÉMO ⭐",
    pitch:
      "Compile auto les KPI de toutes vos cliniques. Dashboard CODIR prêt chaque lundi avec alertes contextuelles.",
    roiHeadline: "3 jours → 4 minutes",
    iconKey: "BarChart3"
  },
  C: {
    id: "ah-cfo-copilot",
    label: "Agent CFO Copilot multi-sites",
    pitch:
      "Modélise P&L par clinique, détecte écarts, émet préconisations stratégiques, simule scénarios d'acquisition.",
    roiHeadline: "Cash 12 mois fiable à 95 %",
    iconKey: "TrendingUp"
  },
  D: {
    id: "ah-lead-catcher",
    label: "Agent Lead Catcher 24/7",
    pitch:
      "Réceptionne, qualifie et route les appels entrants. Détecte les leads chauds en 30 secondes.",
    roiHeadline: "0 % leads perdus · 24/7",
    iconKey: "Phone"
  },
  E: {
    id: "ah-ma-pipeline",
    label: "Agent M&A Pipeline vétérinaire",
    badge: "PREMIUM",
    pitch:
      "Sourcing automatique des cliniques cibles (KBIS, comptes annuels, géolocalisation). Score chaque cible. Pilote pipeline prospection.",
    roiHeadline: "Closing 15 % → 35 %",
    iconKey: "Activity"
  },
  F: {
    id: "ah-sales-closer",
    label: "Agent Sales Closer vétérinaire",
    pitch:
      "Analyse calls commerciaux, score leads, suggère next actions, prépare RDV, détecte deals à risque.",
    roiHeadline: "+30 % closing · ramp-up 6 sem",
    iconKey: "CheckCircle"
  }
};

const ANIMAL_HEALTH_PRIMARY_BY_Q3: Record<string, AIAgent> = {
  A: ANIMAL_HEALTH_AGENTS.A,
  B: ANIMAL_HEALTH_AGENTS.B,
  C: ANIMAL_HEALTH_AGENTS.C,
  D: ANIMAL_HEALTH_AGENTS.D,
  E: ANIMAL_HEALTH_AGENTS.E,
  F: ANIMAL_HEALTH_AGENTS.F
};

// ---------------------------------------------------------------- Life Sciences

const LIFE_SCIENCES_AGENTS: Record<string, AIAgent> = {
  A: {
    id: "ls-ceo-copilot",
    label: "Agent CEO Copilot stratégique",
    badge: "DÉMO ⭐",
    pitch:
      "Connecte roadmap R&D + ATS + données financières. Anticipe besoins talent 6 mois à l'avance. Génère vos board packs auto.",
    roiHeadline: "+6 mois d'anticipation",
    iconKey: "Compass"
  },
  B: {
    id: "ls-talent-intelligence",
    label: "Agent Talent Intelligence",
    pitch:
      "Cartographie en continu les talents Life Sciences dans votre segment. Identifie les profils passifs.",
    roiHeadline: "Time-to-fill -50 % · 10 j 1re shortlist",
    iconKey: "Search"
  },
  C: {
    id: "ls-reporting-investisseurs",
    label: "Agent Reporting Investisseurs",
    pitch:
      "Génère vos rapports talent pour comex, board et data room investisseurs. Format adapté.",
    roiHeadline: "Board pack en 5 min",
    iconKey: "FileBarChart"
  },
  D: {
    id: "ls-sales-talent",
    label: "Agent Sales Talent (VP Sales biotech)",
    pitch:
      "Sourcing profils rares senior commerciaux biotech. Maîtrise négociation gros comptes pharma.",
    roiHeadline: "Sourcing profils rares senior",
    iconKey: "CheckCircle"
  },
  E: {
    id: "ls-onboarding-retention",
    label: "Agent Onboarding & Rétention",
    badge: "NOUVEAU",
    pitch:
      "Pilote l'onboarding 90 jours de chaque profil senior. Co-construit le plan d'évolution 24 mois. Détecte les signaux faibles à 60 jours.",
    roiHeadline: "−60 % turnover 1ère année",
    iconKey: "Heart"
  },
  F: {
    id: "ls-scaleup-playbook",
    label: "Agent Scale-up Playbook",
    pitch:
      "Bibliothèque vivante de process RH, templates et benchmarks par phase de croissance.",
    roiHeadline: "Process scaling Series A → C",
    iconKey: "TrendingUp"
  }
};

// Q3 mapping for life-sciences (different order than animal-health):
// A=Reporting board → Agent C, B=Burn rate → Agent A (CEO Copilot ⭐),
// C=Time-to-fill → Agent B, D=Commercial → Agent D, E=Onboarding → Agent E,
// F=Process scaling → Agent F.
const LIFE_SCIENCES_PRIMARY_BY_Q3: Record<string, AIAgent> = {
  A: LIFE_SCIENCES_AGENTS.C,
  B: LIFE_SCIENCES_AGENTS.A,
  C: LIFE_SCIENCES_AGENTS.B,
  D: LIFE_SCIENCES_AGENTS.D,
  E: LIFE_SCIENCES_AGENTS.E,
  F: LIFE_SCIENCES_AGENTS.F
};

// ---------------------------------------------------------------- Matcher

function pickComplements(all: AIAgent[], primary: AIAgent): [AIAgent, AIAgent] {
  const others = all.filter((a) => a.id !== primary.id);
  // Prefer agents with badges first (DÉMO ⭐ / PREMIUM / NOUVEAU)
  const sorted = others.sort((a, b) => {
    const aBadge = a.badge ? 0 : 1;
    const bBadge = b.badge ? 0 : 1;
    return aBadge - bBadge;
  });
  return [sorted[0], sorted[1]];
}

function buildFrictionScore(answers: DiagnosticAnswers): { axis: string; score: number }[] {
  // Heuristic: Q4 dominates the friction signal. Higher hours = higher friction.
  const q4Map: Record<string, number> = {
    A: 20, // <5h or <1mo board
    B: 45, // 5-15h or 1-3mo
    C: 70, // 15-30h or 3-6mo
    D: 90, // >30h or no board defined
    E: 50, // mixed / "Autre"
    F: 50
  };
  const baseFriction = q4Map[answers.q4] ?? 50;
  return [
    { axis: "Charge dirigeants", score: baseFriction },
    { axis: "Reporting", score: Math.min(95, baseFriction + 10) },
    { axis: "Data driven", score: Math.max(20, baseFriction - 15) },
    { axis: "Commercial", score: Math.max(25, baseFriction - 10) },
    { axis: "Talent", score: Math.min(90, baseFriction + 5) }
  ];
}

function buildPriorities(
  sector: DiagnosticSector,
  answers: DiagnosticAnswers,
  primary: AIAgent
): [string, string, string] {
  if (sector === "animal-health") {
    return [
      `Déployer ${primary.label} en pilote - ROI cible : ${primary.roiHeadline}`,
      "Cadrer la fiche métier hybride correspondante (vétérinaire + business, ou KAM + scientifique)",
      "Mesurer en J+90 : heures dirigeants récupérées, qualité des décisions, pipeline acquisitions"
    ];
  }
  return [
    `Activer ${primary.label} avant votre prochain board - ROI : ${primary.roiHeadline}`,
    "Cartographier les 3 hires critiques 6 mois à l'avance via l'agent Talent Intelligence",
    "Industrialiser l'onboarding 90 jours pour −60 % de turnover senior première année"
  ];
}

export function matchDiagnostic(
  sector: DiagnosticSector,
  answers: DiagnosticAnswers
): DiagnosticResult {
  const agentsByKey =
    sector === "animal-health" ? ANIMAL_HEALTH_AGENTS : LIFE_SCIENCES_AGENTS;
  const primaryMap =
    sector === "animal-health"
      ? ANIMAL_HEALTH_PRIMARY_BY_Q3
      : LIFE_SCIENCES_PRIMARY_BY_Q3;

  const allAgents = Object.values(agentsByKey);
  // Default primary = the "DÉMO ⭐" agent (B for animal-health, A for life-sciences)
  const fallback = sector === "animal-health" ? agentsByKey.B : agentsByKey.A;
  const primary = primaryMap[answers.q3] ?? fallback;
  const complements = pickComplements(allAgents, primary);

  return {
    sector,
    primary,
    complements,
    roiSummary: primary.roiHeadline,
    priorities: buildPriorities(sector, answers, primary),
    frictionScore: buildFrictionScore(answers)
  };
}

export const ANIMAL_HEALTH_AGENTS_LIST = Object.values(ANIMAL_HEALTH_AGENTS);
export const LIFE_SCIENCES_AGENTS_LIST = Object.values(LIFE_SCIENCES_AGENTS);
