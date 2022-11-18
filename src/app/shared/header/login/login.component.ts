
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
    this.showRegister= false;
  }

  ngOnInit(): void {
  }

}
