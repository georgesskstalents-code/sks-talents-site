import type { Metadata } from "next";
import CosmetiqueContent from "./components/content";

export const metadata: Metadata = {
  title: "Recrutement Cosmétique scientifique & Beauty Tech | SKS TALENTS",
  description:
    "Recrutement cosmetique, dermocosmetique, beauty tech et ingredients actifs. Profils R&D, regulatory, production, operations, sales, ingenierie, export et marketing pour des entreprises Seed, Serie A, Serie B et scale-up."
};

export default function CosmetiquePage() {
  return <CosmetiqueContent />;
}
