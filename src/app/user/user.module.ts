import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { UserRoutingModule } from './user-routing.module';
import { UserPanelModule } from '../user-panel/user-panel.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, UserPanelModule, UserRoutingModule],
  exports: [LoginComponent, RegisterComponent],
})
export class UserModule {}
