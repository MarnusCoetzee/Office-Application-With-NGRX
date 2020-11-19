import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { EditOfficeAction } from 'src/app/store/actions/office.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';
import { Color, officeColors } from '../../office-colors';

@Component({
  selector: 'app-edit-office-dialog',
  templateUrl: './edit-office-dialog.component.html',
  styleUrls: ['./edit-office-dialog.component.scss'],
})
export class EditOfficeDialogComponent implements OnInit {
  office$: Observable<Office>;
  loading$: Observable<boolean>;

  office: Office;

  editOfficeForm: FormGroup;

  // office colours
  officeColours: Color[] = officeColors;
  // office colour default
  selectedColour: string;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<EditOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder
  ) {
    this.office = data.office;
  }

  ngOnInit(): void {
    console.log(this.office);
    this.initEditForm();
    this.loading$ = this.store.select((store) => store.office.loading);
  }

  private initEditForm() {
    // instantiate edit form, prepopulate form with existing office information
    this.editOfficeForm = this.fb.group({
      name: [this.office.name, Validators.required],
      email: [this.office.email, Validators.required],
      tellNumber: [this.office.tellNumber, Validators.required],
      location: [this.office.location, Validators.required],
      maxOfficeOccupants: [this.office.maxOfficeOccupants, Validators.required],
    });
    this.selectedColour = this.office.officeColor;
  }

  // getters and setters for form controls
  get nameFromForm() {
    return this.editOfficeForm.get('name');
  }

  get emailFromForm() {
    return this.editOfficeForm.get('email');
  }

  get tellNumberFromForm() {
    return this.editOfficeForm.get('tellNumber');
  }

  get locationFromForm() {
    return this.editOfficeForm.get('location');
  }

  get maxOccupantsFromForm() {
    return this.editOfficeForm.get('maxOfficeOccupants');
  }

  /**
   * Function clears a selected form field via switch case using type
   * @param type
   */
  onClickClearFormField(type: string) {
    switch (type) {
      case 'name':
        this.nameFromForm.reset();
        break;
      case 'email':
        this.emailFromForm.reset();
        break;
      case 'tellNumber':
        this.tellNumberFromForm.reset();
        break;
      case 'location':
        this.locationFromForm.reset();
        break;
      case 'maxOfficeOccupants':
        this.maxOccupantsFromForm.reset();
        break;
    }
  }

  onClickCloseForm() {
    this.dialogRef.close();
  }

  onClickSaveNewOfficeDetails() {
    // initialise office object values
    const id = this.office.id;
    const ownerId = this.office.ownerId;
    const name = this.editOfficeForm.value.name;
    const email = this.editOfficeForm.value.email;
    const tellNumber = this.editOfficeForm.value.tellNumber;
    const location = this.editOfficeForm.value.location;
    const maxOfficeOccupants = this.editOfficeForm.value.maxOfficeOccupants;
    const totalEmployees = this.office.totalEmployees;
    const officeColor = this.selectedColour;
    // create new office object
    const office: Office = {
      id,
      ownerId,
      name,
      email,
      tellNumber,
      location,
      maxOfficeOccupants,
      totalEmployees,
      officeColor,
    };
    // dispatch office to edit office action
    this.store.dispatch(new EditOfficeAction(office));
    setTimeout(() => {
      // close dialog after dispatch
      this.dialogRef.close();
    }, 200);
  }
}
