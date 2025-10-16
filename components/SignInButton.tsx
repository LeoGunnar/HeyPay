"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function SignInButton() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  return (
    <button
      type="button"
      onClick={async () => {
        const supabase = createBrowserClient();
        const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
        await supabase.auth.signInWithOAuth({
          provider: "azure",
          options: {
            scopes: "email offline_access openid profile",
            redirectTo
          }
        });
      }}
      className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-turquoise px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-brand-teal"
    >
      <span>Continue with Microsoft</span>
      <span aria-hidden>→</span>
    </button>
  );
}
