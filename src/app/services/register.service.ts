import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface userRegistre{
  
    customer_type_role: number;
    name: string;
    email: string;
    password: string;
    country_code_cel_phone:number
    cel_phone:string;

}

const httpOptions = {
  headers: new HttpHeaders({
    /*  'Access-Control-Allow-Origin':'*',   */
    'Accept': 'application/json',
    'Authorization': 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==', 
  })
};

@Injectable({
  providedIn: 'root'
})


export class RegisterService {
  _response: any;

   

  userNew: userRegistre =
    {
      "customer_type_role":1,
      "name":"Dalinda",
      "email":"dalindabilbao124443@gmail.com",
      "password":"prueba123",
      "country_code_cel_phone":11,
      "cel_phone":'1163549780'
  }
  

  get response() {
    return this._response;
  }

  

  registerNewUser(): Observable <userRegistre> {
   

    
    return this.http.post<userRegistre>('http://back-test.bymiashop.com/api/front/register', this.userNew )
      

  }
  constructor(private http: HttpClient) { }
}
