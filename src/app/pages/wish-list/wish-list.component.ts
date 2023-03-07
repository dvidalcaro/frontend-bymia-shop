import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/user/models/wishlist.interface';
import { UserService } from 'src/app/user/services/user.service';

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  rating: number;
  review: number;
}

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [],
})
export class WishListComponent implements OnInit {
  products: any[] = [];

  constructor(private user: UserService) {
    this.user.currentWishlist.subscribe(resp => {
      console.log(resp.wish_list.length);
      this.products = resp.wish_list;
    });
  }

  ngOnInit(): void {}

  addProduct() {
    this.user.addProductToWishlist(1467).subscribe(resp => {
      // console.log(resp);
      this.user.notifyWishToAll();
    });
  }
  removeProduct() {
    this.user.removeProductToWishlist(1467).subscribe(resp => {
      // console.log(resp);
      this.user.notifyWishToAll();
    });
  }
}
