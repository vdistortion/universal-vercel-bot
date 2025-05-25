import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { FLAG_CONNECT_MINI_APP } from '../env';
import { getPhrase } from '../utils';
import type { CommandsType } from '../types';

const debug = createDebug('bot:help_command');

export const help = (commands: CommandsType) => async (ctx: CommandContext<Context>) => {
  debug('Triggered "help" command');

  const webAppButton = {
    text: getPhrase('webApp'),
    web_app: { url: FLAG_CONNECT_MINI_APP! },
  };

  await ctx.reply(getPhrase('help')(commands), {
    reply_markup: {
      inline_keyboard: ctx.chat.type === 'private' ? [[webAppButton]] : [],
    },
    parse_mode: 'MarkdownV2',
    // @ts-ignore
    disable_web_page_preview: true,
  });
};
