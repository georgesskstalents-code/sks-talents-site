import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function BiotechContent() {
  const config = getVerticalLanding("biotech");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
