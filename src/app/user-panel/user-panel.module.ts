import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { MyDataComponent } from './my-data/my-data.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';
import { HelpComponent } from './help/help.component';
import { ShippingStatusComponent } from './shipping-status/shipping-status.component';




@NgModule({
  declarations: [
    MyDataComponent,
    OrdersComponent,
    PanelComponent,
    HelpComponent,
    ShippingStatusComponent
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    MyDataComponent,
    OrdersComponent,
    PanelComponent,
    UserPanelRoutingModule    
  ]
})
export class UserPanelModule { }
