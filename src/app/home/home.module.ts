import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionPackComponent} from './subscription-pack/subscription-pack.component';
import {ChannelSubscriptionComponent} from './channel-subscription/channel-subscription.component';
import {ServiceSubscriptionComponent} from './service-subscription/service-subscription.component';
import {RechargeComponent} from './recharge/recharge.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SubscriptionService} from '../_services/subscription.service';
import {UserService} from '../_services';
import {CoreModule} from '../core/core.module';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  declarations: [SubscriptionPackComponent,
    ChannelSubscriptionComponent,
    ServiceSubscriptionComponent,
    HomeComponent,
    RechargeComponent,
    MyAccountComponent],
  imports: [
    CoreModule,
    HomeRoutingModule
  ],
  providers: [SubscriptionService, UserService]
})
export class HomeModule {
}
