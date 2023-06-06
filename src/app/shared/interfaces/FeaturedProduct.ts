export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  old_price: string;
  price: string;
}

export interface FeaturedProduct {
  category: string;
  products: Product[];
}
