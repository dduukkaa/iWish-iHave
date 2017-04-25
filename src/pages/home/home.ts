import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import 'rxjs/Rx';
import { HomeModel } from './home.model';
import { HomeService } from './home.service';
import { ProductModel } from '../products/products.model';
import { WishListModel } from '../wish-lists/wish-lists.model';
import { WishListsPage } from '../wish-lists/wish-lists';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
})
export class HomePage {
  home: HomeModel = new HomeModel();
  loading: any;

  constructor(
    public nav: NavController,
    public homeService: HomeService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {

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

            this.homeService.addWishLists(wishList)
          }
        }
      ]
    });
    prompt.present();
  }

  goToWishLists(){
    this.nav.push(WishListsPage);
  }
}
