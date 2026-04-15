import type { Metadata } from "next";
import DiagnosticContent from "./components/content";

export const metadata: Metadata = {
  title: "Diagnostic & AI Healthcare Recruitment | SKS TALENTS",
  description:
    "Recrutement IVD, NGS, AI Diagnostics, Genomics. Experts en data science healthcare et fonctions direction, operations, sales, production et ingenierie pour entreprises Seed, Serie A, Serie B et croissance rapide."
};

export default function DiagnosticPage() {
  return <DiagnosticContent />;
}
