"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { rankCandidates, type SlugCandidate } from "@/lib/slugRescue";

type Props = {
  /** Prefixe de la route dynamique, par exemple "/job-roles". */
  basePath: string;
  /** Libelle du type de contenu au singulier, par exemple "fiche metier". */
  entityLabel: string;
  /** Libelle au pluriel, par exemple "fiches metiers". */
  entityLabelPlural: string;
  /** Index minimal (slug + titre) des contenus reellement publies. */
  index: SlugCandidate[];
  /** Lien vers la page index du type de contenu. */
  indexHref: string;
  /** Libelle du lien vers la page index. */
  indexLabel: string;
};

/**
 * Page 404 utile pour une route dynamique.
 *
 * Le statut HTTP reste un vrai 404 (le composant est rendu depuis un
 * `not-found.tsx` declenche par `notFound()`), mais le contenu propose les
 * cinq contenus les plus proches du slug demande plutot qu'un mur vide.
 * Le slug demande est lu depuis le chemin cote client, ce qui evite de
 * dupliquer la logique de matching sur le serveur.
 */
export default function SlugRescuePanel({
  basePath,
  entityLabel,
  entityLabelPlural,
  index,
  indexHref,
  indexLabel
}: Props) {
  const pathname = usePathname() || "";

  const requestedSlug = useMemo(() => {
    const trimmed = pathname.replace(/\/+$/, "");
    if (!trimmed.startsWith(basePath)) return "";
    return trimmed.slice(basePath.length).replace(/^\/+/, "").split("/")[0] ?? "";
  }, [pathname, basePath]);

  const readableQuery = useMemo(
    () => decodeURIComponent(requestedSlug).replace(/-/g, " ").trim(),
    [requestedSlug]
  );

  const suggestions = useMemo(() => {
    if (!requestedSlug) return [];
    return rankCandidates(requestedSlug, index, 5).filter((item) => item.score > 0.12);
  }, [requestedSlug, index]);

  return (
    <main className="container-shell py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-brand-teal">Erreur 404</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl">
          Cette {entityLabel} n’existe pas{" "}
          <span className="text-brand-teal">sous cette adresse.</span>
        </h1>
        <p className="mt-5 text-base leading-7 text-brand-stone sm:text-lg">
          {readableQuery ? (
            <>
              L’adresse demandée (<span className="font-semibold text-brand-ink">{readableQuery}</span>)
              ne correspond à aucune {entityLabel} publiée. Voici les {entityLabelPlural} les plus
              proches de votre recherche.
            </>
          ) : (
            <>
              L’adresse demandée ne correspond à aucune {entityLabel} publiée. Repartez de la liste
              complète ou utilisez la recherche.
            </>
          )}
        </p>

        {suggestions.length > 0 ? (
          <ul className="mt-9 space-y-3">
            {suggestions.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${basePath}/${item.slug}`}
                  className="block rounded-2xl border border-brand-teal/15 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:bg-brand-mint"
                >
                  <span className="block text-base font-semibold text-brand-ink">{item.title}</span>
                  <span className="mt-1 block text-sm text-brand-stone">
                    {basePath}/{item.slug}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/search${readableQuery ? `?q=${encodeURIComponent(readableQuery)}` : ""}`}
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            Rechercher sur le site
          </Link>
          <Link
            href={indexHref}
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
          >
            {indexLabel}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
