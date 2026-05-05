import {
  matchDiagnostic,
  type DiagnosticAnswers,
  type DiagnosticLead,
  type DiagnosticSector
} from "@/lib/diagnosticMatching";
import { sendDigestEmail } from "@/lib/resendEmail";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

type DiagnosticPayload = {
  sector: DiagnosticSector;
  answers: DiagnosticAnswers;
  lead: DiagnosticLead;
  turnstileToken?: string;
  website?: string; // honeypot
};

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

async function persistToSupabase(row: Record<string, unknown>): Promise<void> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/diagnostic_submissions`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(row),
      cache: "no-store"
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error("Supabase diagnostic insert error", error);
  }
}

function buildGeorgesEmailHtml(
  sector: DiagnosticSector,
  payload: DiagnosticPayload,
  result: ReturnType<typeof matchDiagnostic>
): string {
  const sectorLabel = sector === "animal-health" ? "Animal Health" : "Life Sciences";
  const a = payload.answers;
  return `<!doctype html>
<html><body style="margin:0;font-family:-apple-system,sans-serif;background:#f5f3ee;padding:24px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="background:#fff;border-radius:14px;overflow:hidden;">
<tr><td style="padding:24px 28px;background:#0f4d4f;color:#fff;">
  <div style="font:600 11px/1 sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#9fd4d6;margin-bottom:6px;">Diagnostic ${sectorLabel}</div>
  <div style="font:700 22px/1.2 sans-serif;">Nouveau lead · ${payload.lead.company}</div>
</td></tr>
<tr><td style="padding:20px 28px;font:14px/1.6 sans-serif;color:#1a1a1a;">
  <p style="margin:0 0 10px 0;"><b>Contact :</b> ${payload.lead.firstName} ${payload.lead.lastName} (${payload.lead.role})<br/>
  <b>Email :</b> <a href="mailto:${payload.lead.email}">${payload.lead.email}</a><br/>
  <b>Société :</b> ${payload.lead.company}</p>
  <hr style="border:0;border-top:1px solid #e5e5e5;margin:16px 0;"/>
  <p style="margin:0 0 6px 0;font-weight:600;color:#0f3a3c;">Réponses</p>
  <ul style="margin:0;padding-left:18px;line-height:1.7;">
    <li>Q1 (profil) : ${a.q1}${a.q1Other ? ` — "${a.q1Other}"` : ""}</li>
    <li>Q2 (stade) : ${a.q2}${a.q2Other ? ` — "${a.q2Other}"` : ""}</li>
    <li>Q3 (douleur) : ${a.q3}${a.q3Other ? ` — "${a.q3Other}"` : ""}</li>
    <li>Q4 (mesure) : ${a.q4}${a.q4Other ? ` — "${a.q4Other}"` : ""}</li>
    <li>Q5 (objectif 6 mois) : ${a.q5}${a.q5Other ? ` — "${a.q5Other}"` : ""}</li>
  </ul>
  <hr style="border:0;border-top:1px solid #e5e5e5;margin:16px 0;"/>
  <p style="margin:0 0 6px 0;font-weight:600;color:#0f3a3c;">Recommandation</p>
  <div style="background:#e8f0eb;border-radius:10px;padding:12px 14px;margin-bottom:8px;">
    <div style="font-weight:700;color:#0f3a3c;">🥇 ${result.primary.label}${result.primary.badge ? ` <span style="font-size:11px;background:#0f3a3c;color:#fff;padding:2px 6px;border-radius:6px;margin-left:6px;">${result.primary.badge}</span>` : ""}</div>
    <div style="margin-top:4px;font-size:13px;color:#4a4a4a;">${result.primary.pitch}</div>
    <div style="margin-top:6px;font-size:12px;color:#0f3a3c;font-weight:600;">ROI : ${result.roiSummary}</div>
  </div>
  <p style="margin:8px 0 4px 0;font-size:12px;color:#6a6a6a;">Compléments : ${result.complements.map((c) => c.label).join(" · ")}</p>
  <hr style="border:0;border-top:1px solid #e5e5e5;margin:16px 0;"/>
  <p style="margin:0;font-size:13px;"><b>Action :</b> répondre au lead sous 24h ou réserver un slot Calendly.</p>
</td></tr>
</table></body></html>`;
}

function buildLeadConfirmationHtml(
  sector: DiagnosticSector,
  payload: DiagnosticPayload,
  result: ReturnType<typeof matchDiagnostic>
): string {
  const sectorLabel = sector === "animal-health" ? "Animal Health" : "Life Sciences";
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/g-kengue/talentconsulting";
  return `<!doctype html>
<html><body style="margin:0;font-family:-apple-system,sans-serif;background:#f5f3ee;padding:24px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="background:#fff;border-radius:14px;overflow:hidden;">
<tr><td style="padding:28px;background:#0f4d4f;color:#fff;">
  <div style="font:600 11px/1 sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#9fd4d6;margin-bottom:8px;">Votre diagnostic ${sectorLabel}</div>
  <div style="font:600 24px/1.2 sans-serif;">Bonjour ${payload.lead.firstName},</div>
</td></tr>
<tr><td style="padding:24px 28px;font:14px/1.7 sans-serif;color:#1a1a1a;">
  <p style="margin:0 0 16px 0;">Merci pour votre diagnostic. Voici l'agent IA prioritaire que nous recommandons pour <b>${payload.lead.company}</b> :</p>
  <div style="background:#e8f0eb;border-radius:12px;padding:16px;margin:0 0 16px 0;">
    <div style="font-weight:700;color:#0f3a3c;font-size:16px;">🥇 ${result.primary.label}</div>
    <div style="margin-top:6px;color:#4a4a4a;">${result.primary.pitch}</div>
    <div style="margin-top:10px;font-weight:700;color:#0f3a3c;">ROI projeté : ${result.roiSummary}</div>
  </div>
  <p style="margin:0 0 6px 0;font-weight:600;">Vos 3 priorités sur 6 mois :</p>
  <ol style="margin:0 0 16px 0;padding-left:18px;">
    ${result.priorities.map((p) => `<li style="margin-bottom:6px;">${p}</li>`).join("")}
  </ol>
  <p style="margin:0 0 12px 0;">Pour discuter du déploiement et chiffrer le ROI sur vos données, je vous propose 15 min :</p>
  <p style="text-align:center;margin:18px 0;">
    <a href="${calendlyUrl}" style="display:inline-block;background:#0f3a3c;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:600;">Réserver mes 15 min →</a>
  </p>
  <p style="margin:24px 0 0 0;font-size:13px;color:#6a6a6a;">— Georges Kengue<br/>Fondateur SKS TALENTS<br/>Executive Search Life Sciences &amp; Santé animale</p>
</td></tr>
</table></body></html>`;
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) return originCheck.response;

  const ip = getClientIp(originCheck.requestHeaders);
  if (!(await applyRateLimit(ip, { key: "diagnostic", windowMs: WINDOW_MS, maxRequests: MAX_REQUESTS }))) {
    return noStoreJson({ ok: false, message: "Trop de tentatives. Réessayez plus tard." }, 429);
  }

  const parsed = await parseJsonBody<DiagnosticPayload>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.body;

  // Honeypot
  if (body.website && body.website.trim().length > 0) {
    return noStoreJson({ ok: true, message: "Diagnostic reçu." });
  }

  // Validate
  if (
    !body.sector ||
    !["animal-health", "life-sciences"].includes(body.sector) ||
    !body.answers ||
    !body.answers.q3 ||
    !body.lead ||
    !isValidEmail(body.lead.email) ||
    !body.lead.firstName ||
    !body.lead.company
  ) {
    return noStoreJson({ ok: false, message: "Réponses incomplètes ou invalides." }, 422);
  }

  // Turnstile (optional — only if configured)
  if (process.env.TURNSTILE_SECRET_KEY) {
    const turnstile = await verifyTurnstileToken({
      token: (body.turnstileToken ?? "").slice(0, 2048),
      ip
    });
    if (!turnstile.ok) {
      return noStoreJson({ ok: false, message: "Vérification anti-spam refusée." }, 403);
    }
  }

  const result = matchDiagnostic(body.sector, body.answers);

  // Persist (Supabase if configured — silent no-op otherwise)
  const submittedAt = new Date().toISOString();
  await persistToSupabase({
    sector: body.sector,
    email: body.lead.email,
    first_name: body.lead.firstName,
    last_name: body.lead.lastName,
    company: body.lead.company,
    role: body.lead.role,
    q1: body.answers.q1,
    q2: body.answers.q2,
    q3: body.answers.q3,
    q4: body.answers.q4,
    q5: body.answers.q5,
    q1_other: body.answers.q1Other ?? null,
    q3_other: body.answers.q3Other ?? null,
    primary_agent_id: result.primary.id,
    primary_agent_label: result.primary.label,
    roi_summary: result.roiSummary,
    submitted_at: submittedAt
  });

  // Notify Georges (best-effort, don't block lead path)
  const subject = `🎯 Nouveau diagnostic ${body.sector === "animal-health" ? "Animal Health" : "Life Sciences"} · ${body.lead.company}`;
  await sendDigestEmail({
    html: buildGeorgesEmailHtml(body.sector, body, result),
    subject,
    fromLabel: "SKS Talents Diagnostic"
  });

  // Confirmation to the lead (best-effort)
  await sendDigestEmail({
    html: buildLeadConfirmationHtml(body.sector, body, result),
    subject: `Votre diagnostic SKS Talents · ${result.primary.label} recommandé`,
    fromLabel: "Georges Kengue"
  });

  return noStoreJson({
    ok: true,
    result: {
      primary: result.primary,
      complements: result.complements,
      priorities: result.priorities,
      frictionScore: result.frictionScore,
      roiSummary: result.roiSummary
    },
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/g-kengue/talentconsulting"
  });
}
