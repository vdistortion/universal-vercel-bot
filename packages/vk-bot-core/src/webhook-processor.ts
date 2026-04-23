import type { VKUpdate, VKContext } from './types';
import type { VKBotFactoryOptions } from './bot-factory.js';

export type VKSendMessageFunction = (
  peerId: number,
  text: string,
  keyboard?: string,
) => Promise<unknown>;

export class VKWebhookProcessor {
  private secret?: string;
  private handlers: Map<string, ((ctx: VKContext) => void | Promise<void>)[]> = new Map();
  private sendMessageFn: VKSendMessageFunction;

  constructor(options: VKBotFactoryOptions, sendMessageFn: VKSendMessageFunction) {
    this.secret = options.secret;
    this.sendMessageFn = sendMessageFn;
  }

  on(event: string, handler: (ctx: VKContext) => void | Promise<void>): this {
    const handlers = this.handlers.get(event) ?? [];
    handlers.push(handler);
    this.handlers.set(event, handlers);
    return this;
  }

  async processUpdate(update: VKUpdate): Promise<void> {
    if (this.secret && update.secret !== this.secret) {
      console.warn('[VK Webhook] Invalid secret');
      return;
    }

    const ctx: VKContext = {
      update,
      message: update.object.message,
      peerId: update.object.peer_id ?? update.object.message?.peer_id ?? 0,
      userId: update.object.user_id ?? update.object.message?.from_id ?? 0,
      text: update.object.message?.text ?? '',
      payload: update.object.message?.payload ?? update.object.payload,
      eventId: update.object.event_id,
      sendMessage: this.sendMessageFn,
    };

    const handlers = this.handlers.get(update.type) ?? [];
    for (const handler of handlers) {
      await handler(ctx);
    }
  }
}

export function createVKWebhookProcessor(
  options: VKBotFactoryOptions,
  sendMessageFn: VKSendMessageFunction,
): VKWebhookProcessor {
  return new VKWebhookProcessor(options, sendMessageFn);
}
