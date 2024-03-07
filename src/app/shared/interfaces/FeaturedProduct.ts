export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  old_price: string;
  price: string;
  currency_id: number;
  currency_sign: string;
}

export interface FeaturedProduct {
  category: string;
  products: Product[];
}
