import type { UniversalContext } from '@scope/shared';

export async function startCommand(ctx: UniversalContext): Promise<void> {
  await ctx.reply(`👋 Привет! Я работаю на платформе: ${ctx.platform}`);
}
