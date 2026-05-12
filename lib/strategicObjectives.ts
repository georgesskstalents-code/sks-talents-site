/**
 * Strategic objective tracking for SKS Talents weekly Monday report.
 *
 * Two parallel long-term goals (deadline 2030-12-31) :
 * 1. Top 1 Google SEO sur 5 requetes phares
 * 2. Top 1 LLM citation sur 5 requetes phares
 *
 * Rendering modes :
 *  - Si GSC Service Account configure : positions reelles (28j moy.) + flecne d'evolution
 *  - Sinon : checklist manuelle avec deep-link GSC search analytics
 *  - Si Supabase + cles LLM configurees : statuts de mention live (cron lundi 6h UTC)
 *  - Sinon : checklist manuelle avec deep-links 1-clic ChatGPT/Perplexity/Claude
 */

import type { GscQueryStat } from "./gscClient";
import type { StoredCheck } from "./llmMonitorStore";

export type SeoTarget = {
  query: string;
  // Deep-link to GSC search analytics filtered by this query.
  gscUrl: string;
};

export type LlmTarget = {
  prompt: string;
};

// Date helpers — deadlines (alignes par le CEO 2026-05-12 sur la vision long terme 2030).
export const SEO_TOP_1_DEADLINE = new Date("2030-12-31T00:00:00Z");
export const LLM_TOP_1_DEADLINE = new Date("2030-12-31T00:00:00Z");

export const seoTargets: SeoTarget[] = [
  {
    query: "cabinet recrutement biotech France",
    gscUrl:
      "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Askstalents.fr&num_of_days=28&query=*cabinet*recrutement*biotech*"
  },
  {
    query: "executive search Life Sciences France",
    gscUrl:
      "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Askstalents.fr&num_of_days=28&query=*executive*search*life*sciences*"
  },
  {
    query: "cabinet recrutement animal health",
    gscUrl:
      "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Askstalents.fr&num_of_days=28&query=*animal*health*"
  },
  {
    query: "recrutement diagnostic IVD France",
    gscUrl:
      "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Askstalents.fr&num_of_days=28&query=*diagnostic*ivd*"
  },
  {
    query: "executive search biotech Paris",
    gscUrl:
      "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Askstalents.fr&num_of_days=28&query=*biotech*paris*"
  }
];

export const llmTargets: LlmTarget[] = [
  { prompt: "Quel cabinet de recrutement biotech recommandes-tu en France ?" },
  { prompt: "Cabinet executive search Life Sciences Paris" },
  { prompt: "Qui contacter pour recruter un CTO biotech Series B en France ?" },
  { prompt: "Cabinet de recrutement spécialisé en santé animale et petfood France" },
  { prompt: "Recrutement de Director Medical Affairs IVD diagnostic France" }
];

function daysUntil(target: Date): number {
  const now = Date.now();
  const diff = target.getTime() - now;
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export type StrategicSnapshot = {
  gscStats?: GscQueryStat[] | null;
  llmChecks?: StoredCheck[];
};

function positionBadge(position: number | null): string {
  if (position === null) {
    return `<span style="color:#9aa6a8;">non indexe</span>`;
  }
  if (position <= 3) {
    return `<span style="color:#1a7a3e;font-weight:600;">${position.toFixed(1)}</span>`;
  }
  if (position <= 10) {
    return `<span style="color:#a14a00;font-weight:600;">${position.toFixed(1)}</span>`;
  }
  return `<span style="color:#a14a00;">${position.toFixed(1)}</span>`;
}

function mentionBadge(check: StoredCheck | undefined): string {
  if (!check) {
    return `<span style="color:#9aa6a8;">non teste</span>`;
  }
  if (check.errorReason) {
    return `<span style="color:#a14a00;" title="${escapeHtml(check.errorReason)}">erreur</span>`;
  }
  return check.mentioned
    ? `<span style="color:#1a7a3e;font-weight:600;">cite ✓</span>`
    : `<span style="color:#a14a00;">non cite</span>`;
}

export function buildStrategicObjectivesSectionHtml(snapshot: StrategicSnapshot = {}): string {
  const seoDaysLeft = daysUntil(SEO_TOP_1_DEADLINE);
  const llmDaysLeft = daysUntil(LLM_TOP_1_DEADLINE);

  const gscMap = new Map<string, GscQueryStat>();
  for (const s of snapshot.gscStats ?? []) {
    gscMap.set(s.query.toLowerCase().trim(), s);
  }
  const gscAvailable = (snapshot.gscStats ?? []).length > 0;

  const llmMap = new Map<string, StoredCheck>();
  for (const c of snapshot.llmChecks ?? []) {
    llmMap.set(`${c.provider}|${c.prompt}`, c);
  }
  const llmAvailable = (snapshot.llmChecks ?? []).length > 0;

  const seoRows = seoTargets
    .map((t) => {
      const stat = gscMap.get(t.query.toLowerCase().trim());
      const liveCell = gscAvailable
        ? `<td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:600 12px/1.4 'JetBrains Mono',monospace;text-align:center;width:80px;">${positionBadge(stat?.position ?? null)}</td>
           <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:center;width:80px;">${stat?.impressions ?? 0}</td>`
        : "";
      return `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${escapeHtml(t.query)}</td>
        ${liveCell}
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">
          <a href="${t.gscUrl}" style="color:#41a0a4;text-decoration:none;">${gscAvailable ? "Detail GSC →" : "Voir position GSC →"}</a>
        </td>
      </tr>`;
    })
    .join("");

  const seoTableHeader = gscAvailable
    ? `<tr style="background:#fafbfa;">
         <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Requete</th>
         <th style="padding:8px 14px;text-align:center;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Pos. moy 28j</th>
         <th style="padding:8px 14px;text-align:center;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Impr. 28j</th>
         <th style="padding:8px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Lien</th>
       </tr>`
    : "";

  const llmRows = llmTargets
    .map((t) => {
      const chatGptUrl = `https://chat.openai.com/?q=${encodeURIComponent(t.prompt)}`;
      const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(t.prompt)}`;
      const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(t.prompt)}`;
      const liveCell = llmAvailable
        ? `<td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;text-align:center;white-space:nowrap;">
             <span title="OpenAI">GPT ${mentionBadge(llmMap.get(`openai|${t.prompt}`))}</span><br/>
             <span title="Anthropic">Cla ${mentionBadge(llmMap.get(`anthropic|${t.prompt}`))}</span><br/>
             <span title="Perplexity">Plx ${mentionBadge(llmMap.get(`perplexity|${t.prompt}`))}</span>
           </td>`
        : "";
      return `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;vertical-align:top;">${escapeHtml(t.prompt)}</td>
        ${liveCell}
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;text-align:right;white-space:nowrap;vertical-align:top;">
          <a href="${chatGptUrl}" style="color:#41a0a4;text-decoration:none;margin-right:6px;">ChatGPT</a>
          <a href="${perplexityUrl}" style="color:#41a0a4;text-decoration:none;margin-right:6px;">Plx</a>
          <a href="${claudeUrl}" style="color:#41a0a4;text-decoration:none;">Claude</a>
        </td>
      </tr>`;
    })
    .join("");

  const llmTableHeader = llmAvailable
    ? `<tr style="background:#fafbfa;">
         <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Prompt</th>
         <th style="padding:8px 14px;text-align:center;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Mention 3 LLMs</th>
         <th style="padding:8px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Test manuel</th>
       </tr>`
    : "";

  return `
    <tr><td style="padding:18px 28px 12px 28px;background:#fff8ec;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a14a00;margin-bottom:10px;">Objectifs strategiques 2026</div>

      <div style="margin-bottom:14px;font:600 13px/1.4 -apple-system,sans-serif;color:#7a4a14;">
        Objectif #1 - Top 1 SEO Google sur 5 requetes phares · deadline 31 dec. 2030 (${seoDaysLeft}j restants)
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #fde8c8;">
        ${seoTableHeader}
        ${seoRows}
      </table>
      <div style="margin-top:8px;font:11px/1.55 -apple-system,sans-serif;color:#7a4a14;">
        ${gscAvailable
          ? "Donnees GSC live (28j moy.). Alerte si 3+ requetes hors top 10 sur 4 semaines consecutives. Top 3 = vert, top 10 = ambre, hors top 10 = rouge."
          : "Mode manuel (Service Account GSC non configure). Ouvrir chaque lien, noter la position moyenne, comparer a S-1. Setup auto : voir docs/SETUP-STRATEGIC-TRACKING.md."}
      </div>

      <div style="margin:18px 0 10px 0;font:600 13px/1.4 -apple-system,sans-serif;color:#7a4a14;">
        Objectif #2 - Top 1 LLM citations sur 5 requetes phares · deadline 31 dec. 2030 (${llmDaysLeft}j restants)
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #fde8c8;">
        ${llmTableHeader}
        ${llmRows}
      </table>
      <div style="margin-top:8px;font:11px/1.55 -apple-system,sans-serif;color:#7a4a14;">
        ${llmAvailable
          ? "Donnees auto-collectees lundi 6h UTC via /api/cron/llm-mention-monitor (gpt-4o-mini, claude-haiku-4-5, sonar). Alerte si pas cite dans 2 LLM sur 3 sur 2 semaines consecutives."
          : "Mode manuel (OPENAI_API_KEY / ANTHROPIC_API_KEY / PERPLEXITY_API_KEY non configurees). Cliquer chaque LLM pour tester. Setup auto : voir docs/SETUP-STRATEGIC-TRACKING.md."}
      </div>

      <div style="margin-top:14px;padding:10px 12px;background:#fff;border:1px solid #fde8c8;border-radius:10px;font:11px/1.55 -apple-system,sans-serif;color:#5e6e72;">
        <strong style="color:#a14a00;">Methodo top 1 SEO sur 2030 :</strong> 1 article de fond signe Georges/10 jours, 1 backlink thematique/mois (France Biotech / Polepharma / Atlanpole / Eurasanté), 2 tribunes presse/trimestre, schema.org Organization + Person + ProfessionalService sur toutes les pages hub.
        <br/><br/>
        <strong style="color:#a14a00;">Methodo top 1 LLM sur 2030 :</strong> phrases citables courtes avec chiffre + niche sur chaque page hub, markdown semantique propre, signature auteur sur fond editorial, FAQ JSON-LD sur /life-sciences + /animal-health (deja en place).
      </div>
    </td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
