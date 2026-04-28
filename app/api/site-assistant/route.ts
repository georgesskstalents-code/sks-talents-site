import { appendSiteAnalyticsLog } from "@/lib/siteIntelligence";
import { buildSiteAssistantResponse } from "@/lib/siteAssistantEngine";
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

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  const assistantResponse = await buildSiteAssistantResponse({
    question,
    path,
    title,
    language
  });

  return noStoreJson({
    ok: true,
    answer: assistantResponse.answer,
    internalLinks: assistantResponse.internalLinks,
    externalLinks: assistantResponse.externalLinks
  });
}
