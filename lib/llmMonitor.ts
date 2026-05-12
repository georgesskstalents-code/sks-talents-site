/**
 * LLM mention monitor - teste si SKS Talents apparait dans les reponses de ChatGPT, Claude, Perplexity.
 *
 * Modeles utilises (rapides + economiques) :
 *  - OpenAI : gpt-4o-mini (env OPENAI_API_KEY)
 *  - Anthropic : claude-haiku-4-5-20251001 (env ANTHROPIC_API_KEY)
 *  - Perplexity : sonar (env PERPLEXITY_API_KEY, modele avec web search inclus)
 *
 * Detection : on cherche les substrings 'sks talents', 'skstalents', 'georges kengue' (case-insensitive)
 * dans la reponse texte. Premium future: extraire les URL citees par Perplexity.
 */

const MENTION_PATTERNS = [/sks\s*talents/i, /skstalents/i, /georges\s+kengue/i];

export type LlmProvider = "openai" | "anthropic" | "perplexity";

export type LlmMentionResult = {
  provider: LlmProvider;
  model: string;
  prompt: string;
  mentioned: boolean;
  matchedPattern?: string;
  responseExcerpt: string;
  durationMs: number;
  errorReason?: string;
};

function detectMention(text: string): { mentioned: boolean; matchedPattern?: string } {
  for (const pattern of MENTION_PATTERNS) {
    if (pattern.test(text)) {
      return { mentioned: true, matchedPattern: pattern.source };
    }
  }
  return { mentioned: false };
}

async function callOpenAi(prompt: string): Promise<{ text: string; model: string } | { error: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { error: "OPENAI_API_KEY missing" };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 0.3
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { error: `OpenAI ${response.status}: ${body.slice(0, 160)}` };
    }
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content ?? "";
    return { text, model: "gpt-4o-mini" };
  } catch (err) {
    return { error: `OpenAI fetch error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

async function callAnthropic(prompt: string): Promise<{ text: string; model: string } | { error: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { error: "ANTHROPIC_API_KEY missing" };

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }]
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { error: `Anthropic ${response.status}: ${body.slice(0, 160)}` };
    }
    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n");
    return { text, model: "claude-haiku-4-5" };
  } catch (err) {
    return { error: `Anthropic fetch error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

async function callPerplexity(prompt: string): Promise<{ text: string; model: string } | { error: string }> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return { error: "PERPLEXITY_API_KEY missing" };

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600
      }),
      cache: "no-store"
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { error: `Perplexity ${response.status}: ${body.slice(0, 160)}` };
    }
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content ?? "";
    return { text, model: "sonar" };
  } catch (err) {
    return { error: `Perplexity fetch error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

const PROVIDER_CALLERS: Record<LlmProvider, (p: string) => Promise<{ text: string; model: string } | { error: string }>> = {
  openai: callOpenAi,
  anthropic: callAnthropic,
  perplexity: callPerplexity
};

export async function runLlmMentionCheck(opts: {
  provider: LlmProvider;
  prompt: string;
}): Promise<LlmMentionResult> {
  const start = Date.now();
  const result = await PROVIDER_CALLERS[opts.provider](opts.prompt);
  const durationMs = Date.now() - start;

  if ("error" in result) {
    return {
      provider: opts.provider,
      model: opts.provider,
      prompt: opts.prompt,
      mentioned: false,
      responseExcerpt: "",
      durationMs,
      errorReason: result.error
    };
  }

  const detected = detectMention(result.text);
  return {
    provider: opts.provider,
    model: result.model,
    prompt: opts.prompt,
    mentioned: detected.mentioned,
    matchedPattern: detected.matchedPattern,
    responseExcerpt: result.text.slice(0, 600),
    durationMs
  };
}

export async function runAllChecks(prompts: string[]): Promise<LlmMentionResult[]> {
  const providers: LlmProvider[] = ["openai", "anthropic", "perplexity"];
  const tasks: Promise<LlmMentionResult>[] = [];
  for (const prompt of prompts) {
    for (const provider of providers) {
      tasks.push(runLlmMentionCheck({ provider, prompt }));
    }
  }
  return Promise.all(tasks);
}
