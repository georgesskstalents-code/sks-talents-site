"use client";

import { useEffect } from "react";

type SearchTrackingBeaconProps = {
  query: string;
  resultCount: number;
  topResults: string[];
};

export default function SearchTrackingBeacon({
  query,
  resultCount,
  topResults
}: SearchTrackingBeaconProps) {
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    void fetch("/api/site-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        resultCount,
        topResults
      }),
      keepalive: true
    }).catch(() => undefined);
  }, [query, resultCount, topResults]);

  return null;
}
