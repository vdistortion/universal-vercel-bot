import type { Bot, Context } from 'grammy';
import { commands } from '../core';
import { flag_connect } from '../commands';
import { FLAG_CONNECT } from '../utils/env';
import { http } from '../utils/http';
import { pickRandom } from '../utils/pickRandom';
import { chunk } from '../utils/chunkArray';
import { replyWithPhoto } from '../utils/reply';

interface ICountry {
  name: {
    en: string;
    ru: string;
  };
  flag: string[];
}

const url = FLAG_CONNECT!;
let countries: ICountry[] = [];

async function getApiCountries() {
  if (!countries.length) countries = await http<ICountry[]>(`${url}/countries.json`);
  return countries;
}

export async function handlerFlagConnect(ctx: Context) {
  const apiCountries = await getApiCountries();
  const list: [number, ICountry][] = [];
  const indexes: number[] = [];
  const count = 4;

  while (indexes.length < count) {
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
    text: name.ru,
    callback_data: `flag_answer|${index}|${indexCountry}`,
  }));

  await replyWithPhoto(ctx, flag, 'Какая это страна?', chunk(buttons, 2));
}

async function callbackQueryCountries(countryIndex: number, correctCountryIndex: number) {
  const countries = await getApiCountries();
  const countryName: string = countries[countryIndex].name.ru;
  const correctCountryName: string = countries[correctCountryIndex].name.ru;

  const answer =
    countryIndex === correctCountryIndex
      ? `☑️ Правильно, это ${correctCountryName}`
      : `Вы ответили ${countryName}.\n❌ Неправильно, это ${correctCountryName}`;
  return { answer };
}

export function runFlagsService(bot: Bot) {
  bot.command(commands.flags.command, flag_connect());

  bot.hears(commands.flags.text, handlerFlagConnect);

  bot.callbackQuery(/^flag_answer\|/, async (ctx) => {
    const [_, countryIndex, correctCountryIndex] = ctx.callbackQuery.data.split('|');
    const { answer } = await callbackQueryCountries(
      Number(countryIndex),
      Number(correctCountryIndex),
    );

    await ctx.editMessageCaption({
      caption: answer,
      reply_markup: {
        inline_keyboard: [[{ text: 'Продолжить', callback_data: 'flag_more' }]],
      },
    });

    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery('flag_more', async (ctx) => {
    await handlerFlagConnect(ctx);
    await ctx.answerCallbackQuery();
  });
}
