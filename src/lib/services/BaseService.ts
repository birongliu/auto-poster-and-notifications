import type { Types, WebhookManager } from "../utils";
import { container } from "tsyringe"
export abstract class BaseService<T extends object = object, O extends Types.BaseServiceOptions<T> = Types.BaseServiceOptions<T>> {
   public webhook: WebhookManager = container.resolve("webhook")
   constructor(public options: O) {}
   public abstract init(): Promise<void> | void;
}