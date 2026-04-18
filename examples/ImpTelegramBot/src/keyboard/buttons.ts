import type { KeyboardButton, ReplyKeyboardMarkup } from '@grammyjs/types/markup';
import { commands } from '../core';

const locationButton: KeyboardButton = {
  text: commands.location.text,
  request_location: true,
};

export const getKeyboard = (isPrivateChat?: boolean, advice?: boolean): ReplyKeyboardMarkup => {
  const keyboard: KeyboardButton[][] =
    isPrivateChat && advice
      ? [
          [commands.flags.text],
          [commands.advice.text, commands.quote.text],
          [locationButton, commands.cat.text],
        ]
      : advice
        ? [
            [commands.advice.text, commands.flags.text],
            [commands.quote.text, commands.cat.text],
          ]
        : isPrivateChat
          ? [
              [commands.flags.text, commands.quote.text],
              [locationButton, commands.cat.text],
            ]
          : [[commands.flags.text], [commands.quote.text, commands.cat.text]];

  return {
    resize_keyboard: true,
    keyboard,
  };
};
