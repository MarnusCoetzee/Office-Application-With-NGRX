import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { Office } from '../store/models/office.model';
@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * OFFICE Functionality
   * Create office, get all offices, delete office
   */

  /**
   * Get all offices owned by currently logged in user
   * Returns an empty array if no offices created yet
   * Returns all offices owned by user
   */
  getUserOffices() {
    console.log('getting the good shit');
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Office>('offices', (ref) =>
              ref.where('ownerId', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }
}
