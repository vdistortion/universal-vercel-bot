import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) {
      throw new Error(
        `Supabase env vars missing! SUPABASE_URL=${url}, SUPABASE_KEY=${key ? '***' : 'undefined'}`,
      );
    }

    client = createClient(url, key, {
      auth: {
        persistSession: false, // На сервере сессия не нужна
        autoRefreshToken: false,
      },
    });
  }
  return client;
}
