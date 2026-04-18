import { Bot, type Context, session, type SessionFlavor } from 'grammy';
import { NODE_ENV, TELEGRAM_BOT_TOKEN } from '../env';

interface SessionData {
  count: number;
}

export type SessionContext = Context & SessionFlavor<SessionData>;

export const bot = new Bot<SessionContext>(TELEGRAM_BOT_TOKEN!);

export const isDev = NODE_ENV !== 'production';

export const botName = isDev ? '😈 LocalImpBot' : '😈 ImpBot 😈';

bot.use(
  session({
    initial: () => ({ count: 4 }),
    getSessionKey: (ctx) => {
      if (ctx.from && ctx.chat) return `${ctx.chat.id}:${ctx.from.id}`;
      return undefined;
    },
  }),
);
