import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sale-order-step-one',
  templateUrl: './sale-order-step-one.component.html',
  styles: [],
})
export class SaleOrderStepOneComponent implements OnInit {
  constructor(private userService: UserService) {}

  endOrder() {
    this.userService.endOrder().subscribe(res => {
      console.log('resp:', res);
    });
  }

  ngOnInit(): void {}
}
