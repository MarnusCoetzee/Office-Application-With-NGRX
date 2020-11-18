import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { SharedModule } from '../shared/shared.module';
import { CreateEmployeeDialogComponent } from './dialogs/create-employee-dialog/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from './dialogs/edit-employee-dialog/edit-employee-dialog.component';
import { DeleteEmployeeDialogComponent } from './dialogs/delete-employee-dialog/delete-employee-dialog.component';

@NgModule({
  declarations: [ViewOfficeComponent, CreateEmployeeDialogComponent, EditEmployeeDialogComponent, DeleteEmployeeDialogComponent],
  imports: [CommonModule, OfficesRoutingModule, SharedModule],
})
export class OfficesModule {}
