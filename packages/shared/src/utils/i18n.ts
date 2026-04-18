export type LanguageCode = 'ru' | 'en'; // Пример

export interface PhraseCollection {
  [key: string]: string | ((...args: any[]) => string);
}

const languages: Record<LanguageCode, PhraseCollection> = {
  ru: {
    // Здесь будут общие фразы, если они понадобятся
    // Конкретные фразы для ботов будут в их пакетах
    testPhrase: 'Тестовая фраза',
    greet: (name: string) => `Привет, ${name}!`,
  },
  en: {
    testPhrase: 'Test phrase',
    greet: (name: string) => `Hello, ${name}!`,
  },
};

export function getPhrase<T extends keyof PhraseCollection>(
  key: T,
  lang: LanguageCode = 'ru',
): PhraseCollection[T] {
  return languages[lang][key];
}
