import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Office } from '../store/models/office.model';
import { Staff } from '../store/models/staff.model';
import { SnackbarService } from './snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(
    private db: AngularFirestore,
    private snackService: SnackbarService
  ) {}

  /**
   * LOAD ALL STAFF
   */
  loadAllStaff(id: string) {
    return this.db
      .collection<Office>('offices')
      .doc(id)
      .collection<Staff>('staff')
      .valueChanges();
  }

  increaseEmployeeTotal(officeId: string) {
    const increase = firebase.default.firestore.FieldValue.increment(1);
    return this.db.collection('offices').doc(officeId).update({
      totalEmployees: increase,
    });
  }

  decreaseEmployeeTotal(officeId: string) {
    const increase = firebase.default.firestore.FieldValue.increment(-1);
    return this.db.collection('offices').doc(officeId).update({
      totalEmployees: increase,
    });
  }

  addNewStaffMember(officeId: string, staff: Staff) {
    const employeeId = staff.employeeId;
    const firstName = staff.firstName;
    const lastName = staff.lastName;
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(employeeId)
      .set({
        firstName,
        lastName,
        employeeId,
        officeId,
      })
      .then(() => {
        this.increaseEmployeeTotal(officeId);
        this.snackService.presentSnackBar(
          'Successfully Added A New Employee',
          ''
        );
      })
      .catch((error) => {
        return;
      });
  }

  deleteStaffMember(officeId: string, employeeId: string) {
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(employeeId)
      .delete()
      .then(() => {
        this.decreaseEmployeeTotal(officeId);
        this.snackService.presentSnackBar('Successfully removed employee', '');
      });
  }

  editStaffMember(staff: Staff) {
    const employeeId = staff.employeeId;
    const officeId = staff.officeId;
    return this.db
      .collection('offices')
      .doc(officeId)
      .collection('staff')
      .doc(employeeId)
      .update({
        ...staff,
      })
      .then(() => {
        this.snackService.presentSnackBar('Successfully updated employee', '');
      });
  }
}
