import { container } from "tsyringe";
import { Types, WebhookManager, BaseService, Scheduler } from ".";

export class AutoPoster {
   private ready: boolean = false;
   public schedule: Scheduler = new Scheduler();
   public webhook: WebhookManager = new WebhookManager(this)
   constructor(public options: Types.AutoPosterOptions) {
      if(!options) throw new Error("Options must be present.")
   }

   public async init<T extends BaseService>(services: T[] = []) {
      this.ready = true;
      await this.webhook.init();
      container.registerInstance("webhook", this.webhook)
      await this.schedule.init(services)
   }
}