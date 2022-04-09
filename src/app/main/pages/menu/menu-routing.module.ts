import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Prueba1Component } from './prueba1/prueba1.component';
import { Prueba2Component } from './prueba2/prueba2.component';

const routes: Routes = [
  {path:'Usuarios', component:Prueba1Component},
  {path:'Correos', component:Prueba2Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
