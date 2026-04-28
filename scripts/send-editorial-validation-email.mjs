import { spawn } from "node:child_process";

function readFlag(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return "";
  }

  return String(process.argv[index + 1] ?? "").trim();
}

function readMultiFlag(flag) {
  const values = [];

  for (let index = 0; index < process.argv.length; index += 1) {
    if (process.argv[index] === flag) {
      values.push(String(process.argv[index + 1] ?? "").trim());
    }
  }

  return values.filter(Boolean);
}

function sanitizeHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function escapeBody(value) {
  return String(value || "").trim() || "Non renseigne";
}

async function sendViaResend({ to, from, subject, text }) {
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

async function sendViaSendmail({ recipient, from, subject, text }) {
  const safeRecipient = sanitizeHeader(recipient);
  const safeFrom = sanitizeHeader(from);
  const safeSubject = sanitizeHeader(subject);

  const body = [
    `To: ${safeRecipient}`,
    `From: ${safeFrom}`,
    `Subject: ${safeSubject}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text
  ].join("\n");

  await new Promise((resolve, reject) => {
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

async function sendMail({ recipient, from, subject, text }) {
  const sentViaResend = await sendViaResend({
    to: sanitizeHeader(recipient),
    from: sanitizeHeader(from),
    subject: sanitizeHeader(subject),
    text
  }).catch((error) => {
    console.error("Resend validation email error", error);
    return false;
  });

  if (sentViaResend) {
    return "resend";
  }

  await sendViaSendmail({
    recipient,
    from,
    subject,
    text
  });

  return "sendmail";
}

const title = readFlag("--title");
const notionUrl = readFlag("--notion-url");
const why = readFlag("--why");
const impact = readFlag("--impact");
const offer = readFlag("--offer");
const nextIdeas = readMultiFlag("--next");
const dryRun = process.argv.includes("--dry-run");

if (!title || !notionUrl) {
  console.error("Usage: node scripts/send-editorial-validation-email.mjs --title \"...\" --notion-url \"https://...\" [--why \"...\"] [--impact \"...\"] [--offer \"...\"] [--next \"...\"]");
  process.exit(1);
}

const recipient =
  process.env.SITE_INTELLIGENCE_EMAIL ??
  process.env.FEEDBACK_NOTIFICATION_EMAIL ??
  "infos@skstalents.com";
const from = process.env.MAIL_FROM_EMAIL ?? recipient;
const subject = `Validation éditoriale SKS TALENTS - ${title}`;

const body = [
  "Un nouveau brouillon éditorial SKS TALENTS est prêt à valider.",
  "",
  `Titre: ${escapeBody(title)}`,
  `Lien Notion: ${escapeBody(notionUrl)}`,
  "",
  "Pourquoi ce sujet :",
  escapeBody(why),
  "",
  "Impact attendu SEO / LLM / business :",
  escapeBody(impact),
  "",
  "Offre recommandée :",
  escapeBody(offer),
  "",
  "Prochaines idées :",
  ...(nextIdeas.length ? nextIdeas.map((idea) => `- ${idea}`) : ["- Aucune idee suivante renseignee"]),
  "",
  "Action attendue :",
  "Valider, ajuster si besoin, puis publier dans Notion quand le contenu est prêt."
].join("\n");

if (dryRun) {
  console.log(JSON.stringify({ recipient, from, subject, body }, null, 2));
  process.exit(0);
}

const mode = await sendMail({
  recipient,
  from,
  subject,
  text: body
});

console.log(`Validation email sent via ${mode} to ${recipient}`);
