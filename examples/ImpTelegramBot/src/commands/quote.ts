import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getQuote } from '../api';

const debug = createDebug('bot:quote_command');

export const quote = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "quote" command');
  const text = await getQuote();
  await ctx.reply(text, { parse_mode: 'Markdown' });
};
