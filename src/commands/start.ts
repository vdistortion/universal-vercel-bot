import { Markup, type Context } from 'telegraf';
import createDebug from 'debug';
import { keyboard } from '../keyboard';

const debug = createDebug('bot:start_command');

const start = () => async (ctx: Context) => {
  debug('Triggered "start" command');
  const keyboardMarkup = Markup.keyboard(keyboard);

  if (ctx.chat?.type === 'supergroup') {
    await ctx.replyWithHTML(`Привет, чат <b>${ctx.chat.title}</b>! 😈`, keyboardMarkup);
  } else if (ctx.chat?.type === 'private') {
    await ctx.replyWithHTML(
      `Будь как дома, путник <b>${ctx.chat.first_name}</b>! 😈`,
      keyboardMarkup,
    );
  }
};

export { start };
