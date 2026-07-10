const PREFIX = "/davaterm";

const worker = {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" }
      });
    }

    const url = new URL(request.url);

    if (url.pathname === PREFIX) {
      url.pathname = `${PREFIX}/`;
      return Response.redirect(url.toString(), 308);
    }

    if (!url.pathname.startsWith(`${PREFIX}/`)) {
      return new Response("Not found", { status: 404 });
    }

    const assetUrl = new URL(request.url);
    const assetPath = url.pathname.slice(PREFIX.length) || "/";
    assetUrl.pathname = assetPath === "/" ? "/index.html" : assetPath;

    const response = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    return withSiteHeaders(response, assetUrl.pathname);
  }
};

export default worker;

function withSiteHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (pathname === "/index.html" || pathname.endsWith(".xml") || pathname.endsWith(".txt")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  } else {
    headers.set("Cache-Control", "public, max-age=3600");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
