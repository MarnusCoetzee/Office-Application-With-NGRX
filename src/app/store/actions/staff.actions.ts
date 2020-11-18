import { Action } from '@ngrx/store';
import { Staff } from '../models/staff.model';

export enum StaffActiontypes {
  // Load Staff
  LOAD_STAFF = '[STAFF] Load Staff',
  LOAD_STAFF_SUCCESS = '[STAFF] Load Staff Success',
  LOAD_STAFF_FAILURE = '[STAFF] Load Staff Failure',
}

/**
 * LOADING Staff Actions
 */
export class LoadStaffAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF;
  constructor(public officeId: string) {}
}

export class LoadStaffSuccessAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF_SUCCESS;
  constructor(public staff: Array<Staff>) {}
}

export class LoadStaffFailureAction implements Action {
  readonly type = StaffActiontypes.LOAD_STAFF_FAILURE;
  constructor(public error: Error) {}
}

export type StaffAction =
  | LoadStaffAction
  | LoadStaffSuccessAction
  | LoadStaffFailureAction;
