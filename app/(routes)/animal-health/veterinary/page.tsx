import type { Metadata } from "next";
import VeterinaryContent from "./components/content";

export const metadata: Metadata = {
  title: "Veterinary Clinic & Services Recruitment | SKS TALENTS",
  description:
    "Recruter veterinaires, assistants, managers de cliniques. Solutions pour la penurie de talents veterinaires."
};

export default function VeterinaryPage() {
  return <VeterinaryContent />;
}
