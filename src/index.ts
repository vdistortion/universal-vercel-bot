import { Telegraf, Input } from 'telegraf';
import { message } from 'telegraf/filters';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { start, help } from './commands';
import { greeting, location } from './text';
import { getCat, getList } from './api/fetch';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_KEY_OPENWEATHERMAP = process.env.API_KEY_OPENWEATHERMAP!;
const ALIASES = process.env.ALIASES!;
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.command('start', start(JSON.parse(ALIASES)));
bot.command('help', help());
bot.command('cat', (ctx) => getCat().then((url) => ctx.replyWithPhoto(Input.fromURL(url))));
bot.command('item', (ctx) => getList().then((text) => ctx.replyWithHTML(text)));

bot.on(message('text'), greeting());
bot.on(message('location'), location(API_KEY_OPENWEATHERMAP));
bot.on(message('sticker'), (ctx) => ctx.reply('👀'));

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

//dev mode
ENVIRONMENT !== 'production' && development(bot);
