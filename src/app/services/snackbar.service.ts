import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  presentSnackBar(message: string, action: string) {
    return this.snackbar.open(message, action, { duration: 2000 });
  }
}
