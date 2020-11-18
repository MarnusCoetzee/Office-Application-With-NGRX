import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private db: AngularFirestore) {}

  /**
   * LOAD ALL STAFF
   */
  loadAllStaff(id: string) {
    return this.db
      .collection('offices')
      .doc(id)
      .collection('staff')
      .valueChanges();
  }
}
