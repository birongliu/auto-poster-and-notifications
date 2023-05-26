import { BaseService } from "./BaseService";
import { Pool } from "undici"
export class Instagram extends BaseService<{ accountName: string }> {
   constructor(public accountName: string) {
      super({
         name: "instagram",
         disable: false,
         metadata: { accountName },
         expireAt: 3000,
      })
   }
   public async init(): Promise<void> {
      await this.fetchInstagramPost();
   }

   private async fetchInstagramPost() {
      const response = new Pool(`https://www.instagram.com`);
   }
}