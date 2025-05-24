import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getPathToAssets } from '../utils';

const debug = createDebug('bot:imp_command');

export const imp =
  (setSpecification: () => Promise<void>) => async (ctx: CommandContext<Context>) => {
    debug('Triggered "imp" command');
    await setSpecification();
    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: getPathToAssets('avatar.jpg'),
        caption: '@ImpTelegramBot',
      },
      {
        type: 'photo',
        media: getPathToAssets('hellboy.jpg'),
      },
    ]);
  };
