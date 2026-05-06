"use client";

import { useState, useTransition } from "react";

type Proposal = {
  id: number;
  keyword: string;
  source_category: string;
  source_url: string;
  score: number;
  status: string;
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  fund: { label: "Fonds", color: "#1a7a3e" },
  ecosystem: { label: "Écosystème", color: "#0f3a3c" },
  competitor: { label: "Concurrent", color: "#a14a00" },
  media: { label: "Média", color: "#5e6e72" }
};

export default function SeoKeywordsClient({
  initial,
  token,
  status
}: {
  initial: Proposal[];
  token: string;
  status: string;
}) {
  const [proposals, setProposals] = useState<Proposal[]>(initial);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(proposals.map((p) => p.id)));
  }
  function selectNone() {
    setSelected(new Set());
  }

  async function bulkUpdate(targetStatus: "approved" | "rejected") {
    if (selected.size === 0) {
      setMessage("Sélectionne au moins un mot.");
      return;
    }
    setMessage("");
    startTransition(async () => {
      const r = await fetch(`/api/seo/keywords?token=${encodeURIComponent(token)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected), status: targetStatus })
      });
      const json = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !json.ok) {
        setMessage(json.error ?? "Erreur lors de la mise à jour.");
        return;
      }
      // Optimistic update: remove the affected ones from the list (status changed)
      setProposals((prev) => prev.filter((p) => !selected.has(p.id)));
      setSelected(new Set());
      setMessage(`${json && (json as { updated?: number }).updated ? (json as { updated?: number }).updated : selected.size} mot(s) ${targetStatus === "approved" ? "approuvé(s) ✓" : "refusé(s) ✗"}.`);
    });
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16, padding: "12px 16px", background: "#f9fafa", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{selected.size} sélectionné(s) · {proposals.length} en {status}</span>
        <button onClick={selectAll} type="button" style={{ marginLeft: "auto", padding: "6px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Tout sélectionner
        </button>
        <button onClick={selectNone} type="button" style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Aucun
        </button>
        {status === "pending" && (
          <>
            <button
              type="button"
              onClick={() => bulkUpdate("rejected")}
              disabled={isPending || selected.size === 0}
              style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, color: "#a14a00", cursor: "pointer", opacity: isPending || selected.size === 0 ? 0.5 : 1 }}
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => bulkUpdate("approved")}
              disabled={isPending || selected.size === 0}
              style={{ padding: "8px 16px", borderRadius: 999, background: "#0f3a3c", color: "#fff", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", opacity: isPending || selected.size === 0 ? 0.5 : 1 }}
            >
              {isPending ? "Envoi…" : "Approuver"}
            </button>
          </>
        )}
      </div>

      {message && (
        <p style={{ fontSize: 13, padding: "10px 14px", background: "#e6f4f1", color: "#0f3a3c", borderRadius: 10, marginBottom: 12 }}>
          {message}
        </p>
      )}

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
        {proposals.map((p) => {
          const isChecked = selected.has(p.id);
          const cat = CATEGORY_LABELS[p.source_category] ?? { label: p.source_category, color: "#5e6e72" };
          return (
            <li
              key={p.id}
              onClick={() => status === "pending" && toggle(p.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                borderTop: "1px solid #f1f3f5",
                background: isChecked ? "#e8f0eb" : "#fff",
                cursor: status === "pending" ? "pointer" : "default"
              }}
            >
              {status === "pending" && (
                <input type="checkbox" checked={isChecked} onChange={() => toggle(p.id)} style={{ flexShrink: 0 }} />
              )}
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{p.keyword}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: "#fff", border: `1px solid ${cat.color}33`, color: cat.color }}>
                {cat.label}
              </span>
              <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "#5e6e72", minWidth: 48, textAlign: "right" }}>
                {(p.score * 100).toFixed(0)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
