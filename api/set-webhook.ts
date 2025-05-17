import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TELEGRAM_BOT_TOKEN } from '../src';

const VERCEL_URL = process.env.VERCEL_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!VERCEL_URL) return res.status(401).json({ message: 'Unauthorized' });
    const webhookUrl = `https://${VERCEL_URL}/api`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`;
    res.status(200).json({ message: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка установки webhook' });
  }
}
