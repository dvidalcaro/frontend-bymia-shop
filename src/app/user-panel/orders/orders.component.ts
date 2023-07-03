import { Component, OnInit } from '@angular/core';
import { orderInformation } from '../../shared/interfaces/order-interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  iconSearch: string = 'bx bx-search-alt-2 bx-tada-hover';
  showFormPayment: boolean = false;
  showReturnForm: boolean = false;
  orders: orderInformation[] = [
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
    },
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
    },
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  openForm() {
    this.showFormPayment = true;
  }
  closedForm() {
    this.showFormPayment = false;
  }

  openReturnForm() {
    this.showReturnForm = true;
  }

  closedReturnForm() {
    this.showReturnForm = false;
  }
}
