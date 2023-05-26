export interface AutoPosterOptions {
   token: string,
   channelId: string,
   name?: string,
   webhookId?: string
}

export interface WebhookOptions {
   id: string,
   name: string,
   channel_id: string,
   token: string,
}

export interface BaseServiceOptions<T extends object> {
   disable: boolean,
   name: string,
   expireAt: number
   metadata: T;
}

