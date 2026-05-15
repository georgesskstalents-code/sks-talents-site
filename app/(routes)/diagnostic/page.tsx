import DiagnosticStructurationRH from "@/components/DiagnosticStructurationRH";

export const metadata = {
  title: "Diagnostic Structuration RH | SKS TALENTS",
  description:
    "5 signaux pour mesurer si votre organisation est prête à scaler. Score immédiat, lecture par zone (Chaos / Fragile / Structuré), diagnostic PDF complet sur demande.",
  alternates: {
    canonical: "https://www.skstalents.fr/diagnostic"
  }
};

export default function DiagnosticPage() {
  return <DiagnosticStructurationRH />;
}
