import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
import { OrderConfirmResponse } from 'src/app/shared/interfaces/orderConfirmResponse-interface';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
})
export class OrderConfirmComponent implements OnInit {
  showMessage: boolean = false;
  message: string = '';
  classIco: string = 'bx bxs-check-circle bx-tada-hover modal__i text-center';
  customer!: string;
  transaction!: string;
  order!: string;
  status!: string;
  status_code!: string;
  constructor(
    private bymiaService: BymiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bymiaService.getOrderConfirm(params).subscribe(resp => {
        if (resp.status) {
          this.customer = params['customer'];
          this.transaction = params['transaction'];
          this.order = params['order'];
          this.status = params['status'];
          console.log(params);

          this.showMessage = true;
          this.message = resp.message;
          this.status_code = resp.status_code;
          this.classIco =
            'bx bxs-check-circle bx-tada-hover modal__i text-center';
        } else {
          this.customer = params['customer'];
          this.transaction = params['transaction'];
          this.order = params['order'];
          this.status = params['status'];
          this.showMessage = true;
          this.message = resp.message;
          this.status_code = resp.status_code;
          this.classIco =
            'bx bxs-x-circle bx-tada-hover modal__i__bg text-center';
        }
      });

      /*  setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 4000); */

      // console.log(params.message);
      /* this.showMessage = true;
          this.message = 'Cuenta no fue verificada';
          this.classIco =
            'bx bxs-x-circle bx-tada-hover modal__i__bg text-center';
          setTimeout(() => {
            this.router.navigateByUrl('/register');
          }, 4000); */
    });
  }
}
