import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { WishListComponent } from '../pages/wish-list/wish-list.component';

import { ShopCartComponent } from '../pages/shop-cart/shop-cart.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';

AuthGuard;
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
  {
    path: 'wish-list',
    component: WishListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shop-cart',
    component: ShopCartComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
