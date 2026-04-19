import type { ThemeParams } from '../types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        themeParams: ThemeParams;
        colorScheme: 'light' | 'dark' | 'system';
        expand: () => void;
        close: () => void;
        ready: () => void;
        sendData: (data: string) => void;
        initData: string;
        initDataUnsafe: Record<string, unknown>;
        version: string;
        platform: string;
        viewport: { height: number; width: number; is_expanded: boolean };
      };
    };
  }
}

export function getTheme(): ThemeParams {
  return window.Telegram?.WebApp?.themeParams ?? {};
}

export function getColorScheme(): 'light' | 'dark' | 'system' {
  return window.Telegram?.WebApp?.colorScheme ?? 'system';
}

export function expandApp(): void {
  window.Telegram?.WebApp?.expand();
}

export function closeApp(): void {
  window.Telegram?.WebApp?.close();
}

export function sendDataToBot(data: unknown): void {
  window.Telegram?.WebApp?.sendData(JSON.stringify(data));
}
