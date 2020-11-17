import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfficeService } from 'src/app/services/office.service';
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewOfficeDialogComponent>,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private officeService: OfficeService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.officeDetailsForm = this.fb.group({
      officeName: ['', Validators.required],
      officeEmailAddress: ['', Validators.required, Validators.email],
      officeTellNumber: ['', Validators.required],
      officeAddress: ['', Validators.required],
      maxOccupants: ['', Validators.required, Validators.min(0)],
    });
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
