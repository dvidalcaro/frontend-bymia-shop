import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserResponse } from '../models/user-response.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.url + '/api/front';
const headers = new HttpHeaders({
  // Authorization: environment.production ? 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==' : 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg=='
  Authorization: 'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
  // 'Basic NGE0OWNmMzYtMzAxMC0xMWVkLTk4ZjktZDUzYjI4NjIxYzA1OmRhMjQ0MTc3LThlNjItNDQ0Mi05YWQ5LTk4MTUxZjg0MzJjYg==',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userToken: string = '';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post(`${url}/register`, {
      "cel_phone": user.cel_phone,
      "country_id": user.country_id,
      "country_phone_code": user.country_id,
      "customer_type_role": user.customer_type_role,
      "email": user.email,
      "gender_type": user.gender_type,
      "name": user.name,
      "password": user.password,
      "date_of_birth": user.date_of_birth ? user.date_of_birth : null
    }, { headers }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  login(user: User) {
    return this.http.post<UserResponse>(`${url}/login`, user, { headers }).pipe(
      map(resp => {
        // console.log(resp);
        this.userToken = resp.token;
        this.user = resp.user_data;
        this.setUserInformation(
          resp.token,
          resp.expires_in,
          JSON.stringify(this.user)
        );
        // console.log(this.user);
        this.currentUserSubject.next(this.user);
        return resp;
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('bymiatoken');
    localStorage.removeItem('bymiaexpire');
    localStorage.removeItem('bymiauser');
    this.user = new User();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  getToken() {
    if (this.userToken !== '') {
      return this.userToken;
    } else {
      if (localStorage.getItem('bymiatoken')) {
        this.userToken = localStorage.getItem('bymiatoken') || '';
      } else {
        this.userToken = '';
      }
      return this.userToken;
    }
  }

  setUserInformation(token: string, expire: number, user: string) {
    this.userToken = token;
    localStorage.setItem('bymiatoken', token);
    let today = new Date();
    today.setSeconds(expire);
    localStorage.setItem('bymiaexpire', today.getTime().toString());
    localStorage.setItem('bymiauser', user);
  }

  isUserValid(): boolean {
    if (this.getToken() == '') {
      return false;
    }
    const expira = Number(localStorage.getItem('bymiaexpire'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      this.user = JSON.parse(localStorage.getItem('bymiauser') || '');
      this.currentUserSubject.next(this.user);
      return true;
    }
    this.currentUserSubject.next(null);
    localStorage.removeItem('bymiatoken');
    localStorage.removeItem('bymiaexpire');
    localStorage.removeItem('bymiauser');
    this.user = new User();
    return false;
  }
}
