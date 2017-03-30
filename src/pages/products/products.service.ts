import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ProductModel } from './products.model';

@Injectable()
export class ProductsService {
  constructor(public http: Http) {}

  getData(CategoryId: number): Promise<ProductModel[]> {
    return this.http.get("http://sandbox.buscape.com/service/findProductList/buscape/4f714f6c423865466654413d/?categoryId="+CategoryId+"&format=json")
     .toPromise()
     .then(response => response.json().product as ProductModel[])
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
