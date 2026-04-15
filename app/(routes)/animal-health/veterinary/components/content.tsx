import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function VeterinaryContent() {
  const config = getVerticalLanding("veterinary");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
