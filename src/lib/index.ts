import { AutoPoster } from "./AutoPoster";
import { Youtube } from "./services";

export { AutoPoster } from "./AutoPoster";
export { BaseService, Youtube, Instagram } from "./services"
export { Types, Webhook, WebhookManager, Scheduler, Utils, Embed } from "./utils"

const auth = new AutoPoster({
   channelId: "990248680672067594",
   token: "NjYxMzg0OTYyNzgzNzA3MTM3.G5238r.WlRBQ1hJ_HI83h62_Gb7dDgl3MdUlgKITFGsic"
})
auth.init([new Youtube("UCX6OQ3DkcsbYNE6H8uQQuVA")])