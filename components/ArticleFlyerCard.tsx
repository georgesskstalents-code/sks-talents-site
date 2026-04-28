import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description: string;
  verticalLabel: string;
  topicLabel: string;
  audienceLabel?: string;
  variant?: "full" | "compact";
};

const themeByVertical: Record<
  string,
  {
    shell: string;
    glow: string;
    stroke: string;
    badge: string;
    topic: string;
    button: string;
    buttonText: string;
  }
> = {
  Biotech: {
    shell: "from-[#f4fbfa] via-[#ffffff] to-[#eef5f2]",
    glow: "bg-[#bfe8e1]/85",
    stroke: "border-[#d9e7e1]",
    badge: "bg-white text-[#274d50]",
    topic: "border-[#d9e7e1] bg-[#f7fbfa] text-[#274d50]",
    button: "bg-brand-teal",
    buttonText: "text-white"
  },
  Diagnostic: {
    shell: "from-[#f6fbfa] via-[#ffffff] to-[#edf4f1]",
    glow: "bg-[#dff3f1]/80",
    stroke: "border-[#d9e6e2]",
    badge: "bg-white text-[#294f52]",
    topic: "border-[#d9e6e2] bg-[#f7fbfa] text-[#294f52]",
    button: "bg-brand-teal",
    buttonText: "text-white"
  },
  "Medical Vet": {
    shell: "from-[#f3faf6] via-[#ffffff] to-[#eef4f1]",
    glow: "bg-[#c0e5d7]/80",
    stroke: "border-[#d8e4df]",
    badge: "bg-white text-[#27484c]",
    topic: "border-[#d8e4df] bg-[#f6fbfa] text-[#27484c]",
    button: "bg-brand-teal",
    buttonText: "text-white"
  },
  "Vet Services": {
    shell: "from-[#f4fbf9] via-[#ffffff] to-[#eef5f2]",
    glow: "bg-[#f1dfc0]/70",
    stroke: "border-[#dce6e1]",
    badge: "bg-white text-[#274d50]",
    topic: "border-[#dce6e1] bg-[#f7fbfa] text-[#274d50]",
    button: "bg-brand-teal",
    buttonText: "text-white"
  },
  Petfood: {
    shell: "from-[#f5fbf8] via-[#ffffff] to-[#eef5f1]",
    glow: "bg-[#f2ddba]/65",
    stroke: "border-[#dce6e0]",
    badge: "bg-white text-[#274d50]",
    topic: "border-[#dce6e0] bg-[#f7fbfa] text-[#274d50]",
    button: "bg-brand-teal",
    buttonText: "text-white"
  }
};

function normalizeTheme(verticalLabel: string) {
  return themeByVertical[verticalLabel] ?? themeByVertical.Biotech;
}

export default function ArticleFlyerCard({
  href,
  title,
  description,
  verticalLabel,
  topicLabel,
  audienceLabel,
  variant = "full"
}: Props) {
  const theme = normalizeTheme(verticalLabel);
  const isCompact = variant === "compact";

  return (
    <Link
      href={href}
      className="group block h-full rounded-[32px] border border-brand-teal/10 bg-[#eef4f1] p-2.5 shadow-[0_18px_42px_rgba(19,43,45,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(19,43,45,0.11)]"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-white/90 bg-white">
        <div
          className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${theme.shell} ${
            isCompact ? "min-h-[9.5rem]" : "min-h-[11rem]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.82),transparent_40%),linear-gradient(160deg,rgba(255,255,255,0.34),transparent_58%)]" />
          <div className={`absolute inset-3 rounded-[22px] ${theme.stroke}`} />

          <div className={`relative flex h-full flex-col justify-between ${isCompact ? "p-4" : "p-5"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className={`rounded-full border border-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[0_8px_18px_rgba(19,43,45,0.04)] ${theme.badge}`}>
                {verticalLabel}
              </div>
              <div className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur ${theme.topic}`}>
                {topicLabel}
              </div>
            </div>

            <div className={`flex flex-1 flex-col items-center justify-center ${isCompact ? "gap-3 py-3" : "gap-4 py-4"}`}>
              <div className={`mx-auto flex items-center justify-center rounded-[26px] border border-[#dce7e1] bg-white px-4 shadow-[0_14px_30px_rgba(17,24,39,0.06)] ${isCompact ? "h-[4.5rem] w-[8.5rem]" : "h-[5rem] w-[9.75rem]"}`}>
                <Image
                  src="/brand/logo-sks-talents-signature.svg"
                  alt="SKS TALENTS"
                  width={isCompact ? 108 : 128}
                  height={isCompact ? 48 : 56}
                  className={`h-auto object-contain ${isCompact ? "w-[108px]" : "w-[128px]"}`}
                />
              </div>
              <div className="rounded-full border border-[#dce7e1] bg-white/95 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-teal shadow-[0_8px_18px_rgba(19,43,45,0.03)]">
                Lecture marché • talents • décision
              </div>
            </div>
          </div>
        </div>

        <div className={`relative flex flex-1 flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfa_100%)] ${isCompact ? "px-4 pb-4 pt-5" : "px-5 pb-5 pt-6"}`}>

          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-teal/75">
            {audienceLabel ? `${audienceLabel} • ${verticalLabel}` : verticalLabel}
          </p>

          <h3
            className={`mt-4 text-center font-display font-semibold leading-[1.15] text-brand-ink ${
              isCompact ? "text-[1.35rem]" : "text-[1.7rem]"
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isCompact ? 3 : 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {title}
          </h3>

          <p
            className="mx-auto mt-3 max-w-[28rem] text-center text-sm leading-6 text-brand-stone"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isCompact ? 3 : 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {description}
          </p>

          <div className="mt-auto pt-5">
            <div
              className={`mx-auto inline-flex items-center justify-center rounded-[999px] px-6 py-3.5 text-base font-semibold transition duration-300 group-hover:scale-[1.02] ${theme.button} ${theme.buttonText}`}
            >
              Découvrir
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
