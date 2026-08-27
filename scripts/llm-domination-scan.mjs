#!/usr/bin/env node
// LLM Domination Scan · SKS Talents
// Query 15 requetes cibles dans 5 LLM (ChatGPT, Claude, Perplexity, Mistral, Gemini)
// et compte les mentions "SKS Talents" dans les reponses.
// Output : JSON avec score /75 + detail par LLM par requete.
//
// Ce script tourne chaque lundi 6h Paris via GitHub Actions.
// Environnement requis :
//   ANTHROPIC_API_KEY (pour Claude)
//   OPENAI_API_KEY (pour ChatGPT)
//   PERPLEXITY_API_KEY (pour Perplexity)
//   MISTRAL_API_KEY (pour Mistral)
//   GEMINI_API_KEY (pour Gemini)
// Les LLM qui n'ont pas de clef sont skippes (marques "unavailable" dans le rapport).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const CONFIG = JSON.parse(
  await fs.readFile(path.join(__dirname, "lib", "lundi-matin-config.json"), "utf8")
);

const BRAND_KEYWORDS = ["SKS Talents", "sks talents", "skstalents"];

function detectBrand(text) {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return BRAND_KEYWORDS.some((k) => normalized.includes(k.toLowerCase()));
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
        max_tokens: 500,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return { available: true, text, mentioned: detectBrand(text) };
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
        max_tokens: 500,
        messages: [{ role: "user", content: query }],
      }),
    });
    const data = await res.json();
    const text = data?.content?.[0]?.text || "";
    return { available: true, text, mentioned: detectBrand(text) };
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
        max_tokens: 500,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return { available: true, text, mentioned: detectBrand(text) };
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
        max_tokens: 500,
      }),
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return { available: true, text, mentioned: detectBrand(text) };
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
    return { available: true, text, mentioned: detectBrand(text) };
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

async function scanQuery(query) {
  const results = {};
  await Promise.all(
    CONFIG.llm_providers.map(async (provider) => {
      const fn = PROVIDERS[provider];
      if (!fn) {
        results[provider] = { available: false };
        return;
      }
      results[provider] = await fn(query);
    })
  );
  return results;
}

async function main() {
  const started = new Date();
  const totals = {};
  CONFIG.llm_providers.forEach((p) => (totals[p] = 0));
  totals.overall_mentions = 0;
  totals.overall_available = 0;

  const detail = [];
  for (const query of CONFIG.llm_queries) {
    const results = await scanQuery(query);
    detail.push({ query, results });
    for (const [provider, res] of Object.entries(results)) {
      if (res.available) {
        totals.overall_available += 1;
        if (res.mentioned) {
          totals[provider] += 1;
          totals.overall_mentions += 1;
        }
      }
    }
  }

  const scoreDenominator = CONFIG.llm_queries.length * CONFIG.llm_providers.length;
  const output = {
    scanned_at: started.toISOString(),
    duration_ms: Date.now() - started.getTime(),
    score_num: totals.overall_mentions,
    score_denom: scoreDenominator,
    score_pct: Math.round((totals.overall_mentions / scoreDenominator) * 100),
    availability_pct: Math.round((totals.overall_available / scoreDenominator) * 100),
    by_provider: Object.fromEntries(
      CONFIG.llm_providers.map((p) => [
        p,
        {
          mentions: totals[p],
          out_of: CONFIG.llm_queries.length,
          pct: Math.round((totals[p] / CONFIG.llm_queries.length) * 100),
        },
      ])
    ),
    detail,
  };

  const outDir = path.join(PROJECT_ROOT, "data");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "llm-domination-latest.json");
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf8");

  const historyPath = path.join(outDir, "llm-domination-history.jsonl");
  await fs.appendFile(
    historyPath,
    JSON.stringify({
      scanned_at: output.scanned_at,
      score_num: output.score_num,
      score_denom: output.score_denom,
      score_pct: output.score_pct,
      by_provider: output.by_provider,
    }) + "\n"
  );

  console.log(
    `LLM domination scan: ${output.score_num}/${output.score_denom} mentions (${output.score_pct}%)`
  );
  console.log(`Saved to ${outPath}`);
  return output;
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
    console.error("LLM domination scan failed:", err);
    process.exit(1);
  });
}

export { main as runLlmDominationScan };
