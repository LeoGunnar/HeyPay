import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import type { UserRole } from "@/lib/auth";

export default async function AuthenticatedLayout({
  children
}: {
  children: ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = (user.user_metadata?.role ?? "agent") as UserRole;

  return (
    <div className="min-h-screen bg-brand-cream text-slate-900">
      <Header user={user} role={role} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 pb-12 pt-8">
        {children}
      </main>
    </div>
  );
}
