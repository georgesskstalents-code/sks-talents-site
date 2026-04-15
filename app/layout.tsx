import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteFeedbackPrompt from "@/components/SiteFeedbackPrompt";
import SiteIntelligenceAgent from "@/components/SiteIntelligenceAgent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageViewTracker from "@/components/PageViewTracker";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skstalents.fr"),
  title: {
    default: "SKS TALENTS | Recrutement Life Sciences & Animal Health",
    template: "%s | SKS TALENTS"
  },
  description:
    "Cabinet de recrutement et structuration RH dédié aux Life Sciences, au diagnostic, à la santé animale et au petfood premium.",
  keywords: [
    "recrutement life sciences",
    "executive search biotech",
    "structuration RH",
    "recrutement vétérinaire",
    "diagnostic hiring",
    "petfood talent acquisition"
  ],
  openGraph: {
    title: "SKS TALENTS",
    description:
      "Scaling teams without losing soul dans les Life Sciences et l'Animal Health.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.skstalents.fr"
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen font-sans text-brand-ink antialiased">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <div className="relative overflow-hidden">
          <Header />
          <main className="pb-24 md:pb-0">{children}</main>
          <Footer />
          <StickyMobileCTA />
          <SiteFeedbackPrompt />
          <SiteIntelligenceAgent />
        </div>
      </body>
    </html>
  );
}
