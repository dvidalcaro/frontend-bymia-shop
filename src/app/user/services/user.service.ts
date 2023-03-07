import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wishlist } from '../models/wishlist.interface';
import { AuthService } from './auth.service';

const url = 'http://back-test.bymiashop.com/api/customer';
let headers: HttpHeaders;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentWishlistSubject: BehaviorSubject<any>;
  public currentWishlist: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentWishlistSubject = new BehaviorSubject<any>(null);
    this.currentWishlist = this.currentWishlistSubject.asObservable();
  }

  prepareHeaders() {
    headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  notifyWishToAll() {
    this.prepareHeaders();
    this.http.get(`${url}/favorite/list`, { headers }).subscribe(resp => {
      // console.log('notfifyAll', resp);
      this.currentWishlistSubject.next(resp);
    });
  }

  getWishList() {
    this.prepareHeaders();
    return this.http.get(`${url}/favorite/list`, { headers }).pipe(
      map(resp => {
        this.currentWishlistSubject.next(resp);
        return resp;
      })
    );
  }

  removeProductToWishlist(product_id: number) {
    return this.http.post(
      `${url}/favorite/remove`,
      {
        product_id,
      },
      { headers }
    );
  }

  addProductToWishlist(product_id: number) {
    return this.http.post(
      `${url}/favorite/add`,
      {
        product_id,
      },
      { headers }
    );
  }
}
