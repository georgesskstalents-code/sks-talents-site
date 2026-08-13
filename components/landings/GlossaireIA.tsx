import { Bot } from "lucide-react";

export default function GlossaireIA() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-brand-teal/15 bg-brand-mint/20 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint/70 to-brand-mint/40 text-brand-teal">
              <Bot size={22} />
            </span>
            <div>
              <p className="t-h3 font-semibold text-brand-ink">Un assistant IA, c&apos;est quoi ?</p>
              <p className="mt-3 t-body">
                Un assistant virtuel dédié à une fonction précise de votre équipe (RH, board,
                pilotage, juridique, planning…). Il travaille avec vos collaborateurs pour éliminer
                les tâches répétitives et leur redonner du temps sur ce qui compte vraiment.
              </p>
              <p className="mt-2 text-caption text-brand-stone">
                Aussi appelé <span className="italic">agent IA</span> dans notre méthodologie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
