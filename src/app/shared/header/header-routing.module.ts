import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';
import { OffersComponent } from 'src/app/pages/offers/offers.component';
import { LaunchComponent } from 'src/app/pages/launch/launch.component';
import { FlashSalesComponent } from 'src/app/pages/flash-sales/flash-sales.component';
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { ShopCartComponent } from 'src/app/pages/shop-cart/shop-cart.component';
import { WishListComponent } from 'src/app/pages/wish-list/wish-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'nosotros',
    component: AboutUsComponent
  },

  {
    path: 'faqs',
    component: FaqComponent
  },

  {
    path: 'ofertas',
    component: OffersComponent
  },

  {
    path: 'lanzamientos',
    component: LaunchComponent
  },

  {
    path: 'flash-sales',
    component: FlashSalesComponent
  },

  {
    path: 'shop-cart',
    component: ShopCartComponent
  },

  {
    path: 'wish-list',
    component: WishListComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
