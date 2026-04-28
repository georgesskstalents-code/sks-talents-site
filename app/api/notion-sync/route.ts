import { noStoreJson } from "@/lib/requestSecurity";
import { hasNotionSyncConfig, syncNotionContent } from "@/lib/notion";

type SyncBody = {
  secret?: string;
  articleLimit?: number;
  roleLimit?: number;
  eventLimit?: number;
  schoolLimit?: number;
  referenceLimit?: number;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SyncBody;
  const expectedSecret = process.env.NOTION_CONTENT_SYNC_SECRET ?? "";

  if (!expectedSecret || body.secret !== expectedSecret) {
    return noStoreJson({ ok: false, message: "Notion sync unauthorized." }, 401);
  }

  if (!hasNotionSyncConfig()) {
    return noStoreJson(
      {
        ok: false,
        message:
          "Notion n'est pas encore branché. Ajoutez NOTION_TOKEN et soit NOTION_SITE_DATABASE_ID, soit les deux anciennes bases articles/job."
      },
      412
    );
  }

  try {
    const result = await syncNotionContent({
      articleLimit:
        typeof body.articleLimit === "number" && body.articleLimit >= 0 ? Math.min(body.articleLimit, 25) : 10,
      roleLimit:
        typeof body.roleLimit === "number" && body.roleLimit >= 0 ? Math.min(body.roleLimit, 40) : 20,
      eventLimit:
        typeof body.eventLimit === "number" && body.eventLimit >= 0 ? Math.min(body.eventLimit, 40) : 20,
      schoolLimit:
        typeof body.schoolLimit === "number" && body.schoolLimit >= 0 ? Math.min(body.schoolLimit, 60) : 30,
      referenceLimit:
        typeof body.referenceLimit === "number" && body.referenceLimit >= 0
          ? Math.min(body.referenceLimit, 40)
          : 20
    });

    return noStoreJson({
      ok: true,
      message: "Notion sync completed.",
      ...result
    });
  } catch (error) {
    return noStoreJson(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Notion sync failed."
      },
      500
    );
  }
}
