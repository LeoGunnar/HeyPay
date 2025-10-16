import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";
import { createMockSupabaseClient, isSupabaseConfigured } from "./mock";

export function createBrowserClient() {
  return isSupabaseConfigured
    ? createClientComponentClient<Database>()
    : createMockSupabaseClient();
}
