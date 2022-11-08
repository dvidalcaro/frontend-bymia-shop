import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlocksService } from '../services/blocks.service';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styles: [
  ]
})


export class SlidersComponent implements OnInit {

 


  
   
  get sliders (){
    
    return this.sliderServices._response;
   
  }
 
  
  constructor(private sliderServices: BlocksService ) {
     
   }
    
  ngOnInit(): void {
    this.sliderServices.showSlider()
  }

}
