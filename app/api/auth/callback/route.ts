import { NextResponse, type NextRequest } from "next/server";
import { createRouteClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/mock";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code && isSupabaseConfigured) {
    const supabase = createRouteClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  const response = NextResponse.redirect(new URL(next, request.url));
  return response;
}
