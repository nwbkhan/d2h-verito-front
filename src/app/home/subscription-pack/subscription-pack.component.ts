import {Component, OnInit} from '@angular/core';
import {ChannelSubscriptionPackModel, SubscriptionPackRequest} from '../../_models/subscription.model';
import {SubscriptionService} from '../../_services/subscription.service';
import {MatSnackBar} from '@angular/material';
import {User} from '../../_models';
import {CurrentSubscription} from '../../_models/current-subscription.model';
import {AuthenticationService} from '../../_services';
import {DataCommService} from '../../_models/data-comm.service';

@Component({
  selector: 'app-subscription-pack',
  templateUrl: './subscription-pack.component.html',
  styleUrls: ['./subscription-pack.component.scss']
})
export class SubscriptionPackComponent implements OnInit {

  private user: User;
  private currentSubsName: string;
  private currentSubsPck: CurrentSubscription;
  private channelSubscriptionsPacks: Array<ChannelSubscriptionPackModel>;
  private months = 1;

  constructor(private subscriptionService: SubscriptionService,
              private dataCommService: DataCommService,
              private authService: AuthenticationService,
              private snackbar: MatSnackBar) {
    this.getChannelSubscriptionsPacks();
    this.listenForCurrentSubs();
  }

  ngOnInit() {
  }

  getChannelSubscriptionsPacks() {
    this.subscriptionService
      .getChannelSubsPack()
      .subscribe(response => {
        this.channelSubscriptionsPacks = response.data;
        console.log(this.channelSubscriptionsPacks);
      }, e => {
        console.log(e);
        this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
      });
  }

  subscribeForPack(packName: string) {
    const subsRequest = new SubscriptionPackRequest();
    if (this.months) {
      subsRequest.packName = packName;
      subsRequest.months = this.months;
      this.subscriptionService
        .postChannelSubsPack(subsRequest)
        .subscribe(_ => {
          this.snackbar.open('Successfully subscribed to pack ' + packName,
            'Ok');
          this.dataCommService.callCurrentPacksApi.next(true);
        }, e => {
          console.log(e);
          this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
        });
    } else {
      this.snackbar.open('Please enter months');
    }
  }

  private listenForCurrentSubs() {
    this.dataCommService.currentSubscriptions.subscribe(data => {
      if (data) {
        this.currentSubsPck = data;
      }
    });
  }
}
