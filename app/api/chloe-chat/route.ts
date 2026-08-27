import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { findJobRoleBySlug } from "@/data/jobRoles";
import { findChloeFicheBySlug, isChloeActiveFor } from "@/data/chloe-fiches-priority";
import {
  buildChloeSystemPrompt,
  computeQualificationScore,
  extractEmail
} from "@/lib/chloe-prompt";
import { persistLeadDurably } from "@/lib/durableStore";
import { sendPlainTextEmailPublic } from "@/lib/chloe-email-adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  fiche_slug: string;
  conversation_history: ChatMessage[];
  user_message: string;
  visitor_email?: string | null;
};

type ChatResponseBody = {
  response: string;
  action?: "capture_email" | "suggest_rdv";
  score: number;
};

const LOG_PATH_ENV = process.env.CHLOE_CHAT_LOG_PATH;
const DEFAULT_LOG_PATH = path.join(process.cwd(), "data", "chloe-chat-log.jsonl");
const LEAD_RECIPIENT = process.env.CHLOE_LEAD_RECIPIENT || "g.kengue@skstalents.fr";
const LEAD_FROM = process.env.CHLOE_LEAD_FROM || "SKS Talents <contact@skstalents.com>";

function stripDashes(text: string): string {
  // Convention SKS : jamais d'em-dash / en-dash dans le rendu.
  return text.replace(/[—–]/g, "-");
}

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m): m is ChatMessage =>
        Boolean(m) &&
        typeof m === "object" &&
        (m as ChatMessage).role != null &&
        typeof (m as ChatMessage).content === "string"
    )
    .map<ChatMessage>((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 4000)
    }))
    .slice(-16);
}

async function appendLog(entry: Record<string, unknown>) {
  const targetPath = LOG_PATH_ENV ?? DEFAULT_LOG_PATH;
  try {
    await mkdir(path.dirname(targetPath), { recursive: true });
    await appendFile(targetPath, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (err) {
    console.error("chloe-chat log append failed", err);
  }
}

async function notifyGeorges(args: {
  ficheTitle: string;
  ficheSlug: string;
  email: string;
  score: number;
  transcript: ChatMessage[];
  lastAssistant: string;
}) {
  const { ficheTitle, ficheSlug, email, score, transcript, lastAssistant } = args;
  const subject = `[Chloe Live] Lead qualifie score ${score}/100 - ${ficheTitle}`;
  const lines: string[] = [
    "",
    "Nouveau lead qualifie via Chloe Live (widget conversationnel fiche metier)",
    "",
    `Fiche : ${ficheTitle} (${ficheSlug})`,
    `Email visiteur : ${email}`,
    `Score qualification : ${score}/100`,
    "",
    "Suggestion Chloe : proposer un echange visio 30 min sans engagement.",
    "ACTION REQUISE : valider manuellement avant tout push CRM ou envoi de RDV.",
    "",
    "Derniere reponse Chloe :",
    lastAssistant,
    "",
    "Transcript complet :",
    ...transcript.map((m, i) => `[${i + 1}] ${m.role.toUpperCase()} : ${m.content}`),
    "",
    "Signature : SKS Talents"
  ];

  await sendPlainTextEmailPublic({
    recipient: LEAD_RECIPIENT,
    from: LEAD_FROM,
    replyTo: email,
    subject,
    text: stripDashes(lines.join("\n"))
  });
}

export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const ficheSlug = String(body.fiche_slug || "").trim();
  const userMessage = String(body.user_message || "").trim().slice(0, 2000);
  const historyRaw = body.conversation_history;
  const visitorEmail = body.visitor_email ? String(body.visitor_email).trim() : null;

  if (!ficheSlug) {
    return NextResponse.json({ error: "fiche_slug_required" }, { status: 400 });
  }
  if (!isChloeActiveFor(ficheSlug)) {
    return NextResponse.json({ error: "chloe_not_active_for_this_slug" }, { status: 403 });
  }
  if (!userMessage) {
    return NextResponse.json({ error: "user_message_required" }, { status: 400 });
  }

  const fiche = findChloeFicheBySlug(ficheSlug)!;
  const role = findJobRoleBySlug(ficheSlug) ?? null;
  const history = sanitizeHistory(historyRaw);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        response:
          "Bonjour, moi c'est Chloe. Le service conversationnel est temporairement indisponible. Envoyez-nous un message via le formulaire de contact et Georges vous repondra sous 24h. SKS Talents",
        score: 0
      } satisfies ChatResponseBody,
      { status: 200 }
    );
  }

  const client = new Anthropic({ apiKey });
  const model = process.env.CHLOE_MODEL || process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

  const systemPrompt = buildChloeSystemPrompt({ role, fiche });

  const messages = [
    ...history,
    { role: "user" as const, content: userMessage }
  ];

  let assistantText = "";
  try {
    const completion = await client.messages.create({
      model,
      max_tokens: 700,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content }))
    });
    const first = completion.content?.[0];
    if (first && first.type === "text") {
      assistantText = first.text;
    }
  } catch (err) {
    console.error("chloe-chat anthropic error", err);
    return NextResponse.json(
      {
        response:
          "Bonjour, moi c'est Chloe. Je rencontre un souci technique. Reessayez dans un instant ou contactez Georges directement. SKS Talents",
        score: 0
      } satisfies ChatResponseBody,
      { status: 200 }
    );
  }

  assistantText = stripDashes(assistantText || "Une erreur est survenue. SKS Talents");

  const emailFromCurrentTurn = extractEmail(userMessage);
  const capturedEmail = visitorEmail || emailFromCurrentTurn || null;
  const score = computeQualificationScore({
    userMessage,
    historyLength: history.length + 1,
    hasEmail: Boolean(capturedEmail)
  });

  let action: ChatResponseBody["action"] | undefined;
  if (!capturedEmail && score >= 45 && history.length >= 2) {
    action = "capture_email";
  } else if (capturedEmail && score >= 60) {
    action = "suggest_rdv";
  }

  const fullTranscript = [
    ...history,
    { role: "user" as const, content: userMessage },
    { role: "assistant" as const, content: assistantText }
  ];

  await appendLog({
    at: new Date().toISOString(),
    ficheSlug,
    ficheTitle: fiche.targetTitle,
    bloc: fiche.bloc,
    userMessage,
    assistantText,
    score,
    action,
    capturedEmail
  });

  if (capturedEmail && score >= 70) {
    try {
      await persistLeadDurably("chloe_live_lead", {
        at: new Date().toISOString(),
        email: capturedEmail,
        ficheSlug,
        ficheTitle: fiche.targetTitle,
        score,
        transcript: fullTranscript
      });
    } catch (err) {
      console.error("chloe-chat persistLeadDurably failed", err);
    }

    try {
      await notifyGeorges({
        ficheTitle: fiche.targetTitle,
        ficheSlug,
        email: capturedEmail,
        score,
        transcript: fullTranscript,
        lastAssistant: assistantText
      });
    } catch (err) {
      console.error("chloe-chat notifyGeorges failed", err);
    }
  }

  const responseBody: ChatResponseBody = { response: assistantText, action, score };
  return NextResponse.json(responseBody);
}
