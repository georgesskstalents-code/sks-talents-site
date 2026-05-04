import { sendOrientationReportEmail } from "@/lib/email";
import { persistLeadDurably } from "@/lib/durableStore";
import { appendLeadEventLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";
import { verifyTurnstileToken } from "@/lib/turnstile";

type ReportRequestBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  profile?: string;
  recommendations?: string[];
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 6;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function getPagePathFromReferer(referer: string | null, fallback: string) {
  if (!referer) {
    return fallback;
  }

  try {
    return new URL(referer).pathname || fallback;
  } catch {
    return fallback;
  }
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  if (
    !(await applyRateLimit(ip, {
      key: "orientation-report",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Réessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<ReportRequestBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({
      ok: true,
      message: "Merci, vos coordonnées ont bien été enregistrées avant le téléchargement."
    });
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Vérification refusée." }, 403);
  }

  const payload = {
    firstName: normalizeText(body.firstName, 80),
    lastName: normalizeText(body.lastName, 80),
    email: normalizeText(body.email, 160),
    profile: normalizeText(body.profile, 60),
    recommendations: Array.isArray(body.recommendations)
      ? body.recommendations
          .filter((item): item is string => typeof item === "string")
          .map((item) => normalizeText(item, 120))
          .filter(Boolean)
          .slice(0, 5)
      : []
  };

  if (
    payload.firstName.length < 2 ||
    payload.lastName.length < 2 ||
    !isValidEmail(payload.email) ||
    payload.recommendations.length === 0
  ) {
    return noStoreJson(
      { ok: false, message: "Merci de renseigner prénom, nom et email avant le téléchargement." },
      422
    );
  }

  const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL ?? "g.kengue@skstalents.fr";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"), "/orientation");

  try {
    await sendOrientationReportEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload
    });
  } catch (error) {
    console.error("Orientation report email send error", error);
  }

  try {
    await persistLeadDurably("orientation-report", {
      recipientEmail,
      fromEmail,
      pagePath,
      ...payload
    });
  } catch (error) {
    console.error("Orientation report durable persistence error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "orientation-report",
      pagePath,
      email: payload.email,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Orientation report lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: "Merci, vos coordonnées ont bien été enregistrées avant le téléchargement.",
    recipientEmail
  });
}
