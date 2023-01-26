import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './my-data/my-data.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';
import { HelpComponent } from './help/help.component';
import { UserPanelRoutingModule } from './user-panel-routing.module';



@NgModule({
  declarations: [
    MyDataComponent,
    OrdersComponent,
    PanelComponent,
    HelpComponent
  ],
  exports:[
    MyDataComponent,
    OrdersComponent,
    PanelComponent,
    UserPanelRoutingModule    
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
