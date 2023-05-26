import RSS from "rss-parser";
import { BaseService } from "./BaseService";

export class Youtube extends BaseService<{ youtubeId: string }> {
   private url: string;
   private lastUpdateItem: YoutubeData[] = [];
   constructor(metadata: { youtubeId: string }) {
      super({
         name: "youtube",
         expireAt: 100000000000,
         disable: false,
         metadata,
      })
      this.url = `https://www.youtube.com/feeds/videos.xml?channel_id=${this.options.metadata.youtubeId}`;
   }
   public async init() {
     await this.fetchYoutubeVideo();
   }


   private async fetchYoutubeVideo() {
      const context = await new RSS().parseURL(this.url) as YoutubeRawData;
      const content = this.resolveData(context);
      if(content.some(element => this.lastUpdateItem.find(e => e.id === element.id))) return true;
      this.lastUpdateItem.push(...content);
      this.webhook.send(JSON.stringify(content))
   }

   private resolveData(data: YoutubeRawData): YoutubeData[] {  
      const now = new Date();
      const results = data.items.map(youtube => ({
         channel: data.link,
         title: youtube.title,
         author: youtube.author, 
         id: youtube.id,
         url: youtube.link,
         createdAt: new Date(youtube.pubDate),
      }))
      return results.filter(current => current.createdAt.getMilliseconds() < now.getMilliseconds()).slice(0, 5);
   }
}

interface YoutubeData {
   channel: string,
   title: string,
   author: string,
   id: string,
   url: string,
   createdAt: Date
}

interface YoutubeRawData {
   link: string,
   items: YoutubeRawDataItemOptions[]
}

interface YoutubeRawDataItemOptions {
   title: string,
   link: string,
   pubDate: string,
   author: string,
   id: string,
   isoDate: string,
}