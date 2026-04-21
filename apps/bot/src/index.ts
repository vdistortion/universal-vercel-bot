import { InputFile } from 'grammy';
import { createBot, dbMiddleware } from '@scope/tg-bot-core';
import { createVKBot, VKBot, VKContext } from '@scope/vk-bot-core';
import { getSupabaseClient, type UniversalContext } from '@scope/shared';
import { startCommand, idCommand, backupDbCommand } from './commands';
import { escapeMarkdownV2 } from './utils/markdown';
import {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_ADMIN_ID,
  VK_TOKEN,
  VK_GROUP_ID,
} from './env';

// ─── Telegram Bot ────────────────────────────────────────────────────────────
if (TELEGRAM_BOT_TOKEN) {
  try {
    const tgBot = createBot({ token: TELEGRAM_BOT_TOKEN });
    tgBot.use(dbMiddleware);

    tgBot.use(async (ctx, next) => {
      const uctx: UniversalContext = {
        platform: 'telegram',
        userId: ctx.from?.id ?? 0,
        peerId: ctx.chat?.id ?? 0,
        text: ctx.message?.text ?? '',
        isAdmin: ctx.from?.id === Number(TELEGRAM_ADMIN_ID),
        db: ctx.db,
        reply: async (text) => {
          await ctx.reply(escapeMarkdownV2(text), { parse_mode: 'MarkdownV2' });
        },
        replyWithFile: async (buffer, filename, caption) => {
          await ctx.replyWithDocument(
            new InputFile(buffer, filename),
            caption
              ? { caption: escapeMarkdownV2(caption), parse_mode: 'MarkdownV2' }
              : { parse_mode: 'MarkdownV2' },
          );
        },
      };
      (ctx as any).uctx = uctx;
      await next();
    });

    tgBot.command('start', async (ctx) => {
      await startCommand((ctx as any).uctx);
    });

    tgBot.command('id', async (ctx) => {
      await idCommand((ctx as any).uctx);
    });

    tgBot.command('backupdb', async (ctx) => {
      await backupDbCommand((ctx as any).uctx);
    });

    tgBot.start();
    console.log('🚀 Telegram bot started');
  } catch (error) {
    console.error('❌ Failed to start Telegram bot:', error);
    console.log('⚠️ Telegram is unavailable, continuing without it...');
  }
} else {
  console.log('⚠️ TELEGRAM_BOT_TOKEN not set, skipping Telegram bot');
}

// ─── VK Bot ──────────────────────────────────────────────────────────────────
if (VK_TOKEN && VK_GROUP_ID) {
  try {
    const vkBot: VKBot = createVKBot({
      token: VK_TOKEN,
      groupId: Number(VK_GROUP_ID),
    });
    const db = getSupabaseClient();

    vkBot.on('message_new', async (ctx: VKContext) => {
      const text = ctx.text?.trim() ?? '';

      const uctx: UniversalContext = {
        platform: 'vk',
        userId: ctx.userId,
        peerId: ctx.peerId,
        text,
        isAdmin: false,
        db,
        reply: async (msg) => {
          await vkBot.sendMessage(ctx.peerId, msg);
        },
      };

      if (text === '/start') {
        await startCommand(uctx);
        return;
      }
      if (text === '/id') {
        await idCommand(uctx);
        return;
      }
      if (text === '/backupdb') {
        await backupDbCommand(uctx);
        return;
      }

      await vkBot.sendMessage(ctx.peerId, '❓ Неизвестная команда');
    });

    vkBot.start();
    console.log('🚀 VK bot started');
  } catch (error) {
    console.error('❌ Failed to start VK bot:', error);
    console.log('⚠️ VK is unavailable, continuing without it...');
  }
} else {
  console.log('⚠️ VK_TOKEN or VK_GROUP_ID not set, skipping VK bot');
}
