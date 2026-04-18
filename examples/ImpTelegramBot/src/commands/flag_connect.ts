import type { CommandContext } from 'grammy';
import createDebug from 'debug';
import type { Context } from '../core';
import { handlerFlagConnect } from '../services/flagService';

const debug = createDebug('bot:flag_connect_command');

export const flag_connect = () => async (ctx: CommandContext<Context>) => {
  debug('Triggered "flag_connect" command');
  await handlerFlagConnect(ctx);
};
