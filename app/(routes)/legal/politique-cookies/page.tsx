import Link from "next/link";
import PageHero from "@/components/PageHero";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

export default function PolitiqueCookiesPage() {
  return (
    <>
      <PageHero
        kicker="Légal"
        title="Politique cookies"
        description="Comment SKS TALENTS utilise les cookies et comment vous pouvez gérer votre consentement à tout moment."
      />
      <section className="container-shell py-8">
        <div className="card-surface max-w-4xl space-y-8 p-8 sm:p-10">
          <div className="space-y-4 text-base leading-8 text-brand-stone">
            <p>
              SKS TALENTS utilise un nombre limité de traceurs pour faire fonctionner le site,
              sécuriser les formulaires, charger les widgets utiles et, uniquement avec votre
              accord, mesurer l’audience afin d’améliorer les contenus, les parcours et les
              campagnes.
            </p>
            <p>
              Nous ne vendons ni ne cédons vos données personnelles à des tiers. Tant que vous
              n’acceptez pas les cookies de mesure d’audience, le site reste accessible avec ses
              cookies strictement nécessaires.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-brand-teal/12 bg-brand-mint/35 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Essentiels
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Nécessaires au bon fonctionnement du site, à la sécurité des formulaires, au
                widget de conversation et à la mémorisation de vos préférences.
              </p>
            </div>
            <div className="rounded-[28px] border border-brand-teal/12 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Mesure d’audience
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Activée seulement avec votre accord pour comprendre quelles pages performent,
                quelles recherches aboutissent et quels contenus doivent être améliorés.
              </p>
            </div>
            <div className="rounded-[28px] border border-brand-teal/12 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Vos choix
              </p>
              <p className="mt-3 text-sm leading-7 text-brand-stone">
                Vous pouvez revenir à tout moment sur votre consentement via le lien{" "}
                <span className="font-semibold text-brand-ink">Préférences cookies</span> présent
                en bas du site.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-brand-teal/12 bg-brand-ink p-6 text-white">
            <p className="text-sm leading-7 text-white/85">
              En pratique, la mesure d’audience repose sur Google Analytics 4 uniquement après
              consentement. Sans accord, les scripts de mesure ne sont pas chargés.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CookiePreferencesButton className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" />
              <Link
                href="/legal/politique-confidentialite"
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Voir la politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
