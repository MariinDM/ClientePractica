import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { ModulesModule } from 'src/app/shared/modules/modules.module';
import { TableComponent } from './categories/table/table.component';
import { DialogComponent } from './categories/dialog/dialog.component';
import { TableViewComponent } from './Views/table-view/table-view.component';
import { DialogViewComponent } from './Views/dialog-view/dialog-view.component';
import { DialogRolComponent } from './roles/dialog-rol/dialog-rol.component';
import { TableRolComponent } from './roles/table-rol/table-rol.component';
import { TableUserComponent } from './users/table-user/table-user.component';
import { DialogUserComponent } from './users/dialog-user/dialog-user.component';

@NgModule({
    declarations: [
        TableComponent,
        DialogComponent,
        TableViewComponent,
        DialogViewComponent,
        DialogRolComponent,
        TableRolComponent,
        TableUserComponent,
        DialogUserComponent,
    ],
    entryComponents: [
        DialogComponent,
        DialogViewComponent
    ],
    imports: [
        CommonModule,
        MenuRoutingModule,
        ModulesModule,
        ReactiveFormsModule
    ]
})
export class MenuModule { }