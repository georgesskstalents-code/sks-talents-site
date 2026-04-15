import type { Metadata } from "next";
import BiotechContent from "./components/content";

export const metadata: Metadata = {
  title: "Biotech & ARN Therapies Recruitment | SKS TALENTS",
  description:
    "Experts en recrutement biotech: ARN therapies, CRISPR, Cell Therapy, Immunotherapy. Recruter vos profils direction, production, operations, sales et ingenierie en contexte Seed, Serie A, Serie B et scale-up."
};

export default function BiotechPage() {
  return <BiotechContent />;
}
