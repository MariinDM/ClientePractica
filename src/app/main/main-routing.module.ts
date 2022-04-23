import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckSesionGuard } from '../auth/Guard/check-sesion.guard';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {path:'home', component:MainComponent,canActivate:[CheckSesionGuard], children:[
    { path: 'panel', loadChildren: () => import('./pages/menu/menu.module').then((m) => m.MenuModule)},
    { path: 'perfil', component:PerfilComponent },
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
