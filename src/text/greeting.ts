import type { Context } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import createDebug from 'debug';
import { getAdvice, getQuote } from '../api/fetch';
import { keyboardButtons } from '../keyboard';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.replyWithHTML(string, {
    reply_parameters: { message_id: messageId },
  });

const greeting = () => async (ctx: Context<Update>) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  let message = '';

  if (messageId) {
    // @ts-ignore
    if (ctx.message.text === keyboardButtons.advice.title) {
      message = await getAdvice();
      // @ts-ignore
    } else if (ctx.message.text === keyboardButtons.quote.title) {
      message = await getQuote();
    } else {
      message = `${ctx.from?.first_name}, не понимаю тебя! 😈`;
    }

    await replyToMessage(ctx, messageId, message);
  }
};

export { greeting };
