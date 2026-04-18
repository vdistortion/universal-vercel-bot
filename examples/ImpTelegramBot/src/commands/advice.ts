import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getKeyboard } from '../keyboard';

const debug = createDebug('bot:advice_command');

export const advice = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "advice" command');
  await ctx.reply('😈', {
    reply_markup: getKeyboard(ctx.chat.type === 'private', true),
  });
};
