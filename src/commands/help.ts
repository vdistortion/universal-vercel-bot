import type { CommandContext, Context } from 'grammy';
import createDebug from 'debug';
import { commands } from '../core';
import { reply } from '../utils/reply';
import { FLAG_CONNECT } from '../utils/env';

const debug = createDebug('bot:help_command');

export const help = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "help" command');

  const webAppButton = {
    text: '🌐 Открыть сайт FlagConnect',
    web_app: { url: FLAG_CONNECT! },
  };

  await reply(
    ctx,
    `
/${commands.start.command} — ${commands.start.description}
/${commands.flags.command} — ${commands.flags.description}
/${commands.cat.command} — ${commands.cat.description}
/${commands.quote.command} — ${commands.quote.description}
/${commands.stop.command} — ${commands.stop.description}
${commands.location.description}
`,
    { inlineKeyboard: ctx.chat.type === 'private' ? [[webAppButton]] : [] },
  );
};
