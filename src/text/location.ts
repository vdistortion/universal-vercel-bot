import type { Context } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import createDebug from 'debug';
import { getWeather } from '../api/fetch';

const debug = createDebug('bot:location_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.replyWithHTML(string, {
    reply_parameters: { message_id: messageId },
  });

const location = (apiKey: string) => async (ctx: Context<Update>) => {
  debug('Triggered "location" text command');

  const messageId = ctx.message?.message_id;
  // @ts-ignore
  const { latitude, longitude, live_period } = ctx.message?.location;

  if (messageId) {
    if (live_period) {
      await ctx.reply('Автообновляемая геолокация не поддерживается, отправьте статичную 🌐');
      return;
    }
    const answer = await getWeather(apiKey, latitude, longitude);
    const wind = answer.wind.speed > 0 ? `<i>Ветер</i> ${answer.wind.speed} м/с` : 'Штиль';
    const message = `
<b>${answer.name}</b>
<i>Температура</i> ${answer.main.temp} ℃
<i>По ощущению</i> ${answer.main.feels_like} ℃
<i>Влажность</i> ${answer.main.humidity}%
<i>Давление</i> ${answer.main.pressure} мм рт. ст.
${wind}
  `;
    await replyToMessage(ctx, messageId, message);
  }
};

export { location };
