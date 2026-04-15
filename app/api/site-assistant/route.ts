import { assistantTopics, trustedExternalLinks } from "@/data/siteAssistant";
import { appendSiteAnalyticsLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

type SiteAssistantBody = {
  question?: string;
  path?: string;
  title?: string;
  sessionId?: string;
  language?: "fr" | "en";
};

type AssistantLink = {
  label: string;
  href: string;
  description: string;
};

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeLinks(links: AssistantLink[]) {
  return links.filter((link) => {
    if (link.href.startsWith("/")) {
      return true;
    }

    try {
      const parsed = new URL(link.href);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  });
}

function scoreTopic(question: string, keywords: string[]) {
  const normalized = question.toLowerCase();
  return keywords.reduce((score, keyword) => score + (normalized.includes(keyword.toLowerCase()) ? 1 : 0), 0);
}

function dedupeLinks(links: AssistantLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }
    seen.add(link.href);
    return true;
  });
}

function buildGuidedInternalLinks({
  ranked,
  language
}: {
  ranked: Array<{ topic: (typeof assistantTopics)[number]; score: number }>;
  language: "fr" | "en";
}) {
  const topMatches = ranked.filter((item) => item.score > 0).slice(0, 3);
  if (!topMatches.length) {
    return dedupeLinks(
      sanitizeLinks([
        {
          label: language === "fr" ? "Ressources" : "Resources",
          href: "/resources",
          description:
            language === "fr"
              ? "Le point d’entrée le plus complet pour trouver l’information."
              : "The most complete entry point to find information."
        },
        {
          label: language === "fr" ? "Bibliothèque métiers" : "Job library",
          href: "/job-roles",
          description:
            language === "fr"
              ? "Pour les fiches de poste, parcours et besoins marché."
              : "For job descriptions, career paths and market needs."
        },
        {
          label: language === "fr" ? "Actualités marché" : "Market updates",
          href: "/news",
          description:
            language === "fr"
              ? "Pour les levées, nominations et signaux marché."
              : "For funding news, nominations and market signals."
        }
      ])
    );
  }

  return dedupeLinks(
    sanitizeLinks(
      topMatches.flatMap((item) => item.topic.internalLinks).slice(0, 6)
    )
  );
}

function buildGuidedExternalLinks({
  ranked,
  best
}: {
  ranked: Array<{ topic: (typeof assistantTopics)[number]; score: number }>;
  best?: { topic: (typeof assistantTopics)[number]; score: number };
}) {
  const candidateLinks = [
    ...(best?.topic.externalLinks ?? []),
    ...ranked.filter((item) => item.score > 0).slice(0, 2).flatMap((item) => item.topic.externalLinks ?? []),
    ...trustedExternalLinks
  ];

  return dedupeLinks(sanitizeLinks(candidateLinks)).slice(0, 4);
}

async function generateAnthropicAnswer({
  language,
  question,
  path,
  title,
  answerSeed,
  internalLinks,
  externalLinks
}: {
  language: "fr" | "en";
  question: string;
  path: string;
  title: string;
  answerSeed: string;
  internalLinks: { label: string; href: string; description: string }[];
  externalLinks: { label: string; href: string; description: string }[];
}) {
  const useServerAi = process.env.SITE_ASSISTANT_USE_AI === "true";
  if (!useServerAi) {
    return null;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6_000);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        model,
        max_tokens: 220,
        system:
          language === "fr"
            ? "Tu es l'assistant du site SKS TALENTS. Ne dis jamais que tu es Claude ou Anthropic. N'invente rien. Réponds uniquement à partir du contexte fourni. Si le contexte est insuffisant, dis-le clairement et oriente vers les liens du site ou les sources officielles. Réponse courte, utile, rassurante, en français."
            : "You are the SKS TALENTS website assistant. Do not say you are Claude or Anthropic. Never invent facts. Answer only from the supplied context. If context is insufficient, say so clearly and direct the user to SKS TALENTS pages or official sources. Keep the answer short, useful, reassuring, and in English.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  question,
                  currentPage: path,
                  currentTitle: title,
                  answerSeed,
                  internalLinks,
                  externalLinks
                })
              }
            ]
          }
        ]
      }),
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Anthropic error ${response.status}`);
    }

    const payload = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };

    return payload.content?.find((item) => item.type === "text")?.text?.trim() ?? null;
  } catch (error) {
    console.error("Anthropic site assistant error", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "site-assistant",
    windowMs: 10 * 60 * 1000,
    maxRequests: 60
  });

  if (!allowed) {
    return noStoreJson(
      {
        ok: false,
        message: "Too many questions sent too quickly. Trop de questions envoyées trop vite."
      },
      429
    );
  }

  const parsedBody = await parseJsonBody<SiteAssistantBody>(request, 8_000);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const question = normalizeText(parsedBody.body.question, 320);
  const path = normalizeText(parsedBody.body.path, 180);
  const title = normalizeText(parsedBody.body.title, 180);
  const sessionId = normalizeText(parsedBody.body.sessionId, 80);
  const language = parsedBody.body.language === "en" ? "en" : "fr";

  if (question.length < 3) {
    return noStoreJson(
      {
        ok: false,
        message:
          language === "en"
            ? "Please type a slightly more specific question."
            : "Merci de formuler une question un peu plus précise."
      },
      422
    );
  }

  const ranked = assistantTopics
    .map((topic) => ({ topic, score: scoreTopic(question, topic.keywords) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const confident = Boolean(best && best.score > 0);

  try {
    await appendSiteAnalyticsLog({
      type: "agent_query",
      path,
      title,
      query: question,
      sessionId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Assistant query log error", error);
  }

  if (!confident) {
    const internalLinks = buildGuidedInternalLinks({ ranked, language });
    const externalLinks = buildGuidedExternalLinks({ ranked, best });
    const answerSeed =
      language === "fr"
        ? "Je préfère ne pas inventer. Je n’ai pas trouvé de réponse assez sûre dans la base du site. Commencez par les pages SKS TALENTS ci-dessous. Si le sujet dépasse ce que nous couvrons, utilisez ensuite les sources officielles proposées."
        : "I prefer not to guess. I could not find a confident answer in the site knowledge base. Please start with the SKS TALENTS pages below. If the topic goes beyond what we cover, then use the official sources provided.";

    const aiAnswer =
      (await generateAnthropicAnswer({
        language,
        question,
        path,
        title,
        answerSeed,
        internalLinks,
        externalLinks
      })) ?? answerSeed;

    return noStoreJson({
      ok: true,
      answer: aiAnswer,
      internalLinks,
      externalLinks
    });
  }

  const answerSeed =
    language === "fr"
      ? best.topic.answer
      : {
          salary: "For salaries, the best starting point is our benchmarks, gross-to-net simulator and related job pages.",
          orientation:
            "If you are trying to choose a path, the best starting point is our orientation flow, then our school pages to connect studies, jobs and outcomes.",
          funds:
            "For healthcare funds and funded companies, I can direct you to our funds directory and sourced market articles.",
          veterinary:
            "For animal health, you will find job pages, schools, orientation content and official veterinary resources on the site.",
          jobs:
            "For hard-to-fill roles, start with our job library, then connect the role to salaries, schools and market context.",
          services:
            "If your need is recruitment, HR structuring or booking a call, the best entry point is our services and contact pages."
        }[best.topic.id as "salary" | "orientation" | "funds" | "veterinary" | "jobs" | "services"] ??
        best.topic.answer;
  const internalLinks = buildGuidedInternalLinks({ ranked, language });
  const externalLinks = buildGuidedExternalLinks({ ranked, best });

  const aiAnswer =
    (await generateAnthropicAnswer({
      language,
      question,
      path,
      title,
      answerSeed,
      internalLinks,
      externalLinks
    })) ?? answerSeed;

  return noStoreJson({
    ok: true,
    answer: aiAnswer,
    internalLinks,
    externalLinks
  });
}
