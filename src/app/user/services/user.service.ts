import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wishlist } from '../models/wishlist.model';
import { AuthService } from './auth.service';

const url = 'http://back-test.bymiashop.com/api/customer';
let headers: HttpHeaders;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentWishlistSubject: BehaviorSubject<Wishlist>;
  public currentWishlist: Observable<Wishlist>;
  // private wishlist: Wishlist;

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.wishlist = new Wishlist();
    this.currentWishlistSubject = new BehaviorSubject<Wishlist>(new Wishlist());
    this.currentWishlist = this.currentWishlistSubject.asObservable();
  }

  prepareHeaders() {
    headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  notifyWishToAll() {
    this.prepareHeaders();
    this.http.get<Wishlist>(`${url}/favorite/list`, { headers }).subscribe(
      resp => {
        // console.log('notfifyAll', resp);
        this.currentWishlistSubject.next(resp);
      },
      err => {
        // console.log(err);
        this.currentWishlistSubject.next(new Wishlist());
      }
    );
  }

  getWishList() {
    this.prepareHeaders();
    return this.http.get<Wishlist>(`${url}/favorite/list`, { headers }).pipe(
      map(resp => {
        // this.currentWishlistSubject.next(resp);
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
