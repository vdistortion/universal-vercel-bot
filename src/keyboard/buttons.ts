import type { KeyboardButton, ReplyKeyboardMarkup } from '@grammyjs/types/markup';
import { commands } from '../core';

const locationButton: KeyboardButton = {
  text: commands.location.text,
  request_location: true,
};

export const getKeyboard = (isPrivateChat?: boolean, advice?: boolean): ReplyKeyboardMarkup => {
  return {
    resize_keyboard: true,
    keyboard: [
      advice
        ? [commands.advice.text, commands.flags.text, commands.cat.text]
        : [commands.flags.text, commands.cat.text],
      isPrivateChat ? [locationButton, commands.quote.text] : [commands.quote.text],
    ],
  };
};
