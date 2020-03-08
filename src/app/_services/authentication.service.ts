import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../_models';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  isUserLoggedIn() {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post<any>(`auth/login`, {username, password})
      .pipe(map(user => {
        console.log(user);
        if (user && user.data) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('token', user.data);
        }
        return user;
      }));
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('token');
  }
}
