interface ProfilesTableProps {
  profiles: Array<{
    id: string;
    full_name: string | null;
    email: string | null;
    role: string | null;
    updated_at: string | null;
  }>;
}

export default function ProfilesTable({ profiles }: ProfilesTableProps) {
  return (
    <section className="rounded-3xl border border-brand-turquoise/15 bg-white/80 p-8 shadow-sm backdrop-blur">
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold text-brand-teal">Team directory</h1>
        <p className="text-sm text-slate-600">
          Manage who can access Hey Iceland systems. Roles are synced with Supabase profiles.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-brand-turquoise/10">
        <table className="min-w-full divide-y divide-brand-turquoise/20 text-left text-sm">
          <thead className="bg-brand-turquoise/10 text-xs font-semibold uppercase tracking-wide text-brand-teal">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Last updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-turquoise/10 bg-white/70 text-slate-700">
            {profiles.map((profile) => (
              <tr key={profile.id} className="transition hover:bg-brand-turquoise/5">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {profile.full_name ?? "Unknown"}
                </td>
                <td className="px-6 py-4">{profile.email ?? "—"}</td>
                <td className="px-6 py-4 capitalize">{profile.role ?? "agent"}</td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {profile.updated_at ? new Date(profile.updated_at).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-sm text-slate-500">
                  No teammates have been synced yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
