"use client";

import { useMemo, useState } from "react";
import {
  getArticlePersonaOptions,
  getArticleVerticalLabel,
  type Article,
  type ArticlePersona
} from "@/data/articles";
import ArticleFlyerCard from "@/components/ArticleFlyerCard";

type Props = {
  articles: Article[];
};

export default function BlogFilters({ articles }: Props) {
  const [persona, setPersona] = useState("Tous");
  const [sector, setSector] = useState("Tous");
  const [topic, setTopic] = useState("Tous");

  const personas = getArticlePersonaOptions();
  const sectors = ["Tous", ...new Set(articles.map((article) => getArticleVerticalLabel(article.vertical)))];
  const topics = ["Tous", ...new Set(articles.map((article) => article.topic))];

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const personaMatch =
          persona === "Tous" || article.persona.includes(persona as ArticlePersona);
        const sectorMatch =
          sector === "Tous" || getArticleVerticalLabel(article.vertical) === sector;
        const topicMatch = topic === "Tous" || article.topic === topic;

        return personaMatch && sectorMatch && topicMatch;
      }),
    [articles, persona, sector, topic]
  );

  return (
    <div className="space-y-8">
      <div className="card-surface grid gap-4 p-6 md:grid-cols-3">
        {[
          ["Persona", persona, personas, setPersona],
          ["Secteur", sector, sectors, setSector],
          ["Topic", topic, topics, setTopic]
        ].map(([label, value, options, setter]) => (
          <label key={label as string} className="space-y-2 text-sm font-semibold text-brand-stone">
            <span>{label as string}</span>
            <select
              value={value as string}
              onChange={(event) => (setter as (next: string) => void)(event.target.value)}
              className="w-full rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-sm text-brand-ink outline-none"
            >
              {(options as string[]).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleFlyerCard
            key={article.slug}
            href={`/blog/${article.slug}`}
            title={article.title}
            description={article.excerpt}
            audienceLabel={article.persona.join(", ")}
            verticalLabel={getArticleVerticalLabel(article.vertical)}
            topicLabel={article.topic}
            variant="compact"
          />
        ))}
      </div>
    </div>
  );
}
