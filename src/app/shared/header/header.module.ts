import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavlinkComponent } from './navlink/navlink.component';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShopcartComponent } from './shopcart/shopcart.component';
import { HeaderRoutingModule } from './header-routing.module';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LogoComponent,
    NavlinkComponent,
    HeaderComponent,
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule 

  ],
  exports: [
    LogoComponent,
    NavlinkComponent,
    HeaderComponent,
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent,
    RegisterComponent
  ]
})
export class HeaderModule { }
