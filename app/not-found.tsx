import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "La page que vous cherchez n’existe pas ou a été déplacée. Retrouvez nos services, ressources et contacts depuis l’accueil SKS TALENTS.",
  robots: { index: false, follow: true }
};

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/life-sciences", label: "Life Sciences" },
  { href: "/animal-health", label: "Animal Health" },
  { href: "/services", label: "Nos services" },
  { href: "/diagnostic", label: "Diagnostic dirigeant" },
  { href: "/contact", label: "Nous contacter" }
];

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70vh] items-center py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-brand-teal">Erreur 404</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-brand-ink sm:text-5xl">
          La page que vous cherchez n’existe pas{" "}
          <span className="text-brand-teal">ou a été déplacée.</span>
        </h1>
        <p className="mt-5 text-base leading-7 text-brand-stone sm:text-lg">
          Vérifiez l’URL ou repartez de l’accueil. Vous pouvez aussi accéder directement à nos pages
          stratégiques ci-dessous.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint"
          >
            Nous contacter
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-sm font-semibold text-brand-ink transition hover:-translate-y-0.5 hover:bg-brand-mint"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
