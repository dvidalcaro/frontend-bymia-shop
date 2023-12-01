import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { HomeSection } from 'src/app/shared/interfaces/HomeSection';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDetail } from 'src/app/user/models/product-detail.model';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { Product } from 'src/app/user/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  homeSections: HomeSection[] = [];
  showProduct: boolean = false;

  private user: User | null = null;
  productsWL: Product[] = [];
  productsCL: Product[] = [];
  productDetail: ProductDetail;
  imageSrc: string = '';
  especification: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public bymiaService: BymiaService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.productDetail = new ProductDetail();
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.userService.currentWishlist.subscribe(resp => {
      this.productsWL =
        resp.wish_list && resp.wish_list.length > 0 ? resp.wish_list : [];
    });
    this.userService.currentCartlist.subscribe(resp => {
      this.productsCL =
        resp.shop_cart_list && resp.shop_cart_list.length > 0
          ? resp.shop_cart_list
          : [];
    });
    bymiaService.getSections().subscribe(resp => {
      this.homeSections = resp;
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params?.id) {
        // console.log(params);
        this.bymiaService
          .getProductDetail(params.id)
          .subscribe((productDetail: ProductDetail) => {
            // console.log(productDetail);
            this.productDetail = productDetail;
          });
      }
    });
  }

  addProductWL(idProduct: number) {
    // console.log(idProduct, this.user);
    if (this.user !== null) {
      this.userService.addProductToWishlist(idProduct).subscribe(resp => {
        // console.log(resp);
        this.userService.notifyWishToAll();
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  addProductCL(idProduct: number) {
    if (this.user !== null) {
      this.userService.addProductToCartlist(idProduct).subscribe(() => {
        // console.log(resp);
        this.userService.notifyCartToAll();
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  removeProductWL(idProduct: number) {
    if (this.user !== null) {
      this.userService.removeProductToWishlist(idProduct).subscribe(resp => {
        // console.log(resp);
        this.userService.notifyWishToAll();
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  removeProductCL(idProduct: number) {
    // console.log(idProduct, this.user);
    if (this.user !== null) {
      this.userService.removeProductToCartlist(idProduct).subscribe(resp => {
        // console.log(resp);
        this.userService.notifyWishToAll();
        this.userService.notifyCartToAll();
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  toggleProductWL(idProduct: string) {
    // console.log('toggleProduct()', idProduct, this.products);
    if (this.productsWL.find(e => e.id == parseInt(idProduct))) {
      this.removeProductWL(parseInt(idProduct));
    } else {
      this.addProductWL(parseInt(idProduct));
    }
  }

  toggleProductCL(idProduct: string) {
    // console.log('toggleProduct()', idProduct, this.products);
    if (this.productsCL.find(e => e.id == parseInt(idProduct))) {
      this.removeProductCL(parseInt(idProduct));
    } else {
      this.addProductCL(parseInt(idProduct));
    }
  }

  isInWishList(idProduct: string) {
    // console.log('isInWishList()', idProduct, this.products);
    if (this.productsWL.find(e => e.id == parseInt(idProduct))) {
      return `<i class="bx bx-tada-hover bx-sm bxs-heart text-dark product__i"></i>`;
    } else {
      return `<i class="bx bx-tada-hover bx-sm bx-heart text-dark product__i"></i>`;
    }
  }

  isInCartList(idProduct: string) {
    // console.log('isInWishList()', idProduct, this.products);
    if (this.productsCL.find(e => e.id == parseInt(idProduct))) {
      return `<i class="bx bx-tada-hover bx-sm bx-cart text-dark product__i"></i> Sacar de carrito`;
    } else {
      return `<i class="bx bx-tada-hover bx-sm bx-cart-add text-dark product__i"></i> Agregar a carrito`;
    }
  }

  showZoom(src: string) {
    this.imageSrc = src;
    this.showProduct = true;
  }

  closeZoom() {
    this.showProduct = false;
  }

  ngOnInit() {}

  anotherProduct(id: number) {
    this.router.navigate(['/product'], { queryParams: { id } });
    window.scroll(0, 0);
  }
}
