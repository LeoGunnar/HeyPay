import { Suspense } from "react";
import AuthHero from "@/components/AuthHero";
import SignInButton from "@/components/SignInButton";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-cream via-white to-brand-turquoise/10 p-6">
      <AuthHero>
        <Suspense fallback={<span className="text-sm text-slate-500">Loading sign-in…</span>}>
          <SignInButton />
        </Suspense>
      </AuthHero>
    </div>
  );
}
