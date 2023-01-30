import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelpComponent } from "./help/help.component";

import { MyDataComponent } from "./my-data/my-data.component";
import { OrdersComponent } from "./orders/orders.component";
import { PanelComponent } from "./panel/panel.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'my-data', component: MyDataComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'panel', component: PanelComponent},
            {path: 'help', component: HelpComponent},
            {path: '**', redirectTo: 'my-data'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserPanelRoutingModule{}

