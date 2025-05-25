import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import { botName, type Context } from '../core';
import { getPathToAssets, getPhrase } from '../utils';
import type { CommandsType } from '../types';

const debug = createDebug('bot:install_command');

export const install = (commands: CommandsType) => async (ctx: CommandContext<Context>) => {
  debug('Triggered "install" command');
  await ctx.replyWithMediaGroup(
    [
      {
        type: 'photo',
        media: getPathToAssets('avatar.jpg'),
        caption: `${botName}
@ImpTelegramBot

Commands:
${commands.start.command} - ${commands.start.description}
${commands.flags.command} - ${commands.flags.description}
${commands.cat.command} - ${commands.cat.description}
${commands.quote.command} - ${commands.quote.description}
${commands.help.command} - ${commands.help.description}
${commands.stop.command} - ${commands.stop.description}

About:
${getPhrase('about')}

Description:
${getPhrase('description')(commands)}`,
      },
      {
        type: 'photo',
        media: getPathToAssets('hellboy.jpg'),
      },
    ],
    {
      // @ts-ignore
      parse_mode: 'MarkdownV2', // или "Markdown", или "HTML"
    },
  );
};
