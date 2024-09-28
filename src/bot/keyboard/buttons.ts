type KeyboardButtonsItemType = {
  id: string;
  title: string;
};

type KeyboardButtonsType = {
  advice: KeyboardButtonsItemType;
  quote: KeyboardButtonsItemType;
  rand: KeyboardButtonsItemType[];
};

export const keyboardButtons: KeyboardButtonsType = {
  advice: {
    id: 'advice',
    title: 'Отмочить совет (18+)',
  },
  quote: {
    id: 'quote',
    title: 'Крутая цитата',
  },
  rand: [
    {
      id: '1',
      title: 'Анекдот',
    },
    {
      id: '11',
      title: 'Анекдот (18+)',
    },
    {
      id: '2',
      title: 'Рассказы',
    },
    {
      id: '12',
      title: 'Рассказы (18+)',
    },
    {
      id: '3',
      title: 'Стишки',
    },
    {
      id: '13',
      title: 'Стишки (18+)',
    },
    {
      id: '4',
      title: 'Афоризмы',
    },
    {
      id: '14',
      title: 'Афоризмы (18+)',
    },
    {
      id: '5',
      title: 'Цитаты',
    },
    {
      id: '15',
      title: 'Цитаты (18+)',
    },
    {
      id: '6',
      title: 'Тосты',
    },
    {
      id: '16',
      title: 'Тосты (18+)',
    },
    {
      id: '8',
      title: 'Статусы',
    },
    {
      id: '18',
      title: 'Статусы (18+)',
    },
  ],
};
