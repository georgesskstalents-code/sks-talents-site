import { sendEditorialAlertsEmail } from "@/lib/email";
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

type ResourcesAlertsBody = {
  email?: string;
  interests?: string[];
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

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
      key: "resources-alerts",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Réessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<ResourcesAlertsBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre inscription a bien été prise en compte." });
  }

  const payload = {
    email: normalizeText(body.email, 160),
    interests: Array.isArray(body.interests)
      ? body.interests
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim().slice(0, 80))
          .filter(Boolean)
          .slice(0, 6)
      : []
  };

  if (!isValidEmail(payload.email)) {
    return noStoreJson({ ok: false, message: "Merci de renseigner un email valide." }, 422);
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Vérification refusée." }, 403);
  }

  const recipientEmail =
    process.env.SITE_INTELLIGENCE_EMAIL ??
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    "g.kengue@skstalents.fr";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"), "/resources");
  const submittedAt = new Date().toISOString();

  try {
    await sendEditorialAlertsEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload: {
        email: payload.email,
        interests: payload.interests,
        pagePath,
        submittedAt
      }
    });
  } catch (error) {
    console.error("Resources alerts email send error", error);
  }

  try {
    await persistLeadDurably("resources-alerts", {
      recipientEmail,
      fromEmail,
      pagePath,
      email: payload.email,
      interests: payload.interests,
      submittedAt
    });
  } catch (error) {
    console.error("Resources alerts durable persistence error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "resources-alerts",
      pagePath,
      email: payload.email,
      createdAt: submittedAt
    });
  } catch (error) {
    console.error("Resources alerts lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: "Merci, vous recevrez les prochaines ressources et signaux utiles."
  });
}
