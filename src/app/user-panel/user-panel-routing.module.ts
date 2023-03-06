import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HelpComponent } from "./help/help.component";

import { MyDataComponent } from "./my-data/my-data.component";
import { OrdersComponent } from "./orders/orders.component";
import { PanelComponent } from "./panel/panel.component";
import { ShippingStatusComponent } from './shipping-status/shipping-status.component';
import { AuthGuard } from '../user/guards/auth.guard';

const routes: Routes = [
    {
        path: '',   
        canActivateChild: [AuthGuard],
        children: [
            {path: 'my-data', component: MyDataComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'panel', component: PanelComponent},
            {path: 'help', component: HelpComponent},
            {path: 'shipping-status', component:ShippingStatusComponent},
            {path: '**', redirectTo: 'panel'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserPanelRoutingModule{}

