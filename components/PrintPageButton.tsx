"use client";

export default function PrintPageButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-full border border-brand-teal/20 bg-white px-6 py-4 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-mint"
    >
      Imprimer / enregistrer en PDF
    </button>
  );
}
