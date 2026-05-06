"use client";

import { useState } from "react";
import type { BacklinkCategory, BacklinkTarget } from "@/data/backlinkTargets";

type EmailedTarget = BacklinkTarget & { email: { subject: string; body: string } };

const PRIORITY_LABELS: Record<1 | 2 | 3, { label: string; color: string }> = {
  3: { label: "Top ROI", color: "#1a7a3e" },
  2: { label: "Solide", color: "#0f3a3c" },
  1: { label: "Nice-to-have", color: "#94a3b8" }
};

const STATUS_LABELS: Record<BacklinkTarget["status"], { label: string; color: string }> = {
  pending: { label: "À contacter", color: "#a14a00" },
  sent: { label: "Envoyé", color: "#0f3a3c" },
  responded: { label: "Réponse reçue", color: "#1a7a3e" },
  won: { label: "✓ Backlink obtenu", color: "#1a7a3e" },
  lost: { label: "Refusé / silence", color: "#94a3b8" },
  skip: { label: "Skip", color: "#94a3b8" }
};

export default function BacklinksClient({
  targetsByCategory,
  categoryOrder,
  categoryLabels,
  emails
}: {
  targetsByCategory: Record<BacklinkCategory, BacklinkTarget[]>;
  categoryOrder: BacklinkCategory[];
  categoryLabels: Record<BacklinkCategory, string>;
  emails: EmailedTarget[];
}) {
  const [openTarget, setOpenTarget] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function findEmail(name: string) {
    return emails.find((e) => e.name === name)?.email;
  }

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div>
      {categoryOrder.map((cat) => {
        const list = targetsByCategory[cat];
        if (!list || list.length === 0) return null;
        return (
          <section key={cat} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#0f3a3c", margin: "0 0 12px 0" }}>
              {categoryLabels[cat]} · {list.length}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
              {list.map((t) => {
                const isOpen = openTarget === t.name;
                const prio = PRIORITY_LABELS[t.priority];
                const status = STATUS_LABELS[t.status];
                return (
                  <li key={t.name} style={{ borderTop: "1px solid #f1f3f5" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                          <a
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 15, fontWeight: 600, color: "#0f3a3c", textDecoration: "none" }}
                          >
                            {t.name}
                          </a>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "#fff", border: `1px solid ${prio.color}33`, color: prio.color }}>
                            {prio.label}
                          </span>
                          {t.estimatedDa && (
                            <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "#5e6e72" }}>
                              DA ~{t.estimatedDa}
                            </span>
                          )}
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "#fff", border: `1px solid ${status.color}33`, color: status.color, marginLeft: "auto" }}>
                            {status.label}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: "#5e6e72", margin: "6px 0 0 0", lineHeight: 1.5 }}>
                          {t.rationale}
                        </p>
                        {(t.contactPath || t.contactEmail) && (
                          <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0 0", fontFamily: "JetBrains Mono, monospace" }}>
                            {t.contactEmail ?? `${t.url}${t.contactPath}`}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenTarget(isOpen ? null : t.name)}
                        style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 999, border: "1px solid #0f3a3c", background: isOpen ? "#0f3a3c" : "#fff", color: isOpen ? "#fff" : "#0f3a3c", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                      >
                        {isOpen ? "Fermer" : "Voir l'email"}
                      </button>
                    </div>
                    {isOpen && findEmail(t.name) && (
                      <div style={{ padding: "0 18px 18px 18px", background: "#fafbfa" }}>
                        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#41a0a4" }}>
                              Sujet
                            </span>
                            <button
                              type="button"
                              onClick={() => copy(findEmail(t.name)!.subject, `${t.name}-subject`)}
                              style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600 }}
                            >
                              {copiedKey === `${t.name}-subject` ? "Copié ✓" : "Copier"}
                            </button>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 18px 0", padding: 10, background: "#f9fafa", borderRadius: 8 }}>
                            {findEmail(t.name)!.subject}
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#41a0a4" }}>
                              Corps de l'email
                            </span>
                            <button
                              type="button"
                              onClick={() => copy(findEmail(t.name)!.body, `${t.name}-body`)}
                              style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600 }}
                            >
                              {copiedKey === `${t.name}-body` ? "Copié ✓" : "Copier"}
                            </button>
                          </div>
                          <pre style={{ fontSize: 13, lineHeight: 1.6, margin: 0, padding: 14, background: "#f9fafa", borderRadius: 8, whiteSpace: "pre-wrap", fontFamily: "Inter, system-ui, sans-serif", color: "#0f1415" }}>
                            {findEmail(t.name)!.body}
                          </pre>
                          <button
                            type="button"
                            onClick={() => {
                              const e = findEmail(t.name)!;
                              const mailto = `mailto:${t.contactEmail ?? ""}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(e.body)}`;
                              window.location.href = mailto;
                            }}
                            style={{ marginTop: 14, padding: "10px 18px", borderRadius: 999, border: "none", background: "#0f3a3c", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                          >
                            ✉ Ouvrir dans mon client mail
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
