import { readFile, readdir } from "node:fs/promises";
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

// ---------------- Section: Chantiers site 1+2+3 status ----------------

async function readChantiersStatus() {
  const candidates = [
    path.join(process.cwd(), "docs", "SPRINT_V3_CHANTIERS_STATUS.md"),
    path.join(process.cwd(), "docs", "chantiers-site-status.md")
  ];
  for (const file of candidates) {
    try {
      const raw = await readFile(file, "utf8");
      const trimmed = raw.trim();
      if (trimmed) {
        return trimmed.split("\n").slice(0, 40).join("\n");
      }
    } catch {
      // continue
    }
  }
  return "- Aucun statut chantier releve (fichier docs/SPRINT_V3_CHANTIERS_STATUS.md absent)";
}

const chantiersStatus = await readChantiersStatus();

// ---------------- Section: Content Master v2 posts publies ----------------

async function readPublishedPosts() {
  const dir = path.join(process.cwd(), "docs", "posts-additionnels-q4-2026");
  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const published = [];
  for (const name of files) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const raw = await readFile(path.join(dir, name), "utf8");
    if (!raw.startsWith("---")) continue;
    const end = raw.indexOf("\n---", 3);
    if (end === -1) continue;
    const fm = raw.slice(3, end);
    const statut = /^\s*statut\s*:\s*(.+?)\s*$/im.exec(fm)?.[1]?.trim().toLowerCase();
    if (statut !== "published") continue;
    const title = /^\s*title\s*:\s*(.+?)\s*$/im.exec(fm)?.[1]?.trim() || name;
    const publishedAt = /^\s*published_at\s*:\s*(.+?)\s*$/im.exec(fm)?.[1]?.trim() || "";
    if (publishedAt) {
      const dt = new Date(publishedAt).getTime();
      if (!Number.isFinite(dt) || dt < cutoff.getTime()) continue;
    }
    published.push({ title: title.replace(/^"|"$/g, ""), file: name, publishedAt });
  }
  return published;
}

const publishedPosts = await readPublishedPosts();

// ---------------- Section: Chloe Live conversations ----------------

const chloePath = path.join(process.cwd(), "data", "chloe-chat-log.jsonl");
const chloeRaw = await readJsonl(chloePath);
const chloeWeek = chloeRaw.filter(
  (entry) => new Date(entry.createdAt || entry.ts || 0).getTime() >= cutoff.getTime()
);
const chloeSessions = new Set();
const chloeTopics = {};
for (const entry of chloeWeek) {
  if (entry.sessionId) chloeSessions.add(entry.sessionId);
  const msg = String(entry.userMessage || entry.message || entry.query || "").toLowerCase();
  if (!msg) continue;
  const tags = [];
  if (/(recrut|chasse|shortlist|mission)/.test(msg)) tags.push("Recrutement");
  if (/(cadrage|brief|scope|fiche de poste)/.test(msg)) tags.push("Cadrage");
  if (/(salaire|remuneration|package)/.test(msg)) tags.push("Remuneration");
  if (/(structur|organisation|ops|process)/.test(msg)) tags.push("Structuration");
  if (/(diagnostic|maturite)/.test(msg)) tags.push("Diagnostic");
  for (const t of tags) inc(chloeTopics, t);
}
const chloeTopTopics = topEntries(chloeTopics, 5);

// ---------------- Section: Leads captures ----------------

const bufferLogPath = path.join(process.cwd(), "data", "buffer-drafts-log.jsonl");
const simulatorLogPath = path.join(process.cwd(), "data", "simulator-lead-log.jsonl");
const bufferRaw = await readJsonl(bufferLogPath);
const simulatorRaw = await readJsonl(simulatorLogPath);

const bufferWeek = bufferRaw.filter((e) => new Date(e.ts || 0).getTime() >= cutoff.getTime());
const simulatorWeek = simulatorRaw.filter(
  (e) => new Date(e.createdAt || e.ts || 0).getTime() >= cutoff.getTime()
);
const chloeEmails = chloeWeek.filter((e) => typeof e.email === "string" && e.email.includes("@"));

const leadsCapturedTotal = leads.length + simulatorWeek.length + chloeEmails.length;
const bufferDraftsThisWeek = bufferWeek.filter((e) => e.ok !== false).length;

// ---------------- Section: Decision de la semaine (Claude API) ----------------

async function generateWeeklyDecision(signals) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return "- (ANTHROPIC_API_KEY absent) Regarde les 3 pages qui montent, si l'une n'a pas de CTA vers /diagnostic, ajoute-le.";
  }
  const prompt = `Tu es le Chief of Staff de Georges Kengue (SKS Talents, cabinet exec search Life Sciences / Animal Health / Petfood). \n\nA partir de ces signaux hebdomadaires du site + operations, propose UNE seule decision concrete que Georges doit prendre cette semaine (24-48h). Sois ultra-specifique, une phrase max, action executable.\n\nSignaux:\n${signals}\n\nContraintes: pas d'em-dash, pas d'en-dash, pronoms inclusifs il/elle, francais business direct.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_DECISION_MODEL || "claude-opus-4-5-20250929",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const txt = await res.text().catch(() => "");
    if (!res.ok) return `- (Claude API ${res.status}) Prends 30 min pour lire les tops requetes et definir un post LinkedIn priorite.`;
    const parsed = JSON.parse(txt);
    const content = parsed?.content?.[0]?.text?.trim();
    return content ? `- ${content}` : "- (Reponse vide) Prendre 20 min lundi matin pour cadrer la priorite semaine.";
  } catch (err) {
    return `- (erreur Claude: ${err.message}) Bloque 20 min lundi matin pour prioriser un chantier site.`;
  }
}

const decisionSignals = [
  `pageviews_7j=${totalPageviews}`,
  `leads_7j=${leadsCapturedTotal}`,
  `chloe_sessions_7j=${chloeSessions.size}`,
  `buffer_drafts_7j=${bufferDraftsThisWeek}`,
  `posts_publies_7j=${publishedPosts.length}`,
  `top_page=${topPages[0]?.[0] || "n/a"}`,
  `top_agent_query=${topAgentQueries[0]?.[0] || "n/a"}`,
  `top_cta=${topCtaClicks[0]?.[0] || "n/a"}`
].join(" · ");

const weeklyDecision = await generateWeeklyDecision(decisionSignals);

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
  topics.map((topic) => `- ${topic}`).join("\n"),
  "",
  "## Chantiers site 1+2+3 · status",
  chantiersStatus,
  "",
  "## Content Master v2 · nouveaux posts publiés cette semaine",
  publishedPosts.length
    ? publishedPosts
        .map((p) => `- ${p.title}${p.publishedAt ? ` (${p.publishedAt})` : ""} · docs/posts-additionnels-q4-2026/${p.file}`)
        .join("\n")
    : "- Aucun post publié cette semaine (frontmatter statut: published dans docs/posts-additionnels-q4-2026/)",
  "",
  "## Chloé Live · conversations cette semaine",
  `- Sessions distinctes: ${chloeSessions.size}`,
  `- Messages utilisateurs: ${chloeWeek.length}`,
  `- Emails captés dans le chat: ${chloeEmails.length}`,
  chloeTopTopics.length
    ? `- Top thèmes:\n${chloeTopTopics.map(([t, c]) => `  - ${t}: ${c}`).join("\n")}`
    : "- Top thèmes: (aucun signal)",
  "",
  "## Leads capturés cette semaine",
  `- Total consolidé: ${leadsCapturedTotal}`,
  `- Depuis endpoint diagnostic (site-lead-log): ${leads.length}`,
  `- Depuis simulateur (simulator-lead-log): ${simulatorWeek.length}`,
  `- Depuis Chloé chat (email capté): ${chloeEmails.length}`,
  `- Drafts LinkedIn poussés dans Buffer: ${bufferDraftsThisWeek}`,
  "",
  "## Décision de la semaine",
  weeklyDecision
];

process.stdout.write(`${lines.join("\n")}\n`);
