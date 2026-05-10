import { redirect } from "next/navigation";
import SeoKeywordsClient from "./SeoKeywordsClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = { searchParams: Promise<{ token?: string; status?: string }> };

export const metadata = {
  title: "Validation mots-clés SEO - SKS TALENTS",
  robots: { index: false, follow: false }
};

type Proposal = {
  id: number;
  keyword: string;
  source_category: string;
  source_url: string;
  score: number;
  status: string;
  proposed_at: string;
};

async function fetchProposals(token: string, status: string): Promise<Proposal[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skstalents.fr";
  try {
    const r = await fetch(
      `${base}/api/seo/keywords?status=${encodeURIComponent(status)}&limit=200&token=${encodeURIComponent(token)}`,
      { cache: "no-store" }
    );
    if (!r.ok) return [];
    const j = (await r.json()) as { proposals?: Proposal[] };
    return j.proposals ?? [];
  } catch {
    return [];
  }
}

export default async function SeoKeywordsPage({ searchParams }: Props) {
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;
  const { token, status } = await searchParams;
  if (expected && token !== expected) redirect("/");

  const activeStatus = status ?? "pending";
  const proposals = await fetchProposals(token ?? "", activeStatus);

  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1100, margin: "0 auto", padding: "32px 24px", color: "#0f1415" }}>
      <header style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#41a0a4", margin: 0 }}>
          SEO · Validation hebdomadaire
        </p>
        <h1 style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 48, lineHeight: 1, margin: "8px 0 4px", color: "#0f3a3c" }}>
          120 mots-clés à valider.
        </h1>
        <p style={{ fontSize: 14, color: "#5e6e72", margin: 0 }}>
          Coche les mots à intégrer · Refuse ceux qui n'ont aucun sens · Les approuvés sont injectés
          dans la meta keywords globale + llms.txt + déclenchent un IndexNow ping.
        </p>
      </header>

      <nav style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { key: "pending", label: "À valider" },
          { key: "approved", label: "Approuvés" },
          { key: "rejected", label: "Refusés" }
        ].map((t) => (
          <a
            key={t.key}
            href={`/dashboard/seo-keywords?token=${encodeURIComponent(token ?? "")}&status=${t.key}`}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              border: activeStatus === t.key ? "1px solid #0f3a3c" : "1px solid #e5e7eb",
              background: activeStatus === t.key ? "#0f3a3c" : "#fff",
              color: activeStatus === t.key ? "#fff" : "#5e6e72"
            }}
          >
            {t.label}
          </a>
        ))}
      </nav>

      {proposals.length === 0 ? (
        <p style={{ fontSize: 13, color: "#5e6e72", padding: 24, background: "#f5f3ee", borderRadius: 12 }}>
          Aucune proposition pour ce statut.
          {activeStatus === "pending" &&
            " Le cron de génération tourne chaque lundi 5h UTC. Si la liste est vide alors qu'on est lundi+, vérifie que SUPABASE_URL est posé sur Vercel et que la table seo_keyword_proposals existe."}
        </p>
      ) : (
        <SeoKeywordsClient initial={proposals} token={token ?? ""} status={activeStatus} />
      )}

      <footer style={{ marginTop: 40, paddingTop: 16, borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#5e6e72" }}>
        <p style={{ margin: 0 }}>
          Sources : 12 fonds (France Biotech 2024) · 10 partenaires écosystème · 9 cabinets executive
          search Life Sciences (Korn Ferry, Russell Reynolds…) · 6 médias spécialisés.
        </p>
      </footer>
    </main>
  );
}
