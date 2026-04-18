import createDebug from 'debug';
import { bot, botName } from '../core';
import { getPhrase } from '../utils';
import type { CommandsType } from '../types';

const debug = createDebug('bot:imp_command');

export const imp = (commands: CommandsType) => async () => {
  debug('Triggered "imp" command');
  await bot.api.setMyName(botName);
  await bot.api.setMyShortDescription(getPhrase('about'));
  await bot.api.setMyDescription(getPhrase('description')(commands));

  await bot.api.setMyCommands([
    { command: commands.start.command, description: commands.start.description },
    { command: commands.flags.command, description: commands.flags.description },
    { command: commands.quote.command, description: commands.quote.description },
    { command: commands.cat.command, description: commands.cat.description },
    { command: commands.help.command, description: commands.help.description },
    { command: commands.stop.command, description: commands.stop.description },
  ]);
};
