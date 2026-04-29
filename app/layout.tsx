import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema, websiteSchema } from "@/lib/seo";

// Lazy-load non-critical widgets (defer ~500KB of JS off the critical path)
const Analytics = dynamic(() => import("@/components/Analytics"));
const PageViewTracker = dynamic(() => import("@/components/PageViewTracker"));
const FrontendErrorMonitor = dynamic(() => import("@/components/FrontendErrorMonitor"));
const StickyMobileCTA = dynamic(() => import("@/components/StickyMobileCTA"));
const SiteFeedbackPrompt = dynamic(() => import("@/components/SiteFeedbackPrompt"));
const CookieConsentBanner = dynamic(() => import("@/components/CookieConsentBanner"));
const CookiePreferencesLauncher = dynamic(() => import("@/components/CookiePreferencesLauncher"));
const ChatwootWidget = dynamic(() => import("@/components/ChatwootWidget"));
const SiteIntelligenceAgent = dynamic(() => import("@/components/SiteIntelligenceAgent"));

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
    "petfood talent acquisition",
    "recrutement sénégal life sciences",
    "recrutement côte d'ivoire healthtech",
    "recrutement bénin biotech",
    "médecine nucléaire france"
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
      <head>
        {/* Perf: pre-connect to third-parties used above the fold */}
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
      </head>
      <body className="min-h-screen font-sans text-brand-ink antialiased">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <Suspense fallback={null}>
          <FrontendErrorMonitor />
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
          <CookieConsentBanner />
          <CookiePreferencesLauncher />
          <ChatwootWidget />
          <SiteIntelligenceAgent externalOnly />
        </div>
      </body>
    </html>
  );
}
