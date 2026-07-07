import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Defense-in-depth session gate.
 *
 * This is NOT the primary authorization layer — pages and server actions still
 * call auth()/requireX() for real role checks. The Prisma adapter can't run on
 * the edge, so this middleware only checks for the presence of a session cookie
 * to catch routes that forget their own check: unauthenticated API calls get a
 * 401, unauthenticated page requests get bounced to the landing page.
 */

// Auth.js session cookie: "authjs.session-token" (dev) / "__Secure-authjs.session-token" (prod).
function hasSessionCookie(request: NextRequest): boolean {
  return (
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always-public: the landing page and the auth endpoints themselves.
  if (pathname === "/" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals and static asset files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|map)$).*)",
  ],
};
