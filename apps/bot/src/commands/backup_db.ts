import type { UniversalContext } from '@scope/shared';
import { escapeMarkdownV2 } from '../utils/markdown';

export async function backupDbCommand(ctx: UniversalContext): Promise<void> {
  if (!ctx.isAdmin) {
    await ctx.reply('⛔ У вас нет прав для выполнения этой команды.');
    return;
  }

  // Если replyWithFile не поддерживается (например, VK), сообщаем об этом
  if (!ctx.replyWithFile) {
    await ctx.reply('❌ Отправка файлов бэкапа не поддерживается на этой платформе.');
    return;
  }

  if (!ctx.db) {
    await ctx.reply('❌ База данных недоступна.');
    return;
  }

  try {
    await ctx.reply('⏳ Запускаю создание бэкапа...');
    const { data, error } = await ctx.db.from('bot_content').select('*');
    if (error) throw error;

    if (!data || data.length === 0) {
      await ctx.reply('База данных `bot_content` пуста.');
      return;
    }

    const filename = `bot_content_backup_${new Date().toISOString()}.json`;
    const buffer = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');

    // Здесь мы уверены, что ctx.replyWithFile существует
    await ctx.replyWithFile(buffer, filename, escapeMarkdownV2('Вот ваш бэкап 💾'));
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
    console.error('Ошибка при создании бэкапа базы данных:', err); // Логируем ошибку для отладки
    await ctx.reply(
      `❌ Произошла ошибка при создании бэкапа базы данных: ${escapeMarkdownV2(msg)}`,
    );
  }
}
