import SectorLandingPage from "@/components/SectorLandingPage";
import { getSectorLandingPage } from "@/data/sectorLandingPages";

export default function LifeSciencesContent() {
  return <SectorLandingPage config={getSectorLandingPage("life")} />;
}
