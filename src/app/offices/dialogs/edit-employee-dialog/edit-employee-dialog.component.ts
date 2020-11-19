import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditStaffAction } from 'src/app/store/actions/staff.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Staff } from 'src/app/store/models/staff.model';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss'],
})
export class EditEmployeeDialogComponent implements OnInit {
  loading$: Observable<boolean>;

  staff: Staff;
  staffForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.staff = data.staff;
  }

  ngOnInit(): void {
    console.log(this.staff);
    this.loading$ = this.store.select((store) => store.staff.loading);
    this.initForm();
  }

  private initForm() {
    // instantiate form
    this.staffForm = this.fb.group({
      // pre-populate form
      firstName: [this.staff.firstName, Validators.required],
      lastName: [this.staff.lastName, Validators.required],
    });
  }

  // getters for form values, used to manipulate inside form
  get firstNameFromForm(): any {
    return this.staffForm.get('firstName');
  }

  get lastNameFromForm(): any {
    return this.staffForm.get('lastName');
  }

  /**
   * Function clears text fields
   * @param id
   */

  onClickClearTextField(id: string) {
    switch (id) {
      case 'firstName':
        this.firstNameFromForm.reset();
        break;
      case 'lastName':
        this.lastNameFromForm.reset();
        break;
    }
  }

  onClickUpdateUser() {
    const officeId = this.staff.officeId;
    const employeeId = this.staff.employeeId;
    const firstName = this.staffForm.value.firstName;
    const lastName = this.staffForm.value.lastName;
    const staff: Staff = {
      officeId,
      employeeId,
      firstName,
      lastName,
    };
    this.store.dispatch(new EditStaffAction(staff));
    setTimeout(() => {
      this.dialogRef.close();
    }, 200);
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
