/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './pages/faq/faq.component';
import { FlashSalesComponent } from './pages/flash-sales/flash-sales.component';

import { LaunchComponent } from './pages/launch/launch.component';
import { OffersComponent } from './pages/offers/offers.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path:'nosotros',
    component: AboutUsComponent
  },

  {
    path:'faqs',
    component: FaqComponent
  },

  {
    path:'ofertas',
    component: OffersComponent
  },

  {
    path:'lanzamientos',
    component: LaunchComponent
  },

  {
    path:'flash-sales',
    component: FlashSalesComponent
  },

  

  {
    path:'**',
    redirectTo:''
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  */