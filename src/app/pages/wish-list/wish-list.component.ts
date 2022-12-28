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
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [
  ]
})
export class WishListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
