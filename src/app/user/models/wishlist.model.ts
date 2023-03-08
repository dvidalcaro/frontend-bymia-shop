export class Product {
  id?: number;
  name?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  old_price?: string;
  price?: string;
}
export class Wishlist {
  wish_list?: Product[];

  constructor() {}
}
