import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddStaffAction } from 'src/app/store/actions/staff.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Staff } from 'src/app/store/models/staff.model';

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss'],
})
export class CreateEmployeeDialogComponent implements OnInit {
  officeId: string;

  staffForm: FormGroup;

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private db: AngularFirestore,
    private store: Store<AppState>,
    private snackbar: MatSnackBar
  ) {
    this.officeId = data.officeId;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    // instantiate formgroup
    this.staffForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }

  onClickSaveEmployeeToDB() {
    const employeeId = this.db.createId();
    const firstName = this.staffForm.value.firstName;
    const lastName = this.staffForm.value.lastName;
    const officeId = this.officeId;
    const staff: Staff = {
      employeeId,
      firstName,
      lastName,
    };
    this.store.dispatch(new AddStaffAction(staff, officeId));
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }
}
