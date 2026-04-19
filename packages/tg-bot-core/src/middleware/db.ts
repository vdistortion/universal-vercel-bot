import type { MiddlewareFn } from 'grammy';
import { getSupabaseClient } from '@scope/shared';
import type { BotContext } from '../types';

export const dbMiddleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  ctx.db = getSupabaseClient();
  await next();
};
