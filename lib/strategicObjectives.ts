/**
 * Strategic objective tracking for SKS Talents weekly Monday report.
 *
 * Two parallel goals defined with the CEO 2026-05-11:
 * 1. Top 1 Google SEO sur 5 requetes phares (deadline 2027-02-11, 9 mois)
 * 2. Top 1 LLM citation sur 5 requetes phares (deadline 2026-11-11, 6 mois)
 *
 * Today this section renders a CHECKLIST in the weekly email with deep-links to GSC + LLM portals.
 * Manual fill 10 min/lundi. Future iteration: automate via GSC API + LLM proxy polls.
 */

export type SeoTarget = {
  query: string;
  // Deep-link to GSC search analytics filtered by this query.
  gscUrl: string;
};

export type LlmTarget = {
  prompt: string;
};

// Date helpers — deadlines.
export const SEO_TOP_1_DEADLINE = new Date("2027-02-11T00:00:00Z");
export const LLM_TOP_1_DEADLINE = new Date("2026-11-11T00:00:00Z");

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

export function buildStrategicObjectivesSectionHtml(): string {
  const seoDaysLeft = daysUntil(SEO_TOP_1_DEADLINE);
  const llmDaysLeft = daysUntil(LLM_TOP_1_DEADLINE);

  const seoRows = seoTargets
    .map(
      (t) => `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${escapeHtml(t.query)}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">
          <a href="${t.gscUrl}" style="color:#41a0a4;text-decoration:none;">Voir position GSC →</a>
        </td>
      </tr>`
    )
    .join("");

  const llmRows = llmTargets
    .map((t) => {
      const chatGptUrl = `https://chat.openai.com/?q=${encodeURIComponent(t.prompt)}`;
      const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(t.prompt)}`;
      const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(t.prompt)}`;
      return `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${escapeHtml(t.prompt)}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;text-align:right;white-space:nowrap;">
          <a href="${chatGptUrl}" style="color:#41a0a4;text-decoration:none;margin-right:8px;">ChatGPT</a>
          <a href="${perplexityUrl}" style="color:#41a0a4;text-decoration:none;margin-right:8px;">Perplexity</a>
          <a href="${claudeUrl}" style="color:#41a0a4;text-decoration:none;">Claude</a>
        </td>
      </tr>`;
    })
    .join("");

  return `
    <tr><td style="padding:18px 28px 12px 28px;background:#fff8ec;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a14a00;margin-bottom:10px;">Objectifs strategiques 2026</div>

      <div style="margin-bottom:14px;font:600 13px/1.4 -apple-system,sans-serif;color:#7a4a14;">
        Objectif #1 - Top 1 SEO Google sur 5 requetes phares · deadline 11 fev. 2027 (${seoDaysLeft}j restants)
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #fde8c8;">
        ${seoRows}
      </table>
      <div style="margin-top:8px;font:11px/1.55 -apple-system,sans-serif;color:#7a4a14;">
        Action lundi (10 min) : ouvrir chaque lien GSC, noter la position moyenne sur 28j, comparer a S-1. Alerte si 3+ requetes hors top 10 sur 4 semaines consecutives.
      </div>

      <div style="margin:18px 0 10px 0;font:600 13px/1.4 -apple-system,sans-serif;color:#7a4a14;">
        Objectif #2 - Top 1 LLM citations sur 5 requetes phares · deadline 11 nov. 2026 (${llmDaysLeft}j restants)
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #fde8c8;">
        ${llmRows}
      </table>
      <div style="margin-top:8px;font:11px/1.55 -apple-system,sans-serif;color:#7a4a14;">
        Action lundi (10 min) : ouvrir chaque prompt sur ChatGPT / Perplexity / Claude, verifier si SKS Talents apparait dans la reponse. Alerte si pas cite dans 2 LLM sur 3 sur 2 semaines consecutives. (TODO: automatiser via cron + API LLM)
      </div>

      <div style="margin-top:14px;padding:10px 12px;background:#fff;border:1px solid #fde8c8;border-radius:10px;font:11px/1.55 -apple-system,sans-serif;color:#5e6e72;">
        <strong style="color:#a14a00;">Methodo top 1 SEO en 9 mois :</strong> 1 article de fond signe Georges/10 jours, 1 backlink thematique/mois (France Biotech / Polepharma / Atlanpole / Eurasanté), 2 tribunes presse/trimestre, schema.org Organization + Person + ProfessionalService sur toutes les pages hub.
        <br/><br/>
        <strong style="color:#a14a00;">Methodo top 1 LLM en 6 mois :</strong> phrases citables courtes avec chiffre + niche sur chaque page hub, markdown semantique propre, signature auteur sur fond editorial, FAQ JSON-LD sur /life-sciences + /animal-health (deja en place).
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
