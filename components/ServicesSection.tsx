import Link from "next/link";
import { services } from "@/data/site";

export default function ServicesSection() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <div className="mb-8 space-y-4">
          <p className="eyebrow">Présentation</p>
          <h2 className="section-title">
            Vos marchés sont exigeants. Votre recrutement devrait l&apos;être aussi.
          </h2>
          <p className="section-copy">
            Cadrage rapide, brief challengé, sourcing ciblé — pour les contextes où l&apos;erreur
            ne pardonne pas.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="card-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">
                {service.metric}
              </p>
              <h3 className="mt-4 font-display text-4xl">{service.title}</h3>
              <p className="mt-4 text-base leading-8 text-brand-stone">{service.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-brand-stone">
                {service.bullets.map((item) => (
                  <li key={item} className="rounded-2xl bg-brand-mint/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-8 inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal"
              >
                Explorer l’offre
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
