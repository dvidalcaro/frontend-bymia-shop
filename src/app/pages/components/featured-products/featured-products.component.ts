import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { User } from 'src/app/user/models/user.model';
import { Product } from 'src/app/user/models/product.model';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  @Input() title: string = '';
  @Input() category: string = 'category';
  @Input() featuredProducts: FeaturedProduct[] = [];

  products: Product[] = [];

  private user: User | null = null;

  loading: boolean = true;

  tempRating = '<i class="bx bx-tada-hover bx-sm bxs-star"></i>';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.userService.currentWishlist.subscribe(resp => {
      this.products =
        resp.wish_list && resp.wish_list.length > 0 ? resp.wish_list : [];
    });
  }

  isInWishList(idProduct: number) {
    // console.log('isInWishList()', idProduct, this.products);
    if (this.products.find(e => e.id == idProduct)) {
      return `<i class="bx bx-tada-hover bx-sm bxs-heart"></i>`;
    } else {
      return `<i class="bx bx-tada-hover bx-sm bx-heart"></i>`;
    }
  }

  toggleProduct(idProduct: number) {
    // console.log('toggleProduct()', idProduct, this.products);
    if (this.products.find(e => e.id == idProduct)) {
      this.removeProduct(idProduct);
    } else {
      this.addProduct(idProduct);
    }
  }

  addProduct(idProduct: number) {
    // console.log(idProduct, this.user);
    if (this.user !== null) {
      this.userService.addProductToWishlist(idProduct).subscribe(resp => {
        // console.log(resp);
        this.userService.notifyWishToAll();
      });
    }
  }
  removeProduct(idProduct: number) {
    // console.log(idProduct, this.user);
    if (this.user !== null) {
      this.userService.removeProductToWishlist(idProduct).subscribe(resp => {
        // console.log(resp);
        this.userService.notifyWishToAll();
      });
    }
  }

  getRating(stars: number, reviews: number) {
    let result = '';
    while (stars > 0) {
      if (stars <= 0.5) {
        result += '<i class="bx bx-tada-hover bxs-star-half"></i>';
      }
      if (stars > 0.5) {
        result += '<i class="bx bx-tada-hover bxs-star"></i>';
      }
      stars -= 1;
    }

    return `<div class="row"><div class="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-nowrap">${result}</div><div class="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-nowrap">${reviews} Reviews</div></div>`;
  }
  public ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featuredProducts) {
      this.loading = false;
      // console.log(changes);
    }
  }
}
