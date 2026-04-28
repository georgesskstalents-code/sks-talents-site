import { getNewsletterSegment, newsletterSegments } from "@/data/newsletter";
import { persistLeadDurably } from "@/lib/durableStore";
import {
  sendNewsletterSignupEmail,
  sendNewsletterWelcomeEmail
} from "@/lib/email";
import { appendLeadEventLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { NewsletterSegmentId } from "@/data/newsletter";

type NewsletterSignupBody = {
  email?: string;
  segment?: string;
  placement?: string;
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

function isNewsletterSegmentId(value: string): value is NewsletterSegmentId {
  return newsletterSegments.some((item) => item.id === value);
}

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
      key: "newsletter-signup",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Reessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<NewsletterSignupBody>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const body = parsedBody.body;

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre inscription a bien ete prise en compte." });
  }

  const email = normalizeText(body.email, 160);
  const requestedSegment = normalizeText(body.segment, 80);
  const placement = normalizeText(body.placement, 80) || "site";
  const segment = isNewsletterSegmentId(requestedSegment)
    ? requestedSegment
    : newsletterSegments[0].id;

  if (!isValidEmail(email)) {
    return noStoreJson({ ok: false, message: "Merci de renseigner un email valide." }, 422);
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: normalizeText(body.turnstileToken, 2048),
    ip
  });
  if (!turnstileCheck.ok) {
    return noStoreJson({ ok: false, message: turnstileCheck.message ?? "Verification refusee." }, 403);
  }

  const resolvedSegment = getNewsletterSegment(segment);
  const recipientEmail =
    process.env.SITE_INTELLIGENCE_EMAIL ??
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    "g.kengue@skstalents.com";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"), "/newsletter");
  const submittedAt = new Date().toISOString();

  try {
    await sendNewsletterSignupEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload: {
        email,
        segment: resolvedSegment.label,
        placement,
        pagePath,
        submittedAt
      }
    });
  } catch (error) {
    console.error("Newsletter signup email send error", error);
  }

  try {
    await sendNewsletterWelcomeEmail({
      recipient: email,
      from: fromEmail,
      segment: resolvedSegment.label
    });
  } catch (error) {
    console.error("Newsletter welcome email send error", error);
  }

  try {
    await persistLeadDurably("newsletter-signup", {
      recipientEmail,
      fromEmail,
      pagePath,
      email,
      segment: resolvedSegment.id,
      segmentLabel: resolvedSegment.label,
      placement,
      cadence: "first-and-last-friday",
      readTime: "5 minutes max",
      submittedAt
    });
  } catch (error) {
    console.error("Newsletter signup durable persistence error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "newsletter-signup",
      pagePath,
      email,
      createdAt: submittedAt
    });
  } catch (error) {
    console.error("Newsletter signup lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message:
      "Merci, vous recevrez la prochaine note SKS. Chaque edition reste relue et validee dans Notion avant publication."
  });
}
