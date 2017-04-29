import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ActionSheetController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { WishListModel} from '../wish-lists/wish-lists.model';
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
  loading: any;

  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public productsService: ProductsService,
    public params: NavParams
  ) {
      this.wishList = params.get("wishList");
  }

  goToProductDetails(product: ProductModel)
  {
      product.canBeAddedToList = false;
      
      this.nav.push(ProductDetailsPage, { product: product });
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
           console.log('Archive clicked');
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
