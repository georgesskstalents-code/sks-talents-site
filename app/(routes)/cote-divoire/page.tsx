import CountryHubPage, { buildCountryHubMetadata } from "@/components/CountryHubPage";
import { countryHubs } from "@/data/countryHubs";

export const metadata = buildCountryHubMetadata(countryHubs["cote-divoire"]);

export default function CoteDivoirePage() {
  return <CountryHubPage hub={countryHubs["cote-divoire"]} />;
}
