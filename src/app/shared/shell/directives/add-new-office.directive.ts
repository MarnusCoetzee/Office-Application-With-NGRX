import { Directive, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Directive({
  selector: '[appAddNewOffice]',
})
export class AddNewOfficeDirective {
  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  onClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.minHeight = '400px';
    dialogConfig.minWidth = '300px';

    // this.dialog.open(CreateNewOfficeDialogComponent, dialogConfig);
  }
}
