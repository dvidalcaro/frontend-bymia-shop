import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wishlist } from '../models/wishlist.model';
import { AuthService } from './auth.service';
import { Cartlist } from '../models/cartlist.model';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { BillData } from '../models/bill-data.model';
import { Recipient } from '../models/recipient.model';

const url = environment.url + '/api/customer';
let headers: HttpHeaders;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentWishlistSubject: BehaviorSubject<Wishlist>;
  public currentWishlist: Observable<Wishlist>;
  private currentCartlistSubject: BehaviorSubject<Cartlist>;
  public currentCartlist: Observable<Cartlist>;

  // private wishlist: Wishlist;
  private order: Order = new Order();

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.wishlist = new Wishlist();
    this.currentWishlistSubject = new BehaviorSubject<Wishlist>(new Wishlist());
    this.currentWishlist = this.currentWishlistSubject.asObservable();

    this.currentCartlistSubject = new BehaviorSubject<Cartlist>(new Cartlist());
    this.currentCartlist = this.currentCartlistSubject.asObservable();
  }

  getOrder() {
    return this.order;
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

  notifyCartToAll() {
    this.prepareHeaders();
    this.http.get<Cartlist>(`${url}/cart/list`, { headers }).subscribe(
      resp => {
        // console.log('notfifyAll', resp);
        this.currentCartlistSubject.next(resp);
      },
      err => {
        // console.log(err);
        this.currentCartlistSubject.next(new Cartlist());
      }
    );
  }

  getCartList() {
    this.prepareHeaders();
    return this.http.get<Cartlist>(`${url}/cart/list`, { headers }).pipe(
      map(resp => {
        // this.currentCartlistSubject.next(resp);
        return resp;
      })
    );
  }

  removeProductToCartlist(product_id: number) {
    return this.http.post(
      `${url}/cart/remove`,
      {
        product_id,
      },
      { headers }
    );
  }

  addProductToCartlist(product_id: number) {
    return this.http.post(
      `${url}/cart/add`,
      {
        product_id,
      },
      { headers }
    );
  }

  prepareOrder(products: Product[]) {
    this.order.items = products;
    //TODO: buscar la data real
    let billdata = {
      identity_type: 'DNI',
      identity_number: '34987273',
      name: 'Jane Doe',
      corporate_name: 'Jane Doe Inc.',
      country_id: 11,
      country_name: 'Argentina',
      state_id: 4545,
      state_name: 'Buenos Aires',
      city_id: 42022,
      city_name: 'Ciudad Autonoma de Buenos Aires',
      code_zip: 'abc123',
      additional_info: 'informacion adicional de Jane Doe',
      address: 'Calle 123 4to A',
      phone: '+549113637878',
      email: 'janedoe@gmail.com',
    } as BillData;
    this.order.bill_data = billdata;
    //TODO: buscar la data real
    let recipients = [
      {
        recipient_id: 1,
        country_name: 'Argentina',
        state_name: 'Córdoba',
        city_name: 'Cosquin',
        recipient_name: 'Destinatario prueba 1',
        address: 'Direccion destinatario 1 23233',
        recipient_phone: '1163549766',
      },
      {
        recipient_id: 2,
        country_name: 'Argentina',
        state_name: 'Córdoba',
        city_name: 'La falda',
        recipient_name: 'Destinatario prueba 2',
        address: 'Direccion destinatario 2 23233',
        recipient_phone: '1163549766',
      },
      {
        recipient_id: 3,
        country_name: 'Argentina',
        state_name: 'Córdoba',
        city_name: 'Córdoba Capital',
        recipient_name: 'Destinatario prueba 3',
        address: 'Direccion destinatario 3 23233',
        recipient_phone: '1163549766',
      },
    ] as Recipient[];
    this.order.recipients = recipients;
  }

  createOrder(order: Order) {}

  endOrder() {
    return this.http.post(`${url}/order`, {}, { headers });
  }
}
