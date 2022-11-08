import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  _a: boolean=false;

  sa(){
    this._a;
  }

  constructor() { }

  closeBarSearch(){
    
    return this._a = false;
    
   }

  openBarSearch(){
    console.log(this._a)
    return this._a=true;
  }
}
