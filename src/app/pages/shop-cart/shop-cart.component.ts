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
    console.log();

    this.priceTotal = this.priceTotal - this.products[id].priceTotal
    this.products.splice(id, 1)


    console.log(this.products)
  }

  deleteAllProduct() {
    this.products.splice(0, this.products.length);
    this.priceTotal=0;
  }

  subTotalProducts() {
    this
  }

}
