import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams, ActionSheetController, ActionSheetOptions } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { WishListModel} from '../wish-lists/wish-lists.model';
import { ItemSliding, Item } from 'ionic-angular';

import 'rxjs/Rx';
import { Category } from '../categories/categories.model';
import { ProductModel } from '../products/products.model';
import { ProductsService } from '../products/products.service';
import { WishListsService } from '../wish-lists/wish-lists.service';
import { WishListsPage } from '../wish-lists/wish-lists';


@Component({
  selector: 'list-products-page',
  templateUrl: 'list-products.html'
})
export class ListProductsPage {
  wishList: WishListModel;
  deletedItems: ProductModel[];
  hasItems: boolean;
  isEditing: boolean;
  selectedItemSlide: ItemSliding;
  loading: any;

  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public productsService: ProductsService,
    public wishListsService: WishListsService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public params: NavParams
  ) {
      this.wishList = params.get("wishList");
      this.isEditing = false;

      if(this.wishList.items == null || this.wishList.items.length == 0)
        this.hasItems = false;
      else
        this.hasItems = true;
  }

  goToProductDetails(product: ProductModel)
  {
      product.canBeAddedToList = false;
      
      this.nav.push(ProductDetailsPage, { product: product });
  }

  doRemove(product: ProductModel){

     let updatedItemList = this.wishList.items.filter(item => item.id != product.id);

     this.wishList.items = updatedItemList;

  }

  saveChanges(){

    this.wishListsService.updateWishList(this.wishList);

    this.isEditing = false;

    this.presentSuccesAlert("Alterações Salvas", 1000)
    
  }

  open(itemSlide: ItemSliding, item: Item, $event) {

          itemSlide.setElementClass("active-sliding", true);
          itemSlide.setElementClass("active-slide", true);
          itemSlide.setElementClass("active-options-right", true);
          item.setElementStyle("transform", "translate3d(-144px, 0px, 0px)")

  }

  close(itemSlide: ItemSliding) {

      itemSlide.close();
      itemSlide.setElementClass("active-sliding", false);
      itemSlide.setElementClass("active-slide", false);
      itemSlide.setElementClass("active-options-right", false);

  }

  presentActionSheet() {
    var arrButtons = new Array<any>();

    if(this.wishList.items != null && this.wishList.items.length >0){
      //Edit
      arrButtons.push({
         text: 'Editar',
         handler: () => {
           
           this.isEditing = true;

         }
      });

      //Share
      arrButtons.push({
          text: 'Compartilhar',
          handler: () => {
            console.log('Archive clicked');
          }
        });
      }
  
    //Delete
    arrButtons.push({
        text: 'Deletar',
        role: 'destructive',
        handler: () => {
          
          this.wishListsService.deleteWishList(this.wishList);
          
          this.presentSuccesAlert("Lista Excluída", 2000);

          this.nav.push(WishListsPage);
        }
      });

    //Rename
    arrButtons.push({
        text: 'Renomear',
        handler: () => {
          
          this.presentRenamePrompt();

        }
      });
    //Cancel
    arrButtons.push({
        text: 'Cancelar',
        role: 'cancel'
      });

    let actionSheet = this.actionSheetCtrl.create({
        title: 'Alterar Lista',
        buttons: arrButtons
      });

    actionSheet.present();
 }

  presentSuccesAlert(message, duration){
      let succesAlert = this.loadingCtrl.create({
          spinner: "hide",
          content: `
            <div class="loading-custom-spinner-container">
              <div class="checkmark draw"></div>
            </div>
            <div class='checkmark-text'>` + message + "</div>",
          duration: duration
        });

      return succesAlert.present();
  }

  presentRenamePrompt() {
    let alert = this.alertCtrl.create({
      title: 'Renomear',
      inputs: [
        {
          name: 'listName',
          placeholder: 'Nome da lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
              
              if(data.listName != "")
              {
                this.wishList.name = data.listName;

                this.wishListsService.updateWishList(this.wishList);
                
                this.presentSuccesAlert("Nome Alterado", 2000)
              }
              else
              {
                let msgAlert = this.alertCtrl.create({
                                                      title: 'Atenção',
                                                      subTitle: 'É necessário informar o nome.',
                                                      buttons: ['Dismiss']
                                                    });
                msgAlert.present();

                 this.presentRenamePrompt();
              }
          }
        }
      ]
    });

    alert.present();
  }
}
