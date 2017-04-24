import { ProductModel } from '../products/products.model';

export class HomeModel {
  recentItems: Array<ProductModel>;
}

export class HomeItemModel {
  title: string;
  image: string;
}
