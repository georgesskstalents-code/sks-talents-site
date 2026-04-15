import { appendSiteFeedbackLog, sendSiteFeedbackEmail } from "@/lib/email";
import { persistFeedbackDurably } from "@/lib/durableStore";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";
import { verifyTurnstileToken } from "@/lib/turnstile";

type SiteFeedbackBody = {
  rating?: number;
  comment?: string;
  pagePath?: string;
  pageTitle?: string;
  sessionAttempts?: number;
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  if (
    !(await applyRateLimit(ip, {
      key: "site-feedback",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson({ ok: false, message: "Trop de tentatives, merci de réessayer plus tard." }, 429);
  }

  const parsedBody = await parseJsonBody<SiteFeedbackBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci pour votre retour." });
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Vérification refusée." }, 403);
  }

  const rating = typeof body.rating === "number" ? body.rating : 0;
  const payload = {
    rating,
    comment: normalizeText(body.comment, 320),
    pagePath: normalizeText(body.pagePath, 180),
    pageTitle: normalizeText(body.pageTitle, 180),
    sessionAttempts:
      typeof body.sessionAttempts === "number" && body.sessionAttempts >= 0
        ? body.sessionAttempts
        : 0,
    submittedAt: new Date().toISOString()
  };

  if (payload.rating < 1 || payload.rating > 5 || payload.comment.length < 2 || payload.pagePath.length < 1) {
    return noStoreJson(
      { ok: false, message: "Merci de donner une note et un commentaire court avant l’envoi." },
      422
    );
  }

  const recipientEmail = process.env.FEEDBACK_NOTIFICATION_EMAIL ?? "infos@skstalents.com";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? "infos@skstalents.com";

  try {
    await sendSiteFeedbackEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload
    });
  } catch (error) {
    console.error("Site feedback email error", error);
  }

  try {
    await appendSiteFeedbackLog(payload);
  } catch (error) {
    console.error("Site feedback log error", error);
  }

  try {
    await persistFeedbackDurably(payload);
  } catch (error) {
    console.error("Site feedback durable persistence error", error);
  }

  return noStoreJson({ ok: true, message: "Merci pour votre retour." });
}
