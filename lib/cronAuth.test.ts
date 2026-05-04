import { describe, it, expect } from "vitest";
import { isAuthorizedCronRequest } from "./cronAuth";

const url = "https://www.skstalents.fr/api/cron/weekly-digest";

describe("isAuthorizedCronRequest", () => {
  it("accepts Bearer CRON_SECRET when secret is configured", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: "Bearer s3cret",
        userAgent: null,
        url,
        env: { cronSecret: "s3cret" }
      })
    ).toBe(true);
  });

  it("rejects wrong Bearer", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: "Bearer wrong",
        userAgent: null,
        url,
        env: { cronSecret: "s3cret" }
      })
    ).toBe(false);
  });

  it("accepts ?token=DASHBOARD_PRIVATE_TOKEN", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: null,
        userAgent: null,
        url: `${url}?token=dash-token`,
        env: { dashboardToken: "dash-token" }
      })
    ).toBe(true);
  });

  it("rejects wrong token", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: null,
        userAgent: null,
        url: `${url}?token=other`,
        env: { dashboardToken: "dash-token" }
      })
    ).toBe(false);
  });

  it("accepts vercel-cron UA when CRON_SECRET is NOT set (legacy fallback)", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: null,
        userAgent: "vercel-cron/1.0",
        url,
        env: {}
      })
    ).toBe(true);
  });

  it("REJECTS vercel-cron UA when CRON_SECRET IS set (UA fallback disabled)", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: null,
        userAgent: "vercel-cron/1.0",
        url,
        env: { cronSecret: "s3cret" }
      })
    ).toBe(false);
  });

  it("rejects unauthenticated request", () => {
    expect(
      isAuthorizedCronRequest({
        authorization: null,
        userAgent: "Mozilla/5.0",
        url,
        env: { cronSecret: "s3cret", dashboardToken: "dash" }
      })
    ).toBe(false);
  });
});
