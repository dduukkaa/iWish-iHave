import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
import { List1Page } from '../list-1/list-1';
import { List2Page } from '../list-2/list-2';
import { GridPage } from '../grid/grid';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { ProductsPage } from '../products/products';

import { Category } from './categories.model';
import {CategoryModel} from '../categories/categories.model';
import {CategoriesService} from '../categories/categories.service';
import {ProductsService} from '../products/products.service';
 
@Component({
  selector: 'categories-page',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  public categories: Array<Category> = new Array<Category>();
  constructor(public nav: NavController,
  public categoriesService: CategoriesService,
  public productsService: ProductsService) {

  }

  ionViewDidLoad() {
    this.categoriesService.getData().then(model => {
      model.forEach(data => {
        this.categories.push(data);
      });
    });
  }
  
  itemTapped(event, item) {
    this.nav.push(item.id);
  }

  goToProducts(categoryId: number, categoryName: string)
  {
    this.nav.push(ProductsPage, { categoryId, categoryName});
  }
}
