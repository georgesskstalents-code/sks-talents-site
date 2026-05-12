import Image from "next/image";
import Link from "next/link";
import { type Article, getArticleVerticalLabel } from "@/data/articles";
import { getEditorialHeroImage } from "@/lib/editorialHeroImage";
import "./blog-magazine.css";

type Props = {
  articles: Article[];
};

function formatDate(date: string) {
  try {
    const d = new Date(date);
    const months = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUI", "JUI", "AOU", "SEP", "OCT", "NOV", "DEC"];
    return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return date;
  }
}

function authorInitial(author?: string) {
  if (!author) return "S";
  return author.charAt(0).toUpperCase();
}

function ArticleCard({ article, index, variant }: { article: Article; index: number; variant: "featured-tall" | "col-4" | "col-3" }) {
  const heroImage = getEditorialHeroImage({
    slug: article.slug,
    title: article.title,
    topicLabel: article.topic,
    verticalLabel: getArticleVerticalLabel(article.vertical)
  });
  return (
    <article className={`bmag-card ${variant}`} data-vertical={article.vertical}>
      <Link href={`/blog/${article.slug}`}>
        <div className="bmag-card-thumb">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="bmag-card-thumb-img"
          />
          <div className="bmag-card-thumb-num">N°{String(index + 1).padStart(2, "0")}</div>
          <div className="bmag-card-thumb-glyph">{getArticleVerticalLabel(article.vertical).charAt(0)}</div>
        </div>
      </Link>
      <div className="bmag-card-cat">{getArticleVerticalLabel(article.vertical)}</div>
      <Link href={`/blog/${article.slug}`}>
        <h3>{article.title}</h3>
      </Link>
      <p>{article.excerpt}</p>
      <div className="bmag-card-meta">
        <span>{article.author} · {formatDate(article.date)}</span>
        <span>{article.readTime} min</span>
      </div>
    </article>
  );
}

export default function BlogMagazine({ articles }: Props) {
  if (articles.length === 0) {
    return null;
  }

  const [featured, ...rest] = articles;
  const gridArticles = rest.slice(0, 5);
  const featuredImage = getEditorialHeroImage({
    slug: featured.slug,
    title: featured.title,
    topicLabel: featured.topic,
    verticalLabel: getArticleVerticalLabel(featured.vertical)
  });

  return (
    <div className="bmag-root">
      {/* Masthead */}
      <section className="bmag-masthead">
        <div className="bmag-mast-left">
          <div className="bmag-mast-eyebrow">Le journal de SKS</div>
          <div className="bmag-mast-edition">Articles & analyses</div>
        </div>
        <h1 className="bmag-mast-title">
          Res<em>sources</em>
        </h1>
        <div className="bmag-mast-right">
          <div className="bmag-mast-eyebrow">Mai 2026</div>
          <div className="bmag-mast-meta">
            Lectures, analyses et terrain pour Life Sciences, diagnostic, santé animale et petfood premium.
          </div>
        </div>
      </section>

      {/* Hero featured article */}
      <section className="bmag-hero" data-vertical={featured.vertical}>
        <div className="bmag-hero-art">
          <Image
            src={featuredImage.src}
            alt={featuredImage.alt}
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            className="bmag-hero-art-img"
            priority
          />
          <div className="bmag-hero-art-bg" />
          <div className="bmag-hero-art-grain" />
          <div className="bmag-hero-art-cap">
            <span>VOL. XII · N°01</span>
            <span>{formatDate(featured.date).split(" ").slice(1).join(" · ")}</span>
          </div>
          <div className="bmag-hero-art-glyph">
            {getArticleVerticalLabel(featured.vertical)}
            <br />
            <em>FILE 01 · LONG READ</em>
          </div>
        </div>
        <div>
          <div className="bmag-hero-meta">
            <span className="bmag-cat">{getArticleVerticalLabel(featured.vertical)}</span>
            <span className="bmag-dot" />
            <span>{formatDate(featured.date)}</span>
            <span className="bmag-dot" />
            <span>{featured.readTime} min de lecture</span>
          </div>
          <h1 className="bmag-hero-h1">{featured.title}</h1>
          <p className="bmag-hero-lede">{featured.excerpt}</p>
          <div className="bmag-hero-byline">
            <div className="bmag-hero-avatar">{authorInitial(featured.author)}</div>
            <div>
              <div className="bmag-hero-author">{featured.author}</div>
              <div className="bmag-hero-role">SKS TALENTS</div>
            </div>
            <Link className="bmag-hero-cta" href={`/blog/${featured.slug}`}>
              Lire le dossier <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section title */}
      {gridArticles.length > 0 ? (
        <>
          <div className="bmag-section-title">
            <h2>
              Dernières <em>parutions</em>
            </h2>
            <Link href="#all-articles">Voir toutes les publications →</Link>
          </div>

          {/* Article grid */}
          <div className="bmag-grid" id="all-articles">
            {gridArticles.map((article, idx) => {
              const variant =
                idx === 0 ? "featured-tall" : idx === 1 || idx === 2 ? "col-3" : "col-4";
              return (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={idx + 1}
                  variant={variant}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
