export class CategoryModel {
   top5category: Category[] = new Array<Category>();
}

export class Category{
  thumbnail: Thumbnail = new Thumbnail();
  name: string;
  id: number;
}

export class Thumbnail{
  url: string;
}
