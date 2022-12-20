import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SliderInterface } from 'src/app/shared/interfaces/slider-interface';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  _response: any;

  get response() {
    return this._response;
  }

  showSlider() {
    //  http://back-test.bymiashop.com/api/front/sliders
    const httpOptions = {
      headers: new HttpHeaders({
        /*  'Access-Control-Allow-Origin':'*',   */
        'Accept': 'application/json',
        /* 'Authorization': 'YWxhZGRpbjpvcGVuc2VzYW1l',
        'USUARIO': '5ebca7b6-32ab-11ed-b952-db18e75238a6',
        'PASSWORD': 'b03ab9c4-9064-490d-91a7-62611a37c570'  */
        
      })
    };

    httpOptions.headers.append('Authorization', 'Basic{YWxhZGRpbjpvcGVuc2VzYW1l}')
    this.http.get('http://back-test.bymiashop.com/api/front/sliders', httpOptions)
      .subscribe((resp: any) => {

        this._response = resp;
        console.log(resp)
      })

  }


  constructor(private http: HttpClient) { }
}
