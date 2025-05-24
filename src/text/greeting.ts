import type { Filter } from 'grammy';
import createDebug from 'debug';
import { commands, type Context } from '../core';
import { getAdvice, getCat, getQuote } from '../api';

const debug = createDebug('bot:greeting_text');

export const greeting = () => async (ctx: Filter<Context, 'message:text'>) => {
  debug('Triggered "greeting" text command');

  let message = '';

  if (ctx.message.text === commands.cat.text) {
    const url = await getCat();
    return ctx.replyWithPhoto(url);
  }

  if (ctx.message.text === commands.advice.text) {
    message = await getAdvice();
  } else if (ctx.message.text === commands.quote.text) {
    message = await getQuote();
  } else {
    message = `${ctx.from.first_name}, не понимаю тебя! 😈\nВозможно, кнопка не сработала.\nПопробуй отправить команду /start для обновления меню.`;
  }

  await ctx.reply(message, {
    reply_parameters: { message_id: ctx.message.message_id },
    parse_mode: 'Markdown',
  });
};
