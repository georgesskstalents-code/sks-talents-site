import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const logPath =
  process.env.SITE_FEEDBACK_LOG_PATH ??
  path.join(process.cwd(), "data", "site-feedback-log.jsonl");
const statePath =
  process.env.SITE_FEEDBACK_DIGEST_STATE_PATH ??
  path.join(process.cwd(), "data", "site-feedback-digest-state.json");
const recipient = process.env.FEEDBACK_NOTIFICATION_EMAIL ?? "infos@skstalents.com";
const from = process.env.MAIL_FROM_EMAIL ?? "infos@skstalents.com";

function sanitizeHeader(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function readLog() {
  try {
    const raw = await readFile(logPath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

async function readState() {
  try {
    return JSON.parse(await readFile(statePath, "utf8"));
  } catch {
    return { lastSentMonth: "" };
  }
}

async function writeState(payload) {
  await writeFile(statePath, JSON.stringify(payload, null, 2), "utf8");
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function sendMail(subject, body) {
  const safeRecipient = sanitizeHeader(recipient);
  const safeFrom = sanitizeHeader(from);
  const safeSubject = sanitizeHeader(subject);

  await new Promise((resolve, reject) => {
    const process = spawn("/usr/sbin/sendmail", ["-f", safeFrom, "-t", "-i"]);
    let stderr = "";

    process.stdin.write(
      [
        `To: ${safeRecipient}`,
        `From: ${safeFrom}`,
        `Subject: ${safeSubject}`,
        "Content-Type: text/plain; charset=UTF-8",
        "",
        body
      ].join("\n")
    );
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

const now = new Date();
const currentMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

const allEntries = await readLog();
const state = await readState();

if (!allEntries.length || state.lastSentMonth === currentMonth) {
  process.exit(0);
}

const monthEntries = allEntries.filter((entry) => String(entry.submittedAt || "").startsWith(currentMonth));

if (!monthEntries.length) {
  process.exit(0);
}

const avg = average(monthEntries.map((entry) => Number(entry.rating || 0)));
const topPages = monthEntries.reduce((acc, entry) => {
  acc[entry.pagePath] = (acc[entry.pagePath] || 0) + 1;
  return acc;
}, {});

const sortedPages = Object.entries(topPages)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([page, count]) => `- ${page}: ${count} retours`)
  .join("\n");

const comments = monthEntries
  .map((entry) => `- ${entry.rating}/5 · ${entry.pagePath} · ${entry.comment}`)
  .slice(0, 12)
  .join("\n");

await sendMail(
  `Rapport mensuel feedback site SKS TALENTS - ${currentMonth}`,
  [
    `Periode: ${currentMonth}`,
    `Nombre de retours: ${monthEntries.length}`,
    `Note moyenne: ${avg.toFixed(1)}/5`,
    "",
    "Pages les plus citees:",
    sortedPages || "- Aucun top page",
    "",
    "Commentaires:",
    comments || "- Aucun commentaire",
    "",
    "Rappel: sur une production serverless, il est preferable de remplacer ce log fichier par une base ou un webhook."
  ].join("\n")
);

await writeState({ lastSentMonth: currentMonth });
