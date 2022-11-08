import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SliderInterface } from 'src/app/shared/interfaces/slider-interface';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
 
   _response: any;

   get response(){
    return this._response;
   }
 
  showSlider(){
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        
      })
    };
    this.http.get('http://back-test.bymiashop.com/api/v1/sliders', httpOptions)
    .subscribe((resp:any) =>{
        
      this._response= resp;
      console.log(resp)
    })
      
  }


  constructor(private http: HttpClient) { }
}
