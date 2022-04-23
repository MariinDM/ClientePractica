import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ModulesModule } from '../shared/modules/modules.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModulesModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
