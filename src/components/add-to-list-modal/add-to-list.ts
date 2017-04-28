
import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
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
  loading: any;
  isDataAvailable:boolean = false;
  listKey: string;

  constructor(
    public wishListsService: WishListsService,
    public platform: Platform,
    public params: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
  ) {
      this.loading = this.loadingCtrl.create();
      this.product = this.params.get('product');
      this.wishLists = new Array<WishListModel>();
  }

   ionViewDidLoad() {
    
    this.isDataAvailable = false;
    //this.loading.present();

    if(this.wishLists.length > 0)
      this.wishLists = new Array<WishListModel>();

    this.wishListsService.getWishLists()
      .then(result => {
        
          result.forEach(data => {

            if(data.items == null)
              data.items = new Array();
            
            this.wishLists.push(data);

          });

          this.isDataAvailable = true;
      });

      //this.loading.dismiss();
  }

   close() {

    this.viewCtrl.dismiss();

  }

  pickListToAdd(wishList: WishListModel)  {
    let prod = this.product;

    if(wishList.items == null)
      wishList.items = new Array<ProductModel>();

    if(!wishList.items.find(function(item: ProductModel){
        return item.id == prod.id;
    }))
    {
      wishList.items.push(prod);    
      
      this.wishListsService.updateWishList(wishList);
      
      this.presentSuccesAlert(wishList.name, 2000);

    }
    else
    {
      this.showAlert("Aviso","Não é possível adicionar o mesmo item mais de uma vez a lista.");
    }
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

            wishList.key = this.wishListsService.addWishList(wishList);

            this.wishLists.push(wishList);
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentSuccesAlert(message, duration)
  {
      let succesAlert = this.loadingCtrl.create({
          spinner: "hide",
          content: `
            <div class="loading-custom-spinner-container">
              <div class="checkmark draw"></div>
            </div>
            <div class='checkmark-text'>Adicionado à \"` + message + "\"</div>",
          duration: duration
        });

      succesAlert.present();
  }
}