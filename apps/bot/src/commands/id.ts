import type { UniversalContext } from '@scope/shared';
import { escapeMarkdownV2 } from '../utils/markdown';

export async function idCommand(ctx: UniversalContext): Promise<void> {
  await ctx.reply(
    `🆔 Твой ID: \`${escapeMarkdownV2(String(ctx.userId))}\`\n📍 Платформа: \`${escapeMarkdownV2(ctx.platform)}\``,
  );
}
