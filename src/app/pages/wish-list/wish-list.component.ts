import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/user/models/product.model';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [],
})
export class WishListComponent implements OnInit {
  products: Product[] = [];

  constructor(private userService: UserService, private router: Router) {
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
  addProductToCart(productId: number) {
    this.removeProduct(productId);
    this.userService.addProductToCartlist(productId).subscribe(() => {
      this.userService.notifyCartToAll();
    });
  }
  addAllProductToCart() {
    this.userService.addAllProductToCartlist().subscribe(resp => {
      // console.log(resp);
      this.userService.notifyWishToAll();
      this.userService.notifyCartToAll();
      this.router.navigate(['/shop-cart']);
    });
  }
}
