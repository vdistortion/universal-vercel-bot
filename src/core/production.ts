import { bot } from '../index';

const VERCEL_URL = process.env.VERCEL_URL;

if (!VERCEL_URL) throw new Error('VERCEL_URL is not set.');

bot.api.setWebhook(`${VERCEL_URL}/api`).then(console.info).catch(console.error);
