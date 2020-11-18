import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Office } from '../store/models/office.model';
import { Staff } from '../store/models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private db: AngularFirestore) {}

  /**
   * LOAD ALL STAFF
   */
  loadAllStaff(id: string) {
    console.log('Loading staff in office ' + id);
    return this.db
      .collection<Office>('offices')
      .doc(id)
      .collection<Staff>('staff')
      .valueChanges();
  }
}
