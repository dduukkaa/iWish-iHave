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
  wishLists: WishListModel[];
  loading: any;
  resultMessage: string;
  isDataAvailable:boolean = false;

  constructor(
    public nav: NavController,
    public wishListsService: WishListsService,
    public alertCtrl: AlertController,
    public params: NavParams) {

      this.wishLists = new Array<WishListModel>();

    }

  ionViewDidLoad() {
    this.isDataAvailable = false;

    this.wishListsService.getWishLists()
      .then(result => {
        
          result.forEach(data => {

            if(data.items == null)
              data.items = new Array();
            
            data.description = data.items.length + " items...";

            this.wishLists.push(data);

          });

          this.isDataAvailable = true;
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
          placeholder: 'Nome da lista de desejos'
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

            this.wishListsService.insertUpdateWishList(wishList)

            //this.ionViewDidLoad();
          }
        }
      ]
    });
    
    prompt.present();
  }
}
