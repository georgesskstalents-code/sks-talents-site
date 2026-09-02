import type { ReactNode } from "react";

/**
 * Layout pass-through indispensable : Next.js n'installe la frontiere
 * `not-found.tsx` d'un segment que si ce segment possede un `layout`.
 * Sans ce fichier, `notFound()` remonte jusqu'a `app/not-found.tsx` et le
 * visiteur perd les suggestions de contenus proches.
 */
export default function SlugSegmentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
