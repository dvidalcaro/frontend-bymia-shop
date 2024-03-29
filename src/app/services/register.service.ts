import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface userRegistre {
  customer_type_role: number;
  name: string;
  email: string;
  password: string;
  country_code_cel_phone: number;
  cel_phone: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    /*  'Access-Control-Allow-Origin':'*',   */
    Accept: 'application/json',
    // Authorization: environment.production ? 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==' : 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg=='
    Authorization: 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
    // 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg==',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  _response: any;

  userNew: userRegistre = {
    customer_type_role: 1,
    name: 'Dalinda',
    email: 'dalindabilbao@gmail.com',
    password: 'prueba123',
    country_code_cel_phone: 11,
    cel_phone: '1163549780',
  };

  get response() {
    return this._response;
  }

  registerNewUser(): Observable<userRegistre> {
    return this.http.post<userRegistre>(
      environment.url + '/api/front/register',
      this.userNew
    );
  }
  constructor(private http: HttpClient) { }
}
