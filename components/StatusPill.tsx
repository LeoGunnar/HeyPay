import clsx from "clsx";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-rose-100 text-rose-700"
};

export default function StatusPill({ status }: { status: string }) {
  const key = status.toLowerCase();
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        STATUS_STYLES[key] ?? "bg-slate-200 text-slate-700"
      )}
    >
      {status}
    </span>
  );
}
