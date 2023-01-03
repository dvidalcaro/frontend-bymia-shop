import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styles: [
  ]
})
export class ForgetPasswordComponent implements OnInit {
  showConfirmMail: boolean = false;
  showForgetPassword: boolean = false;

  constructor() { }


  openConfirmMail(){
    this.showConfirmMail=true;
    
  }

  

  ngOnInit(): void {
  }

}
