"use server";

import { redirect } from "next/navigation";
import { createActionClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = createActionClient();
  await supabase.auth.signOut();
  redirect("/login");
}
