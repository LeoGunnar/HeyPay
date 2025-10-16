"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import clsx from "clsx";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const initials = user.email?.slice(0, 2).toUpperCase() ?? "HI";
  const role = (user.user_metadata?.role as string) ?? "agent";
  const displayName = user.user_metadata?.full_name ?? user.email ?? "Teammate";
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!open) return;

      const target = event.target as Node;
      if (buttonRef.current?.contains(target)) {
        return;
      }
      if (menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (!open) return;
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        id="user-menu-button"
        className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-2 text-left shadow-sm transition hover:bg-white"
        onClick={() => setOpen((value) => !value)}
        ref={buttonRef}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-turquoise/90 text-sm font-semibold uppercase text-white">
          {initials}
        </span>
        <span className="hidden text-left md:block">
          <span className="block text-sm font-semibold text-slate-900">{displayName}</span>
          <span className="block text-xs capitalize text-slate-500">{role}</span>
        </span>
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-labelledby="user-menu-button"
          className="absolute right-0 mt-2 w-60 origin-top-right rounded-2xl border border-brand-turquoise/20 bg-white p-2 shadow-xl"
        >
          <Link
            href="/settings"
            role="menuitem"
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-turquoise/10 hover:text-brand-teal"
            onClick={() => setOpen(false)}
          >
            Profile settings
          </Link>
          <button
            type="button"
            role="menuitem"
            className={clsx(
              "mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition",
              pending ? "opacity-70" : "hover:bg-brand-orange/10 hover:text-brand-orange"
            )}
            onClick={() => {
              setOpen(false);
              startTransition(() => {
                void signOut();
              });
            }}
            disabled={pending}
          >
            Sign out
            {pending && <span className="text-xs text-slate-500">One moment…</span>}
          </button>
        </div>
      )}
    </div>
  );
}
