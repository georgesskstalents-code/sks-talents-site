"use client";

import { useMemo, useState } from "react";
import type { GlossaryGroup } from "@/data/lexiconHub";

type Props = {
  groups: GlossaryGroup[];
};

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function GlossaryExplorer({ groups }: Props) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalized = normalizeSearchValue(query);

    if (!normalized) {
      return groups;
    }

    const queryTerms = normalized.split(" ").filter(Boolean);

    return groups
      .map((group) => ({
        ...group,
        concepts: group.concepts.filter((concept) =>
          queryTerms.every((term) =>
            normalizeSearchValue(
              [
                group.title,
                group.description,
                concept.term,
                concept.definition,
                concept.whyItMatters,
                concept.businessInsight
              ].join(" ")
            ).includes(term)
          )
        )
      }))
      .filter((group) => group.concepts.length > 0);
  }, [groups, query]);

  const totalResults = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.concepts.length, 0),
    [filteredGroups]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[28px] border border-brand-teal/12 bg-white p-6 shadow-[0_18px_45px_rgba(21,39,41,0.06)] lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Glossaire opérationnel
          </p>
          <h3 className="mt-3 font-display text-4xl text-brand-ink sm:text-5xl">
            100 concepts à retrouver vite
          </h3>
          <p className="mt-3 max-w-3xl text-base leading-8 text-brand-stone">
            Cherchez un terme, parcourez par catégorie et utilisez les définitions comme base commune entre
            direction, RH et managers.
          </p>
        </div>
        <div className="w-full max-w-xl">
          <label className="sr-only" htmlFor="glossary-search">
            Rechercher dans le lexique
          </label>
          <input
            id="glossary-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher : structuration RH, time-to-hire, RPO, ATS..."
            className="w-full rounded-full border border-brand-teal/15 px-5 py-4 text-base outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
          <p className="mt-3 text-sm leading-7 text-brand-stone">
            {query.trim()
              ? `${totalResults} concept${totalResults > 1 ? "s" : ""} trouvé${totalResults > 1 ? "s" : ""}`
              : "Recherchez par terme, notion ou problème business."}
          </p>
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="rounded-[28px] border border-brand-teal/12 bg-brand-mint/35 px-6 py-8 text-base text-brand-stone">
          Aucun concept ne correspond à votre recherche. Essayez un mot plus large comme{" "}
          <span className="font-semibold text-brand-ink">recrutement</span>,{" "}
          <span className="font-semibold text-brand-ink">automatisation</span> ou{" "}
          <span className="font-semibold text-brand-ink">scale-up</span>.
        </div>
      ) : null}

      <div className="space-y-5">
        {filteredGroups.map((group, groupIndex) => (
          <details
            key={group.title}
            open={groupIndex === 0 || Boolean(query)}
            className="rounded-[30px] border border-brand-teal/12 bg-white shadow-[0_20px_48px_rgba(21,39,41,0.05)]"
          >
            <summary className="cursor-pointer list-none px-6 py-5 marker:content-none sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                    {group.concepts.length} concepts
                  </p>
                  <h4 className="mt-2 font-display text-3xl text-brand-ink sm:text-4xl">{group.title}</h4>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-stone">{group.description}</p>
                </div>
                <span className="rounded-full border border-brand-teal/12 bg-brand-mint/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Ouvrir
                </span>
              </div>
            </summary>

            <div className="border-t border-brand-teal/10 px-6 py-6 sm:px-8">
              <div className="grid gap-4 lg:grid-cols-2">
                {group.concepts.map((concept) => (
                  <article
                    key={concept.term}
                    className="rounded-[24px] border border-brand-teal/10 bg-[linear-gradient(180deg,rgba(248,252,251,0.95),rgba(255,255,255,0.95))] p-5"
                  >
                    <h5 className="font-display text-2xl text-brand-ink">{concept.term}</h5>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-brand-stone">
                      <p>
                        <span className="font-semibold text-brand-ink">Définition :</span> {concept.definition}
                      </p>
                      <p>
                        <span className="font-semibold text-brand-ink">Pourquoi c’est utile :</span>{" "}
                        {concept.whyItMatters}
                      </p>
                      <p>
                        <span className="font-semibold text-brand-ink">Lecture business :</span>{" "}
                        {concept.businessInsight}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
