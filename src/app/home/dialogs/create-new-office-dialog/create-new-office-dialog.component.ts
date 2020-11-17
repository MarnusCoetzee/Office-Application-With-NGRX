import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';
import { OfficeService } from 'src/app/services/office.service';
import { AddOfficeAction } from 'src/app/store/actions/office.actions';
import { AppState } from 'src/app/store/models/app-state.model';
import { Office } from 'src/app/store/models/office.model';
import { officeColors, Color } from '../../office-colors';
@Component({
  selector: 'app-create-new-office-dialog',
  templateUrl: './create-new-office-dialog.component.html',
  styleUrls: ['./create-new-office-dialog.component.scss'],
})
export class CreateNewOfficeDialogComponent implements OnInit {
  // office colours
  officeColours: Color[] = officeColors;
  // office colour default
  selectedColour: string = 'black';
  officeDetailsForm: FormGroup;
  isLoading: boolean = false;

  loading$: Observable<Boolean>;
  error$: Observable<Error>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewOfficeDialogComponent>,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select((store) => store.office.loading);
    this.error$ = this.store.select((store) => store.office.error);
    this.officeDetailsForm = this.fb.group({
      officeName: ['', Validators.required],
      officeEmailAddress: ['', Validators.required, Validators.email],
      officeTellNumber: ['', Validators.required],
      officeAddress: ['', Validators.required],
      maxOccupants: ['', Validators.required],
    });
  }

  async onClickSaveOfficeToFirestore() {
    const name = this.officeDetailsForm.value.officeName;
    const email = this.officeDetailsForm.value.officeEmailAddress;
    const location = this.officeDetailsForm.value.officeAddress;
    const tellNumber = this.officeDetailsForm.value.officeTellNumber;
    const officeColor = this.selectedColour;
    let maxOfficeOccupants = this.officeDetailsForm.value.maxOccupants;
    const ownerId = (await this.afAuth.currentUser).uid;
    const id = this.db.createId();
    const totalEmployees = 0;
    if (maxOfficeOccupants < 0) {
      maxOfficeOccupants = maxOfficeOccupants * -1;
    }
    const office: Office = {
      name,
      email,
      tellNumber,
      officeColor,
      maxOfficeOccupants,
      ownerId,
      id,
      location,
      totalEmployees,
    };
    this.store.dispatch(new AddOfficeAction(office));

    this.dialogRef.close();
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
