import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema, websiteSchema } from "@/lib/seo";

// Web fonts: Inter (sans, 9 weights) for body + UI, Instrument Serif (regular + italic)
// for editorial display headings. Loaded via next/font/google → preload, no FOIT,
// identical rendering across all OS (replaces the Apple-only Avenir Next + Iowan Old Style).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

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
const MobileTrustpilotPrompt = dynamic(() => import("@/components/MobileTrustpilotPrompt"));

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skstalents.fr"),
  title: {
    default: "SKS TALENTS | Executive Search Life Sciences & Santé animale",
    template: "%s | SKS TALENTS"
  },
  description:
    "Cabinet d'executive search et structuration RH dédié aux Life Sciences & Santé animale (biotech, diagnostic, medtech, vétérinaire, petfood). Recrutement Série A, Série B, scale-up — décisions COMEX, digitalisation RH et automatisation des tâches à faible valeur ajoutée.",
  keywords: [
    "executive search Life Sciences",
    "executive search Santé animale",
    "recrutement biotech Série A",
    "recrutement biotech Série B",
    "recrutement scale-up Life Sciences",
    "recrutement COMEX biotech",
    "structuration RH digitalisation",
    "automatisation tâches RH",
    "executive search diagnostic",
    "executive search medtech",
    "recrutement vétérinaire dirigeant",
    "recrutement petfood direction",
    "talent acquisition Life Sciences",
    "RPO biotech",
    "stratégie RH humain projets Life Sciences"
  ],
  openGraph: {
    title: "SKS TALENTS — Executive Search Life Sciences & Santé animale",
    description:
      "Recrutement Série A, Série B et scale-up en biotech, diagnostic, medtech, vétérinaire, petfood. Structuration RH par la digitalisation. Décisions COMEX, stratégie et humain.",
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
    <html lang="fr" className={`${inter.variable} ${instrumentSerif.variable}`}>
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
          <MobileTrustpilotPrompt />
        </div>
      </body>
    </html>
  );
}
