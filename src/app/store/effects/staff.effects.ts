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
  AddStaffAction,
  AddStaffSuccessAction,
  AddStaffFailureAction,
  DeleteStaffAction,
  DeleteStaffSuccessAction,
  DeleteStaffFailureAction,
  EditStaffAction,
  EditStaffSuccessAction,
  EditStaffFailureAction,
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
          return new LoadStaffSuccessAction(staff);
        }),
        catchError((error) => of(new LoadStaffFailureAction(error)))
      )
    )
  );

  @Effect() addNewStaffMember$ = this.actions$.pipe(
    ofType<AddStaffAction>(StaffActiontypes.ADD_STAFF),
    mergeMap((data) =>
      this.staffService
        .addNewStaffMember(data.officeId, data.payload)
        .then(() => {
          return new AddStaffSuccessAction();
        })
        .catch((err) => {
          return new LoadStaffFailureAction(err);
        })
    )
  );

  @Effect() deleteStaffMember$ = this.actions$.pipe(
    ofType<DeleteStaffAction>(StaffActiontypes.DELETE_STAFF),
    mergeMap((data) =>
      this.staffService
        .deleteStaffMember(data.officeId, data.employeeId)
        .then(() => {
          return new DeleteStaffSuccessAction();
        })
        .catch((error) => {
          return new DeleteStaffFailureAction(error);
        })
    )
  );

  @Effect() editStaffMember$ = this.actions$.pipe(
    ofType<EditStaffAction>(StaffActiontypes.EDIT_STAFF),
    mergeMap((payload) =>
      this.staffService
        .editStaffMember(payload.payload)
        .then(() => {
          return new EditStaffSuccessAction();
        })
        .catch((error) => {
          return new EditStaffFailureAction(error);
        })
    )
  );

  constructor(private actions$: Actions, private staffService: StaffService) {}
}
