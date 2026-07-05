import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.talkeyco.com";
const ROOT_HOST = "talkeyco.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];

  if (host !== ROOT_HOST && host !== CANONICAL_HOST) {
    return NextResponse.next();
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.toLowerCase();
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");

  if (host === CANONICAL_HOST && protocol === "https") {
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
