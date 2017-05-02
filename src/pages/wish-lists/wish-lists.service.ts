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
  
  updateWishList(wishList:any) {
    
    if(wishList.hasOwnProperty("$key"))
      this.wishLists.update(wishList.$key, wishList);
    else
      this.wishLists.update(wishList.key, wishList);
      
  }

  addWishList(wishList:any) {
    
    return this.wishLists.push(wishList).key;
    
  }

  getWishLists(): Promise<any[]> {

    return this.wishLists
      .first()
      .toPromise()
      .then(response => response);
  }

  deleteWishList(wishList:any){

    if(wishList.hasOwnProperty("$key"))
      this.wishLists.remove(wishList.$key);
    else
      this.wishLists.remove(wishList.key);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
