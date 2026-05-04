import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const tmpDir = `/tmp/sks-test-${Date.now()}-${Math.random().toString(36).slice(2)}`;

beforeEach(() => {
  vi.resetModules();
  process.env.SITE_ANALYTICS_LOG_PATH = `${tmpDir}/analytics.jsonl`;
  process.env.SITE_LEAD_LOG_PATH = `${tmpDir}/leads.jsonl`;
});

afterEach(() => {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  vi.restoreAllMocks();
});

describe("appendSiteAnalyticsLog — Supabase no-op when env empty", () => {
  it("writes to filesystem only and never calls fetch when SUPABASE env is unset", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const mod = await import("./siteIntelligence");
    await mod.appendSiteAnalyticsLog({
      type: "pageview",
      path: "/",
      createdAt: new Date().toISOString()
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("appendSiteAnalyticsLog — Supabase enabled", () => {
  it("posts to Supabase REST when SUPABASE_URL + KEY are set", async () => {
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(null, { status: 201 })
    );
    vi.stubGlobal("fetch", fetchMock);

    const mod = await import("./siteIntelligence");
    await mod.appendSiteAnalyticsLog({
      type: "pageview",
      path: "/test",
      createdAt: "2026-05-04T10:00:00.000Z"
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [calledUrl, calledInit] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe("https://test.supabase.co/rest/v1/site_analytics");
    expect(calledInit.method).toBe("POST");
    expect(calledInit.headers.apikey).toBe("test-key");
    expect(calledInit.headers.Authorization).toBe("Bearer test-key");
    expect(JSON.parse(calledInit.body)).toMatchObject({
      type: "pageview",
      path: "/test"
    });
  });
});

describe("appendLeadEventLog — Supabase enabled", () => {
  it("posts to lead_events table", async () => {
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(null, { status: 201 })
    );
    vi.stubGlobal("fetch", fetchMock);

    const mod = await import("./siteIntelligence");
    await mod.appendLeadEventLog({
      kind: "callback-request",
      pagePath: "/contact",
      email: "test@example.com",
      createdAt: "2026-05-04T10:00:00.000Z"
    });

    const [calledUrl] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe("https://test.supabase.co/rest/v1/lead_events");
  });
});

describe("appendSiteAnalyticsLog — does not throw if Supabase fails", () => {
  it("swallows Supabase errors so the lead path still completes", async () => {
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const mod = await import("./siteIntelligence");
    await expect(
      mod.appendSiteAnalyticsLog({
        type: "pageview",
        path: "/",
        createdAt: new Date().toISOString()
      })
    ).resolves.not.toThrow();
  });
});
