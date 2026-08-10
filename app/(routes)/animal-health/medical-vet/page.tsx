import type { Metadata } from "next";
import MedicalVetContent from "./components/content";

export const metadata: Metadata = {
  title: "Veterinary Pharma & Biotech Recruitment",
  description:
    "Recrutement pharma veterinaire: R&D, Regulatory Affairs, Vaccine Manufacturing. Experts en sante animale innovante."
};

export default function MedicalVetPage() {
  return <MedicalVetContent />;
}
