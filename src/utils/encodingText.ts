import { encode, decode } from 'iconv-lite';

export const encoding = (text: Buffer, from = 'win1251', to = 'utf8') => {
  return encode(decode(text, from), to).toString();
};
