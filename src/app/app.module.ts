import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';

// import { UserPanelModule } from './user-panel/user-panel.module';
import { PagesModule } from './pages/pages.module';
// import { SharedModule } from './shared/shared.module';
// import { HeaderModule } from './shared/header/header.module';
// import { BlocksModule } from './blocks/blocks.module';
// import { InterceptorsModule } from './interceptors/interceptors.module';
// import { BymiaService } from './services/bymia.service';

import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // SharedModule,
    // BlocksModule,
    // UserPanelModule,
    // HeaderModule,
    ReactiveFormsModule,

    PagesModule,
    UserModule,
    AppRoutingModule,
  ],
  exports: [UserModule],
  providers: [
    /*BymiaService*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
