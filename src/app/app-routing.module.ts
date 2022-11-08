import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FlashSalesComponent } from './pages/flash-sales/flash-sales.component';
import { HomeComponent } from './pages/home/home.component';
import { LaunchComponent } from './pages/launch/launch.component';
import { OffersComponent } from './pages/offers/offers.component';

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
    path:'faq',
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
