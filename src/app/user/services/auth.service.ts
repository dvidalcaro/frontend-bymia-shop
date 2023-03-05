import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserResponse } from '../models/user-response.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const url = 'http://back-test.bymiashop.com/api/front';
const headers = new HttpHeaders({
  Authorization:
    'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userToken: string = '';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  public user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post(`${url}/register`, user, { headers }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  login(user: User) {
    return this.http.post<UserResponse>(`${url}/login`, user, { headers }).pipe(
      map(resp => {
        console.log(resp);
        this.setToken(resp.token, resp.expires_in);
        this.user = resp.user_data;
        console.log(this.user);
        this.currentUserSubject.next(this.user);
        return resp;
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('bymiatoken');
    localStorage.removeItem('bymiaexpire');
    this.user = new User();
    this.router.navigateByUrl('/');
  }

  getToken() {
    if (localStorage.getItem('bymiatoken')) {
      this.userToken = localStorage.getItem('bymiatoken') || '';
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  setToken(token: string, expire: number) {
    this.userToken = token;
    localStorage.setItem('bymiatoken', token);
    let today = new Date();
    today.setSeconds(expire);
    localStorage.setItem('bymiaexpire', today.getTime().toString());
  }
  isUserValid(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('bymiaexpire'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
