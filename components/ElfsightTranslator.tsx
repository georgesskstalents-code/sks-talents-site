import Script from "next/script";

const ELFSIGHT_APP_CLASS = "elfsight-app-92e491c8-4111-4e5f-ac28-76229696f2d4";

export default function ElfsightTranslator() {
  return (
    <div
      className="sks-elfsight-translator shrink-0"
      aria-label="Sélecteur de langue du site"
    >
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className={`${ELFSIGHT_APP_CLASS} sks-elfsight-translator__mount`} />
    </div>
  );
}
