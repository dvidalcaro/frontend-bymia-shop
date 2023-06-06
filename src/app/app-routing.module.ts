import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './pages/faq/faq.component';
import { FlashSalesComponent } from './pages/flash-sales/flash-sales.component';

import { LaunchComponent } from './pages/launch/launch.component';
import { OffersComponent } from './pages/offers/offers.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';
import { ShopCartComponent } from './pages/shop-cart/shop-cart.component';
// import { WishListComponent } from './pages/wish-list/wish-list.component';
// import { LoginComponent } from './shared/header/login/login.component';
// import { RegisterComponent } from './shared/header/register/register.component';
import { ForgetPasswordComponent } from './shared/header/forget-password/forget-password.component';
import { MyDataComponent } from './user-panel/my-data/my-data.component';
import { OrdersComponent } from './user-panel/orders/orders.component';
import { PanelComponent } from './user-panel/panel/panel.component';
import { HelpComponent } from './user-panel/help/help.component';
import { SearchComponent } from './pages/search/search.component';
import { ValidateComponent } from './pages/validate/validate.component';
import { PricelistComponent } from './pages/pricelist/pricelist.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { RmaGarantiaComponent } from './pages/rma-garantia/rma-garantia.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },

  {
    path: 'nosotros',
    component: AboutUsComponent,
  },

  {
    path: 'faqs',
    component: FaqComponent,
  },

  {
    path: 'ofertas',
    component: OffersComponent,
  },

  {
    path: 'lanzamientos',
    component: LaunchComponent,
  },

  {
    path: 'flash-sales',
    component: FlashSalesComponent,
  },
  {
    path: 'politicas-privacidad-y-servcios',
    component: PoliticasComponent,
  },
  {
    path: 'politicas-rma-y-garantia',
    component: RmaGarantiaComponent,
  },

  // {
  //   path: 'shop-cart',
  //   component: ShopCartComponent,
  // },

  // {
  //   path: 'wish-list',
  //   component: WishListComponent,
  // },

  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },

  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },

  /* {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  }, */
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: 'pricelist',
    component: PricelistComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },

  // {
  //   path: 'user-panel',
  //   loadChildren: () =>
  //     import('./user-panel/user-panel.module').then(m => m.UserPanelModule),
  // },

  /*  {
    path: 'panel',
    component: PanelComponent
  },

  {
    path: 'my-data',
    component: MyDataComponent
  },

  {
    path: 'orders',
    component: OrdersComponent
  },

  {
    path: 'help',
    component: HelpComponent
  }, */

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
