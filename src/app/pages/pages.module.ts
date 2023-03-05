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
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { UserPanelModule } from '../user-panel/user-panel.module';
import { HeaderComponent } from '../shared/header/header.component';
import { HeaderModule } from '../shared/header/header.module';
import { RouterModule } from '@angular/router';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BannerComponent } from './components/banner/banner.component';
import { BrandsComponent } from './components/brands/brands.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ValidateComponent } from './validate/validate.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    FeaturedProductsComponent,
    CategoriesComponent,
    HomeSliderComponent,
    LoadingComponent,
    BannerComponent,
    BrandsComponent,
    FooterComponent,
    SearchComponent,
    ValidateComponent,
    PricelistComponent,
  ],
  exports: [
    HomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    FaqComponent,
    OffersComponent,
    LaunchComponent,
    FlashSalesComponent,
    WishListComponent,
    ShopCartComponent,
    PricelistComponent,
  ],
  imports: [
    CommonModule,
    // BlocksModule,
    // AuthModule,
    // UserPanelModule,
    // HeaderModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
