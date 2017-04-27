import { ProductModel } from '../products/products.model';

export class WishListModel{
  $key: string;
  name: string;
  description:string;
  items: Array<ProductModel>;
}