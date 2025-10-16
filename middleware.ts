import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";
import { isSupabaseConfigured } from "@/lib/supabase/mock";

const PROTECTED_PATHS = new Set(["/", "/admin", "/settings"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && PROTECTED_PATHS.has(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && pathname === "/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/", "/admin", "/settings", "/login"]
};
