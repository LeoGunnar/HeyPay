import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-brand-turquoise/40 bg-white/70 p-12 text-center shadow-sm backdrop-blur">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-brand-teal">{title}</h1>
        <p className="max-w-md text-sm text-slate-600">{description}</p>
      </div>
      <Link
        href={actionHref}
        className="rounded-full bg-brand-turquoise px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal"
      >
        {actionLabel}
      </Link>
    </section>
  );
}
