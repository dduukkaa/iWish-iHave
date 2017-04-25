import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProductModel } from '../products/products.model';

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
  resultMessage: string;

  constructor(
    public nav: NavController,
    public wishListsService: WishListsService,
    public alertCtrl: AlertController,
    public params: NavParams
  ) {
    // this.categoryId = params.get("categoryId");
    // this.categoryName = params.get("categoryName");
  }

  ionViewDidLoad() {

    this.wishListsService.getWishLists()
      .then(result => {
        
          result.forEach(data => {

            if(data.items != null)
              data.description = data.items.length + " items...";
            this.wishLists.push(data);
          });
      });
  }

  goToListItems(product: WishListModel)
  {
      //this.nav.push(ProductDetailsPage, product);
  }

showCreateNew() {
    let prompt = this.alertCtrl.create({
      title: 'Nova Lista',
      message: "Digite o nome de sua nova lista de desejos.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Criar',
          handler: data => {

            let wishList = new WishListModel();
            wishList.name = data.name;
            wishList.items = new Array<ProductModel>();

            this.wishListsService.addWishLists(wishList)

            this.ionViewDidLoad();
          }
        }
      ]
    });
    prompt.present();
  }
}
