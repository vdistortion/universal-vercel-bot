import type { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:help_command');

const help = () => async (ctx: Context) => {
  debug('Triggered "help" command');
  await ctx.reply(`
/start — Запуск/перезапуск бота
/cat — Запросить котика
/help — Список возможных команд
Если отправить боту геопозицию, он ответит погодой
`);
};

export { help };
