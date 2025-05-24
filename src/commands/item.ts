import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getList } from '../api';

const debug = createDebug('bot:item_command');

export const item = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "item" command');
  const text = await getList();
  await ctx.reply(text, { parse_mode: 'Markdown' });
};
