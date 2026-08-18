import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client. Used inside Server Components and Server
// Actions only — never import this from a Client Component.
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copy .env.local.example to .env.local and fill in your project values."
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
