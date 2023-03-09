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
    PanelComponent,
    MyDataComponent,
    OrdersComponent,
    HelpComponent,
    ShippingStatusComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UserPanelRoutingModule],
  exports: [
    PanelComponent,
    HelpComponent,
    /* UserPanelRoutingModule   */
  ],
})
export class UserPanelModule {}
