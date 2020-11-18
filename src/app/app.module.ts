import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { environment } from 'src/environments/environment.prod';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { OfficeReducer } from './store/reducers/office.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OfficeEffects } from './store/effects/office.effects';
import { StaffEffects } from './store/effects/staff.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    StoreModule.forRoot({ office: OfficeReducer }),
    EffectsModule.forRoot([OfficeEffects, StaffEffects]),
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
