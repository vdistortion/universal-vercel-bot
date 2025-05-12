import { Markup, type Context } from 'telegraf';
import createDebug from 'debug';
import { keyboard } from '../keyboard';

const debug = createDebug('bot:start_command');

const start = () => async (ctx: Context) => {
  debug('Triggered "start" command');

  const keyboardMarkup = Markup.keyboard(keyboard);
  let message = 'Держи клавиатуру! 😈';

  if (ctx.chat?.type === 'supergroup') {
    message = `Привет, чат <b>${ctx.chat.title}</b>! 😈`;
  } else if (ctx.chat?.type === 'private') {
    message = `Будь как дома, путник <b>${ctx.chat.first_name}</b>! 😈`;
  }

  await ctx.replyWithHTML(message, keyboardMarkup);
};

export { start };
