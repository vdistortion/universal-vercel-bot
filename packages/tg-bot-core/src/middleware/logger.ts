import { MiddlewareFn } from 'grammy';
import { BotContext } from '../types';

export const loggerMiddleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  const start = Date.now();
  const from = ctx.from?.username ?? ctx.from?.id ?? 'unknown';
  const text = ctx.message?.text ?? ctx.callbackQuery?.data ?? '—';

  console.log(`[${new Date().toISOString()}] @${from}: ${text}`);

  await next();

  console.log(`[${new Date().toISOString()}] Handled in ${Date.now() - start}ms`);
};
