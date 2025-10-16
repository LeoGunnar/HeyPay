import Link from "next/link";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import UserMenu from "@/components/UserMenu";
import type { UserRole } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export default function Header({ user, role }: { user: User; role: UserRole }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-turquoise/20 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
          </Link>
          <Navigation role={role} />
        </div>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
