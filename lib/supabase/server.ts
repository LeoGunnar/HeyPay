import { cookies } from "next/headers";
import {
  createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient
} from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createMockSupabaseClient, isSupabaseConfigured } from "./mock";

type TypedSupabaseClient = SupabaseClient<
  Database,
  "public",
  "public",
  Database["public"]
>;

const getServerComponentClient = (): TypedSupabaseClient =>
  createServerComponentClient<Database>({ cookies }) as unknown as TypedSupabaseClient;

const getServerActionClient = (): TypedSupabaseClient =>
  createServerActionClient<Database>({ cookies }) as unknown as TypedSupabaseClient;

const getRouteHandlerClient = (): TypedSupabaseClient =>
  createRouteHandlerClient<Database>({ cookies }) as unknown as TypedSupabaseClient;

const getClient = (): TypedSupabaseClient =>
  isSupabaseConfigured ? getServerComponentClient() : createMockSupabaseClient();

export const createServerClient = (): TypedSupabaseClient => getClient();

export const createActionClient = (): TypedSupabaseClient =>
  isSupabaseConfigured ? getServerActionClient() : createMockSupabaseClient();

export const createRouteClient = (): TypedSupabaseClient =>
  isSupabaseConfigured ? getRouteHandlerClient() : createMockSupabaseClient();
