import { getWhitepaperGuideById } from "@/data/lexiconHub";
import { sendWhitepaperAccessEmail, sendWhitepaperRequestEmail } from "@/lib/email";
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

type WhitepaperRequestBody = {
  email?: string;
  company?: string;
  whitepaperId?: string;
  placement?: string;
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
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
      key: "whitepaper-request",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Réessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<WhitepaperRequestBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre demande a bien été prise en compte." });
  }

  const email = normalizeText(body.email, 160);
  const company = normalizeText(body.company, 120);
  const whitepaperId = normalizeText(body.whitepaperId, 120);
  const placement = normalizeText(body.placement, 80) || "site";

  if (!isValidEmail(email) || whitepaperId.length < 2) {
    return noStoreJson({ ok: false, message: "Merci de renseigner un email valide." }, 422);
  }

  const guide = getWhitepaperGuideById(whitepaperId);
  if (!guide) {
    return noStoreJson({ ok: false, message: "Guide introuvable." }, 404);
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Verification refusee." }, 403);
  }

  const recipientEmail =
    process.env.SITE_INTELLIGENCE_EMAIL ??
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    "g.kengue@skstalents.com";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(
    originCheck.requestHeaders.get("referer"),
    "/lexique-life-sciences-rh"
  );
  const submittedAt = new Date().toISOString();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";
  const guideUrl = `${siteUrl}/guides/${guide.slug}`;

  try {
    await sendWhitepaperRequestEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload: {
        email,
        company,
        whitepaperTitle: guide.title,
        placement,
        pagePath,
        submittedAt
      }
    });
  } catch (error) {
    console.error("Whitepaper request email send error", error);
  }

  try {
    await sendWhitepaperAccessEmail({
      recipient: email,
      from: fromEmail,
      whitepaperTitle: guide.title,
      guideUrl
    });
  } catch (error) {
    console.error("Whitepaper access email send error", error);
  }

  try {
    await persistLeadDurably("whitepaper-request", {
      recipientEmail,
      fromEmail,
      pagePath,
      email,
      company,
      whitepaperId: guide.id,
      whitepaperTitle: guide.title,
      guideUrl,
      placement,
      submittedAt
    });
  } catch (error) {
    console.error("Whitepaper durable persistence error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "whitepaper-request",
      pagePath,
      email,
      createdAt: submittedAt
    });
  } catch (error) {
    console.error("Whitepaper lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: guide.successMessage,
    guideUrl
  });
}
