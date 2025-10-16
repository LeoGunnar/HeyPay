import { createServerClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = createServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <section className="rounded-2xl bg-white/80 p-8 shadow-sm backdrop-blur">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-teal">Profile settings</h1>
          <p className="text-sm text-slate-600">
            Update your display name and review your current access level.
          </p>
        </div>
      </header>
      <dl className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-brand-turquoise/20 bg-white p-4 shadow-sm">
          <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
          <dd className="text-lg font-medium text-slate-900">{user.email}</dd>
        </div>
        <div className="rounded-xl border border-brand-turquoise/20 bg-white p-4 shadow-sm">
          <dt className="text-xs uppercase tracking-wide text-slate-500">Role</dt>
          <dd className="text-lg font-medium capitalize text-slate-900">
            {(user.user_metadata?.role as string) ?? "agent"}
          </dd>
        </div>
      </dl>
      <p className="mt-8 text-sm text-slate-600">
        Profile updates are managed centrally in Supabase. Contact a Hey Iceland administrator if
        you need to change your role or display name.
      </p>
    </section>
  );
}
