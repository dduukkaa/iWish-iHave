import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

import 'rxjs/add/operator/toPromise';

import { WishListModel } from './wish-lists.model';

@Injectable()
export class WishListsService {
  public wishLists: FirebaseListObservable<WishListModel[]>;
  constructor(public af: AngularFire) {
    
  }

  getWishLists(): FirebaseListObservable<WishListModel[]> {
    return this.af.database.list('wishLists');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
