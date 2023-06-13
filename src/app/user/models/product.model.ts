export class Product {
  id: number;
  available: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  old_price: number;
  price: number;
  quantity: number;
  subtotal: number;
  constructor() {
    this.id = 0;
    this.available = 0;
    this.name = '';
    this.image = '';
    this.rating = 0;
    this.reviews = 0;
    this.old_price = 0;
    this.price = 0;
    this.quantity = 1;
    this.subtotal = 0;
  }
}
