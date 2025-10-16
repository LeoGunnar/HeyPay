import type { ReactNode } from "react";

interface AuthHeroProps {
  children: ReactNode;
}

export default function AuthHero({ children }: AuthHeroProps) {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 rounded-3xl border border-brand-turquoise/20 bg-white/80 p-12 text-center shadow-2xl backdrop-blur">
      <div className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-turquoise/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-teal">
          Welcome to Hey Iceland
        </p>
        <h1 className="text-3xl font-semibold text-brand-teal sm:text-4xl">
          Sign in to manage bookings
        </h1>
        <p className="text-sm text-slate-600">
          Use your Microsoft account to access the Hey Iceland booking dashboard. Only authorised team
          members can view reservations and administer access.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
