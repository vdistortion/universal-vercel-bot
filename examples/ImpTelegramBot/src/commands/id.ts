import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';

const debug = createDebug('bot:id_command');

export const id = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "id" command');
  await ctx.reply(`${ctx.from?.id}`);
};
