import CountryHubPage, { buildCountryHubMetadata } from "@/components/CountryHubPage";
import { countryHubs } from "@/data/countryHubs";

export const metadata = buildCountryHubMetadata(countryHubs.benin);

export default function BeninPage() {
  return <CountryHubPage hub={countryHubs.benin} />;
}
