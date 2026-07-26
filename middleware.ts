import { NextRequest, NextResponse } from "next/server";

const canonicalHost = "www.talkeyco.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const isProductionHost = host === "talkeyco.com" || host === canonicalHost;
  if (!isProductionHost) return NextResponse.next();

  if (host !== canonicalHost || forwardedProtocol === "http") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = canonicalHost;
    canonicalUrl.port = "";

    return NextResponse.redirect(canonicalUrl, 308);
  }

  const response = NextResponse.next();
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  if (request.method === "GET" && acceptsHtml) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
    response.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
