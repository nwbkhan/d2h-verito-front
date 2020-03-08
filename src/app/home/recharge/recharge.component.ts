import {Component, OnInit} from '@angular/core';
import {DataCommService} from '../../_models/data-comm.service';
import {MatSnackBar} from '@angular/material';
import {SubscriptionService} from '../../_services/subscription.service';
import {UserService} from '../../_services';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  private rechargeAmt;

  constructor(private dataCommService: DataCommService,
              private snackbar: MatSnackBar,
              private userService: UserService) {
  }

  recharge() {
    this.userService
      .recharge(this.rechargeAmt).subscribe(response => {
      this.snackbar.open('Successfully recharged with - ' + this.rechargeAmt, 'Ok');
      this.dataCommService.callCurrentPacksApi.next(true);
      this.rechargeAmt = null;
    }, e => {
      console.log(e);
      this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
    });
  }

  ngOnInit() {
  }

}
