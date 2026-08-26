import { sendSimulatorLeadEmail, type SimulatorLeadPayload } from "@/lib/email";
import { persistLeadDurably } from "@/lib/durableStore";
import { appendLeadEventLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Mode = "entreprise" | "candidat";

type Body = {
  email?: string;
  mode?: Mode;
  simulator_context?: Record<string, unknown>;
  website?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
const MAX_CONTEXT_KEYS = 20;
const MAX_STRING_LENGTH = 250;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function getPagePathFromReferer(referer: string | null) {
  if (!referer) return "/cout-mauvais-recrutement";
  try {
    return new URL(referer).pathname || "/cout-mauvais-recrutement";
  } catch {
    return "/cout-mauvais-recrutement";
  }
}

function sanitizeContext(
  raw: Record<string, unknown> | undefined
): SimulatorLeadPayload["simulatorContext"] {
  if (!raw || typeof raw !== "object") return {};
  const output: SimulatorLeadPayload["simulatorContext"] = {};
  let count = 0;
  for (const [rawKey, rawValue] of Object.entries(raw)) {
    if (count >= MAX_CONTEXT_KEYS) break;
    const key = normalizeText(rawKey, 60);
    if (!key) continue;
    if (typeof rawValue === "string") {
      output[key] = rawValue.slice(0, MAX_STRING_LENGTH);
    } else if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
      output[key] = rawValue;
    } else if (typeof rawValue === "boolean") {
      output[key] = rawValue;
    } else if (rawValue === null || rawValue === undefined) {
      continue;
    } else {
      // Nested objects / arrays are serialised, capped.
      try {
        output[key] = JSON.stringify(rawValue).slice(0, MAX_STRING_LENGTH);
      } catch {
        continue;
      }
    }
    count += 1;
  }
  return output;
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  if (
    !(await applyRateLimit(ip, {
      key: "simulateur-lead",
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS
    }))
  ) {
    return noStoreJson(
      { ok: false, message: "Trop de demandes en peu de temps. Reessayez un peu plus tard." },
      429
    );
  }

  const parsedBody = await parseJsonBody<Body>(request);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }
  const body = parsedBody.body;

  // Honeypot : les bots remplissent 'website', on les silence sans erreur.
  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre demande a bien ete prise en compte." });
  }

  const email = normalizeText(body.email, 160);
  const mode: Mode = body.mode === "candidat" ? "candidat" : "entreprise";

  if (!isValidEmail(email)) {
    return noStoreJson(
      { ok: false, message: "Merci de renseigner un email valide." },
      422
    );
  }

  const simulatorContext = sanitizeContext(body.simulator_context);

  const recipientEmail =
    process.env.SITE_INTELLIGENCE_EMAIL ??
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    "g.kengue@skstalents.fr";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"));
  const submittedAt = new Date().toISOString();

  const payload: SimulatorLeadPayload = {
    email,
    mode,
    simulatorContext,
    pagePath,
    submittedAt
  };

  try {
    await sendSimulatorLeadEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload
    });
  } catch (error) {
    console.error("Simulator lead email error", error);
    return noStoreJson(
      { ok: false, message: "Erreur d'envoi. Reessayez ou ecrivez directement a g.kengue@skstalents.fr." },
      500
    );
  }

  try {
    await persistLeadDurably("simulateur-lead", {
      recipientEmail,
      fromEmail,
      ...payload
    });
  } catch (error) {
    console.error("Simulator lead persist error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "simulateur-lead",
      pagePath,
      email,
      createdAt: submittedAt
    });
  } catch (error) {
    console.error("Simulator lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: "Merci. Votre rapport detaille arrive dans votre boite mail dans les prochaines minutes."
  });
}
