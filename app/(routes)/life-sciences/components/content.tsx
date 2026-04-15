import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function LifeSciencesContent() {
  const config = getVerticalLanding("life-sciences");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
