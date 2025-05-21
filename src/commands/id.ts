import type { CommandContext, Context } from 'grammy';
import createDebug from 'debug';
import { reply } from '../utils/reply';

const debug = createDebug('bot:id_command');

export const id = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "id" command');
  await reply(ctx, `${ctx.from?.id}`);
};
