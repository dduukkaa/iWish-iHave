import { ProductModel } from '../products/products.model';

export class WishListModel{
  name: string;
  description:string;
  items: Array<ProductModel>;
}