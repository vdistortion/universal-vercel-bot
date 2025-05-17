import { Bot } from 'grammy';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERCEL_URL =
  process.env.VERCEL_URL || 'imp-telegram-lcn6dlvdf-ws1wm6ok881jhqvrt4w.vercel.app';
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!VERCEL_URL) return new Response('Unauthorized', { status: 401 });
    const webhookUrl = `https://${VERCEL_URL}/api`;
    await bot.api.setWebhook(webhookUrl);
    res.status(200).json({ message: 'Webhook установлен на ' + webhookUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка установки webhook' });
  }
}
