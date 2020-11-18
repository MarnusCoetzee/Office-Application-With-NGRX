import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadSingleOfficeAction } from 'src/app/store/actions/office.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';

@Component({
  selector: 'app-delete-office-dialog',
  templateUrl: './delete-office-dialog.component.html',
  styleUrls: ['./delete-office-dialog.component.scss'],
})
export class DeleteOfficeDialogComponent implements OnInit {
  officeId: string;
  officeName: string;

  office$: Observable<Array<Office>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private dialogRef: MatDialogRef<DeleteOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {
    // get data of office passed over via dialog data
    this.officeId = data.officeId;
    this.officeName = data.officeName;
  }

  ngOnInit(): void {
    this.getOffice();
  }

  private getOffice() {
    const id = this.officeId;
    this.office$ = this.store.select((store) => store.office.list);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    // @ts-ignore
    this.store.dispatch(new LoadSingleOfficeAction(id));
  }
}
