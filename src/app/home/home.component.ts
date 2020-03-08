import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '../_services';
import {Router} from '@angular/router';
import {User} from '../_models';
import {CurrentSubscription} from '../_models/current-subscription.model';
import {ChannelSubscriptionPackModel} from '../_models/subscription.model';
import {SubscriptionService} from '../_services/subscription.service';
import {MatSnackBar} from '@angular/material';
import {DataCommService} from '../_models/data-comm.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  private token;
  private user: User;
  private currentSubsName: string;
  private currentSubsPck: CurrentSubscription;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthenticationService,
              private snackbar: MatSnackBar,
              private dataCommService: DataCommService,
              private subscriptionService: SubscriptionService,
              private authenticationService: AuthenticationService) {
    this.listenForDataComm();
    this.getUser();
    this.getCurrentSubscriptionPack();
    this.listenForUser();
  }

  ngOnInit() {

  }

  listenForUser() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  private getCurrentSubscriptionPack() {
    this.subscriptionService
      .getCurrentPack()
      .subscribe(response => {
        this.currentSubsPck = response.data;
        if (this.currentSubsPck.channelSubscriptionPacks
          && this.currentSubsPck.channelSubscriptionPacks.length) {
          this.currentSubsName = this.currentSubsPck.channelSubscriptionPacks[0].channelPack.packName;
        }
        this.dataCommService.currentSubscriptions.next(this.currentSubsPck);
      }, e => {
        console.log(e);
        this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getUser() {
    this.userService
      .getUser()
      .subscribe(response => {
        this.currentUser = response.data;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        setTimeout(() => {
          this.authenticationService.currentUser.next(this.currentUser);
        }, 400);
      });
  }

  private listenForDataComm() {
    this.dataCommService.callCurrentPacksApi.subscribe(x => {
      if (x) {
        this.getCurrentSubscriptionPack();
        this.getUser();
      }
    });
  }
}
