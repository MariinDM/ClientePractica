import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckSesionGuard } from '../auth/Guard/check-sesion.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path:'', redirectTo:'home'},
  {path:'**', redirectTo:'home'},
  {path:'home', component:MainComponent,canActivate:[CheckSesionGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
