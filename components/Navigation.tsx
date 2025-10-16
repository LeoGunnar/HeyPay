"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { UserRole } from "@/lib/auth";

const LINKS = [
  { href: "/", label: "Overview", roles: ["agent", "admin"] as const },
  { href: "/admin", label: "Admin", roles: ["admin"] as const }
];

interface NavigationProps {
  role: UserRole;
}

export default function Navigation({ role }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="flex items-center gap-3">
        {LINKS.filter((link) => link.roles.includes(role)).map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-turquoise text-white shadow"
                    : "text-slate-700 hover:bg-brand-turquoise/10 hover:text-brand-teal"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
