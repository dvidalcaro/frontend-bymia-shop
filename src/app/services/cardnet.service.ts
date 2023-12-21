import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostSessionKeyCardnet } from '../shared/interfaces/CreateSessionKeyCardnet.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
let headers: HttpHeaders;
const urlCardnet = environment.urlCardnet;

@Injectable({
  providedIn: 'root',
})
export class CardnetService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  });

  constructor(private http: HttpClient) {}
  getSessionkeyCardnet(session: PostSessionKeyCardnet): Observable<any> {
    return this.http.post(`${urlCardnet}/sessions`, session, { headers });
  }
}
