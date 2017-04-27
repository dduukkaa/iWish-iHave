import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import {Observable, Subject} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';

import { WishListModel } from './wish-lists.model';

@Injectable()
export class WishListsService {
private wishLists: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.wishLists = this.af.database.list('wishLists');
  }
  
  insertUpdateWishList(wishList:any) {
    if (wishList.hasOwnProperty('$key')) {
      this.wishLists.update(wishList.$key, wishList);
    } else {
      this.wishLists.push(wishList);
    }
  }

  getWishLists(): Promise<any[]> {

    return this.wishLists
      .first()
      .toPromise()
      .then(response => response);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
