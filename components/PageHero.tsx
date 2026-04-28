import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  kicker: string;
  title: string;
  description: string;
  variant?: "default" | "teal" | "ink" | "sand";
  template?: "default" | "job-role" | "editorial";
  breadcrumbs?: { label: string; href?: string }[];
};

const variantClassNames = {
  default: "bg-grain",
  teal:
    "bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.18),transparent_32%),linear-gradient(180deg,rgba(223,243,241,0.95),rgba(255,255,255,0.88))]",
  ink:
    "bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.16),transparent_28%),linear-gradient(180deg,rgba(22,51,52,0.98),rgba(28,54,56,0.92))] text-white",
  sand:
    "bg-[radial-gradient(circle_at_top_right,rgba(193,154,107,0.15),transparent_28%),linear-gradient(180deg,rgba(248,244,238,0.98),rgba(255,255,255,0.9))]"
} as const;

export default function PageHero({
  kicker,
  title,
  description,
  variant = "default",
  template = "default",
  breadcrumbs
}: Props) {
  const isDark = variant === "ink";

  if (template === "job-role") {
    return (
      <section className="container-shell py-16 sm:py-20">
        <div className="card-surface overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.16),transparent_30%),linear-gradient(180deg,rgba(223,243,241,0.96),rgba(255,255,255,0.94))] px-8 py-10 sm:px-12 sm:py-14">
              <div className="absolute -left-20 top-6 h-56 w-56 rounded-full border-[12px] border-brand-teal/18" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full border-[10px] border-brand-teal/14" />
              {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
              <div className="relative mt-4 space-y-6">
                <p className="inline-flex rounded-[22px] border border-brand-teal/16 bg-white/82 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal shadow-sm">
                  {kicker}
                </p>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">
                    La fiche métier
                  </p>
                  <h1 className="max-w-4xl font-display text-5xl leading-[0.95] text-brand-ink sm:text-6xl">
                    {title}
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-brand-stone">{description}</p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[340px] overflow-hidden bg-[#4bb6bd]">
              <Image
                src="/brand/job-role-hero-template.png"
                alt="Template visuel fiche métier SKS TALENTS"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,53,55,0.06),rgba(20,53,55,0.01))]" />
              <div className="absolute left-0 right-0 top-0 h-[34%] bg-[#4bb6bd]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (template === "editorial") {
    return (
      <section className="container-shell py-16 sm:py-20">
        <div className="card-surface overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(65,160,164,0.12),transparent_24%),linear-gradient(180deg,rgba(250,252,252,0.98),rgba(255,255,255,0.95))] px-8 py-10 sm:px-12 sm:py-14">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_0%,transparent_56%,rgba(65,160,164,0.04)_56%,rgba(65,160,164,0.04)_58%,transparent_58%)]" />
              {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
              <div className="relative mt-4 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="inline-flex rounded-full border border-brand-teal/16 bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal shadow-sm">
                    {kicker}
                  </p>
                  <p className="inline-flex rounded-full border border-brand-teal/10 bg-brand-mint/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink">
                    Livre blanc / étude
                  </p>
                </div>
                <div className="space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                    Lecture éditoriale SKS
                  </p>
                  <h1 className="max-w-4xl font-display text-[3.35rem] leading-[0.92] text-brand-ink sm:text-[4.5rem]">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-brand-stone">{description}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Signal", "Sujet RH ou business à forte tension"],
                    ["Lecture", "Contenu structuré, sourcé et lisible"],
                    ["Action", "Décision exploitable pour dirigeants et RH"]
                  ].map(([label, copy]) => (
                    <div
                      key={label}
                      className="rounded-[24px] border border-brand-teal/12 bg-white/86 p-4 shadow-[0_14px_34px_rgba(22,51,52,0.06)]"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-brand-stone">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-[340px] overflow-hidden bg-[linear-gradient(180deg,#5db6be_0%,#49a6af_46%,#214b4e_100%)] p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(140deg,rgba(255,255,255,0.12),transparent_38%,rgba(255,255,255,0.07))]" />
              <div className="absolute right-6 top-6 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                Article / newsletter
              </div>
              <div className="relative flex h-full flex-col justify-between gap-5">
                <div className="rounded-[30px] border border-white/18 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">
                    Format premium
                  </p>
                  <p className="mt-3 max-w-sm font-display text-3xl leading-tight text-white sm:text-4xl">
                    Un contenu éditorial plus statutaire, plus clair et plus présentable.
                  </p>
                </div>

                <div className="rounded-[36px] border border-white/18 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] p-6 shadow-[0_28px_60px_rgba(17,32,35,0.24)] backdrop-blur-sm">
                  <div className="rounded-[28px] border border-white/16 bg-[linear-gradient(165deg,rgba(252,247,240,0.97),rgba(243,251,250,0.93))] p-6 text-brand-ink">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
                          SKS TALENTS
                        </p>
                        <p className="mt-2 text-sm leading-6 text-brand-stone">
                          Des sujets RH, recrutement et structuration transformés en lectures utiles pour décider vite.
                        </p>
                      </div>
                      <div className="flex h-20 w-[9.5rem] items-center justify-center rounded-[28px] bg-white px-4 shadow-[0_18px_40px_rgba(22,51,52,0.12)]">
                        <Image
                          src="/brand/logo-sks-talents-signature.svg"
                          alt="SKS TALENTS"
                          width={128}
                          height={56}
                          className="h-auto w-[128px] object-contain"
                          priority={false}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Life Sciences", "Biotech, diagnostic, medtech"],
                        ["Animal Health", "Santé animale, vétérinaire, petfood"],
                        ["Direction / RH", "CEO, COO, CPO, DRH"]
                      ].map(([label, copy]) => (
                        <div key={label} className="rounded-[20px] border border-brand-teal/12 bg-white/78 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                            {label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-brand-stone">{copy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-16 sm:py-20">
      <div className={`card-surface p-8 sm:p-12 ${variantClassNames[variant]}`}>
        {breadcrumbs ? (
          <Breadcrumbs
            items={breadcrumbs}
            className={isDark ? "text-white/75 [&_a]:hover:text-white [&_span]:text-white/75" : ""}
          />
        ) : null}
        <div className="mb-5">
          <p
            className={`inline-flex rounded-[22px] border px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] shadow-sm ${
              isDark
                ? "border-white/15 bg-white/10 text-white/80"
                : "border-brand-teal/12 bg-white/82 text-brand-teal"
            }`}
          >
            {kicker}
          </p>
        </div>
        <h1 className="max-w-4xl font-display text-5xl leading-none sm:text-6xl">{title}</h1>
        <p className={`mt-6 max-w-3xl text-lg leading-8 ${isDark ? "text-white/78" : "text-brand-stone"}`}>
          {description}
        </p>
      </div>
    </section>
  );
}
