import type { Context, Filter } from 'grammy';
import createDebug from 'debug';
import { getQuote, getAdvice, getCat } from '../api';
import { commands } from '../core';
import { reply, replyWithPhoto } from '../utils/reply';

const debug = createDebug('bot:greeting_text');

export const greeting = () => async (ctx: Filter<Context, 'message:text'>) => {
  debug('Triggered "greeting" text command');

  let message = '';

  if (ctx.message.text === commands.cat.text) {
    const url = await getCat();
    return replyWithPhoto(ctx, url);
  }

  if (ctx.message.text === commands.advice.text) {
    message = await getAdvice();
  } else if (ctx.message.text === commands.quote.text) {
    message = await getQuote();
  } else {
    message = `${ctx.from.first_name}, не понимаю тебя! 😈\nВозможно, кнопка не сработала.\nПопробуй отправить команду /start для обновления меню.`;
  }

  await reply(ctx, message, { messageId: ctx.message.message_id, parseMode: 'Markdown' });
};
