import { buildContentInventory, type ContentInventory } from "@/lib/contentInventory";
import { isAuthorizedCronRequest } from "@/lib/cronAuth";
import { sendDigestEmail } from "@/lib/resendEmail";
import { noStoreJson } from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";

function isAuthorized(request: Request): boolean {
  return isAuthorizedCronRequest({
    authorization: request.headers.get("authorization"),
    userAgent: request.headers.get("user-agent"),
    url: request.url,
    env: {
      cronSecret: process.env.CRON_SECRET,
      dashboardToken: process.env.DASHBOARD_PRIVATE_TOKEN
    }
  });
}

function fmtDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
}

function buildHtml(inv: ContentInventory, dashboardUrl: string): string {
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const kpiRows = inv.byType
    .filter((k) => k.total > 0)
    .map(
      (k) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;">${k.label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:600 14px/1.4 -apple-system,sans-serif;color:#0f3a3c;text-align:right;">${k.total}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:12px/1.4 -apple-system,sans-serif;color:#5e6e72;text-align:right;">${k.fromNotion} Notion · ${k.fromStatic} statique</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:600 12px/1.4 -apple-system,sans-serif;color:${k.publishedLast7d > 0 ? "#1a7a3e" : "#94a3b8"};text-align:right;">+${k.publishedLast7d}/7j</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f3f5;font:600 12px/1.4 -apple-system,sans-serif;color:${k.gaps > 0 ? "#a14a00" : "#94a3b8"};text-align:right;">${k.gaps > 0 ? `${k.gaps} gap${k.gaps > 1 ? "s" : ""}` : "—"}</td>
        </tr>`
    )
    .join("");

  const recentRows =
    inv.recentlyPublished.length > 0
      ? inv.recentlyPublished
          .slice(0, 8)
          .map(
            (r) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 'JetBrains Mono',monospace;color:#5e6e72;">${fmtDate(r.publishDate)}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:11px/1.4 -apple-system,sans-serif;color:#5e6e72;">${r.type}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #f1f3f5;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${r.title}</td>
        </tr>`
          )
          .join("")
      : `<tr><td style="padding:14px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;" colspan="3">Aucune publication datée. Pense à remplir <code>Publish date</code> sur tes entrées Notion.</td></tr>`;

  const gapsRows =
    inv.contentGaps.length > 0
      ? inv.contentGaps
          .slice(0, 8)
          .map(
            (g) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #fde8c8;font:11px/1.4 -apple-system,sans-serif;color:#a14a00;">${g.type}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #fde8c8;font:500 13px/1.4 -apple-system,sans-serif;color:#0f1415;">${g.title}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #fde8c8;font:11px/1.4 'JetBrains Mono',monospace;color:#a14a00;">${g.missing.join(", ")}</td>
        </tr>`
          )
          .join("")
      : `<tr><td style="padding:14px;font:13px/1.5 -apple-system,sans-serif;color:#1a7a3e;" colspan="3">✓ Toutes tes entrées Notion publiées ont les champs critiques remplis.</td></tr>`;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pilotage contenu — SKS Talents</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f3ee;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 6px 30px rgba(15,51,58,.08);">

    <tr><td style="padding:24px 28px 18px 28px;background:linear-gradient(135deg,#0f4d4f 0%,#1a5759 60%,#15333a 100%);color:#fff;">
      <div style="font:600 11px/1 -apple-system,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#9fd4d6;margin-bottom:8px;">Pilotage contenu</div>
      <div style="font:400 26px/1.15 'Source Serif 4',Georgia,serif;color:#fff;">SKS Talents — éditorial du ${today}</div>
      <div style="font:14px/1.55 -apple-system,sans-serif;color:rgba(255,255,255,.8);margin-top:10px;">${inv.totalEntries} fiches au total — ${inv.totalNotion} via Notion, ${inv.totalStatic} via code.</div>
    </td></tr>

    <tr><td style="padding:24px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Inventaire par type</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        ${kpiRows || `<tr><td style="padding:14px;font:13px/1.5 -apple-system,sans-serif;color:#5e6e72;">Aucune donnée encore (Notion vide ou non accessible).</td></tr>`}
      </table>
    </td></tr>

    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Publié récemment</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;">
        ${recentRows}
      </table>
    </td></tr>

    <tr><td style="padding:12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a86620;margin-bottom:10px;">⚠ Champs manquants dans Notion</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff8ec;border-radius:12px;border:1px solid #fde8c8;">
        ${gapsRows}
      </table>
    </td></tr>

    <tr><td style="padding:18px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:14px;">Ton workflow pour publier</div>
      <ol style="margin:0;padding-left:18px;font:13px/1.7 -apple-system,sans-serif;color:#0f1415;">
        <li>Ouvre Notion → DB <strong>Website Content SKS Talents</strong> → "+ New".</li>
        <li>Remplis <code>Title</code>, <code>Slug</code> (kebab-case unique), <code>Content Type</code>, <code>Vertical</code>, <code>Excerpt</code>, <code>Main Content</code>.</li>
        <li>Passe <code>Status</code> sur <strong>Published</strong>.</li>
        <li>30s plus tard, la page est en ligne sur <a href="${SITE_URL}" style="color:#41a0a4;">${SITE_URL.replace("https://", "")}</a>.</li>
        <li>Pour retirer : <code>Status = Draft</code> ou archive la page Notion.</li>
      </ol>
    </td></tr>

    <tr><td style="padding:20px 28px 28px 28px;background:#fafbfa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding:8px 4px;">
            <a href="${dashboardUrl}" style="display:inline-block;background:#15333a;color:#fff;font:600 14px/1 -apple-system,sans-serif;padding:14px 24px;border-radius:999px;text-decoration:none;">→ Ouvrir le dashboard contenu</a>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:18px 28px 28px 28px;background:#15333a;color:rgba(255,255,255,.65);font:12px/1.6 -apple-system,sans-serif;">
      <div style="font-weight:600;color:#fff;margin-bottom:4px;">SKS Talents · Éditorial</div>
      <div>Email automatique chaque lundi à 8h. Source : DB Notion "Website Content SKS Talents" + fichiers data/*.</div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

async function buildAndSend() {
  const inv = await buildContentInventory();
  const token = process.env.DASHBOARD_PRIVATE_TOKEN;
  const dashboardUrl = `${SITE_URL}/dashboard/contenu${token ? `?token=${token}` : ""}`;
  const html = buildHtml(inv, dashboardUrl);
  const subject = `Pilotage contenu — ${inv.totalEntries} fiches · ${inv.contentGaps.length} gap${inv.contentGaps.length === 1 ? "" : "s"}`;

  const result = await sendDigestEmail({
    html,
    subject,
    fromLabel: "SKS Talents Contenu"
  });

  return {
    ok: result.sent,
    sent: result.sent,
    summary: {
      totalEntries: inv.totalEntries,
      totalNotion: inv.totalNotion,
      totalStatic: inv.totalStatic,
      gaps: inv.contentGaps.length,
      recentlyPublished: inv.recentlyPublished.length
    },
    delivery: result
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }
  try {
    const result = await buildAndSend();
    return noStoreJson(result, result.ok ? 200 : 500);
  } catch (error) {
    return noStoreJson(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
