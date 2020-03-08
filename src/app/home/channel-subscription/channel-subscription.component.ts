import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '../../_services/subscription.service';
import {ChannelSubscriptionModel} from '../../_models/subscription.model';
import {UserChannelSubscription} from '../../_models/current-subscription.model';
import {DataCommService} from '../../_models/data-comm.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-channel-subscription',
  templateUrl: './channel-subscription.component.html',
  styleUrls: ['./channel-subscription.component.css']
})
export class ChannelSubscriptionComponent implements OnInit {

  private channelSubscriptions: Array<ChannelSubscriptionModel>;
  private subscribedChannels: Array<UserChannelSubscription>;
  private newChannels: Array<string> = [];

  constructor(private dataCommService: DataCommService,
              private snackbar: MatSnackBar,
              private subscriptionService: SubscriptionService) {
    this.getChannelSubscriptions();
    this.listenForSubscribeChannels();
  }

  ngOnInit() {
  }

  getChannelSubscriptions() {
    this.subscriptionService
      .getChannelSubs()
      .subscribe(response => {
        this.channelSubscriptions = response.data;
        console.log(this.channelSubscriptions);
        this.filterForSubscribed();
      });
  }

  private listenForSubscribeChannels() {
    this.dataCommService.currentSubscriptions.subscribe(data => {
      if (data
        && data.channelSubscriptions
        && data.channelSubscriptions.length) {
        this.subscribedChannels = data.channelSubscriptions;
        this.filterForSubscribed();
      }
    });
  }

  private filterForSubscribed() {
    if (this.subscribedChannels
      && this.channelSubscriptions) {
      this.subscribedChannels.forEach(subsChannel => {
        const channelSubscriptionModel =
          this.channelSubscriptions.find(x => x.channelName === subsChannel.channel.channelName);
        if (channelSubscriptionModel) {
          channelSubscriptionModel.subscribed = true;
        }
      });
    }
  }

  insertChannel(channel: ChannelSubscriptionModel) {
    if (!channel.subscribed) {
      const hasAlreadyPresent = this.newChannels.find(x => x === channel.channelName);
      if (hasAlreadyPresent) {
        const index = this.newChannels.indexOf(channel.channelName);
        this.newChannels.splice(index, 1);
      } else {
        this.newChannels.push(channel.channelName);
      }
    }
  }

  subsNewChannels() {
    this.subscriptionService
      .postChannelSubs(this.newChannels)
      .subscribe(x => {
        this.snackbar.open('Successfully subscribed to channels - ' + this.newChannels.join(', '), 'Ok');
        this.dataCommService.callCurrentPacksApi.next(true);
        this.newChannels = [];
      }, e => {
        this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
      });
  }
}
