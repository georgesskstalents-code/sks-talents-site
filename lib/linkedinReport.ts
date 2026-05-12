/**
 * LinkedIn section pour le weekly digest CEO.
 *
 * Mode placeholder : si les tables Supabase n'existent pas encore ou sont vides,
 * on affiche les headers + un message d'attente. Des que des donnees arrivent
 * (cron linkedin-kpis-weekly + linkedin-veille), la section se remplit toute seule.
 *
 * Schemas attendus (a aligner avec SQL Notion AI une fois fourni) :
 *
 *  linkedin_kpis_weekly :
 *    week_start (date), profile_followers, profile_followers_delta,
 *    profile_impressions_7d, profile_engagement_rate, profile_posts_count,
 *    profile_dms_qualified, page_followers, page_followers_delta,
 *    page_impressions_7d, page_engagement_rate, page_posts_count
 *
 *  linkedin_posts :
 *    published_at (timestamptz), network ('profile'|'page'), format,
 *    impressions, engagement_rate, comments_qualified, url
 *
 *  linkedin_veille :
 *    detected_at (timestamptz), source, title, url, category, relevance_score
 */

export type LinkedInKpiRow = {
  week_start?: string;
  profile_followers?: number;
  profile_followers_delta?: number;
  profile_impressions_7d?: number;
  profile_engagement_rate?: number;
  profile_posts_count?: number;
  profile_dms_qualified?: number;
  page_followers?: number;
  page_followers_delta?: number;
  page_impressions_7d?: number;
  page_engagement_rate?: number;
  page_posts_count?: number;
};

export type LinkedInPostRow = {
  published_at?: string;
  network?: string;
  format?: string;
  impressions?: number;
  engagement_rate?: number;
  comments_qualified?: number;
  url?: string;
};

export type LinkedInVeilleRow = {
  detected_at?: string;
  source?: string;
  title?: string;
  url?: string;
  category?: string;
  relevance_score?: number;
};

export type LinkedInSnapshot = {
  latestKpis: LinkedInKpiRow | null;
  topPosts: LinkedInPostRow[];
  veille: LinkedInVeilleRow[];
  available: boolean; // true si au moins une source a renvoye des donnees
};

async function fetchSupabase<T>(path: string): Promise<T[]> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  try {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store"
    });
    if (!response.ok) return [];
    return (await response.json()) as T[];
  } catch {
    return [];
  }
}

export async function fetchLinkedInSnapshot(): Promise<LinkedInSnapshot> {
  const sinceWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [kpis, posts, veille] = await Promise.all([
    fetchSupabase<LinkedInKpiRow>("linkedin_kpis_weekly?order=week_start.desc&limit=1"),
    fetchSupabase<LinkedInPostRow>(
      `linkedin_posts?published_at=gte.${encodeURIComponent(sinceWeek)}&order=engagement_rate.desc&limit=5`
    ),
    fetchSupabase<LinkedInVeilleRow>(
      `linkedin_veille?detected_at=gte.${encodeURIComponent(sinceWeek)}&order=relevance_score.desc&limit=6`
    )
  ]);

  return {
    latestKpis: kpis[0] ?? null,
    topPosts: posts,
    veille,
    available: Boolean(kpis[0] || posts.length || veille.length)
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtDelta(n: number | undefined): string {
  if (n === undefined || n === null) return "-";
  const sign = n >= 0 ? "+" : "";
  const color = n > 0 ? "#1a7a3e" : n < 0 ? "#a14a00" : "#5e6e72";
  return `<span style="color:${color};font-weight:600;">${sign}${n}</span>`;
}

function fmtPct(n: number | undefined): string {
  if (n === undefined || n === null) return "-";
  return `${(n * 100).toFixed(1)}%`;
}

function fmtNum(n: number | undefined): string {
  if (n === undefined || n === null) return "-";
  return new Intl.NumberFormat("fr-FR").format(n);
}

export function buildLinkedInSectionHtml(snapshot: LinkedInSnapshot): string {
  const kpis = snapshot.latestKpis;
  const hasKpis = kpis !== null;

  const profileRow = `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">Profil perso Georges</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:right;">${fmtNum(kpis?.profile_followers)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;text-align:right;">${fmtDelta(kpis?.profile_followers_delta)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtNum(kpis?.profile_impressions_7d)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtPct(kpis?.profile_engagement_rate)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:center;">${fmtNum(kpis?.profile_posts_count)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtNum(kpis?.profile_dms_qualified)}</td>
    </tr>`;

  const pageRow = `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">Page entreprise SKS</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:600 13px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:right;">${fmtNum(kpis?.page_followers)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;text-align:right;">${fmtDelta(kpis?.page_followers_delta)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtNum(kpis?.page_impressions_7d)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtPct(kpis?.page_engagement_rate)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:center;">${fmtNum(kpis?.page_posts_count)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">-</td>
    </tr>`;

  const postsRows = snapshot.topPosts.length
    ? snapshot.topPosts
        .map(
          (p) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;width:90px;">${p.published_at ? new Date(p.published_at).toLocaleDateString("fr-FR") : "-"}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:600 11px/1.4 -apple-system,sans-serif;color:#41a0a4;width:60px;">${escapeHtml(p.network ?? "-")}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;width:80px;">${escapeHtml(p.format ?? "-")}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:600 12px/1.4 'JetBrains Mono',monospace;color:#0f3a3c;text-align:right;">${fmtNum(p.impressions)}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;text-align:right;">${fmtPct(p.engagement_rate)}</td>
        </tr>`
        )
        .join("")
    : `<tr><td colspan="5" style="padding:14px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;text-align:center;font-style:italic;">Aucun post analyse cette semaine</td></tr>`;

  const veilleRows = snapshot.veille.length
    ? snapshot.veille
        .map(
          (v) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;width:90px;">${v.detected_at ? new Date(v.detected_at).toLocaleDateString("fr-FR") : "-"}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;width:120px;">${escapeHtml(v.source ?? "-")}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 12px/1.4 -apple-system,sans-serif;color:#0f1415;">
            ${v.url ? `<a href="${v.url}" style="color:#0f3a3c;text-decoration:none;">${escapeHtml(v.title ?? v.url)}</a>` : escapeHtml(v.title ?? "-")}
          </td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:600 10px/1.4 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#41a0a4;text-align:right;width:90px;">${escapeHtml(v.category ?? "-")}</td>
        </tr>`
        )
        .join("")
    : `<tr><td colspan="4" style="padding:14px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;text-align:center;font-style:italic;">Aucune actualite sectorielle scannee cette semaine</td></tr>`;

  const emptyBanner = !snapshot.available
    ? `<div style="margin-bottom:14px;padding:12px 14px;background:#eef6f5;border:1px solid #c5dfdc;border-radius:10px;font:13px/1.55 -apple-system,sans-serif;color:#0f3a3c;">
         <strong style="color:#0f3a3c;">Section en attente d'activation.</strong> Cette section se remplit automatiquement des que :
         (1) les tables Supabase <code>linkedin_kpis_weekly</code> / <code>linkedin_posts</code> / <code>linkedin_veille</code> sont creees,
         (2) le cron <code>/api/cron/linkedin-veille</code> tourne quotidiennement,
         (3) le CEO remplit les KPIs hebdo dans la DB Notion lundi 8h.
         Voir <code>docs/SETUP-STRATEGIC-TRACKING.md</code> et la memoire <code>project_linkedin_tracking.md</code>.
       </div>`
    : "";

  return `
    <tr><td style="padding:18px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Pilotage LinkedIn - profil perso + page entreprise</div>

      ${emptyBanner}

      <div style="margin-bottom:8px;font:600 13px/1.4 -apple-system,sans-serif;color:#0f3a3c;">
        KPIs hebdomadaires ${kpis?.week_start ? `(semaine du ${new Date(kpis.week_start).toLocaleDateString("fr-FR")})` : ""}
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr style="background:#fafbfa;">
          <th style="padding:10px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Compte</th>
          <th style="padding:10px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Followers</th>
          <th style="padding:10px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Δ S-1</th>
          <th style="padding:10px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Impr. 7j</th>
          <th style="padding:10px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Engt rate</th>
          <th style="padding:10px 14px;text-align:center;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Posts 7j</th>
          <th style="padding:10px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">DM qual</th>
        </tr>
        ${profileRow}
        ${pageRow}
      </table>

      ${!hasKpis ? `<div style="margin-top:8px;font:11px/1.55 -apple-system,sans-serif;color:#5e6e72;">Action lundi 8h : remplir 12 champs dans DB Notion "KPIs LinkedIn Weekly". Cron <code>linkedin-kpis-weekly</code> lit Notion -> Supabase lundi 6h30.</div>` : ""}

      <div style="margin:18px 0 8px;font:600 13px/1.4 -apple-system,sans-serif;color:#0f3a3c;">Top 5 posts (semaine ecoulee)</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr style="background:#fafbfa;">
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Date</th>
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Compte</th>
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Format</th>
          <th style="padding:8px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Impr.</th>
          <th style="padding:8px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Engt</th>
        </tr>
        ${postsRows}
      </table>

      <div style="margin:18px 0 8px;font:600 13px/1.4 -apple-system,sans-serif;color:#0f3a3c;">Veille sectorielle (carburant contenu)</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        <tr style="background:#fafbfa;">
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Date</th>
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Source</th>
          <th style="padding:8px 14px;text-align:left;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Actu</th>
          <th style="padding:8px 14px;text-align:right;font:600 10px/1.3 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5e6e72;">Categorie</th>
        </tr>
        ${veilleRows}
      </table>

      <div style="margin-top:14px;padding:10px 12px;background:#fff;border:1px solid #e1ece9;border-radius:10px;font:11px/1.55 -apple-system,sans-serif;color:#5e6e72;">
        <strong style="color:#0f3a3c;">Cadence cible :</strong> 3 posts /sem profil perso (lundi insight, mercredi cas concret, vendredi prise de position) + 2 posts /sem page entreprise (relais blog + cas anonymise).
        Mix formats : 40% texte court 200-400 mots, 30% carousel, 20% repost article blog, 10% video native 60s.
      </div>
    </td></tr>`;
}
