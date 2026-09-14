type ClientTestimonial = {
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
};

/**
 * Temoignages de dirigeants clients.
 *
 * Le tableau reste vide tant que les 5 temoignages ne sont pas fournis et
 * valides par les personnes concernees. Le composant ne rend rien dans ce cas :
 * aucun temoignage ne doit etre invente.
 */
export const clientTestimonials: ClientTestimonial[] = [
  // [[A_FOURNIR: temoignage dirigeant 1 - citation, nom, fonction, entreprise]]
  // [[A_FOURNIR: temoignage dirigeant 2 - citation, nom, fonction, entreprise]]
  // [[A_FOURNIR: temoignage dirigeant 3 - citation, nom, fonction, entreprise]]
  // [[A_FOURNIR: temoignage dirigeant 4 - citation, nom, fonction, entreprise]]
  // [[A_FOURNIR: temoignage dirigeant 5 - citation, nom, fonction, entreprise]]
];

export default function ClientTestimonials() {
  if (clientTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="c-tp-section">
      <div className="c-container">
        <div className="c-tp-head">
          <div>
            <span className="c-eyebrow">Paroles de dirigeants</span>
            <h2 className="c-h2">
              Ce que disent <span className="c-italic">les dirigeants accompagnés.</span>
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {clientTestimonials.map((item) => (
            <figure
              key={`${item.authorName}-${item.company}`}
              className="rounded-[28px] border border-brand-teal/12 bg-white/70 p-6"
            >
              <blockquote className="text-base leading-8 text-brand-stone">
                &laquo; {item.quote} &raquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-brand-ink">
                <span className="font-semibold">{item.authorName}</span>
                <span className="text-brand-stone">
                  {" "}
                  · {item.authorRole}, {item.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
