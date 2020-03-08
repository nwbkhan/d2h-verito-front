import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ChannelSubscriptionModel,
  ChannelSubscriptionPackModel,
  ServiceSubscriptionModel,
  SubscriptionPackRequest
} from '../_models/subscription.model';
import {Observable} from 'rxjs';
import {ApiResponseModel} from '../_models/api-reponse.model';
import {CurrentSubscription} from '../_models/current-subscription.model';

@Injectable({providedIn: 'root'})
export class SubscriptionService {
  private SUBSCRIPTION_PATH = '/subscription';
  CHANNEL_PATH = this.SUBSCRIPTION_PATH + '/channel';
  SERVICE_PATH = this.SUBSCRIPTION_PATH + '/service';
  CURRENT_SUBS_PATH = this.SUBSCRIPTION_PATH + '/current';
  PACK_PATH = this.SUBSCRIPTION_PATH + '/pack';

  constructor(private http: HttpClient) {
  }

  getChannelSubsPack(): Observable<ApiResponseModel<ChannelSubscriptionPackModel[]>> {
    return this.http.get<ApiResponseModel<ChannelSubscriptionPackModel[]>>(this.PACK_PATH);
  }

  postChannelSubsPack(request: SubscriptionPackRequest) {
    return this.http.post(this.PACK_PATH, request);
  }

  getChannelSubs(): Observable<ApiResponseModel<ChannelSubscriptionModel[]>> {
    return this.http.get<ApiResponseModel<ChannelSubscriptionModel[]>>(this.CHANNEL_PATH);
  }

  postChannelSubs(channelName: Array<string>) {
    return this.http.post(this.CHANNEL_PATH, {}, {params: {channelNames: channelName}});
  }

  getServiceSubs(): Observable<ApiResponseModel<ServiceSubscriptionModel[]>> {
    return this.http.get<ApiResponseModel<ServiceSubscriptionModel[]>>(this.SERVICE_PATH);
  }

  postServiceSubs(serviceName: string[]) {
    return this.http.post(this.SERVICE_PATH, {}, {params: {serviceName}});
  }

  getCurrentPack(): Observable<ApiResponseModel<CurrentSubscription>> {
    return this.http.get<ApiResponseModel<CurrentSubscription>>(this.CURRENT_SUBS_PATH);
  }
}
