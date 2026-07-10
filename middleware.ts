import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.talkeyco.com";
const ROOT_HOST = "talkeyco.com";
const CLIMAX_PUBLIC_PREFIX = "/climax";
const CLIMAX_INTERNAL_PREFIX = "/climax-route";
const VENTAS_PUBLIC_PREFIX = "/ventas";
const VENTAS_INTERNAL_PREFIX = "/ventas-route";
const LOCALE_INTERNAL_ROUTES: Record<string, string> = {
  "/es": "/locale-es-route",
  "/en": "/locale-en-route",
  "/it": "/locale-it-route",
};

function redirectRootToVentas(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = VENTAS_PUBLIC_PREFIX;

  return NextResponse.redirect(url, 307);
}

function rewriteClimaxRoute(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== CLIMAX_PUBLIC_PREFIX && !pathname.startsWith(`${CLIMAX_PUBLIC_PREFIX}/`)) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = `${CLIMAX_INTERNAL_PREFIX}${pathname.slice(CLIMAX_PUBLIC_PREFIX.length)}`;

  return NextResponse.rewrite(url);
}

function rewriteVentasRoute(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== VENTAS_PUBLIC_PREFIX && !pathname.startsWith(`${VENTAS_PUBLIC_PREFIX}/`)) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = `${VENTAS_INTERNAL_PREFIX}${pathname.slice(VENTAS_PUBLIC_PREFIX.length)}`;

  return NextResponse.rewrite(url);
}

function rewriteLocaleRoute(request: NextRequest) {
  const internalPath = LOCALE_INTERNAL_ROUTES[request.nextUrl.pathname];

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
    const ventasRedirect = redirectRootToVentas(request);
    if (ventasRedirect) {
      return ventasRedirect;
    }

    const localeRewrite = rewriteLocaleRoute(request);
    if (localeRewrite) {
      return localeRewrite;
    }

    const climaxRewrite = rewriteClimaxRoute(request);
    if (climaxRewrite) {
      return climaxRewrite;
    }

    const ventasRewrite = rewriteVentasRoute(request);
    if (ventasRewrite) {
      return ventasRewrite;
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
