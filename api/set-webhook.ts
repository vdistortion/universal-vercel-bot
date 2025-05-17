import type { VercelRequest, VercelResponse } from '@vercel/node';
import { production } from '../src/core';
import { bot } from '../src';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await production(req, res, bot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка установки webhook' });
  }
}
