import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function MedicalVetContent() {
  const config = getVerticalLanding("medical-vet");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
