type JsonRecord = Record<string, unknown>;

async function postJson(url: string, payload: JsonRecord, extraHeaders?: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`POST ${url} failed with ${response.status}`);
  }
}

export async function persistFeedbackDurably(payload: JsonRecord) {
  const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const feedbackTable = process.env.SUPABASE_FEEDBACK_TABLE ?? "site_feedback";

  if (webhookUrl) {
    await postJson(webhookUrl, {
      source: "sks-talents-site-feedback",
      submittedAt: new Date().toISOString(),
      ...payload
    });
  }

  if (supabaseUrl && supabaseKey) {
    await postJson(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${feedbackTable}`, payload, {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal"
    });
  }
}

export async function persistLeadDurably(kind: string, payload: JsonRecord) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.SUPABASE_LEADS_TABLE ?? "lead_events";

  if (webhookUrl) {
    await postJson(webhookUrl, {
      source: "sks-talents-website",
      kind,
      submittedAt: new Date().toISOString(),
      ...payload
    });
  }

  if (supabaseUrl && supabaseKey) {
    await postJson(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${leadsTable}`,
      {
        kind,
        ...payload
      },
      {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal"
      }
    );
  }
}
