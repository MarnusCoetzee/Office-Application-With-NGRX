import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { StaffService } from '../../services/staff.service';
import {
  LoadStaffAction,
  LoadStaffSuccessAction,
  LoadStaffFailureAction,
  StaffActiontypes,
} from '../actions/staff.actions';
import { Staff } from '../models/staff.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class StaffEffects {
  /**
   * LOAD ALL STAFF
   */
  @Effect() loadAllStaff$ = this.actions$.pipe(
    ofType<LoadStaffAction>(StaffActiontypes.LOAD_STAFF),
    mergeMap((data) =>
      this.staffService.loadAllStaff(data.officeId).pipe(
        map((staff: Array<Staff>) => {
          console.log(staff);
          return new LoadStaffSuccessAction(staff);
        }),
        catchError((error) => of(new LoadStaffFailureAction(error)))
      )
    )
  );

  constructor(private actions$: Actions, private staffService: StaffService) {}
}
