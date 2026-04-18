import { Bot, session } from 'grammy';
import { BotContext, SessionData } from './types/index.js';
import { loggerMiddleware } from './middleware/index.js';
import { errorHandler } from './middleware/index.js';

export interface BotFactoryOptions {
  token: string;
  useLogger?: boolean;
  useSession?: boolean;
}

export function createBot(options: BotFactoryOptions): Bot<BotContext> {
  const { token, useLogger = true, useSession = false } = options;

  const bot = new Bot<BotContext>(token);

  bot.catch(errorHandler);

  if (useSession) {
    bot.use(
      session<SessionData, BotContext>({
        initial: (): SessionData => ({}),
      }),
    );
  }

  if (useLogger) {
    bot.use(loggerMiddleware);
  }

  return bot;
}
