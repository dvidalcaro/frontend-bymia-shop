export class Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  old_price: string;
  price: string;
  quantity: number;
  constructor() {
    this.id = 0;
    this.name = '';
    this.image = '';
    this.rating = 0;
    this.reviews = 0;
    this.old_price = '';
    this.price = '';
    this.quantity = 0;
  }
}
