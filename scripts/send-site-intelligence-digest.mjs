import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const analyticsPath =
  process.env.SITE_ANALYTICS_LOG_PATH ?? path.join(process.cwd(), "data", "site-analytics-log.jsonl");
const leadsPath =
  process.env.SITE_LEAD_LOG_PATH ?? path.join(process.cwd(), "data", "site-lead-log.jsonl");
const statePath =
  process.env.SITE_INTELLIGENCE_DIGEST_STATE_PATH ??
  path.join(process.cwd(), "data", "site-intelligence-digest-state.json");
const recipient = process.env.SITE_INTELLIGENCE_EMAIL ?? process.env.FEEDBACK_NOTIFICATION_EMAIL ?? "infos@skstalents.com";
const from = process.env.MAIL_FROM_EMAIL ?? "infos@skstalents.com";

function sanitizeHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

async function readLog(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
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
    return { lastSentWeek: "" };
  }
}

async function writeState(payload) {
  await writeFile(statePath, JSON.stringify(payload, null, 2), "utf8");
}

function sendMail(subject, body) {
  return new Promise((resolve, reject) => {
    const process = spawn("/usr/sbin/sendmail", ["-f", sanitizeHeader(from), "-t", "-i"]);
    let stderr = "";

    process.stdin.write(
      [
        `To: ${sanitizeHeader(recipient)}`,
        `From: ${sanitizeHeader(from)}`,
        `Subject: ${sanitizeHeader(subject)}`,
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

function topEntries(entries, limit = 10) {
  return Object.entries(entries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function formatTopMap(entries, valueLabel) {
  return topEntries(entries)
    .map(([key, count]) => `- ${key}: ${count} ${valueLabel}`)
    .join("\n");
}

function formatTable(headers, rows) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => String(row[index] ?? "").length))
  );

  const formatRow = (row) =>
    row.map((value, index) => String(value ?? "").padEnd(widths[index], " ")).join(" | ");

  return [
    formatRow(headers),
    widths.map((width) => "-".repeat(width)).join("-|-"),
    ...rows.map(formatRow)
  ].join("\n");
}

const now = new Date();
const weekKey = `${now.getUTCFullYear()}-W${String(Math.ceil(((now - Date.UTC(now.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7)).padStart(2, "0")}`;
const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

const state = await readState();
if (state.lastSentWeek === weekKey) {
  process.exit(0);
}

const analytics = (await readLog(analyticsPath)).filter(
  (entry) => new Date(entry.createdAt || 0).getTime() >= cutoff
);
const leads = (await readLog(leadsPath)).filter((entry) => new Date(entry.createdAt || 0).getTime() >= cutoff);

if (!analytics.length && !leads.length) {
  process.exit(0);
}

const pageviews = {};
const queries = {};
const clicks = {};
const leadPages = {};

for (const entry of analytics) {
  if (entry.type === "pageview" && entry.path) {
    pageviews[entry.path] = (pageviews[entry.path] || 0) + 1;
  }
  if (entry.type === "agent_query" && entry.query) {
    queries[entry.query] = (queries[entry.query] || 0) + 1;
  }
  if ((entry.type === "agent_click" || entry.type === "cta_click") && entry.target) {
    clicks[entry.target] = (clicks[entry.target] || 0) + 1;
  }
}

for (const entry of leads) {
  if (entry.pagePath) {
    leadPages[entry.pagePath] = (leadPages[entry.pagePath] || 0) + 1;
  }
}

const topPagesTable = formatTable(
  ["Page", "Vues"],
  topEntries(pageviews, 10).map(([page, views]) => [page, String(views)])
);

const conversionRows = topEntries(pageviews, 25)
  .map(([page, views]) => {
    const leadsCount = leadPages[page] || 0;
    const rate = views > 0 ? `${((leadsCount / views) * 100).toFixed(1)}%` : "0.0%";
    return [page, String(views), String(leadsCount), rate];
  })
  .filter((row) => Number(row[1]) > 0)
  .sort((a, b) => Number(b[2]) - Number(a[2]) || Number.parseFloat(b[3]) - Number.parseFloat(a[3]))
  .slice(0, 10);

const conversionTable = formatTable(["Page", "Vues", "Leads", "Taux"], conversionRows);
const queryTable = formatTable(
  ["Requête", "Volume"],
  topEntries(queries, 10).map(([query, count]) => [query, String(count)])
);
const clickTable = formatTable(
  ["Lien / Cible", "Clics"],
  topEntries(clicks, 10).map(([target, count]) => [target, String(count)])
);

const body = [
  `Période : 7 derniers jours`,
  `Semaine : ${weekKey}`,
  "",
  "TABLEAU DE BORD",
  "",
  formatTable(
    ["Indicateur", "Valeur"],
    [
      ["Pages vues", String(Object.values(pageviews).reduce((sum, value) => sum + value, 0))],
      ["Questions à l'agent", String(Object.values(queries).reduce((sum, value) => sum + value, 0))],
      ["Clics agent / CTA", String(Object.values(clicks).reduce((sum, value) => sum + value, 0))],
      ["Leads captés", String(Object.values(leadPages).reduce((sum, value) => sum + value, 0))]
    ]
  ),
  "",
  "Pages les plus vues",
  Object.keys(pageviews).length ? topPagesTable : "- Aucun signal",
  "",
  "Pages les plus convertissantes",
  conversionRows.length ? conversionTable : "- Aucun lead attribué",
  "",
  "Requêtes les plus tapées à l'agent",
  Object.keys(queries).length ? queryTable : "- Aucune question",
  "",
  "Liens les plus cliqués depuis l'agent",
  Object.keys(clicks).length ? clickTable : "- Aucun clic",
  "",
  "Pistes éditoriales",
  "- Prioriser les requêtes les plus tapées qui n'ont pas encore de page dédiée.",
  "- Renforcer les pages qui génèrent des leads avec plus de preuves, FAQ et CTA.",
  "- Ajouter des hubs ou articles quand un sujet revient plusieurs fois via l'agent."
].join("\n");

await sendMail(`Rapport hebdomadaire SKS TALENTS - ${weekKey}`, body);
await writeState({ lastSentWeek: weekKey });
