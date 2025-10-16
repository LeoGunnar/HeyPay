"use client";

import { Fragment, useTransition } from "react";
import { Menu, Transition } from "@headlessui/react";
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

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-2 text-left shadow-sm transition hover:bg-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-turquoise/90 text-sm font-semibold uppercase text-white">
          {initials}
        </span>
        <span className="hidden text-left md:block">
          <span className="block text-sm font-semibold text-slate-900">{displayName}</span>
          <span className="block text-xs capitalize text-slate-500">{role}</span>
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right rounded-2xl border border-brand-turquoise/20 bg-white p-2 shadow-xl focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/settings"
                className={clsx(
                  "block rounded-xl px-4 py-3 text-sm font-medium text-slate-700",
                  active && "bg-brand-turquoise/10 text-brand-teal"
                )}
              >
                Profile settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={clsx(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium",
                  active ? "bg-brand-orange/10 text-brand-orange" : "text-slate-700"
                )}
                onClick={() => {
                  startTransition(() => {
                    void signOut();
                  });
                }}
                disabled={pending}
              >
                Sign out
                {pending && <span className="text-xs text-slate-500">One moment…</span>}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
