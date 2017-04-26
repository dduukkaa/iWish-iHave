
import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ProductModel } from '../../pages/products/products.model';
import { WishListModel } from '../../pages/wish-lists/wish-lists.model';
import { WishListsService } from '../../pages/wish-lists/wish-lists.service';

@Component({
  selector: 'add-to-list-modal',
  templateUrl: 'add-to-list.html'
})
export class ModalContentPage {
  product: ProductModel = new ProductModel();
  wishLists: WishListModel[];

  constructor(
    public wishListsService: WishListsService,
    public platform: Platform,
    public params: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
      this.product = this.params.get('product');
      this.wishLists = new Array<WishListModel>();
  }

   ionViewDidLoad() {
    
    if(this.wishLists.length > 0)
      this.wishLists = new Array<WishListModel>();

    this.wishListsService.getWishLists()
      .then(result => {
        
          result.forEach(data => {

            if(data.items != null)
              data.description = data.items.length + " items...";
            else
              data.description = "0 items..."
            this.wishLists.push(data);

          });
      });
  }

   dismiss() {
    this.viewCtrl.dismiss();
  }

  pickListToAdd(wishList: WishListModel)  {
    
    if(wishList.items == null)
      wishList.items = new Array<ProductModel>();
      
    wishList.items.push(this.product);

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

            this.wishListsService.addWishLists(wishList)

            this.ionViewDidLoad();
          }
        }
      ]
    });
    prompt.present();
  }
}