import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingPageComponent, AuthComponent],
  imports: [CommonModule, LandingPageRoutingModule, SharedModule],
})
export class LandingPageModule {}
