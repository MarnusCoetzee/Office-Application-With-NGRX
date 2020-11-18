import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewOfficeComponent],
  imports: [CommonModule, OfficesRoutingModule, SharedModule],
})
export class OfficesModule {}
