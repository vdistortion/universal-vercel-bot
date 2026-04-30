import { getAllUsers, type UniversalContext } from '@scope/shared';
import { escapeMarkdownV2 } from '@scope/tg-bot-core';
import type { DbUser } from '@scope/shared';

export async function listUsersCommand(ctx: UniversalContext): Promise<void> {
  if (!ctx.isAdmin) {
    await ctx.reply(
      ctx.platform === 'telegram'
        ? escapeMarkdownV2('⛔ У вас нет прав для выполнения этой команды.')
        : '⛔ У вас нет прав для выполнения этой команды.',
    );
    return;
  }

  try {
    const users: DbUser[] = await getAllUsers();

    if (users.length === 0) {
      await ctx.reply(
        ctx.platform === 'telegram'
          ? escapeMarkdownV2('В базе данных нет активных пользователей.')
          : 'В базе данных нет активных пользователей.',
      );
      return;
    }

    let message =
      ctx.platform === 'telegram'
        ? `👥 *${escapeMarkdownV2(`Список активных пользователей (${users.length}):`)}*\n\n`
        : `👥 Список активных пользователей (${users.length}):\n\n`;

    for (const user of users) {
      // Форматируем дату без информации о часовом поясе, чтобы избежать скобок
      const formattedDate = new Date(user.created_at).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      let userIdentifier = 'Пользователь';
      let userLink = '#';
      let platformInfo = 'Неизвестно';
      let platformUserIdDisplay: string | null = null;

      if (user.tg_id) {
        platformInfo = 'Telegram';
        platformUserIdDisplay = user.tg_id;
        userIdentifier = `Пользователь Telegram`;
        userLink = `tg://user?id=${user.tg_id}`;
      } else if (user.vk_id) {
        platformInfo = 'ВКонтакте';
        platformUserIdDisplay = user.vk_id;
        userIdentifier = `Пользователь ВКонтакте`;
        userLink = `https://vk.com/id${user.vk_id}`;
      }

      const displayIdentifier =
        ctx.platform === 'telegram' ? escapeMarkdownV2(userIdentifier) : userIdentifier;
      const displayLink = ctx.platform === 'telegram' ? escapeMarkdownV2(userLink) : userLink;
      const displayPlatformInfo =
        ctx.platform === 'telegram' ? escapeMarkdownV2(platformInfo) : platformInfo;
      const displayPlatformUserId =
        ctx.platform === 'telegram'
          ? escapeMarkdownV2(String(platformUserIdDisplay))
          : platformUserIdDisplay;

      message +=
        ctx.platform === 'telegram'
          ? `• [${displayIdentifier}](${displayLink})\n  ID в БД: \`${user.id}\`\n  ID платформы: \`${displayPlatformUserId}\`\n  Платформа: ${displayPlatformInfo}\n  Зарегистрирован: ${escapeMarkdownV2(formattedDate)}\n\n`
          : `• ${userIdentifier} (${userLink})\n  ID в БД: ${user.id}\n  ID платформы: ${platformUserIdDisplay}\n  Платформа: ${platformInfo}\n  Зарегистрирован: ${formattedDate}\n\n`;
    }

    await ctx.reply(message);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении списка пользователей:', err);
    await ctx.reply(
      `❌ Произошла ошибка при получении списка пользователей: ${ctx.platform === 'telegram' ? escapeMarkdownV2(msg) : msg}`,
    );
  }
}
