import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
//import {  } from "module";
import { ValidateResponse } from 'src/app/shared/interfaces/validateResponse-interfaces';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styles: [],
})
export class ValidateComponent implements OnInit {
  showMessage: boolean = false;
  message: string = '';
  classIco: string = 'bx bxs-check-circle bx-tada-hover modal__i text-center';
  constructor(
    private bymiaService: BymiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bymiaService.validateUser(params).subscribe(resp => {
        if (resp) {
          this.showMessage = true;
          this.message = 'Cuenta verificada con éxito';
          this.classIco =
            'bx bxs-check-circle bx-tada-hover modal__i text-center';
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 4000);
        } else {
          // console.log(params.message);
          this.showMessage = true;
          this.message = 'Cuenta no fue verificada';
          this.classIco =
            'bx bxs-x-circle bx-tada-hover modal__i__bg text-center';
          setTimeout(() => {
            this.router.navigateByUrl('/register');
          }, 4000);
        }
      });
    });
  }
}
