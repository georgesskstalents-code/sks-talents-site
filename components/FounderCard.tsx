import { CalendarClock, Star } from "lucide-react";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function FounderCard() {
  return (
    <section className="container-shell py-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[28px] border border-brand-teal/15 bg-white p-5 shadow-soft sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Votre interlocuteur direct
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <img
              src="/images/georges-kengue.jpeg"
              alt="Georges Kengue, fondateur de SKS Talents"
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-brand-mint shadow-soft sm:h-24 sm:w-24"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl leading-tight text-brand-ink sm:text-2xl">Georges Kengue</p>
              <p className="mt-1 text-sm leading-6 text-brand-stone">
                Fondateur SKS TALENTS · Executive Search Life Sciences &amp; Santé animale
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href="https://calendly.com/g-kengue/talentconsulting"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                >
                  <CalendarClock size={14} />
                  Réserver 15 min
                </a>
                <a
                  href="https://www.linkedin.com/in/georges-kengue-81988b36/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
                <a
                  href="https://fr.trustpilot.com/review/skstalents.fr"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-teal transition hover:opacity-80"
                >
                  <Star size={14} />
                  Avis Trustpilot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
