import { BaseService } from "../services/BaseService";
import { Utils } from "./Util";

export class Scheduler {
   #interval: NodeJS.Timer | null = null; 
   public tasks: BaseService[] = []
   public async init<T extends BaseService>(tasks: T[] | T) {
      for(const task of Utils.toArray(tasks)) this.add(task);
      await this._run();
      return this;
   }

   private _remove(serviceId: string) {
      const taskIndex = this.tasks.findIndex(task => task.options.name == serviceId);
      if(taskIndex === -1) return null;
      const [task] = this.tasks.splice(taskIndex, 1)
      this._ensureInterval();
      return task
   }

   public add<T extends BaseService>(data: T) {
      this._remove(data.options.name);
      this.tasks.push(data);
      this._ensureInterval();
      return data;
   }
   
   private async _run() {
      const now = Date.now();
      const actions = this.tasks.filter(current => new Date(now + current.options.expireAt).getMilliseconds() < now)
      await Promise.all(actions.map(task => task.init()))
      return this._ensureInterval();
   }

   private _ensureInterval() {
      if(this.#interval && !this.tasks.length) {
         clearInterval(this.#interval)
         this.#interval = null;
      } 

      if(!this.#interval && this.tasks.length) {
         this.#interval = setInterval(this._run.bind(this), 3000)
      }
   }
}