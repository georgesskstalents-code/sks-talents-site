import SectorLandingPage from "@/components/SectorLandingPage";
import { getSectorLandingPage } from "@/data/sectorLandingPages";

export default function AnimalHealthContent() {
  return <SectorLandingPage config={getSectorLandingPage("animal")} />;
}
