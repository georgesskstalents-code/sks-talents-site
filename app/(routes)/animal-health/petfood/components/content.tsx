import VerticalLandingPage from "@/components/VerticalLandingPage";
import { getVerticalLanding } from "@/data/verticalLandings";

export default function PetfoodContent() {
  const config = getVerticalLanding("petfood");

  if (!config) {
    return null;
  }

  return <VerticalLandingPage config={config} />;
}
