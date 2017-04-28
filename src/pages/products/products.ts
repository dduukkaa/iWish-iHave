import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

import 'rxjs/Rx';
import { Category } from '../categories/categories.model';
import { ProductModel } from './products.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'products-page',
  templateUrl: 'products.html'
})
export class ProductsPage {
  products: ProductModel[] = new Array<ProductModel>();
  loading: any;
  categoryId: number;
  categoryName: string;
  showAddToList: boolean;

  constructor(
    public nav: NavController,
    public productsService: ProductsService,
    public params: NavParams
  ) {
    this.categoryId = params.get("categoryId");
    this.categoryName = params.get("categoryName");
    
    if(params.get("products") != null)
      this.products = params.get("products");
  }

  ionViewDidLoad() {

    if(this.products.length == 0)
    {
      this.productsService.getData(this.categoryId)
        .then(result => {
            result.forEach(data => {
              this.products.push(data);
            });
        });

      this.showAddToList = true;
    }
    else
      this.showAddToList = false;
  }

  goToProductDetails(product: ProductModel)
  {
      product.canBeAddedToList = this.showAddToList;
      
      this.nav.push(ProductDetailsPage, product);
  }

}
