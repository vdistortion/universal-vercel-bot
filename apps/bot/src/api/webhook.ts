import { webhookCallback } from 'grammy';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createBot } from '@scope/tg-bot-core';
import { createVKWebhookProcessor, VKSendMessageFunction } from '@scope/vk-bot-core';

const sendVKMessage: VKSendMessageFunction = async (peerId, text, keyboard) => {
  const token = process.env.VK_TOKEN;
  if (!token) {
    console.error('VK_TOKEN is not defined for sending messages.');
    return null;
  }

  const url = new URL(`https://api.vk.com/method/messages.send`);
  url.searchParams.set('access_token', token);
  url.searchParams.set('v', '5.131');
  url.searchParams.set('peer_id', String(peerId));
  url.searchParams.set('message', text);
  url.searchParams.set('random_id', String(Date.now()));

  if (keyboard) {
    url.searchParams.set('keyboard', keyboard);
  }

  const fetchOptions: RequestInit = {};

  try {
    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.json();
    if (data.error) {
      console.error('Error sending VK message:', data.error);
    }
    return data.response;
  } catch (error) {
    console.error('Failed to send VK message:', error);
    return null;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const platform = req.query.platform;

  if (platform === 'tg' && process.env.TELEGRAM_BOT_TOKEN) {
    try {
      const bot = createBot({
        token: process.env.TELEGRAM_BOT_TOKEN,
      });
      const handler = webhookCallback(bot, 'https');
      return handler(req, res);
    } catch (error) {
      console.error('❌ Error processing Telegram webhook:', error);
      return res.status(500).send('Telegram webhook processing failed');
    }
  }

  if (platform === 'vk' && process.env.VK_TOKEN && process.env.VK_GROUP_ID) {
    const body = req.body;

    if (body.type === 'confirmation') {
      return res.status(200).send(process.env.VK_CONFIRMATION);
    }

    try {
      const vkProcessor = createVKWebhookProcessor(
        {
          token: process.env.VK_TOKEN,
          groupId: Number(process.env.VK_GROUP_ID),
          secret: process.env.VK_SECRET,
        },
        sendVKMessage,
      );

      vkProcessor.on('message_new', async (ctx) => {
        await ctx.sendMessage(ctx.peerId, 'Привет из ВК (через вебхук)! Я тоже на общем ядре.');
      });

      await vkProcessor.processUpdate(body);
      return res.status(200).send('ok');
    } catch (error) {
      console.error('❌ Error processing VK webhook:', error);
      return res.status(500).send('VK webhook processing failed');
    }
  }

  res.status(404).send('Platform not supported or token missing');
};
