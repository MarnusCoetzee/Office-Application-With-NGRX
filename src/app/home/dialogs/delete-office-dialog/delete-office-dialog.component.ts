import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  DeleteOfficeAction,
  LoadSingleOfficeAction,
} from 'src/app/store/actions/office.actions';
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

  office: Office;

  office$: Observable<Office>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private dialogRef: MatDialogRef<DeleteOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<AppState>
  ) {
    // get data of office passed over via dialog data
    this.office = data.office;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getOffice(this.office.id);
    }, 100);
    this.loading$ = this.store.select((store) => store.office.loading);
  }

  private getOffice(id: string) {
    this.office$ = this.store.select((store) => store.office.office);
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.store.dispatch(new LoadSingleOfficeAction(id));
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }

  onClickDeleteOffice() {
    const id = this.office.id;
    this.store.dispatch(new DeleteOfficeAction(id));
    setTimeout(() => {
      this.dialogRef.close();
    }, 200);
  }
}
