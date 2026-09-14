import TrustpilotLiveWidget from "@/components/TrustpilotLiveWidget";
import { proof, proofLabels } from "@/data/proof";

export default function TrustpilotWidget() {
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID;
  const templateId = process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID;
  const reviewUrl = proof.trustpilotUrl;

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
          <h3 className="font-display text-4xl text-brand-ink sm:text-5xl">{proofLabels.trustpilotRatingSlash}</h3>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-brand-stone">
            sur {proof.trustpilotCount} avis publics
          </p>
        </div>
        <img
          src="/images/partners/trustpilot.svg"
          alt={`Logo Trustpilot - Note ${proofLabels.trustpilotRatingSlash} sur ${proof.trustpilotCount} avis SKS Talents`}
          className="h-8 w-auto object-contain sm:mt-2"
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-brand-stone">
        Les avis sont publiés sur Trustpilot, une plateforme indépendante que nous ne contrôlons
        pas. Vous pouvez les consulter dans leur intégralité avant de nous solliciter.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          `${proofLabels.trustpilotRatingSlash} sur Trustpilot`,
          `${proof.trustpilotCount} avis publics consultables`,
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
