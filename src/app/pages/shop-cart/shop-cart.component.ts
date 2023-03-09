import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/user/models/product.model';
import { UserService } from 'src/app/user/services/user.service';
@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styles: [],
})
export class ShopCartComponent implements OnInit {
  products: Product[] = [];
  productQuantity: number = 0;
  priceTotal: number = 0;
  priceProduct: number = 432;
  showConfirmation: boolean = false;
  messageConfirm: string =
    '¿Estas seguro que deseas borrar todos los productos del carrito? ¡Esta acción no se puede desshacer!';
  noProduct: boolean = false;
  showCancel: boolean = true;

  constructor(private userService: UserService) {
    this.getPriceTotal();
    this.userService.currentCartlist.subscribe(resp => {
      // console.log(resp);
      this.products =
        resp.shop_cart_list && resp.shop_cart_list.length > 0
          ? resp.shop_cart_list
          : [];
      if (this.products.length > 0) {
        this.products.forEach(e => {
          e.quantity = 1;
        });
      }
    });
  }

  ngOnInit(): void {}

  getPriceTotal() {
    // this.products.forEach((priceTotal, index) => {
    //   priceTotal.priceTotal =
    //     priceTotal.priceByUnit * priceTotal.productQuantity;
    //   this.priceTotal = this.priceTotal + priceTotal.priceTotal;
    // });
    // // console.log(this.products)
    // // console.log(this.priceTotal)
  }
  getPriceTotalProduct(index: number) {
    // this.products[index].priceTotal =
    //   this.products[index].priceByUnit * this.products[index].productQuantity;
  }

  addProduct(index: number) {
    // console.log(index);
    if (this.products[index] != null && this.products[index] != undefined) {
      this.products[index].quantity += 1;
    }
  }

  subtractProduct(index: number) {
    // console.log(index);
    if (
      this.products[index] != null &&
      this.products[index] != undefined &&
      this.products[index].quantity > 1
    ) {
      this.products[index].quantity -= 1;
    }
  }

  removeProduct(productId: number) {
    this.userService.removeProductToCartlist(productId).subscribe(() => {
      this.userService.notifyCartToAll();
      this.userService.addProductToWishlist(productId).subscribe(() => {
        this.userService.notifyWishToAll();
      });
    });
  }
  deleteProduct(id: number) {
    // this.priceTotal = this.priceTotal - this.products[id].priceTotal;
    // this.products.splice(id, 1);
    // this.showNoProduct();
  }

  deleteAllProduct() {
    // this.products.splice(0, this.products.length);
    // this.priceTotal = 0;
  }

  subTotalProducts() {
    // this;
  }

  openConfirm() {
    // if (this.products.length > 0) {
    //   this.showConfirmation = true;
    //   this.showCancel = true;
    // } else {
    //   this.messageConfirm = 'No hay productos para borrar';
    //   this.showConfirmation = true;
    //   this.showCancel = false;
    // }
  }

  closeDelete() {
    this.showConfirmation = false;
  }

  confirmDeleteAllProduct() {
    // if (this.products.length > 0) {
    //   this.deleteAllProduct();
    //   this.showConfirmation = false;
    //   this.showNoProduct();
    // } else {
    //   this.showConfirmation = false;
    // }
  }

  showNoProduct() {
    // if (this.products.length > 0) {
    //   this.noProduct = false;
    // } else {
    //   this.noProduct = true;
    // }
  }
}
