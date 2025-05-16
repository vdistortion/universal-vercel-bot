import type { Context } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import createDebug from 'debug';
import { getQuote, getAdvice, getCat } from '../api/fetch';
import { buttons } from '../keyboard';
import { reply, replyWithPhoto } from '../utils/reply';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context<Update>) => {
  debug('Triggered "greeting" text command');

  let message = '';

  if (ctx.text === buttons.cat.text) {
    const url = await getCat();
    return replyWithPhoto(ctx, url);
  }

  if (ctx.text === buttons.advice.text) {
    message = await getAdvice();
  } else if (ctx.text === buttons.quote.text) {
    message = await getQuote();
  } else {
    message = `${ctx.from?.first_name}, не понимаю тебя! 😈`;
  }

  await reply(ctx, message, { messageId: ctx.msgId, parseMode: 'HTML' });
};

export { greeting };
