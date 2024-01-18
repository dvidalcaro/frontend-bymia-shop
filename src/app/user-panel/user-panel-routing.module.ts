import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help/help.component';

import { MyDataComponent } from './my-data/my-data.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';
import { ShippingStatusComponent } from './shipping-status/shipping-status.component';
import { AuthGuard } from '../user/guards/auth.guard';
import { SaleOrderStepOneComponent } from './sale-order-step-one/sale-order-step-one.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBillingDataComponent } from './edit-billing-data/edit-billing-data.component';

const routes: Routes = [
  { path: 'my-data', component: MyDataComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-billing-data',
    component: EditBillingDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sales-order-step1',
    component: SaleOrderStepOneComponent,
    canActivate: [AuthGuard],
  },
  { path: 'help', component: HelpComponent },
  {
    path: 'shipping-status',
    component: ShippingStatusComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
