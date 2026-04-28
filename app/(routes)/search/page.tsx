import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import SearchTrackingBeacon from "@/components/SearchTrackingBeacon";
import { buildSiteAssistantResponse, type SiteAssistantLanguage } from "@/lib/siteAssistantEngine";
import { getNotionSiteContentList } from "@/lib/notion";
import { buildNotionSearchResults, getSuggestedResults, searchSite } from "@/lib/siteSearch";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    lang?: string;
  }>;
};

function detectSearchLanguage(query: string, requested?: string): SiteAssistantLanguage {
  if (requested === "en") {
    return "en";
  }
  if (requested === "fr") {
    return "fr";
  }

  const normalized = query.toLowerCase();
  const englishSignals = [
    "salary",
    "salaries",
    "job",
    "jobs",
    "school",
    "schools",
    "fund",
    "funding",
    "recruitment",
    "hiring",
    "animal health",
    "executive search",
    "orientation",
    "career"
  ];

  return englishSignals.some((signal) => normalized.includes(signal)) ? "en" : "fr";
}

function getSearchCopy(language: SiteAssistantLanguage) {
  if (language === "en") {
    return {
      eyebrow: "Site search",
      title: "Search for information on SKS TALENTS",
      description:
        "Find the most useful pages quickly: services, articles, job pages, references, schools and sector hubs.",
      placeholder: "Search for a role, company, service, school...",
      submit: "Search",
      empty:
        "Try for example: Orientation, Gross-to-net salary, Salary benchmarks, Market updates, Specialized schools or Events & seminars.",
      resultsLabel: (count: number, query: string) => `${count} result${count > 1 ? "s" : ""} for “${query}”`,
      noDirect:
        "No direct result yet. Try a broader term such as market updates, salary benchmarks, specialized schools or events & seminars.",
      suggestions: "Useful suggestions",
      quickAnswerTitle: "Quick answer SKS",
      quickAnswerBadge: "Based on our content and trusted official sources",
      internalLinks: "SKS pages to open",
      externalLinks: "Official sources to check",
      note:
        "You can search in English or French. Most editorial pages are still published in French for now, but the assistant can guide you in both languages.",
      switchFr: "FR",
      switchEn: "EN",
      orWord: "or",
      examples: [
        "Orientation",
        "Gross-to-net salary",
        "Salary benchmarks",
        "Market updates",
        "Specialized schools",
        "Events & seminars"
      ]
    };
  }

  return {
    eyebrow: "Recherche site",
    title: "Chercher une information sur SKS TALENTS",
    description:
      "Retrouvez rapidement les contenus les plus utiles : services, articles, fiches métiers, références, écoles et hubs sectoriels.",
    placeholder: "Chercher un métier, une entreprise, un service, une école...",
    submit: "Chercher",
    empty:
      "Essayez par exemple : Orientez-vous, Calcul salaire brut/net, Benchmarks salaires, Actualités, Écoles spécialisées ou Événements & séminaires.",
    resultsLabel: (count: number, query: string) =>
      `${count} résultat${count > 1 ? "s" : ""} pour “${query}”`,
    noDirect:
      "Aucun résultat direct. Essayez un mot plus large, par exemple actualités, benchmarks salaires, écoles spécialisées ou événements & séminaires.",
    suggestions: "Suggestions utiles",
    quickAnswerTitle: "Réponse rapide SKS",
    quickAnswerBadge: "Basée sur nos contenus et des sources officielles de confiance",
    internalLinks: "Pages SKS à ouvrir",
    externalLinks: "Sources officielles à consulter",
    note:
      "Vous pouvez chercher en français ou en anglais. Le site reste majoritairement rédigé en français pour l’instant, mais l’assistant de recherche peut vous guider dans les deux langues.",
    switchFr: "FR",
    switchEn: "EN",
    orWord: "ou",
    examples: [
      "Orientez-vous",
      "Calcul salaire brut/net",
      "Benchmarks salaires",
      "Actualités",
      "Écoles spécialisées",
      "Événements & séminaires"
    ]
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim() ?? "";
  const language = detectSearchLanguage(query, params.lang);

  if (language === "en") {
    return {
      title: "Search | SKS TALENTS",
      description:
        "Search SKS TALENTS in English or French and get a quick answer grounded in our content and trusted official sources."
    };
  }

  return {
    title: "Recherche | SKS TALENTS",
    description:
      "Cherchez sur SKS TALENTS en français ou en anglais et obtenez une réponse rapide fondée sur nos contenus et des sources officielles."
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim() ?? "";
  const language = detectSearchLanguage(query, params.lang);
  const copy = getSearchCopy(language);
  const [notionArticles, notionStudies] = await Promise.all([
    getNotionSiteContentList("article", 200),
    getNotionSiteContentList("study", 100)
  ]);
  const notionResults = buildNotionSearchResults([...notionArticles, ...notionStudies]);
  const results = searchSite(query, 18, notionResults);
  const suggestedResults = results.length === 0 ? getSuggestedResults(query, 6, notionResults) : [];
  const aiResponse =
    query.length > 2
      ? await buildSiteAssistantResponse({
          question: query,
          path: "/search",
          title: "Search",
          language
        })
      : null;

  return (
    <section className="py-14 sm:py-18">
      {query.length > 0 ? (
        <SearchTrackingBeacon
          query={query}
          resultCount={results.length}
          topResults={results.slice(0, 5).map((item) => item.href)}
        />
      ) : null}
      <div className="container-shell space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">{copy.eyebrow}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-white/80 p-1">
              <Link
                href={query ? `/search?q=${encodeURIComponent(query)}&lang=fr` : "/search?lang=fr"}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  language === "fr" ? "bg-brand-teal text-white" : "text-brand-stone hover:bg-brand-mint"
                }`}
              >
                {copy.switchFr}
              </Link>
              <Link
                href={query ? `/search?q=${encodeURIComponent(query)}&lang=en` : "/search?lang=en"}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  language === "en" ? "bg-brand-teal text-white" : "text-brand-stone hover:bg-brand-mint"
                }`}
              >
                {copy.switchEn}
              </Link>
            </div>
          </div>
          <h1 className="section-title">{copy.title}</h1>
          <p className="section-copy">{copy.description}</p>
          <p className="max-w-3xl text-sm leading-7 text-brand-stone">{copy.note}</p>
        </div>

        <div className="card-surface p-6 sm:p-8">
          <form action="/search" className="relative block">
            <input type="hidden" name="lang" value={language} />
            <Search
              size={22}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone"
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder={copy.placeholder}
              className="h-16 w-full rounded-full border border-brand-teal/15 bg-white pl-14 pr-36 text-lg text-brand-ink outline-none transition focus:border-brand-teal"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 inline-flex h-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {copy.submit}
            </button>
          </form>
        </div>

        {query.length === 0 ? (
          <div className="card-surface p-8">
            <p className="text-sm leading-7 text-brand-stone">
              {copy.empty.split(":")[0]}:{" "}
              {copy.examples.map((example, index) => (
                <span key={example}>
                  <span className="font-semibold text-brand-ink">{example}</span>
                  {index < copy.examples.length - 2
                    ? ", "
                    : index === copy.examples.length - 2
                      ? ` ${copy.orWord} `
                      : "."}
                </span>
              ))}
            </p>
          </div>
        ) : null}

        {query.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {copy.resultsLabel(results.length, query)}
            </p>

            {aiResponse ? (
              <div className="card-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                    {copy.quickAnswerTitle}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
                    {copy.quickAnswerBadge}
                  </span>
                </div>
                <p className="mt-4 text-base leading-8 text-brand-ink">{aiResponse.answer}</p>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      {copy.internalLinks}
                    </p>
                    <div className="grid gap-3">
                      {aiResponse.internalLinks.map((link) => (
                        <Link
                          key={`internal-${link.href}`}
                          href={link.href}
                          className="rounded-[24px] border border-brand-teal/10 bg-white px-5 py-4 transition hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-brand-ink">{link.label}</p>
                            <ArrowUpRight className="h-4 w-4 text-brand-teal" />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-brand-stone">{link.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                      {copy.externalLinks}
                    </p>
                    <div className="grid gap-3">
                      {aiResponse.externalLinks.map((link) => (
                        <a
                          key={`external-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded-[24px] border border-brand-teal/10 bg-white px-5 py-4 transition hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-brand-ink">{link.label}</p>
                            <ArrowUpRight className="h-4 w-4 text-brand-teal" />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-brand-stone">{link.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={`${item.category}-${item.href}-${item.title}`}
                    href={item.href}
                    className="card-surface block p-6 transition hover:-translate-y-0.5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                        {item.category}
                      </span>
                      {item.meta ? (
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
                          {item.meta}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-brand-stone">{item.summary}</p>
                  </Link>
                ))
              ) : (
                  <div className="space-y-4">
                    <div className="card-surface p-8">
                      <p className="text-sm leading-7 text-brand-stone">{copy.noDirect}</p>
                    </div>
                    {suggestedResults.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
                          {copy.suggestions}
                        </p>
                      <div className="grid gap-4">
                        {suggestedResults.map((item) => (
                          <Link
                            key={`suggested-${item.category}-${item.href}-${item.title}`}
                            href={item.href}
                            className="card-surface block p-6 transition hover:-translate-y-0.5"
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                                {item.category}
                              </span>
                              {item.meta ? (
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
                                  {item.meta}
                                </span>
                              ) : null}
                            </div>
                            <h2 className="mt-3 font-display text-3xl text-brand-ink">{item.title}</h2>
                            <p className="mt-3 text-sm leading-7 text-brand-stone">{item.summary}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
