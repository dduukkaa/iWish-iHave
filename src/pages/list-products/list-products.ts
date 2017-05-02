import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ActionSheetController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { WishListModel} from '../wish-lists/wish-lists.model';
import { ItemSliding, Item } from 'ionic-angular';

import 'rxjs/Rx';
import { Category } from '../categories/categories.model';
import { ProductModel } from '../products/products.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'list-products-page',
  templateUrl: 'list-products.html'
})
export class ListProductsPage {
  wishList: WishListModel;
  deletedItems: ProductModel[];
  isEditing: boolean;
  selectedItemSlide: ItemSliding;
  loading: any;

  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public productsService: ProductsService,
    public params: NavParams
  ) {
      this.wishList = params.get("wishList");
      this.isEditing = false;
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
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Alterar Lista',
     buttons: [
       {
         text: 'Deletar',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Editar',
         handler: () => {
           
           this.isEditing = true;

         }
       },
       {
         text: 'Renomear',
         handler: () => {
           console.log('Archive clicked');
         }
       },
       {
         text: 'Compartilhar',
         handler: () => {
           console.log('Archive clicked');
         }
       },
       {
         text: 'Cancelar',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

}
