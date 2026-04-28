import Link from "next/link";
import { services } from "@/data/site";

export default function ServicesSection() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <div className="mb-8 space-y-4">
          <p className="eyebrow">Solution</p>
          <h2 className="section-title max-w-[22ch]">
            Nous ne recrutons pas seulement.
            <span className="mt-2 block text-brand-teal">Nous structurons votre croissance.</span>
          </h2>
          <p className="section-copy">
            Trois piliers pour agir sur ce qui compte vraiment : recruter les bons profils, créer une
            structure RH plus robuste et sécuriser la montée en puissance des équipes.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="card-surface panel-lift p-8">
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
              <div className="mt-6 rounded-2xl border border-brand-teal/10 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Résultat attendu
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">
                  {service.slug === "recrutement"
                    ? "Réduire le time-to-hire sur des rôles pénuriques et augmenter la qualité de décision."
                    : service.slug === "rpo"
                      ? "Absorber un volume critique sans perdre l’exigence sectorielle ni la lisibilité du pipeline."
                      : "Créer une base RH plus solide pour soutenir l’hypercroissance et les managers."}
                </p>
              </div>
              <Link
                href="/services"
                className="button-premium mt-8 inline-flex rounded-full border border-brand-teal/20 px-5 py-3 text-sm font-semibold text-brand-teal"
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
