"use client";

import { Languages, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SiteLanguage = "fr" | "en";

type TextEntry = {
  node: Text;
  original: string;
  leading: string;
  trailing: string;
};

type SiteTranslateResponse = {
  ok: boolean;
  translations?: Record<string, string>;
  message?: string;
};

const STORAGE_KEY = "sks-site-language";
const CACHE_PREFIX = "sks-page-translation-v3";
const LEGACY_CACHE_PREFIXES = [
  "sks-page-translation:",
  "sks-page-translation-v2:"
];
const CACHE_CLEANUP_KEY = "sks-page-translation-cache-cleaned-v3";
const translationMemoryCache = new Map<string, Record<string, string>>();
const translationRequestCache = new Map<string, Promise<Record<string, string>>>();

function persistPreferredLanguage(language: SiteLanguage) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
}

function readPreferredLanguage(searchLanguage: string | null): SiteLanguage {
  if (searchLanguage === "en" || searchLanguage === "fr") {
    return searchLanguage;
  }

  if (typeof window === "undefined") {
    return "fr";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === "en" ? "en" : "fr";
}

function buildSearchHref(
  pathname: string,
  searchParams: URLSearchParams,
  language: SiteLanguage
) {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.set("lang", language);
  const queryString = nextParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

function looksTranslatable(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 2 || trimmed.length > 320) {
    return false;
  }

  return /[\p{L}]/u.test(trimmed);
}

// Note (2026-05-07): the previous implementation skipped text inside parents
// with display:none / visibility:hidden — but mobile drawers, accordions,
// and modals are exactly that. So when a user opened a drawer in EN mode,
// the text inside was never captured during the initial collect, leading to
// untranslated zones until the MutationObserver kicked in (~250ms delay).
// We now include hidden text upfront so it's part of the cache from request 1.
function collectTranslatableTextNodes() {
  const entries: TextEntry[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;

    if (!parent) {
      continue;
    }

    if (
      parent.closest(
        [
          "[data-site-language-selector]",
          "[data-no-translate]",
          "script",
          "style",
          "noscript",
          "iframe",
          "svg",
          "canvas",
          "textarea",
          "input",
          "select",
          "option",
          "code",
          "pre"
        ].join(",")
      )
    ) {
      continue;
    }

    const rawValue = node.textContent ?? "";
    if (!looksTranslatable(rawValue)) {
      continue;
    }

    const leading = rawValue.match(/^\s*/)?.[0] ?? "";
    const trailing = rawValue.match(/\s*$/)?.[0] ?? "";

    entries.push({
      node,
      original: rawValue.trim(),
      leading,
      trailing
    });
  }

  return entries;
}

function getCacheKey(pathname: string) {
  return `${CACHE_PREFIX}:${pathname}:en`;
}

function getUniqueTexts(entries: TextEntry[]) {
  return Array.from(new Set(entries.map((entry) => entry.original)));
}

function readCachedTranslations(pathname: string) {
  const cacheKey = getCacheKey(pathname);
  const memoryValue = translationMemoryCache.get(cacheKey);
  if (memoryValue) {
    return memoryValue;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const cachedValue = window.localStorage.getItem(cacheKey);
  if (!cachedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(cachedValue) as Record<string, string>;
    translationMemoryCache.set(cacheKey, parsed);
    return parsed;
  } catch {
    window.localStorage.removeItem(cacheKey);
    return null;
  }
}

function storeCachedTranslations(pathname: string, translations: Record<string, string>) {
  const cacheKey = getCacheKey(pathname);
  translationMemoryCache.set(cacheKey, translations);

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(translations));
  } catch {
    // Ignore storage quota issues and keep the in-memory cache.
  }
}

function cleanupLegacyTranslationCache() {
  if (typeof window === "undefined") {
    return;
  }

  if (window.sessionStorage.getItem(CACHE_CLEANUP_KEY) === "done") {
    return;
  }

  for (let index = window.sessionStorage.length - 1; index >= 0; index -= 1) {
    const key = window.sessionStorage.key(index);
    if (key && LEGACY_CACHE_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      window.sessionStorage.removeItem(key);
    }
  }

  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index);
    if (key && LEGACY_CACHE_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      window.localStorage.removeItem(key);
    }
  }

  window.sessionStorage.setItem(CACHE_CLEANUP_KEY, "done");
}

async function requestPageTranslations(pathname: string, texts: string[]) {
  const cachedTranslations = readCachedTranslations(pathname);
  if (cachedTranslations) {
    return cachedTranslations;
  }

  const cacheKey = getCacheKey(pathname);
  const pendingRequest = translationRequestCache.get(cacheKey);
  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetch("/api/site-translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      texts,
      sourceLanguage: "fr",
      targetLanguage: "en",
      path: pathname
    })
  })
    .then(async (response) => {
      const payload = (await response.json()) as SiteTranslateResponse;
      if (!response.ok || !payload.ok || !payload.translations) {
        throw new Error(payload.message ?? "Translation failed.");
      }

      storeCachedTranslations(pathname, payload.translations);
      return payload.translations;
    })
    .finally(() => {
      translationRequestCache.delete(cacheKey);
    });

  translationRequestCache.set(cacheKey, request);
  return request;
}

function applyTranslations(entries: TextEntry[], translations: Record<string, string>) {
  for (const entry of entries) {
    const translatedValue = translations[entry.original];
    if (!translatedValue) {
      continue;
    }

    entry.node.textContent = `${entry.leading}${translatedValue}${entry.trailing}`;
  }
}

function warmTranslationCache(pathname: string) {
  if (typeof window === "undefined") {
    return;
  }

  // Fire fast (50ms after mount) so the EN switch feels instant on first click.
  // Was previously requestIdleCallback with 1200ms timeout — caused 1-3s delays on /orientation.
  window.setTimeout(() => {
    if (readCachedTranslations(pathname)) {
      return;
    }

    const entries = collectTranslatableTextNodes();
    if (entries.length === 0) {
      return;
    }

    void requestPageTranslations(pathname, getUniqueTexts(entries)).catch(() => {
      // Ignore background prefetch failures; the on-demand translation flow remains available.
    });
  }, 50);
}

function restoreFrenchText(pathname: string) {
  const translations = readCachedTranslations(pathname);
  if (!translations) {
    return false;
  }

  const inverseMap: Record<string, string> = {};
  for (const [fr, en] of Object.entries(translations)) {
    if (en && fr && !(en in inverseMap)) {
      inverseMap[en] = fr;
    }
  }

  const entries = collectTranslatableTextNodes();
  for (const entry of entries) {
    const frOriginal = inverseMap[entry.original];
    if (frOriginal && frOriginal !== entry.original) {
      entry.node.textContent = `${entry.leading}${frOriginal}${entry.trailing}`;
    }
  }

  document.documentElement.lang = "fr";
  delete document.documentElement.dataset.sksTranslatedPath;
  return true;
}

async function translateCurrentPage(pathname: string, allowNetwork = true) {
  const entries = collectTranslatableTextNodes();
  if (entries.length === 0) {
    document.documentElement.lang = "en";
    document.documentElement.dataset.sksTranslatedPath = pathname;
    return true;
  }

  const uniqueTexts = getUniqueTexts(entries);
  let translations = readCachedTranslations(pathname);

  if (!translations) {
    if (!allowNetwork) {
      return false;
    }

    translations = await requestPageTranslations(pathname, uniqueTexts);
  } else if (allowNetwork) {
    const missing = uniqueTexts.filter((text) => !(text in translations!));
    if (missing.length > 0) {
      const fresh = await fetchTranslationsForTexts(pathname, missing);
      translations = { ...translations, ...fresh };
      storeCachedTranslations(pathname, translations);
    }
  }

  applyTranslations(entries, translations);
  document.documentElement.lang = "en";
  document.documentElement.dataset.sksTranslatedPath = pathname;
  return true;
}

async function fetchTranslationsForTexts(pathname: string, texts: string[]) {
  if (texts.length === 0) return {} as Record<string, string>;
  const response = await fetch("/api/site-translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      texts,
      sourceLanguage: "fr",
      targetLanguage: "en",
      path: pathname
    })
  });
  const payload = (await response.json()) as SiteTranslateResponse;
  if (!response.ok || !payload.ok || !payload.translations) {
    throw new Error(payload.message ?? "Translation failed.");
  }
  return payload.translations;
}

export default function SiteLanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const rawSearchParams = useSearchParams();
  const searchParams = useMemo(
    () => new URLSearchParams(rawSearchParams?.toString() ?? ""),
    [rawSearchParams]
  );
  const [preferredLanguage, setPreferredLanguage] = useState<SiteLanguage>(() =>
    readPreferredLanguage(rawSearchParams?.get("lang") ?? null)
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setPreferredLanguage(readPreferredLanguage(rawSearchParams?.get("lang") ?? null));
  }, [rawSearchParams]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    cleanupLegacyTranslationCache();

    const activePath = pathname ?? window.location.pathname;

    if (activePath !== "/search") {
      warmTranslationCache(activePath);
    }

    if (activePath === "/search") {
      const currentLang = searchParams.get("lang");
      if (currentLang !== preferredLanguage) {
        router.replace(buildSearchHref(activePath, searchParams, preferredLanguage), {
          scroll: false
        });
      }
      return;
    }

    if (preferredLanguage !== "en") {
      document.documentElement.lang = "fr";
      delete document.documentElement.dataset.sksTranslatedPath;
      return;
    }

    if (
      document.documentElement.dataset.sksTranslatedPath &&
      document.documentElement.dataset.sksTranslatedPath !== activePath
    ) {
      window.location.reload();
      return;
    }

    let observer: MutationObserver | null = null;
    let observerTimeout: number | null = null;
    let isApplyingTranslation = false;

    const scheduleObserverSweep = () => {
      if (observerTimeout !== null) {
        window.clearTimeout(observerTimeout);
      }
      // Throttle reduced 250ms → 80ms so newly-revealed content (drawer opening,
      // accordion expanding, modal appearing) gets translated almost instantly
      // when the cache already has the strings. Larger network round-trips
      // are still gated by `isApplyingTranslation` so we don't pile up requests.
      observerTimeout = window.setTimeout(() => {
        observerTimeout = null;
        if (isApplyingTranslation) return;
        isApplyingTranslation = true;
        translateCurrentPage(activePath)
          .catch((error) => {
            if (process.env.NODE_ENV !== "production") console.error("Site translation observer error", error);
          })
          .finally(() => {
            isApplyingTranslation = false;
          });
      }, 80);
    };

    const startObserver = () => {
      if (typeof MutationObserver === "undefined") return;
      observer = new MutationObserver((mutations) => {
        if (isApplyingTranslation) return;
        const hasContentChange = mutations.some((mutation) => {
          if (mutation.type === "characterData") return true;
          if (mutation.type === "childList") {
            return mutation.addedNodes.length > 0;
          }
          return false;
        });
        if (hasContentChange) {
          scheduleObserverSweep();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    };

    if (document.documentElement.dataset.sksTranslatedPath === activePath || isTranslating) {
      startObserver();
      return () => {
        observer?.disconnect();
        if (observerTimeout !== null) window.clearTimeout(observerTimeout);
      };
    }

    const runInitialTranslation = async () => {
      if (readCachedTranslations(activePath)) {
        await translateCurrentPage(activePath, true).catch((error) => {
          if (process.env.NODE_ENV !== "production") console.error("Site translation error", error);
        });
      } else {
        setIsTranslating(true);
        await translateCurrentPage(activePath)
          .catch((error) => {
            if (process.env.NODE_ENV !== "production") console.error("Site translation error", error);
          })
          .finally(() => {
            setIsTranslating(false);
          });
      }
      startObserver();
    };

    void runInitialTranslation();

    return () => {
      observer?.disconnect();
      if (observerTimeout !== null) window.clearTimeout(observerTimeout);
    };
  }, [isTranslating, pathname, preferredLanguage, router, searchParams]);

  const handleLanguageChange = (language: SiteLanguage) => {
    const activePath = pathname ?? window.location.pathname;
    persistPreferredLanguage(language);
    setPreferredLanguage(language);

    if (activePath === "/search") {
      router.replace(buildSearchHref(activePath, searchParams, language), {
        scroll: false
      });
      return;
    }

    if (language === "fr") {
      // Try instant restore from cached EN→FR inverse map. Fall back to reload only if cache lost.
      if (!restoreFrenchText(activePath)) {
        window.location.reload();
      }
      return;
    }

    if (document.documentElement.dataset.sksTranslatedPath === activePath || isTranslating) {
      return;
    }

    if (readCachedTranslations(activePath)) {
      void translateCurrentPage(activePath, false).catch((error) => {
        if (process.env.NODE_ENV !== "production") console.error("Site translation error", error);
      });
      return;
    }

    setIsTranslating(true);
    translateCurrentPage(activePath)
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") console.error("Site translation error", error);
      })
      .finally(() => {
        setIsTranslating(false);
      });
  };

  return (
    <div className="relative shrink-0">
      <div
        className="inline-flex items-center gap-0.5 rounded-full border border-brand-teal/20 bg-white/90 p-0.5 shadow-soft backdrop-blur sm:gap-1 sm:p-1"
        aria-label="Sélecteur de langue du site"
        data-site-language-selector="true"
      >
        {/* Icon shown only on tablet+ (mobile keeps the bar compact so the hamburger never overflows). */}
        <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-mint text-brand-teal sm:inline-flex">
          {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
        </span>
        <button
          type="button"
          onClick={() => handleLanguageChange("fr")}
          className={`rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition sm:px-3 sm:py-2 sm:tracking-[0.18em] ${
            preferredLanguage === "fr"
              ? "bg-brand-teal text-white"
              : "text-brand-stone hover:bg-brand-mint"
          }`}
          aria-pressed={preferredLanguage === "fr"}
          title="Version française du site"
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => handleLanguageChange("en")}
          className={`rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition sm:px-3 sm:py-2 sm:tracking-[0.18em] ${
            preferredLanguage === "en"
              ? "bg-brand-teal text-white"
              : "text-brand-stone hover:bg-brand-mint"
          }`}
          aria-pressed={preferredLanguage === "en"}
          title="English translation of the site"
        >
          EN
        </button>
      </div>
    </div>
  );
}
