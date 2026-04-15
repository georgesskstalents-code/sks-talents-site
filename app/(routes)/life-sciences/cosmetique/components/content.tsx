import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function CosmetiqueContent() {
  const config = getVerticalLanding("cosmetique");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
