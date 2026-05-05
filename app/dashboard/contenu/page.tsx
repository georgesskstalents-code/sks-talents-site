import { redirect } from "next/navigation";
import { buildContentInventory } from "@/lib/contentInventory";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export const metadata = {
  title: "Pilotage contenu — SKS TALENTS",
  robots: { index: false, follow: false }
};

function fmtDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return iso;
  }
}

export default async function ContentDashboardPage({ searchParams }: Props) {
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;
  const { token } = await searchParams;
  if (expected && token !== expected) {
    redirect("/");
  }

  const inv = await buildContentInventory();
  const tokenQS = token ? `?token=${token}` : "";

  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1180, margin: "0 auto", padding: "32px 24px", color: "#0f1415" }}>
      <header style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#41a0a4", margin: 0 }}>
          Pilotage contenu
        </p>
        <h1 style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 56, lineHeight: 1, margin: "8px 0 4px", color: "#0f3a3c" }}>
          Ton inventaire éditorial.
        </h1>
        <p style={{ fontSize: 14, color: "#5e6e72", margin: 0 }}>
          Généré le {fmtDate(inv.generatedAt)} · {inv.totalEntries} fiches au total ({inv.totalNotion} via Notion, {inv.totalStatic} via code)
        </p>
      </header>

      {/* KPI cards */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#5e6e72", margin: "0 0 12px" }}>
          Inventaire par type
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {inv.byType
            .filter((k) => k.total > 0)
            .map((k) => (
              <article
                key={k.type}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 16,
                  background: "#fff"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5e6e72", margin: 0 }}>
                    {k.label}
                  </p>
                  {k.gaps > 0 && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a14a00", background: "#fff3e0", padding: "2px 8px", borderRadius: 999 }}>
                      {k.gaps} gap{k.gaps > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 32, fontWeight: 600, margin: "8px 0 4px", color: "#0f3a3c", fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>
                  {k.total}
                </p>
                <p style={{ fontSize: 12, color: "#5e6e72", margin: "0 0 8px" }}>
                  {k.fromNotion} Notion · {k.fromStatic} statique
                </p>
                <p style={{ fontSize: 12, color: k.publishedLast7d > 0 ? "#1a7a3e" : "#94a3b8", margin: 0 }}>
                  +{k.publishedLast7d} en 7j · +{k.publishedLast30d} en 30j
                </p>
                <a
                  href={`${k.publicPath}${tokenQS}`}
                  style={{ display: "inline-block", marginTop: 10, fontSize: 12, color: "#41a0a4", textDecoration: "none", fontWeight: 600 }}
                >
                  Voir sur le site →
                </a>
              </article>
            ))}
        </div>
      </section>

      {/* Recently published */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#5e6e72", margin: "0 0 12px" }}>
          Publié récemment ({inv.recentlyPublished.length})
        </h2>
        {inv.recentlyPublished.length === 0 ? (
          <p style={{ fontSize: 13, color: "#5e6e72", padding: 16, background: "#f5f3ee", borderRadius: 12 }}>
            Aucune publication datée trouvée. Pense à remplir <code>Publish date</code> sur tes entrées Notion pour voir le flux ici.
          </p>
        ) : (
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: "#f9fafb" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5e6e72" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5e6e72" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5e6e72" }}>Titre</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5e6e72" }}>Source</th>
                </tr>
              </thead>
              <tbody>
                {inv.recentlyPublished.map((r) => (
                  <tr key={`${r.type}-${r.slug}`} style={{ borderTop: "1px solid #f1f3f5" }}>
                    <td style={{ padding: "10px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#5e6e72" }}>{fmtDate(r.publishDate)}</td>
                    <td style={{ padding: "10px 14px", color: "#5e6e72" }}>{r.type}</td>
                    <td style={{ padding: "10px 14px", fontWeight: 500 }}>{r.title}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: r.source === "notion" ? "#e6f4f1" : "#f3f4f6", color: r.source === "notion" ? "#0f3a3c" : "#5e6e72" }}>
                        {r.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Content gaps */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#5e6e72", margin: "0 0 12px" }}>
          Champs manquants ({inv.contentGaps.length} entrées Notion)
        </h2>
        {inv.contentGaps.length === 0 ? (
          <p style={{ fontSize: 13, color: "#1a7a3e", padding: 16, background: "#e6f4f1", borderRadius: 12 }}>
            ✓ Toutes tes entrées Notion publiées ont les champs critiques remplis.
          </p>
        ) : (
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: "#fff3e0" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a14a00" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a14a00" }}>Titre</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a14a00" }}>Champs à compléter</th>
                </tr>
              </thead>
              <tbody>
                {inv.contentGaps.map((g) => (
                  <tr key={`${g.type}-${g.slug}`} style={{ borderTop: "1px solid #f1f3f5" }}>
                    <td style={{ padding: "10px 14px", color: "#5e6e72" }}>{g.type}</td>
                    <td style={{ padding: "10px 14px", fontWeight: 500 }}>{g.title}</td>
                    <td style={{ padding: "10px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#a14a00" }}>
                      {g.missing.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer style={{ marginTop: 40, paddingTop: 16, borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#5e6e72" }}>
        <p style={{ margin: 0 }}>
          Pour publier : ouvre Notion → DB <strong>Website Content SKS Talents</strong> → "+ New" → remplis Title, Slug, Content Type, Vertical, Excerpt → Status = Published.
        </p>
      </footer>
    </main>
  );
}
