import { Component, OnInit } from '@angular/core';
import {
  orderInformation,
  orderDetails,
} from '../../shared/interfaces/order-interface';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  iconSearch: string = 'bx bx-search-alt-2 bx-tada-hover';
  showFormPayment: boolean = false;
  showReturnForm: boolean = false;
  showSeeDetail: boolean = false;
  btnBill = 'btn-desabilidato';
  orders: orderInformation[] = [];
  details!: orderDetails;
  // details: orderDetails;
  /* [
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
      bill: 'd',
    },
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
      bill: '',
    },
    {
      orderPlaced: 'febrero 1, 2022',
      total: '$185.000',
      sendTo: 'Sebastian Cardama',
      numberOrder: '123456789',
      bill: '',
    },
  ]; */

  constructor(private userService: UserService, private router: Router) {
    this.userService.getOrders().subscribe(resp => {
      this.orders = resp;
    });

    console.log(window.innerHeight);
  }

  ngOnInit(): void { }

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

  openshowSeeDetail(orderDetails: orderDetails) {
    this.details = orderDetails;
    this.showSeeDetail = true;
  }
  closedSeeDetail() {
    this.showSeeDetail = false;
  }
  continueOrder(order: string) {
    this.router.navigate(['/sales-order-step1'], {
      queryParams:{id: order },
    });
  }
}
