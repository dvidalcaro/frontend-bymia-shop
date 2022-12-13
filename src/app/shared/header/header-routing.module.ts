import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';
import { OffersComponent } from 'src/app/pages/offers/offers.component';
import { LaunchComponent } from 'src/app/pages/launch/launch.component';
import { FlashSalesComponent } from 'src/app/pages/flash-sales/flash-sales.component';
import { FaqComponent } from 'src/app/pages/faq/faq.component';


const routes : Routes =[
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
export class HeaderRoutingModule { }
