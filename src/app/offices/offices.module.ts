import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ViewOfficeComponent } from './view-office/view-office.component';

@NgModule({
  declarations: [ViewOfficeComponent],
  imports: [CommonModule, OfficesRoutingModule],
})
export class OfficesModule {}
