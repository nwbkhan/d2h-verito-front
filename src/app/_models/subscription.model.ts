export interface Channel {
  id: number;
  channelName: string;
  price: number;
}

export interface ChannelSubscriptionPackModel {
  id: number;
  packName: string;
  price: number;
  discount: number;
  channels: Channel[];
}

export interface ChannelSubscriptionModel {
  subscribed: boolean;
  id: number;
  channelName: string;
  price: number;
}


export interface ServiceSubscriptionModel {
  subscribed: boolean;
  id: number;
  serviceName: string;
  price: number;
}

export enum SubscriptionType {
  CHANNEL, PACK, SERVICE
}

export class SubscriptionPackRequest {
  packName: string;
  months: number;
}
