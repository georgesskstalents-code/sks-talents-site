import type { Metadata } from "next";
import LifeSciencesContent from "./components/content";

export const metadata: Metadata = {
  title: "Life Sciences Recruitment | SKS TALENTS",
  description:
    "Recrutement specialise en Biotech, Diagnostic, Cosmétique scientifique et Data. 100+ placements sur des environnements ARN, CRISPR, NGS, AI Healthcare et entreprises Seed, Serie A / Serie B."
};

export default function LifeSciencesHubPage() {
  return <LifeSciencesContent />;
}
