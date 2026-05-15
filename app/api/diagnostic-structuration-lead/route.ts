import {
  sendDiagnosticStructurationLeadEmail,
  type DiagnosticStructurationLeadPayload
} from "@/lib/email";
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

type Zone = "chaos" | "fragile" | "structure";

const SIGNAL_LABELS: Record<string, string> = {
  process: "Notre process de recrutement est ecrit, partage et utilise.",
  "time-to-hire": "Notre time-to-hire est suivi et discute, pas seulement subi.",
  "critical-roles": "Les roles critiques sont definis avant l'ouverture des postes.",
  automation:
    "Les taches repetitives sont automatisees quand elles n'apportent pas de valeur humaine.",
  "ceo-bottleneck": "Le recrutement ne depend pas du CEO pour chaque validation."
};

const ZONE_LABEL: Record<Zone, string> = {
  chaos: "Chaos",
  fragile: "Fragile",
  structure: "Structure"
};

type Body = {
  name?: string;
  email?: string;
  company?: string;
  score?: number;
  zone?: Zone;
  signals?: string[];
  website?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function getPagePathFromReferer(referer: string | null) {
  if (!referer) return "/diagnostic";
  try {
    return new URL(referer).pathname || "/diagnostic";
  } catch {
    return "/diagnostic";
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
      key: "diagnostic-structuration-lead",
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

  if (normalizeText(body.website, 250)) {
    return noStoreJson({ ok: true, message: "Merci, votre demande a bien ete prise en compte." });
  }

  const name = normalizeText(body.name, 120);
  const email = normalizeText(body.email, 160);
  const company = normalizeText(body.company, 160);
  const score =
    typeof body.score === "number" && body.score >= 0 && body.score <= 5
      ? Math.round(body.score)
      : 0;
  const zone: Zone =
    body.zone === "chaos" || body.zone === "fragile" || body.zone === "structure"
      ? body.zone
      : score >= 5
        ? "structure"
        : score >= 3
          ? "fragile"
          : "chaos";
  const submittedSignals = Array.isArray(body.signals)
    ? body.signals.filter((s): s is string => typeof s === "string").slice(0, 10)
    : [];

  if (!isValidEmail(email) || !name || !company) {
    return noStoreJson(
      { ok: false, message: "Merci de renseigner un nom, un email valide et une entreprise." },
      422
    );
  }

  const signalsFull = Object.entries(SIGNAL_LABELS).map(([id, label]) => ({
    label,
    checked: submittedSignals.includes(id)
  }));

  const recipientEmail =
    process.env.SITE_INTELLIGENCE_EMAIL ??
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    "g.kengue@skstalents.fr";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? recipientEmail;
  const pagePath = getPagePathFromReferer(originCheck.requestHeaders.get("referer"));
  const submittedAt = new Date().toISOString();

  const payload: DiagnosticStructurationLeadPayload = {
    name,
    email,
    company,
    score,
    zone,
    zoneLabel: ZONE_LABEL[zone],
    signals: signalsFull,
    pagePath,
    submittedAt
  };

  try {
    await sendDiagnosticStructurationLeadEmail({
      recipient: recipientEmail,
      from: fromEmail,
      payload
    });
  } catch (error) {
    console.error("Diagnostic structuration lead email error", error);
    return noStoreJson(
      { ok: false, message: "Erreur d'envoi. Reessayez ou ecrivez directement." },
      500
    );
  }

  try {
    await persistLeadDurably("diagnostic-structuration-lead", {
      recipientEmail,
      fromEmail,
      ...payload
    });
  } catch (error) {
    console.error("Diagnostic structuration lead persist error", error);
  }

  try {
    await appendLeadEventLog({
      kind: "diagnostic-structuration-lead",
      pagePath,
      email,
      createdAt: submittedAt
    });
  } catch (error) {
    console.error("Diagnostic structuration lead log error", error);
  }

  return noStoreJson({
    ok: true,
    message: "Merci. Votre diagnostic PDF arrive dans votre boite mail dans les prochaines minutes."
  });
}
