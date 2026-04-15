import { appendSiteAnalyticsLog } from "@/lib/siteIntelligence";
import {
  applyRateLimit,
  getClientIp,
  noStoreJson,
  parseJsonBody,
  validateSameOriginRequest
} from "@/lib/requestSecurity";

type ChatRequestMessage = {
  role?: "user" | "assistant";
  content?: string;
};

type ChatBody = {
  messages?: ChatRequestMessage[];
  language?: "fr" | "en";
  path?: string;
  title?: string;
  sessionId?: string;
};

const SYSTEM_PROMPT = `You are an AI assistant for SKS Talents, a recruitment and HR consulting company specialized in life sciences (biotech, pharma, medtech, animal health).

Your role is to:

greet visitors
understand their needs
guide them to the right service
answer questions clearly and professionally
encourage them to book a call

You must:

speak French or English depending on the user language
be concise, helpful and business-oriented
adapt tone to CEOs, HR leaders or candidates

MAIN USE CASES
If the user is a company → guide toward recruitment or HR services
If the user is a candidate → guide toward job opportunities
If unclear → ask questions to qualify

GOAL

Convert visitors into:

booked calls
leads
applications

TONE

Professional, friendly, efficient, not robotic.

Important:
- Prefer guiding users first to SKS Talents pages and services.
- Do not invent facts, salaries, jobs or company details.
- If you are not sure, say it clearly and suggest booking a call or checking the most relevant page.`;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeMessages(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Array<{ role: "user" | "assistant"; content: string }>;
  }

  return value
    .map((item) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      content: normalizeText(item?.content, 2_000)
    }))
    .filter((item) => item.content.length > 0)
    .slice(-20);
}

function eventStreamHeaders() {
  return {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    Connection: "keep-alive"
  };
}

function enqueueEvent(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  payload: Record<string, unknown>
) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
}

function transformLanguage(language: "fr" | "en") {
  return language === "fr"
    ? "Answer in French unless the user clearly writes in English."
    : "Answer in English unless the user clearly writes in French.";
}

function normalizeForMatch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildFallbackReply(query: string, language: "fr" | "en") {
  const text = normalizeForMatch(query);

  if (
    /recrut|hire|hiring|talent|drh|ceo|coo|cfo|search|executive|service rh|hr service/.test(text)
  ) {
    return language === "fr"
      ? "Pour une entreprise, je vous recommande de commencer par /services puis /contact#rappel si vous avez un besoin prioritaire. Si votre sujet concerne des recrutements sensibles en biotech, diagnostic, animal health ou petfood, la page /references vous donnera aussi des exemples concrets."
      : "For a company, I recommend starting with /services and then /contact#rappel if the need is urgent. If your topic is sensitive hiring in biotech, diagnostics, animal health or petfood, /references also gives concrete examples.";
  }

  if (/candidate|candidat|job|emploi|opportunit|apply|postuler|metier|role/.test(text)) {
    return language === "fr"
      ? "Si vous êtes candidat, le bon point d’entrée est /job-roles pour explorer les métiers, puis /orientation si vous avez besoin d’un guidage plus personnalisé. Je peux aussi vous orienter vers /blog pour des contenus marché et carrière."
      : "If you are a candidate, the best entry point is /job-roles to explore roles, then /orientation for more personalized guidance. I can also point you to /blog for market and career content.";
  }

  if (/ecole|school|student|etudiant|orientation|formation|universit/.test(text)) {
    return language === "fr"
      ? "Pour l’orientation, je vous recommande /orientation puis /schools. Si vous cherchez des écoles liées aux life sciences, au diagnostic ou à la santé animale, ces pages ont été pensées comme bibliothèque de repères."
      : "For orientation, I recommend /orientation and then /schools. If you are looking for schools related to life sciences, diagnostics or animal health, these pages were designed as a reference library.";
  }

  if (/salaire|salary|compensation|remuneration|package/.test(text)) {
    return language === "fr"
      ? "Le meilleur point d’entrée pour les rémunérations est /salary-benchmarks. Vous y trouverez les repères par rôle, secteur et contexte de croissance, puis des fiches liées dans /job-roles."
      : "The best entry point for compensation is /salary-benchmarks. You will find benchmarks by role, sector and growth stage, then related pages in /job-roles.";
  }

  if (/fund|fonds|investment|invest|seed|serie a|series a|serie b|series b|levee|fundraising/.test(text)) {
    return language === "fr"
      ? "Pour les sujets financement et structuration post-levée, commencez par /investment-funds, /news et /studies. Ces pages couvrent les fonds, la croissance Seed / Série A / Série B et les impacts recrutement."
      : "For funding and post-raise team building topics, start with /investment-funds, /news and /studies. These pages cover funds, Seed / Series A / Series B growth and hiring impact.";
  }

  if (/veterin|animal|petfood|clinic|clinique|vet/.test(text)) {
    return language === "fr"
      ? "Pour la santé animale, je vous conseille /animal-health, puis /animal-health/veterinary ou /animal-health/petfood selon votre sujet. Vous pouvez aussi consulter /references pour voir les environnements déjà couverts."
      : "For animal health, I recommend /animal-health, then /animal-health/veterinary or /animal-health/petfood depending on your topic. You can also check /references to see the environments already covered.";
  }

  return language === "fr"
    ? "Je peux vous orienter vers les bonnes pages SKS TALENTS. Essayez par exemple /services pour les besoins entreprise, /job-roles pour les métiers, /resources pour les contenus marché, /orientation pour les étudiants et /contact#rappel pour parler à l’équipe."
    : "I can guide you to the right SKS TALENTS pages. Try /services for company needs, /job-roles for roles, /resources for market content, /orientation for students, and /contact#rappel to speak with the team.";
}

export async function POST(request: Request) {
  const originCheck = await validateSameOriginRequest();
  if (!originCheck.ok) {
    return originCheck.response;
  }

  const ip = getClientIp(originCheck.requestHeaders);
  const allowed = await applyRateLimit(ip, {
    key: "website-chat",
    windowMs: 10 * 60 * 1000,
    maxRequests: 80
  });

  if (!allowed) {
    return noStoreJson(
      {
        ok: false,
        message:
          "Too many chat messages sent too quickly. Trop de messages envoyés trop vite."
      },
      429
    );
  }

  const parsedBody = await parseJsonBody<ChatBody>(request, 25_000);
  if (!parsedBody.ok) {
    return parsedBody.response;
  }

  const language = parsedBody.body.language === "en" ? "en" : "fr";
  const path = normalizeText(parsedBody.body.path, 180);
  const title = normalizeText(parsedBody.body.title, 180);
  const sessionId = normalizeText(parsedBody.body.sessionId, 80);
  const messages = normalizeMessages(parsedBody.body.messages);

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage) {
    return noStoreJson(
      {
        ok: false,
        message:
          language === "fr"
            ? "Merci de poser une question."
            : "Please ask a question."
      },
      422
    );
  }

  try {
    await appendSiteAnalyticsLog({
      type: "agent_query",
      path,
      title,
      query: latestUserMessage.content,
      sessionId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Chat analytics log error", error);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const encoder = new TextEncoder();
    const fallbackReply = buildFallbackReply(latestUserMessage.content, language);
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        enqueueEvent(controller, encoder, { type: "delta", delta: fallbackReply });
        enqueueEvent(controller, encoder, { type: "done" });
        controller.close();
      }
    });

    return new Response(stream, { headers: eventStreamHeaders() });
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      stream: true,
      instructions: `${SYSTEM_PROMPT}\n\n${transformLanguage(language)}\nCurrent page: ${path || "/"}\nCurrent title: ${title || "SKS TALENTS"}`,
      input: messages.map((message) => ({
        role: message.role,
        content: [{ type: "input_text", text: message.content }]
      }))
    }),
    cache: "no-store"
  });

  if (!upstream.ok || !upstream.body) {
    const upstreamText = await upstream.text().catch(() => "");
    return noStoreJson(
      {
        ok: false,
        message:
          language === "fr"
            ? `Le chat OpenAI a échoué (${upstream.status}).`
            : `OpenAI chat failed (${upstream.status}).`,
        detail: upstreamText.slice(0, 400)
      },
      upstream.status
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          let boundaryIndex = buffer.indexOf("\n\n");

          while (boundaryIndex !== -1) {
            const rawEvent = buffer.slice(0, boundaryIndex);
            buffer = buffer.slice(boundaryIndex + 2);
            boundaryIndex = buffer.indexOf("\n\n");

            const payload = rawEvent
              .split("\n")
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.replace(/^data:\s?/, ""))
              .join("\n")
              .trim();

            if (!payload || payload === "[DONE]") {
              continue;
            }

            try {
              const event = JSON.parse(payload) as {
                type?: string;
                delta?: unknown;
                error?: { message?: string };
              };

              if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
                enqueueEvent(controller, encoder, { type: "delta", delta: event.delta });
              } else if (event.type === "response.completed") {
                enqueueEvent(controller, encoder, { type: "done" });
              } else if (
                event.type === "response.failed" ||
                event.type === "error"
              ) {
                enqueueEvent(controller, encoder, {
                  type: "error",
                  message:
                    language === "fr"
                      ? "Le chat n'a pas pu terminer sa réponse."
                      : "The chat could not complete its answer."
                });
              }
            } catch {
              // Ignore non-JSON events from the upstream SSE stream.
            }
          }
        }

        enqueueEvent(controller, encoder, { type: "done" });
        controller.close();
      } catch (error) {
        console.error("Chat stream error", error);
        enqueueEvent(controller, encoder, {
          type: "error",
          message:
            language === "fr"
              ? "Le flux du chat a été interrompu."
              : "The chat stream was interrupted."
        });
        controller.close();
      }
    }
  });

  return new Response(stream, { headers: eventStreamHeaders() });
}
