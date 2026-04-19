export function initMiniApp(): void {
  const webApp = window.Telegram?.WebApp;

  if (!webApp) {
    console.warn('Telegram WebApp API not available');
    return;
  }

  webApp.ready();
  webApp.expand();
}

export function getInitData(): string {
  return window.Telegram?.WebApp?.initData ?? '';
}

export function getInitDataUnsafe(): Record<string, unknown> {
  return window.Telegram?.WebApp?.initDataUnsafe ?? {};
}

export function isMiniApp(): boolean {
  return !!window.Telegram?.WebApp;
}
