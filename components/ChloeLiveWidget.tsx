"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

// Types minimaux Web Speech API (evite d'importer les types DOM speech de TS).
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((e: unknown) => void) | null;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> & { length: number } & { [i: number]: ArrayLike<{ transcript: string }> & { isFinal?: boolean } } }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

type ApiResponse = {
  response: string;
  action?: "capture_email" | "suggest_rdv";
  score: number;
};

type Props = {
  ficheSlug: string;
  ficheTitle?: string;
  onClose: () => void;
};

const COLORS = {
  teal: "#4A9B9B",
  cream: "#EFEDE4",
  ink: "#163334",
  paper: "#ffffff",
  softInk: "rgba(22, 51, 52, 0.68)"
};

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

export default function ChloeLiveWidget({ ficheSlug, ficheTitle, onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
  const [rgpdOk, setRgpdOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<ApiResponse["action"] | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Detection Web Speech API (Chrome/Edge/Safari desktop, Safari iOS 14.5+).
  useEffect(() => {
    setVoiceSupported(Boolean(getSpeechRecognitionCtor()));
  }, []);

  // Body scroll lock : quand le widget est ouvert, on empeche la page de scroller
  // derriere lui. Restaure l'overflow d'origine au demontage.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  function toggleVoiceInput() {
    if (typeof window === "undefined") return;
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = getSpeechRecognitionCtor();
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const results = event.results;
      let transcript = "";
      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const alt = r[0];
        if (alt && typeof alt.transcript === "string") {
          transcript += `${alt.transcript} `;
        }
      }
      transcript = transcript.trim();
      if (transcript) {
        setInput((cur) => (cur ? `${cur} ${transcript}` : transcript));
      }
      const lastResult = results[results.length - 1] as (ArrayLike<{ transcript: string }> & { isFinal?: boolean }) | undefined;
      if (lastResult && lastResult.isFinal) {
        recognition.stop();
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setListening(false);
    }
  }

  async function send(userText: string) {
    const clean = userText.trim();
    if (!clean || loading) return;

    // Detection email cote client (secondaire, backend fait pareil).
    const emailInMsg = clean.match(EMAIL_RE)?.[0] || null;
    if (emailInMsg && !visitorEmail) setVisitorEmail(emailInMsg);

    const nextHistory: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chloe-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fiche_slug: ficheSlug,
          conversation_history: messages,
          user_message: clean,
          visitor_email: visitorEmail || emailInMsg || null
        })
      });
      const data = (await res.json()) as ApiResponse;
      setMessages((cur) => [...cur, { role: "assistant", content: data.response || "" }]);
      setLastAction(data.action ?? null);
    } catch (err) {
      console.error("Chloe chat error", err);
      setMessages((cur) => [
        ...cur,
        {
          role: "assistant",
          content:
            "Desolee, un souci technique cote reseau. Reessayez dans un instant. SKS Talents"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startConversation() {
    setRgpdOk(true);
    // Envoie un premier tour pour declencher l'ouverture de Chloe.
    void send("Bonjour, je consulte la fiche " + (ficheTitle || ficheSlug) + ". Pouvez-vous m'aider ?");
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Chloe Live, assistante SKS Talents"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        width: "min(380px, calc(100vw - 32px))",
        maxHeight: "min(600px, calc(100vh - 32px))",
        display: "flex",
        flexDirection: "column",
        background: COLORS.paper,
        border: `1px solid ${COLORS.teal}`,
        borderRadius: 16,
        boxShadow: "0 20px 60px rgba(25, 72, 74, 0.22)",
        zIndex: 1000,
        overflow: "hidden",
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif"
      }}
    >
      <header
        style={{
          background: COLORS.teal,
          color: "#fff",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: COLORS.cream,
            color: COLORS.ink,
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display), Playfair Display, serif",
            fontWeight: 600
          }}
        >
          C
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display), Playfair Display, serif",
              fontSize: 16,
              lineHeight: 1.1
            }}
          >
            Chloe Live
          </div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Experte SKS Talents</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la conversation"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.5)",
            color: "#fff",
            width: 28,
            height: 28,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1
          }}
        >
          ×
        </button>
      </header>

      {!rgpdOk ? (
        <div style={{ padding: 16, background: COLORS.cream, color: COLORS.ink }}>
          <p
            style={{
              fontFamily: "var(--font-display), Playfair Display, serif",
              fontSize: 18,
              margin: "0 0 8px"
            }}
          >
            Bonjour, moi c'est Chloe.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
            Cette conversation est enregistree pour ameliorer nos services. Voir nos{" "}
            <Link
              href="/legal/mentions-legales"
              style={{ color: COLORS.teal, textDecoration: "underline" }}
            >
              mentions legales
            </Link>
            . Aucun email n'est envoye a un tiers sans votre accord explicite.
          </p>
          <button
            type="button"
            onClick={startConversation}
            style={{
              background: COLORS.ink,
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              width: "100%"
            }}
          >
            Demarrer la conversation
          </button>
          <p
            style={{
              fontSize: 11,
              lineHeight: 1.4,
              margin: "10px 0 0",
              color: COLORS.softInk
            }}
          >
            Signature systematique SKS Talents. Chloe est une assistante IA entrainee sur les
            donnees du cabinet.
          </p>
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              background: COLORS.cream,
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "82%",
                  background: m.role === "user" ? COLORS.ink : COLORS.paper,
                  color: m.role === "user" ? "#fff" : COLORS.ink,
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontSize: 14,
                  lineHeight: 1.5,
                  border: m.role === "assistant" ? `1px solid rgba(74,155,155,0.25)` : "none",
                  whiteSpace: "pre-wrap"
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                aria-live="polite"
                style={{
                  alignSelf: "flex-start",
                  color: COLORS.softInk,
                  fontSize: 13,
                  fontStyle: "italic"
                }}
              >
                Chloe redige une reponse...
              </div>
            )}
            {lastAction === "suggest_rdv" && (
              <div
                style={{
                  alignSelf: "stretch",
                  background: COLORS.teal,
                  color: "#fff",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  lineHeight: 1.5
                }}
              >
                Prochaine etape suggeree : Georges vous confirmera ses disponibilites pour un
                echange visio de 30 minutes sous 24h par email. Aucune prise de RDV automatique.
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            style={{
              borderTop: `1px solid rgba(74,155,155,0.25)`,
              padding: 10,
              background: COLORS.paper,
              display: "flex",
              gap: 8
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                listening
                  ? "A l'ecoute..."
                  : lastAction === "capture_email"
                    ? "Votre email pour recevoir la fiche + barometre..."
                    : "Votre question a Chloe..."
              }
              disabled={loading}
              aria-label="Message a Chloe"
              style={{
                flex: 1,
                background: COLORS.cream,
                border: `1px solid rgba(22,51,52,0.15)`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 14,
                color: COLORS.ink,
                outline: "none",
                fontFamily: "inherit"
              }}
            />
            {voiceSupported ? (
              <button
                type="button"
                onClick={toggleVoiceInput}
                disabled={loading}
                aria-pressed={listening}
                aria-label={listening ? "Arreter la dictee vocale" : "Activer la dictee vocale"}
                title={listening ? "Arreter la dictee vocale" : "Dictee vocale (francais)"}
                style={{
                  background: listening ? "#dc2626" : COLORS.paper,
                  color: listening ? "#fff" : COLORS.ink,
                  border: `1px solid ${listening ? "#dc2626" : "rgba(22,51,52,0.15)"}`,
                  padding: "0 12px",
                  borderRadius: 10,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: 16,
                  opacity: loading ? 0.5 : 1,
                  minWidth: 42
                }}
              >
                {listening ? "Stop" : "Voix"}
              </button>
            ) : null}
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: COLORS.ink,
                color: "#fff",
                border: "none",
                padding: "0 14px",
                borderRadius: 10,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: 14,
                opacity: loading || !input.trim() ? 0.5 : 1
              }}
            >
              Envoyer
            </button>
          </form>
        </>
      )}
    </div>
  );
}
