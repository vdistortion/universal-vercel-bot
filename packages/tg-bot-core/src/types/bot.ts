import type { Context as GrammyContext, SessionFlavor } from 'grammy';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface SessionData {
  // Здесь будут общие данные сессии, например:
  // userId: number;
  // language: 'ru' | 'en';
}

// Расширяем контекст gramgrammy
export interface BotContext extends GrammyContext, SessionFlavor<SessionData> {
  // Можно добавить свои поля
  db: SupabaseClient;
}
