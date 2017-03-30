import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ProductDetailsModel } from './product-details.model';

@Injectable()
export class ProductDetailsService {
  constructor(public http: Http) {}

  getData(): Promise<ProductDetailsModel> {
    return this.http.get('./assets/example_data/profile.json')
     .toPromise()
     .then(response => response.json() as ProductDetailsModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
