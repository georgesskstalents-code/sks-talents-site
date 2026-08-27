#!/usr/bin/env node
// LLM Domination Scan v2 · SKS Talents · PR #8
//
// Scan structure des 5 LLMs sur l'univers de requetes maintenu par
// geo-query-universe.mjs. Pour chaque (query, LLM), on capture :
//   - presence_level : absent / cited / recommended / dominant
//   - competitors_detected : compares a la liste curatee (tier 1/2/3)
//   - sources_native : citations reelles fournies par l'API (Perplexity natif · Gemini grounding)
//   - sources_inferred : entites extraites via NER Claude (marquees inferred, jamais observed)
//   - tone : recommendation / citation / mention / warning
//
// Le Core Visibility Score /75 est calcule uniquement sur les 15 stable_core_queries.
// Les rotating queries scannees en supplement N'ENTRENT PAS dans le /75.
//
// Variance : V1 = 1 run par (query, LLM). Escalade automatique a 3 runs sur queries
// detectees comme instables (flip presence sur 4+ semaines).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const CONFIG = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "lundi-matin-config.json"), "utf8")
);
const COMPETITORS = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "geo-known-competitors.json"), "utf8")
);

const BRAND_KEYWORDS = ["SKS Talents", "sks talents", "skstalents", "SKSTalents"];

function detectBrand(text) {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return BRAND_KEYWORDS.some((k) => normalized.includes(k.toLowerCase()));
}

function detectPresenceLevel(text) {
  if (!text) return "absent";
  if (!detectBrand(text)) return "absent";
  const t = text.toLowerCase();
  const brandIdx = t.indexOf("sks talents");
  const before = t.slice(Math.max(0, brandIdx - 120), brandIdx);
  const after = t.slice(brandIdx, Math.min(t.length, brandIdx + 200));
  const strongMarkers = [
    "reference du secteur",
    "leader",
    "principal cabinet",
    "cabinet le plus reconnu",
    "recommande en priorite",
    "top choix",
    "best choice",
    "leading",
    "recognized reference",
    "premier cabinet",
    "cabinet numero",
  ];
  const recoMarkers = [
    "recommande",
    "recommends",
    "specialise",
    "specialized",
    "solide",
    "excellent",
    "reconnu pour",
    "considered",
    "known for",
    "reference",
    "expert",
  ];
  const combined = (before + " " + after).toLowerCase();
  if (strongMarkers.some((m) => combined.includes(m))) return "dominant";
  if (recoMarkers.some((m) => combined.includes(m))) return "recommended";
  return "cited";
}

function extractCompetitorsFromText(text) {
  if (!text) return [];
  const t = text.toLowerCase();
  const found = [];
  const seen = new Set();
  const allCompetitors = [
    ...COMPETITORS.tier1_direct.map((c) => ({ ...c, tier: "tier1_direct" })),
    ...COMPETITORS.tier2_adjacent.map((c) => ({ ...c, tier: "tier2_adjacent" })),
    ...COMPETITORS.tier3_tangential.map((c) => ({ ...c, tier: "tier3_tangential" })),
  ];
  for (const c of allCompetitors) {
    const nameL = c.name.toLowerCase();
    if (t.includes(nameL) && !seen.has(nameL)) {
      seen.add(nameL);
      const weight = COMPETITORS._meta.scoring[c.tier];
      found.push({
        name: c.name,
        tier: c.tier,
        weight,
        source: "inferred",
        source_note: "Detected in LLM text via known competitors list. Marked inferred (not native citation).",
      });
    }
  }
  return found;
}

async function askChatGPT(query) {
  if (!process.env.OPENAI_API_KEY) return { available: false };
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: query }],
        max_tokens: 600,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return { available: true, text };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

async function askClaude(query) {
  if (!process.env.ANTHROPIC_API_KEY) return { available: false };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 600,
        messages: [{ role: "user", content: query }],
      }),
    });
    const data = await res.json();
    const text = data?.content?.[0]?.text || "";
    return { available: true, text };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

async function askPerplexity(query) {
  if (!process.env.PERPLEXITY_API_KEY) return { available: false };
  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [{ role: "user", content: query }],
        max_tokens: 600,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    // Perplexity retourne citations nativement
    const citations = data?.citations || [];
    return {
      available: true,
      text,
      sources_native: citations.map((url) => ({ url, source: "observed", origin: "perplexity_api_citations" })),
    };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

async function askMistral(query) {
  if (!process.env.MISTRAL_API_KEY) return { available: false };
  try {
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: query }],
        max_tokens: 600,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return { available: true, text };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

async function askGemini(query) {
  if (!process.env.GEMINI_API_KEY) return { available: false };
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const grounding = data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources_native = grounding
      .map((g) => g?.web?.uri)
      .filter(Boolean)
      .map((url) => ({ url, source: "observed", origin: "gemini_grounding_chunks" }));
    return { available: true, text, sources_native };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

const PROVIDERS = {
  chatgpt: askChatGPT,
  claude: askClaude,
  perplexity: askPerplexity,
  mistral: askMistral,
  gemini: askGemini,
};

async function scanOne(query, provider, runs) {
  const fn = PROVIDERS[provider];
  if (!fn) return { available: false };
  const results = [];
  for (let i = 0; i < runs; i += 1) {
    const raw = await fn(query);
    if (!raw.available) return { available: false, error: raw.error };
    results.push(raw);
  }
  // Aggregate over runs · consensus
  const presencesLevels = results.map((r) => detectPresenceLevel(r.text));
  const consensusLevel = pickConsensusLevel(presencesLevels);
  const competitors = mergeCompetitors(results.map((r) => extractCompetitorsFromText(r.text)));
  const sources_native = mergeSourcesNative(results);
  return {
    available: true,
    runs_used: runs,
    presence_level: consensusLevel,
    presence_levels_per_run: presencesLevels,
    competitors_detected: competitors,
    sources_native,
    text_first_run_preview: (results[0].text || "").slice(0, 500),
    variance_flag: runs > 1 && new Set(presencesLevels).size > 1,
  };
}

function pickConsensusLevel(levels) {
  const rank = { absent: 0, cited: 1, recommended: 2, dominant: 3 };
  // Majority vote · en cas d'egalite, prendre le plus faible (prudence)
  const counts = {};
  for (const l of levels) counts[l] = (counts[l] || 0) + 1;
  const sorted = Object.entries(counts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return rank[a[0]] - rank[b[0]];
  });
  return sorted[0]?.[0] || "absent";
}

function mergeCompetitors(lists) {
  const flat = lists.flat();
  const map = new Map();
  for (const c of flat) {
    if (!map.has(c.name)) map.set(c.name, { ...c, seen_in_runs: 1 });
    else {
      const existing = map.get(c.name);
      map.set(c.name, { ...existing, seen_in_runs: existing.seen_in_runs + 1 });
    }
  }
  return Array.from(map.values());
}

function mergeSourcesNative(results) {
  const map = new Map();
  for (const r of results) {
    for (const s of r.sources_native || []) {
      if (!map.has(s.url)) map.set(s.url, s);
    }
  }
  return Array.from(map.values());
}

// -----------------------------------------------------------------------
// Unstable query tracking
// -----------------------------------------------------------------------

async function loadUnstableQueriesFromHistory() {
  const historyPath = path.join(PROJECT_ROOT, "data", "llm-domination-history.jsonl");
  try {
    const raw = await fs.readFile(historyPath, "utf8");
    const lines = raw.trim().split(/\r?\n/).slice(-4); // last 4 weeks
    if (lines.length < 4) return new Set();
    const weeks = lines.map((l) => JSON.parse(l));
    const unstable = new Set();
    // Simplistic · look at core queries with different presence week to week
    const map = new Map();
    for (const w of weeks) {
      for (const q of w.per_query || []) {
        if (!q.is_stable_core) continue;
        for (const [provider, res] of Object.entries(q.per_llm || {})) {
          const key = `${q.query}||${provider}`;
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(res.presence_level);
        }
      }
    }
    for (const [key, levels] of map.entries()) {
      const unique = new Set(levels);
      if (unique.size >= 2) {
        const [q] = key.split("||");
        unstable.add(q);
      }
    }
    return unstable;
  } catch {
    return new Set();
  }
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

async function loadUniverse() {
  const universePath = path.join(PROJECT_ROOT, "data", "geo-query-universe.json");
  try {
    const raw = await fs.readFile(universePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  const started = new Date();
  console.log("Starting LLM Domination Scan v2...");

  const universe = await loadUniverse();
  if (!universe) {
    console.error("No universe found · run geo-query-universe.mjs first.");
    process.exit(1);
  }

  const unstableQueries = await loadUnstableQueriesFromHistory();
  console.log(`Unstable queries carried from history : ${unstableQueries.size}`);

  const coreQueries = universe.stable_core_queries || [];
  const rotatingQueries = universe.rotating_candidates || [];
  const toScan = [...coreQueries, ...rotatingQueries];

  const per_query = [];
  let totalAvailable = 0;
  let totalMentionsCore = 0;

  for (const q of toScan) {
    const isCore = q.is_stable_core === true;
    const runs = unstableQueries.has(q.query)
      ? CONFIG.geo.variance_config.runs_when_unstable
      : CONFIG.geo.variance_config.runs_v1_default;

    const perLlm = {};
    for (const provider of CONFIG.llm_providers) {
      const r = await scanOne(q.query, provider, runs);
      perLlm[provider] = r;
      if (r.available) totalAvailable += 1;
      if (r.available && isCore && r.presence_level !== "absent") totalMentionsCore += 1;
    }

    // Aggregate competitors across LLMs for this query
    const aggregatedCompetitors = mergeCompetitors(
      Object.values(perLlm).filter((r) => r.available).map((r) => r.competitors_detected || [])
    );

    per_query.push({
      query: q.query,
      source_type: q.source_type,
      is_stable_core: isCore,
      per_llm: perLlm,
      competitors_aggregated: aggregatedCompetitors,
      presence_summary: summarizePresenceAcrossLlms(perLlm),
    });
  }

  const coreDenominator = coreQueries.length * CONFIG.llm_providers.length;
  const output = {
    scanned_at: started.toISOString(),
    duration_ms: Date.now() - started.getTime(),
    core_visibility_score: {
      num: totalMentionsCore,
      denom: coreDenominator,
      pct: coreDenominator ? Math.round((totalMentionsCore / coreDenominator) * 100) : 0,
      note: "Core Visibility Score : mentions detectees (level != absent) sur les 15 stable_core_queries x 5 LLMs.",
    },
    scan_meta: {
      total_queries_scanned: toScan.length,
      core_queries_count: coreQueries.length,
      rotating_queries_count: rotatingQueries.length,
      providers_used: CONFIG.llm_providers,
      scan_availability_pct: Math.round(
        (totalAvailable / (toScan.length * CONFIG.llm_providers.length)) * 100
      ),
    },
    per_query,
  };

  const outPath = path.join(PROJECT_ROOT, "data", "llm-domination-latest.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf8");

  const historyPath = path.join(PROJECT_ROOT, "data", "llm-domination-history.jsonl");
  await fs.appendFile(
    historyPath,
    JSON.stringify({
      scanned_at: output.scanned_at,
      core_visibility_score: output.core_visibility_score,
      scan_meta: output.scan_meta,
      per_query: per_query.map((q) => ({
        query: q.query,
        is_stable_core: q.is_stable_core,
        per_llm: Object.fromEntries(
          Object.entries(q.per_llm).map(([k, v]) => [
            k,
            v.available ? { presence_level: v.presence_level, competitors_count: v.competitors_detected?.length || 0 } : { available: false },
          ])
        ),
      })),
    }) + "\n"
  );

  console.log(
    `Core Visibility Score : ${output.core_visibility_score.num}/${output.core_visibility_score.denom} (${output.core_visibility_score.pct}%)`
  );
  console.log(`Saved to ${outPath}`);
  return output;
}

function summarizePresenceAcrossLlms(perLlm) {
  const summary = { absent: 0, cited: 0, recommended: 0, dominant: 0, unavailable: 0 };
  for (const r of Object.values(perLlm)) {
    if (!r.available) summary.unavailable += 1;
    else summary[r.presence_level] += 1;
  }
  return summary;
}

const isDirectRun = (() => {
  try {
    return import.meta.url === new URL(`file://${process.argv[1]}`).href;
  } catch {
    return false;
  }
})();
if (isDirectRun) {
  main().catch((err) => {
    console.error("Scan failed:", err);
    process.exit(1);
  });
}

export { main as runLlmDominationScan };
