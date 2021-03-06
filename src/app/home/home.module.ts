import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SharedModule } from '../shared/shared.module';
import { CreateNewOfficeDialogComponent } from './dialogs/create-new-office-dialog/create-new-office-dialog.component';
import { DeleteOfficeDialogComponent } from './dialogs/delete-office-dialog/delete-office-dialog.component';
import { EditOfficeDialogComponent } from './dialogs/edit-office-dialog/edit-office-dialog.component';

@NgModule({
  declarations: [AllOfficesComponent, CreateNewOfficeDialogComponent, DeleteOfficeDialogComponent, EditOfficeDialogComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
