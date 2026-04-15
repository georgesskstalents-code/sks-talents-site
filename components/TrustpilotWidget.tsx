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
    <div className="card-surface p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
        Trustpilot
      </p>
      <h3 className="mt-4 font-display text-4xl text-brand-ink">4,5/5 sur 13 avis publics.</h3>
      <p className="mt-4 text-base leading-8 text-brand-stone">
        La preuve sociale existe déjà sur Trustpilot. Le widget peut être connecté avec l’identifiant{" "}
        <span className="font-semibold">{widgetId}</span>, mais la page publique suffit déjà à
        rassurer avant conversion sur la qualité de relation et le sérieux des échanges.
      </p>
      <div className="mt-6 rounded-3xl border border-brand-teal/10 bg-brand-mint/45 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
          Signaux visibles
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-stone">
          <li>4,5/5 sur Trustpilot</li>
          <li>13 avis publics consultables</li>
          <li>Signal externe utile avant prise de rendez-vous</li>
        </ul>
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
