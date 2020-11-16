import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './shell/shell.component';
import { PhonePipe } from '../custom-pipes/phone.pipe';
import { SignoutButtonDirective } from './shell/directives/signout-button.directive';
const components = [ShellComponent, PhonePipe];

const directives = [SignoutButtonDirective];

const modules = [
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatAutocompleteModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [...components, ...directives],
  imports: [...modules],
  exports: [...components, ...modules, ...directives],
})
export class SharedModule {}
