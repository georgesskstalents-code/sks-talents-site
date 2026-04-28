import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
  guideHref?: string;
};

export default function CommercialNextSteps({
  title = "Prochaines étapes utiles",
  description = "Continuez le parcours avec les pages qui aident le plus à transformer un signal en décision, puis en action.",
  guideHref
}: Props) {
  const actions = [
    guideHref
      ? {
          label: "Ouvrir le guide",
          href: guideHref,
          copy: "Relire la ressource téléchargée et identifier ce qui s’applique tout de suite."
        }
      : null,
    {
      label: "Faire le diagnostic",
      href: "/diagnostic",
      copy: "Qualifier rapidement si le frein principal vient du sourcing, de la structure ou du temps perdu."
    },
    {
      label: "Voir la scorecard dirigeant",
      href: "/scorecard-dirigeant",
      copy: "Evaluer en 10 minutes si votre organisation est prête à absorber la prochaine phase de croissance."
    },
    {
      label: "Découvrir l’abonnement",
      href: "/abonnement",
      copy: "Voir le format récurrent pensé pour suivre marché, talents, structuration RH et priorités de décision."
    },
    {
      label: "Lire les cas d’usage",
      href: "/cas-d-usage",
      copy: "Comparer votre situation à des scénarios concrets : startup en croissance, scale-up après levée, RH débordées."
    }
  ].filter(Boolean) as { label: string; href: string; copy: string }[];

  return (
    <section className="card-surface p-6 sm:p-8">
      <p className="eyebrow">Nurturing utile</p>
      <h3 className="font-display text-4xl text-brand-ink sm:text-5xl">{title}</h3>
      <p className="mt-4 max-w-3xl text-base leading-8 text-brand-stone">{description}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-[24px] border border-brand-teal/10 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-brand-teal/25 hover:bg-brand-mint/20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{action.label}</p>
            <p className="mt-3 text-sm leading-7 text-brand-stone">{action.copy}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
