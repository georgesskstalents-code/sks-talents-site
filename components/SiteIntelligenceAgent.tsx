"use client";

import { Loader2, MessageCircle, SendHorizonal, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ChatRole = "user" | "assistant";
type ChatLanguage = "fr" | "en";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function detectLanguage(): ChatLanguage {
  if (typeof window === "undefined") {
    return "fr";
  }

  return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function createWelcomeMessage(language: ChatLanguage): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      language === "fr"
        ? "Bienvenue sur SKS TALENTS. Je suis l’assistant d’accueil du site. Vous pouvez me parler en français ou en anglais. Je vous aide à trouver rapidement le bon service, la bonne page métier, une ressource marché ou le bon point de contact."
        : "Welcome to SKS TALENTS. I’m the website welcome assistant. You can speak with me in English or French. I help you quickly find the right service, the right role page, a market resource, or the right contact point."
  };
}

function getSessionId() {
  const key = "sks-chat-session-id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.sessionStorage.setItem(key, created);
  return created;
}

const copy = {
  fr: {
    floatingLabel: "Chat SKS",
    online: "En ligne",
    title: "Assistant SKS Talents",
    subtitle: "Life Sciences, recrutement, RH, métiers",
    placeholder: "Écrivez votre message...",
    send: "Envoyer",
    thinking: "Réponse en cours...",
    helper: "Réponse rapide, claire et orientée business.",
    clear: "Réinitialiser",
    openPrompt: "Besoin d’aide ?"
  },
  en: {
    floatingLabel: "SKS Chat",
    online: "Online",
    title: "SKS Talents Assistant",
    subtitle: "Life sciences, hiring, HR, careers",
    placeholder: "Type your message...",
    send: "Send",
    thinking: "Thinking...",
    helper: "Fast, clear, business-oriented answers.",
    clear: "Reset",
    openPrompt: "Need help?"
  }
} as const;

export default function SiteIntelligenceAgent() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [language, setLanguage] = useState<ChatLanguage>("fr");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const currentPath = useMemo(() => pathname ?? "/", [pathname]);
  const ui = copy[language];

  useEffect(() => {
    setMounted(true);
    const nextLanguage = detectLanguage();
    setLanguage(nextLanguage);
    setMessages([createWelcomeMessage(nextLanguage)]);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  async function submitMessage(messageText: string) {
    const trimmed = messageText.trim();
    if (!trimmed || loading) {
      return;
    }

    const nextUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed
    };

    const nextAssistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: ""
    };

    const nextMessages = [...messages, nextUserMessage, nextAssistantMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language,
          path: currentPath,
          title: typeof document !== "undefined" ? document.title : "",
          sessionId: getSessionId(),
          messages: nextMessages
            .filter((item) => item.content.trim().length > 0)
            .map((item) => ({
              role: item.role,
              content: item.content
            }))
        })
      });

      if (!response.ok || !response.body) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(
          payload?.message ??
            (language === "fr"
              ? "Le chat n’a pas pu répondre pour le moment."
              : "The chat could not answer right now.")
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf("\n\n");

        while (boundary !== -1) {
          const rawEvent = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          boundary = buffer.indexOf("\n\n");

          const payload = rawEvent
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.replace(/^data:\s?/, ""))
            .join("\n")
            .trim();

          if (!payload) {
            continue;
          }

          const event = JSON.parse(payload) as
            | { type: "delta"; delta: string }
            | { type: "done" }
            | { type: "error"; message: string };

          if (event.type === "delta") {
            setMessages((current) =>
              current.map((item) =>
                item.id === nextAssistantMessage.id
                  ? { ...item, content: `${item.content}${event.delta}` }
                  : item
              )
            );
          }

          if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (requestError) {
      const fallback =
        requestError instanceof Error
          ? requestError.message
          : language === "fr"
            ? "Le chat n’a pas pu répondre pour le moment."
            : "The chat could not answer right now.";

      setMessages((current) =>
        current.map((item) =>
          item.id === nextAssistantMessage.id
            ? {
                ...item,
                content:
                  language === "fr"
                    ? `${fallback} Vous pouvez aussi consulter /services, /job-roles, /resources ou réserver un échange.`
                    : `${fallback} You can also check /services, /job-roles, /resources or book a call.`
              }
            : item
        )
      );
      setError(fallback);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[2147483000]">
      {open ? (
        <div className="pointer-events-auto flex h-[min(78vh,720px)] w-[min(94vw,390px)] flex-col overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
          <div className="bg-gradient-to-r from-brand-ink via-brand-teal to-cyan-600 px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  <Sparkles size={14} />
                  {ui.online}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{ui.title}</h3>
                <p className="mt-1 text-sm text-white/80">{ui.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-[22px] px-4 py-3 text-sm leading-7 shadow-sm ${
                    message.role === "user"
                      ? "bg-brand-teal text-white"
                      : "border border-brand-line bg-white text-brand-stone"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-[22px] border border-brand-line bg-white px-4 py-3 text-sm text-brand-stone">
                  <Loader2 size={14} className="animate-spin" />
                  {ui.thinking}
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-brand-line bg-white px-4 py-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs text-brand-stone">{ui.helper}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("fr");
                    setMessages([createWelcomeMessage("fr")]);
                    setInput("");
                    setError(null);
                  }}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] ${
                    language === "fr" ? "bg-brand-mint text-brand-teal" : "text-brand-stone"
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("en");
                    setMessages([createWelcomeMessage("en")]);
                    setInput("");
                    setError(null);
                  }}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] ${
                    language === "en" ? "bg-brand-mint text-brand-teal" : "text-brand-stone"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextLanguage = detectLanguage();
                    setLanguage(nextLanguage);
                    setMessages([createWelcomeMessage(nextLanguage)]);
                    setInput("");
                    setError(null);
                  }}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal"
                >
                  {ui.clear}
                </button>
              </div>
            </div>
            <form
              className="flex items-end gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void submitMessage(input);
              }}
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={2}
                placeholder={ui.placeholder}
                className="min-h-[56px] flex-1 resize-none rounded-[18px] border border-brand-line px-4 py-3 text-sm outline-none transition focus:border-brand-teal"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length < 2}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={ui.send}
              >
                <SendHorizonal size={18} />
              </button>
            </form>
            {error ? <p className="mt-2 text-xs text-brand-stone">{error}</p> : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-brand-ink px-5 py-4 text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition hover:translate-y-[-1px] hover:opacity-95"
          aria-label={ui.floatingLabel}
        >
          <MessageCircle size={20} />
          <div className="text-left">
            <p className="text-sm font-semibold">{ui.floatingLabel}</p>
            <p className="text-xs text-white/75">{ui.openPrompt}</p>
          </div>
        </button>
      )}
    </div>
  );
}
