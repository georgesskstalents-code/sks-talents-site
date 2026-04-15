import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function DiagnosticContent() {
  const config = getVerticalLanding("diagnostic");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
