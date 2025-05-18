import { Bot } from 'grammy';
import createDebug from 'debug';

const debug = createDebug('bot:production');

export const production = async (bot: Bot, VERCEL_URL?: string) => {
  if (!VERCEL_URL) throw new Error('VERCEL_URL is not set.');
  const webhookUrl = `https://${VERCEL_URL}/api/index`;
  const getWebhookInfo = await bot.api.getWebhookInfo();

  debug('Bot runs in production mode');
  debug(`setting webhook: ${webhookUrl}`);

  if (getWebhookInfo.url !== webhookUrl) {
    debug(`deleting webhook ${getWebhookInfo.url}`);
    await bot.api.deleteWebhook();
    debug(`setting webhook: ${webhookUrl}`);
    await bot.api.setWebhook(webhookUrl);
  }
};
