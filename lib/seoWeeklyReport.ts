/**
 * SEO sections of the Monday weekly digest.
 *
 * Two blocs assembled here :
 *   1. GSC quality signal - static-ish reminder card with the 393-URL baseline
 *      from the 2026-05-05 sitemap pruning. We don't yet have GSC OAuth wired,
 *      so this surfaces *what to check manually* on a 7→14 day horizon, plus
 *      the actionable warning if "Pages indexées" stays under 250.
 *
 *   2. Weekly keyword proposals - pulled from Supabase
 *      table `seo_keyword_proposals` (populated by /api/cron/seo-keywords every
 *      Monday 5h UTC). Shows the top 10 pending + the count breakdown so the
 *      CEO knows there's work to do in /dashboard/seo-keywords.
 *
 * Both helpers fail gracefully (empty state cards) when Supabase isn't
 * reachable - the weekly digest must always send.
 */

export type SeoKeywordProposalRow = {
  id: number;
  keyword: string;
  source_category: "fund" | "ecosystem" | "competitor" | "media";
  source_url: string;
  score: number;
  status: "pending" | "approved" | "rejected";
  proposed_at: string;
};

export type SeoKeywordsSnapshot = {
  pending: SeoKeywordProposalRow[];
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  lastProposedAt: string | null;
  reachable: boolean;
};

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";
const DASHBOARD_TOKEN = process.env.DASHBOARD_PRIVATE_TOKEN ?? "";

const CATEGORY_LABELS: Record<SeoKeywordProposalRow["source_category"], string> = {
  fund: "Fonds",
  ecosystem: "Écosystème",
  competitor: "Concurrent",
  media: "Média"
};

async function countByStatus(status: "pending" | "approved" | "rejected"): Promise<number> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return 0;
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/seo_keyword_proposals?status=eq.${status}&select=id`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "count=exact"
        },
        cache: "no-store"
      }
    );
    const range = r.headers.get("content-range");
    if (range) {
      const total = range.split("/")[1];
      if (total && total !== "*") return Number(total);
    }
    return ((await r.json()) as unknown[]).length;
  } catch {
    return 0;
  }
}

export async function fetchSeoKeywordsSnapshot(): Promise<SeoKeywordsSnapshot> {
  const empty: SeoKeywordsSnapshot = {
    pending: [],
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    lastProposedAt: null,
    reachable: false
  };
  if (!SUPABASE_URL || !SUPABASE_KEY) return empty;

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/seo_keyword_proposals?status=eq.pending&select=*&order=score.desc&limit=10`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store"
      }
    );
    if (!r.ok) return empty;
    const pending = (await r.json()) as SeoKeywordProposalRow[];

    const [pendingCount, approvedCount, rejectedCount] = await Promise.all([
      countByStatus("pending"),
      countByStatus("approved"),
      countByStatus("rejected")
    ]);

    return {
      pending,
      pendingCount,
      approvedCount,
      rejectedCount,
      lastProposedAt: pending[0]?.proposed_at ?? null,
      reachable: true
    };
  } catch {
    return empty;
  }
}

/**
 * GSC monitoring card. Static content - no Search Console API yet.
 * Surfaces the 393-URL baseline + the J+14 quality threshold (250).
 */
export function buildGscSectionHtml(): string {
  return `
    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Google Search Console - suivi 7-14 jours</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;">Sitemap soumis</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:right;">393 URLs</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">après pruning 2026-05-05 (621 → 393)</td>
        </tr>
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;">Cible "Indexées" sous 14j</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#1a7a3e;text-align:right;">≥ 250</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">à vérifier dans GSC → Couverture</td>
        </tr>
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;">Pages prioritaires soumises</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:right;">2 landings IA</td>
          <td style="padding:12px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">/animal-health · /life-sciences</td>
        </tr>
      </table>
      <div style="margin-top:12px;padding:12px 14px;background:#fff8ec;border:1px solid #fde8c8;border-radius:10px;font:13px/1.55 -apple-system,sans-serif;color:#7a4a14;">
        <strong style="color:#a14a00;">⚠ Alerte qualité - si à J+14 vous voyez moins de 250 pages indexées :</strong> il reste un signal de qualité à corriger, probablement contenu trop court sur certaines fiches métiers. Action : ouvrir <code>/dashboard/contenu</code>, filtrer par <code>job-roles</code>, repérer les fiches sans missions/skills/successFactors et compléter dans Notion. Le filtre <code>hasSubstance</code> du sitemap les exclura jusqu'à ce qu'elles soient remplies.
      </div>
    </td></tr>`;
}

/**
 * Weekly SEO keyword proposals card.
 * - If Supabase is reachable AND there are pending proposals → list top 10 + counts.
 * - If reachable but empty → green "tout traité" state.
 * - If unreachable → grey reminder that the cron is gated on Supabase config.
 */
export function buildKeywordsSectionHtml(snapshot: SeoKeywordsSnapshot): string {
  const dashboardUrl = `${SITE_URL}/dashboard/seo-keywords${DASHBOARD_TOKEN ? `?token=${DASHBOARD_TOKEN}` : ""}`;

  if (!snapshot.reachable) {
    return `
    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Mots-clés SEO proposés cette semaine</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr><td style="padding:14px;font:13px/1.55 -apple-system,sans-serif;color:#5e6e72;">
          ⓘ Pipeline de génération configuré (cron lundi 5h UTC sur 37 sources curées) mais Supabase n'est pas joignable. Pour activer : (1) crée la table <code>seo_keyword_proposals</code> via <code>supabase/schema.sql</code> ; (2) ajoute <code>SUPABASE_URL</code> + <code>SUPABASE_SERVICE_ROLE_KEY</code> sur Vercel.
        </td></tr>
      </table>
    </td></tr>`;
  }

  if (snapshot.pending.length === 0) {
    return `
    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Mots-clés SEO proposés cette semaine</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr><td style="padding:14px;font:13px/1.55 -apple-system,sans-serif;color:#1a7a3e;">
          ✓ Aucun mot-clé en attente. ${snapshot.approvedCount} approuvé(s) · ${snapshot.rejectedCount} refusé(s) au total.
          ${snapshot.lastProposedAt ? `<br/><span style="color:#5e6e72;font-size:12px;">Dernière proposition : ${new Date(snapshot.lastProposedAt).toLocaleDateString("fr-FR")}</span>` : ""}
        </td></tr>
      </table>
    </td></tr>`;
  }

  const rows = snapshot.pending
    .map(
      (p) => `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${escapeHtml(p.keyword)}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">${CATEGORY_LABELS[p.source_category]}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:600 11px/1.4 'JetBrains Mono',monospace;color:#41a0a4;text-align:right;">${Math.round(p.score * 100)}</td>
      </tr>`
    )
    .join("");

  return `
    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Mots-clés SEO à valider · ${snapshot.pendingCount} en attente</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        ${rows}
      </table>
      <div style="margin-top:10px;font:12px/1.5 -apple-system,sans-serif;color:#5e6e72;">
        Top 10 (${snapshot.pendingCount} au total) · ${snapshot.approvedCount} déjà approuvés · ${snapshot.rejectedCount} refusés.
        Les approuvés sont injectés dans la meta keywords + déclenchent un IndexNow ping.
      </div>
      <div style="margin-top:12px;">
        <a href="${dashboardUrl}" style="display:inline-block;background:#0f3a3c;color:#fff;font:600 13px/1 -apple-system,sans-serif;padding:11px 20px;border-radius:999px;text-decoration:none;">
          → Valider les ${snapshot.pendingCount} mot${snapshot.pendingCount > 1 ? "s" : ""}-clé${snapshot.pendingCount > 1 ? "s" : ""}
        </a>
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
