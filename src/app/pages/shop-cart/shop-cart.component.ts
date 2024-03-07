import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  totalRD: number = 0;
  totalUSD: number = 0;
  priceProduct: number = 432;
  showConfirmation: boolean = false;
  messageConfirm: string =
    '¿Estas seguro que deseas borrar todos los productos del carrito? ¡Esta acción no se puede desshacer!';
  noProduct: boolean = false;
  showCancel: boolean = true;
  order_id: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentCartlist.subscribe(resp => {
      // console.log(resp);
      this.products =
        resp.shop_cart_list && resp.shop_cart_list.length > 0
          ? resp.shop_cart_list
          : [];
      if (this.products.length > 0) {
        this.products.forEach(e => {
          e.quantity = 1;
          e.subtotal = e.price * e.quantity;
        });
        this.getTotal();
      }
    });
  }

  ngOnInit(): void { }

  getTotal() {
    this.totalRD = 0;
    this.totalUSD = 0;
    this.products.forEach(p => {
      if (p.currency_id == 1) {
        this.totalRD += p.price * p.quantity;
      } else {
        this.totalUSD += p.price * p.quantity;
      }
    });
  }


  getPriceTotalProduct(index: number) {
    // this.products[index].priceTotal =
    //   this.products[index].priceByUnit * this.products[index].productQuantity;
  }

  addProduct(index: number) {
    // console.log(index);
    if (this.products[index] != null && this.products[index] != undefined) {
      this.products[index].quantity += 1;
      this.products[index].subtotal =
        this.products[index].price * this.products[index].quantity;
      this.getTotal();
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
      this.products[index].subtotal =
        this.products[index].price * this.products[index].quantity;
      this.getTotal();
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

  detailProduct(id: number) {
    this.router.navigate(['/product'], { queryParams: { id } });
  }

  sendProductsToOrder() {
    // console.log('sendProductsToOrder',this.products);
    //this.userService.prepareOrder(this.products);
    this.userService.prepareOrder(this.products).subscribe(resp => {
      if (resp.status_code == 201) {
        this.order_id = resp.order_id;
        this.router.navigate(['/sales-order-step1'], {
          queryParams: { id: this.order_id },
        });
      } else {
        //TODO MOSTRAR MENSAJE DE ERROR
      }
    });
  }
}
