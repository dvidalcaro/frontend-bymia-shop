
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
   
  ]
})
export class LoginComponent implements OnInit {

  showLogin: boolean= false;

  constructor() { }

  openLogin(){
    this.showLogin = true;
  }

  closeLogin(){
    this.showLogin= false;
  }

  ngOnInit(): void {
  }

}
