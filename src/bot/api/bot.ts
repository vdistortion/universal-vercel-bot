import { Telegraf, Markup, Input } from 'telegraf';
import { message } from 'telegraf/filters';

const token: string = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new Telegraf(token);

export { bot, message, Markup, Input };
