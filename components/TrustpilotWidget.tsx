import TrustpilotLiveWidget from "@/components/TrustpilotLiveWidget";

export default function TrustpilotWidget() {
  const widgetId = process.env.TRUSTPILOT_WIDGET_ID ?? "widget-id";
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID;
  const templateId = process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID;
  const reviewUrl = "https://fr.trustpilot.com/review/skstalents.fr";

  if (businessUnitId && templateId) {
    return (
      <TrustpilotLiveWidget
        businessUnitId={businessUnitId}
        templateId={templateId}
        reviewUrl={reviewUrl}
      />
    );
  }

  return (
    <div className="card-surface p-6 lg:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
        Trustpilot
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-4xl text-brand-ink sm:text-5xl">4,5/5</h3>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-brand-stone">
            sur 13 avis publics
          </p>
        </div>
        <img
          src="/images/partners/trustpilot.svg"
          alt="Trustpilot"
          className="h-8 w-auto object-contain sm:mt-2"
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-brand-stone">
        La preuve sociale existe déjà sur Trustpilot. Le widget peut être connecté avec l’identifiant{" "}
        <span className="font-semibold">{widgetId}</span>, mais la page publique suffit déjà à
        rassurer avant conversion sur la qualité de relation et le sérieux des échanges.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          "4,5/5 sur Trustpilot",
          "13 avis publics consultables",
          "Signal externe utile avant prise de rendez-vous"
        ].map((item) => (
          <div key={item} className="rounded-[20px] border border-brand-teal/10 bg-brand-mint/45 px-4 py-4 text-sm leading-7 text-brand-stone">
            {item}
          </div>
        ))}
      </div>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white"
      >
        Consulter les avis
      </a>
    </div>
  );
}
