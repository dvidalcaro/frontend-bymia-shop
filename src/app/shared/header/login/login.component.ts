
import { Component, OnInit } from '@angular/core';


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

  constructor() { }

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

  ngOnInit(): void {
  }

}
