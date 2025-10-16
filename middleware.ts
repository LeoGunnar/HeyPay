import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/mock";

const PROTECTED_PATHS = new Set(["/", "/admin", "/settings"]);

const AUTH_COOKIE_CANDIDATES = [
  "sb-access-token",
  "sb-refresh-token",
  "supabase-auth-token"
];

const hasSupabaseSessionCookie = (request: NextRequest): boolean => {
  const cookies = request.cookies;

  for (const name of AUTH_COOKIE_CANDIDATES) {
    if (cookies.has(name)) {
      return true;
    }
  }

  return cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token"));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  const isAuthenticated = hasSupabaseSessionCookie(request);

  if (!isAuthenticated && PROTECTED_PATHS.has(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && pathname === "/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin", "/settings", "/login"]
};
