import type { Metadata } from "next";
import PetfoodContent from "./components/content";

export const metadata: Metadata = {
  title: "Petfood & Nutrition Recruitment | SKS TALENTS",
  description:
    "Recrutement petfood premium: R&D, Product Dev, Nutritionists. Recruter experts en nutrition animale innovante."
};

export default function PetfoodPage() {
  return <PetfoodContent />;
}
