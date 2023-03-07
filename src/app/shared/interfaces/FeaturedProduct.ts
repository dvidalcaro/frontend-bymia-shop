export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: string;
  old_price: number;
  price: number;
}

export interface FeaturedProduct {
  category: string;
  products: Product[];
}
