import type { Filter } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';

const debug = createDebug('bot:sticker_text');

export const sticker = () => async (ctx: Filter<Context, 'message:sticker'>) => {
  debug('Triggered "sticker" text command');
  await ctx.react('👀');
};
