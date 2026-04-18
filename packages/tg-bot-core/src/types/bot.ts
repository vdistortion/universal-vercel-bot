import { Context as GrammyContext, SessionFlavor } from 'grammy';
// import { Database } from '@scope/shared'; // Представим, что мы добавим типы для DB позже

export interface SessionData {
  // Здесь будут общие данные сессии, например:
  // userId: number;
  // language: 'ru' | 'en';
}

// Расширяем контекст gramgrammy
export interface BotContext extends GrammyContext, SessionFlavor<SessionData> {
  // Можно добавить свои поля
  // db: Database;
}
