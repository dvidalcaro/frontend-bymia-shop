import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Wishlist } from '../models/wishlist.model';
import { AuthService } from './auth.service';
import { Cartlist } from '../models/cartlist.model';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { BillData } from '../models/bill-data.model';
import { Recipient } from '../models/recipient.model';
import { orderInformation } from 'src/app/shared/interfaces/order-interface';
import { OrderGenerate } from 'src/app/shared/interfaces/OrderGenerate-interface';
import {
  LatestBillingData,
  MyAddresses,
  UserProfileData,
} from 'src/app/shared/interfaces/UserProfileData.inteface';

import { throwError } from 'rxjs';
import { PostSessionKeyCardnet } from 'src/app/shared/interfaces/CreateSessionKeyCardnet.interface';
import { User } from '../models/user.model';

const url = environment.url + '/api/customer';
const urlCardnet = environment.urlCardnet;
const urlFront = environment.url + '/api/front';
let headers: HttpHeaders;
let headersCardnet: HttpHeaders;

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
    headersCardnet = new HttpHeaders({});
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
        this.currentWishlistSubject.next(resp);
      },
      err => {
        this.currentWishlistSubject.next(new Wishlist());
      }
    );
  }

  getOrders() {
    this.prepareHeaders();
    return this.http.get<orderInformation[]>(`${url}/orders`, { headers }).pipe(
      map(resp => {
        return resp;
      })
    );
  }
  getOrderById(id: number) {
    this.prepareHeaders();
    return this.http
      .get<orderInformation>(`${url}/order/${id}`, { headers })
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => {
          return throwError(error);
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
        this.currentCartlistSubject.next(resp);
      },
      err => {
        this.currentCartlistSubject.next(new Cartlist());
      }
    );
  }

  getCartList() {
    this.prepareHeaders();
    return this.http.get<Cartlist>(`${url}/cart/list`, { headers }).pipe(
      map(resp => {
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

  addAllProductToCartlist() {
    return this.http.post(`${url}/cart/addAllFavorites`, {}, { headers });
  }

  prepareOrder(products: Product[]): Observable<any> {
    this.order.items = products;
    return this.http.post(`${url}/pre-order`, { products }, { headers });
    //TODO: buscar la data real
    /* let billdata = {
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
    this.order.bill_data = billdata; */
    //TODO: buscar la data real
    /* let recipients = [
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
    this.order.recipients = recipients; */
  }

  createOrder(order: Order) {}

  endOrder(order: OrderGenerate, id: number): Observable<any> {
    return this.http.patch(`${url}/order/${id}`, { order }, { headers });
  }

  getMyData(): Observable<any> {
    this.prepareHeaders();
    return this.http.get<any>(`${url}/data`, { headers }).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  editProfile(profile: User): Observable<any> {
    return this.http.patch(`${url}/data/profile`, { profile }, { headers });
  }
  editLatestBillinData(
    billingData: LatestBillingData,
    id: number
  ): Observable<any> {
    return this.http.patch(
      `${url}/data/bill/${id}`,
      { billingData },
      { headers }
    );
  }
  // edit address
  addAddress() {}

  editAddress(address: MyAddresses, id: number): Observable<any> {
    return this.http.patch(
      `${url}/data/address/${id}`,
      { address },
      { headers }
    );
  }

  deleteAddress(id: number): Observable<any> {
    return this.http.delete(`${url}/data/address/${id}`, { headers });
  }

  // Solicitud de session key Cardnet

  /* getSessionkeyCardnet(session: PostSessionKeyCardnet): Observable<any> {
    return this.http.post(`${urlCardnet}/sessions`, session);
  } */
}
