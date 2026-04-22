import type { UniversalContext } from '@scope/shared';
import { escapeMarkdownV2 } from '../utils/markdown';

function getImageUrl(filename: string): string {
  const encodedFilename = encodeURIComponent(filename);

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/content-images/${encodedFilename}`;
  }

  return `/content-images/${encodedFilename}`;
}

export async function randomCommand(ctx: UniversalContext): Promise<void> {
  if (!ctx.db) {
    await ctx.reply('❌ База данных недоступна.');
    return;
  }

  try {
    const { data: allContent, error: fetchError } = await ctx.db
      .from('bot_content')
      .select('*')
      .order('id', { ascending: true });

    if (fetchError) throw fetchError;

    if (!allContent || allContent.length === 0) {
      await ctx.reply('В базе данных нет контента.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * allContent.length);
    const randomItem = allContent[randomIndex];

    const imageUrl = randomItem.image_url ? getImageUrl(randomItem.image_url) : null;

    // Если есть картинка и есть метод replyWithPhoto - отправляем фото
    if (imageUrl && ctx.replyWithPhoto) {
      let caption = '';
      if (randomItem.text_content) {
        caption += escapeMarkdownV2(randomItem.text_content);
      }
      caption += `\n\nВсего элементов: ${randomIndex + 1}/${allContent.length}`;

      await ctx.replyWithPhoto(imageUrl, caption);
      return;
    }

    // Иначе - просто текст (или ссылка на картинку для старых ботов)
    let message = '';
    if (randomItem.text_content) {
      message += escapeMarkdownV2(randomItem.text_content);
    }

    if (imageUrl) {
      message += `\n\n[📷 Смотреть изображение](${imageUrl})`;
    }

    message += `\n\nВсего элементов: ${randomIndex + 1}/${allContent.length}`;

    await ctx.reply(message);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
    console.error('Ошибка при получении случайного контента:', err);
    await ctx.reply(
      `❌ Произошла ошибка при получении случайного контента: ${escapeMarkdownV2(msg)}`,
    );
  }
}
