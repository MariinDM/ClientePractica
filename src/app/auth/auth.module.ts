import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModulesModule } from '../shared/modules/modules.module';
import { DialogAuthComponent } from './pages/dialog-auth/dialog-auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DialogAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ModulesModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
