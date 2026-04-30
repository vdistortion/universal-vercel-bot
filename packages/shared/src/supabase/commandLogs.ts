import { getSupabaseClient } from './client.js';
import type { Platform } from '../universal-context';

export async function logCommand(
  dbUserId: number,
  platform: Platform,
  command: string,
): Promise<void> {
  const db = getSupabaseClient();

  const { error } = await db.from('command_logs').insert({
    user_id: dbUserId,
    platform,
    command,
  });

  if (error) {
    console.error('Error logging command:', error);
  }
}
