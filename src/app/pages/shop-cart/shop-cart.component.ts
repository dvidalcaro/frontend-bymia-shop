import { Component, OnInit } from '@angular/core';

interface Products {
  id: number;
  nameProduct: string;
  priceByUnit: number;
  productQuantity: number;
  priceTotal: number;
  img_url: string;


}

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styles: [
  ]
})


export class ShopCartComponent implements OnInit {

  productQuantity: number = 0;
  priceTotal: number = 0;
  priceProduct: number = 432;
  showConfirmation: boolean= false;
  messageConfirm: string = '¿Estas seguro que deseas borrar todos los productos del carrito? ¡Esta acción no se puede desshacer!';
  noProduct: boolean = false;
  showCancel: boolean = true;

  products: Products[] = [

    {
      'id': 0,
      'nameProduct': 'HP Elite Dragonfly G3. The best HP laptop overall',
      'priceByUnit': 432,
      'productQuantity': 1,
      'priceTotal': 0,
      'img_url': '../assets/img/desktophp.png'
    },

    {
      'id': 1,
      'nameProduct': 'klk Elite Dragonfly G3. The best HP laptop overall',
      'priceByUnit': 435,
      'productQuantity': 1,
      'priceTotal': 0,
      'img_url': '../assets/img/desktophp.png'
    },

    {
      'id': 3,
      'nameProduct': '5548 Elite Dragonfly G3. The best HP laptop overall',
      'priceByUnit': 835,
      'productQuantity': 1,
      'priceTotal': 0,
      'img_url': '../assets/img/desktophp.png'
    }
  ]


  constructor() {
    this.getPriceTotal()
  }

  ngOnInit(): void {
  }

  getPriceTotal() {

    this.products.forEach((priceTotal, index) => {
      priceTotal.priceTotal = priceTotal.priceByUnit * priceTotal.productQuantity;
      this.priceTotal = this.priceTotal + priceTotal.priceTotal;

    })

    console.log(this.products)
    console.log(this.priceTotal)
  }
  getPriceTotalProduct(index: number) {

    this.products[index].priceTotal = this.products[index].priceByUnit * this.products[index].productQuantity

  }


  addProduct(index: number) {
    this.products[index].productQuantity++

    this.getPriceTotalProduct(index)

    this.priceTotal = this.priceTotal + this.products[index].priceByUnit
  }

  subtractProduct(index: number) {
    if (this.products[index].productQuantity === 1) {
      return
    } else {

      this.products[index].productQuantity--

      this.getPriceTotalProduct(index)

      this.priceTotal = this.priceTotal - this.products[index].priceByUnit

    }
  }

  deleteProduct(id: number) {
    

    this.priceTotal = this.priceTotal - this.products[id].priceTotal
    this.products.splice(id, 1)
    this.showNoProduct();

    
  }

  deleteAllProduct() {
    this.products.splice(0, this.products.length);
    this.priceTotal=0;
  }

  subTotalProducts() {
    this
  }

  openConfirm(){
    if (this.products.length > 0) {
      this.showConfirmation=true;
      this.showCancel= true;
    } else {
      this.messageConfirm='No hay productos para borrar'
      this.showConfirmation=true;
      this.showCancel= false;
    }
    
  }

  closeDelete(){
    this.showConfirmation=false;
  }

  confirmDeleteAllProduct(){
    if (this.products.length > 0) {
      this.deleteAllProduct();
    this.showConfirmation=false;
    this.showNoProduct();
    } else {
      this.showConfirmation=false;
    }
    
  }

  showNoProduct(){

    if (this.products.length > 0) {
      this.noProduct= false;
    } else {
      this.noProduct= true;
    }
    
  }

}
