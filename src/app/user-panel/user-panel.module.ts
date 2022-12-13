import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './my-data/my-data.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';



@NgModule({
  declarations: [
    MyDataComponent,
    OrdersComponent,
    PanelComponent
  ],
  exports:[
    MyDataComponent,
    OrdersComponent,
    PanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserPanelModule { }
