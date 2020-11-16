import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AllOfficesComponent } from './all-offices/all-offices.component';

@NgModule({
  declarations: [AllOfficesComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
