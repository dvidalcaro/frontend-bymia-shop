import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SliderInterface } from 'src/app/shared/interfaces/slider-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  _response: any;
  private url = environment.url + '/api/front/';

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({
      // Authorization: environment.production ? 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==' : 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg=='
      Authorization:
        'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
      // 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg==',
    });
    this.http.get(`${this.url}sliders`, { headers }).subscribe(resp => {});
  }

  get response() {
    return this._response;
  }

  showSlider() {
    //  environment.url + '/api/front/sliders'
    const httpOptions = {
      headers: new HttpHeaders({
        /*  'Access-Control-Allow-Origin':'*',   */
        Accept: 'application/json',
        // Authorization: environment.production ? 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==' : 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg=='
        Authorization:
          'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
        // 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg==',
      }),
    };

    this.http
      .get(environment.url + '/api/front/sliders')
      .subscribe((resp: any) => {
        this._response = resp;
      });
  }
}
