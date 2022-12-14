import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { OffersComponent } from './offers/offers.component';
import { LaunchComponent } from './launch/launch.component';
import { FlashSalesComponent } from './flash-sales/flash-sales.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { BlocksModule } from '../blocks/blocks.module';





@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    FaqComponent,
    OffersComponent,
    LaunchComponent,
    FlashSalesComponent,
    WishListComponent,
    ShopCartComponent,
    
  ],
  imports: [
    CommonModule,
    BlocksModule
  ],
  exports:[
    HomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    FaqComponent,
    OffersComponent,
    LaunchComponent,
    FlashSalesComponent,
    WishListComponent,
    ShopCartComponent
  ]
})
export class PagesModule { }
