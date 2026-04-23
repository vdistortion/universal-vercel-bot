import type { UniversalContext } from '@scope/shared';
import { removeUser } from '@scope/shared';

export async function stopCommand(ctx: UniversalContext): Promise<void> {
  await removeUser(ctx.platform, ctx.userId);

  await ctx.reply('👋 Пока! Если что — /start чтобы вернуться.', {
    remove_keyboard: true,
  });
}
