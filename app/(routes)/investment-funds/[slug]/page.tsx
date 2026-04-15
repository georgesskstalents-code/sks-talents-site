import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";
import { getInvestmentFund, investmentFunds } from "@/data/investmentFunds";

export function generateStaticParams() {
  return investmentFunds.map((fund) => ({ slug: fund.slug }));
}

export default async function InvestmentFundDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fund = getInvestmentFund(slug);

  if (!fund) {
    notFound();
  }

  return (
    <>
      <PageHero
        kicker={fund.organizationType}
        title={fund.name}
        description={fund.seo.description}
      />
      <SectionShell
        eyebrow="Fund Profile"
        title="Faits vérifiés et périmètre de confiance"
        description="Ce profil a été pensé pour la production SEO sérieuse: seulement des éléments observables sur sources officielles, puis une note de méthode qui borne ce qu’on peut ou non extrapoler."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-8">
            <h2 className="font-display text-3xl text-brand-ink">Identité</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Type
                </dt>
                <dd className="mt-2 text-sm leading-7 text-brand-stone">{fund.organizationType}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Siège
                </dt>
                <dd className="mt-2 text-sm leading-7 text-brand-stone">{fund.headquarters}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Fondation
                </dt>
                <dd className="mt-2 text-sm leading-7 text-brand-stone">{fund.founded}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Taille / capital
                </dt>
                <dd className="mt-2 text-sm leading-7 text-brand-stone">{fund.assetsOrCapital}</dd>
              </div>
            </dl>

            <h3 className="mt-8 font-display text-2xl text-brand-ink">Focus et stades</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {fund.focusAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-teal/20 bg-brand-mint px-3 py-2 text-sm font-semibold text-brand-teal"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {fund.stageFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-teal/10 bg-white px-3 py-2 text-sm font-semibold text-brand-stone"
                >
                  {item}
                </span>
              ))}
            </div>
            {fund.ticketSize ? (
              <p className="mt-6 text-sm leading-7 text-brand-stone">
                <span className="font-semibold text-brand-ink">Ticket public indiqué :</span> {fund.ticketSize}
              </p>
            ) : null}
          </div>

          <div className="card-surface p-8">
            <h2 className="font-display text-3xl text-brand-ink">Méthode éditoriale</h2>
            <p className="mt-4 text-base leading-8 text-brand-stone">{fund.methodologyNote}</p>
            <h3 className="mt-8 font-display text-2xl text-brand-ink">Signal hiring</h3>
            <p className="mt-4 text-base leading-8 text-brand-stone">{fund.hiringSignal}</p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Official Facts"
        title="Ce que les sources officielles permettent d’affirmer"
        description="Ces points servent de base fiable pour produire des pages fonds, ecosysteme, portfolio ou analyses sans sur-promettre la donnée."
      >
        <div className="grid gap-4">
          {fund.keyFacts.map((fact) => (
            <div
              key={fact}
              className="rounded-2xl border border-brand-teal/10 bg-white px-5 py-4 text-sm leading-7 text-brand-stone"
            >
              {fact}
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Portfolio"
        title="Exemples de portefeuille documentés"
        description="Quand la société ou le fonds publie explicitement un cas portefeuille, on peut le reprendre en citant la source. Les besoins de recrutement, eux, doivent encore être validés société par société."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {fund.portfolioHighlights.map((item) => (
            <article key={item.company} className="card-surface p-6">
              <h3 className="font-display text-3xl text-brand-ink">{item.company}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {item.focus}
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{item.note}</p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-brand-teal"
              >
                Source officielle
              </a>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Sources"
        title="Jeu de sources primaires"
        description="Le moteur de génération doit privilégier ces sources officielles, puis seulement ensuite compléter avec presse, marché ou salaires en signal secondaire."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {fund.sourceSet.map((source) => (
            <article key={source.url} className="card-surface p-6">
              <h3 className="font-display text-2xl text-brand-ink">{source.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-stone">{source.note}</p>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-brand-teal"
              >
                Ouvrir la source
              </a>
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
