import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function AnimalHealthContent() {
  const config = getVerticalLanding("animal-health");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
