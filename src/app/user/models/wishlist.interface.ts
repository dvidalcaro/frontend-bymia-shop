export interface Wishlist {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  old_price: null;
  price: string;
}
