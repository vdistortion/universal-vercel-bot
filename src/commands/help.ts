import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import { commands, type Context } from '../core';
import { FLAG_CONNECT_MINI_APP } from '../env';

const debug = createDebug('bot:help_command');

export const help = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "help" command');

  const webAppButton = {
    text: '🌐 Открыть сайт FlagConnect',
    web_app: { url: FLAG_CONNECT_MINI_APP! },
  };

  await ctx.reply(
    `
/${commands.start.command} — ${commands.start.description}
/${commands.flags.command} — ${commands.flags.description}
/${commands.cat.command} — ${commands.cat.description}
/${commands.quote.command} — ${commands.quote.description}
/${commands.stop.command} — ${commands.stop.description}
${commands.location.description}
`,
    {
      reply_markup: {
        inline_keyboard: ctx.chat.type === 'private' ? [[webAppButton]] : [],
      },
    },
  );
};
