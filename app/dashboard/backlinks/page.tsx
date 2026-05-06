import { redirect } from "next/navigation";
import {
  backlinkTargets,
  topTierBacklinkTargets,
  totalBacklinkTargets,
  type BacklinkCategory,
  type BacklinkTarget
} from "@/data/backlinkTargets";
import BacklinksClient from "./BacklinksClient";
import { generateBacklinkEmail } from "@/lib/backlinkTemplates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Backlinks outreach — SKS TALENTS",
  robots: { index: false, follow: false }
};

type Props = { searchParams: Promise<{ token?: string }> };

const CATEGORY_ORDER: BacklinkCategory[] = [
  "ecosystem",
  "association",
  "academic",
  "media",
  "fund",
  "directory",
  "competitor"
];

const CATEGORY_LABELS: Record<BacklinkCategory, string> = {
  ecosystem: "Clusters santé",
  association: "Associations vétérinaires / petfood",
  academic: "Écoles & universités",
  media: "Médias spécialisés",
  fund: "Fonds santé",
  directory: "Annuaires sectoriels",
  competitor: "Cross-link cabinets"
};

export default async function BacklinksPage({ searchParams }: Props) {
  const expected = process.env.DASHBOARD_PRIVATE_TOKEN;
  const { token } = await searchParams;
  if (expected && token !== expected) redirect("/");

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = backlinkTargets.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<BacklinkCategory, BacklinkTarget[]>
  );

  const targetsWithEmails = backlinkTargets.map((t) => ({
    ...t,
    email: generateBacklinkEmail(t)
  }));

  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1100, margin: "0 auto", padding: "32px 24px", color: "#0f1415" }}>
      <header style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#41a0a4", margin: 0 }}>
          SEO · Backlinks outreach
        </p>
        <h1 style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 48, lineHeight: 1, margin: "8px 0 4px", color: "#0f3a3c" }}>
          {totalBacklinkTargets} cibles, {topTierBacklinkTargets} prioritaires.
        </h1>
        <p style={{ fontSize: 14, color: "#5e6e72", margin: 0 }}>
          Liste curée pour pousser l'autorité de skstalents.fr. Chaque cible a un template d'email
          prêt à copier-coller. Workflow : (1) cliquer "Voir l'email" → (2) "Copier" → (3) coller dans
          votre client mail → (4) personnaliser le destinataire → (5) envoyer.
        </p>
      </header>

      <BacklinksClient targetsByCategory={grouped} categoryOrder={CATEGORY_ORDER} categoryLabels={CATEGORY_LABELS} emails={targetsWithEmails} />

      <footer style={{ marginTop: 40, paddingTop: 16, borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#5e6e72" }}>
        <p style={{ margin: 0 }}>
          Pour ajouter / retirer / changer un statut : éditer <code>data/backlinkTargets.ts</code>.
          Si le volume justifie un tracker dynamique (Supabase), on l'ajoute en V2.
        </p>
      </footer>
    </main>
  );
}
