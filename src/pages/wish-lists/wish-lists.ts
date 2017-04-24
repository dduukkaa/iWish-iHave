import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

import 'rxjs/Rx';
import { WishListModel } from './wish-lists.model';
import { WishListsService } from './wish-lists.service';

@Component({
  selector: 'wish-lists-page',
  templateUrl: 'wish-lists.html'
})
export class WishListsPage {
  wishLists: WishListModel[] = new Array<WishListModel>();
  loading: any;
  // categoryId: number;
  // categoryName: string;

  constructor(
    public nav: NavController,
    public wishListsService: WishListsService,
    public params: NavParams
  ) {
    // this.categoryId = params.get("categoryId");
    // this.categoryName = params.get("categoryName");
  }

  ionViewDidLoad() {

    this.wishListsService.getWishLists()
      .toPromise()
      .then(result => {
          result.forEach(data => {
            this.wishLists.push(data);
          });
      });
  }

  goToListItems(product: WishListModel)
  {
      this.nav.push(ProductDetailsPage, product);
  }

}
