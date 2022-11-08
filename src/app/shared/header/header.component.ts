import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  opcion: boolean=false
  constructor() { }

  closeBarSearch(){
    this.opcion=false;
     }
  ngOnInit(): void {
  }

}
