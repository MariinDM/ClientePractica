import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ModulesModule } from '../shared/modules/modules.module';
import { PerfilComponent } from './pages/perfil/perfil.component';


@NgModule({
  declarations: [
    MainComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModulesModule
  ]
})
export class MainModule { }
