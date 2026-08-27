/**
 * POST /api/lead-qualifier-score
 *
 * Body:
 *   {
 *     email: string,
 *     source: string,                 // ex: "chloe-chat", "diagnostic", "simulateur"
 *     context?: string,               // texte libre (situation, transcript synth)
 *     fiche_slug?: string,            // slug fiche metier consultee
 *     chat_transcript?: Array<{ role: "user" | "assistant"; content: string }>,
 *     interactions_count?: number,    // nb messages chat
 *     vertical?: string               // "ah" | "petfood" | "ls" | ...
 *   }
 *
 * Scoring (0-100) :
 *   - Email pro (pas gmail/hotmail/yahoo/outlook/free) : +25
 *   - Fonction cible C-level ou C-1 (inferee) : +20 / +12
 *   - Signal timing actif (mots-cles "recrutement", "cadrage", "brief") : +15
 *   - Nb interactions chat > 3 : +15
 *   - Email capte (present) : +12
 *   - Bonus vertical AH / Petfood / LS : +13
 *
 * Actions :
 *   - Push page Notion Sales Pipeline (si NOTION_SALES_PIPELINE_DB_ID present)
 *   - Envoie email recap a g.kengue@skstalents.fr avec score + suggestion
 *
 * Retourne { ok, score, tier, action_suggestion, notion_page_url, ... }.
 */

import { sendDigestEmail } from "@/lib/resendEmail";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody
} from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

type LeadBody = {
  email?: string;
  source?: string;
  context?: string;
  fiche_slug?: string;
  chat_transcript?: Array<{ role?: string; content?: string }>;
  interactions_count?: number;
  vertical?: string;
};

const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "hotmail.fr",
  "yahoo.com",
  "yahoo.fr",
  "outlook.com",
  "outlook.fr",
  "free.fr",
  "orange.fr",
  "wanadoo.fr",
  "laposte.net",
  "icloud.com",
  "me.com",
  "protonmail.com",
  "proton.me",
  "aol.com",
  "sfr.fr"
]);

const C_LEVEL_HINTS = [
  "ceo",
  "cfo",
  "coo",
  "cto",
  "cmo",
  "cpo",
  "chro",
  "cso",
  "cco",
  "cio",
  "president",
  "founder",
  "co-founder",
  "cofounder",
  "managing director",
  "general manager",
  "directeur general",
  "directrice generale",
  "vp",
  "vice president",
  "head of",
  "chief"
];

const C_MINUS_ONE_HINTS = [
  "director",
  "directeur",
  "directrice",
  "head",
  "lead",
  "responsable",
  "manager senior",
  "senior manager"
];

const TIMING_KEYWORDS = [
  "recrutement",
  "recrute",
  "recruter",
  "cadrage",
  "brief",
  "poste a pourvoir",
  "poste ouvert",
  "urgence",
  "urgent",
  "shortlist",
  "besoin de recruter",
  "chasse",
  "search",
  "mission"
];

const VERTICAL_BONUS = new Set([
  "ah",
  "animal health",
  "sante animale",
  "petfood",
  "pet food",
  "nutrition animale",
  "ls",
  "life sciences",
  "biotech",
  "pharma",
  "medtech",
  "diagnostic",
  "vaccine"
]);

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function extractDomain(email: string) {
  const at = email.lastIndexOf("@");
  if (at === -1) return "";
  return email.slice(at + 1).toLowerCase();
}

function containsAny(haystack: string, needles: string[]) {
  const lower = haystack.toLowerCase();
  return needles.some((n) => lower.includes(n));
}

function computeScore(input: {
  email: string;
  context: string;
  interactionsCount: number;
  vertical: string;
  transcriptText: string;
}) {
  const breakdown: Array<{ label: string; points: number }> = [];
  let score = 0;

  const emailOk = isEmailValid(input.email);
  if (emailOk) {
    score += 12;
    breakdown.push({ label: "Email capte", points: 12 });
  }

  if (emailOk) {
    const domain = extractDomain(input.email);
    if (domain && !PERSONAL_DOMAINS.has(domain)) {
      score += 25;
      breakdown.push({ label: `Domaine pro (${domain})`, points: 25 });
    }
  }

  const combined = [input.context, input.transcriptText, input.email].join(" ").toLowerCase();

  if (containsAny(combined, C_LEVEL_HINTS)) {
    score += 20;
    breakdown.push({ label: "Fonction C-level detectee", points: 20 });
  } else if (containsAny(combined, C_MINUS_ONE_HINTS)) {
    score += 12;
    breakdown.push({ label: "Fonction C-1 detectee", points: 12 });
  }

  if (containsAny(combined, TIMING_KEYWORDS)) {
    score += 15;
    breakdown.push({ label: "Signal timing recrutement actif", points: 15 });
  }

  if (input.interactionsCount > 3) {
    score += 15;
    breakdown.push({ label: `Engagement chat (${input.interactionsCount} interactions)`, points: 15 });
  }

  const verticalNormalized = (input.vertical || "").toLowerCase().trim();
  const verticalHit =
    (verticalNormalized && VERTICAL_BONUS.has(verticalNormalized)) ||
    [...VERTICAL_BONUS].some((v) => combined.includes(v));
  if (verticalHit) {
    score += 13;
    breakdown.push({ label: "Vertical cible SKS (AH / Petfood / LS)", points: 13 });
  }

  const capped = Math.max(0, Math.min(100, score));
  return { score: capped, breakdown };
}

function tierAndAction(score: number) {
  if (score >= 75) {
    return {
      tier: "Hot",
      action:
        "Appel de qualification sous 24h. Preparer 2 shortlist references verticale + planifier reunion cadrage."
    };
  }
  if (score >= 55) {
    return {
      tier: "Warm",
      action:
        "Reponse personnalisee sous 48h. Proposer diagnostic structuration ou call decouverte 20 min."
    };
  }
  if (score >= 35) {
    return {
      tier: "Lukewarm",
      action:
        "Ajouter au nurturing newsletter LinkedIn. Envoyer ressource ciblee (fiche metier ou article) selon contexte."
    };
  }
  return {
    tier: "Cold",
    action: "Laisser au drip newsletter. Pas d'action manuelle immediate."
  };
}

async function pushToNotion(payload: {
  email: string;
  score: number;
  tier: string;
  source: string;
  action: string;
  context: string;
  vertical: string;
  ficheSlug: string;
  breakdown: Array<{ label: string; points: number }>;
}) {
  const token = process.env.NOTION_TOKEN;
  const dbId =
    process.env.NOTION_SALES_PIPELINE_DB_ID ||
    process.env.NOTION_SALES_PIPELINE_DATABASE_ID ||
    "";
  if (!token || !dbId) {
    return { pushed: false, url: null, reason: "NOTION_TOKEN or NOTION_SALES_PIPELINE_DB_ID missing" };
  }

  const version = process.env.NOTION_VERSION ?? "2022-06-28";
  const nameParts = [payload.tier, payload.email || "(email absent)"];
  const title = nameParts.filter(Boolean).join(" · ");

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: title.slice(0, 200) } }] }
  };

  properties.Email = { email: payload.email || null };
  properties.Score = { number: payload.score };
  properties.Tier = { select: { name: payload.tier } };
  properties.Source = { rich_text: [{ text: { content: (payload.source || "unknown").slice(0, 200) } }] };
  properties.Vertical = payload.vertical
    ? { rich_text: [{ text: { content: payload.vertical.slice(0, 200) } }] }
    : { rich_text: [] };
  properties["Fiche slug"] = payload.ficheSlug
    ? { rich_text: [{ text: { content: payload.ficheSlug.slice(0, 200) } }] }
    : { rich_text: [] };
  properties.Action = { rich_text: [{ text: { content: payload.action.slice(0, 1900) } }] };
  properties["Captured at"] = { date: { start: new Date().toISOString() } };

  const breakdownText = payload.breakdown
    .map((b) => `- ${b.label}: +${b.points}`)
    .join("\n");

  const children = [
    {
      object: "block",
      type: "heading_3",
      heading_3: { rich_text: [{ type: "text", text: { content: "Contexte" } }] }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: (payload.context || "(vide)").slice(0, 1900) } }]
      }
    },
    {
      object: "block",
      type: "heading_3",
      heading_3: { rich_text: [{ type: "text", text: { content: "Scoring" } }] }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: breakdownText || "(aucun signal)" } }]
      }
    }
  ];

  const attempt = async (props: Record<string, unknown>) =>
    fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": version,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: props,
        children
      })
    });

  let res = await attempt(properties);
  let bodyTxt = await res.text().catch(() => "");
  if (!res.ok && res.status === 400) {
    res = await attempt({ Name: properties.Name });
    bodyTxt = await res.text().catch(() => "");
  }

  if (!res.ok) {
    return { pushed: false, url: null, reason: `Notion ${res.status}: ${bodyTxt.slice(0, 200)}` };
  }

  let parsed: { url?: string } = {};
  try {
    parsed = JSON.parse(bodyTxt);
  } catch {
    parsed = {};
  }
  return { pushed: true, url: parsed.url ?? null, reason: null };
}

function renderEmailHtml(opts: {
  email: string;
  score: number;
  tier: string;
  action: string;
  source: string;
  vertical: string;
  ficheSlug: string;
  context: string;
  breakdown: Array<{ label: string; points: number }>;
  notionUrl: string | null;
}) {
  const rows = opts.breakdown
    .map(
      (b) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;">${b.label}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">+${b.points}</td></tr>`
    )
    .join("");
  const notionLink = opts.notionUrl
    ? `<p><a href="${opts.notionUrl}">Ouvrir la fiche Notion</a></p>`
    : `<p style="color:#888;font-size:13px;">(Fiche Notion non creee - verifier NOTION_TOKEN + NOTION_SALES_PIPELINE_DB_ID)</p>`;
  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 4px;">Lead Qualifier · score ${opts.score}/100 · ${opts.tier}</h2>
  <p style="color:#555;margin:0 0 16px;">Source : ${opts.source || "n/a"} · Vertical : ${opts.vertical || "n/a"}${opts.ficheSlug ? ` · Fiche : ${opts.ficheSlug}` : ""}</p>
  <p><strong>Email :</strong> ${opts.email || "(non capte)"}</p>
  <p><strong>Action suggeree :</strong> ${opts.action}</p>
  <h3>Scoring</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows || `<tr><td>(aucun signal)</td></tr>`}</table>
  <h3>Contexte</h3>
  <p style="white-space:pre-wrap;">${(opts.context || "(vide)").replace(/</g, "&lt;")}</p>
  ${notionLink}
  <p style="color:#888;font-size:12px;margin-top:24px;">Envoye automatiquement par /api/lead-qualifier-score</p>
</body></html>`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (
    !(await applyRateLimit(ip, {
      key: "lead-qualifier-score",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de requetes. Reessayez plus tard." },
      429
    );
  }

  const parsed = await parseJsonBody<LeadBody>(request);
  const body: Partial<LeadBody> = parsed.ok ? parsed.body ?? {} : {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.trim().slice(0, 120) : "";
  const context = typeof body.context === "string" ? body.context.slice(0, 4000) : "";
  const ficheSlug = typeof body.fiche_slug === "string" ? body.fiche_slug.trim().slice(0, 200) : "";
  const vertical = typeof body.vertical === "string" ? body.vertical.trim().slice(0, 80) : "";
  const interactionsCount =
    typeof body.interactions_count === "number" && Number.isFinite(body.interactions_count)
      ? body.interactions_count
      : Array.isArray(body.chat_transcript)
        ? body.chat_transcript.length
        : 0;

  const transcriptText = Array.isArray(body.chat_transcript)
    ? body.chat_transcript
        .map((m) => (typeof m?.content === "string" ? m.content : ""))
        .join(" \n")
        .slice(0, 6000)
    : "";

  const { score, breakdown } = computeScore({
    email,
    context,
    interactionsCount,
    vertical,
    transcriptText
  });
  const { tier, action } = tierAndAction(score);

  const notion = await pushToNotion({
    email,
    score,
    tier,
    source,
    action,
    context,
    vertical,
    ficheSlug,
    breakdown
  });

  const html = renderEmailHtml({
    email,
    score,
    tier,
    action,
    source,
    vertical,
    ficheSlug,
    context,
    breakdown,
    notionUrl: notion.url
  });

  const emailResult = await sendDigestEmail({
    html,
    subject: `[Lead ${tier} · ${score}] ${email || "(email absent)"} · ${source || "?"}`,
    fromLabel: "SKS Lead Qualifier"
  });

  return noStoreJson({
    ok: true,
    score,
    tier,
    action_suggestion: action,
    notion_page_url: notion.url,
    notion_pushed: notion.pushed,
    notion_reason: notion.pushed ? null : notion.reason,
    email_sent: emailResult.sent,
    breakdown
  });
}
