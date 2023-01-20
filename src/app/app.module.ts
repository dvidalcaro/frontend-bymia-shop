import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { BlocksModule } from './blocks/blocks.module';
import { PagesModule } from './pages/pages.module';
import { UserPanelModule } from './user-panel/user-panel.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { AppRoutingModule } from './app-routing.module';
import { BymiaService } from './services/bymia.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HeaderModule,
    BlocksModule,
    PagesModule,
  ],
  exports: [],
  providers: [BymiaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
