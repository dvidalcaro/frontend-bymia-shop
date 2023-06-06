import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders({
      /*  'Access-Control-Allow-Origin':'*',   */
      'Accept': 'application/json',
      'Authorization': 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA', 
    })
  

  const reqClone = req.clone({
    headers
  })

  console.log('Por aqui paso el interceptor');

  

  return next.handle(reqClone).pipe(
    catchError(this.handleError)
  )

  }

  handleError(err: HttpErrorResponse){

    console.log('sucedio un error')
    console.log('Registrado en el logfile');
    console.warn(err)   

    return throwError(err.status)
  }


}


