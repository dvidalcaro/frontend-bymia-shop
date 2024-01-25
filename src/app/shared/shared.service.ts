import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  _a: boolean = false;

  sa() {
    this._a;
  }

  constructor() {}

  closeBarSearch() {
    return (this._a = false);
  }

  openBarSearch() {
    return (this._a = true);
  }
}
