import list from './list';

async function HttpClient<T>(url: string) {
  const response = await fetch(url);
  return (await response.json()) as T;
}

export function getList() {
  const randomIndex = Math.floor(Math.random() * list.length);
  const randomItem = list[randomIndex];
  const number = `<b>[${randomIndex + 1}/${list.length}]</b>`;
  const text = `${randomItem}\n\n${number}`;
  return Promise.resolve(text);
}

export async function getCat() {
  interface IApiData {
    url: string;
  }

  const [data] = await HttpClient<IApiData[]>('https://api.thecatapi.com/v1/images/search');
  return data.url;
}

export async function getQuote() {
  interface IApiData {
    quoteText: string;
    quoteAuthor: string;
  }

  const { quoteText, quoteAuthor } = await HttpClient<IApiData>(
    'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=ru',
  );
  return quoteAuthor ? `${quoteText}\n<b>${quoteAuthor}</b>` : quoteText;
}

export async function getAdvice() {
  interface IApiData {
    text: string;
  }

  const data = await HttpClient<IApiData>('https://fucking-great-advice.ru/api/random');
  return data.text;
}

export async function getWeather(apiKey: string, latitude: number, longitude: number) {
  interface IApiData {
    name: string;
    wind: {
      speed: number;
    };
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
  }

  return await HttpClient<IApiData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`,
  );
}

export async function getCountries(path: string) {
  interface ICountry {
    name: {
      en: string;
      ru: string;
    };
    flag: string[];
  }

  return await HttpClient<ICountry[]>(`${path}/countries.json`);
}
