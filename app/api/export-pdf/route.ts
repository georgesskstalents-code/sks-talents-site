export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const destination = new URL("/dashboard/print", url.origin);

  if (token) {
    destination.searchParams.set("token", token);
  }

  return Response.redirect(destination, 307);
}
