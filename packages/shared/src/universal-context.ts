import type { SupabaseClient } from '@supabase/supabase-js';

export type Platform = 'telegram' | 'vk';

export interface UniversalContext {
  platform: Platform;
  userId: number;
  peerId: number; // chatId в TG, peerId в VK
  text: string;
  isAdmin: boolean;
  db?: SupabaseClient;
  reply: (text: string) => Promise<void>;
  replyWithFile?: (buffer: Buffer, filename: string, caption?: string) => Promise<void>;
}
