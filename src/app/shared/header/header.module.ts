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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LogoComponent,
    NavlinkComponent,    
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    ReactiveFormsModule
    
  ],
  exports: [
    LogoComponent,
    NavlinkComponent,   
    LoginComponent,
    SearchComponent,
    WishlistComponent,
    ShopcartComponent,
    RegisterComponent,
    HeaderComponent
  ]
})
export class HeaderModule { }
