import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavlinkComponent } from './navlink/navlink.component';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShopcartComponent } from './shopcart/shopcart.component';



@NgModule({
  declarations: [
    LogoComponent,
    NavlinkComponent,
    HeaderComponent,
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoComponent,
    NavlinkComponent,
    HeaderComponent,
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent
  ]
})
export class HeaderModule { }
