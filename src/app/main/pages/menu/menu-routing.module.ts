import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './categories/table/table.component';
import { TableRolComponent } from './roles/table-rol/table-rol.component';
import { TableViewComponent } from './Views/table-view/table-view.component';

const routes: Routes = [
  { path:'cate', component: TableComponent},
  { path:'view', component: TableViewComponent},
  { path:'roles', component: TableRolComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
