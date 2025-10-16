import EmptyState from "@/components/EmptyState";
import ProfilesTable from "@/components/ProfilesTable";
import { createServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const role = (user?.user_metadata?.role ?? "agent") as UserRole;

  if (role !== "admin") {
    redirect("/");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, updated_at")
    .order("full_name", { ascending: true });

  if (error) {
    console.error(error.message);
    return (
      <EmptyState
        title="We couldn't load the team"
        description="Check your Supabase policies or try again later."
        actionLabel="Go back"
        actionHref="/"
      />
    );
  }

  return <ProfilesTable profiles={data ?? []} />;
}
