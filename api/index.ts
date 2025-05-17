import { webhookCallback } from 'grammy';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../src';
import { production } from '../src/core';

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    await production(req, res, bot);
    webhookCallback(bot, 'https')(req, res);
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(e.message);
  }
}
