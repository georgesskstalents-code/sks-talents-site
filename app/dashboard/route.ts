import { promises as fs } from "fs";
import path from "path";

function isAuthorized(request: Request) {
  const expectedToken = process.env.DASHBOARD_PRIVATE_TOKEN;

  if (!expectedToken) {
    return true;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  const headerToken = request.headers.get("x-dashboard-token");
  return queryToken === expectedToken || headerToken === expectedToken;
}

function cleanDashboardHtml(html: string) {
  return html
    .replace(/<style data-omelette-injected[\s\S]*?<\/style>/, "")
    .replace(/<script data-omelette-injected[\s\S]*?<\/script>/, "")
    .replace("</head>", '<base href="/dashboard/" />\n</head>');
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "public", "dashboard", "Dashboard.html");
  const html = await fs.readFile(filePath, "utf8");

  return new Response(cleanDashboardHtml(html), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
