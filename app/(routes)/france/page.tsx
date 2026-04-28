import CountryHubPage, { buildCountryHubMetadata } from "@/components/CountryHubPage";
import { countryHubs } from "@/data/countryHubs";

export const metadata = buildCountryHubMetadata(countryHubs.france);

export default function FrancePage() {
  return <CountryHubPage hub={countryHubs.france} />;
}
