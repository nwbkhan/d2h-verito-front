import {Component, OnInit} from '@angular/core';
import {DataCommService} from '../../_models/data-comm.service';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService, UserService} from '../../_services';
import {User} from '../../_models';
import {UserChangeRequestModel} from '../../_models/user-change-request.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  email: string;
  phoneNo: string;
  oldEmail: string;
  oldPhoneNo: string;
  currentUser: User;

  constructor(private dataCommService: DataCommService,
              private authService: AuthenticationService,
              private snackbar: MatSnackBar,
              private userService: UserService) {
    this.listenForUser();
  }

  ngOnInit() {
  }

  private listenForUser() {
    this.authService
      .currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user;
          this.phoneNo = this.currentUser.phoneNo;
          this.email = this.currentUser.email;
          this.oldEmail = this.phoneNo;
          this.oldPhoneNo = this.email;
        }
      });
  }

  get hasFieldsChanged() {
    return !(this.oldEmail === this.email
      && this.oldPhoneNo === this.phoneNo);
  }

  postUser() {
    const user = new UserChangeRequestModel();
    user.email = this.email;
    user.phoneNo = this.phoneNo;
    this.userService
      .postUser(user)
      .subscribe(response => {
        this.snackbar.open('Changed user details', 'Ok', {duration: 3000});
        this.dataCommService.callCurrentPacksApi.next(true);
      }, e => {
        console.log(e);
        this.snackbar.open(e.error.message, 'Ok', {duration: 3000});
      });
  }
}
