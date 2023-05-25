import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import {  Webhook, AutoPoster, Embed, Utils, Types } from "../../"
import { container } from "tsyringe"

export class WebhookManager {
   public rest: REST = new REST()
   private webhook: Webhook | null = null;
   private store: Map<string, Webhook> = new Map();
   constructor(private manager: AutoPoster) {
      container.registerInstance("webhook", this)
      this.rest.setToken(this.manager.options.token);
   }

   public async init() {
      if(!this.manager["ready"]) throw new Error("AutoPoster has not be initalized.");
      const webhook = await this.fetch();
      if(!webhook.size) return await this.create()
      return this.webhook = [...webhook.values()][0]
   }
 
   public async fetch() {
      const webhooks = await this.rest.get(Routes.channelWebhooks(this.manager.options.channelId)) as Webhook[];
      return webhooks.reduce((webhooks, webhook) => webhooks.set(webhook.id, webhook), this.store);
   }

   public async send(content: Embed[] | Embed | string) {
      if(!this.webhook) throw new Error("AutoPoster#init is not called...")
      const body = content instanceof Embed ? { embeds: Utils.toArray(content) } : { content }
      return this.rest.post(Routes.webhook(this.webhook.id, this.webhook.token), {
         body, reason: "Send auto poster messages",
      })

   }

   public async create() {
      const data = await this.rest.post(Routes.channelWebhooks(this.manager.options.channelId), {
         body: {
            name: "AutoPoster",
         },
         reason: "create webhook for auto posting"
      }) as Types.WebhookOptions
      const webhook = new Webhook(data);
      this.store.set(webhook.id, webhook)
      this.webhook = webhook;
      return this.webhook;
   }

}