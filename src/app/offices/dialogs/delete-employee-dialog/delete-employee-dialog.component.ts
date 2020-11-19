import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteStaffAction } from 'src/app/store/actions/staff.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Staff } from 'src/app/store/models/staff.model';

@Component({
  selector: 'app-delete-employee-dialog',
  templateUrl: './delete-employee-dialog.component.html',
  styleUrls: ['./delete-employee-dialog.component.scss'],
})
export class DeleteEmployeeDialogComponent implements OnInit {
  staff: Staff;
  loading$: Observable<boolean>;
  constructor(
    private dialogRef: MatDialogRef<DeleteEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<AppState>
  ) {
    this.staff = data.staff;
  }

  ngOnInit(): void {
    this.loading$ = this.store.select((store) => store.staff.loading);
  }

  onClickDeleteStaff() {
    const officeId = this.staff.officeId;
    const employeeId = this.staff.employeeId;
    this.store.dispatch(new DeleteStaffAction(officeId, employeeId));
    setTimeout(() => {
      this.dialogRef.close();
    }, 200);
  }
}
