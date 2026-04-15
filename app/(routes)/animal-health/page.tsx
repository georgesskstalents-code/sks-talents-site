import type { Metadata } from "next";
import AnimalHealthContent from "./components/content";

export const metadata: Metadata = {
  title: "Animal Health Recruitment | SKS TALENTS",
  description:
    "Recrutement specialise en sante animale: Pharma veterinaire, Cliniques, Petfood premium. 100+ placements reussis."
};

export default function AnimalHealthHubPage() {
  return <AnimalHealthContent />;
}
