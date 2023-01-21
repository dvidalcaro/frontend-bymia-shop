import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SliderInterface } from 'src/app/shared/interfaces/slider-interface';

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  _response: any;
  private url = 'http://back-test.bymiashop.com/api/front/';

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({
      Authorization:
        'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
    });
    this.http.get(`${this.url}sliders`, { headers }).subscribe(resp => {
      console.log(resp);
    });
  }

  get response() {
    return this._response;
  }

  showSlider() {
    //  http://back-test.bymiashop.com/api/front/sliders
    const httpOptions = {
      headers: new HttpHeaders({
        /*  'Access-Control-Allow-Origin':'*',   */
        Accept: 'application/json',
        Authorization:
          'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
      }),
    };

    this.http
      .get('http://back-test.bymiashop.com/api/front/sliders')
      .subscribe((resp: any) => {
        console.log(resp);

        this._response = resp;
      });
  }
}
