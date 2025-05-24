import type { Filter } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { getWeather } from '../api';

const debug = createDebug('bot:location_text');

export const location = (apiKey: string) => async (ctx: Filter<Context, 'message:location'>) => {
  debug('Triggered "location" text command');

  const { latitude, longitude } = ctx.message.location;
  const message = await getWeather(apiKey, latitude, longitude);

  await ctx.reply(message, {
    reply_parameters: { message_id: ctx.message.message_id },
    parse_mode: 'Markdown',
  });
};
