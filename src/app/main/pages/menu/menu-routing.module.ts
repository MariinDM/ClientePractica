import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './categories/table/table.component';
import { TableRolComponent } from './roles/table-rol/table-rol.component';
import { TablaRolviewComponent } from './rolview/tabla-rolview/tabla-rolview.component';
import { TableUserComponent } from './users/table-user/table-user.component';
import { TableViewComponent } from './Views/table-view/table-view.component';

const routes: Routes = [
  { path:'cate', component: TableComponent},
  { path:'view', component: TableViewComponent},
  { path:'roles', component: TableRolComponent},
  { path:'user', component: TableUserComponent},
  { path:'asignar', component: TablaRolviewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
