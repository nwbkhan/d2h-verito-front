import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {SubscriptionPackComponent} from './subscription-pack/subscription-pack.component';
import {ChannelSubscriptionComponent} from './channel-subscription/channel-subscription.component';
import {ServiceSubscriptionComponent} from './service-subscription/service-subscription.component';
import {RechargeComponent} from './recharge/recharge.component';
import {MyAccountComponent} from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'subscription-pack',
        component: SubscriptionPackComponent
      },
      {
        path: 'channel-subscription',
        component: ChannelSubscriptionComponent
      },
      {
        path: 'service-subscription',
        component: ServiceSubscriptionComponent
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      },
      {
        path: 'recharge',
        component: RechargeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
