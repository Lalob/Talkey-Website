import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.talkeyco.com";
const ROOT_HOST = "talkeyco.com";
const CLIMAX_PUBLIC_PREFIX = "/climax";
const CLIMAX_INTERNAL_PREFIX = "/climax-route";
const CANONICAL_INTERNAL_ROUTES: Record<string, string> = {
  "/": "/inicio-route",
  "/ventas": "/ventas-route",
  "/soporte": "/soporte-route",
  "/manuales": "/manuales-route",
  "/es": "/locale-es-route",
  "/en": "/locale-en-route",
  "/it": "/locale-it-route",
};
const LEGACY_REDIRECTS: Record<string, string> = {
  "/IA": "/soporte",
  "/manualesdeuso": "/manuales",
};

function rewriteClimaxRoute(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== CLIMAX_PUBLIC_PREFIX && !pathname.startsWith(`${CLIMAX_PUBLIC_PREFIX}/`)) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = `${CLIMAX_INTERNAL_PREFIX}${pathname.slice(CLIMAX_PUBLIC_PREFIX.length)}`;

  return NextResponse.rewrite(url);
}

function redirectLegacyRoute(request: NextRequest) {
  const destination = LEGACY_REDIRECTS[request.nextUrl.pathname];

  if (!destination) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;

  return NextResponse.redirect(url, 308);
}

function rewriteCanonicalRoute(request: NextRequest) {
  const internalPath = CANONICAL_INTERNAL_ROUTES[request.nextUrl.pathname];

  if (!internalPath) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = internalPath;

  return NextResponse.rewrite(url);
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];

  if (host !== ROOT_HOST && host !== CANONICAL_HOST) {
    return NextResponse.next();
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.toLowerCase();
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");

  if (host === CANONICAL_HOST && protocol === "https") {
    const legacyRedirect = redirectLegacyRoute(request);
    if (legacyRedirect) {
      return legacyRedirect;
    }

    const canonicalRewrite = rewriteCanonicalRoute(request);
    if (canonicalRewrite) {
      return canonicalRewrite;
    }

    const climaxRewrite = rewriteClimaxRoute(request);
    if (climaxRewrite) {
      return climaxRewrite;
    }

    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.hostname = CANONICAL_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
