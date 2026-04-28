import { spawn } from "node:child_process";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ContactLeadPayload = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  urgency: string;
  message: string;
};

type OrientationLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  targetSector: string;
  desiredPath: "student" | "professional";
};

type SiteFeedbackPayload = {
  rating: number;
  comment: string;
  pagePath: string;
  pageTitle: string;
  sessionAttempts: number;
  submittedAt: string;
};

type EditorialAlertsPayload = {
  email: string;
  interests: string[];
  pagePath: string;
  submittedAt: string;
};

type NewsletterSignupPayload = {
  email: string;
  segment: string;
  placement: string;
  pagePath: string;
  submittedAt: string;
};

type WhitepaperRequestPayload = {
  email: string;
  company: string;
  whitepaperTitle: string;
  placement: string;
  pagePath: string;
  submittedAt: string;
};

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeBody(value: string) {
  return value.trim() || "Non renseigne";
}

async function sendViaResend({
  to,
  from,
  replyTo,
  subject,
  text
}: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend failed with ${response.status}: ${body}`);
  }

  return true;
}

async function sendViaSendmail({
  recipient,
  from,
  replyTo,
  subject,
  text
}: {
  recipient: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const safeRecipient = sanitizeHeader(recipient);
  const safeFrom = sanitizeHeader(from);
  const safeSubject = sanitizeHeader(subject);

  const body = [
    `To: ${safeRecipient}`,
    `From: ${safeFrom}`,
    ...(replyTo ? [`Reply-To: ${sanitizeHeader(replyTo)}`] : []),
    `Subject: ${safeSubject}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text
  ].join("\n");

  await new Promise<void>((resolve, reject) => {
    const process = spawn("/usr/sbin/sendmail", ["-f", safeFrom, "-t", "-i"]);
    let stderr = "";

    process.stdin.write(body);
    process.stdin.end();

    process.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    process.on("error", reject);
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr || `sendmail failed with code ${code}`));
    });
  });
}

async function sendPlainTextEmail({
  recipient,
  from,
  replyTo,
  subject,
  text
}: {
  recipient: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const sentViaResend = await sendViaResend({
    to: sanitizeHeader(recipient),
    from: sanitizeHeader(from),
    replyTo: replyTo ? sanitizeHeader(replyTo) : undefined,
    subject: sanitizeHeader(subject),
    text
  }).catch((error) => {
    console.error("Resend email error", error);
    return false;
  });

  if (sentViaResend) {
    return;
  }

  await sendViaSendmail({
    recipient,
    from,
    replyTo,
    subject,
    text
  });
}

export async function sendLeadNotificationEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: ContactLeadPayload;
}) {
  const subject = `Nouvelle demande SKS TALENTS - ${payload.firstName} ${payload.lastName}`;

  const body = [
    "",
    "Nouvelle demande de rappel / contact depuis le site SKS TALENTS",
    "",
    `Nom: ${escapeBody(payload.firstName)} ${escapeBody(payload.lastName)}`,
    `Poste: ${escapeBody(payload.role)}`,
    `Email: ${escapeBody(payload.email)}`,
    `Telephone: ${escapeBody(payload.phone)}`,
    `Entreprise: ${escapeBody(payload.company)}`,
    `Secteur: ${escapeBody(payload.sector)}`,
    `Urgence: ${escapeBody(payload.urgency)}`,
    "",
    "Message:",
    escapeBody(payload.message),
    "",
    `Envoye le: ${new Date().toISOString()}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendOrientationReportEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    recommendations: string[];
  };
}) {
  const subject = `Demande de rapport orientation - ${payload.firstName} ${payload.lastName}`;

  const body = [
    "",
    "Nouveau telechargement de rapport orientation depuis le site SKS TALENTS",
    "",
    `Prenom: ${escapeBody(payload.firstName)}`,
    `Nom: ${escapeBody(payload.lastName)}`,
    `Email: ${escapeBody(payload.email)}`,
    `Profil: ${escapeBody(payload.profile)}`,
    "",
    "Recommandations exportees:",
    ...payload.recommendations.map((item) => `- ${item}`),
    "",
    `Envoye le: ${new Date().toISOString()}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendOrientationLeadEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: OrientationLeadPayload;
}) {
  const subject = `Nouvelle inscription orientation - ${payload.firstName} ${payload.lastName}`;

  const body = [
    "",
    "Nouvelle inscription avant orientation depuis le site SKS TALENTS",
    "",
    `Prenom: ${escapeBody(payload.firstName)}`,
    `Nom: ${escapeBody(payload.lastName)}`,
    `Email: ${escapeBody(payload.email)}`,
    `Telephone: ${escapeBody(payload.phone)}`,
    `Secteur vise: ${escapeBody(payload.targetSector)}`,
    `Parcours choisi: ${payload.desiredPath === "student" ? "Etudiant / Jeune diplome" : "Professionnel / bilan approfondi"}`,
    "",
    `Envoye le: ${new Date().toISOString()}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendSiteFeedbackEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: SiteFeedbackPayload;
}) {
  const subject = `Nouveau feedback site SKS TALENTS - ${payload.rating}/5`;

  const body = [
    "",
    "Nouveau feedback visiteur depuis le site SKS TALENTS",
    "",
    `Note: ${payload.rating}/5`,
    `Page: ${escapeBody(payload.pagePath)}`,
    `Titre: ${escapeBody(payload.pageTitle)}`,
    `Tentative: ${payload.sessionAttempts}`,
    "",
    "Commentaire:",
    escapeBody(payload.comment),
    "",
    `Envoye le: ${payload.submittedAt}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    subject,
    text: body
  });
}

export async function sendEditorialAlertsEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: EditorialAlertsPayload;
}) {
  const subject = `Nouvelle inscription ressources SKS TALENTS - ${payload.email}`;

  const body = [
    "",
    "Nouvelle inscription aux alertes ressources depuis le site SKS TALENTS",
    "",
    `Email: ${escapeBody(payload.email)}`,
    `Page: ${escapeBody(payload.pagePath)}`,
    `Centres d'interet: ${payload.interests.length ? payload.interests.join(", ") : "Non renseignes"}`,
    "",
    `Envoye le: ${payload.submittedAt}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendNewsletterSignupEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: NewsletterSignupPayload;
}) {
  const subject = `Nouvelle inscription newsletter SKS TALENTS - ${payload.email}`;

  const body = [
    "",
    "Nouvelle inscription a la newsletter SKS TALENTS",
    "",
    `Email: ${escapeBody(payload.email)}`,
    `Segment: ${escapeBody(payload.segment)}`,
    `Placement: ${escapeBody(payload.placement)}`,
    `Page: ${escapeBody(payload.pagePath)}`,
    "Cadence: premier vendredi + dernier vendredi du mois",
    "Promesse: 5 minutes de lecture max",
    "",
    `Envoye le: ${payload.submittedAt}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendNewsletterWelcomeEmail({
  recipient,
  from,
  segment
}: {
  recipient: string;
  from: string;
  segment: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";
  const subject = "Bienvenue dans la note SKS TALENTS";

  const body = [
    "",
    "Bienvenue dans la note SKS TALENTS.",
    "",
    "Vous recevrez une newsletter courte, utile et orientee decision :",
    "- signaux marche",
    "- metiers penuriques",
    "- salaires",
    "- ecosysteme",
    "- decisions dirigeants",
    "",
    `Segment choisi: ${escapeBody(segment)}`,
    "Cadence: premier vendredi + dernier vendredi du mois",
    "Format: 5 minutes de lecture max",
    "",
    "Premieres ressources a ouvrir :",
    `- Archive newsletter: ${siteUrl}/newsletter`,
    `- Ressources: ${siteUrl}/resources`,
    `- Benchmarks salaires: ${siteUrl}/salary-benchmarks`,
    `- Etudes & insights: ${siteUrl}/studies`,
    "",
    "Important : chaque edition est relue et validee dans Notion avant publication.",
    "",
    `Envoye le: ${new Date().toISOString()}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    subject,
    text: body
  });
}

export async function sendWhitepaperRequestEmail({
  recipient,
  from,
  payload
}: {
  recipient: string;
  from: string;
  payload: WhitepaperRequestPayload;
}) {
  const subject = `Nouvelle demande livre blanc SKS TALENTS - ${payload.whitepaperTitle}`;

  const body = [
    "",
    "Nouvelle demande de livre blanc depuis le site SKS TALENTS",
    "",
    `Email: ${escapeBody(payload.email)}`,
    `Entreprise: ${escapeBody(payload.company)}`,
    `Livre blanc: ${escapeBody(payload.whitepaperTitle)}`,
    `Placement: ${escapeBody(payload.placement)}`,
    `Page: ${escapeBody(payload.pagePath)}`,
    "",
    `Envoye le: ${payload.submittedAt}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    replyTo: payload.email,
    subject,
    text: body
  });
}

export async function sendWhitepaperAccessEmail({
  recipient,
  from,
  whitepaperTitle,
  guideUrl
}: {
  recipient: string;
  from: string;
  whitepaperTitle: string;
  guideUrl: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.skstalents.fr";
  const diagnosticUrl = `${siteUrl}/diagnostic`;
  const scorecardUrl = `${siteUrl}/scorecard-dirigeant`;
  const membershipUrl = `${siteUrl}/abonnement`;
  const useCasesUrl = `${siteUrl}/cas-d-usage`;
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.CALENDLY_URL || "https://calendly.com/g-kengue/talentconsulting";
  const subject = `Votre guide SKS TALENTS : ${whitepaperTitle}`;

  const body = [
    "",
    `Voici votre guide SKS TALENTS : ${escapeBody(whitepaperTitle)}`,
    "",
    "Ouvrir le guide :",
    guideUrl,
    "",
    "Si vous voulez aller plus loin :",
    `- Diagnostic : ${diagnosticUrl}`,
    `- Scorecard dirigeant : ${scorecardUrl}`,
    `- Abonnement / membership : ${membershipUrl}`,
    `- Cas d'usage : ${useCasesUrl}`,
    `- Réserver un call : ${calendlyUrl}`,
    "",
    "Le problème n’est pas seulement de recruter plus. Il s’agit surtout de structurer vos RH, d’automatiser les tâches utiles et de protéger le temps dirigeant.",
    "",
    `Envoye le: ${new Date().toISOString()}`
  ].join("\n");

  await sendPlainTextEmail({
    recipient,
    from,
    subject,
    text: body
  });
}

export async function appendSiteFeedbackLog(payload: SiteFeedbackPayload) {
  const targetPath =
    process.env.SITE_FEEDBACK_LOG_PATH ??
    path.join(process.cwd(), "data", "site-feedback-log.jsonl");

  await mkdir(path.dirname(targetPath), { recursive: true });
  await appendFile(targetPath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function readSiteFeedbackLog() {
  const targetPath =
    process.env.SITE_FEEDBACK_LOG_PATH ??
    path.join(process.cwd(), "data", "site-feedback-log.jsonl");

  try {
    const raw = await readFile(targetPath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as SiteFeedbackPayload);
  } catch {
    return [];
  }
}

export async function updateSiteFeedbackDigestState(payload: { lastSentMonth: string }) {
  const targetPath =
    process.env.SITE_FEEDBACK_DIGEST_STATE_PATH ??
    path.join(process.cwd(), "data", "site-feedback-digest-state.json");

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, JSON.stringify(payload, null, 2), "utf8");
}

export async function readSiteFeedbackDigestState() {
  const targetPath =
    process.env.SITE_FEEDBACK_DIGEST_STATE_PATH ??
    path.join(process.cwd(), "data", "site-feedback-digest-state.json");

  try {
    return JSON.parse(await readFile(targetPath, "utf8")) as { lastSentMonth?: string };
  } catch {
    return {};
  }
}
