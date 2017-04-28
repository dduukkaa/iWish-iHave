import { ProductModel } from '../products/products.model';

export class WishListModel{
  name: string;
  description:string;
  key:string;
  items: Array<ProductModel>;
}