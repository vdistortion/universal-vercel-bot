import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getImage } from '../api';
import { getPathToAssets } from '../utils';

const debug = createDebug('bot:image_command');

export const image = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "image" command');
  const { image, caption } = await getImage();
  await ctx.replyWithMediaGroup([
    {
      type: 'photo',
      media: getPathToAssets(`images/${image}`),
      caption,
    },
  ]);
};
