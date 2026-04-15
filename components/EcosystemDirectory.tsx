"use client";

import { useMemo, useState } from "react";
import type { EcosystemCategory } from "@/data/ecosystemTargets";

type Props = {
  categories: EcosystemCategory[];
};

const sectorOptions = [
  "Tous",
  "Biotech",
  "Diagnostic",
  "Animal Health",
  "Petfood",
  "Cosmétique",
  "MedTech",
  "Agro-industrie",
  "Green Engineering",
  "Life Sciences"
];

const priorityOptions = ["Toutes", "P1", "P2", "P3"] as const;

function priorityClasses(priority: "P1" | "P2" | "P3") {
  if (priority === "P1") return "bg-brand-teal text-white";
  if (priority === "P2") return "bg-brand-mint text-brand-teal";
  return "border border-brand-teal/15 bg-white text-brand-stone";
}

export default function EcosystemDirectory({ categories }: Props) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("Tous");
  const [priority, setPriority] = useState<(typeof priorityOptions)[number]>("Toutes");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return categories
      .map((category) => {
        const targets = category.targets.filter((target) => {
          const matchesQuery =
            normalizedQuery.length === 0 ||
            target.name.toLowerCase().includes(normalizedQuery) ||
            target.angle.toLowerCase().includes(normalizedQuery);
          const matchesSector = sector === "Tous" || target.sectors.includes(sector);
          const matchesPriority = priority === "Toutes" || target.priority === priority;
          return matchesQuery && matchesSector && matchesPriority;
        });

        return {
          ...category,
          targets
        };
      })
      .filter((category) => category.targets.length > 0);
  }, [categories, priority, query, sector]);

  const resultCount = filteredCategories.reduce((sum, category) => sum + category.targets.length, 0);

  return (
    <div className="space-y-10">
      <div className="card-surface p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.8fr_0.8fr]">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Recherche
            </label>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="France Biotech, ISIPCA, BioFIT..."
              className="mt-3 w-full rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Secteur
            </label>
            <select
              value={sector}
              onChange={(event) => setSector(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            >
              {sectorOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              Priorité
            </label>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as (typeof priorityOptions)[number])}
              className="mt-3 w-full rounded-2xl border border-brand-teal/15 px-4 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
            >
              {priorityOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-brand-stone">
          {resultCount} acteur{resultCount > 1 ? "s" : ""} correspondant{resultCount > 1 ? "s" : ""}.
        </p>
      </div>

      {filteredCategories.map((category) => (
        <section key={category.slug} className="space-y-5">
          <div>
            <p className="eyebrow">Cartographie</p>
            <h2 className="section-title">{category.title}</h2>
            <p className="section-copy">{category.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {category.targets.map((target) => (
              <article key={`${category.slug}-${target.name}`} className="card-surface p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl text-brand-ink">{target.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${priorityClasses(
                      target.priority
                    )}`}
                  >
                    {target.priority}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{target.angle}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                  {target.sectors.join(" · ")}
                </p>
                {target.url ? (
                  <a
                    href={target.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex rounded-full border border-brand-teal/20 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
                  >
                    Visiter le site
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
