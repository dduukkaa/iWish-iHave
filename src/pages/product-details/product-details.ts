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
  product: ProductModel = new ProductModel();
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

    let modal = this.modalCtrl.create(ModalContentPage, product);
    modal.present();
  }
  // ionViewDidLoad() {
  //   this.loading.present();
  //   this.profileService
  //     .getData()
  //     .then(data => {
  //       // this.profile.user = data.user;
  //       // this.profile.following = data.following;
  //       // this.profile.followers = data.followers;
  //       // this.profile.posts = data.posts;
  //       this.loading.dismiss();
  //     });
  // }

  // goToFollowersList() {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   this.app.getRootNav().push(FollowersPage, {
  //     // list: this.profile.followers
  //   });
  // }

  // goToFollowingList() {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   this.app.getRootNav().push(FollowersPage, {
  //     // list: this.profile.following
  //   });
  // }

  // goToSettings() {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   this.app.getRootNav().push(SettingsPage);
  // }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  // sharePost(post) {
  //  //this code is to use the social sharing plugin
  //  // message, subject, file, url
  //  SocialSharing.share(post.description, post.title, post.image)
  //  .then(() => {
  //    console.log('Success!');
  //  })
  //  .catch(() => {
  //     console.log('Error');
  //  });
  //}
}
