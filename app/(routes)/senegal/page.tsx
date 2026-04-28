import CountryHubPage, { buildCountryHubMetadata } from "@/components/CountryHubPage";
import { countryHubs } from "@/data/countryHubs";

export const metadata = buildCountryHubMetadata(countryHubs.senegal);

export default function SenegalPage() {
  return <CountryHubPage hub={countryHubs.senegal} />;
}
