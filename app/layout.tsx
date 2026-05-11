import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { getApprovedKeywords } from "@/lib/seoKeywords";

// Fonts:
// - Keep production-safe builds in network-restricted environments by avoiding `next/font/google`,
//   which fetches fonts at build time.
// - Load fonts at runtime via Google Fonts CSS, and bind Tailwind’s font tokens via CSS variables
//   defined in app/globals.css (:root --font-sans / --font-display).

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
const CalendlyStickyFab = dynamic(() => import("@/components/CalendlyStickyFab"));

const baseKeywords = [
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
];

/**
 * Async metadata - merges the static base keywords with the operator-approved
 * keywords coming from Supabase (table seo_keyword_proposals, status='approved').
 * No-op for the dynamic part if Supabase env is not configured.
 */
export async function generateMetadata(): Promise<Metadata> {
  let approved: string[] = [];
  try {
    approved = await getApprovedKeywords();
  } catch {
    /* Supabase not reachable - fall back to base keywords only */
  }
  const keywords = Array.from(new Set([...baseKeywords, ...approved]));

  return {
    metadataBase: new URL("https://www.skstalents.fr"),
    title: {
      default: "SKS TALENTS | Executive Search Life Sciences & Santé animale",
      template: "%s | SKS TALENTS"
    },
    description:
      "Cabinet d'executive search et structuration RH dédié aux Life Sciences & Santé animale (biotech, diagnostic, medtech, vétérinaire, petfood). Recrutement Série A, Série B, scale-up - décisions COMEX, digitalisation RH et automatisation des tâches à faible valeur ajoutée.",
    keywords,
    openGraph: {
      title: "SKS TALENTS - Executive Search Life Sciences & Santé animale",
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
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Perf: pre-connect to third-parties used above the fold */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
        />
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        {/* RSS auto-discovery - picked up by Google News, LLM crawlers, feed readers */}
        <link rel="alternate" type="application/rss+xml" title="SKS TALENTS - Articles" href="/feed.xml" />
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
          <CalendlyStickyFab />
        </div>
      </body>
    </html>
  );
}
