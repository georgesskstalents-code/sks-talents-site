import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJsonl(filePath) {
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

function topEntries(map, limit = 10) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function inc(map, key) {
  if (!key) {
    return;
  }
  const normalized = String(key).trim();
  if (!normalized) {
    return;
  }
  map[normalized] = (map[normalized] ?? 0) + 1;
}

function formatList(entries, suffix = "") {
  if (!entries.length) {
    return "- Aucun signal";
  }
  return entries.map(([label, count]) => `- ${label}: ${count}${suffix}`).join("\n");
}

function toIsoDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "";
  }
  return value.toISOString().slice(0, 10);
}

function buildTopics({ topSearchQueries, topAgentQueries }) {
  const hints = new Set();

  for (const [query] of [...topSearchQueries, ...topAgentQueries]) {
    const normalized = String(query).toLowerCase();
    if (normalized.includes("remuneration") || normalized.includes("salaire")) {
      hints.add("Salaires / rémunération (benchmarks, grilles, cas par métier)");
    }
    if (normalized.includes("absenteisme") || normalized.includes("absent")) {
      hints.add("Absentéisme (calcul, seuils, pilotage RH, impacts)");
    }
    if (normalized.includes("grossesse") || normalized.includes("enceinte") || normalized.includes("periode")) {
      hints.add("Droit du travail RH (grossesse, période d’essai, obligations employeur)");
    }
    if (normalized.includes("orient") || normalized.includes("metier") || normalized.includes("career")) {
      hints.add("Orientation métiers (par filière Life Sciences / Animal Health)");
    }
  }

  const topics = [...hints];
  if (!topics.length) {
    return ["Rien de récurrent cette semaine (volumes faibles)"];
  }
  return topics.slice(0, 6);
}

const now = new Date();
const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

const analyticsPath =
  process.env.SITE_ANALYTICS_LOG_PATH ?? path.join(process.cwd(), "data", "site-analytics-log.jsonl");
const leadsPath =
  process.env.SITE_LEAD_LOG_PATH ?? path.join(process.cwd(), "data", "site-lead-log.jsonl");
const searchPath = path.join(process.cwd(), "data", "site-search-log.jsonl");

const analyticsRaw = await readJsonl(analyticsPath);
const analytics = analyticsRaw.filter((entry) => new Date(entry.createdAt || 0).getTime() >= cutoff.getTime());

const leadsRaw = await readJsonl(leadsPath);
const leads = leadsRaw.filter((entry) => new Date(entry.createdAt || 0).getTime() >= cutoff.getTime());

const searchesRaw = await readJsonl(searchPath);
const searches = searchesRaw.filter((entry) => new Date(entry.createdAt || 0).getTime() >= cutoff.getTime());

const pageviews = {};
const agentQueries = {};
const agentClicks = {};
const ctaClicks = {};
const leadPages = {};
const searchQueries = {};

for (const entry of analytics) {
  if (entry.type === "pageview") {
    inc(pageviews, entry.path);
  }
  if (entry.type === "agent_query") {
    inc(agentQueries, entry.query);
  }
  if (entry.type === "agent_click") {
    inc(agentClicks, entry.target);
  }
  if (entry.type === "cta_click") {
    inc(ctaClicks, entry.target);
  }
}

for (const entry of leads) {
  inc(leadPages, entry.pagePath);
}

for (const entry of searches) {
  inc(searchQueries, (entry.normalizedQuery || entry.query || "").toLowerCase());
}

const totalPageviews = Object.values(pageviews).reduce((sum, value) => sum + value, 0);
const totalAgentQueries = Object.values(agentQueries).reduce((sum, value) => sum + value, 0);
const totalAgentClicks = Object.values(agentClicks).reduce((sum, value) => sum + value, 0);
const totalCtaClicks = Object.values(ctaClicks).reduce((sum, value) => sum + value, 0);
const totalLeads = Object.values(leadPages).reduce((sum, value) => sum + value, 0);

const topPages = topEntries(pageviews, 10);
const topLeadPages = topEntries(leadPages, 10);
const topAgentQueries = topEntries(agentQueries, 10);
const topAgentClicks = topEntries(agentClicks, 10);
const topCtaClicks = topEntries(ctaClicks, 10);
const topSearchQueries = topEntries(searchQueries, 10);

const topics = buildTopics({ topSearchQueries, topAgentQueries });
const leadLogMissing = leadsRaw.length === 0;

const lines = [
  `Période: ${toIsoDate(cutoff)} → ${toIsoDate(now)} (7 jours glissants, UTC)`,
  "",
  "## Tableau de bord",
  `- Pageviews: ${totalPageviews}`,
  `- Requêtes assistant: ${totalAgentQueries}`,
  `- Clics liens assistant: ${totalAgentClicks}`,
  `- Clics CTA: ${totalCtaClicks}`,
  `- Leads: ${totalLeads}${leadLogMissing ? " (aucun log leads local détecté)" : ""}`,
  "",
  "## Pages les plus vues",
  formatList(topPages, " vues"),
  "",
  "## Pages générant le plus de leads",
  topLeadPages.length ? formatList(topLeadPages, " leads") : "- Aucun lead attribué (ou données manquantes)",
  "",
  "## Requêtes assistant les plus fréquentes",
  formatList(topAgentQueries, ""),
  "",
  "## Liens assistant les plus cliqués",
  formatList(topAgentClicks, " clics"),
  "",
  "## CTA les plus cliqués",
  formatList(topCtaClicks, " clics"),
  "",
  "## Recherches internes les plus fréquentes",
  formatList(topSearchQueries, ""),
  "",
  "## Sujets à créer ensuite (demande récurrente)",
  topics.map((topic) => `- ${topic}`).join("\n")
];

process.stdout.write(`${lines.join("\n")}\n`);
