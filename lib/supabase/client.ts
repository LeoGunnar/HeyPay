import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";

export function createBrowserClient() {
  return createSupabaseBrowserClient<Database>();
}
