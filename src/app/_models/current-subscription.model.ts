import {Channel} from './subscription.model';

export class CurrentSubscription {
  channelSubscriptionPacks: Array<UserChannelSubscriptionPack>;
  channelSubscriptions: Array<UserChannelSubscription>;
  serviceSubscriptions: Array<UserServiceSubscription>;
}

export interface UserChannelSubscriptionPack {
  id: number;
  channelPack: ChannelPack;
  subscribeDate: string;
  expiryDate: string;
}

export interface ChannelPack {
  id: number;
  packName: string;
  price: number;
  discount: number;
  channels: any[];
}


export interface UserChannelSubscription {
  id: number;
  channel: Channel;
  expiryDate: string;
}


export interface UserServiceSubscription {
  id: number;
  service: Service;
  expiryDate: string;
}

export interface Service {
  id: number;
  serviceName: string;
  price: number;
}
