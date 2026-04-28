import Image from "next/image";
import ContentResourcesPrompt from "@/components/ContentResourcesPrompt";

type ContentPageSignatureProps = {
  title?: string;
  description?: string;
};

export default function ContentPageSignature({
  title = "SKS Talents",
  description = "Contenu édité par SKS TALENTS pour relier signaux marché, recrutement, structuration d’équipe et décisions de croissance."
}: ContentPageSignatureProps) {
  return (
    <>
      <section className="container-shell py-4">
        <div className="card-surface overflow-hidden p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                Signature éditoriale
              </p>
              <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">{title}</h2>
              <p className="max-w-2xl text-base leading-8 text-brand-stone">{description}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-ink/60">
                Your Talents, Our Future
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="relative h-24 w-full max-w-[320px] sm:h-28 sm:max-w-[360px]">
                <Image
                  src="/brand/logo-sks-talents-signature.svg"
                  alt="Logo SKS Talents Your Talents, Our Future"
                  fill
                  className="object-contain object-right-bottom"
                  sizes="(max-width: 768px) 260px, 360px"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContentResourcesPrompt />
    </>
  );
}
