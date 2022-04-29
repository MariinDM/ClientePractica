import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {path:'home', component:MainComponent, children:[
    { path: 'panel', loadChildren: () => import('./pages/menu/menu.module').then((m) => m.MenuModule)},
    { path: 'perfil', component:PerfilComponent },
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
