import type { VercelRequest, VercelResponse } from '@vercel/node';
import { production } from '../src/core';
import { bot } from '../src';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return production(req, res, bot);
}
