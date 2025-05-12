type KeyboardButtonsType = Record<
  'advice' | 'quote',
  {
    id: string;
    title: string;
  }
>;

export const keyboardButtons: KeyboardButtonsType = {
  advice: {
    id: 'advice',
    title: 'Отмочить (18+)',
  },
  quote: {
    id: 'quote',
    title: 'Крутая цитата',
  },
};
