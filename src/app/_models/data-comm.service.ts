import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CurrentSubscription} from './current-subscription.model';

@Injectable({providedIn: 'root'})
export class DataCommService {

  public currentSubscriptions: BehaviorSubject<CurrentSubscription> = new BehaviorSubject<CurrentSubscription>(null);
  public callCurrentPacksApi: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
