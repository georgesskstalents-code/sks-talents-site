/**
 * Generators HTML pour les 2 livrables emailes apres soumission du formulaire diagnostic gated.
 *  - Benchmark salaires : grille par vertical + Series A/B/C
 *  - Plan d'action 12 mois personnalise selon les reponses du diagnostic
 */

import { salaryBenchmarks, getVerticalLabel, type Vertical } from "@/data/salaryBenchmarks";
import type { Answers, BlockerValue } from "@/lib/recruitmentDiagnostic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function benchmarkTableHtml(v: Vertical): string {
  const rows = salaryBenchmarks[v]
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">
          ${escapeHtml(r.role)}
          ${r.note ? `<div style="font:11px/1.5 -apple-system,sans-serif;color:#5e6e72;margin-top:3px;">${escapeHtml(r.note)}</div>` : ""}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:center;">${r.seriesA} k€</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:center;">${r.seriesB} k€</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:center;">${r.seriesC} k€</td>
      </tr>`
    )
    .join("");

  return `
    <h3 style="margin:24px 0 10px;font:600 16px/1.4 -apple-system,sans-serif;color:#0f3a3c;">
      ${getVerticalLabel(v)}
    </h3>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border:1px solid #e1ece9;border-radius:10px;">
      <thead>
        <tr style="background:#fafbfa;">
          <th style="padding:10px 12px;text-align:left;font:600 11px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Role</th>
          <th style="padding:10px 12px;text-align:center;font:600 11px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Series A</th>
          <th style="padding:10px 12px;text-align:center;font:600 11px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Series B</th>
          <th style="padding:10px 12px;text-align:center;font:600 11px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Series C</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

// ----------------- Plan d'action 12 mois ---------------------------

const BLOCKER_LABELS: Record<BlockerValue, string> = {
  sourcing: "Les bons profils ne repondent pas",
  decision: "Les decisions internes sont trop lentes",
  onboarding: "L'onboarding tient mal",
  automation: "Les taches RH repetitives mangent le temps",
  structuration: "Il faut structurer avant d'embaucher davantage"
};

type ActionStep = { month: string; title: string; detail: string };

function buildActionPlan(answers: Answers): ActionStep[] {
  const isHighVolume = answers.hiringVolume === "4";
  const isSlowTtH = answers.timeToHire === "4";
  const isLeaderOverloaded = answers.leaderTime === "4";
  const isArtisanal = answers.processMaturity === "4";
  const blocker = answers.mainBlocker;

  const steps: ActionStep[] = [];

  // Mois 1-2 : cadrage prioritaire selon le blocker principal
  if (blocker === "sourcing" || isSlowTtH) {
    steps.push({
      month: "Mois 1-2",
      title: "Cartographier le marche cible et activer 2 canaux sourcing",
      detail:
        "Definir avec precision le profil ideal (Series, vertical, fonctions clefs). Lancer un mapping LinkedIn + 1 partenaire executive search sur les roles les plus critiques. Objectif : 5 candidats qualifies en pipeline a J+30."
    });
  }
  if (blocker === "structuration" || isArtisanal) {
    steps.push({
      month: "Mois 1-2",
      title: "Mettre a plat les process RH dirigeants",
      detail:
        "Audit eclair : org chart cible J+12 mois, scorecard par poste, process de prise de decision (qui valide quoi). Livrable : 1 doc partage CODIR + 5 fiches de poste rediscutees."
    });
  }
  if (blocker === "decision") {
    steps.push({
      month: "Mois 1-2",
      title: "Fluidifier le process de decision interne",
      detail:
        "Etablir un calendrier hebdo CODIR avec 30min dediees aux validations RH. Definir les criteres de go/no-go en amont. Objectif : decision sur shortlist en 5 jours max."
    });
  }
  if (blocker === "onboarding") {
    steps.push({
      month: "Mois 1-2",
      title: "Concevoir un onboarding 90j robuste",
      detail:
        "Definir les jalons J+30 / J+60 / J+90 pour chaque nouveau cadre. Identifier un parrain interne + un point hebdo manager. Reduire le turnover precoce."
    });
  }
  if (blocker === "automation" || isLeaderOverloaded) {
    steps.push({
      month: "Mois 1-2",
      title: "Identifier les 3 taches RH a automatiser en priorite",
      detail:
        "Audit du temps dirigeant absorbe par les RH. Cibler reporting, planning ou compliance documentaire. Premier livrable POC IA sous 30 jours."
    });
  }

  // Mois 3-6 : actions de fond
  if (isHighVolume) {
    steps.push({
      month: "Mois 3-6",
      title: "Industrialiser 50% du sourcing en RPO partiel",
      detail:
        "Externaliser sourcing + qualification pre-entretien sur les volumes recurrents (commerciaux, technico-commerciaux, tech leads). Garder en interne le closing + onboarding."
    });
  } else {
    steps.push({
      month: "Mois 3-6",
      title: "Recrutement signature C-level via executive search",
      detail:
        "Identifier le poste structurant qui debloque la croissance (VP Sales, CTO, Head of CMC selon vertical). Process complet en 60-90 jours avec garantie 90j post-prise de poste."
    });
  }

  if (isLeaderOverloaded || blocker === "automation") {
    steps.push({
      month: "Mois 3-6",
      title: "Deployer 1 agent IA RH operationnel",
      detail:
        "Agent CEO Copilot (anticipation recrutements 6 mois) ou Agent Reporting Multi-Sites (consolidation petfood / clinique veterinaire) selon vertical. Objectif : recuperer 10h/semaine de temps dirigeant."
    });
  }

  // Mois 7-12 : consolidation
  steps.push({
    month: "Mois 7-12",
    title: "Boucler la trajectoire RH 12 mois",
    detail: isHighVolume
      ? "Bilan trimestriel sur les 3 premiers C-level recrutes. Onboarding stabilise. Pipeline RPO autonome. Reflechir au prochain palier (Series B/C ou levee suivante)."
      : "Consolider l'organisation autour des 1-2 recrutements signature. Mesurer impact business (ARR, time-to-market, ROI). Anticiper le palier suivant."
  });

  return steps;
}

function actionPlanHtml(answers: Answers): string {
  const steps = buildActionPlan(answers);
  const stepsHtml = steps
    .map(
      (s) => `
      <tr>
        <td style="padding:14px 12px;border-bottom:1px solid #f1f3f5;font:600 11px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#41a0a4;width:100px;vertical-align:top;">${s.month}</td>
        <td style="padding:14px 12px;border-bottom:1px solid #f1f3f5;font:13px/1.55 -apple-system,sans-serif;color:#0f1415;">
          <div style="font-weight:600;color:#0f3a3c;margin-bottom:4px;">${escapeHtml(s.title)}</div>
          <div style="color:#3a4a4c;">${escapeHtml(s.detail)}</div>
        </td>
      </tr>`
    )
    .join("");

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border:1px solid #e1ece9;border-radius:10px;margin-top:8px;">
      <tbody>${stepsHtml}</tbody>
    </table>`;
}

// ----------------- Email complet ----------------------------------

export function buildDeliverablesEmailHtml(opts: {
  firstName?: string;
  answers: Answers;
}): string {
  const blocker = opts.answers.mainBlocker;
  const blockerLabel = blocker ? BLOCKER_LABELS[blocker as BlockerValue] : "Blocage non specifie";
  const hello = opts.firstName ? `Bonjour ${escapeHtml(opts.firstName)},` : "Bonjour,";

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f7f6;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#0f1415;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7f6;padding:24px 12px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,.08);">
        <tr><td style="padding:24px 28px;background:#0f3a3c;color:#fff;">
          <div style="font:600 12px/1.3 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a8d4d4;">SKS Talents - Livrables diagnostic</div>
          <h1 style="margin:8px 0 0;font:600 24px/1.3 -apple-system,sans-serif;">Vos benchmarks salaires + plan 12 mois</h1>
        </td></tr>

        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 12px;font:14px/1.65 -apple-system,sans-serif;color:#0f1415;">${hello}</p>
          <p style="margin:0 0 16px;font:14px/1.65 -apple-system,sans-serif;color:#3a4a4c;">
            Merci d'avoir complete le diagnostic SKS Talents. Voici les deux livrables qui correspondent a votre situation actuelle. Tout est pret a etre imprime ou sauvegarde en PDF (Ctrl+P / Cmd+P depuis votre navigateur si vous ouvrez cet email dans un onglet).
          </p>
          <div style="padding:14px 16px;background:#fff8ec;border:1px solid #fde8c8;border-radius:10px;font:13px/1.6 -apple-system,sans-serif;color:#7a4a14;">
            <strong style="color:#a14a00;">Votre blocage principal :</strong> ${escapeHtml(blockerLabel)}
          </div>
        </td></tr>

        <tr><td style="padding:0 28px 24px;">
          <h2 style="margin:0 0 4px;font:600 18px/1.3 -apple-system,sans-serif;color:#0f3a3c;">1. Benchmark salaires France 2026</h2>
          <p style="margin:0 0 4px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;">
            Fixes annuels bruts en k€. Packages totaux varient selon BSPCE, bonus et equity.
          </p>
          ${benchmarkTableHtml("biotech")}
          ${benchmarkTableHtml("animal-health")}
          <p style="margin:14px 0 0;font:12px/1.5 -apple-system,sans-serif;color:#5e6e72;">
            Source : observations terrain SKS Talents 2024-2026 sur 100+ placements C-level Life Sciences & Animal Health France. Mise a jour : ${new Date().toLocaleDateString("fr-FR")}.
          </p>
        </td></tr>

        <tr><td style="padding:0 28px 24px;">
          <h2 style="margin:0 0 4px;font:600 18px/1.3 -apple-system,sans-serif;color:#0f3a3c;">2. Plan d'action 12 mois personnalise</h2>
          <p style="margin:0 0 12px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;">
            Etapes recommandees en fonction de vos reponses. Adaptable selon votre rythme.
          </p>
          ${actionPlanHtml(opts.answers)}
        </td></tr>

        <tr><td style="padding:24px 28px;background:#fafbfa;text-align:center;">
          <p style="margin:0 0 14px;font:14px/1.55 -apple-system,sans-serif;color:#0f3a3c;font-weight:600;">
            Envie d'aller plus loin ?
          </p>
          <p style="margin:0 0 18px;font:13px/1.65 -apple-system,sans-serif;color:#3a4a4c;">
            Reservez 15 min avec Georges Kengue pour discuter de la trajectoire la plus pertinente sur votre cas.
          </p>
          <a href="https://calendly.com/g-kengue/talentconsulting" style="display:inline-block;background:#0f3a3c;color:#fff;font:600 13px/1 -apple-system,sans-serif;padding:13px 24px;border-radius:999px;text-decoration:none;">Reserver 15 min - Calendly</a>
        </td></tr>

        <tr><td style="padding:18px 28px;background:#0f3a3c;color:#a8d4d4;font:11px/1.5 -apple-system,sans-serif;text-align:center;">
          SKS Talents - Executive Search Life Sciences & Sante animale - <a href="${SITE_URL}" style="color:#a8d4d4;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
