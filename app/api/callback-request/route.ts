import { sendLeadNotificationEmail } from "@/lib/email";
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

type CallbackRequestBody = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  sector?: string;
  urgency?: string;
  message?: string;
  consent?: boolean;
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

function isValidPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").length >= 8;
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
      key: "callback-request",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Réessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<CallbackRequestBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre demande a bien été reçue." });
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Vérification refusée." }, 403);
  }

  const payload = {
    role: normalizeText(body.role, 120),
    firstName: normalizeText(body.firstName, 80),
    lastName: normalizeText(body.lastName, 80),
    email: normalizeText(body.email, 160),
    phone: normalizeText(body.phone, 40),
    company: normalizeText(body.company, 120),
    sector: normalizeText(body.sector, 120),
    urgency: normalizeText(body.urgency, 80),
    message: normalizeText(body.message, 1500),
    consent: Boolean(body.consent)
  };

  if (
    payload.role.length < 2 ||
    payload.firstName.length < 2 ||
    payload.lastName.length < 2 ||
    !isValidEmail(payload.email) ||
    !isValidPhone(payload.phone) ||
    !payload.consent
  ) {
    return noStoreJson(
      { ok: false, message: "Merci de compléter les champs requis avec des données valides." },
      422
    );
  }

  const webhookUrl = process.env.CALLBACK_WEBHOOK_URL;
  const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL ?? "infos@skstalents.com";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"), "/contact");

  try {
    await sendLeadNotificationEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload
    });
  } catch (error) {
    console.error("Lead email send error", error);
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          source: "sks-talents-website",
          recipientEmail,
          fromEmail,
          ...payload
        })
      });
    } catch (error) {
      console.error("Callback webhook error", error);
    }
  } else {
    console.info("Callback request received", {
      recipientEmail,
      fromEmail,
      ...payload
    });
  }

  try {
    await persistLeadDurably("callback-request", {
      recipientEmail,
      fromEmail,
      pagePath,
      ...payload
    });
  } catch (error) {
    console.error("Callback durable persistence error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "callback-request",
      pagePath,
      email: payload.email,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Callback lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: "Merci, votre demande a bien été reçue.",
    calendlyUrl: process.env.CALENDLY_URL ?? process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
    recipientEmail
  });
}
