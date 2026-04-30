import type { Platform } from './universal-context';

export interface UniversalKeyboard {
  label: string;
  command?: string; // Для команд, которые отправляются как текст
  callbackData?: string; // Для inline-кнопок или payload в VK
}

export function createUniversalKeyboard(
  platform: Platform,
  fullMenu: boolean,
): UniversalKeyboard[][] {
  const keyboard: UniversalKeyboard[][] = [];

  // Основные кнопки
  keyboard.push([
    { label: 'Котики 🐾', command: '/cat' },
    { label: 'Цитаты 💬', command: '/quote' },
  ]);

  // Дополнительные кнопки для полного меню
  if (fullMenu) {
    keyboard.push([
      { label: 'Советы 💡', command: '/advice' },
      { label: 'Рандом 🎲', command: '/random' },
    ]);
  }

  // Кнопка настроек
  keyboard.push([{ label: 'Настройки ⚙️', command: '/settings' }]);

  return keyboard;
}

export function createUniversalSettingsKeyboard(
  platform: Platform,
  isAdmin: boolean,
): UniversalKeyboard[][] {
  const keyboard: UniversalKeyboard[][] = [
    [{ label: 'Мой ID 🆔', command: '/id' }],
    [{ label: 'Справка ❓', command: '/help' }],
    [{ label: 'Другой бот 🔗', command: '/link_bot' }],
    [{ label: 'Стоп 🛑', command: '/stop' }],
  ];

  if (isAdmin) {
    if (platform === 'telegram') {
      keyboard.push([{ label: 'Бэкап БД 💾', command: '/backupdb' }]);
    }
    keyboard.push([{ label: 'Список пользователей 👥', command: '/list_users' }]);
  }

  // Кнопка "Назад"
  keyboard.push([{ label: '◀️ Назад', command: '/start' }]);

  return keyboard;
}

export function createVKKeyboard(
  universalKeyboard: UniversalKeyboard[][],
  oneTime: boolean = false,
): string {
  const buttons = universalKeyboard.map((row) =>
    row.map((btn) => ({
      action: {
        type: 'text',
        label: btn.label,
        payload: btn.command ? JSON.stringify({ command: btn.command }) : undefined,
      },
      color: 'primary', // Можно настроить цвета по желанию
    })),
  );

  return JSON.stringify({ one_time: oneTime, buttons });
}
