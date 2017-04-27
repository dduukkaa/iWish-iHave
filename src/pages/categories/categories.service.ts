import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(public http: Http) {}

  getData(): Promise<Category[]> {
    return this.http.get('http://sandbox.buscape.com/service/findCategoryList/buscape/14932579459436cf3950f/BR/?CategoryId=0&format=json')
     .toPromise()
     .then(response => {
       
       return response.json().top5category
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
