import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'


import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HeaderModule } from './shared/header/header.module';
import { BlocksModule } from './blocks/blocks.module';
import { PagesModule } from './pages/pages.module';

import { UserPanelModule } from './user-panel/user-panel.module';
import { HeaderRoutingModule } from './shared/header/header-routing.module';
import { InterceptorsModule } from './interceptors/interceptors.module';




@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
      BrowserModule, 
      HeaderRoutingModule,
      HttpClientModule,       
     SharedModule,
     HeaderModule,
     BlocksModule,
     PagesModule,
     UserPanelModule,
    InterceptorsModule

     
     
  ],
  exports:[
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
