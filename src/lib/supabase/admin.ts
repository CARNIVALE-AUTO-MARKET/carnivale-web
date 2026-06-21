import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { SUPABASE_URL } from "./env";

/**
 * Service-role client — SERVER ONLY (Stripe webhook marking payments paid).
 * Never import this into client components. Returns null if not configured.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!SUPABASE_URL || !serviceKey) return null;
  return createSupabaseClient<Database>(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
