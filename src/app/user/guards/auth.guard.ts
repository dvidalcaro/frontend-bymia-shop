import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isUserValid()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.auth.isUserValid()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    } // o false, según la lógica de autorización
  }
  /* canActivateChild(): boolean {
    if (this.auth.isUserValid()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  } */
}
