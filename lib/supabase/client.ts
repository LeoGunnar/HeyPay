import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database";

export function createBrowserClient() {
  return createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
