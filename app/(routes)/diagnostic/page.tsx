import ContentPageSignature from "@/components/ContentPageSignature";
import PageHero from "@/components/PageHero";
import RecruitmentGrowthDiagnostic from "@/components/RecruitmentGrowthDiagnostic";

export const metadata = {
  title: "Diagnostic recrutement & croissance | SKS TALENTS",
  description:
    "5 questions simples pour savoir si votre recrutement, votre structuration RH ou vos process ralentissent votre croissance.",
  alternates: {
    canonical: "https://www.skstalents.fr/diagnostic"
  }
};

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        kicker="Diagnostic"
        title="Votre recrutement est-il un frein à votre croissance ?"
        description="Un diagnostic simple, utile et non agressif : 5 questions, un résultat immédiat, 3 priorités concrètes et une proposition d’échange si vous voulez aller plus loin."
        variant="sand"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Diagnostic" }
        ]}
      />

      <section className="container-shell -mt-4 pb-6 sm:pb-8">
        <div className="card-surface p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Ce que cela repère",
                description:
                  "Le vrai point de blocage : sourcing, vitesse de décision, structuration RH, onboarding ou surcharge opérationnelle."
              },
              {
                title: "Ce que cela évite",
                description:
                  "Un recrutement traité comme un sujet RH isolé, alors qu’il impacte directement le temps dirigeant, la performance et la croissance."
              },
              {
                title: "Ce que cela déclenche",
                description:
                  "Une lecture plus claire de la meilleure trajectoire : executive search, RPO, structuration RH ou automatisation utile."
              }
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-brand-teal/10 bg-brand-mint/25 px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-stone">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-10 sm:pb-14">
        <RecruitmentGrowthDiagnostic />
      </section>

      <ContentPageSignature description="Diagnostic édité par SKS TALENTS pour transformer un problème business flou en lecture actionnable, puis en échange utile." />
    </>
  );
}
