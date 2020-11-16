import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SharedModule } from '../shared/shared.module';
import { CreateNewOfficeDialogComponent } from './dialogs/create-new-office-dialog/create-new-office-dialog.component';

@NgModule({
  declarations: [AllOfficesComponent, CreateNewOfficeDialogComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
