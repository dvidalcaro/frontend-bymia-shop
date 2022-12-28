
import { Component, OnInit } from '@angular/core';


import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
   
  ]
})
export class LoginComponent implements OnInit {

  showLogin: boolean= false;
  showRegister: boolean= false;
  showRegisterMail: boolean= false;
  showForgetPassword: boolean =false;
  showConfirmMail: boolean= false;

  constructor( private registerService: RegisterService) { }

  registerUser(){
    console.log('jhhjksad')
      this.registerService.registerNewUser().subscribe(resp => console.log(resp));
  }

  openLogin(){
    this.showLogin = true;
  }

  closeLogin(){
    this.showLogin= false;
  }

  openRegister(){
    this.showRegister=true;
    this.showLogin=false;
  }

  closeRegister(){
    this.showRegister=false;
  }

  openRegisterMail(){
    
     this.showRegister= false; 
     this.showRegisterMail= true;
     this.showLogin=false;
  }

  closeRegisterMail(){
    this.showRegisterMail= false;
  }

  openForgetPassword(){
    this.showForgetPassword=true;
    this.showLogin= false;

  }

  closeForgetPassword(){
    this.showForgetPassword=false;
  }

  openConfirmMail(){
    this.showConfirmMail=true;
    this.showForgetPassword=false;
  }

  closeConfirmMail(){
    this.showConfirmMail=false;
  }

  ngOnInit(): void {
  }

}
