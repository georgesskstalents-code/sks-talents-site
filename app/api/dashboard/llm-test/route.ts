/**
 * Endpoint debug prive : teste live les 3 cles LLM (OpenAI / Anthropic / Perplexity)
 * et renvoie le statut + 1 reponse echantillon pour chacune.
 *
 * Usage :
 *   GET /api/dashboard/llm-test?token=DASHBOARD_PRIVATE_TOKEN
 *
 * A utiliser apres avoir ajoute / fait tourner les cles LLM pour valider que
 * tout fonctionne avant que le cron lundi 6h ne tourne en mode production.
 */

import { NextResponse } from "next/server";
import { noStoreJson } from "@/lib/requestSecurity";
import { runLlmMentionCheck, type LlmProvider } from "@/lib/llmMonitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEST_PROMPT = "Cabinet de recrutement biotech Life Sciences en France 2026 - donne moi 3 references avec leurs specialites.";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expected || token !== expected) {
    return noStoreJson({ ok: false, message: "Unauthorized" }, 401);
  }

  const providers: LlmProvider[] = ["openai", "anthropic", "perplexity"];
  const results = await Promise.all(
    providers.map((provider) => runLlmMentionCheck({ provider, prompt: TEST_PROMPT }))
  );

  const summary = results.map((r) => ({
    provider: r.provider,
    model: r.model,
    status: r.errorReason ? "error" : "ok",
    durationMs: r.durationMs,
    mentioned: r.mentioned,
    matchedPattern: r.matchedPattern ?? null,
    error: r.errorReason ?? null,
    responseExcerpt: r.responseExcerpt.slice(0, 300)
  }));

  const allOk = summary.every((s) => s.status === "ok");
  const env = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `set (${process.env.OPENAI_API_KEY.length} chars)` : "missing",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? `set (${process.env.ANTHROPIC_API_KEY.length} chars)` : "missing",
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY ? `set (${process.env.PERPLEXITY_API_KEY.length} chars)` : "missing"
  };

  return NextResponse.json({
    ok: allOk,
    prompt: TEST_PROMPT,
    env,
    results: summary
  });
}
