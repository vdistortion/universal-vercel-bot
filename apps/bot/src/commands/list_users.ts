import type { UniversalContext } from '@scope/shared';
import { getAllUsers } from '@scope/shared';
import { escapeMarkdownV2 } from '../utils/markdown';

export async function listUsersCommand(ctx: UniversalContext): Promise<void> {
  if (!ctx.isAdmin) {
    await ctx.reply('⛔ У вас нет прав для выполнения этой команды.');
    return;
  }

  try {
    const users = await getAllUsers();

    if (users.length === 0) {
      await ctx.reply('В базе данных нет активных пользователей.');
      return;
    }

    let message = `👥 *Список активных пользователей (${users.length})*:
`;

    users.forEach((user) => {
      message += `
- ID: \`${escapeMarkdownV2(String(user.platform_user_id))}\`
  Платформа: \`${escapeMarkdownV2(user.platform)}\`
  Зарегистрирован: \`${escapeMarkdownV2(new Date(user.created_at).toLocaleString())}\`
`;
    });

    await ctx.reply(message);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении списка пользователей:', err);
    await ctx.reply(
      `❌ Произошла ошибка при получении списка пользователей: ${escapeMarkdownV2(msg)}`,
    );
  }
}
