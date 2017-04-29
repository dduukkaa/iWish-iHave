import { Component } from '@angular/core';
import { MenuController, SegmentButton, App, NavParams, LoadingController } from 'ionic-angular';
import { FollowersPage } from '../followers/followers';
import { SettingsPage } from '../settings/settings';
import { ModalContentPage } from '../../components/add-to-list-modal/add-to-list';
import { ProductModel } from '../products/products.model';
import { ProductDetailsService } from './product-details.service';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import 'rxjs/Rx';

@Component({
  selector: 'product-details-page',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  modalCtrl: ModalController = new ModalController(this.app);
  product: ProductModel;
  loading: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProductDetailsService,
    public loadingCtrl: LoadingController) {
      this.product = navParams.get("product");
      this.loading = this.loadingCtrl.create();
  }

  openModal(product) {

    let modal = this.modalCtrl.create(ModalContentPage, {product});
    modal.present();
  }

}
