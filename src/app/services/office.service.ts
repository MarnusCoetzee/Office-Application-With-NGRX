import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Office } from '../store/models/office.model';
@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackbar: MatSnackBar
  ) {}

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

  // Add new office
  addNewOffice(id: string, office: Office) {
    return this.db
      .collection('offices')
      .doc(id)
      .set(office)
      .then(() => {
        this.snackbar.open('Successfully created office', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  // delete office
  deleteOffice(id: string) {
    return this.db
      .collection('offices')
      .doc(id)
      .delete()
      .then(() => {
        this.snackbar.open('Successfully created office', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }
}
