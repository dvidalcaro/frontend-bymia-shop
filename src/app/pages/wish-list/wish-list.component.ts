import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.model';
import { Product } from 'src/app/user/models/wishlist.model';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [],
})
export class WishListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    // private authService: AuthService,
    private userService: UserService
  ) {
    this.userService.currentWishlist.subscribe(resp => {
      // console.log(resp);
      this.products =
        resp.wish_list && resp.wish_list.length > 0 ? resp.wish_list : [];
    });
  }

  ngOnInit(): void {}

  removeProduct(productId: number) {
    this.userService.removeProductToWishlist(productId).subscribe(resp => {
      // console.log(resp);
      this.userService.notifyWishToAll();
    });
  }
}
