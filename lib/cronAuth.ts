/**
 * Pure auth helper for cron-style endpoints.
 * Extracted so it can be unit-tested without booting Next.
 */
export type CronAuthEnv = {
  cronSecret?: string;
  dashboardToken?: string;
};

export type CronAuthInput = {
  authorization: string | null;
  userAgent: string | null;
  url: string;
  env: CronAuthEnv;
};

export function isAuthorizedCronRequest(input: CronAuthInput): boolean {
  const { authorization, userAgent, url, env } = input;

  // 1. Vercel Cron (Bearer CRON_SECRET) - always accepted when CRON_SECRET is set.
  if (env.cronSecret && authorization === `Bearer ${env.cronSecret}`) {
    return true;
  }

  // 2. Manual test (?token=DASHBOARD_PRIVATE_TOKEN).
  if (env.dashboardToken) {
    try {
      const parsed = new URL(url);
      if (parsed.searchParams.get("token") === env.dashboardToken) {
        return true;
      }
    } catch {
      // malformed URL - fall through
    }
  }

  // 3. Spoofable UA fallback only when CRON_SECRET is NOT configured.
  // Once CRON_SECRET is set, only Bearer auth is accepted.
  if (!env.cronSecret && userAgent && userAgent.includes("vercel-cron")) {
    return true;
  }

  return false;
}
