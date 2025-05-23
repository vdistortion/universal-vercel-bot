import { Bot, type Context, session, type SessionFlavor } from 'grammy';
import { NODE_ENV, TELEGRAM_BOT_TOKEN } from '../utils/env';

interface SessionData {
  count: number;
}

export type SessionContext = Context & SessionFlavor<SessionData>;

export const bot = new Bot<SessionContext>(TELEGRAM_BOT_TOKEN!);

export const isDev = NODE_ENV !== 'production';

bot.use(session({ initial: () => ({ count: 4 }) }));
