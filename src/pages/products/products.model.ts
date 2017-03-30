export class ProductModel {
  thumbnail: Thumbnail;
  pricemax: string;
  quantity: number;
  specification: Specification;
  productshortname: string;
  hasmetasearch: boolean;
  pricemin: string;
  eco: boolean;
  numoffers: number;
  totalsellers: number;
  productname: string;
  fulldescription: boolean;
  id: number;
  categoryid: number;
}

export interface Thumbnail {
    width: number;
    url: string;
    height: number;
}

export interface Item2 {
    label: string;
    value: string[];
}

export interface Item {
    item: Item2;
}

export interface Specification {
    item: Item[];
}

