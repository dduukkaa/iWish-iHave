import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HomeService {
  public wishLists: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.wishLists = this.af.database.list('wishLists');
  }

  addWishLists(wishlist) {
    this.wishLists.push(wishlist);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
