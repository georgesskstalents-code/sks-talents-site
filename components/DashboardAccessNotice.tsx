/**
 * Ecran affiche quand le token du tableau de bord est absent ou faux.
 *
 * Auparavant les pages redirigeaient silencieusement vers l'accueil : on
 * cliquait sur /dashboard/suivi, on se retrouvait sur la home sans le moindre
 * message, ce qui ressemble a une panne. Un refus doit s'expliquer.
 */
export default function DashboardAccessNotice({ page }: { page: string }) {
  return (
    <section className="container-shell py-16">
      <div className="card-surface mx-auto max-w-2xl p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
          Accès privé
        </p>
        <h1 className="mt-3 font-display text-3xl text-brand-ink">
          Ce tableau de bord demande un jeton d&apos;accès.
        </h1>
        <p className="mt-4 text-base leading-8 text-brand-stone">
          La page <span className="font-semibold">{page}</span> n&apos;est pas publique. Elle
          s&apos;ouvre en ajoutant le jeton à l&apos;adresse :
        </p>
        <pre className="mt-4 overflow-x-auto rounded-[20px] border border-brand-teal/15 bg-brand-mint/30 p-4 text-sm text-brand-ink">
          {`https://www.skstalents.fr${page}?token=VOTRE_JETON`}
        </pre>
        <p className="mt-4 text-sm leading-7 text-brand-stone">
          Le jeton se trouve dans Vercel, section Settings puis Environment Variables, sous le nom{" "}
          <span className="font-semibold">DASHBOARD_PRIVATE_TOKEN</span>.
        </p>
        <p className="mt-4 text-sm leading-7 text-brand-stone">
          Ce n&apos;est pas une erreur du site : la page fonctionne, elle refuse simplement de
          s&apos;afficher sans authentification.
        </p>
      </div>
    </section>
  );
}
