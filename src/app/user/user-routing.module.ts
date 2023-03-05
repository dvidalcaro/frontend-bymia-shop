import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { WishListComponent } from '../pages/wish-list/wish-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopCartComponent } from '../pages/shop-cart/shop-cart.component';

AuthGuard;
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
