import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  {

  showLaptops: boolean= true;
  showSmartphone: boolean = false;
  showVideoCard: boolean = false;

  

  constructor() { }

  ngOnInit(): void {
  }

  showLaptopsNav(){
    this.showLaptops= true;
    this.showSmartphone = false;
    this.showVideoCard = false;
  }

  showSmarphoneNav(){
    this.showLaptops= false;
    this.showSmartphone = true;
    this.showVideoCard = false;
  }

  showVideoCardNav(){
    this.showLaptops= false;
    this.showSmartphone = false;
    this.showVideoCard = true;
  }


}
