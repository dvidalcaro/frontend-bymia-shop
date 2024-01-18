import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { MyDataComponent } from './my-data/my-data.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';
import { HelpComponent } from './help/help.component';
import { ShippingStatusComponent } from './shipping-status/shipping-status.component';
import { SaleOrderStepOneComponent } from './sale-order-step-one/sale-order-step-one.component';
import { ChangeDecimalFormatPipe } from './change-decimal-format.pipe';
import { LoadingComponent } from '../pages/components/loading/loading.component';
import { PagesModule } from '../pages/pages.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBillingDataComponent } from './edit-billing-data/edit-billing-data.component';

@NgModule({
  declarations: [
    PanelComponent,
    MyDataComponent,
    OrdersComponent,
    HelpComponent,
    ShippingStatusComponent,
    SaleOrderStepOneComponent,
    ChangeDecimalFormatPipe,
    EditProfileComponent,
    EditBillingDataComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserPanelRoutingModule,
    FormsModule,
  ],
  exports: [
    PanelComponent,
    HelpComponent,
    ChangeDecimalFormatPipe,
    /* UserPanelRoutingModule   */
  ],
})
export class UserPanelModule {}
