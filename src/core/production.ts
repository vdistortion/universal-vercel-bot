import createDebug from 'debug';
import { bot } from '../';

const debug = createDebug('bot:production');
const VERCEL_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const production = async () => {
  if (!VERCEL_URL) throw new Error('VERCEL_PROJECT_PRODUCTION_URL is not set.');
  const webhookUrl = `https://${VERCEL_URL}/api/index`;

  debug('Bot runs in production mode');
  debug(`setting webhook: ${webhookUrl}`);

  const getWebhookInfo = await bot.api.getWebhookInfo();
  if (getWebhookInfo.url !== webhookUrl) {
    debug(`deleting webhook ${getWebhookInfo.url}`);
    await bot.api.deleteWebhook();
    debug(`setting webhook: ${webhookUrl}`);
    await bot.api.setWebhook(webhookUrl);
  }
};
