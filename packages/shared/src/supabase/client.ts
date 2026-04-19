import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) {
      throw new Error(
        `Supabase env vars missing! SUPABASE_URL=${url}, SUPABASE_KEY=${key ? '***' : 'undefined'}`,
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}
