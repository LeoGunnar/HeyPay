import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const mockAuth = {
  getUser: async () => ({ data: { user: null }, error: null }),
  getSession: async () => ({ data: { session: null }, error: null }),
  signOut: async () => ({ error: null }),
  signInWithOAuth: async () => ({ data: { user: null, session: null }, error: null }),
  exchangeCodeForSession: async () => ({ data: { session: null }, error: null })
};

function createMockQueryBuilder<T>() {
  return {
    select: () => ({
      order: async () => ({ data: [] as T[], error: null })
    })
  };
}

export function createMockSupabaseClient(): SupabaseClient<
  Database,
  "public",
  "public",
  Database["public"]
> {
  return {
    auth: mockAuth,
    from: () => createMockQueryBuilder<unknown>()
  } as unknown as SupabaseClient<Database, "public", "public", Database["public"]>;
}

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
