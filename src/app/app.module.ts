import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HeaderModule } from './shared/header/header.module';
import { BlocksModule } from './blocks/blocks.module';
import { PagesModule } from './pages/pages.module';



@NgModule({
  declarations: [
    AppComponent,  
    
  ],
  imports: [
      BrowserModule, 
      HttpClientModule,
      AppRoutingModule,      
     SharedModule,
     HeaderModule,
     BlocksModule,
     PagesModule
     
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
