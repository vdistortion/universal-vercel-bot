import { createBot } from '@scope/tg-bot-core';
import { createVKBot } from '@scope/vk-bot-core';
import { getSupabaseClient } from '@scope/shared';

const { TELEGRAM_BOT_TOKEN, VK_TOKEN, VK_GROUP_ID } = process.env;
const db = getSupabaseClient();

if (TELEGRAM_BOT_TOKEN) {
  const tgBot = createBot({ token: TELEGRAM_BOT_TOKEN });

  tgBot.command('start', async (ctx) => {
    await ctx.reply('Привет из Telegram! Я использую общее ядро.');
  });

  tgBot.start();
  console.log('🚀 Telegram bot started');
}

if (VK_TOKEN && VK_GROUP_ID) {
  const vkBot = createVKBot({
    token: VK_TOKEN,
    groupId: Number(VK_GROUP_ID),
  });

  vkBot.on('message_new', async (ctx) => {
    await vkBot.sendMessage(ctx.peerId, 'Привет из ВК! Я тоже на общем ядре.');
  });

  vkBot.start();
  console.log('🚀 VK bot started');
}
