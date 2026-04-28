import { assistantTopics, trustedExternalLinks, type AssistantLink } from "@/data/siteAssistant";

export type SiteAssistantLanguage = "fr" | "en";

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
  language: SiteAssistantLanguage;
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
              : "The most complete place to start from."
        },
        {
          label: language === "fr" ? "Bibliothèque métiers" : "Job library",
          href: "/job-roles",
          description:
            language === "fr"
              ? "Pour les fiches de poste, parcours et besoins marché."
              : "For job pages, career paths and market needs."
        },
        {
          label: language === "fr" ? "Actualités marché" : "Market updates",
          href: "/news",
          description:
            language === "fr"
              ? "Pour les levées, nominations et signaux marché."
              : "For funding news, executive moves and market signals."
        }
      ])
    );
  }

  return dedupeLinks(
    sanitizeLinks(topMatches.flatMap((item) => item.topic.internalLinks).slice(0, 6))
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
  language: SiteAssistantLanguage;
  question: string;
  path: string;
  title: string;
  answerSeed: string;
  internalLinks: AssistantLink[];
  externalLinks: AssistantLink[];
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
            : "You are the SKS TALENTS website assistant. Do not say you are Claude or Anthropic. Never invent facts. Answer only from the supplied context. If the context is insufficient, say so clearly and direct the user to SKS TALENTS pages or official sources. Keep the answer short, useful, reassuring, and in English.",
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

function buildSeedAnswer({
  language,
  best
}: {
  language: SiteAssistantLanguage;
  best?: { topic: (typeof assistantTopics)[number]; score: number };
}) {
  if (!best || best.score <= 0) {
    return language === "fr"
      ? "Je préfère ne pas inventer. Je n’ai pas trouvé de réponse assez sûre dans la base du site. Commencez par les pages SKS TALENTS ci-dessous, puis utilisez au besoin les sources officielles proposées."
      : "I prefer not to guess. I could not find a confident answer in the site knowledge base. Start with the SKS TALENTS pages below, then use the official sources if needed.";
  }

  if (language === "fr") {
    return best.topic.answer;
  }

  return (
    {
      salary: "For compensation topics, the best starting point is our salary benchmarks, gross-to-net calculator and related role pages.",
      orientation:
        "If you are choosing a path, start with our orientation flow, then our school pages to connect studies, jobs and outcomes.",
      funds:
        "For healthcare funds and funded companies, start with our fund directory and then our sourced market articles.",
      veterinary:
        "For animal health, the most useful starting points are our job pages, school pages, orientation content and official veterinary resources.",
      jobs:
        "For hard-to-fill roles, start with our job library, then connect each role to compensation and market context.",
      services:
        "If your need is recruitment, HR structuring or booking a call, the best entry point is our services and contact pages."
    }[best.topic.id as "salary" | "orientation" | "funds" | "veterinary" | "jobs" | "services"] ??
    best.topic.answer
  );
}

export async function buildSiteAssistantResponse({
  question,
  path,
  title,
  language
}: {
  question: string;
  path: string;
  title: string;
  language: SiteAssistantLanguage;
}) {
  const ranked = assistantTopics
    .map((topic) => ({ topic, score: scoreTopic(question, topic.keywords) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const answerSeed = buildSeedAnswer({ language, best });
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

  return {
    answer: aiAnswer,
    internalLinks,
    externalLinks,
    confident: Boolean(best && best.score > 0),
    bestTopicId: best?.topic.id ?? null
  };
}
