"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const quickSearches = [
  "Diagnostic recrutement",
  "Lexique RH Life Sciences",
  "Calcul salaire brut/net",
  "Benchmarks salaires",
  "Actualités",
  "Écoles spécialisées",
  "Événements & séminaires"
];

export default function HomeSearchSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="container-shell">
        <div className="mesh-panel p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="eyebrow">Recherche</p>
              <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
                Trouvez rapidement la bonne information sur le site
              </h2>
              <p className="text-sm leading-7 text-brand-stone sm:text-base">
                Métiers, salaires, références, fonds, écoles, services ou contenus sectoriels :
                cherchez directement ce qui vous intéresse.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <Search
                    size={22}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    placeholder="Chercher un métier, une entreprise, un service, une école..."
                    className="h-16 w-full rounded-full border border-brand-teal/15 bg-white pl-14 pr-5 text-lg text-brand-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
                  />
                </label>
                <button
                  type="submit"
                  className="button-premium inline-flex h-16 items-center justify-center rounded-full bg-brand-teal px-7 text-base font-semibold text-white transition hover:opacity-90"
                >
                  Chercher
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                className="chip-lift rounded-full border border-brand-teal/15 bg-brand-mint/55 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-mint"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
