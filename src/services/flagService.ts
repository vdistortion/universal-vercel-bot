import { bot, commands, type Context } from '../core';
import { flag_connect } from '../commands';
import { http, chunk, pickRandom } from '../utils';
import { FLAG_CONNECT_MINI_APP } from '../env';

interface ICountry {
  name: {
    en: string;
    ru: string;
  };
  flag: string[];
}

const url = FLAG_CONNECT_MINI_APP!;
let countries: ICountry[] = [];

async function getApiCountries() {
  if (!countries.length) countries = await http<ICountry[]>(`${url}/countries.json`);
  return countries;
}

export async function handlerFlagConnect(ctx: Context) {
  const apiCountries = await getApiCountries();
  const list: [number, ICountry][] = [];
  const indexes: number[] = [];

  while (indexes.length < ctx.session.count) {
    const index = pickRandom(apiCountries);
    if (!indexes.includes(index)) indexes.push(index);
  }

  indexes.forEach((index) => {
    list.push([index, apiCountries[index]]);
  });

  const randomIndex = pickRandom(list);
  const [indexCountry, country] = list[randomIndex];
  const flag = url + '/images/flags/' + country.flag[0];
  const buttons = list.map(([index, { name }]) => ({
    text: ctx.session.count > 1 ? name.ru : 'Показать ответ',
    callback_data: `flag_answer|${index}|${indexCountry}`,
  }));

  await ctx.replyWithPhoto(flag, {
    caption: 'Какая это страна?',
    reply_markup: {
      inline_keyboard: chunk(buttons, 2),
    },
  });
}

async function callbackQueryCountries(
  count: number,
  countryIndex: number,
  correctCountryIndex: number,
) {
  const countries = await getApiCountries();
  const countryName: string = countries[countryIndex].name.ru;
  const correctCountryName: string = countries[correctCountryIndex].name.ru;

  const answer =
    countryIndex === correctCountryIndex
      ? count > 1
        ? `☑️ Правильно, это ${correctCountryName}`
        : `Это ${correctCountryName}`
      : `Вы ответили ${countryName}.\n❌ Неправильно, это ${correctCountryName}`;
  return { answer };
}

export function runFlagsService() {
  bot.command(commands.flags.command, flag_connect());

  bot.hears(commands.flags.text, handlerFlagConnect);

  bot.callbackQuery(/^flag_answer\|/, async (ctx) => {
    const [_, countryIndex, correctCountryIndex] = ctx.callbackQuery.data.split('|');
    const { answer } = await callbackQueryCountries(
      ctx.session.count,
      Number(countryIndex),
      Number(correctCountryIndex),
    );

    await ctx.editMessageCaption({
      caption: answer,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '⚙️', callback_data: 'flag_settings' },
            { text: 'Продолжить', callback_data: 'flag_more' },
          ],
        ],
      },
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('flag_more', async (ctx) => {
    await handlerFlagConnect(ctx);
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('flag_settings', async (ctx) => {
    await ctx.reply('⚠️ Настройки нестабильны\nСколько должно быть вариантов ответа?', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '2', callback_data: 'flag_setting|2' },
            { text: '3', callback_data: 'flag_setting|3' },
            { text: '4', callback_data: 'flag_setting|4' },
            { text: '5', callback_data: 'flag_setting|5' },
            { text: '6', callback_data: 'flag_setting|6' },
            { text: '7', callback_data: 'flag_setting|7' },
            { text: '8', callback_data: 'flag_setting|8' },
            { text: '9', callback_data: 'flag_setting|9' },
          ],
          [
            { text: 'Без вариантов', callback_data: 'flag_setting|1' },
            { text: '10', callback_data: 'flag_setting|10' },
          ],
        ],
      },
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^flag_setting\|/, async (ctx) => {
    const [_, newCount] = ctx.callbackQuery.data.split('|');
    ctx.session.count = Number(newCount);
    await ctx.answerCallbackQuery();
  });
}
