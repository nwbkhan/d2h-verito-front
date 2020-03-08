import {Component, OnInit} from '@angular/core';
import {DataCommService} from '../../_models/data-comm.service';
import {MatSnackBar} from '@angular/material';
import {SubscriptionService} from '../../_services/subscription.service';
import {ServiceSubscriptionModel} from '../../_models/subscription.model';
import {UserServiceSubscription} from '../../_models/current-subscription.model';

@Component({
  selector: 'app-service-subscription',
  templateUrl: './service-subscription.component.html',
  styleUrls: ['./service-subscription.component.css']
})
export class ServiceSubscriptionComponent implements OnInit {
  private serviceSubscriptions: Array<ServiceSubscriptionModel>;
  private subscribedServices: Array<UserServiceSubscription>;
  private newServices: string[] = [];

  constructor(private dataCommService: DataCommService,
              private snackbar: MatSnackBar,
              private subscriptionService: SubscriptionService) {
    this.getServiceSubscriptions();
    this.listenForSubscribeServices();
  }

  ngOnInit() {
  }

  private getServiceSubscriptions() {
    this.subscriptionService
      .getServiceSubs()
      .subscribe(response => {
        this.serviceSubscriptions = response.data;
        console.log(this.serviceSubscriptions);
        this.filterForSubscribed();
      });
  }

  private filterForSubscribed() {
    if (this.subscribedServices
      && this.serviceSubscriptions) {
      this.subscribedServices.forEach(service => {
        const serviceSubscriptionModel =
          this.serviceSubscriptions.find(x => x.serviceName === service.service.serviceName);
        if (serviceSubscriptionModel) {
          serviceSubscriptionModel.subscribed = true;
        }
      });
    }
  }

  insertServices(service: ServiceSubscriptionModel) {
    if (!service.subscribed) {
      const hasAlreadyPresent =
        this.newServices.find(x => x === service.serviceName);
      if (hasAlreadyPresent) {
        const index = this.newServices.indexOf(service.serviceName);
        this.newServices.splice(index, 1);
      } else {
        this.newServices.push(service.serviceName);
      }
    }
  }

  subsNewServices() {
    this.subscriptionService
      .postServiceSubs(this.newServices)
      .subscribe(x => {
        this.snackbar.open('Successfully subscribed to services - ' + this.newServices.join(', '), 'Ok');
        this.dataCommService.callCurrentPacksApi.next(true);
        this.newServices = [];
      }, e => {
        this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
      });
  }

  private listenForSubscribeServices() {
    this.dataCommService.currentSubscriptions.subscribe(data => {
      if (data
        && data.serviceSubscriptions
        && data.serviceSubscriptions.length) {
        this.subscribedServices = data.serviceSubscriptions;
        this.filterForSubscribed();
      }
    });
  }
}
