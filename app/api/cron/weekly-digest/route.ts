import {
  readLeadEventLog,
  readSiteAnalyticsLog,
  type LeadEventLog,
  type SiteAnalyticsEvent
} from "@/lib/siteIntelligence";
import { noStoreJson } from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = "g.kengue@skstalents.fr";
const SITE_URL = "https://www.skstalents.fr";

function dayMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function inRange(timestamp: string | undefined, start: number, end: number) {
  if (!timestamp) return false;
  const t = new Date(timestamp).getTime();
  if (Number.isNaN(t)) return false;
  return t >= start && t < end;
}

function pct(current: number, previous: number): { delta: number; arrow: "↑" | "↓" | "→"; tone: "positive" | "negative" | "neutral" } {
  if (previous === 0) {
    return current > 0
      ? { delta: 100, arrow: "↑", tone: "positive" }
      : { delta: 0, arrow: "→", tone: "neutral" };
  }
  const delta = Math.round(((current - previous) / previous) * 100);
  if (delta > 0) return { delta, arrow: "↑", tone: "positive" };
  if (delta < 0) return { delta, arrow: "↓", tone: "negative" };
  return { delta: 0, arrow: "→", tone: "neutral" };
}

function topN<T extends string | undefined>(items: (T | undefined)[], n: number) {
  const map = new Map<string, number>();
  for (const item of items) {
    if (!item) continue;
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function isoDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function buildActions(
  pageviewDelta: number,
  contentGapsCount: number,
  errorsCount: number,
  leadsCurrent: number,
  leadsPrev: number,
  topQueries: { key: string; count: number }[]
): string[] {
  const actions: string[] = [];

  if (pageviewDelta < -15) {
    actions.push("📉 Trafic en baisse > 15 %. Vérifier Search Console (erreurs d'indexation, requêtes perdues) + Google Analytics 4 (sources qui ont chuté).");
  } else if (pageviewDelta > 25) {
    actions.push("📈 Trafic en forte hausse. Identifier la source de croissance et l'amplifier (campagne, article viral, mention presse).");
  }

  if (contentGapsCount >= 3) {
    actions.push(`✍️ ${contentGapsCount} questions sans réponse au chat → créer ${Math.min(contentGapsCount, 3)} articles ou fiches métiers cette semaine pour capter ces requêtes.`);
  }

  if (errorsCount > 0) {
    actions.push(`⚠️ ${errorsCount} erreurs (formulaires ou JS) à investiguer dans le dashboard. Chaque erreur = un lead potentiellement perdu.`);
  }

  if (leadsCurrent < leadsPrev && leadsPrev > 0) {
    actions.push("💼 Leads en baisse cette semaine. Tester un nouveau CTA ou une variante du formulaire (A/B test simple : 'Réserver 15 min' vs 'Diagnostic gratuit').");
  } else if (leadsCurrent === 0) {
    actions.push("🎯 0 lead capté cette semaine. Action prioritaire : (1) brancher Search Console, (2) lancer une campagne LinkedIn ciblée CEO biotech, (3) relancer ton réseau direct.");
  }

  if (topQueries.length > 0) {
    actions.push(`🔍 Top recherche chat : « ${topQueries[0].key.slice(0, 60)} » (${topQueries[0].count}× cette semaine). Vérifier que la page qui répond est bien optimisée et linkée depuis la home.`);
  }

  // Always-on actions
  actions.push("⭐ Trustpilot : répondre aux nouveaux avis (renforce le SEO + la réassurance B2B).");
  actions.push("📝 Mettre à jour ton Notion 'Suivi SKS Talents' avec les insights de la semaine.");
  actions.push("📅 Planifier 1 RDV LinkedIn cette semaine avec un dirigeant biotech / vétérinaire (toujours pousser la pipeline sales).");

  return actions.slice(0, 8);
}

function buildHtmlEmail(opts: {
  startLabel: string;
  endLabel: string;
  pageviewsCur: number;
  pageviewsPrev: number;
  uniqueSessionsCur: number;
  uniqueSessionsPrev: number;
  conversionsCur: number;
  conversionsPrev: number;
  leadsCur: number;
  leadsPrev: number;
  ctaClicksCur: number;
  ctaClicksPrev: number;
  formSuccessCur: number;
  formSubmitsCur: number;
  topPages: { key: string; count: number }[];
  topQueries: { key: string; count: number }[];
  contentGaps: { key: string; count: number }[];
  recentLeads: LeadEventLog[];
  actions: string[];
  dashboardUrl: string;
  suiviUrl: string;
}) {
  const pv = pct(opts.pageviewsCur, opts.pageviewsPrev);
  const us = pct(opts.uniqueSessionsCur, opts.uniqueSessionsPrev);
  const cv = pct(opts.conversionsCur, opts.conversionsPrev);
  const ld = pct(opts.leadsCur, opts.leadsPrev);
  const cta = pct(opts.ctaClicksCur, opts.ctaClicksPrev);
  const conversionRate = opts.formSubmitsCur > 0
    ? Math.round((opts.formSuccessCur / opts.formSubmitsCur) * 100)
    : 0;

  const kpiCard = (
    label: string,
    value: string,
    sub: string,
    tone: "positive" | "negative" | "neutral",
    dark = false
  ) => {
    const bg = dark ? "#0f4d4f" : "#ffffff";
    const fg = dark ? "#ffffff" : "#15333a";
    const subColor = tone === "positive" ? "#0a7d4a" : tone === "negative" ? "#b81d24" : "#5b6f73";
    const subBg = tone === "positive" ? "#d6f3e3" : tone === "negative" ? "#fae0e0" : "#e6efee";
    return `<td valign="top" width="33%" style="padding:6px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${bg};border-radius:14px;border:1px solid #e1ece9;">
        <tr><td style="padding:18px 18px 14px 18px;">
          <div style="font:600 10px/1 -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${dark ? "#a8d6d8" : "#5b6f73"};">${label}</div>
          <div style="font:400 32px/1.05 'Source Serif 4',Georgia,serif;color:${fg};margin-top:8px;">${value}</div>
          <div style="display:inline-block;background:${subBg};color:${subColor};font:600 11px/1.2 -apple-system,sans-serif;padding:4px 8px;border-radius:999px;margin-top:8px;">${sub}</div>
        </td></tr>
      </table>
    </td>`;
  };

  const pillStatus = (label: string, tone: "positive" | "negative" | "neutral") => {
    const colors = tone === "positive"
      ? { bg: "#d6f3e3", fg: "#0a7d4a", dot: "#10b981" }
      : tone === "negative"
        ? { bg: "#fae0e0", fg: "#b81d24", dot: "#ef4444" }
        : { bg: "#e6efee", fg: "#15333a", dot: "#41a0a4" };
    return `<span style="display:inline-block;background:${colors.bg};color:${colors.fg};font:600 12px/1.4 -apple-system,sans-serif;padding:6px 12px;border-radius:999px;margin:2px 4px 2px 0;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${colors.dot};margin-right:6px;vertical-align:middle;"></span>${label}</span>`;
  };

  const topPagesRows = opts.topPages.length > 0
    ? opts.topPages.map((p, i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f1;font:600 13px/1.4 -apple-system,monospace;color:#15333a;"><span style="color:#9aa9aa;font-family:monospace;">${String(i + 1).padStart(2, "0")}</span> &nbsp;<a href="${SITE_URL}${p.key}" style="color:#15333a;text-decoration:none;">${p.key}</a></td><td style="padding:8px 0;border-bottom:1px solid #eef2f1;text-align:right;font:600 13px/1.4 -apple-system,sans-serif;color:#41a0a4;">${fmt(p.count)} vues</td></tr>`).join("")
    : `<tr><td colspan="2" style="padding:14px 0;font:13px/1.5 -apple-system,sans-serif;color:#9aa9aa;">Pas encore de données — le trafic se constitue.</td></tr>`;

  const topQueriesRows = opts.topQueries.length > 0
    ? opts.topQueries.slice(0, 5).map((q) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f1;font:13px/1.5 -apple-system,sans-serif;color:#15333a;">${q.key}</td><td style="padding:8px 0;border-bottom:1px solid #eef2f1;text-align:right;font:600 13px/1.4 -apple-system,sans-serif;color:#41a0a4;">${q.count}×</td></tr>`).join("")
    : `<tr><td colspan="2" style="padding:14px 0;font:13px/1.5 -apple-system,sans-serif;color:#9aa9aa;">Aucune recherche cette semaine.</td></tr>`;

  const contentGapsRows = opts.contentGaps.length > 0
    ? opts.contentGaps.slice(0, 5).map((g) => `<tr><td style="padding:8px 0;border-bottom:1px solid #fde8c8;font:13px/1.5 -apple-system,sans-serif;color:#7a4a14;">${g.key}</td><td style="padding:8px 0;border-bottom:1px solid #fde8c8;text-align:right;font:600 12px/1.4 -apple-system,sans-serif;color:#a86620;">${g.count}× demandé</td></tr>`).join("")
    : `<tr><td colspan="2" style="padding:14px 0;font:13px/1.5 -apple-system,sans-serif;color:#9aa9aa;">Bon signe — l'IA a répondu à tout cette semaine.</td></tr>`;

  const recentLeadsRows = opts.recentLeads.length > 0
    ? opts.recentLeads.slice(0, 5).map((l) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f1;font:600 12px/1.4 -apple-system,monospace;color:#15333a;">${l.email ?? "—"}</td><td style="padding:8px 0;border-bottom:1px solid #eef2f1;text-align:right;font:11px/1.4 -apple-system,sans-serif;color:#5b6f73;">${l.kind} · ${l.pagePath}</td></tr>`).join("")
    : `<tr><td colspan="2" style="padding:14px 0;font:13px/1.5 -apple-system,sans-serif;color:#9aa9aa;">Aucun lead enregistré cette semaine. Action prioritaire : voir 'Actions' ci-dessous.</td></tr>`;

  const actionsList = opts.actions
    .map((a, i) => `<li style="padding:10px 14px;background:#f7f9f8;border-radius:10px;margin-bottom:6px;font:14px/1.55 -apple-system,sans-serif;color:#15333a;list-style:none;"><span style="display:inline-block;width:22px;height:22px;background:#41a0a4;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;margin-right:10px;vertical-align:middle;">${i + 1}</span>${a}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rapport hebdomadaire SKS Talents</title>
</head>
<body style="margin:0;padding:0;background:#f3f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f5f5;padding:24px 12px;">
<tr><td align="center">
  <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#fafbfa;border-radius:18px;overflow:hidden;">

    <!-- Header -->
    <tr><td style="padding:24px 28px 18px 28px;background:linear-gradient(135deg,#0f4d4f 0%,#1a5759 60%,#15333a 100%);color:#fff;">
      <div style="font:600 11px/1 -apple-system,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#9fd4d6;margin-bottom:8px;">Rapport hebdomadaire</div>
      <div style="font:400 26px/1.15 'Source Serif 4',Georgia,serif;color:#fff;">SKS Talents — semaine du ${opts.startLabel}<br/>au ${opts.endLabel}</div>
      <div style="font:14px/1.55 -apple-system,sans-serif;color:rgba(255,255,255,.8);margin-top:10px;">Bonjour Georges. Voici ce qui s'est passé sur le site cette semaine, et les actions à prendre cette semaine.</div>
    </td></tr>

    <!-- Status pills -->
    <tr><td style="padding:14px 24px 6px 24px;background:#fafbfa;">
      ${pillStatus(`Vues ${pv.arrow} ${pv.delta >= 0 ? "+" : ""}${pv.delta}%`, pv.tone)}
      ${pillStatus(`Leads ${ld.arrow} ${ld.delta >= 0 ? "+" : ""}${ld.delta}%`, ld.tone)}
      ${pillStatus(`Conversions ${cv.arrow} ${cv.delta >= 0 ? "+" : ""}${cv.delta}%`, cv.tone)}
    </td></tr>

    <!-- KPI grid 3x2 -->
    <tr><td style="padding:8px 18px;background:#fafbfa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          ${kpiCard("Sessions", fmt(opts.pageviewsCur), `${pv.arrow} ${pv.delta >= 0 ? "+" : ""}${pv.delta}% vs S-1`, pv.tone, true)}
          ${kpiCard("Utilisateurs uniques", fmt(opts.uniqueSessionsCur), `${us.arrow} ${us.delta >= 0 ? "+" : ""}${us.delta}% vs S-1`, us.tone)}
          ${kpiCard("Conversions", fmt(opts.conversionsCur), `${cv.arrow} ${cv.delta >= 0 ? "+" : ""}${cv.delta}% vs S-1`, cv.tone)}
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:6px;">
        <tr>
          ${kpiCard("Leads (sales)", fmt(opts.leadsCur), `${ld.arrow} ${ld.delta >= 0 ? "+" : ""}${ld.delta}% vs S-1`, ld.tone)}
          ${kpiCard("Clics CTA", fmt(opts.ctaClicksCur), `${cta.arrow} ${cta.delta >= 0 ? "+" : ""}${cta.delta}% vs S-1`, cta.tone, true)}
          ${kpiCard("Tx conversion form", `${conversionRate}%`, `${fmt(opts.formSuccessCur)} succès / ${fmt(opts.formSubmitsCur)} envois`, opts.formSubmitsCur > 0 && conversionRate < 40 ? "negative" : "positive")}
        </tr>
      </table>
    </td></tr>

    <!-- Top pages -->
    <tr><td style="padding:24px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Pages populaires</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;padding:8px 14px;">
        ${topPagesRows}
      </table>
    </td></tr>

    <!-- Top recherches chat -->
    <tr><td style="padding:12px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Top recherches chat</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;padding:8px 14px;">
        ${topQueriesRows}
      </table>
    </td></tr>

    <!-- Content gaps -->
    <tr><td style="padding:12px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a86620;margin-bottom:10px;">⚠ Contenus manquants à créer</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff8ec;border-radius:12px;border:1px solid #fde8c8;padding:8px 14px;">
        ${contentGapsRows}
      </table>
    </td></tr>

    <!-- Recent leads -->
    <tr><td style="padding:12px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:10px;">Leads récents (sales)</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:12px;border:1px solid #e1ece9;padding:8px 14px;">
        ${recentLeadsRows}
      </table>
    </td></tr>

    <!-- Actions -->
    <tr><td style="padding:18px 28px 12px 28px;background:#fafbfa;">
      <div style="font:600 12px/1 -apple-system,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#41a0a4;margin-bottom:14px;">Plan d'action — cette semaine</div>
      <ul style="margin:0;padding:0;list-style:none;">
        ${actionsList}
      </ul>
    </td></tr>

    <!-- CTA buttons -->
    <tr><td style="padding:20px 28px 28px 28px;background:#fafbfa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding:8px 4px;">
            <a href="${opts.dashboardUrl}" style="display:inline-block;background:#15333a;color:#fff;font:600 14px/1 -apple-system,sans-serif;padding:14px 24px;border-radius:999px;text-decoration:none;">→ Voir le dashboard complet</a>
          </td>
          <td align="center" style="padding:8px 4px;">
            <a href="${opts.suiviUrl}" style="display:inline-block;background:#fff;color:#15333a;font:600 14px/1 -apple-system,sans-serif;padding:14px 24px;border-radius:999px;text-decoration:none;border:1px solid #d6e0df;">Suivi quotidien</a>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:18px 28px 28px 28px;background:#15333a;color:rgba(255,255,255,.65);font:12px/1.6 -apple-system,sans-serif;">
      <div style="font-weight:600;color:#fff;margin-bottom:4px;">SKS Talents</div>
      <div>Executive Search Life Sciences &amp; Santé animale</div>
      <div style="margin-top:8px;">Cet email t'est envoyé chaque lundi à 8h. Pour modifier la fréquence ou le contenu, ouvre le dashboard.</div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

async function postResend(apiKey: string, from: string, html: string, subject: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [RECIPIENT],
      reply_to: RECIPIENT,
      subject,
      html
    }),
    cache: "no-store"
  });
  const body = await response.text().catch(() => "");
  return { ok: response.ok, status: response.status, body };
}

async function sendEmail(html: string, subject: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { sent: false, reason: "RESEND_API_KEY missing" };
  }

  // First try with the configured MAIL_FROM_EMAIL (must be a verified domain on Resend, ideally skstalents.fr)
  const preferredFrom = `SKS Talents Suivi <${process.env.MAIL_FROM_EMAIL ?? "g.kengue@skstalents.fr"}>`;
  let attempt = await postResend(apiKey, preferredFrom, html, subject);

  // If Resend rejects (domain not verified), fall back to Resend's verified onboarding domain
  if (!attempt.ok && attempt.status === 403 && attempt.body.includes("not verified")) {
    const fallbackFrom = "SKS Talents Suivi <onboarding@resend.dev>";
    attempt = await postResend(apiKey, fallbackFrom, html, subject);
    if (attempt.ok) {
      return {
        sent: true,
        response: attempt.body.slice(0, 200),
        from: fallbackFrom,
        note: "Sent via Resend default domain. To send from skstalents.com, verify the domain at https://resend.com/domains."
      };
    }
  }

  if (!attempt.ok) {
    return { sent: false, reason: `Resend ${attempt.status}: ${attempt.body.slice(0, 200)}` };
  }
  return { sent: true, response: attempt.body.slice(0, 200), from: preferredFrom };
}

async function buildAndSendDigest() {
  const now = Date.now();
  const oneWeekAgo = now - dayMs(7);
  const twoWeeksAgo = now - dayMs(14);

  let analytics: SiteAnalyticsEvent[] = [];
  let leads: LeadEventLog[] = [];
  try {
    analytics = await readSiteAnalyticsLog();
  } catch {
    /* ignore */
  }
  try {
    leads = await readLeadEventLog();
  } catch {
    /* ignore */
  }

  const currentWeek = analytics.filter((e) => inRange(e.createdAt, oneWeekAgo, now));
  const previousWeek = analytics.filter((e) => inRange(e.createdAt, twoWeeksAgo, oneWeekAgo));
  const currentLeads = leads.filter((l) => inRange(l.createdAt, oneWeekAgo, now));
  const previousLeads = leads.filter((l) => inRange(l.createdAt, twoWeeksAgo, oneWeekAgo));

  const pageviewsCur = currentWeek.filter((e) => e.type === "pageview").length;
  const pageviewsPrev = previousWeek.filter((e) => e.type === "pageview").length;
  const uniqueSessionsCur = new Set(currentWeek.map((e) => e.sessionId).filter(Boolean)).size;
  const uniqueSessionsPrev = new Set(previousWeek.map((e) => e.sessionId).filter(Boolean)).size;
  const conversionsCur = currentWeek.filter((e) => e.type === "form_success").length;
  const conversionsPrev = previousWeek.filter((e) => e.type === "form_success").length;
  const ctaClicksCur = currentWeek.filter((e) => e.type === "cta_click").length;
  const ctaClicksPrev = previousWeek.filter((e) => e.type === "cta_click").length;
  const formSubmitsCur = currentWeek.filter((e) => e.type === "form_submit").length;
  const formSuccessCur = currentWeek.filter((e) => e.type === "form_success").length;
  const errorsCur = currentWeek.filter(
    (e) => e.type === "form_error" || e.type === "frontend_error"
  ).length;

  const topPages = topN(
    currentWeek.filter((e) => e.type === "pageview").map((e) => e.path),
    5
  );
  const topQueries = topN(
    currentWeek
      .filter((e) => e.type === "agent_query" || e.type === "agent_query_voice")
      .map((e) => e.query),
    5
  );
  const contentGaps = topN(
    currentWeek.filter((e) => e.type === "agent_content_gap").map((e) => e.query),
    5
  );

  const pageviewDelta = pageviewsPrev > 0
    ? Math.round(((pageviewsCur - pageviewsPrev) / pageviewsPrev) * 100)
    : 0;

  const actions = buildActions(
    pageviewDelta,
    contentGaps.length,
    errorsCur,
    currentLeads.length,
    previousLeads.length,
    topQueries
  );

  const startDate = new Date(oneWeekAgo);
  const endDate = new Date(now);
  const startLabel = isoDate(startDate);
  const endLabel = isoDate(endDate);

  const dashboardToken = process.env.DASHBOARD_PRIVATE_TOKEN ?? "";
  const dashboardUrl = `${SITE_URL}/dashboard${dashboardToken ? `?token=${dashboardToken}` : ""}`;
  const suiviUrl = `${SITE_URL}/dashboard/suivi${dashboardToken ? `?token=${dashboardToken}` : ""}`;

  const html = buildHtmlEmail({
    startLabel,
    endLabel,
    pageviewsCur,
    pageviewsPrev,
    uniqueSessionsCur,
    uniqueSessionsPrev,
    conversionsCur,
    conversionsPrev,
    leadsCur: currentLeads.length,
    leadsPrev: previousLeads.length,
    ctaClicksCur,
    ctaClicksPrev,
    formSuccessCur,
    formSubmitsCur,
    topPages,
    topQueries,
    contentGaps,
    recentLeads: currentLeads.slice(-5).reverse(),
    actions,
    dashboardUrl,
    suiviUrl
  });

  const subject = `Rapport hebdomadaire SKS Talents — semaine du ${startLabel}`;
  const sendResult = await sendEmail(html, subject);

  return {
    ok: sendResult.sent,
    sent: sendResult.sent,
    reason: "reason" in sendResult ? sendResult.reason : undefined,
    summary: {
      pageviews: pageviewsCur,
      pageviewsDelta: pageviewDelta,
      leads: currentLeads.length,
      leadsDelta: currentLeads.length - previousLeads.length,
      conversions: conversionsCur,
      contentGaps: contentGaps.length,
      errors: errorsCur,
      actionsCount: actions.length
    }
  };
}

function isAuthorized(request: Request): boolean {
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;

  // Manual test mode: ?token=DASHBOARD_PRIVATE_TOKEN
  const dashboardToken = process.env.DASHBOARD_PRIVATE_TOKEN;
  if (dashboardToken) {
    const url = new URL(request.url);
    if (url.searchParams.get("token") === dashboardToken) return true;
  }

  // Fallback: Vercel Cron user-agent check (less strict)
  const ua = request.headers.get("user-agent") ?? "";
  if (ua.includes("vercel-cron")) return true;

  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ ok: false, error: "Unauthorized" }, 401);
  }
  try {
    const result = await buildAndSendDigest();
    return noStoreJson(result, result.ok ? 200 : 500);
  } catch (error) {
    return noStoreJson(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      500
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
