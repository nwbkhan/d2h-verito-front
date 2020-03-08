import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {User} from '../_models';
import {UserChangeRequestModel} from '../_models/user-change-request.model';
import {Observable} from 'rxjs';
import {ApiResponseModel} from '../_models/api-reponse.model';

@Injectable({providedIn: 'root'})
export class UserService {
  USER_PATH = '/user';
  AUTH_PATH = '/auth';
  LOGIN_PATH = this.AUTH_PATH + '/login';
  SIGNUP_PATH = this.AUTH_PATH + '/signup';
  LOGOUT_PATH = this.AUTH_PATH + '/logout';
  GET_USER_PATH = this.USER_PATH;
  POST_USER_PATH = this.USER_PATH;
  RECHARGE_PATH = this.USER_PATH + '/recharge';

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post(this.LOGIN_PATH, user);
  }

  signup(user: User) {
    return this.http.post(this.SIGNUP_PATH, user);
  }

  logout(user: User) {
    return this.http.post(this.LOGOUT_PATH, {});
  }

  getUser(): Observable<ApiResponseModel<User>> {
    return this.http.get<ApiResponseModel<User>>(this.GET_USER_PATH);
  }

  postUser(user: UserChangeRequestModel) {
    return this.http.post(this.POST_USER_PATH, {email: user.email, phoneNo: user.phoneNo});
  }

  recharge(amt: number) {
    return this.http.post(this.RECHARGE_PATH, {}, {params: {rechargeAmt: amt.toString()}});
  }
}
