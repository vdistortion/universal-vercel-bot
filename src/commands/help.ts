import type { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:help_command');

const help = () => async (ctx: Context) => {
  debug('Triggered "help" command');
  await ctx.replyWithHTML(`
/start — Запуск/перезапуск бота
/cat — Запросить котика
/help — Список возможных команд
Если отправить боту статичную геолокацию, он ответит погодой
`);
};

export { help };
